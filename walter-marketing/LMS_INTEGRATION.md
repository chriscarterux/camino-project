# Camino LMS Integration - Full Implementation Guide

## 🎯 Architecture Overview

**Hybrid System:**
- **Frontend:** Next.js (All user-facing pages in Camino branding)
- **Backend:** Frappe LMS (Headless API for course data & admin)
- **Auth:** Supabase (Primary authentication)
- **Payments:** Stripe (Subscription management)

## ✅ What's Been Built

### 1. Core Infrastructure

**API Clients** (`/lib/lms/`)
- ✅ `frappe-client.ts` - REST API wrapper for Frappe
- ✅ `courses.ts` - Course, chapter, lesson fetching
- ✅ `progress.ts` - Lesson completion & quiz tracking
- ✅ `auth-bridge.ts` - Supabase ↔ Frappe user sync
- ✅ `access-control.ts` - Subscription-based permissions

### 2. Student-Facing Pages

**Journey/LMS Routes** (`/app/journey/learn/`)
- ✅ Module grid with lock/unlock based on subscription
- ✅ Module detail pages with chapter/lesson lists
- ✅ Lesson player with video integration (React Player)
- ✅ Progress tracking (rings, percentages)
- ✅ Quiz interface component
- ✅ Reflection integration

### 3. Admin Dashboard

**Admin Routes** (`/app/admin/`)
- ✅ Overview dashboard with key metrics
- ✅ User management (view all users, filter by plan)
- ✅ Course management (links to Frappe admin)
- ✅ Quick access to Stripe, Supabase, Frappe dashboards

### 4. API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /api/lms/sync-user` | Sync Supabase user to Frappe |
| `POST /api/lms/enroll` | Enroll user in Journey modules |
| `GET /api/lms/progress` | Get all module progress |
| `POST /api/lms/complete-lesson` | Mark lesson complete |

### 5. Supabase Schema Updates

Added to `profiles` table:
- `lms_user_id` - Frappe user email
- `lms_api_token` - Encrypted API token for Frappe
- `lms_synced_at` - Last sync timestamp

## 🚀 Setup Instructions

### Step 1: Run Frappe LMS Backend

```bash
# Navigate to LMS directory
cd /Users/chriscarter/Documents/GitHub/walter-project/walter-lms

# Start Docker containers
docker-compose up -d

# Wait for services to start (~30 seconds)
docker-compose logs -f

# Access admin panel
open http://lms.localhost:8000
# Login: Administrator / admin
```

### Step 2: Update Supabase Schema

1. Go to Supabase SQL Editor
2. Run the updated `/supabase/schema.sql`
3. This adds LMS fields to profiles table

### Step 3: Configure Environment

Already configured in `.env.local`:
```bash
# LMS API
LMS_API_URL=http://lms.localhost:8000
LMS_API_KEY=your_frappe_api_key
LMS_API_SECRET=your_frappe_api_secret

# Supabase (already set)
# Resend (already set)
```

### Step 4: Create Journey Modules in Frappe

1. Open Frappe admin: http://lms.localhost:8000
2. Go to **LMS Course** → **New**
3. Create 4 courses with these exact slugs:
   - `camino-module-1-awareness`
   - `camino-module-2-belonging`
   - `camino-module-3-resilience`
   - `camino-module-4-purpose`

4. For each course:
   - Add chapters (2-3 per module)
   - Add lessons to each chapter
   - Upload videos (YouTube links or uploads)
   - Create quizzes
   - Set as "Published"

### Step 5: Test the Flow

**Test User Journey:**
```bash
# 1. Start Next.js dev server
npm run dev

# 2. Sign up new user
open http://localhost:3000/signup

# 3. User auto-synced to Frappe
# Check: http://lms.localhost:8000/app/user

# 4. Upgrade to Journey (mock or via Stripe)
# User auto-enrolled in 4 modules

# 5. Access LMS
open http://localhost:3000/journey/learn

# 6. Watch lessons, complete, see progress
```

## 🎨 Camino Theming the LMS

