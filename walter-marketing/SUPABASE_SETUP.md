# Supabase Integration - Camino

## ✅ What's Been Configured

### 1. Environment Variables (Already Set)
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

### 2. Packages Installed
- ✅ `@supabase/supabase-js` (v2.75.0)
- ✅ `@supabase/ssr` (v0.7.0)

### 3. Client Configuration Created
- ✅ `/lib/supabase/client.ts` - Browser client
- ✅ `/lib/supabase/server.ts` - Server client
- ✅ `/lib/supabase/middleware.ts` - Session handling
- ✅ `/middleware.ts` - Route middleware

### 4. Auth Integration Complete
- ✅ Signup page → Creates Supabase user + sends welcome email
- ✅ Login page → Authenticates with Supabase
- ✅ Reset password → Supabase password recovery
- ✅ App routes → Protected (redirects to /login if not authenticated)
- ✅ Logout functionality → Signs out and redirects home

### 5. API Routes Created

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/reflections` | GET | Fetch all user reflections |
| `/api/reflections` | POST | Save new reflection |
| `/api/reflections/[id]` | GET | Fetch single reflection |
| `/api/reflections/[id]` | PATCH | Update reflection |
| `/api/reflections/[id]` | DELETE | Delete reflection |
| `/api/profile` | GET | Fetch user profile |
| `/api/profile` | PATCH | Update profile |

## 🚀 Database Setup (REQUIRED)

### Step 1: Run the Schema SQL

1. Open your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `cjechozcgxrjbsumltho`
3. Go to **SQL Editor** (left sidebar)
4. Click **New query**
5. Copy the entire contents of `/supabase/schema.sql`
6. Paste into the SQL editor
7. Click **Run** (or press Cmd/Ctrl + Enter)

This will create:
- ✅ `profiles` table (user data)
- ✅ `reflections` table (journal entries)
- ✅ `insights` table (AI summaries)
- ✅ `journey_progress` table (module tracking)
- ✅ `subscriptions` table (billing info)
- ✅ `notification_preferences` table (email settings)
- ✅ Row Level Security (RLS) policies
- ✅ Automatic triggers (profile creation, timestamps)

### Step 2: Verify Tables Created

Go to **Table Editor** and confirm you see:
- profiles
- reflections
- insights
- journey_progress
- subscriptions
- notification_preferences

### Step 3: Configure Auth Settings

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (should be on by default)
3. Optional: Enable **Google** or **GitHub** OAuth

4. Go to **Authentication** → **URL Configuration**
   - Set **Site URL:** `http://localhost:3000` (dev) or `https://camino.app` (prod)
   - Add **Redirect URLs:**
     - `http://localhost:3000/app`
     - `https://camino.app/app`
     - `http://localhost:3000/reset-password/confirm`

5. Go to **Authentication** → **Email Templates**
   - Customize if desired (optional - Camino uses Resend for emails)

## 📊 Database Schema

```
auth.users (Supabase managed)
  └── profiles (1:1)
       ├── reflections (1:many)
       ├── insights (1:many)
       ├── journey_progress (1:many)
       ├── subscriptions (1:1)
       └── notification_preferences (1:1)
```

### Tables Explained

**profiles**
- Extends Supabase auth.users
- Stores: name, plan (reflect/journey/coach), streak_days
- Auto-created on user signup via trigger

**reflections**
- User's daily journal entries
- Stores: prompt, content, mood, timestamps
- Used for AI insight generation

**insights**
- AI-generated summaries
- Stores: themes, summary text, time period
- Weekly/monthly aggregations

**journey_progress**
- Tracks completion of 4 modules
- Stores: module_id, progress_percent, completed status

**subscriptions**
- Synced with Stripe webhooks
- Stores: plan, status, billing dates

**notification_preferences**
- User email preferences
- Stores: daily_reminders, weekly_summaries, product_updates flags

## 🔒 Security (Row Level Security)

All tables have RLS policies that ensure:
- Users can only access their own data
- No user can see another user's reflections
- Server-side API routes use service_role for admin operations

## 🧪 Testing the Integration

### Test Signup Flow
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/signup
3. Create account with test email
4. Should:
   - Create user in Supabase Auth
   - Create profile in profiles table
   - Send welcome email via Resend
   - Redirect to /app

### Test Login
1. Go to: http://localhost:3000/login
2. Enter credentials
3. Should redirect to /app

### Test Protected Routes
1. Without logging in, try: http://localhost:3000/app
2. Should redirect to /login

### Test Reflection Storage
```bash
# After logging in, test saving a reflection:
curl -X POST http://localhost:3000/api/reflections \
  -H "Content-Type: application/json" \
  -b "your-session-cookie" \
  -d '{
    "prompt_id": 1,
    "prompt_text": "What are you grateful for?",
    "content": "Test reflection content here...",
    "mood": "good"
  }'
```

## 🔗 How It All Works Together

### User Signup Flow
1. User fills signup form → `/signup`
2. Supabase creates auth user
3. Trigger creates profile + notification_preferences
4. Resend sends welcome email
5. User redirected to `/app`

### Daily Reflection Flow
1. User writes reflection → `/app/reflect`
2. Saves to `reflections` table via API
3. Streak auto-calculated and updated
4. Can view in `/app/insights`

### Weekly Summary Flow (Future - needs cron job)
1. Cron job triggers every Sunday
2. Fetches week's reflections
3. Calls OpenAI to generate themes
4. Saves to `insights` table
5. Sends email via Resend

## 🎯 Next Steps

### Immediate (Required)
1. **Run `/supabase/schema.sql`** in Supabase SQL Editor
2. **Test signup/login** to verify auth works
3. **Test reflection saving** to verify database storage

### Soon
1. **Add OpenAI** for AI insight generation
2. **Set up Stripe webhooks** to sync subscriptions table
3. **Create cron jobs** for daily/weekly emails
4. **Add data export** functionality

### Production
1. Update **Site URL** in Supabase Auth settings
2. Add production **Redirect URLs**
3. Set up **database backups**
4. Configure **rate limiting**

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Row Level Security:** https://supabase.com/docs/guides/auth/row-level-security

---

**Your Supabase integration is complete!** Just run the schema SQL and you're ready to go. 🎉
