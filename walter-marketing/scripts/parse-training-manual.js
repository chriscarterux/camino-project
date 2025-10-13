#!/usr/bin/env node
/**
 * Parse Training Manual.docx into structured lessons
 * Uses mammoth.js to convert Word docs to HTML and extract lessons
 */

const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

/**
 * Parse a Training Manual.docx file into lessons
 *
 * @param {string} docxPath - Path to Training Manual.docx
 * @returns {Promise<Array>} Array of lessons with title and body
 */
async function parseTrainingManual(docxPath) {
  if (!fs.existsSync(docxPath)) {
    throw new Error(`Training Manual not found: ${docxPath}`);
  }

  try {
    // Convert Word doc to HTML with improved options
    const result = await mammoth.convertToHtml(
      { path: docxPath },
      {
        // Map Word styles to semantic HTML
        styleMap: [
          "p[style-name='Heading 1'] => h2.lesson-heading:fresh",
          "p[style-name='Heading 2'] => h3.section-heading:fresh",
          "p[style-name='Heading 3'] => h4.subsection-heading:fresh",
          "p[style-name='Quote'] => blockquote:fresh",
          "p[style-name='Intense Quote'] => blockquote.highlight:fresh",
          "b => strong",
          "i => em",
        ],
        // Convert images to data URIs (will be handled/removed in post-processing)
        convertImage: mammoth.images.imgElement(function(image) {
          // Return empty string to skip broken images
          // In production, you'd want to extract and upload these properly
          return { src: '' };
        }),
        // Preserve emphasis and strong tags
        includeDefaultStyleMap: true,
      }
    );

    let html = result.value;
    const messages = result.messages;

    // Log any conversion warnings
    if (messages.length > 0) {
      console.log(`  ℹ️  Conversion warnings: ${messages.length}`);
    }

    // Post-process HTML to improve structure
    html = postProcessHtml(html);

    // Split HTML into lessons by h2 headings
    const lessons = splitIntoLessons(html);

    return lessons;
  } catch (error) {
    console.error(`Error parsing ${docxPath}:`, error);
    return [];
  }
}

/**
 * Post-process HTML to clean up and enhance structure
 */
function postProcessHtml(html) {
  // Remove empty images
  html = html.replace(/<img[^>]*src=""[^>]*>/gi, '');
  html = html.replace(/<img[^>]*src="data:image[^"]*"[^>]*>/gi, '');

  // Remove empty paragraphs
  html = html.replace(/<p>\s*<\/p>/gi, '');
  html = html.replace(/<p>&nbsp;<\/p>/gi, '');

  // Clean up multiple consecutive line breaks
  html = html.replace(/(<br\s*\/?>\s*){3,}/gi, '<br><br>');

  // Wrap tables if they exist
  html = html.replace(/<table/gi, '<div class="table-wrapper"><table');
  html = html.replace(/<\/table>/gi, '</table></div>');

  return html;
}

/**
 * Split HTML content into individual lessons
 * Assumes h2 tags separate lessons
 */
function splitIntoLessons(html) {
  const lessons = [];

  // Split by <h2> tags
  const sections = html.split(/<h2[^>]*>/i);

  sections.forEach((section, index) => {
    if (index === 0 && !section.trim()) {
      return; // Skip empty intro section
    }

    // Extract title from first line
    const titleMatch = section.match(/^(.*?)<\/h2>/i);
    if (!titleMatch) {
      // No proper heading, might be intro content
      if (index === 0 && section.trim().length > 50) {
        lessons.push({
          number: 1,
          title: 'Introduction',
          body: cleanLessonBody(section),
          duration: estimateDuration(section),
        });
      }
      return;
    }

    const rawTitle = titleMatch[1].trim();
    const body = section.replace(/^.*?<\/h2>/i, '').trim();

    // Skip if no substantial content
    if (body.length < 50) {
      return;
    }

    // Clean title and extract lesson number
    const { number, title } = parseTitle(rawTitle, lessons.length + 1);

    lessons.push({
      number,
      title,
      body: cleanLessonBody(body),
      duration: estimateDuration(body),
    });
  });

  // If no lessons found, try to create one lesson from entire doc
  if (lessons.length === 0) {
    lessons.push({
      number: 1,
      title: 'Course Content',
      body: cleanLessonBody(html),
      duration: estimateDuration(html),
    });
  }

  return lessons;
}

/**
 * Clean lesson body HTML
 */
function cleanLessonBody(body) {
  // Wrap in a div with a class for styling
  return `<div class="lesson-content">${body}</div>`;
}

/**
 * Parse lesson title to extract number and clean title
 */
function parseTitle(rawTitle, defaultNumber) {
  // Remove HTML tags from title
  rawTitle = rawTitle.replace(/<[^>]*>/g, '');

  // Remove common prefixes and clean
  let title = rawTitle
    .replace(/^(Lesson|Module|Chapter|Section)\s*\d*:?\s*/i, '')
    .replace(/^\d+\s*[-.:)]\s*/, '')
    .trim();

  // Extract number if present
  const numberMatch = rawTitle.match(/^(?:Lesson|Module|Chapter|Section)?\s*(\d+)/i);
  const number = numberMatch ? parseInt(numberMatch[1]) : defaultNumber;

  // Fallback title
  if (!title || title.length < 3) {
    title = `Lesson ${number}`;
  }

  return { number, title };
}

/**
 * Estimate lesson duration based on content length
 */
function estimateDuration(content) {
  // Strip HTML tags for word count
  const textContent = content.replace(/<[^>]*>/g, ' ');
  const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
  return `${Math.max(5, Math.min(20, readingTime))} min`;
}

/**
 * Test parser with a single file
 */
async function testParser(docxPath) {
  console.log(`\n📄 Parsing: ${path.basename(docxPath)}\n`);

  const lessons = await parseTrainingManual(docxPath);

  console.log(`✅ Found ${lessons.length} lessons:\n`);

  lessons.forEach(lesson => {
    console.log(`  ${lesson.number}. ${lesson.title} (${lesson.duration})`);
    console.log(`     Content length: ${lesson.body.length} characters`);
  });

  return lessons;
}

// CLI usage
if (require.main === module) {
  const docxPath = process.argv[2];

  if (!docxPath) {
    console.log('Usage: node scripts/parse-training-manual.js <path-to-training-manual.docx>');
    console.log('\nExample:');
    console.log('  node scripts/parse-training-manual.js "/path/to/Training Manual.docx"');
    process.exit(1);
  }

  testParser(docxPath).catch(console.error);
}

module.exports = { parseTrainingManual };
