import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Distributed Rate Limiting for Lead Capture API
 *
 * Uses Upstash Redis for serverless-compatible rate limiting.
 * Fallback to permissive mode in development without Redis.
 */

// Check if Redis credentials are configured
const isRedisConfigured =
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN;

// Create Redis client only if configured
const redis = isRedisConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Create rate limiter with sliding window algorithm
// 5 requests per 10 seconds per IP address
export const leadCaptureRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 s"),
      analytics: true,
      prefix: "ratelimit:lead-capture",
    })
  : null;

// Reflections rate limiter
// 10 reflections per hour per user
export const reflectionsRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      analytics: true,
      prefix: "ratelimit:reflections",
    })
  : null;

/**
 * Development fallback rate limiter
 * WARNING: This is NOT secure for production!
 * In-memory state resets on each serverless invocation.
 */
const devRateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function checkRateLimit(
  identifier: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  // Use Upstash rate limiter if configured
  if (leadCaptureRateLimit) {
    const result = await leadCaptureRateLimit.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  // Fallback to development rate limiter
  console.warn(
    "⚠️ Using in-memory rate limiting - NOT suitable for production!"
  );
  console.warn(
    "   Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for distributed rate limiting."
  );

  const now = Date.now();
  const limit = devRateLimitMap.get(identifier);
  const windowMs = 10000; // 10 seconds
  const maxRequests = 5;

  if (!limit || now > limit.resetTime) {
    devRateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: now + windowMs,
    };
  }

  if (limit.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: limit.resetTime,
    };
  }

  limit.count++;
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - limit.count,
    reset: limit.resetTime,
  };
}

/**
 * Extract IP address from request headers
 * Handles various proxy and load balancer configurations
 */
export function getClientIP(request: Request): string {
  // Try x-forwarded-for (most common for proxies)
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // Take the first IP if multiple are present
    return xForwardedFor.split(",")[0].trim();
  }

  // Try x-real-ip (used by some proxies)
  const xRealIP = request.headers.get("x-real-ip");
  if (xRealIP) {
    return xRealIP.trim();
  }

  // Try CF-Connecting-IP (Cloudflare)
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  // Fallback to anonymous if no IP found
  return "anonymous";
}

/**
 * Check rate limit for reflections API
 * Uses user ID as identifier (10 reflections per hour per user)
 */
export async function checkReflectionRateLimit(
  userId: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  // Use Upstash rate limiter if configured
  if (reflectionsRateLimit) {
    const result = await reflectionsRateLimit.limit(userId);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  // Fallback to development rate limiter
  console.warn(
    "⚠️ Using in-memory rate limiting for reflections - NOT suitable for production!"
  );

  const now = Date.now();
  const limit = devRateLimitMap.get(`reflection:${userId}`);
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  if (!limit || now > limit.resetTime) {
    devRateLimitMap.set(`reflection:${userId}`, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: now + windowMs,
    };
  }

  if (limit.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: limit.resetTime,
    };
  }

  limit.count++;
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - limit.count,
    reset: limit.resetTime,
  };
}
