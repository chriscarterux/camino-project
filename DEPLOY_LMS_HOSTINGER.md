# Deploy Frappe LMS to Hostinger VPS

## Current Status

**Camino Marketing:**
- ✅ Deployed on Hostinger: http://46.202.93.22:3003
- ✅ All features working (auth, reflection, pricing)

**Frappe LMS:**
- ⏳ Ready to deploy to Hostinger
- ✅ 153 courses scanned and ready
- ⏳ Needs Docker deployment on VPS

## Deployment Strategy

Deploy both services on Hostinger with separate ports:
- **Port 3003** - Camino Marketing (Next.js) ✅ Running
- **Port 8000** - Frappe LMS (Python/MariaDB) ⏳ To deploy

## 🚀 Deployment Steps

### Step 1: Deploy Frappe LMS to Hostinger (SSH Required)

```bash
# SSH into VPS
ssh root@46.202.93.22

# Navigate to project
cd /root/walter-project/walter-lms

# Start Frappe LMS with Docker Compose
docker compose up -d

# Check containers
docker compose ps

# View logs
docker compose logs -f
```

### Step 2: Access Frappe Admin

Once deployed:
- **URL:** http://46.202.93.22:8000
- **Login:** Administrator / admin

### Step 3: Create API Credentials

1. Go to: http://46.202.93.22:8000/app/user/Administrator
2. Scroll to "API Access"
3. Click "Generate Keys"
4. Copy the `api_key` and `api_secret`

### Step 4: Update Local Environment

Add to `.env.local`:
```bash
LMS_API_URL=http://46.202.93.22:8000
LMS_API_KEY=your_api_key_from_step_3
LMS_API_SECRET=your_api_secret_from_step_3
```

### Step 5: Create Categories in Frappe

Run this on VPS or locally once API is configured:

```bash
# Create 7 course categories
node scripts/create-frappe-categories.js
```

### Step 6: Bulk Upload 153 Courses

```bash
# Upload all course shells
node scripts/scan-and-upload-courses.js

# This creates all 153 courses in Frappe
# Takes ~5-10 minutes
```

### Step 7: Add Lesson Content (Manual or Automated)

**Option A: Manual (5 Priority Courses First)**
- Pick 5 most important courses
- Open each in Frappe admin
- Copy content from Training Manual.docx
- Upload PowerPoint slides
- ~15-20 min per course

**Option B: Automated (Future Enhancement)**
- Build Word doc parser
- Extract lessons automatically
- Bulk upload via API

## 🔗 Integration Flow After Deployment

```
User subscribes to Journey ($19.95)
  ↓
Stripe webhook → Supabase
  ↓
Background job calls /api/lms/enroll
  ↓
User enrolled in:
  - 4 Camino modules (walter-lms on Hostinger)
  - Access to 153 courses (walter-lms on Hostinger)
  ↓
User accesses /journey/learn on Camino site
  ↓
Camino fetches course data from Frappe API
  ↓
Seamless branded experience
```

## 🌐 Production URLs (After Deployment)

**Camino Marketing:**
- http://46.202.93.22:3003 (current)
- http://srv929014.hstgr.cloud:3003 (current)
- Future: https://camino.app

**Frappe LMS API:**
- http://46.202.93.22:8000 (after deployment)
- http://srv929014.hstgr.cloud:8000 (after deployment)
- Future: https://lms.camino.app (subdomain)

**User-facing:**
- All LMS content served through Camino UI
- Users never see Frappe branding
- Seamless single-app experience

## 📦 Docker Compose Configuration

File already exists at: `walter-lms/docker-compose.yml`

Services:
- **MariaDB** - Database for courses/users
- **Redis** - Caching
- **Frappe** - Backend API (port 8000)

## 🧪 Quick Test After Deployment

```bash
# Test Frappe API is accessible
curl http://46.202.93.22:8000/api/method/ping

# Test from Camino app
curl http://46.202.93.22:3003/api/lms/progress
```

## 🚨 Important Notes

**Environment Variables on VPS:**
When deploying, ensure these are set:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://cjechozcgxrjbsumltho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your key]
SUPABASE_SERVICE_ROLE_KEY=[your key]
RESEND_API_KEY=re_XQe3C3tf_MtXLv8NcABE3uHqe9HNFbVkD
LMS_API_URL=http://localhost:8000  # Internal Docker network
LMS_API_KEY=[from Frappe after deployment]
LMS_API_SECRET=[from Frappe after deployment]
```

**Docker Network:**
- Camino and Frappe can communicate via Docker network
- Or use localhost since both run on same VPS

---

**Ready to deploy?** I can help you SSH into Hostinger and set up the Frappe LMS!
