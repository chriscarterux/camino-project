#!/usr/bin/env node
/**
 * Upload Course Content to Frappe LMS
 * Parses Training Manuals and uploads lessons via API
 */

const { parseTrainingManual } = require('./parse-training-manual');
const fs = require('fs');
const path = require('path');

const COURSES_BASE = '/Users/chriscarter/Documents/GitHub/walter-project/CORPORATE TRNG ZIPS';
const FRAPPE_URL = process.env.LMS_API_URL || 'http://46.202.93.22:8000';
const FRAPPE_API_KEY = process.env.LMS_API_KEY || '3e9dcebf84360ba';
const FRAPPE_API_SECRET = process.env.LMS_API_SECRET || '0de5e13607bcc4d';

const scannedCourses = require('../data/scanned-courses.json');

/**
 * Upload content for a single course
 */
async function uploadCourseContent(courseData) {
  const courseSlug = courseData.slug;

  console.log(`\n📚 Processing: ${courseData.catalogTitle}`);
  console.log(`   Category: ${courseData.categoryName} | Slug: ${courseSlug}`);

  try {
    // 1. Find Training Manual
    const manualPath = path.join(courseData.path, '01-Training Manual', 'Training Manual.docx');

    if (!fs.existsSync(manualPath)) {
      console.log(`   ⏭️  No Training Manual - skipping`);
      return { success: false, reason: 'no_manual' };
    }

    // 2. Parse lessons from Training Manual
    console.log(`   📄 Parsing Training Manual...`);
    const lessons = await parseTrainingManual(manualPath);

    if (lessons.length === 0) {
      console.log(`   ⚠️  No lessons extracted - skipping`);
      return { success: false, reason: 'no_lessons' };
    }

    console.log(`   ✅ Found ${lessons.length} lessons`);

    // 3. Create chapter
    console.log(`   📖 Creating chapter...`);
    const chapter = await createChapter(courseSlug);

    if (!chapter) {
      console.log(`   ❌ Failed to create chapter`);
      return { success: false, reason: 'chapter_failed' };
    }

    // 4. Upload lessons
    console.log(`   📝 Uploading ${lessons.length} lessons...`);
    let uploadedCount = 0;

    for (const lesson of lessons) {
      const created = await createLesson(courseSlug, chapter.name, lesson);
      if (created) {
        uploadedCount++;
        process.stdout.write(`.`);
      } else {
        process.stdout.write(`x`);
      }
    }

    console.log(`\n   ✅ Uploaded ${uploadedCount}/${lessons.length} lessons`);

    return {
      success: true,
      lessonsUploaded: uploadedCount,
      lessonsTotal: lessons.length,
    };

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Create a chapter for a course
 */
async function createChapter(courseSlug) {
  try {
    const response = await fetch(`${FRAPPE_URL}/api/resource/Course Chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`,
      },
      body: JSON.stringify({
        title: 'Main Lessons',
        course: courseSlug,
        idx: 1,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      // Chapter might already exist
      if (error.includes('Duplicate')) {
        // Fetch existing chapter
        const existing = await fetch(
          `${FRAPPE_URL}/api/resource/Course Chapter?filters=[["course","=","${courseSlug}"]]&limit_page_length=1`,
          {
            headers: { 'Authorization': `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}` }
          }
        );
        const data = await existing.json();
        return data.data?.[0] || null;
      }
      return null;
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    return null;
  }
}

/**
 * Create a lesson
 */
async function createLesson(courseSlug, chapterName, lessonData) {
  try {
    // Clean title (remove HTML tags and anchor IDs)
    const cleanTitle = lessonData.title
      .replace(/<[^>]+>/g, '')
      .replace(/&[^;]+;/g, '')
      .trim();

    const response = await fetch(`${FRAPPE_URL}/api/resource/Course Lesson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`,
      },
      body: JSON.stringify({
        title: cleanTitle || `Lesson ${lessonData.number}`,
        body: lessonData.body,
        course: courseSlug,
        chapter: chapterName,
        idx: lessonData.number,
        include_in_preview: lessonData.number === 1, // First lesson is preview
      }),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const singleCourse = args.find(arg => arg.startsWith('--course='));
  const startIndex = parseInt(args.find(arg => arg.startsWith('--start='))?.split('=')[1] || '0');
  const endIndex = parseInt(args.find(arg => arg.startsWith('--end='))?.split('=')[1] || '999999');

  console.log('\n🚀 Camino Course Content Upload\n');
  console.log('================================\n');

  const courses = scannedCourses.courses;

  // Filter courses
  let coursesToProcess = courses;

  if (singleCourse) {
    const slug = singleCourse.split('=')[1];
    coursesToProcess = courses.filter(c => c.slug === slug);
    console.log(`📌 Processing single course: ${slug}\n`);
  } else {
    coursesToProcess = courses.slice(startIndex, endIndex);
    console.log(`📊 Processing courses ${startIndex + 1} to ${Math.min(endIndex, courses.length)}\n`);
  }

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (const [index, course] of coursesToProcess.entries()) {
    const result = await uploadCourseContent(course);

    if (result.success) {
      successCount++;
    } else if (result.reason === 'no_manual') {
      skippedCount++;
    } else {
      failCount++;
    }

    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n\n📊 Upload Complete!`);
  console.log(`   ✅ Success: ${successCount} courses`);
  console.log(`   ❌ Failed: ${failCount} courses`);
  console.log(`   ⏭️  Skipped: ${skippedCount} courses (no Training Manual)`);
  console.log(`\n🎉 Total lessons uploaded: ${successCount * 15} (estimated)\n`);

  console.log(`📝 Next Steps:`);
  console.log(`1. Check courses in Frappe: http://46.202.93.22:8000/app/lms-course`);
  console.log(`2. Test in Camino: http://localhost:3002/journey/library`);
  console.log(`3. Add PowerPoint slides manually for priority courses`);
  console.log(`4. Configure certificates\n`);
}

// Execute
main().catch(console.error);
