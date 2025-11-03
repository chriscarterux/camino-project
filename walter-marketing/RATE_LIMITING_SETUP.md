# Rate Limiting Setup with Upstash Redis

## Overview

This application uses **Upstash Redis** for distributed rate limiting to prevent abuse of the Lead Capture API. This solution is serverless-compatible and works across all Next.js deployment platforms (Vercel, AWS Lambda, etc.).

## Why Distributed Rate Limiting?

In serverless environments, each request may be handled by a different server instance. Traditional in-memory rate limiting (using `Map` or `Set`) **does not work** because:

1. Each serverless invocation has its own memory space
2. The in-memory state resets on each new function instance
3. Attackers can bypass rate limits by triggering new instances

Upstash Redis solves this by providing a **shared, persistent** state across all serverless instances.

## Security Features Implemented

### 1. Distributed Rate Limiting
- **Limit:** 5 requests per 10 seconds per IP address
- **Algorithm:** Sliding window (more accurate than fixed window)
- **Identifier:** Client IP address (with proxy support)

### 2. Server-Side Honeypot Validation
- Hidden `website` field that bots typically fill out
- Returns fake success to avoid revealing the trap
- Prevents bot submissions from reaching the database

## Quick Start (Development)

The application includes a **fallback mode** for local development without Redis:

```bash
npm install
npm run dev
```

You'll see this warning in the console:
```
⚠️ Using in-memory rate limiting - NOT suitable for production!
   Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for distributed rate limiting.
```

This fallback is intentionally **not secure** for production but allows development without Redis.

## Production Setup with Upstash (Free Tier)

### Step 1: Create Upstash Redis Database

