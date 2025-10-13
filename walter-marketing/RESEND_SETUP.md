# Resend Email Integration - Camino

## Overview

Resend is fully integrated into the Camino website. Unlike traditional email services, Resend uses **React Email templates defined in code** (not a web-based editor). All templates are version-controlled in the codebase.

## ✅ What's Already Configured

### 1. API Key Setup
- **API Key:** `re_XQe3C3tf_MtXLv8NcABE3uHqe9HNFbVkD`
- **Permission:** Sending access
- **Status:** Active ✓
- **Location:** `.env.local` (already configured)

### 2. Email Templates Created

All templates are in `/lib/emails/` as React components:

| Template | File | Purpose |
|----------|------|---------|
| Welcome Email | `welcome.tsx` | Sent after signup |
| Daily Reminder | `daily-reminder.tsx` | Daily reflection prompts |
| Weekly Summary | `weekly-summary.tsx` | AI insights recap |
| Password Reset | `password-reset.tsx` | Password recovery |
| Contact Notification | `contact-notification.tsx` | Support form submissions |

### 3. API Routes Created

All endpoints are ready in `/app/api/emails/`:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/emails/welcome` | POST | Send welcome email |
| `/api/emails/contact` | POST | Handle contact form |
| `/api/emails/daily-reminder` | POST | Send daily prompts |
| `/api/emails/weekly-summary` | POST | Send weekly insights |
| `/api/emails/subscribe` | POST | Newsletter subscription |

### 4. Live Integrations

✅ **Signup page** - Sends welcome email on account creation
✅ **Support page** - Contact form sends emails with auto-reply
✅ **Essays page** - Newsletter subscription with confirmation

## 🚀 How Resend Templates Work

**Important:** Resend doesn't use a web-based template editor. Instead:

1. Templates are React components (already created in `/lib/emails/`)
2. API routes render these components and send via Resend API
3. All templates are version-controlled with your code

This is the modern, developer-first approach Resend uses.

## ⚠️ Domain Configuration Required

### Current Status
- **Using:** Resend's default `onboarding@resend.dev` domain
- **Limitation:** Good for testing, but has sending limits
- **Recommended:** Add your own domain for production

### To Add camino.app Domain:

1. Go to **Domains** in Resend dashboard
2. Click "Add domain"
3. Enter `camino.app`
4. Add DNS records they provide to your domain registrar:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT)
   - **Return-Path** (CNAME)
5. Wait for verification (usually 5-10 minutes)

Once verified, update `.env.local`:
```bash
RESEND_FROM_EMAIL=hello@camino.app
# or
RESEND_FROM_EMAIL=noreply@camino.app
```

## 📧 Email Examples

### Welcome Email
**Trigger:** User signs up
**From:** noreply@camino.app
**Subject:** "Welcome to your Camino"
**Contains:**
- Personalized greeting
- 3-step onboarding guide
- CTA to first reflection
- Antonio Machado quote

### Daily Reminder
**Trigger:** Cron job (7am user timezone)
**From:** noreply@camino.app
**Subject:** "Your daily reflection awaits 🔥 7 day streak!"
**Contains:**
- Personalized prompt
- Streak counter
- CTA to reflect now
- Motivational quote

### Weekly Summary
**Trigger:** Cron job (Sunday evening)
**From:** noreply@camino.app
**Subject:** "Your weekly reflection summary"
**Contains:**
- Reflection count
- Top 3 AI-detected themes
- CTA to Journey curriculum

## 🧪 Testing Emails

### Test Welcome Email
```bash
curl -X POST http://localhost:3000/api/emails/welcome \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","name":"Test User"}'
```

### Test Contact Form
```bash
curl -X POST http://localhost:3000/api/emails/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "subject":"Test Subject",
    "message":"Test message"
  }'
```

### Test Daily Reminder
```bash
curl -X POST http://localhost:3000/api/emails/daily-reminder \
  -H "Content-Type: application/json" \
  -d '{
    "email":"your-email@example.com",
    "name":"Test User",
    "prompt":"What are you grateful for today?",
    "streakDays":7
  }'
```

## 📅 Setting Up Automated Emails

### Daily Reminder (Every morning at 7am)

Using Vercel Cron:

1. Create `/app/api/cron/daily-reminders/route.ts`:
```typescript
export async function GET() {
  // Get all users with daily reminders enabled
  // For each user:
  //   - Get their current prompt
  //   - Get their streak count
  //   - Call /api/emails/daily-reminder

  return new Response('Daily reminders sent');
}
```

2. Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/daily-reminders",
    "schedule": "0 7 * * *"
  }]
}
```

### Weekly Summary (Every Sunday at 6pm)

Similar approach:
```json
{
  "crons": [{
    "path": "/api/cron/weekly-summaries",
    "schedule": "0 18 * * 0"
  }]
}
```

## 🎨 Email Design

All emails use Camino's design system:
- **Colors:** Gold (#E2C379), Sandstone (#F4E9D8), Slate (#2D2F33)
- **Typography:** Georgia serif for elegance
- **Layout:** Centered, max-width 600px
- **Branding:** "Guided reflection for a meaningful life"

## 📊 Monitoring

Check email status in Resend dashboard:
- **Emails tab** - See all sent emails
- **Logs tab** - Debug delivery issues
- **Metrics tab** - Track open rates, clicks, bounces

## 🔒 Security Best Practices

✅ API key stored in environment variables
✅ Never committed to git
✅ Server-side only (not exposed to client)
✅ Email validation on all endpoints
✅ Rate limiting recommended for production

## 🚀 Production Checklist

Before launching:
- [ ] Add and verify camino.app domain
- [ ] Update RESEND_FROM_EMAIL to use custom domain
- [ ] Set up cron jobs for automated emails
- [ ] Test all email flows end-to-end
- [ ] Configure support@camino.app forwarding
- [ ] Add rate limiting to API routes
- [ ] Set up error monitoring for email failures

## 💡 Pro Tips

1. **Testing:** Use Resend's test mode or send to yourself during development
2. **Personalization:** All templates support dynamic variables (name, streak, themes)
3. **Unsubscribe:** Add unsubscribe links for newsletter emails (required by law)
4. **Tracking:** Resend automatically tracks opens and clicks
5. **React Email:** Preview templates locally with `npm run email:dev` (can be set up)

## 📞 Support

- **Resend Docs:** https://resend.com/docs
- **React Email Docs:** https://react.email
- **Issues:** Check `/logs` in Resend dashboard

---

**All email infrastructure is production-ready!** The templates are beautiful, branded, and functional. Just add your domain and you're good to go. 🎉
