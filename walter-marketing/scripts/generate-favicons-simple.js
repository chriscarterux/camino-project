#!/usr/bin/env node

/**
 * Simple Favicon Generation Script for Camino
 *
 * This script generates favicon files using available tools.
 * It will try Sharp first, then fall back to manual instructions.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Support CLI argument for source SVG path (for flexibility)
// Default to repo path, fallback to downloads
const DEFAULT_SOURCE = path.join(__dirname, '../public/camino-icon-source.svg');
const FALLBACK_SOURCE = '/Users/howdycarter/Downloads/camino_favicon.svg';
const SOURCE_SVG = process.argv[2] || DEFAULT_SOURCE;
const PUBLIC_DIR = path.join(__dirname, '../public');

console.log('🎨 Generating Camino favicon package...\n');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Check if source exists
if (!fs.existsSync(SOURCE_SVG)) {
  console.error(`❌ Source file not found: ${SOURCE_SVG}`);
  process.exit(1);
}

/**
 * Generate Safari pinned tab (monochrome SVG)
 */
function generateSafariPinnedTab() {
  console.log('🦁 Generating Safari pinned tab...');

  const outputPath = path.join(PUBLIC_DIR, 'safari-pinned-tab.svg');

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
  console.log('  ✓ safari-pinned-tab.svg created\n');
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

  const outputPath = path.join(PUBLIC_DIR, 'site.webmanifest');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log('  ✓ site.webmanifest created\n');
}

/**
 * Generate browserconfig.xml
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

  const outputPath = path.join(PUBLIC_DIR, 'browserconfig.xml');
  fs.writeFileSync(outputPath, browserconfig);
  console.log('  ✓ browserconfig.xml created\n');
}

/**
 * Copy source SVG to public directory
 */
function copySourceSVG() {
  console.log('📋 Copying source SVG to public...');

  const destPath = path.join(PUBLIC_DIR, 'camino-icon.svg');
  fs.copyFileSync(SOURCE_SVG, destPath);
  console.log('  ✓ camino-icon.svg copied\n');
}

/**
 * Check for required tools
 */
function checkTools() {
  console.log('🔍 Checking for image processing tools...\n');

  let hasImageMagick = false;
  let hasSharp = false;

  // Check for ImageMagick
  try {
    execSync('which convert', { stdio: 'pipe' });
    hasImageMagick = true;
    console.log('  ✓ ImageMagick found');
  } catch (e) {
    console.log('  ✗ ImageMagick not found');
  }

  // Check for Sharp
  try {
    require.resolve('sharp');
    hasSharp = true;
    console.log('  ✓ Sharp found');
  } catch (e) {
    console.log('  ✗ Sharp not found');
  }

  console.log();

  return { hasImageMagick, hasSharp };
}

/**
 * Generate PNG files using ImageMagick
 */
function generatePNGsWithImageMagick() {
  console.log('📦 Generating PNG files with ImageMagick...\n');

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'mstile-150x150.png', size: 150 },
  ];

  for (const config of sizes) {
    const outputPath = path.join(PUBLIC_DIR, config.name);

    try {
      execSync(
        `convert -background none -resize ${config.size}x${config.size} "${SOURCE_SVG}" "${outputPath}"`,
        { stdio: 'inherit' }
      );
      console.log(`  ✓ ${config.name}`);
    } catch (error) {
      console.error(`  ✗ Failed: ${config.name}`);
    }
  }

  console.log();

  // Generate favicon.ico
  console.log('🖼️  Generating favicon.ico...\n');
  try {
    const png16 = path.join(PUBLIC_DIR, 'favicon-16x16.png');
    const png32 = path.join(PUBLIC_DIR, 'favicon-32x32.png');
    const png48 = path.join(PUBLIC_DIR, 'favicon-48x48.png');
    const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');

    execSync(
      `convert "${png16}" "${png32}" "${png48}" "${icoPath}"`,
      { stdio: 'inherit' }
    );
    console.log('  ✓ favicon.ico\n');
  } catch (error) {
    console.error('  ✗ Failed to create favicon.ico\n');
  }
}

/**
 * Generate PNG files using Sharp
 */
async function generatePNGsWithSharp() {
  console.log('📦 Generating PNG files with Sharp...\n');

  const sharp = require('sharp');

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'mstile-150x150.png', size: 150 },
  ];

  for (const config of sizes) {
    const outputPath = path.join(PUBLIC_DIR, config.name);

    try {
      await sharp(SOURCE_SVG)
        .resize(config.size, config.size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ compressionLevel: 9, quality: 100 })
        .toFile(outputPath);

      console.log(`  ✓ ${config.name}`);
    } catch (error) {
      console.error(`  ✗ Failed: ${config.name}`);
    }
  }

  console.log();
}

/**
 * Print manual instructions
 */
function printManualInstructions() {
  console.log('📝 Manual PNG Generation Required\n');
  console.log('Neither ImageMagick nor Sharp are available.');
  console.log('Please generate PNG files manually using your preferred tool:\n');
  console.log('Required files:');
  console.log('  - favicon-16x16.png (16x16)');
  console.log('  - favicon-32x32.png (32x32)');
  console.log('  - favicon-48x48.png (48x48)');
  console.log('  - apple-touch-icon.png (180x180)');
  console.log('  - android-chrome-192x192.png (192x192)');
  console.log('  - android-chrome-512x512.png (512x512)');
  console.log('  - mstile-150x150.png (150x150)');
  console.log('  - favicon.ico (multi-resolution: 16,32,48)\n');
  console.log(`Source: ${SOURCE_SVG}`);
  console.log(`Destination: ${PUBLIC_DIR}\n`);
  console.log('To install ImageMagick: brew install imagemagick');
  console.log('To install Sharp: npm install --save-dev sharp\n');
}

/**
 * Main execution
 */
async function main() {
  try {
    const { hasImageMagick, hasSharp } = checkTools();

    // Generate non-PNG assets (these don't require external tools)
    generateSafariPinnedTab();
    generateWebManifest();
    generateBrowserConfig();
    copySourceSVG();

    // Generate PNG assets
    if (hasSharp) {
      await generatePNGsWithSharp();
    } else if (hasImageMagick) {
      generatePNGsWithImageMagick();
    } else {
      printManualInstructions();
      return;
    }

    console.log('✅ Favicon generation complete!\n');
    console.log('Next steps:');
    console.log('1. Update app/layout.tsx with favicon metadata');
    console.log('2. Test across browsers and devices');
    console.log('3. Run: git add public/ && git commit -m "Add favicon package"\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
