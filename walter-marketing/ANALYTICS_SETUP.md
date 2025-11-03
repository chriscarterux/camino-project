# Analytics Setup Guide

**Issue:** HOW-177
**Date:** 2025-11-03
**Status:** ✅ Implemented

---

## Overview

This guide documents the analytics instrumentation implemented for Camino, tracking the activation moment defined in HOW-160.

**Analytics Provider:** PostHog
**Implementation:** Server-side and client-side tracking
**Primary Event:** `user_activation_achieved`

---

## Why PostHog?

After evaluating options for 2025, PostHog was selected for:

1. **Privacy-First**: Self-hostable, GDPR/CCPA compliant out-of-the-box
2. **Cost-Effective**: Generous free tier (1M events/month), transparent pricing
3. **Real-Time**: Instant event tracking with live dashboards
4. **Feature-Rich**: Session replay, feature flags, A/B testing, cohorts
5. **Developer Experience**: Excellent TypeScript support, comprehensive docs
6. **Open Source**: No vendor lock-in, community-driven development

### Alternatives Considered

- **Mixpanel**: More expensive, less privacy-focused
- **Amplitude**: Better for product analytics but overkill for MVP
- **Segment**: Great for routing but adds complexity
- **Custom**: Too much infrastructure work for MVP

---

## Architecture

```
┌─────────────────┐
│   Client Side   │
│  (React/Next)   │
│                 │
│  - initAnalytics()
│  - trackEvent()  │
│  - Queue mgmt    │
└────────┬────────┘
         │
         ├─────────────┐
         │             │
    ┌────▼────┐   ┌───▼────────┐
    │ PostHog │   │ Event Queue│
    │  JS SDK │   │  (offline) │
    └─────────┘   └────────────┘

┌─────────────────┐
│   Server Side   │
│  (API Routes)   │
│                 │
│  - trackServer*()
│  - Calculate    │
│    metrics      │
└────────┬────────┘
         │
    ┌────▼────┐
    │ PostHog │
    │ Node SDK│
    └─────────┘
```

---

## Installation

### 1. Install Dependencies

```bash
npm install posthog-js posthog-node
```

### 2. Environment Variables

Add to `.env.local`:

```bash
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Or for self-hosted:
# NEXT_PUBLIC_POSTHOG_HOST=https://posthog.yourdomain.com
```

### 3. Initialize Analytics

**Client-side** (in `app/layout.tsx` or `_app.tsx`):

```typescript
import { useEffect } from 'react';
import { initAnalytics, identifyUser } from '@/lib/analytics';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Initialize PostHog
    initAnalytics();

    // Identify user if logged in
    const user = getCurrentUser(); // Your auth logic
    if (user) {
      identifyUser(user.id, {
        email: user.email,
        name: user.name,
        signup_date: user.created_at,
      });
    }
  }, []);

  return <>{children}</>;
}
```

**Server-side** (in API routes):

```typescript
import { initServerAnalytics } from '@/lib/analytics';

// Initialize once at startup
initServerAnalytics();
```

---

## Event Tracking

### 1. Activation Event

**Primary metric for user activation**

```typescript
import { trackActivation } from '@/lib/analytics';

trackActivation(userId, {
  reflection_count: 3,
  insight_id: 'insight-uuid-123',
  insight_type: 'pattern',
  days_since_signup: 5,
  session_count: 3,
  first_dimension: 'identity',
  activation_path: 'organic',
});
```

### 2. Reflection Completed

```typescript
import { trackReflectionCompleted } from '@/lib/analytics';

trackReflectionCompleted(userId, {
  reflection_id: 'reflection-uuid-123',
  reflection_count: 2,
  prompt_id: 'prompt-1',
  prompt_text: 'What matters most to you?',
  word_count: 150,
  time_spent_seconds: 300,
  mood: 'hopeful',
  session_number: 2,
  days_since_signup: 3,
});
```

### 3. Insight Generated

