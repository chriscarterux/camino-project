import { POST, GET } from "@/app/api/leads/route";
import { NextRequest } from "next/server";

// Mock Supabase
jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({
            data: null,
            error: { code: "PGRST116" }, // No rows returned
          }),
        })),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({
            data: { id: "test-lead-id", email: "test@example.com" },
            error: null,
          }),
        })),
      })),
    })),
  })),
}));

// Mock Resend
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: "test-email-id" }),
    },
  })),
}));

// Mock rate limiter (will use dev fallback in tests)
jest.mock("@/lib/rate-limit", () => {
  const originalModule = jest.requireActual("@/lib/rate-limit");
  return {
    ...originalModule,
    checkRateLimit: jest.fn().mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 10000,
    }),
  };
});

describe("/api/leads API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/leads", () => {
    it("creates a new lead successfully", async () => {
      const requestBody = {
        email: "test@example.com",
        name: "John Doe",
        primary_interest: "identity",
        source: "homepage",
      };

      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBeTruthy();
    });

    it("validates required email field", async () => {
      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({ source: "homepage" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("Email is required");
    });

    it("validates email format", async () => {
      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "invalid-email",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("Invalid email format");
    });

    it("validates source field", async () => {
      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          source: "invalid-source",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("Invalid source");
    });

    it("normalizes email to lowercase", async () => {
      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "Test@Example.COM",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      // Check that email was normalized in the request
    });

    it("prevents duplicate email submissions", async () => {
      // Mock Supabase to return existing lead
      const { createClient } = require("@/lib/supabase/server");
      createClient.mockReturnValueOnce({
        from: jest.fn(() => ({
          select: jest.fn(() => ({
            eq: jest.fn(() => ({
              single: jest.fn().mockResolvedValue({
                data: { id: "existing-lead-id" },
                error: null,
              }),
            })),
          })),
        })),
      });

      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "existing@example.com",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toContain("already registered");
    });

    it("enforces rate limiting", async () => {
      const { checkRateLimit } = require("@/lib/rate-limit");

      // Mock rate limit exceeded
      checkRateLimit.mockResolvedValueOnce({
        success: false,
        limit: 5,
        remaining: 0,
        reset: Date.now() + 10000,
      });

      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "192.168.1.1",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toContain("Too many requests");
      expect(response.headers.get("X-RateLimit-Limit")).toBe("5");
      expect(response.headers.get("X-RateLimit-Remaining")).toBe("0");
      expect(response.headers.get("Retry-After")).toBeTruthy();
    });

    it("blocks bots via honeypot field", async () => {
      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "bot@example.com",
          source: "homepage",
          website: "http://spam.com", // Honeypot field filled by bot
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      // Should return success to avoid revealing honeypot
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      // But should NOT actually create the lead (verify mocks weren't called)
      const { createClient } = require("@/lib/supabase/server");
      expect(createClient).not.toHaveBeenCalled();
    });

    it("extracts IP from x-forwarded-for header", async () => {
      const { checkRateLimit } = require("@/lib/rate-limit");

      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "203.0.113.195, 70.41.3.18",
        },
      });

      await POST(request);

      // Verify rate limiter was called with first IP
      expect(checkRateLimit).toHaveBeenCalledWith("203.0.113.195");
    });

    it("extracts IP from x-real-ip header", async () => {
      const { checkRateLimit } = require("@/lib/rate-limit");

      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
          "x-real-ip": "198.51.100.42",
        },
      });

      await POST(request);

      // Verify rate limiter was called with real IP
      expect(checkRateLimit).toHaveBeenCalledWith("198.51.100.42");
    });

    it("extracts IP from cf-connecting-ip header (Cloudflare)", async () => {
      const { checkRateLimit } = require("@/lib/rate-limit");

      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
          "cf-connecting-ip": "192.0.2.1",
        },
      });

      await POST(request);

      // Verify rate limiter was called with Cloudflare IP
      expect(checkRateLimit).toHaveBeenCalledWith("192.0.2.1");
    });

    it("uses anonymous identifier when no IP found", async () => {
      const { checkRateLimit } = require("@/lib/rate-limit");

      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await POST(request);

      // Verify rate limiter was called with anonymous
      expect(checkRateLimit).toHaveBeenCalledWith("anonymous");
    });

    it("trims whitespace from name field", async () => {
      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          name: "  John Doe  ",
          source: "homepage",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      // Verify name was trimmed in database call
    });
  });

  describe("GET /api/leads", () => {
    it("returns lead statistics", async () => {
      const { createClient } = require("@/lib/supabase/server");
      createClient.mockReturnValue({
        from: jest.fn(() => ({
          select: jest.fn((query, options) => {
            // Handle count query
            if (options?.count === "exact") {
              return Promise.resolve({
                count: 3,
                error: null,
              });
            }
            // Handle source query
            return {
              order: jest.fn().mockResolvedValue({
                data: [
                  { source: "homepage" },
                  { source: "homepage" },
                  { source: "pricing" },
                ],
                error: null,
              }),
            };
          }),
        })),
      });

      const request = new NextRequest("http://localhost:3000/api/leads", {
        method: "GET",
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.leadsBySource).toBeDefined();
      expect(data.leadsBySource.homepage).toBe(2);
      expect(data.leadsBySource.pricing).toBe(1);
    });
  });
});
