#!/usr/bin/env node

/**
 * Favicon Generation Script for Camino
 *
 * Generates all required favicon formats and sizes:
 * - Standard favicons (16x16, 32x32, 48x48)
 * - Apple touch icons (180x180)
 * - Android Chrome icons (192x192, 512x512)
 * - Windows tiles (150x150)
 * - Safari pinned tab (monochrome SVG)
 *
 * Usage:
 *   node scripts/generate-favicons.js              # Uses default repo path
 *   node scripts/generate-favicons.js /path/to/svg # Uses custom path
 *
 * SECURITY: This script validates all paths to prevent command injection
 * and path traversal attacks.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Determine project root and allowed directories
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const ALLOWED_DIRECTORIES = [
  PROJECT_ROOT,
  '/Users/howdycarter/Downloads',
  '/tmp'
];

// Default paths
const DEFAULT_SOURCE = path.join(PUBLIC_DIR, 'camino-icon-source.svg');
const FALLBACK_SOURCE = '/Users/howdycarter/Downloads/camino_favicon.svg';

/**
 * Validate input path to prevent path traversal and command injection
 * @param {string} inputPath - The path to validate
 * @returns {string} Validated absolute path
 * @throws {Error} If path is invalid or contains malicious patterns
 */
function validateInputPath(inputPath) {
  // Check for shell metacharacters that could enable command injection
  const dangerousPatterns = /[;&|`$(){}[\]<>!*?~]/;
  if (dangerousPatterns.test(inputPath)) {
    throw new Error('Invalid characters in path. Path contains potential command injection patterns.');
  }

  // Resolve to absolute path (handles relative paths and symlinks)
  let resolvedPath;
  try {
    resolvedPath = path.resolve(inputPath);
  } catch (error) {
    throw new Error(`Invalid path format: ${error.message}`);
  }

  // Ensure path is within allowed directories
  const isAllowed = ALLOWED_DIRECTORIES.some(allowedDir => {
    const normalized = path.resolve(allowedDir);
    return resolvedPath.startsWith(normalized + path.sep) || resolvedPath === normalized;
  });

  if (!isAllowed) {
    throw new Error(`Access denied. Path must be within: ${ALLOWED_DIRECTORIES.join(', ')}`);
  }

  // Check if file exists
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File does not exist: ${resolvedPath}`);
  }

  // Verify it's a file, not a directory
  const stats = fs.statSync(resolvedPath);
  if (!stats.isFile()) {
    throw new Error('Path must be a file, not a directory');
  }

  // Only allow SVG files
  const ext = path.extname(resolvedPath).toLowerCase();
  if (ext !== '.svg') {
    throw new Error(`Invalid file type. Expected .svg, got ${ext}`);
  }

  return resolvedPath;
}

/**
 * Validate output path to prevent path traversal
 * @param {string} filename - The output filename
 * @returns {string} Validated absolute output path
 * @throws {Error} If path is invalid
 */
function validateOutputPath(filename) {
  // Check for dangerous patterns BEFORE using basename (in case basename behavior varies)
  if (/[;&|`$(){}[\]<>!*?~]/.test(filename)) {
    throw new Error('Invalid characters in filename');
  }

  // Use basename to strip any directory traversal attempts
  const sanitized = path.basename(filename);

  // Double-check after basename (defense in depth)
  if (/[;&|`$(){}[\]<>!*?~]/.test(sanitized)) {
    throw new Error('Invalid characters in filename');
  }

  // Resolve to absolute path within PUBLIC_DIR
  const outputPath = path.resolve(PUBLIC_DIR, sanitized);

  // Ensure output is within PUBLIC_DIR (prevent directory escape)
  if (!outputPath.startsWith(PUBLIC_DIR + path.sep) && outputPath !== PUBLIC_DIR) {
    throw new Error('Output path must be within public directory');
  }

  return outputPath;
}

// Determine source SVG with validation
let SOURCE_SVG;
const cliArgument = process.argv[2];

