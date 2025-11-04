# Upstash Redis Setup Guide

## Overview

Camino uses Upstash Redis for distributed rate limiting on the lead capture API. This ensures protection against spam and abuse in a serverless-friendly way.

## Features

- **Distributed Rate Limiting**: Works across all serverless functions and deployments
- **Sliding Window Algorithm**: More accurate than fixed window (no burst at window boundaries)
- **Development Fallback**: In-memory rate limiting when Redis is not configured
- **Configurable Limits**: Currently set to 5 requests per 10 seconds per IP

## Setup Instructions

### 1. Create Upstash Account

1. Go to [https://console.upstash.com](https://console.upstash.com/)
2. Sign up for a free account (GitHub or Google login available)
3. The free tier includes:
   - 10,000 requests per day
   - 256 MB storage
   - Perfect for development and small production deployments

### 2. Create Redis Database

1. Click "Create Database" in the Upstash console
2. Choose a database name (e.g., `camino-production` or `camino-dev`)
3. Select a region close to your Vercel deployment region:
   - US East (Ohio) for `us-east-1`
   - US West (Oregon) for `us-west-2`
   - EU (Ireland) for `eu-west-1`
4. Choose "Regional" (not Global) for best performance
5. Click "Create"

### 3. Get Connection Credentials

After creating the database:

1. Go to the database details page
2. Scroll to "REST API" section
3. Copy the following values:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 4. Configure Environment Variables

#### Local Development

1. Copy the example env file:
   ```bash
   cd walter-marketing
   cp .env.example .env.local
   ```

2. Add your Upstash credentials to `.env.local`:
   ```env
   UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your_token_here
   ```

#### Vercel Deployment

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add both variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Select environment: Production, Preview, Development (as needed)
5. Click "Save"

### 5. Verify Setup

#### Check Development Mode

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Watch the console logs:
   - **With Redis**: No warnings
   - **Without Redis**: You'll see `⚠️ Using in-memory rate limiting`

#### Test Rate Limiting

1. Use curl to test the lead capture endpoint:
   ```bash
   # This should succeed (1st request)
   curl -X POST http://localhost:3005/api/leads \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test User","source":"homepage"}'

   # Run this 6 times quickly - the 6th should be rate limited
   for i in {1..6}; do
     curl -X POST http://localhost:3005/api/leads \
       -H "Content-Type: application/json" \
       -d "{\"email\":\"test$i@example.com\",\"name\":\"Test $i\",\"source\":\"homepage\"}"
     echo ""
   done
   ```

2. Expected behavior:
   - First 5 requests: Success (status 200 or 409 if email exists)
   - 6th request: Rate limited (status 429)

3. Rate limit response example:
   ```json
   {
     "error": "Too many requests. Please try again later.",
     "limit": 5,
     "remaining": 0,
     "reset": "2024-11-03T18:00:00.000Z"
   }
   ```
   **Note:** The `reset` timestamp indicates when the rate limit window resets (Unix timestamp in milliseconds).

## Implementation Details

### Rate Limiting Configuration

Located in `lib/rate-limit.ts`:

```typescript
// Current configuration
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"), // 5 requests per 10 seconds
  analytics: true,
  prefix: "ratelimit:lead-capture",
});
```

### Adjusting Rate Limits

To change the rate limit:

1. Open `lib/rate-limit.ts`
2. Modify the `slidingWindow` parameters:
   ```typescript
   // More permissive (10 requests per 10 seconds)
   limiter: Ratelimit.slidingWindow(10, "10 s")

   // More restrictive (3 requests per 10 seconds)
   limiter: Ratelimit.slidingWindow(3, "10 s")

   // Longer window (5 requests per 60 seconds)
   limiter: Ratelimit.slidingWindow(5, "60 s")
   ```

### IP Address Detection

The system detects IP addresses from multiple headers for compatibility:

1. `x-forwarded-for` (Vercel, most proxies)
2. `x-real-ip` (Nginx, some proxies)
3. `cf-connecting-ip` (Cloudflare)
4. Fallback: `"anonymous"` if no IP found

## Monitoring

### Upstash Console

1. Go to your database in Upstash console
2. Check the "Metrics" tab:
   - Request count
   - Storage usage
   - Error rate

### Application Logs

Rate limit events are logged:

```
🚫 Rate limit exceeded for IP: 203.0.113.42
```

## Troubleshooting

### Issue: In-memory rate limiting warning

**Cause**: Redis credentials not configured

**Solution**:
1. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
2. Check for typos in variable names
3. Restart dev server after adding env vars

### Issue: Rate limiting not working in production

**Cause**: Environment variables not set in Vercel

**Solution**:
1. Go to Vercel project settings
2. Add environment variables
3. Redeploy the application

### Issue: All requests being rate limited

**Cause**: Multiple deployments sharing the same Redis database

**Solution**:
1. Create separate databases for dev/staging/production
2. Use different prefixes:
   ```typescript
   prefix: `ratelimit:${process.env.NODE_ENV}:lead-capture`
   ```

## Cost Estimates

### Free Tier Limits
- 10,000 commands/day = ~416 requests/hour
- At 5 requests/submission, supports ~83 form submissions/hour
- Sufficient for most early-stage applications

### Paid Plans
If you exceed free tier:
- **Pay as You Go**: $0.20 per 100K commands
- **Pro 2K**: $10/month for 200K commands/day
- **Pro 10K**: $50/month for 1M commands/day

### Scaling Considerations

For high-traffic scenarios:
- Each lead submission = 1 rate limit check = 1 command
- 1,000 submissions/day = 1,000 commands
- Still within free tier!

## Security Notes

1. **Never commit credentials**: Ensure `.env.local` is in `.gitignore`
2. **Rotate tokens**: If credentials are exposed, regenerate in Upstash console
3. **Monitor usage**: Set up alerts in Upstash for unusual traffic
4. **Use HTTPS**: Always use secure connections (automatic with Upstash REST API)

## Further Reading

- [Upstash Documentation](https://docs.upstash.com/redis)
- [Rate Limiting Best Practices](https://upstash.com/blog/rate-limiting)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

If you encounter issues:
1. Check Upstash status: [https://status.upstash.com](https://status.upstash.com)
2. Review application logs in Vercel
3. Contact Upstash support (very responsive!)
