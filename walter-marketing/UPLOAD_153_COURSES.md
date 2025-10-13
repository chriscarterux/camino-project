# Upload 153 Courses to Camino Journey

## ✅ What's Ready

- **153 courses scanned** from `/CORPORATE TRNG ZIPS/`
- **Categorized** into 7 groups (Admin, Career, HR, Personal Dev, Sales, Supervisors, Workplace)
- **Matched** to Camino themes (95/153 matched, 58 need catalog updates)
- **Bulk upload script** created and tested (dry-run)

## 🎯 Upload Process

### Step 1: Start Frappe LMS (5 min)

```bash
cd /Users/chriscarter/Documents/GitHub/walter-project/walter-lms
docker-compose up -d

# Wait for services to start
sleep 30

# Verify it's running
curl http://lms.localhost:8000/api/method/ping
```

Access admin: **http://lms.localhost:8000**
Login: `Administrator` / `admin`

### Step 2: Get API Credentials (2 min)

In Frappe admin:
1. Go to: http://lms.localhost:8000/app/user/Administrator
2. Click "API Access" or "Generate Keys"
3. Copy:
   - `api_key`
   - `api_secret`

### Step 3: Update Environment Variables

Add to `/walter-marketing/.env.local`:
```bash
LMS_API_KEY=your_api_key_here
LMS_API_SECRET=your_api_secret_here
```

### Step 4: Create Categories in Frappe (10 min)

Before uploading courses, create these categories in Frappe:

1. Go to: http://lms.localhost:8000/app/lms-category
2. Click "New"
3. Create 7 categories:

```
Name: Administrative Skills
Slug: administrative-skills

Name: Career Development
Slug: career-development

Name: Human Resources
Slug: human-resources

Name: Personal Development
Slug: personal-development

Name: Sales And Marketing
Slug: sales-and-marketing

Name: Supervisors And Managers
Slug: supervisors-and-managers

Name: Workplace Essentials
Slug: workplace-essentials
```

### Step 5: Run Bulk Upload (5-10 min)

```bash
cd /Users/chriscarter/Documents/GitHub/walter-project/walter-marketing

# Upload all 153 courses
node scripts/scan-and-upload-courses.js
```

This creates all 153 course shells in Frappe LMS with:
- ✅ Title and description
- ✅ Category assignment
- ✅ Published status
- ✅ Certificate enabled
- ✅ Camino theme metadata

### Step 6: Add Lesson Content

**Option A: Manual (Recommended for MVP - 5 courses)**

Pick 5 priority courses and add content manually:

1. **Improving Self-Awareness** (Personal Dev - Awareness)
2. **Emotional Intelligence** (Personal Dev - Awareness)
3. **Communication Strategies** (Career - Belonging)
4. **Stress Management** (Personal Dev - Resilience)
5. **Goal Setting and Getting Things Done** (Personal Dev - Purpose)

For each:
1. Open in Frappe: `http://lms.localhost:8000/app/lms-course/[slug]`
2. Add Chapter: "Main Lessons"
3. Open `01-Training Manual/Training Manual.docx`
4. For each lesson section in the doc:
   - Add new lesson
   - Copy/paste content
   - Set duration estimate
5. Upload PowerPoint from `04-PowerPoint Slides/` as resource
6. Save and publish

**Time estimate:** ~15-20 min per course = 1.5-2 hours for 5 courses

**Option B: Automated (Future - All 153 courses)**

Build Word doc parser:
- Extract lessons from Training Manual.docx
- Auto-create lesson structure
- Bulk upload content via API

**Time estimate:** 10-15 hours to build + 2 hours runtime

## 🎓 Certificate Configuration

Certificates are auto-enabled for all courses. When a user completes 100% of lessons:
1. Frappe generates certificate
2. Camino displays download button
3. User can download PDF certificate

## 🧪 Testing Workflow

After uploading 5 courses:

1. **Verify in Frappe Admin:**
   - http://lms.localhost:8000/app/lms-course
   - Should see 5 courses listed

2. **Check in Camino:**
   - http://localhost:3002/journey/library
   - Should see courses in correct categories
   - Can click through to course pages

3. **Test User Flow:**
   - Sign up → Subscribe to Journey
   - Access /journey/library
   - Start a course → Complete lessons
   - Verify certificate appears

## 📊 Course Statistics

**By Camino Theme:**
- Awareness: ~40 courses
- Belonging: ~45 courses
- Resilience: ~40 courses
- Purpose: ~28 courses

**By Category:**
- Admin Skills: 10
- Career Development: 18
- Human Resources: 22
- Personal Development: 20
- Sales & Marketing: 24
- Supervisors & Managers: 18
- Workplace Essentials: 22
- Spanish: 37

**Total:** 153 courses available for Journey subscribers

## 💡 Recommended Phased Rollout

**Week 1 (MVP):**
- Upload 5 starter courses (one per theme)
- Add full lesson content
- Test with beta users
- Gather feedback

**Week 2:**
- Upload 20 most popular courses
- Focus on Personal Development category
- Refine based on usage data

**Week 3:**
- Upload remaining 128 courses
- Or build automation for bulk content upload

**Week 4:**
- Add Spanish courses
- Marketing campaign: "150+ courses included"

## 🚀 Quick Start Commands

```bash
# 1. Start Frappe LMS
cd walter-lms && docker-compose up -d

# 2. Scan courses (already done)
node scripts/scan-and-upload-courses.js --dry-run

# 3. Upload course shells
node scripts/scan-and-upload-courses.js

# 4. Manually add content to 5 priority courses

# 5. Test in Camino
open http://localhost:3002/journey/library
```

---

**You're ready to upload 153 courses!** Start with 5 to validate, then scale up. 🎉
