/**
 * Bulk Course Import Script for Camino Journey Library
 *
 * This script helps import 150+ professional development courses
 * from your folder structure into Frappe LMS.
 *
 * Usage:
 *   node scripts/import-courses.js /path/to/course/folders
 */

const fs = require('fs');
const path = require('path');

const COURSE_LIBRARY = require('../data/course-library.json');

// Find all course folders and parse their structure
function scanCourseDirectory(basePath) {
  const courses = [];
  const folders = fs.readdirSync(basePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  for (const folder of folders) {
    const folderPath = path.join(basePath, folder.name);
    const courseData = parseCourseFolder(folderPath, folder.name);

    if (courseData) {
      courses.push(courseData);
    }
  }

  return courses;
}

// Parse individual course folder
function parseCourseFolder(folderPath, folderName) {
  console.log(`Scanning: ${folderName}`);

  const structure = {
    folderName,
    slug: generateSlug(folderName),
    lessons: [],
    resources: [],
  };

  // Check for standard folders
  const trainingManualPath = path.join(folderPath, '01-Training Manual');
  const powerPointPath = path.join(folderPath, '04-PowerPoint Slides');
  const quickRefPath = path.join(folderPath, '05-Quick Reference Sheets');

  // Parse Training Manual lessons
  if (fs.existsSync(trainingManualPath)) {
    const lessons = fs.readdirSync(trainingManualPath)
      .filter(file => file.endsWith('.doc') || file.endsWith('.docx'))
      .sort()
      .map((file, index) => ({
        index: index + 1,
        fileName: file,
        title: cleanLessonTitle(file),
        filePath: path.join(trainingManualPath, file),
      }));

    structure.lessons = lessons;
  }

  // Find PowerPoint
  if (fs.existsSync(powerPointPath)) {
    const ppt = fs.readdirSync(powerPointPath)
      .find(file => file.endsWith('.ppt') || file.endsWith('.pptx'));

    if (ppt) {
      structure.resources.push({
        type: 'presentation',
        fileName: ppt,
        filePath: path.join(powerPointPath, ppt),
      });
    }
  }

  // Find Quick Reference Sheets
  if (fs.existsSync(quickRefPath)) {
    const refs = fs.readdirSync(quickRefPath)
      .filter(file => file.endsWith('.doc') || file.endsWith('.docx'));

    refs.forEach(ref => {
      structure.resources.push({
        type: 'reference',
        fileName: ref,
        filePath: path.join(quickRefPath, ref),
      });
    });
  }

  // Find PDFs in root
  const rootPdfs = fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.pdf'));

  rootPdfs.forEach(pdf => {
    structure.resources.push({
      type: 'pdf',
      fileName: pdf,
      filePath: path.join(folderPath, pdf),
    });
  });

  return structure;
}

// Generate URL-safe slug
function generateSlug(folderName) {
  return folderName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Clean lesson title from filename
function cleanLessonTitle(fileName) {
  return fileName
    .replace(/^\d+-/, '') // Remove leading numbers
    .replace(/\.(doc|docx)$/, '') // Remove extension
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Match course to catalog entry
function matchToCatalog(slug) {
  for (const category of COURSE_LIBRARY.categories) {
    const course = category.courses.find(c => c.slug === slug);
    if (course) {
      return {
        title: course.title,
        category: category.name,
        categoryId: category.id,
        theme: course.theme,
      };
    }
  }
  return null;
}

// Generate Frappe LMS import JSON
function generateFrappeImport(courses) {
  const imports = [];

  for (const course of courses) {
    const catalogMatch = matchToCatalog(course.slug);

    if (!catalogMatch) {
      console.warn(`No catalog match for: ${course.slug}`);
      continue;
    }

    // Create course structure
    const courseImport = {
      doctype: 'LMS Course',
      title: catalogMatch.title,
      name: course.slug,
      short_introduction: `Professional development course on ${catalogMatch.title}`,
      description: `Learn essential skills in ${catalogMatch.title}. This course includes ${course.lessons.length} lessons with downloadable resources.`,
      published: 1,
      paid_course: 0, // Free for Journey subscribers
      category: catalogMatch.categoryId,
      chapters: [
        {
          title: 'Main Lessons',
          lessons: course.lessons.map(lesson => ({
            title: lesson.title,
            body: `Lesson ${lesson.index}: ${lesson.title}`,
            // File path for reference - admin will need to upload content
            _source_file: lesson.filePath,
          })),
        },
      ],
      resources: course.resources,
    };

    imports.push(courseImport);
  }

  return imports;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/import-courses.js /path/to/course/folders');
    console.log('Example: node scripts/import-courses.js ~/Desktop/Courses');
    process.exit(1);
  }

  const coursePath = args[0];

  if (!fs.existsSync(coursePath)) {
    console.error(`Path does not exist: ${coursePath}`);
    process.exit(1);
  }

  console.log(`Scanning courses in: ${coursePath}\n`);

  const courses = scanCourseDirectory(coursePath);
  console.log(`\nFound ${courses.length} courses\n`);

  const imports = generateFrappeImport(courses);
  console.log(`Generated ${imports.length} import entries\n`);

  // Save to JSON file
  const outputPath = path.join(__dirname, '../data/course-imports.json');
  fs.writeFileSync(outputPath, JSON.stringify(imports, null, 2));

  console.log(`✅ Import file created: ${outputPath}`);
  console.log(`\nNext steps:`);
  console.log(`1. Review data/course-imports.json`);
  console.log(`2. Use Frappe's data import tool to bulk create courses`);
  console.log(`3. Manually upload Word doc content and resources`);
  console.log(`\nOr use the Frappe API to programmatically create all courses.`);
}

module.exports = { scanCourseDirectory, generateFrappeImport };
