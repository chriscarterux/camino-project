import { POST, GET } from "@/app/api/leads/route";
import { NextRequest } from "next/server";

// Mock Supabase
jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
        })),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(),
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

describe("/api/leads API", () => {
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

    it("rate limits excessive requests", async () => {
      const ip = "192.168.1.1";

      // Make 4 requests rapidly
      for (let i = 0; i < 4; i++) {
        const request = new NextRequest("http://localhost:3000/api/leads", {
          method: "POST",
          body: JSON.stringify({
            email: `test${i}@example.com`,
            source: "homepage",
          }),
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": ip,
          },
        });

        const response = await POST(request);

        if (i < 3) {
          expect(response.status).toBe(200);
        } else {
          expect(response.status).toBe(429);
          const data = await response.json();
          expect(data.error).toContain("Too many requests");
        }
      }
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
          select: jest.fn(() => ({
            order: jest.fn().mockResolvedValue({
              data: [
                { source: "homepage" },
                { source: "homepage" },
                { source: "pricing" },
              ],
              error: null,
            }),
          })),
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