```typescript
import { trackInsightGenerated } from '@/lib/analytics';

trackInsightGenerated(userId, {
  insight_id: 'insight-uuid-123',
  insight_type: 'pattern',
  reflection_count: 3,
  reflection_ids: ['r1', 'r2', 'r3'],
  dimension: 'identity',
  generation_time_ms: 2500,
  ai_model: 'gpt-4',
  days_since_signup: 5,
});
```

### 4. Insight Viewed

```typescript
import { trackInsightViewed } from '@/lib/analytics';

trackInsightViewed(userId, {
  insight_id: 'insight-uuid-123',
  insight_type: 'pattern',
  is_first_insight: true,
  time_since_generation_seconds: 30,
  source: 'notification',
  days_since_signup: 5,
});
```

### 5. Insight Shared

```typescript
import { trackInsightShared } from '@/lib/analytics';

trackInsightShared(userId, {
  insight_id: 'insight-uuid-123',
  insight_type: 'pattern',
  share_method: 'social_media',
  platform: 'twitter',
  days_since_signup: 7,
});
```

---

## API Integration

### Reflections API

The reflections API automatically tracks completion:

```typescript
// POST /api/reflections
{
  "prompt_id": "prompt-1",
  "prompt_text": "What matters most?",
  "content": "User's reflection...",
  "mood": "hopeful",
  "dimension": "identity",
  "session_number": 1
}

// Response includes:
{
  "reflection": { ... },
  "reflection_count": 3,
  "should_generate_insight": true,
  "insight": { ... } // If 3rd reflection
}
```

### Insights API

```typescript
// POST /api/insights
{
  "reflection_ids": ["r1", "r2", "r3"],
  "dimension": "identity"
}

// GET /api/insights/:id?source=onboarding
// Automatically tracks view and fires activation if first insight
```

---

## Privacy & Compliance

### GDPR Compliance

1. **Respect Do Not Track**: Analytics automatically disabled if `navigator.doNotTrack === '1'`
2. **No PII in Events**: Never track email, passwords, or reflection content
3. **User Control**: Provide opt-out in user settings
4. **Data Retention**: Configure in PostHog (default: 7 years, reduce to 1 year)

### What We Track

✅ **Allowed:**
- User IDs (anonymized UUIDs)
- Event names and properties
- Timestamps
- Session counts
- Reflection counts
- Word counts
- Dimensions (identity/worldview/relationships)

❌ **Never Tracked:**
- Email addresses
- Names
- Reflection content
- Passwords or tokens
- IP addresses (stripped by PostHog)

### Opt-Out Implementation

```typescript
// User settings page
import { resetAnalytics } from '@/lib/analytics';

function disableAnalytics() {
  localStorage.setItem('analytics_disabled', 'true');
  resetAnalytics();
}
```

---

## Testing

### Unit Tests

```bash
npm run test tests/unit/analytics.test.ts
```

Tests cover:
- Event type validation
- Privacy compliance
- Queue management
- Error handling
- Helper functions

### Integration Tests

```bash
npm run test tests/integration/activation-flow.test.ts
```

Tests cover:
- Full activation journey
- Event sequencing
- Funnel metrics
- Timing calculations
- Error recovery

### E2E Tests

```bash
npm run test:e2e tests/e2e/activation-journey.spec.ts
```

Tests cover:
- Complete user flow
- Analytics event tracking
- Accessibility
- Performance
- Security
- Mobile experience

---

## Monitoring

### PostHog Dashboards

1. **Activation Dashboard**
   - Activation rate (target: >60% in 7 days)
   - Time to activation
   - Activation path breakdown
   - Drop-off analysis

2. **Reflection Funnel**
   - Signup → 1st reflection (target: 80%)
   - 1st → 2nd reflection (target: 70%)
   - 2nd → 3rd reflection (target: 65%)
   - 3rd → Insight viewed (target: 60%)

3. **Insight Quality**
   - Generation time (target: <3s)
   - View rate
   - Share rate
   - Type distribution

