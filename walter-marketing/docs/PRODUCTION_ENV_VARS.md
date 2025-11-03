# Production Environment Variables Guide

## Overview

This document provides a comprehensive guide to configuring all environment variables required for Camino production deployment. Each service is documented with setup instructions, testing procedures, and cost estimates.

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Required Services](#required-services)
3. [Optional Services](#optional-services)
4. [Deployment](#deployment)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)

---

## Quick Reference

### All Environment Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://camino.app
NEXT_PUBLIC_APP_URL=https://camino.app

# Database & Auth (Supabase) - REQUIRED
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Analytics (PostHog) - REQUIRED
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Payments (Stripe) - REQUIRED
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_PRODUCT_REFLECT=free
STRIPE_PRODUCT_JOURNEY=price_xxxxx
STRIPE_PRODUCT_COACH=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Email (Resend) - REQUIRED
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@camino.app

# Rate Limiting (Upstash Redis) - REQUIRED
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# AI (OpenAI) - REQUIRED
OPENAI_API_KEY=sk-proj-xxxxx

# LMS Integration (Optional)
LMS_API_URL=https://lms.camino.app
LMS_API_KEY=xxxxx
LMS_API_SECRET=xxxxx
NEXT_PUBLIC_LMS_URL=https://lms.camino.app/lms

# Booking (Cal.com) - Optional
NEXT_PUBLIC_CAL_LINK=camino/consultation
```

---

## Required Services

### 1. Supabase (Database & Authentication)

**Purpose:** PostgreSQL database and authentication backend

**Setup:**

1. Go to [https://supabase.com](https://supabase.com)
2. Create account and new project
3. Choose region close to your users (US East, EU, etc.)
4. Note your database password (save securely!)
5. Get credentials from Project Settings → API

**Environment Variables:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Cost:**
- Free tier: 500 MB database, 50,000 monthly active users
- Pro: $25/month (8 GB database, 100,000 MAU)

**Testing:**

```bash
# Test connection
curl https://xxxxx.supabase.co/rest/v1/ \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Documentation:** See `docs/SUPABASE_SETUP.md` (to be created)

---

### 2. PostHog (Product Analytics)

**Purpose:** User analytics, feature flags, session recording

**Setup:**

1. Go to [https://posthog.com](https://posthog.com)
2. Create account
3. Create new project
4. Choose deployment region (US or EU for GDPR)
5. Get Project API key from Project Settings

**Environment Variables:**

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # or https://eu.i.posthog.com
```

**Cost:**
- Free tier: 1 million events/month
- Paid: $0.000225 per event after free tier

**Features Used:**
- Page view tracking
- User activation events
- Conversion funnel analysis
- Session recordings (optional)
- Feature flags for A/B testing

**Testing:**

```bash
# Verify in PostHog dashboard after deployment
# Check Live Events tab for incoming pageviews
```

**Documentation:** See existing implementation in `lib/posthog.ts`

---

### 3. Stripe (Payment Processing)

**Purpose:** Subscription billing for Journey and Coaching tiers

**Setup:**

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Create account or login
3. Switch to Live mode (top-left toggle)
4. Get API keys from Developers → API keys
5. Create products:
   - **Reflect** (Free tier)
   - **Journey** ($19.95/month)
   - **Integrated Transformation** ($1,000/month)
6. Set up webhook endpoint for `/api/webhooks/stripe`
7. Note webhook signing secret

**Environment Variables:**

```env
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_PRODUCT_REFLECT=free
STRIPE_PRODUCT_JOURNEY=price_xxxxx
STRIPE_PRODUCT_COACH=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**Cost:**
- No monthly fee
- 2.9% + $0.30 per successful charge
- Additional 0.5% for international cards

**Product Setup:**

```bash
# Create products via Stripe Dashboard or CLI
stripe products create \
  --name "Camino Journey" \
  --description "12-week transformation with AI insights"

stripe prices create \
  --product {PRODUCT_ID} \
  --currency usd \
  --unit-amount 1995 \
  --recurring interval=month
```

**Testing:**

Use test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

**Documentation:** [Stripe Docs](https://stripe.com/docs/api)

---

### 4. Resend (Transactional Email)

**Purpose:** Welcome emails, weekly insights, password resets

**Setup:**

1. Go to [https://resend.com](https://resend.com)
2. Create account
3. Add and verify your sending domain (camino.app)
4. Create API key from API Keys page
5. Configure SPF/DKIM records in DNS

**Environment Variables:**

```env
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@camino.app
```

**Cost:**
- Free tier: 100 emails/day (3,000/month)
- Paid: $20/month for 50,000 emails

**DNS Configuration:**

```txt
# SPF Record (TXT)
v=spf1 include:_spf.resend.com ~all

# DKIM Record (TXT - provided by Resend)
resend._domainkey IN TXT "..."
```

**Email Templates:**

Located in `lib/emails/`:
- `welcome-lead.tsx` - Lead capture welcome
- `weekly-insights.tsx` - AI-generated insights
- `password-reset.tsx` - Password reset link

**Testing:**

```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer re_xxxxx' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "noreply@camino.app",
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<p>Test email from Camino</p>"
  }'
```

**Documentation:** [Resend Docs](https://resend.com/docs)

---

### 5. Upstash Redis (Rate Limiting)

**Purpose:** Distributed rate limiting for API endpoints

**Setup:**

See comprehensive guide: `docs/UPSTASH_REDIS_SETUP.md`

**Environment Variables:**

```env
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx
```

**Cost:**
- Free tier: 10,000 commands/day
- Paid: $10/month for 200K commands/day

---

### 6. OpenAI (AI Insights & Pattern Recognition)

**Purpose:** Generate reflection prompts, detect patterns, create weekly insights

**Setup:**

1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Create account
3. Add payment method (required even for API credits)
4. Create API key from API Keys page
5. Set usage limits to prevent runaway costs

**Environment Variables:**

```env
OPENAI_API_KEY=sk-proj-xxxxx
```

**Cost:**
- No monthly fee (pay-per-use)
- GPT-4: ~$0.03 per 1K tokens input, $0.06 per 1K tokens output
- Estimated: $50-200/month depending on user activity

**Models Used:**
- `gpt-4o-mini` - Daily prompts (cost-effective)
- `gpt-4o` - Pattern recognition (higher quality)
- `text-embedding-3-small` - Semantic search

**Rate Limits:**
- Tier 1 (free): 3 RPM, 200 RPD
- Tier 2 ($5+ spent): 3,500 RPM
- Set budget alerts in OpenAI dashboard

**Testing:**

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Say hello"}],
    "max_tokens": 10
  }'
```

**Documentation:** [OpenAI API Docs](https://platform.openai.com/docs)

---

## Optional Services

### 7. Cal.com (Coaching Session Booking)

**Purpose:** Schedule 1:1 coaching sessions for Integrated Transformation tier

**Setup:**

1. Go to [https://cal.com](https://cal.com)
2. Create account
3. Create event type: "Camino Coaching Session" (60 min)
4. Get your booking link

**Environment Variables:**

```env
NEXT_PUBLIC_CAL_LINK=your-username/coaching-session
```

**Cost:**
- Free tier: Unlimited 1:1 meetings
- Pro: $12/user/month (teams, workflows)

**Only Required For:** Tier 3 (Integrated Transformation) subscribers

---

### 8. Frappe LMS (Optional Learning Management)

**Purpose:** Course content delivery (if using separate LMS)

**Note:** This is optional. Camino can deliver content directly without external LMS.

**Environment Variables:**

```env
LMS_API_URL=https://lms.camino.app
LMS_API_KEY=xxxxx
LMS_API_SECRET=xxxxx
NEXT_PUBLIC_LMS_URL=https://lms.camino.app/lms
```

**Current Status:** Not actively used. Content delivered via in-app journey.

---

## Deployment

### Vercel Setup

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to Settings → Environment Variables
3. Add all variables from the Quick Reference section
4. Choose scope:
   - **Production** - Live site only
   - **Preview** - Git branch deployments
   - **Development** - Local development (optional)
5. Click "Save"
6. Redeploy to apply changes

### Environment-Specific Values

```env
# Development
NEXT_PUBLIC_SITE_URL=http://localhost:3005

# Staging
NEXT_PUBLIC_SITE_URL=https://staging.camino.app

# Production
NEXT_PUBLIC_SITE_URL=https://camino.app
```

### Security Best Practices

1. **Never commit secrets to git**
   - Use `.env.local` for local development
   - Ensure `.gitignore` includes `.env.local`

2. **Rotate credentials regularly**
   - Every 90 days minimum
   - Immediately if exposed

3. **Use least-privilege access**
   - Supabase: Use anon key for client, service key for server only
   - Stripe: Use restricted keys when possible

4. **Monitor for leaks**
   - Enable GitHub secret scanning
   - Use tools like `git-secrets`

---

## Verification

### Automated Health Check

Create `/api/health` endpoint:

```typescript
export async function GET() {
  const checks = {
    supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    posthog: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
    stripe: !!process.env.STRIPE_SECRET_KEY,
    resend: !!process.env.RESEND_API_KEY,
    upstash: !!process.env.UPSTASH_REDIS_REST_URL,
    openai: !!process.env.OPENAI_API_KEY,
  };

  const allConfigured = Object.values(checks).every(Boolean);

  return Response.json({
    status: allConfigured ? 'healthy' : 'degraded',
    services: checks,
  }, {
    status: allConfigured ? 200 : 503
  });
}
```

### Manual Verification Checklist

- [ ] Site loads at production URL
- [ ] PostHog shows live events in dashboard
- [ ] Lead capture form submission works
- [ ] Welcome email arrives
- [ ] Stripe checkout redirects correctly
- [ ] User can create account via Supabase
- [ ] Rate limiting triggers after 5 requests
- [ ] AI prompts generate successfully

---

## Troubleshooting

### Issue: "Invalid Supabase URL"

**Cause:** Incorrect URL format or missing protocol

**Solution:**
```env
# ❌ Wrong
NEXT_PUBLIC_SUPABASE_URL=xxxxx.supabase.co

# ✅ Correct
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
```

### Issue: PostHog events not appearing

**Cause:** Wrong host URL or ad blocker

**Solutions:**
1. Verify `NEXT_PUBLIC_POSTHOG_HOST` matches your region
2. Test in incognito mode (bypasses ad blockers)
3. Check browser console for CORS errors

### Issue: Stripe webhook failures

**Cause:** Webhook secret mismatch or endpoint not accessible

**Solutions:**
1. Verify webhook endpoint is public (not localhost)
2. Check webhook secret matches Stripe dashboard
3. Test webhook with Stripe CLI: `stripe listen --forward-to localhost:3005/api/webhooks/stripe`

### Issue: Emails not sending

**Cause:** Domain not verified or incorrect API key

**Solutions:**
1. Verify domain in Resend dashboard (check DNS records)
2. Test with Resend's testing endpoint first
3. Check Resend logs for delivery failures

### Issue: OpenAI rate limit errors

**Cause:** Exceeded tier limits or quota

**Solutions:**
1. Check usage in OpenAI dashboard
2. Increase tier by spending $5+
3. Implement request queuing/throttling

---

## Cost Summary

### Minimum Monthly Cost (Early Stage)

| Service | Tier | Cost |
|---------|------|------|
| Supabase | Free | $0 |
| PostHog | Free | $0 |
| Stripe | Pay-per-use | $0 base |
| Resend | Free | $0 |
| Upstash Redis | Free | $0 |
| OpenAI | Pay-per-use | ~$50 |
| **Total** | | **~$50/month** |

### Scaled Monthly Cost (1,000+ users)

| Service | Tier | Cost |
|---------|------|------|
| Supabase | Pro | $25 |
| PostHog | Paid | ~$50 |
| Stripe | 2.9% | Variable |
| Resend | Paid | $20 |
| Upstash Redis | Pro | $10 |
| OpenAI | Pay-per-use | ~$200 |
| **Total** | | **~$305/month + stripe fees** |

### Revenue Break-Even Analysis

At $19.95/month for Journey tier:
- Need ~16 subscribers to cover infrastructure
- Need ~50 subscribers for $1,000 MRR
- Target: 100+ subscribers for sustainable growth

---

## Support Resources

- **Supabase:** [docs.supabase.com](https://docs.supabase.com)
- **PostHog:** [posthog.com/docs](https://posthog.com/docs)
- **Stripe:** [stripe.com/docs](https://stripe.com/docs)
- **Resend:** [resend.com/docs](https://resend.com/docs)
- **Upstash:** [docs.upstash.com](https://docs.upstash.com)
- **OpenAI:** [platform.openai.com/docs](https://platform.openai.com/docs)

---

**Last Updated:** November 3, 2025
**Maintainer:** Camino DevOps Team
**Related Issues:** HOW-415, HOW-414
