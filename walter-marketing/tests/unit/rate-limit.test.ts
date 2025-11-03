// Mock Upstash before importing the module
jest.mock("@upstash/ratelimit", () => ({
  Ratelimit: jest.fn(),
}));

jest.mock("@upstash/redis", () => ({
  Redis: jest.fn(),
}));

import { getClientIP } from "@/lib/rate-limit";

// Helper to create mock request with headers
function createMockRequest(headers: Record<string, string>): Request {
  return {
    headers: {
      get: (name: string) => headers[name.toLowerCase()] || null,
    },
  } as Request;
}

describe("Rate Limit Utilities", () => {
  describe("getClientIP", () => {
    it("extracts IP from x-forwarded-for header", () => {
      const request = createMockRequest({
        "x-forwarded-for": "203.0.113.195, 70.41.3.18, 150.172.238.178",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("203.0.113.195");
    });

    it("handles single IP in x-forwarded-for", () => {
      const request = createMockRequest({
        "x-forwarded-for": "203.0.113.195",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("203.0.113.195");
    });

    it("trims whitespace from x-forwarded-for IPs", () => {
      const request = createMockRequest({
        "x-forwarded-for": " 203.0.113.195 , 70.41.3.18 ",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("203.0.113.195");
    });

    it("extracts IP from x-real-ip header", () => {
      const request = createMockRequest({
        "x-real-ip": "198.51.100.42",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("198.51.100.42");
    });

    it("extracts IP from cf-connecting-ip header (Cloudflare)", () => {
      const request = createMockRequest({
        "cf-connecting-ip": "192.0.2.1",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("192.0.2.1");
    });

    it("prioritizes x-forwarded-for over x-real-ip", () => {
      const request = createMockRequest({
        "x-forwarded-for": "203.0.113.195",
        "x-real-ip": "198.51.100.42",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("203.0.113.195");
    });

    it("prioritizes x-forwarded-for over cf-connecting-ip", () => {
      const request = createMockRequest({
        "x-forwarded-for": "203.0.113.195",
        "cf-connecting-ip": "192.0.2.1",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("203.0.113.195");
    });

    it("prioritizes x-real-ip over cf-connecting-ip", () => {
      const request = createMockRequest({
        "x-real-ip": "198.51.100.42",
        "cf-connecting-ip": "192.0.2.1",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("198.51.100.42");
    });

    it("returns anonymous when no IP headers present", () => {
      const request = createMockRequest({});

      const ip = getClientIP(request);
      expect(ip).toBe("anonymous");
    });

    it("handles IPv6 addresses", () => {
      const request = createMockRequest({
        "x-forwarded-for": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
    });

    it("handles mixed IPv4 and IPv6 in x-forwarded-for", () => {
      const request = createMockRequest({
        "x-forwarded-for": "2001:0db8:85a3::8a2e:0370:7334, 203.0.113.195",
      });

      const ip = getClientIP(request);
      expect(ip).toBe("2001:0db8:85a3::8a2e:0370:7334");
    });
  });
});
