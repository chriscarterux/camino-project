# Course Library Upload Guide

## 📁 Current Situation

**Location:** `/Users/chriscarter/Documents/GitHub/walter-project/CORPORATE TRNG ZIPS/`
**Format:** ZIP files (one per course)
**Count:** ~11+ courses (subset for testing, 150+ available)

## 📦 Course Structure (Inside Each ZIP)

```
Course_Name.zip
├── 01-Training Manual/
│   └── Training Manual.docx (consolidated lessons document)
├── 02-Instructor Guide/
│   └── Instructor Guide.docx
├── 03-Icebreakers/
│   └── Various icebreaker activities
├── 04-PowerPoint Slides/
│   └── Presentation.pptx
├── 05-Quick Reference Sheets/
│   └── Quick Reference.docx
├── 06-Certificate/
│   └── Certificate of Completion.docx
└── Additional PDFs (license, guides, etc.)
```

## 🎯 Upload Strategy

### Option A: Manual Upload (Simpler, Recommended for MVP)

**Step 1: Extract All ZIPs**
```bash
cd "/Users/chriscarter/Documents/GitHub/walter-project/CORPORATE TRNG ZIPS"
for file in *.zip; do
  unzip -q "$file" -d "../course-content/"
done
```

**Step 2: Upload to Frappe LMS**
1. Open Frappe admin: http://lms.localhost:8000
2. For each course:
   - Create new LMS Course
   - Set category (from our catalog)
   - Upload Training Manual as lesson content
   - Attach PowerPoint as downloadable resource
   - Attach Quick Reference as resource
   - Set certificate template

**Step 3: Configure in Camino**
- Courses appear automatically in `/journey/library`
- Mapped to Camino themes (awareness, belonging, resilience, purpose)
- Certificate awarded on 100% completion

### Option B: Automated Bulk Upload (More complex)

**Requirements:**
1. Extract all Word docs from Training Manuals
2. Parse Word docs to extract individual lessons
3. Use Frappe API to bulk create courses
4. Upload resources programmatically

**Challenges:**
- Training Manual is one big doc (need to split into lessons)
- Word doc parsing requires libraries (mammoth.js or similar)
- Resource file uploads need Frappe file API

### Option C: Hybrid Approach (Recommended)

**Phase 1: Quick Start (Manual)**
- Upload 5-10 most important courses manually
- Get Journey subscribers using the library immediately
- Validate the structure and user experience

**Phase 2: Automation (Later)**
- Build Word doc parser
- Create bulk upload script
- Upload remaining 140+ courses

## 🚀 Quick Start Process

### Upload Your First 5 Courses

**Recommended starter courses** (aligned with Camino themes):

1. **Improving Self-Awareness** (Awareness theme)
2. **Developing Emotional Intelligence** (Awareness theme)
3. **Building Confidence and Assertiveness** (Resilience theme)
4. **Interpersonal Skills** (Belonging theme)
5. **Goal Setting and Getting Things Done** (Purpose theme)

**Steps:**
1. Extract the 5 ZIPs
2. Go to Frappe LMS: http://lms.localhost:8000/app/lms-course/new
3. For each course:
   ```
   Title: [Course Name]
   Category: [personal-development, etc.]
   Published: Yes
   Paid Course: No (access controlled by Camino subscription)

   Add Chapter: "Main Lessons"
   Add Lessons: (Manually from Training Manual doc)
   - Upload resources (PPT, PDFs)
   - Set certificate template
   ```

## 📝 Frappe LMS Course Creation

**Manual Process (5-10 min per course):**

1. **Create Course**
   - Go to: http://lms.localhost:8000/app/lms-course/new
   - Title: Exact name from catalog
   - Name/Slug: Use our slug (e.g., `improving-self-awareness`)
   - Category: Create categories if needed

2. **Add Chapter**
   - Click "Add Chapter"
   - Title: "Main Lessons" or break into logical chapters

3. **Add Lessons**
   - Open Training Manual.docx
   - For each section/lesson in the doc:
     - Create new lesson
     - Copy content into lesson body
     - Estimated time: ~5-10 min per lesson

4. **Upload Resources**
   - Attach PowerPoint slides
   - Attach Quick Reference sheets
   - Attach PDFs

5. **Configure Certificate**
   - Enable certification
   - Upload certificate template from 06-Certificate folder

6. **Publish**
   - Set Published = Yes
   - Course appears in Camino library automatically

## 🤖 Future Automation

**Script to Build** (when ready for bulk upload):
```javascript
// Extract all ZIPs
// Parse Training Manual.docx → Extract lessons
// Create courses via Frappe API
// Upload resources
// Configure certificates
```

This would save ~10-15 hours of manual work for all 150+ courses.

## 📊 Progress Tracking

- [ ] Extract 5 starter courses
- [ ] Upload to Frappe LMS
- [ ] Test in Camino library
- [ ] Verify certificate logic
- [ ] Extract remaining courses
- [ ] Bulk upload or manual upload remaining

## 💡 Pro Tip

**Start small:** Upload 5-10 courses to validate the user experience before committing to uploading all 150+. This lets you:
- Test the workflow
- Get user feedback
- Refine the structure
- Then automate the rest

---

**Ready to upload your first course?** Let me know which one you want to start with!
