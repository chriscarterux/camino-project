#!/usr/bin/env node

/**
 * Logo Verification Script
 * Verifies that the Camino logo appears in navigation and footer of all marketing pages
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

// Pages to verify
const pagesToCheck = [
  { file: 'app/page.tsx', name: 'Homepage', hasFooter: true },
  { file: 'app/how-it-works/page.tsx', name: 'How It Works', hasFooter: true },
  { file: 'app/pricing/page.tsx', name: 'Pricing', hasFooter: true },
  { file: 'app/coaching/page.tsx', name: 'Coaching', hasFooter: true },
  { file: 'app/about/page.tsx', name: 'About', hasFooter: true },
  { file: 'app/app/layout.tsx', name: 'App Dashboard', hasFooter: false },
  { file: 'app/admin/layout.tsx', name: 'Admin Dashboard', hasFooter: false },
];

// Logo patterns to check
const patterns = {
  logoImport: /import\s+Image\s+from\s+['"]next\/image['"]/,
  navLogo: /<Image[^>]*src=["']\/camino-logo\.svg["'][^>]*>/,
  footerLogo: /<Image[^>]*src=["']\/camino-logo\.svg["'][^>]*>/,
  logoFile: /camino-logo\.svg/,
};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

console.log(`${colors.blue}=====================================${colors.reset}`);
console.log(`${colors.blue}  Camino Logo Verification Script${colors.reset}`);
console.log(`${colors.blue}=====================================${colors.reset}\n`);

// Check if logo file exists
console.log(`${colors.yellow}Checking logo file...${colors.reset}`);
const logoPath = path.join(__dirname, 'public/camino-logo.svg');
totalTests++;
if (fs.existsSync(logoPath)) {
  console.log(`${colors.green}✓${colors.reset} Logo file exists: public/camino-logo.svg`);
  passedTests++;
} else {
  console.log(`${colors.red}✗${colors.reset} Logo file NOT found: public/camino-logo.svg`);
  failedTests++;
}
console.log('');

// Check each page
pagesToCheck.forEach(({ file, name, hasFooter }) => {
  const filePath = path.join(__dirname, file);

  console.log(`${colors.yellow}Checking: ${name}${colors.reset} (${file})`);

  if (!fs.existsSync(filePath)) {
    console.log(`${colors.red}✗${colors.reset} File not found\n`);
    totalTests++;
    failedTests++;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Check for Image import
  totalTests++;
  if (patterns.logoImport.test(content)) {
    console.log(`${colors.green}✓${colors.reset} Image import found`);
    passedTests++;
  } else {
    console.log(`${colors.red}✗${colors.reset} Image import NOT found`);
    failedTests++;
  }

  // Check for logo in navigation
  totalTests++;
  const navLogoMatches = content.match(patterns.navLogo);
  if (navLogoMatches && navLogoMatches.length > 0) {
    console.log(`${colors.green}✓${colors.reset} Navigation logo found`);
    passedTests++;
  } else {
    console.log(`${colors.red}✗${colors.reset} Navigation logo NOT found`);
    failedTests++;
  }

  // Check for logo in footer (if applicable)
  if (hasFooter) {
    totalTests++;
    const footerLogoMatches = content.match(patterns.footerLogo);
    if (footerLogoMatches && footerLogoMatches.length >= 2) {
      console.log(`${colors.green}✓${colors.reset} Footer logo found`);
      passedTests++;
    } else {
      console.log(`${colors.red}✗${colors.reset} Footer logo NOT found (or same as nav)`);
      failedTests++;
    }
  }

  console.log('');
});

// Summary
console.log(`${colors.blue}=====================================${colors.reset}`);
console.log(`${colors.blue}  Test Summary${colors.reset}`);
console.log(`${colors.blue}=====================================${colors.reset}`);
console.log(`Total Tests: ${totalTests}`);
console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
console.log('');

if (failedTests === 0) {
  console.log(`${colors.green}✓ ALL TESTS PASSED!${colors.reset}`);
  console.log(`${colors.green}  Camino logo is present on all pages${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.red}✗ SOME TESTS FAILED${colors.reset}`);
  console.log(`${colors.red}  Please review the errors above${colors.reset}\n`);
  process.exit(1);
}
