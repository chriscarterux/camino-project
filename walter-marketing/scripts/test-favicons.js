#!/usr/bin/env node

/**
 * Favicon Testing Script
 *
 * Validates that all favicon files exist and meet requirements
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const MAX_PACKAGE_SIZE = 200 * 1024; // 200KB

const REQUIRED_FILES = [
  { name: 'favicon.ico', maxSize: 15 * 1024 },
  { name: 'favicon-16x16.png', maxSize: 2 * 1024 },
  { name: 'favicon-32x32.png', maxSize: 2 * 1024 },
  { name: 'favicon-48x48.png', maxSize: 3 * 1024 },
  { name: 'apple-touch-icon.png', maxSize: 10 * 1024 },
  { name: 'android-chrome-192x192.png', maxSize: 15 * 1024 },
  { name: 'android-chrome-512x512.png', maxSize: 30 * 1024 },
  { name: 'mstile-150x150.png', maxSize: 10 * 1024 },
  { name: 'safari-pinned-tab.svg', maxSize: 5 * 1024 },
  { name: 'site.webmanifest', maxSize: 1 * 1024 },
  { name: 'browserconfig.xml', maxSize: 1 * 1024 },
];

console.log('🧪 Testing Camino Favicon Package\n');

let totalSize = 0;
let errors = 0;
let warnings = 0;

// Test 1: File existence and sizes
console.log('1️⃣  File Existence & Size Tests\n');

REQUIRED_FILES.forEach(file => {
  const filePath = path.join(PUBLIC_DIR, file.name);

  if (!fs.existsSync(filePath)) {
    console.log(`  ❌ MISSING: ${file.name}`);
    errors++;
    return;
  }

  const stats = fs.statSync(filePath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  totalSize += stats.size;

  if (stats.size > file.maxSize) {
    console.log(`  ⚠️  ${file.name} - ${sizeKB}KB (exceeds ${(file.maxSize / 1024).toFixed(0)}KB target)`);
    warnings++;
  } else {
    console.log(`  ✓ ${file.name} - ${sizeKB}KB`);
  }
});

console.log();

// Test 2: Total package size
console.log('2️⃣  Package Size Test\n');

const totalKB = (totalSize / 1024).toFixed(2);
const totalMB = (totalSize / (1024 * 1024)).toFixed(2);

if (totalSize > MAX_PACKAGE_SIZE) {
  console.log(`  ⚠️  Total: ${totalKB}KB (${totalMB}MB) - Exceeds 200KB target`);
  warnings++;
} else {
  console.log(`  ✓ Total: ${totalKB}KB (${totalMB}MB) - Under 200KB target`);
}

console.log();

// Test 3: JSON validity
console.log('3️⃣  JSON Validation\n');

const manifestPath = path.join(PUBLIC_DIR, 'site.webmanifest');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Check required fields
    const requiredFields = ['name', 'short_name', 'icons', 'theme_color', 'background_color'];
    const missingFields = requiredFields.filter(field => !manifest[field]);

    if (missingFields.length > 0) {
      console.log(`  ❌ Manifest missing fields: ${missingFields.join(', ')}`);
      errors++;
    } else {
      console.log('  ✓ site.webmanifest - Valid JSON with required fields');
    }

    // Check icons array
    if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
      console.log('  ❌ Manifest icons array is empty');
      errors++;
    } else {
      console.log(`  ✓ Manifest has ${manifest.icons.length} icons defined`);
    }

    // Verify icon files exist
    manifest.icons.forEach(icon => {
      const iconPath = path.join(PUBLIC_DIR, icon.src.replace(/^\//, ''));
      if (!fs.existsSync(iconPath)) {
        console.log(`  ❌ Icon file missing: ${icon.src}`);
        errors++;
      }
    });

  } catch (error) {
    console.log('  ❌ site.webmanifest - Invalid JSON');
    errors++;
  }
} else {
  console.log('  ❌ site.webmanifest not found');
  errors++;
}

console.log();

// Test 4: XML validity
console.log('4️⃣  XML Validation\n');

const browserconfigPath = path.join(PUBLIC_DIR, 'browserconfig.xml');
if (fs.existsSync(browserconfigPath)) {
  const xml = fs.readFileSync(browserconfigPath, 'utf8');

  // Basic XML checks
  const hasMsApplication = xml.includes('<msapplication>');
  const hasTile = xml.includes('<tile>');
  const hasTileColor = xml.includes('<TileColor>');
  const hasTileLogo = xml.includes('square150x150logo');

  if (hasMsApplication && hasTile && hasTileColor && hasTileLogo) {
    console.log('  ✓ browserconfig.xml - Valid structure');
  } else {
    console.log('  ❌ browserconfig.xml - Missing required elements');
    errors++;
  }

  // Check if referenced tile exists
  const tileMatch = xml.match(/src="([^"]+)"/);
  if (tileMatch) {
    const tilePath = path.join(PUBLIC_DIR, tileMatch[1].replace(/^\//, ''));
    if (!fs.existsSync(tilePath)) {
      console.log(`  ❌ Tile image missing: ${tileMatch[1]}`);
      errors++;
    } else {
      console.log(`  ✓ Tile image exists: ${tileMatch[1]}`);
    }
  }

} else {
  console.log('  ❌ browserconfig.xml not found');
  errors++;
}

console.log();

// Test 5: SVG validity
console.log('5️⃣  SVG Validation\n');

const safariSVGPath = path.join(PUBLIC_DIR, 'safari-pinned-tab.svg');
if (fs.existsSync(safariSVGPath)) {
  const svg = fs.readFileSync(safariSVGPath, 'utf8');

  // Check for monochrome (should use black fill)
  const hasBlackFill = svg.includes('fill="#000"') || svg.includes('fill="black"');
  const hasColoredFill = /fill="#[^0]/.test(svg) || /fill="(?!black|#000)/.test(svg);

  if (hasBlackFill && !hasColoredFill) {
    console.log('  ✓ safari-pinned-tab.svg - Monochrome (black)');
  } else if (hasColoredFill) {
    console.log('  ⚠️  safari-pinned-tab.svg - Contains colored fills (should be monochrome)');
    warnings++;
  }

  // Check for scripts (security)
  if (svg.includes('<script')) {
    console.log('  ❌ safari-pinned-tab.svg - Contains scripts (security risk)');
    errors++;
  } else {
    console.log('  ✓ safari-pinned-tab.svg - No scripts (safe)');
  }

  // Check for external resources
  if (svg.includes('http://') || svg.includes('https://')) {
    console.log('  ⚠️  safari-pinned-tab.svg - Contains external resources');
    warnings++;
  } else {
    console.log('  ✓ safari-pinned-tab.svg - Self-contained');
  }

} else {
  console.log('  ❌ safari-pinned-tab.svg not found');
  errors++;
}

console.log();

// Test 6: Layout.tsx integration
console.log('6️⃣  Next.js Integration Test\n');

const layoutPath = path.join(__dirname, '../app/layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layout = fs.readFileSync(layoutPath, 'utf8');

  const checks = [
    { test: layout.includes('favicon-16x16.png'), name: 'favicon-16x16.png reference' },
    { test: layout.includes('favicon-32x32.png'), name: 'favicon-32x32.png reference' },
    { test: layout.includes('apple-touch-icon.png'), name: 'apple-touch-icon.png reference' },
    { test: layout.includes('safari-pinned-tab.svg'), name: 'safari-pinned-tab.svg reference' },
    { test: layout.includes('site.webmanifest'), name: 'site.webmanifest reference' },
    { test: layout.includes('themeColor'), name: 'themeColor metadata' },
    { test: layout.includes('#E2C379') || layout.includes('#CF9930'), name: 'Brand color usage' },
  ];

  checks.forEach(check => {
    if (check.test) {
      console.log(`  ✓ ${check.name}`);
    } else {
      console.log(`  ❌ ${check.name} - Missing`);
      errors++;
    }
  });

} else {
  console.log('  ❌ app/layout.tsx not found');
  errors++;
}

console.log();

// Test 7: PNG dimensions (requires Sharp or ImageMagick)
async function runDimensionTests() {
  console.log('7️⃣  Image Dimensions Test\n');

  const pngFiles = [
    { name: 'favicon-16x16.png', expectedSize: 16 },
    { name: 'favicon-32x32.png', expectedSize: 32 },
    { name: 'favicon-48x48.png', expectedSize: 48 },
    { name: 'apple-touch-icon.png', expectedSize: 180 },
    { name: 'android-chrome-192x192.png', expectedSize: 192 },
    { name: 'android-chrome-512x512.png', expectedSize: 512 },
    { name: 'mstile-150x150.png', expectedSize: 150 },
  ];

  let canCheckDimensions = false;
  let sharp;

  try {
    sharp = require('sharp');
    canCheckDimensions = true;
  } catch (e) {
    console.log('  ⚠️  Sharp not available - skipping dimension checks');
    console.log('     Install Sharp to enable: npm install --save-dev sharp\n');
  }

  if (canCheckDimensions) {
    for (const file of pngFiles) {
      const filePath = path.join(PUBLIC_DIR, file.name);

      if (!fs.existsSync(filePath)) {
        continue; // Already reported as missing
      }

      try {
        const metadata = await sharp(filePath).metadata();

        if (metadata.width === file.expectedSize && metadata.height === file.expectedSize) {
          console.log(`  ✓ ${file.name} - ${metadata.width}x${metadata.height}`);
        } else {
          console.log(`  ❌ ${file.name} - ${metadata.width}x${metadata.height} (expected ${file.expectedSize}x${file.expectedSize})`);
          errors++;
        }
      } catch (error) {
        console.log(`  ❌ ${file.name} - Could not read dimensions`);
        errors++;
      }
    }
    console.log();
  }
}

// Summary function
function printSummary() {
  console.log('📊 Test Summary\n');
  console.log(`  Total Files: ${REQUIRED_FILES.length}`);
  console.log(`  Package Size: ${totalKB}KB`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Warnings: ${warnings}`);
  console.log();

  if (errors === 0 && warnings === 0) {
    console.log('✅ All tests passed! Favicon package is ready.\n');
    process.exit(0);
  } else if (errors === 0) {
    console.log('⚠️  Tests passed with warnings. Review warnings above.\n');
    process.exit(0);
  } else {
    console.log('❌ Tests failed. Fix errors above before deploying.\n');
    process.exit(1);
  }
}

// Main execution
(async () => {
  await runDimensionTests();
  printSummary();
})();