if (cliArgument) {
  try {
    console.log(`🔍 Validating input path: ${cliArgument}`);
    SOURCE_SVG = validateInputPath(cliArgument);
    console.log(`✓ Validated input path: ${SOURCE_SVG}\n`);
  } catch (error) {
    console.error(`❌ Security validation failed: ${error.message}`);
    console.error('\nPath must be:');
    console.error('  - An SVG file (.svg extension)');
    console.error('  - Within allowed directories:');
    ALLOWED_DIRECTORIES.forEach(dir => console.error(`    - ${dir}`));
    console.error('  - Free of shell metacharacters (;|&`$(){}[]<>!*?~)');
    process.exit(1);
  }
} else {
  // Try default locations
  if (fs.existsSync(DEFAULT_SOURCE)) {
    SOURCE_SVG = DEFAULT_SOURCE;
  } else if (fs.existsSync(FALLBACK_SOURCE)) {
    SOURCE_SVG = FALLBACK_SOURCE;
  } else {
    console.error(`❌ Source file not found at default locations:`);
    console.error(`  - ${DEFAULT_SOURCE}`);
    console.error(`  - ${FALLBACK_SOURCE}`);
    console.error('\nPlease provide path: node scripts/generate-favicons.js /path/to/svg');
    process.exit(1);
  }
}

// Ensure output directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Favicon configurations
const FAVICON_SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'mstile-150x150.png', size: 150 },
];

console.log('🎨 Generating Camino favicon package...\n');

// Check if Sharp is available, otherwise fall back to ImageMagick
let useSharp = false;
try {
  require.resolve('sharp');
  useSharp = true;
  console.log('✓ Using Sharp for image processing (secure, no shell execution)\n');
} catch (e) {
  console.log('⚠ Sharp not found, using ImageMagick with spawn() for security\n');
}

/**
 * Generate PNG favicon using Sharp (recommended - no shell execution)
 */
async function generatePNGWithSharp(size, outputPath) {
  const sharp = require('sharp');

  await sharp(SOURCE_SVG)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(outputPath);
}

/**
 * Generate PNG favicon using ImageMagick with spawn() for security
 * Uses spawn() instead of exec() to prevent command injection
 */
function generatePNGWithImageMagick(size, outputPath) {
  return new Promise((resolve, reject) => {
    // Use spawn() which doesn't invoke a shell (secure against command injection)
    const args = [
      '-background', 'none',
      '-resize', `${size}x${size}`,
      SOURCE_SVG,
      outputPath
    ];

    const child = spawn('convert', args, {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stderr = '';
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`ImageMagick exited with code ${code}: ${stderr}`));
      } else {
        resolve();
      }
    });

    child.on('error', (err) => {
      reject(new Error(`Failed to spawn ImageMagick: ${err.message}`));
    });
  });
}

/**
 * Generate all PNG favicons
 */
async function generatePNGFavicons() {
  console.log('📦 Generating PNG favicons...');

  for (const config of FAVICON_SIZES) {
    const outputPath = validateOutputPath(config.name);

    try {
      if (useSharp) {
        await generatePNGWithSharp(config.size, outputPath);
      } else {
        await generatePNGWithImageMagick(config.size, outputPath);
      }

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`  ✓ ${config.name} (${config.size}x${config.size}) - ${sizeKB}KB`);
    } catch (error) {
      console.error(`  ✗ Failed to generate ${config.name}:`, error.message);
      throw error;
    }
  }

  console.log();
}

/**
 * Generate multi-resolution favicon.ico using spawn() for security
 */
function generateFaviconICO() {
  console.log('🖼️  Generating favicon.ico...');

  const outputPath = validateOutputPath('favicon.ico');
  const png16 = validateOutputPath('favicon-16x16.png');
  const png32 = validateOutputPath('favicon-32x32.png');
  const png48 = validateOutputPath('favicon-48x48.png');

  return new Promise((resolve, reject) => {
    // Use spawn() instead of execSync() for security
    const args = [png16, png32, png48, outputPath];
    const child = spawn('convert', args, {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stderr = '';
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.error('  ⚠ Could not generate favicon.ico. Install ImageMagick or create manually.');
        console.log();
        resolve(); // Don't fail the entire process
      } else {
        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`  ✓ favicon.ico (16+32+48px) - ${sizeKB}KB\n`);
        resolve();
      }
    });

    child.on('error', (err) => {
      console.error('  ⚠ Could not generate favicon.ico:', err.message);
      console.log();
      resolve(); // Don't fail the entire process
    });
  });
}

