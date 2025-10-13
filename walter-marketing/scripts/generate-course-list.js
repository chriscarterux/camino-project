/**
 * Generate course list from ZIP files
 * Maps extracted courses to Camino catalog
 */

const fs = require('fs');
const path = require('path');

const COURSE_ZIPS_DIR = '/Users/chriscarter/Documents/GitHub/walter-project/CORPORATE TRNG ZIPS';
const courseLibrary = require('../data/course-library.json');

// Get all ZIP files
const zipFiles = fs.readdirSync(COURSE_ZIPS_DIR)
  .filter(file => file.endsWith('.zip'))
  .map(file => {
    // Clean up filename
    const name = file
      .replace(/\.zip$/, '')
      .replace(/[0-9a-f]+e?( \(\d+\))?$/, '')
      .replace(/_$/, '')
      .replace(/_/g, ' ');

    // Generate slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return {
      fileName: file,
      displayName: name,
      slug,
    };
  });

console.log(`\n📚 Found ${zipFiles.length} Course ZIPs\n`);
console.log('Courses to Upload:\n');

// Match to catalog
zipFiles.forEach((course, index) => {
  let catalogMatch = null;
  let category = null;

  // Find in catalog
  for (const cat of courseLibrary.categories) {
    const found = cat.courses.find(c =>
      c.slug === course.slug ||
      c.title.toLowerCase().replace(/[^a-z0-9]+/g, '') === course.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '')
    );

    if (found) {
      catalogMatch = found;
      category = cat;
      break;
    }
  }

  const status = catalogMatch ? '✓' : '?';
  const theme = catalogMatch?.theme || 'unknown';
  const cat = category?.name || 'Unknown';

  console.log(`${index + 1}. ${status} ${course.displayName}`);
  console.log(`   Slug: ${course.slug}`);
  console.log(`   Category: ${cat} | Theme: ${theme}`);
  console.log('');
});

// Summary
const matched = zipFiles.filter(course => {
  for (const cat of courseLibrary.categories) {
    if (cat.courses.find(c => c.slug === course.slug)) return true;
  }
  return false;
}).length;

console.log(`\n📊 Summary: ${matched}/${zipFiles.length} courses matched to catalog\n`);

// Save mapping
const output = {
  totalCourses: zipFiles.length,
  matched,
  courses: zipFiles,
  extractionCommand: 'bash scripts/extract-and-import.sh',
};

fs.writeFileSync(
  path.join(__dirname, '../data/available-courses.json'),
  JSON.stringify(output, null, 2)
);

console.log('✅ Saved to: data/available-courses.json\n');
