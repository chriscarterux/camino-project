const fs = require('fs');
const path = require('path');
const DOMPurify = require('isomorphic-dompurify');

function sanitizeSvgFile(filePath) {
  console.log(`Sanitizing ${filePath}...`);

  // Read SVG file
  const svgContent = fs.readFileSync(filePath, 'utf8');

  // Check for dangerous tags before sanitization
  const dangerousTags = /<(script|iframe|object|embed|foreignObject)/i;
  if (dangerousTags.test(svgContent)) {
    console.warn(`⚠️  WARNING: ${filePath} contains potentially dangerous tags - will be removed`);
  }

  // Check for event handlers
  const eventHandlers = /on(load|error|click|mouseover|mouseenter|mouseleave|focus|blur)=/i;
  if (eventHandlers.test(svgContent)) {
    console.warn(`⚠️  WARNING: ${filePath} contains event handlers - will be removed`);
  }

  // Sanitize with strict settings
  const clean = DOMPurify.sanitize(svgContent, {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'foreignObject'],
    FORBID_ATTR: ['onload', 'onerror', 'onclick', 'onmouseover', 'onmouseenter', 'onmouseleave', 'onfocus', 'onblur', 'onchange', 'oninput'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });

  // Verify it's still valid after sanitization
  if (!clean || clean.length === 0 || !clean.includes('<svg')) {
    console.error(`❌ ERROR: ${filePath} became invalid after sanitization`);
    return false;
  }

  // Compare before and after
  if (svgContent === clean) {
    console.log(`✓ ${filePath} - No changes needed (already safe)`);
  } else {
    // Write sanitized version
    fs.writeFileSync(filePath, clean, 'utf8');
    console.log(`✓ ${filePath} - Sanitized successfully`);
  }

  return true;
}

// Main execution
console.log('🔒 SVG Security Sanitization Script\n');
console.log('This script removes potentially malicious content from SVG files:');
console.log('- Script tags');
console.log('- Event handlers (onload, onclick, etc.)');
console.log('- Foreign objects, iframes, embeds');
console.log('- Suspicious attributes\n');

// Sanitize all SVG files in public directory
const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  console.error(`❌ ERROR: Public directory not found at ${publicDir}`);
  process.exit(1);
}

const files = fs.readdirSync(publicDir);
const svgFiles = files
  .filter(file => file.endsWith('.svg'))
  .map(file => path.join(publicDir, file));

if (svgFiles.length === 0) {
  console.log('No SVG files found in public directory.');
  process.exit(0);
}

console.log(`Found ${svgFiles.length} SVG file(s) to sanitize:\n`);

let successCount = 0;
let failCount = 0;

svgFiles.forEach(svgFile => {
  const success = sanitizeSvgFile(svgFile);
  if (success) {
    successCount++;
  } else {
    failCount++;
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Successfully sanitized: ${successCount} file(s)`);
if (failCount > 0) {
  console.log(`❌ Failed: ${failCount} file(s)`);
  process.exit(1);
}
console.log(`\n🎉 All SVG files are now safe from XSS attacks!`);
console.log(`${'='.repeat(60)}\n`);