### Key Metrics

```sql
-- Activation rate (PostHog SQL)
SELECT
  COUNT(DISTINCT user_id) as total_users,
  COUNT(DISTINCT CASE
    WHEN event = 'user_activation_achieved'
    THEN user_id
  END) as activated_users,
  (activated_users / total_users) * 100 as activation_rate
FROM events
WHERE timestamp >= NOW() - INTERVAL 7 DAYS
```

---

## Debugging

### Enable Debug Mode

```bash
# .env.local
NODE_ENV=development
```

Debug logs will show:
```
[Analytics] PostHog initialized
[Analytics] Event tracked: reflection_completed
[Analytics] User identified: user-123
```

### Check Event Queue

```typescript
import { getConfig } from '@/lib/analytics';

console.log(getConfig());
// Shows: enabled, apiKey (masked), queued events
```

### Verify Events in PostHog

1. Go to PostHog dashboard
2. Navigate to Activity → Live Events
3. Filter by user ID or event name
4. Verify properties are correct

---

## Database Schema

### user_activations Table

```sql
CREATE TABLE user_activations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  activated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  reflection_count INTEGER NOT NULL,
  insight_id UUID REFERENCES insights(id),
  days_since_signup INTEGER NOT NULL,
  session_count INTEGER NOT NULL,
  activation_path VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT unique_user_activation UNIQUE(user_id)
);

CREATE INDEX idx_activations_user ON user_activations(user_id);
CREATE INDEX idx_activations_date ON user_activations(activated_at);
```

### profiles Table Updates

```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_activated BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS activated_at TIMESTAMP;
```

### insights Table Updates

```sql
ALTER TABLE insights ADD COLUMN IF NOT EXISTS viewed_at TIMESTAMP;
ALTER TABLE insights ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
```

---

## Performance

### Event Tracking

- **Client-side**: Non-blocking, queued if offline
- **Server-side**: Fire-and-forget, no blocking
- **Insight generation**: <3 seconds target
- **Activation event**: Fires immediately on view

### Optimization

1. **Batch Events**: PostHog batches events automatically
2. **Queue Offline**: Events queued locally and sent when online
3. **No Blocking**: All tracking is async
4. **Rate Limiting**: PostHog handles rate limits gracefully

---

## Troubleshooting

### Events Not Appearing

1. Check API key is set: `echo $NEXT_PUBLIC_POSTHOG_KEY`
2. Verify PostHog is initialized: Check browser console
3. Check network tab for failed requests
4. Verify user is identified: `posthog.get_distinct_id()`

### Activation Not Firing

1. Verify user has completed 3 reflections
2. Check insight was generated successfully
3. Verify insight view API call succeeded
4. Check `is_activated` flag in database
5. Look for `user_activation_achieved` event in PostHog

### Performance Issues

1. Reduce debug logging in production
2. Check event queue size
3. Verify PostHog host is reachable
4. Consider self-hosting PostHog for faster response

---

## Production Checklist

- [ ] PostHog API key configured
- [ ] Analytics initialized in root layout
- [ ] Server-side analytics initialized
- [ ] Database tables created
- [ ] Privacy policy updated
- [ ] Cookie consent implemented (if EU traffic)
- [ ] Debug mode disabled
- [ ] Dashboards created in PostHog
- [ ] Alerts configured for activation rate
- [ ] Team trained on dashboard usage

---

## Support

**Documentation:**
- PostHog Docs: https://posthog.com/docs
- Camino Analytics: This file

**Issues:**
- Linear: HOW-177
- PostHog Support: https://posthog.com/support

**Team Contacts:**
- Analytics Lead: [Your Name]
- Backend: [Backend Lead]
- Product: [Product Manager]

---

## Changelog

- **2025-11-03**: Initial implementation (HOW-177)
  - PostHog integration
  - 5 core events tracked
  - Server and client-side tracking
  - Complete test coverage
  - Documentation complete