/**
 * Generate Safari pinned tab SVG (monochrome)
 */
function generateSafariPinnedTab() {
  console.log('🦁 Generating Safari pinned tab...');

  const outputPath = validateOutputPath('safari-pinned-tab.svg');

  // Create simplified monochrome version (hardcoded - no user input)
  const monoSVG = `<svg width="546" height="548" viewBox="0 0 546 548" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M157.37 25.4561C108.51 48.0761 65.8304 85.3061 36.5604 135.206L35.6003 136.876L34.6404 138.536C25.6504 154.356 18.4104 170.696 12.8604 187.346C21.0804 181.256 30.6404 177.206 41.0504 175.466C61.6704 172.696 79.1204 160.986 89.8704 142.366L157.37 25.4561Z" fill="#000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M227.33 3.80577L147.33 142.376C136.94 160.346 120.34 171.866 100.67 175.146C80.06 177.916 62.61 189.626 51.85 208.246L0 298.036C1.94 319.616 6.44 340.886 13.36 361.366C21.49 355.796 28.43 348.296 33.73 339.106L109.29 208.246C119.67 190.286 136.27 178.746 155.95 175.476C176.56 172.706 194.02 160.996 204.77 142.366L286.76 0.355818C266.8 -0.664182 246.86 0.515769 227.33 3.80577Z" fill="#000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M339.62 8.31567L262.22 142.376C251.84 160.346 235.23 171.866 215.56 175.146C194.95 177.916 177.49 189.616 166.74 208.236L91.1897 339.106C81.0497 356.676 64.6197 368.526 44.5297 371.876C35.8497 373.036 27.7197 375.796 20.4297 379.986C26.6497 394.766 34.1797 409.046 42.9697 422.626L53.1597 404.976C63.5297 387.006 80.1397 375.476 99.8197 372.206C120.43 369.436 137.89 357.726 148.64 339.106L224.2 208.246C234.57 190.276 251.18 178.746 270.86 175.476C291.47 172.706 308.93 160.996 319.68 142.366L387.31 25.2257C371.75 18.0157 355.78 12.3957 339.63 8.30566" fill="#000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M430.38 50.1157L377.11 142.386C366.73 160.356 350.12 171.876 330.45 175.156C309.84 177.926 292.39 189.636 281.63 208.256L206.08 339.126C195.93 356.696 179.51 368.556 159.42 371.896C138.81 374.666 121.35 386.366 110.6 404.996L76.29 464.436C87.91 476.376 100.76 487.396 114.78 497.266L168.05 404.996C178.43 387.036 195.03 375.506 214.71 372.226C235.33 369.456 252.78 357.756 263.53 339.126L339.09 208.266C349.46 190.306 366.07 178.766 385.74 175.496C406.36 172.726 423.81 161.016 434.56 142.386L468.88 82.9457C457.26 70.9957 444.42 59.9957 430.39 50.1157" fill="#000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M445.35 175.166C424.74 177.936 407.29 189.646 396.53 208.256L320.98 339.126C310.84 356.696 294.41 368.546 274.33 371.896C253.72 374.666 236.26 386.376 225.5 404.996L157.87 522.136C173.44 529.346 189.4 534.966 205.55 539.056L282.95 404.996C293.33 387.026 309.93 375.506 329.6 372.226C350.22 369.446 367.67 357.746 378.42 339.126L453.98 208.266C464.36 190.296 480.96 178.776 500.63 175.496C509.32 174.326 517.44 171.576 524.74 167.386C518.52 152.596 510.99 138.316 502.2 124.746L492.01 142.396C481.63 160.356 465.03 171.886 445.35 175.166Z" fill="#000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M511.42 208.266L435.87 339.126C425.73 356.696 409.3 368.546 389.21 371.896C368.6 374.666 351.14 386.376 340.39 404.996L258.4 547.006C278.36 548.026 298.29 546.846 317.84 543.556L397.84 404.996C408.22 387.036 424.82 375.506 444.49 372.226C465.1 369.456 482.56 357.746 493.31 339.126L545.16 249.336C543.21 227.756 538.72 206.486 531.8 186.006C523.66 191.586 516.73 199.076 511.43 208.266" fill="#000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M504.1 371.916C483.49 374.686 466.03 386.396 455.28 405.016L387.78 521.926C437.12 499.086 480.15 461.346 509.44 410.716L509.56 410.516L509.67 410.316C519.05 394.036 526.57 377.206 532.29 360.046C524.15 366.066 514.63 370.156 504.1 371.916Z" fill="#000"/>
</svg>`;

  fs.writeFileSync(outputPath, monoSVG);

  const stats = fs.statSync(outputPath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`  ✓ safari-pinned-tab.svg - ${sizeKB}KB\n`);
}

