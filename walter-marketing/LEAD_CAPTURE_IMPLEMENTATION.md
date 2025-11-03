# Lead Capture Implementation Guide

## Overview

This document describes the complete lead capture system implemented for the Camino marketing site. The system is designed to convert visitors into leads through strategically placed forms with built-in validation, spam prevention, and analytics tracking.

## Architecture

### Components

1. **LeadCaptureForm Component** (`/components/LeadCaptureForm.tsx`)
   - Reusable form component with multiple variants (inline, card, minimal)
   - Client-side validation
   - Honeypot spam prevention
   - Loading states and error handling
   - Success state with confirmation message
   - Fully accessible (WCAG 2.1 AA compliant)

2. **FooterSignup Component** (`/components/FooterSignup.tsx`)
   - Lightweight wrapper for footer placement
   - Minimal variant without optional fields

3. **API Endpoint** (`/app/api/leads/route.ts`)
   - POST: Create new lead
   - GET: Retrieve lead statistics (admin only)
   - Rate limiting (3 requests per minute per IP)
   - Email validation and normalization
   - Duplicate prevention
   - Supabase integration

4. **Welcome Email** (`/lib/emails/welcome-lead.tsx`)
   - React Email template
   - Mobile-responsive design
   - Clear call-to-action
   - Brand-consistent styling

## Database Schema

```sql
-- Location: /supabase/migrations/20250103_leads_table.sql

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  primary_interest VARCHAR(50) CHECK (primary_interest IN ('identity', 'worldview', 'relationships')),
  source VARCHAR(100) NOT NULL CHECK (source IN ('homepage', 'how-it-works', 'pricing', 'footer', 'exit-intent')),
  converted_to_user BOOLEAN NOT NULL DEFAULT false,
  converted_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX leads_email_idx ON public.leads(email);
CREATE INDEX leads_source_idx ON public.leads(source);
CREATE INDEX leads_created_at_idx ON public.leads(created_at DESC);
CREATE INDEX leads_converted_idx ON public.leads(converted_to_user);

-- Analytics view
CREATE VIEW public.lead_stats AS
SELECT
  date_trunc('day', created_at) as date,
  source,
  count(*) as lead_count,
  count(*) FILTER (WHERE converted_to_user = true) as converted_count,
  round(100.0 * count(*) FILTER (WHERE converted_to_user = true) / nullif(count(*), 0), 2) as conversion_rate
FROM public.leads
GROUP BY date_trunc('day', created_at), source
ORDER BY date DESC;
```

## Form Placements

### 1. Homepage (`/app/page.tsx`)
- **Location:** Hero section, after three dimensions visual
- **Variant:** Card
- **Source:** `homepage`
- **Fields:** Email, Name (optional), Primary Interest, Consent
- **Purpose:** Primary conversion point

### 2. How It Works Page (`/app/how-it-works/page.tsx`)
- **Location:** Final CTA section
- **Variant:** Card
- **Source:** `how-it-works`
- **Fields:** Email, Name (optional), Primary Interest, Consent
- **Purpose:** Convert interested visitors who want to learn more

### 3. Pricing Page (`/app/pricing/page.tsx`)
- **Location:** After FAQ, before footer
- **Variant:** Card
- **Source:** `pricing`
- **Fields:** Email, Name (optional), Consent
- **Purpose:** Capture price-conscious visitors for free tier

### 4. Footer Widget (All pages)
- **Location:** Footer, first column
- **Variant:** Inline
- **Source:** `footer`
- **Fields:** Email, Consent
- **Purpose:** Persistent conversion opportunity

## Component Usage

### Basic Implementation

```tsx
import LeadCaptureForm from "@/components/LeadCaptureForm";

// Simple inline form
<LeadCaptureForm source="homepage" />

// Card variant with all fields
<LeadCaptureForm
  source="pricing"
  variant="card"
  showInterest={true}
/>

// Minimal variant
<LeadCaptureForm
  source="footer"
  variant="minimal"
  showInterest={false}
/>

// With success callback
<LeadCaptureForm
  source="homepage"
  onSuccess={() => {
    console.log("Lead captured!");
    // Track analytics, redirect, etc.
  }}
/>
```

### Props

```typescript
interface LeadCaptureFormProps {
  source: string;                           // Required: tracking identifier
  variant?: "inline" | "card" | "minimal"; // Default: "inline"
  showInterest?: boolean;                   // Default: true
  className?: string;                       // Additional CSS classes
  onSuccess?: () => void;                   // Success callback
}
```

## Validation

### Client-side Validation
- Email format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Required fields: email, consent
- Honeypot field: hidden from users, prevents bot submissions

### Server-side Validation
- Email format validation
- Email normalization (lowercase, trimmed)
- Source validation (whitelist)
- Primary interest validation (enum check)
- Duplicate email prevention

## Security

### Spam Prevention
1. **Honeypot Field:** Hidden field that bots typically fill
2. **Rate Limiting:** 3 requests per minute per IP address
3. **Email Validation:** Server-side regex validation
4. **Source Validation:** Only accepts predefined sources

### Data Protection
- **Email Normalization:** Stored as lowercase to prevent duplicates
- **RLS Policies:** Row-level security enabled on leads table
- **Service Role Only:** API requires service role for database access
- **No PII Exposure:** GET endpoint requires authentication

## Analytics Integration

### Tracking Events

