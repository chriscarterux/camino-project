#!/usr/bin/env node
/**
 * Scan and Upload Courses to Frappe LMS
 *
 * Scans course folders and uploads them to Frappe via API
 *
 * Usage: node scripts/scan-and-upload-courses.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const courseLibrary = require('../data/course-library.json');

const COURSES_BASE = '/Users/chriscarter/Documents/GitHub/walter-project/CORPORATE TRNG ZIPS';
const FRAPPE_URL = process.env.LMS_API_URL || 'http://lms.localhost:8000';
const FRAPPE_API_KEY = process.env.LMS_API_KEY || '';
const FRAPPE_API_SECRET = process.env.LMS_API_SECRET || '';

const isDryRun = process.argv.includes('--dry-run');

// Category folder mapping
const CATEGORY_FOLDERS = {
  '1 - ADMIN SKILLS': 'administrative-skills',
  '2 - CAREER DEV': 'career-development',
  '3 - HUMAN RESOURCES': 'human-resources',
  '4 - PERSONAL DEVELOPMENT': 'personal-development',
  '5 - SALES & MARKETING': 'sales-and-marketing',
  '6 - SUPERVISORS & MANAGERS': 'supervisors-and-managers',
  '7 - WORKPLACE ESSENTIALS': 'workplace-essentials',
  '8 - SPANISH': 'spanish',
};

/**
 * Scan all course folders
 */
function scanAllCourses() {
  const allCourses = [];

  for (const [folderName, categoryId] of Object.entries(CATEGORY_FOLDERS)) {
    const categoryPath = path.join(COURSES_BASE, folderName);

    if (!fs.existsSync(categoryPath)) {
      console.warn(`⚠️  Category folder not found: ${folderName}`);
      continue;
    }

    const courseFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => !dirent.name.startsWith('.'));

    console.log(`\n📁 ${folderName}: ${courseFolders.length} courses`);

    for (const courseFolder of courseFolders) {
      const coursePath = path.join(categoryPath, courseFolder.name);
      const courseData = parseCourseFolder(coursePath, courseFolder.name, categoryId);

      if (courseData) {
        allCourses.push(courseData);
      }
    }
  }

  return allCourses;
}

/**
 * Parse individual course folder
 */
function parseCourseFolder(coursePath, folderName, categoryId) {
  // Clean folder name
  const cleanName = folderName
    .replace(/[0-9a-f]+e?$/, '')
    .replace(/_/g, ' ')
    .trim();

  const slug = cleanName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Find in catalog
  const category = courseLibrary.categories.find(c => c.id === categoryId);
  const catalogEntry = category?.courses.find(c => c.slug === slug);

  const courseData = {
    folderName,
    cleanName,
    slug,
    path: coursePath,
    categoryId,
    categoryName: category?.name || 'Unknown',
    theme: catalogEntry?.theme || 'awareness',
    catalogTitle: catalogEntry?.title || cleanName,
    hasTrainingManual: fs.existsSync(path.join(coursePath, '01-Training Manual')),
    hasPowerPoint: fs.existsSync(path.join(coursePath, '04-PowerPoint Slides')),
    hasQuickRef: fs.existsSync(path.join(coursePath, '05-Quick Reference Sheets')),
    hasCertificate: fs.existsSync(path.join(coursePath, '06-Certificates')),
    matched: !!catalogEntry,
  };

  return courseData;
}

/**
 * Upload single course to Frappe
 */
async function uploadCourse(courseData) {
  if (isDryRun) {
    console.log(`  [DRY RUN] Would create course: ${courseData.catalogTitle}`);
    return { success: true, dryRun: true };
  }

  try {
    // Create course via Frappe API
    const response = await fetch(`${FRAPPE_URL}/api/resource/LMS Course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`,
      },
      body: JSON.stringify({
        name: courseData.slug,
        title: courseData.catalogTitle,
        short_introduction: `Professional development course on ${courseData.catalogTitle}`,
        description: `Build your skills in ${courseData.catalogTitle}. This course includes comprehensive lessons and practical exercises.`,
        published: 1,
        paid_course: 0, // Access controlled by Camino subscription
        enable_certification: 1,
        category: courseData.categoryId,
        // Add metadata to track Camino theme
        custom_theme: courseData.theme,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Frappe API error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error(`  ❌ Upload failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🚀 Camino Course Bulk Upload Tool');
  console.log('==================================\n');

  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No actual uploads will occur\n');
  }

  // Scan all courses
  console.log('📊 Scanning course directories...\n');
  const courses = scanAllCourses();

  console.log(`\n✅ Scanned ${courses.length} total courses`);
  console.log(`   Matched to catalog: ${courses.filter(c => c.matched).length}`);
  console.log(`   With Training Manual: ${courses.filter(c => c.hasTrainingManual).length}`);
  console.log(`   With PowerPoint: ${courses.filter(c => c.hasPowerPoint).length}`);
  console.log(`   With Certificate: ${courses.filter(c => c.hasCertificate).length}`);

  // Group by category
  console.log('\n📚 Courses by Category:\n');
  const byCat = {};
  courses.forEach(c => {
    byCat[c.categoryName] = (byCat[c.categoryName] || 0) + 1;
  });
  Object.entries(byCat).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} courses`);
  });

  // Save scan results
  const outputPath = path.join(__dirname, '../data/scanned-courses.json');
  fs.writeFileSync(outputPath, JSON.stringify({ courses, summary: { total: courses.length, byCategory: byCat } }, null, 2));
  console.log(`\n💾 Scan results saved to: ${outputPath}`);

  // Upload courses
  if (!isDryRun) {
    console.log('\n📤 Uploading courses to Frappe LMS...\n');

    let successCount = 0;
    let failCount = 0;

    for (const [index, course] of courses.entries()) {
      console.log(`\n[${index + 1}/${courses.length}] ${course.catalogTitle}`);
      console.log(`   Category: ${course.categoryName} | Theme: ${course.theme}`);

      const result = await uploadCourse(course);

      if (result.success) {
        console.log(`   ✅ Created successfully`);
        successCount++;
      } else {
        console.log(`   ❌ Failed: ${result.error}`);
        failCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n\n📊 Upload Complete!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
  } else {
    console.log('\n✅ Dry run complete. Run without --dry-run to upload.\n');
  }

  console.log('\n📝 Next Steps:');
  console.log('1. Review scanned-courses.json');
  console.log('2. Check courses in Frappe: http://lms.localhost:8000/app/lms-course');
  console.log('3. Manually add lesson content from Training Manuals');
  console.log('4. Upload PowerPoint and resource files');
  console.log('5. Courses will appear in Camino library automatically\n');
}

// Execute
main().catch(console.error);