/**
 * Generate site.webmanifest
 */
function generateWebManifest() {
  console.log('📱 Generating site.webmanifest...');

  const manifest = {
    name: "Camino",
    short_name: "Camino",
    description: "12-week integrated transformation journey",
    start_url: "/",
    display: "standalone",
    theme_color: "#E2C379",
    background_color: "#2D2F33",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };

  const outputPath = validateOutputPath('site.webmanifest');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

  const stats = fs.statSync(outputPath);
  const sizeBytes = stats.size;
  console.log(`  ✓ site.webmanifest - ${sizeBytes}B\n`);
}

/**
 * Generate browserconfig.xml for Windows tiles
 */
function generateBrowserConfig() {
  console.log('🪟 Generating browserconfig.xml...');

  const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#E2C379</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;

  const outputPath = validateOutputPath('browserconfig.xml');
  fs.writeFileSync(outputPath, browserconfig);

  const stats = fs.statSync(outputPath);
  const sizeBytes = stats.size;
  console.log(`  ✓ browserconfig.xml - ${sizeBytes}B\n`);
}

/**
 * Calculate total package size
 */
function calculatePackageSize() {
  console.log('📊 Calculating package size...');

  const files = [
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-48x48.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'mstile-150x150.png',
    'safari-pinned-tab.svg',
    'site.webmanifest',
    'browserconfig.xml',
  ];

  let totalSize = 0;
  let filesFound = 0;

  files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      filesFound++;
    }
  });

  const totalKB = (totalSize / 1024).toFixed(2);
  console.log(`  ✓ Total package: ${totalKB}KB (${filesFound}/${files.length} files)\n`);

  if (totalSize > 200 * 1024) {
    console.log('  ⚠ Warning: Package size exceeds 200KB target\n');
  } else {
    console.log(`  ✓ Package size under 200KB target\n`);
  }
}

/**
 * Generate documentation
 */
