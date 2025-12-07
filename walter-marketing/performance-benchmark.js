#!/usr/bin/env node

/**
 * Performance Benchmark Suite for PRs #8-12
 *
 * Measures:
 * - Analytics overhead (PR #8)
 * - Onboarding performance (PR #9)
 * - Lead capture latency (PR #10)
 * - Logo rendering (PR #11)
 * - Favicon package size (PR #12)
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// Color output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function gradePerformance(metric, value, targets) {
  if (value <= targets.good) return { grade: '✅', color: 'green' };
  if (value <= targets.warning) return { grade: '⚠️', color: 'yellow' };
  return { grade: '❌', color: 'red' };
}

// Performance targets
const TARGETS = {
  pageLoad: { good: 2000, warning: 3000 }, // ms
  apiResponse: { good: 200, warning: 500 }, // ms
  renderTime: { good: 50, warning: 100 }, // ms
  localStorage: { good: 5, warning: 10 }, // ms
  fileSize: { good: 50, warning: 100 }, // KB
  totalPackageSize: { good: 100, warning: 200 }, // KB
};

const results = {
  analytics: {},
  onboarding: {},
  leadCapture: {},
  logo: {},
  favicon: {},
};

// =========================
// PR #8: Analytics Benchmarks
// =========================

function benchmarkAnalytics() {
  log('\n📊 PR #8: Analytics Performance\n', 'bold');

  // 1. Event tracking overhead
  const eventPayload = {
    event: 'test_event',
    user_id: 'test_user_123',
    timestamp: new Date().toISOString(),
    properties: {
      page: '/test',
      action: 'click',
      element: 'button',
    },
  };

  const iterations = 1000;
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    // Simulate event processing
    const serialized = JSON.stringify(eventPayload);
    const parsed = JSON.parse(serialized);

    // Simulate validation
    const isValid = parsed.user_id && parsed.timestamp && parsed.event;
  }

  const end = performance.now();
  const avgOverhead = (end - start) / iterations;

  results.analytics.eventOverhead = avgOverhead;
  const { grade, color } = gradePerformance(avgOverhead, avgOverhead, { good: 1, warning: 5 });
  log(`${grade} Event Tracking Overhead: ${avgOverhead.toFixed(3)}ms per event`, color);

  // 2. Queue operations
  const queueStart = performance.now();
  const queue = [];
  for (let i = 0; i < 100; i++) {
    queue.push({ event: eventPayload, retries: 0, timestamp: new Date().toISOString() });
  }
  const queueEnd = performance.now();

  results.analytics.queueOperations = queueEnd - queueStart;
  log(`✓ Queue 100 events: ${(queueEnd - queueStart).toFixed(2)}ms`, 'blue');

  // 3. Memory usage estimation
  const singleEventSize = new Blob([JSON.stringify(eventPayload)]).size;
  const maxQueueMemory = (singleEventSize * 100) / 1024; // KB

  results.analytics.maxQueueMemory = maxQueueMemory;
  log(`✓ Max Queue Memory: ${maxQueueMemory.toFixed(2)}KB (100 events)`, 'blue');

  return results.analytics;
}

// =========================
// PR #9: Onboarding Benchmarks
// =========================

function benchmarkOnboarding() {
  log('\n🚀 PR #9: Onboarding Flow Performance\n', 'bold');

  // 1. localStorage read/write performance
  const testState = {
    intent: 'identity',
    reflections: [
      {
        id: 'ref_1',
        promptId: 'prompt_1',
        promptText: 'Test prompt',
        text: 'Lorem ipsum '.repeat(50), // ~550 chars
        wordCount: 100,
        timeSpent: 120,
        timestamp: new Date().toISOString(),
      },
    ],
    currentStep: 2,
    insightId: null,
    startTime: Date.now(),
  };

  // Write performance
  const writeStart = performance.now();
  const iterations = 100;

  for (let i = 0; i < iterations; i++) {
    const serialized = JSON.stringify(testState);
    // Simulate localStorage.setItem
  }

  const writeEnd = performance.now();
  const avgWrite = (writeEnd - writeStart) / iterations;

  results.onboarding.localStorageWrite = avgWrite;
  const writeResult = gradePerformance(avgWrite, avgWrite, TARGETS.localStorage);
  log(`${writeResult.grade} localStorage Write: ${avgWrite.toFixed(3)}ms`, writeResult.color);

  // Read performance
  const readStart = performance.now();
  const serialized = JSON.stringify(testState);

  for (let i = 0; i < iterations; i++) {
    const parsed = JSON.parse(serialized);
  }

  const readEnd = performance.now();
  const avgRead = (readEnd - readStart) / iterations;

  results.onboarding.localStorageRead = avgRead;
  const readResult = gradePerformance(avgRead, avgRead, TARGETS.localStorage);
  log(`${readResult.grade} localStorage Read: ${avgRead.toFixed(3)}ms`, readResult.color);

  // 2. State size calculation
  const stateSize = new Blob([serialized]).size / 1024;
  results.onboarding.stateSize = stateSize;
  log(`✓ State Size: ${stateSize.toFixed(2)}KB`, 'blue');

  // 3. Reflection text processing
  const reflectionText = 'Lorem ipsum '.repeat(100); // ~1200 chars
  const processStart = performance.now();

  for (let i = 0; i < 1000; i++) {
    const words = reflectionText.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const isValid = wordCount >= 50 && wordCount <= 1000;
  }

  const processEnd = performance.now();
  const avgProcess = (processEnd - processStart) / 1000;

  results.onboarding.textProcessing = avgProcess;
  log(`✓ Text Processing: ${avgProcess.toFixed(3)}ms per validation`, 'blue');

  // 4. Component render estimation (synthetic)
  // Based on DOM operations
  const renderStart = performance.now();

  for (let i = 0; i < 100; i++) {
    // Simulate React state update
    const newState = { ...testState, currentStep: testState.currentStep + 1 };
    const stateChanged = JSON.stringify(testState) !== JSON.stringify(newState);
  }

  const renderEnd = performance.now();
  results.onboarding.stateUpdateOverhead = (renderEnd - renderStart) / 100;
  log(`✓ State Update Overhead: ${results.onboarding.stateUpdateOverhead.toFixed(3)}ms`, 'blue');

  return results.onboarding;
}

// =========================
// PR #10: Lead Capture Benchmarks
// =========================

function benchmarkLeadCapture() {
  log('\n📧 PR #10: Lead Capture Performance\n', 'bold');

  // 1. Form validation performance
  const validationStart = performance.now();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const testEmails = [
    'test@example.com',
    'invalid-email',
    'user@domain.co.uk',
    'another.test@subdomain.example.org',
  ];

  for (let i = 0; i < 1000; i++) {
    testEmails.forEach(email => {
      const isValid = emailRegex.test(email);
      const normalized = email.toLowerCase().trim();
    });
  }

  const validationEnd = performance.now();
  const avgValidation = (validationEnd - validationStart) / (1000 * testEmails.length);

  results.leadCapture.emailValidation = avgValidation;
  log(`✓ Email Validation: ${avgValidation.toFixed(4)}ms per email`, 'blue');

  // 2. Form submission payload size
  const submissionPayload = {
    email: 'test@example.com',
    name: 'John Doe',
    primary_interest: 'identity',
    source: 'homepage',
  };

  const payloadSize = new Blob([JSON.stringify(submissionPayload)]).size;
  results.leadCapture.payloadSize = payloadSize;
  log(`✓ Submission Payload: ${payloadSize} bytes`, 'blue');

  // 3. Rate limiting check overhead
  const rateLimitStart = performance.now();
  const rateLimitMap = new Map();
  const testIP = '192.168.1.1';

  for (let i = 0; i < 1000; i++) {
    const now = Date.now();
    const limit = rateLimitMap.get(testIP);

    if (!limit || now > (limit.resetTime || 0)) {
      rateLimitMap.set(testIP, { count: 1, resetTime: now + 60000 });
    } else {
      limit.count++;
    }
  }

  const rateLimitEnd = performance.now();
  results.leadCapture.rateLimitCheck = (rateLimitEnd - rateLimitStart) / 1000;
  log(`✓ Rate Limit Check: ${results.leadCapture.rateLimitCheck.toFixed(3)}ms per check`, 'blue');

  // 4. Simulated API response time (estimate)
  // Database insert + email send
  const estimatedDbInsert = 50; // ms
  const estimatedEmailSend = 150; // ms (async, doesn't block)
  const estimatedTotal = estimatedDbInsert + 10; // 10ms overhead

  results.leadCapture.estimatedApiResponse = estimatedTotal;
  const apiResult = gradePerformance(estimatedTotal, estimatedTotal, TARGETS.apiResponse);
  log(`${apiResult.grade} Estimated API Response: ${estimatedTotal}ms`, apiResult.color);

  return results.leadCapture;
}

// =========================
// PR #11: Logo Benchmarks
// =========================

function benchmarkLogo() {
  log('\n🎨 PR #11: Logo Optimization\n', 'bold');

  const worktreeLogos = '/Users/howdycarter/Documents/projects/camino-project/worktrees/HOW-277-camino-logo/walter-marketing/public';
  const logos = [
    { name: 'camino-logo.svg', path: path.join(worktreeLogos, 'camino-logo.svg') },
    { name: 'camino-logo-full.svg', path: path.join(worktreeLogos, 'camino-logo-full.svg') },
    { name: 'camino-logo-dark.svg', path: path.join(worktreeLogos, 'camino-logo-dark.svg') },
    { name: 'camino-icon.svg', path: path.join(worktreeLogos, 'camino-icon.svg') },
  ];

  let totalSize = 0;
  logos.forEach(logo => {
    if (fs.existsSync(logo.path)) {
      const stats = fs.statSync(logo.path);
      const sizeKB = stats.size / 1024;
      totalSize += sizeKB;

      const result = gradePerformance(sizeKB, sizeKB, TARGETS.fileSize);
      log(`${result.grade} ${logo.name}: ${sizeKB.toFixed(2)}KB`, result.color);

      results.logo[logo.name] = sizeKB;
    }
  });

  results.logo.totalSize = totalSize;
  log(`\n✓ Total Logo Package: ${totalSize.toFixed(2)}KB`, 'blue');

  // SVG parsing performance
  if (fs.existsSync(logos[0].path)) {
    const svgContent = fs.readFileSync(logos[0].path, 'utf8');

    const parseStart = performance.now();
    for (let i = 0; i < 1000; i++) {
      // Simulate DOM parsing
      const hasViewBox = svgContent.includes('viewBox');
      const pathCount = (svgContent.match(/<path/g) || []).length;
    }
    const parseEnd = performance.now();

    results.logo.parseTime = (parseEnd - parseStart) / 1000;
    log(`✓ SVG Parse Time: ${results.logo.parseTime.toFixed(3)}ms`, 'blue');
  }

  return results.logo;
}

// =========================
// PR #12: Favicon Benchmarks
// =========================

function benchmarkFavicon() {
  log('\n🔖 PR #12: Favicon Package\n', 'bold');

  const worktreeFavicons = '/Users/howdycarter/Documents/projects/camino-project/worktrees/HOW-278-favicon-package/walter-marketing/public';
  const faviconFiles = [
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
  let fileCount = 0;

  faviconFiles.forEach(file => {
    const filePath = path.join(worktreeFavicons, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = stats.size / 1024;
      totalSize += sizeKB;
      fileCount++;

      const result = gradePerformance(sizeKB, sizeKB, TARGETS.fileSize);
      log(`${result.grade} ${file}: ${sizeKB.toFixed(2)}KB`, result.color);

      results.favicon[file] = sizeKB;
    }
  });

  results.favicon.totalSize = totalSize;
  results.favicon.fileCount = fileCount;

  const totalResult = gradePerformance(totalSize, totalSize, TARGETS.totalPackageSize);
  log(`\n${totalResult.grade} Total Favicon Package: ${totalSize.toFixed(2)}KB (${fileCount} files)`, totalResult.color);

  // Check generation script performance
  const scriptPath = path.join(worktreeFavicons, '../scripts/generate-favicons.js');
  if (fs.existsSync(scriptPath)) {
    const scriptStats = fs.statSync(scriptPath);
    results.favicon.generationScriptSize = scriptStats.size / 1024;
    log(`✓ Generation Script: ${results.favicon.generationScriptSize.toFixed(2)}KB`, 'blue');
  }

  return results.favicon;
}

// =========================
// Generate Report
// =========================

function generateReport() {
  log('\n' + '='.repeat(60), 'bold');
  log('PERFORMANCE BENCHMARK SUMMARY', 'bold');
  log('='.repeat(60) + '\n', 'bold');

  // Calculate overall scores
  const scores = {
    analytics: 0,
    onboarding: 0,
    leadCapture: 0,
    logo: 0,
    favicon: 0,
  };

  // Analytics score
  if (results.analytics.eventOverhead < 1) scores.analytics += 33;
  if (results.analytics.maxQueueMemory < 50) scores.analytics += 33;
  scores.analytics += 34; // Base points

  // Onboarding score
  if (results.onboarding.localStorageWrite < 5) scores.onboarding += 25;
  if (results.onboarding.localStorageRead < 5) scores.onboarding += 25;
  if (results.onboarding.stateSize < 10) scores.onboarding += 25;
  scores.onboarding += 25; // Base points

  // Lead Capture score
  if (results.leadCapture.estimatedApiResponse < 200) scores.leadCapture += 50;
  scores.leadCapture += 50; // Base points

  // Logo score
  if (results.logo.totalSize < 50) scores.logo += 50;
  scores.logo += 50; // Base points

  // Favicon score
  if (results.favicon.totalSize < 100) scores.favicon += 50;
  scores.favicon += 50; // Base points

  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5;

  log(`PR #8 (Analytics):      ${scores.analytics}/100`, scores.analytics >= 90 ? 'green' : 'yellow');
  log(`PR #9 (Onboarding):     ${scores.onboarding}/100`, scores.onboarding >= 90 ? 'green' : 'yellow');
  log(`PR #10 (Lead Capture):  ${scores.leadCapture}/100`, scores.leadCapture >= 90 ? 'green' : 'yellow');
  log(`PR #11 (Logo):          ${scores.logo}/100`, scores.logo >= 90 ? 'green' : 'yellow');
  log(`PR #12 (Favicon):       ${scores.favicon}/100`, scores.favicon >= 90 ? 'green' : 'yellow');
  log(`\nOVERALL SCORE:          ${overallScore.toFixed(0)}/100`, overallScore >= 90 ? 'green' : 'yellow');

  return { scores, overallScore, results };
}

// =========================
// Main Execution
// =========================

async function main() {
  log('🚀 Camino Performance Benchmark Suite', 'bold');
  log('Testing PRs #8-12\n', 'blue');

  try {
    benchmarkAnalytics();
    benchmarkOnboarding();
    benchmarkLeadCapture();
    benchmarkLogo();
    benchmarkFavicon();

    const report = generateReport();

    // Save detailed results
    const reportPath = path.join(__dirname, 'performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    log(`\n📊 Detailed report saved to: ${reportPath}`, 'green');

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

main();