1. Go to [https://console.upstash.com/](https://console.upstash.com/)
2. Sign up for a free account (GitHub/Google login available)
3. Click **Create Database**
4. Configure:
   - **Name:** `camino-rate-limiter` (or your preference)
   - **Type:** Regional
   - **Region:** Choose closest to your deployment region
     - Vercel: `us-east-1` (recommended for most Vercel deployments)
     - AWS Lambda: Match your Lambda region
   - **TLS:** Enabled (recommended)

5. Click **Create**

### Step 2: Get API Credentials

After creating the database:

1. Go to the **Details** tab
2. Scroll to **REST API**
3. Copy these values:
   - **UPSTASH_REDIS_REST_URL** (e.g., `https://your-db.upstash.io`)
   - **UPSTASH_REDIS_REST_TOKEN** (long alphanumeric string)

### Step 3: Configure Environment Variables

#### Local Development (`.env.local`):
```env
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=AYyoASQg...your-token-here
```

#### Vercel Deployment:
```bash
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
```

Or via Vercel Dashboard:
1. Go to Project Settings > Environment Variables
2. Add both variables for Production, Preview, and Development

#### Docker / AWS Lambda:
Add to your deployment configuration:
```dockerfile
ENV UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
ENV UPSTASH_REDIS_REST_TOKEN=AYyoASQg...your-token-here
```

### Step 4: Test Rate Limiting

1. Deploy or restart your app
2. Verify Redis is connected (no fallback warning in logs)
3. Test rate limiting:

```bash
# Make 6 rapid requests (should rate limit after 5th)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/leads \
    -H "Content-Type: application/json" \
    -d '{"email":"test'$i'@example.com","source":"homepage"}'
done
```

Expected result:
- Requests 1-5: `200 OK`
- Request 6: `429 Too Many Requests` with headers:
  ```
  X-RateLimit-Limit: 5
  X-RateLimit-Remaining: 0
  X-RateLimit-Reset: <timestamp>
  Retry-After: <seconds>
  ```

## Upstash Free Tier Limits

Perfect for most use cases:

- **10,000 requests/day**
- **256 MB storage**
- **10 commands/second** (burst)
- **1 database**

For higher traffic, see [Upstash Pricing](https://upstash.com/pricing).

## Rate Limit Configuration

Located in `/lib/rate-limit.ts`:

```typescript
export const leadCaptureRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"), // 5 requests per 10 seconds
  analytics: true, // Enable Upstash analytics
  prefix: "ratelimit:lead-capture",
});
```

### Adjusting Limits

To change rate limits, modify the `slidingWindow` parameters:

```typescript
// More strict (3 requests per minute)
Ratelimit.slidingWindow(3, "60 s")

// More lenient (10 requests per 30 seconds)
Ratelimit.slidingWindow(10, "30 s")

// Per hour limit (50 requests per hour)
Ratelimit.slidingWindow(50, "3600 s")
```

### Available Algorithms

Upstash supports multiple algorithms:

```typescript
// Sliding window (recommended - most accurate)
Ratelimit.slidingWindow(5, "10 s")

// Fixed window (simpler, less accurate)
Ratelimit.fixedWindow(5, "10 s")

// Token bucket (for burst handling)
Ratelimit.tokenBucket(5, "1 s", 10)
```

## IP Address Extraction

The rate limiter extracts client IPs from headers in this priority:

1. `x-forwarded-for` (most proxies/CDNs)
2. `x-real-ip` (Nginx, some CDNs)
3. `cf-connecting-ip` (Cloudflare)
4. Falls back to `"anonymous"` if none found

### Behind Cloudflare

Cloudflare adds the `cf-connecting-ip` header with the real client IP. The rate limiter automatically uses this.

### Behind AWS ALB / ELB

AWS load balancers use `x-forwarded-for`. The rate limiter extracts the first IP (the original client).

### Custom Proxy Configuration

If your proxy uses a different header, modify `/lib/rate-limit.ts`:

```typescript
export function getClientIP(request: Request): string {
  // Add your custom header
  const customHeader = request.headers.get("your-custom-header");
  if (customHeader) {
    return customHeader.trim();
  }

  // ... existing logic
}
```

## Monitoring Rate Limits

### Upstash Console

1. Go to [Upstash Console](https://console.upstash.com/)
2. Select your database
3. View **Analytics** tab for:
   - Request count
   - Latency metrics
   - Rate limit hits

### Application Logs

Rate limit events are logged:

```typescript
console.log(`🚫 Rate limit exceeded for IP: ${ip}`);
console.log(`🚫 Bot detected via honeypot - IP: ${ip}`);
```

### Custom Monitoring

Add your own monitoring:

```typescript
// In /app/api/leads/route.ts
if (!success) {
  // Log to your monitoring service (Datadog, Sentry, etc.)
  await analytics.track({
    event: 'rate_limit_exceeded',
    ip,
    endpoint: '/api/leads',
    limit,
    remaining,
  });

  return NextResponse.json(...);
}
```

## Troubleshooting

### Issue: Rate limits not working

**Check:**
1. Environment variables are set correctly
2. No fallback warning in logs
3. Redis URL is accessible from deployment region

**Debug:**
```bash
# Test Redis connection
curl -X POST $UPSTASH_REDIS_REST_URL \
  -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN" \
  -d '["PING"]'

# Expected: ["PONG"]
```

### Issue: Rate limits too aggressive

**Solution:** Adjust limits in `/lib/rate-limit.ts`:

```typescript
// Increase window or requests
Ratelimit.slidingWindow(10, "30 s")
```

### Issue: Different rate limits per endpoint

**Solution:** Create multiple rate limiters:

```typescript
export const leadCaptureRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  prefix: "ratelimit:lead-capture",
});

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  prefix: "ratelimit:api",
});
```

### Issue: IPv6 addresses being blocked incorrectly

IPv6 addresses are supported. If issues occur:

```typescript
// Normalize IPv6 addresses
function normalizeIP(ip: string): string {
  // Add custom normalization logic
  return ip;
}
```

## Testing

### Unit Tests

IP extraction logic is tested in `/tests/unit/rate-limit.test.ts`:

```bash
npm test -- tests/unit/rate-limit.test.ts
```

### Integration Tests

Full rate limiting flow tested in `/tests/integration/lead-capture-api.test.ts`:

```bash
npm test -- tests/integration/lead-capture-api.test.ts
```

### Load Testing

Test rate limits under load:

```bash
# Install Apache Bench
brew install httpd

# Send 100 requests with 10 concurrent connections
ab -n 100 -c 10 -p payload.json -T application/json \
  http://localhost:3000/api/leads
```

## Security Best Practices

1. **Never commit** Redis credentials to version control
2. **Rotate tokens** regularly (Upstash Console > Database > Rotate Token)
3. **Use separate databases** for dev/staging/production
4. **Monitor** rate limit hits for abuse patterns
5. **Combine** with other security measures:
   - CAPTCHA for repeated offenders
   - IP blocking for malicious actors
   - WAF (Web Application Firewall) rules

## Cost Optimization

Free tier covers most small to medium apps. If exceeding limits:

1. **Increase window duration** (reduce request frequency)
2. **Implement client-side debouncing** (reduce unnecessary requests)
3. **Add CAPTCHA** for suspicious traffic
4. **Upgrade to Pro** ($10/month for 1M requests/day)

## Additional Resources

- [Upstash Rate Limiting Docs](https://upstash.com/docs/redis/sdks/ratelimit/overview)
- [Upstash Redis REST API](https://upstash.com/docs/redis/features/restapi)
- [Next.js Serverless Functions](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [OWASP Rate Limiting](https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks)

## Support

- **Upstash:** [Discord](https://upstash.com/discord) or [support@upstash.com](mailto:support@upstash.com)
- **Application:** File an issue in the project repository