function generateDocumentation() {
  console.log('📝 Generating documentation...');

  const docs = `# Camino Favicon Setup

This document describes the complete favicon package for Camino.

## Generated Files

### Standard Favicons
- **favicon.ico** - Multi-resolution icon (16x16, 32x32, 48x48) for legacy browsers
- **favicon-16x16.png** - Standard 16x16 favicon
- **favicon-32x32.png** - Standard 32x32 favicon
- **favicon-48x48.png** - Standard 48x48 favicon

### Apple iOS
- **apple-touch-icon.png** - 180x180 icon for iOS devices (home screen, bookmarks)

### Android Chrome
- **android-chrome-192x192.png** - 192x192 icon for Android devices
- **android-chrome-512x512.png** - 512x512 icon for Android splash screens

### Windows
- **mstile-150x150.png** - 150x150 tile for Windows pinned sites

### Safari
- **safari-pinned-tab.svg** - Monochrome SVG for Safari pinned tabs

### Manifest Files
- **site.webmanifest** - Web app manifest for PWA installation
- **browserconfig.xml** - Windows browser configuration

## Brand Colors

- **Primary Gold**: #CF9930
- **Light Gold**: #F2C348
- **Mid Gold**: #E9C772
- **Accent Gold**: #DCB353
- **Theme Color**: #E2C379 (average for meta tags)
- **Background**: #2D2F33 (dark charcoal)

## Implementation

The favicon package is integrated into Next.js via \`app/layout.tsx\` metadata:

\`\`\`tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#CF9930' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#E2C379',
};
\`\`\`

## Security

This script includes security protections against:
- **Command Injection**: Uses spawn() instead of exec()/execSync() to prevent shell command injection
- **Path Traversal**: Validates all paths to ensure they stay within allowed directories
- **Input Validation**: Checks for dangerous shell metacharacters and validates file types

## Testing Checklist

### Browser Testing
- [ ] Chrome/Edge - favicon displays correctly
- [ ] Firefox - favicon displays correctly
- [ ] Safari - favicon displays correctly
- [ ] Safari pinned tab - monochrome icon displays

### Mobile Testing
- [ ] iOS Safari - bookmark icon correct
- [ ] iOS Safari - home screen icon correct
- [ ] Android Chrome - home screen icon correct
- [ ] Android Chrome - splash screen displays

### Windows Testing
- [ ] Edge - pinned tile displays correctly
- [ ] Tile color matches brand

### Performance
- [ ] Total package size < 200KB
- [ ] All files served with cache headers (1 year)
- [ ] No 404 errors for favicon requests
- [ ] Manifest and browserconfig valid

### Accessibility
- [ ] Icons visible at all sizes
- [ ] Sufficient contrast in Safari pinned tab
- [ ] No rendering issues at small sizes

## Cache Headers

Ensure your server sends appropriate cache headers for favicon files:

\`\`\`
Cache-Control: public, max-age=31536000, immutable
\`\`\`

For Next.js, this is handled automatically for files in \`/public\`.

## Regenerating Favicons

To regenerate the favicon package:

\`\`\`bash
node scripts/generate-favicons.js
\`\`\`

Source file: \`/Users/howdycarter/Downloads/camino_favicon.svg\`

## Source Design

- **Dimensions**: 546x548px (square)
- **Design**: Camino logo icon variant
- **Colors**: Gold gradient (#CF9930 to #F2C348)
- **Features**: Interlocking path motif with fractal noise texture

The Safari pinned tab uses a simplified monochrome version with solid black fill.

## Browser Support

- Chrome 4+
- Firefox 3.5+
- Safari 3.1+
- Edge (all versions)
- iOS Safari 1.1+
- Android Chrome (all versions)
- Internet Explorer 11 (deprecated but supported)

## License

All favicon files are proprietary to Camino and should not be used without permission.

---

Generated: ${new Date().toISOString()}
`;

  const docsPath = path.join(__dirname, '../FAVICON_SETUP.md');
  fs.writeFileSync(docsPath, docs);

  console.log(`  ✓ FAVICON_SETUP.md created\n`);
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('🔒 Security features enabled:');
    console.log('  ✓ Path validation (prevents directory traversal)');
    console.log('  ✓ Input sanitization (prevents command injection)');
    console.log('  ✓ Shell metacharacter filtering');
    console.log('  ✓ File type validation (SVG only)');
    console.log('  ✓ Directory boundary enforcement\n');

    // Generate all assets
    await generatePNGFavicons();
    await generateFaviconICO();
    generateSafariPinnedTab();
    generateWebManifest();
    generateBrowserConfig();
    calculatePackageSize();
    generateDocumentation();

    console.log('✅ Favicon package generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Update app/layout.tsx with favicon metadata');
    console.log('2. Test favicons across browsers and devices');
    console.log('3. Commit and push changes');
    console.log('\nSee FAVICON_SETUP.md for complete documentation.\n');

  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, validateInputPath, validateOutputPath };