### Frontend (Next.js)
Already styled with Camino design system:
- Gold (#E2C379) accents
- Serif headings
- Smooth transitions
- Progress rings with Camino colors

### Frappe Admin (Optional branding)
To rebrand the Frappe admin interface:

1. **Logo**: Upload Camino logo
   - Go to: LMS Settings → Brand Settings
   - Upload logo image

2. **Colors**: Customize in `/walter-lms/frontend/tailwind.config.js`
```js
theme: {
  extend: {
    colors: {
      primary: '#E2C379', // Camino gold
      secondary: '#2D2F33', // Camino slate
    }
  }
}
```

3. **Rebuild frontend**:
```bash
cd walter-lms/frontend
yarn build
```

## 🔐 How SSO Works

**Signup Flow:**
1. User signs up on Camino (`/signup`)
2. Supabase creates auth user
3. Profile created with trigger
4. API call to `/api/lms/sync-user`
5. Frappe user created via API
6. API token generated and stored
7. Welcome email sent
8. User redirected to `/app`

**Subscription Flow:**
1. User subscribes to Journey on `/pricing`
2. Stripe webhook → Supabase subscription table
3. Background job calls `/api/lms/enroll`
4. User enrolled in all 4 Camino modules
5. Can now access `/journey/learn/*` routes

**LMS Access Flow:**
1. User clicks "Journey" in app
2. Middleware checks subscription plan
3. If `reflect` → Redirect to pricing with upgrade prompt
4. If `journey` or `coach` → Allow access
5. All LMS API calls use user's Frappe token

## 📊 Admin Workflows

### Managing Courses

**In Frappe Admin:**
- Create/edit courses, chapters, lessons
- Upload videos (YouTube or file upload)
- Create quizzes and assignments
- Set pricing (not used - handled by Stripe)
- Manage evaluators for coaching tier

**In Camino Admin:**
- View all users and their progress
- Manually grant/revoke access
- See enrollment statistics
- Export user data

### Managing Subscriptions

**In Stripe Dashboard:**
- Create products: Journey ($19.95), Coach ($1,000)
- Manage billing, refunds, cancellations
- View MRR and churn

**In Camino Admin:**
- See which users have which plans
- View subscription status
- Manually upgrade/downgrade (if needed)

## 🔄 Data Flow Diagram

```
User Signup
  ↓
Supabase Auth
  ↓
Create Profile (trigger)
  ↓
Sync to Frappe (/api/lms/sync-user)
  ↓
Frappe User Created
  ↓
API Token Generated
  ↓
Token Stored in Supabase

User Subscribes to Journey
  ↓
Stripe Checkout
  ↓
Webhook → Supabase subscriptions table
  ↓
Auto-Enroll (/api/lms/enroll)
  ↓
Frappe Enrollments Created
  ↓
User can access /journey/learn

User Completes Lesson
  ↓
POST /api/lms/complete-lesson
  ↓
Frappe marks lesson complete
  ↓
Progress updated
  ↓
Reflected in Camino dashboard
```

## 🧪 Testing Checklist

- [ ] User can sign up
- [ ] User auto-synced to Frappe
- [ ] Free user sees locked modules
- [ ] Journey subscriber can access all modules
- [ ] Video player works
- [ ] Progress tracked correctly
- [ ] Quizzes can be completed
- [ ] Admin can view users
- [ ] Admin can manage courses in Frappe
- [ ] Stripe webhook updates subscription
- [ ] Enrollment automation works

## 🚧 Future Enhancements

**Phase 2 (Post-MVP):**
- Certificate generation & download
- Assignment file uploads
- Live class scheduling
- Community discussions
- Mobile app (React Native)

**Phase 3 (Scale):**
- Content CDN for videos
- Advanced analytics (Mixpanel/PostHog)
- A/B testing for lesson formats
- AI-powered lesson recommendations
- Cohort-based learning groups

## 🔧 Troubleshooting

**"LMS not synced" error:**
- User needs to call `/api/lms/sync-user`
- Automatically called on signup
- Can be manually triggered from admin

**Videos not loading:**
- Check YouTube URL format
- Ensure react-player is installed
- Check network/firewall

**Progress not updating:**
- Verify Frappe API token is valid
- Check Frappe backend is running
- Review API logs

## 📞 Support Resources

- **Frappe Docs:** https://docs.frappe.io/learning
- **Frappe Forum:** https://discuss.frappe.io/c/lms/70
- **React Player:** https://github.com/cookpete/react-player

---

**Your Camino LMS integration is complete!** Users get a seamless, beautifully branded learning experience while you retain the power of Frappe's admin tools. 🎉