The form automatically tracks the following events:

```typescript
// On successful submission
posthog.capture("lead_captured", {
  source: "homepage",           // Form placement
  interest: "identity",         // Selected interest (if any)
  has_name: true,               // Whether name was provided
});

// Form views (implement separately)
posthog.capture("lead_form_viewed", {
  source: "homepage",
  variant: "card",
});

// Form errors
posthog.capture("lead_form_error", {
  source: "homepage",
  error_type: "validation",
  field: "email",
});
```

### Conversion Metrics

Query the `lead_stats` view for analytics:

```sql
-- Daily lead counts by source
SELECT * FROM public.lead_stats
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC, source;

-- Conversion rates
SELECT
  source,
  SUM(lead_count) as total_leads,
  SUM(converted_count) as total_conversions,
  ROUND(AVG(conversion_rate), 2) as avg_conversion_rate
FROM public.lead_stats
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY source
ORDER BY total_leads DESC;
```

## Email Integration

### Welcome Email Flow

1. Lead submits form
2. API validates and stores lead
3. Resend API sends welcome email
4. Email includes:
   - Welcome message
   - Product overview
   - Primary CTA: "Start Your First Reflection"
   - Feature highlights
   - Support contact info

### Email Configuration

```env
# Required environment variables
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@camino.app
NEXT_PUBLIC_SITE_URL=https://camino.app
```

### Email Template

Location: `/lib/emails/welcome-lead.tsx`

The template uses inline styles for maximum email client compatibility and includes:
- Responsive design (mobile-first)
- Brand colors (#E2C379, #2D2F33)
- Clear hierarchy
- Accessible HTML structure

## Testing

### Unit Tests (`/tests/unit/LeadCaptureForm.test.tsx`)
- Form rendering
- Field validation
- Submission handling
- Error states
- Success states
- Honeypot prevention
- Accessibility

### Integration Tests (`/tests/integration/lead-capture-api.test.ts`)
- API endpoint validation
- Database operations
- Email sending
- Rate limiting
- Duplicate prevention

### E2E Tests (`/tests/e2e/lead-capture-flow.spec.ts`)
- Complete user flows
- Form submission
- Error handling
- Accessibility audit
- Mobile responsiveness
- Keyboard navigation

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test tests/integration

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y

# All tests
npm run test:all
```

## Performance

### Optimizations

1. **Component-level code splitting:** Form only loads when visible
2. **Instant feedback:** Client-side validation before API call
3. **Debounced validation:** Email validation debounced 500ms
4. **Optimistic UI:** Immediate success state, background email send
5. **Minimal bundle:** Form component < 10KB gzipped

### Metrics

- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.9s
- Form submission response: < 200ms (server-side)
- Email delivery: < 2s (Resend)

## Accessibility

### WCAG 2.1 AA Compliance

- All form fields have accessible labels (via `sr-only` class)
- Proper focus management
- Keyboard navigation support
- Error messages announced to screen readers
- Color contrast ratios meet AA standards
- Touch targets >= 44x44px

### Screen Reader Testing

Tested with:
- NVDA (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

## Monitoring

### Supabase Dashboard

Monitor lead capture health:
1. Navigate to Supabase Dashboard
2. Go to "Table Editor"
3. Select "leads" table
4. Check recent entries
5. Monitor error logs in "Logs" section

### Error Tracking

Errors are logged and should be monitored:
- API errors: Check server logs
- Email failures: Non-blocking, logged but don't fail request
- Database errors: Logged with context
- Validation errors: Tracked in analytics

## Maintenance

### Adding New Sources

1. Update schema validation in API (`/app/api/leads/route.ts`):
   ```typescript
   const validSources = [
     "homepage",
     "how-it-works",
     "pricing",
     "footer",
     "exit-intent", // Add new source
   ];
   ```

2. Update database constraint:
   ```sql
   ALTER TABLE public.leads
   DROP CONSTRAINT leads_source_check;

   ALTER TABLE public.leads
   ADD CONSTRAINT leads_source_check
   CHECK (source IN ('homepage', 'how-it-works', 'pricing', 'footer', 'exit-intent'));
   ```

3. Add form to new location
4. Update analytics tracking

### Updating Email Template

1. Edit `/lib/emails/welcome-lead.tsx`
2. Test locally with Resend playground
3. Send test emails
4. Verify rendering in major email clients:
   - Gmail
   - Outlook
   - Apple Mail
   - Mobile clients

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migration run
- [ ] RLS policies verified
- [ ] Email template tested
- [ ] Rate limiting configured
- [ ] Analytics tracking verified
- [ ] Error monitoring enabled
- [ ] All tests passing
- [ ] Accessibility audit clean
- [ ] Performance metrics acceptable

## Support

For issues or questions:
- Technical lead: Check CLAUDE.md
- Database: See SUPABASE_SETUP.md
- Email: See RESEND_SETUP.md

## Future Enhancements

Potential improvements:
1. **Exit Intent Popup:** Capture visitors before they leave
2. **A/B Testing:** Test form variants for conversion optimization
3. **Multi-step Forms:** Break long forms into steps
4. **Social Proof:** Display recent signups
5. **Urgency Indicators:** Limited time offers
6. **Progressive Profiling:** Collect more data over time
7. **Email Sequences:** Automated drip campaigns
8. **Lead Scoring:** Prioritize high-intent leads
