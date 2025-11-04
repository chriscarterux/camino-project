#!/usr/bin/env node

/**
 * Gemini AI Code Review Script
 *
 * This script uses Google's Gemini API to perform comprehensive code reviews
 * on all open PRs in the Camino project.
 *
 * Requirements:
 * - GEMINI_API_KEY environment variable must be set
 * - @google/generative-ai package must be installed
 *
 * Usage:
 * GEMINI_API_KEY=your_key node scripts/gemini-code-review.js
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ROOT = '/Users/howdycarter/Documents/projects/camino-project';
const WORKTREES_DIR = path.join(PROJECT_ROOT, 'worktrees');

// Review only 2 PRs at a time to stay within free tier quota (250K tokens/min)
// To review different PRs, comment/uncomment the desired configurations
const PR_CONFIGS = [
  // BATCH 1: First 2 PRs (Analytics + Onboarding)
  {
    id: 8,
    name: 'Analytics Instrumentation',
    branch: 'HOW-177-analytics-instrumentation',
    path: path.join(WORKTREES_DIR, 'HOW-177-analytics-instrumentation'),
    focus: ['Authentication', 'Data Privacy', 'Performance', 'Security'],
    description: 'Analytics and tracking implementation'
  },
  {
    id: 9,
    name: 'Onboarding Flow',
    branch: 'HOW-180-onboarding-flow',
    path: path.join(WORKTREES_DIR, 'HOW-180-onboarding-flow'),
    focus: ['State Management', 'UX', 'Accessibility', 'localStorage Security'],
    description: 'User onboarding experience'
  },

  // BATCH 2: Next 2 PRs (Lead Capture + Logo) - UNCOMMENT TO REVIEW
  // {
  //   id: 10,
  //   name: 'Lead Capture',
  //   branch: 'HOW-169-lead-capture-form',
  //   path: path.join(WORKTREES_DIR, 'HOW-169-lead-capture-form'),
  //   focus: ['Form Validation', 'RLS Policies', 'Rate Limiting', 'Email Security'],
  //   description: 'Lead capture form implementation'
  // },
  // {
  //   id: 11,
  //   name: 'Logo',
  //   branch: 'HOW-277-camino-logo',
  //   path: path.join(WORKTREES_DIR, 'HOW-277-camino-logo'),
  //   focus: ['SVG Security', 'Performance', 'Accessibility'],
  //   description: 'Logo assets and implementation'
  // },

  // BATCH 3: Last PR (Favicon) - UNCOMMENT TO REVIEW
  // {
  //   id: 12,
  //   name: 'Favicon',
  //   branch: 'HOW-278-favicon-package',
  //   path: path.join(WORKTREES_DIR, 'HOW-278-favicon-package'),
  //   focus: ['Script Security', 'Generation Safety', 'File Handling'],
  //   description: 'Favicon generation and implementation'
  // }
];

// Initialize Gemini AI
let genAI;
let model;

function initializeGemini() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: GEMINI_API_KEY environment variable is not set');
    console.error('Please set your Gemini API key:');
    console.error('  export GEMINI_API_KEY=your_api_key_here');
    console.error('\nGet your API key from: https://aistudio.google.com/app/apikey');
    process.exit(1);
  }

  genAI = new GoogleGenerativeAI(apiKey);
  // Use Gemini 2.5 Flash for fast comprehensive code review
  model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });

  console.log('✅ Gemini AI initialized successfully');
}

// Utility functions
function getAllFiles(dirPath, arrayOfFiles = [], extensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md']) {
  try {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        // Skip node_modules, .next, .git, etc.
        if (!['node_modules', '.next', '.git', 'dist', 'build', '.cache'].includes(file)) {
          arrayOfFiles = getAllFiles(filePath, arrayOfFiles, extensions);
        }
      } else {
        const ext = path.extname(file);
        if (extensions.includes(ext)) {
          arrayOfFiles.push(filePath);
        }
      }
    });

    return arrayOfFiles;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return arrayOfFiles;
  }
}

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

function createCodeBundle(files, basePath) {
  let bundle = '';

  files.forEach(filePath => {
    const content = readFileContent(filePath);
    if (content !== null) {
      const relativePath = path.relative(basePath, filePath);
      bundle += `\n${'='.repeat(80)}\n`;
      bundle += `FILE: ${relativePath}\n`;
      bundle += `${'='.repeat(80)}\n`;
      bundle += content;
      bundle += '\n';
    }
  });

  return bundle;
}

async function reviewPR(prConfig) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🔍 Reviewing PR #${prConfig.id}: ${prConfig.name}`);
  console.log(`${'='.repeat(80)}`);

  if (!fs.existsSync(prConfig.path)) {
    console.error(`❌ Error: PR path does not exist: ${prConfig.path}`);
    return null;
  }

  // Get all relevant files
  console.log('📁 Scanning files...');
  const files = getAllFiles(prConfig.path);
  console.log(`   Found ${files.length} files to review`);

  if (files.length === 0) {
    console.log('⚠️  No files found to review');
    return null;
  }

  // Create code bundle
  console.log('📦 Creating code bundle...');
  const codeBundle = createCodeBundle(files, prConfig.path);

  // Create review prompt
  const prompt = `
You are an expert senior software engineer performing a comprehensive code review for a production-ready application.

# PR Information
- **PR #${prConfig.id}**: ${prConfig.name}
- **Branch**: ${prConfig.branch}
- **Description**: ${prConfig.description}
- **Focus Areas**: ${prConfig.focus.join(', ')}

# Code to Review
${codeBundle}

# Review Instructions
Perform a thorough code review focusing on:

1. **Security Vulnerabilities**
   - Authentication/authorization issues
   - Data exposure risks
   - XSS, CSRF, injection vulnerabilities
   - API security
   - Secrets management

2. **Performance Issues**
   - Inefficient algorithms
   - Memory leaks
   - Bundle size concerns
   - Database query optimization
   - Caching opportunities

3. **Code Quality**
   - Best practices adherence
   - Code organization
   - Naming conventions
   - Error handling
   - Edge cases

4. **Accessibility (A11y)**
   - WCAG 2.1 compliance
   - Keyboard navigation
   - Screen reader support
   - ARIA labels
   - Color contrast

5. **Testing**
   - Test coverage gaps
   - Missing edge cases
   - Integration test needs
   - E2E test opportunities

6. **Documentation**
   - Code comments
   - API documentation
   - README updates
   - TypeScript types

# Output Format
Please provide your review in the following structured format:

## Executive Summary
[Brief overview of the PR and overall assessment]

## Severity Breakdown
- **Critical**: [count]
- **High**: [count]
- **Medium**: [count]
- **Low**: [count]

## Critical Issues
[List all critical issues with specific file locations and code examples]

## High Priority Issues
[List all high priority issues with specific file locations and code examples]

## Medium Priority Issues
[List all medium priority issues with specific file locations]

## Low Priority Issues
[List all low priority suggestions]

## Security Analysis
[Detailed security review specific to focus areas]

## Performance Analysis
[Performance concerns and optimization opportunities]

## Test Coverage Assessment
[What tests are missing and what should be tested]

## Accessibility Evaluation
[A11y compliance and improvements needed]

## Positive Aspects
[What's done well in this PR]

## Recommendations
[Prioritized list of actions to take before merge]

## Merge Readiness
[Overall assessment: Ready to Merge / Needs Minor Fixes / Needs Major Fixes / Not Ready]

Be specific, provide line numbers when possible, and include code examples for issues found.
`;

  console.log('🤖 Sending to Gemini AI for review...');
  console.log(`   (Bundle size: ${(codeBundle.length / 1024).toFixed(2)} KB)`);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reviewText = response.text();

    console.log('✅ Review completed');

    return {
      prConfig,
      review: reviewText,
      fileCount: files.length,
      bundleSize: codeBundle.length
    };
  } catch (error) {
    console.error(`❌ Error during review: ${error.message}`);
    return {
      prConfig,
      review: null,
      error: error.message
    };
  }
}

function generateActionPlan(reviews) {
  console.log('\n📋 Generating action plan...');

  const allIssues = [];

  reviews.forEach(review => {
    if (review.review) {
      // Extract severity counts from review text
      const criticalMatch = review.review.match(/\*\*Critical\*\*:\s*(\d+)/i);
      const highMatch = review.review.match(/\*\*High\*\*:\s*(\d+)/i);
      const mediumMatch = review.review.match(/\*\*Medium\*\*:\s*(\d+)/i);
      const lowMatch = review.review.match(/\*\*Low\*\*:\s*(\d+)/i);

      const critical = criticalMatch ? parseInt(criticalMatch[1]) : 0;
      const high = highMatch ? parseInt(highMatch[1]) : 0;
      const medium = mediumMatch ? parseInt(mediumMatch[1]) : 0;
      const low = lowMatch ? parseInt(lowMatch[1]) : 0;

      // Extract merge readiness
      const mergeReadinessMatch = review.review.match(/Merge Readiness[:\]]*\s*\*\*([^\*\n]+)\*\*/i) ||
                                   review.review.match(/\*\*Merge Readiness[:\]]*\s*([^\*\n]+)/i);
      const mergeReadiness = mergeReadinessMatch ? mergeReadinessMatch[1].trim() : 'Unknown';

      allIssues.push({
        pr: review.prConfig,
        critical,
        high,
        medium,
        low,
        total: critical + high + medium + low,
        mergeReadiness
      });
    }
  });

  // Sort by severity (critical first, then total issues)
  allIssues.sort((a, b) => {
    if (b.critical !== a.critical) return b.critical - a.critical;
    if (b.high !== a.high) return b.high - a.high;
    return b.total - a.total;
  });

  let actionPlan = `# Gemini AI Code Review - Action Plan\n\n`;
  actionPlan += `Generated: ${new Date().toISOString()}\n\n`;

  actionPlan += `## Overview\n\n`;
  actionPlan += `Total PRs Reviewed: ${reviews.length}\n\n`;

  actionPlan += `| PR | Name | Critical | High | Medium | Low | Total | Status |\n`;
  actionPlan += `|----|------|----------|------|--------|-----|-------|--------|\n`;

  allIssues.forEach(issue => {
    actionPlan += `| #${issue.pr.id} | ${issue.pr.name} | ${issue.critical} | ${issue.high} | ${issue.medium} | ${issue.low} | ${issue.total} | ${issue.mergeReadiness} |\n`;
  });

  actionPlan += `\n## Recommended Merge Order\n\n`;

  // Group by readiness
  const ready = allIssues.filter(i => i.mergeReadiness.includes('Ready'));
  const minor = allIssues.filter(i => i.mergeReadiness.includes('Minor'));
  const major = allIssues.filter(i => i.mergeReadiness.includes('Major'));
  const notReady = allIssues.filter(i => i.mergeReadiness.includes('Not Ready'));

  if (ready.length > 0) {
    actionPlan += `### ✅ Ready to Merge (After Minor Review)\n\n`;
    ready.forEach((issue, idx) => {
      actionPlan += `${idx + 1}. **PR #${issue.pr.id}**: ${issue.pr.name}\n`;
      actionPlan += `   - Issues: ${issue.total} (${issue.critical} critical, ${issue.high} high)\n`;
      actionPlan += `   - Estimated fix time: 0-2 hours\n\n`;
    });
  }

  if (minor.length > 0) {
    actionPlan += `### 🔧 Needs Minor Fixes\n\n`;
    minor.forEach((issue, idx) => {
      actionPlan += `${idx + 1}. **PR #${issue.pr.id}**: ${issue.pr.name}\n`;
      actionPlan += `   - Issues: ${issue.total} (${issue.critical} critical, ${issue.high} high)\n`;
      actionPlan += `   - Estimated fix time: 2-4 hours\n\n`;
    });
  }

  if (major.length > 0) {
    actionPlan += `### ⚠️ Needs Major Fixes\n\n`;
    major.forEach((issue, idx) => {
      actionPlan += `${idx + 1}. **PR #${issue.pr.id}**: ${issue.pr.name}\n`;
      actionPlan += `   - Issues: ${issue.total} (${issue.critical} critical, ${issue.high} high)\n`;
      actionPlan += `   - Estimated fix time: 4-8 hours\n\n`;
    });
  }

  if (notReady.length > 0) {
    actionPlan += `### 🚫 Not Ready for Merge\n\n`;
    notReady.forEach((issue, idx) => {
      actionPlan += `${idx + 1}. **PR #${issue.pr.id}**: ${issue.pr.name}\n`;
      actionPlan += `   - Issues: ${issue.total} (${issue.critical} critical, ${issue.high} high)\n`;
      actionPlan += `   - Estimated fix time: 8+ hours\n\n`;
    });
  }

  actionPlan += `## Priority Actions\n\n`;
  actionPlan += `### Immediate (Today)\n\n`;

  const criticalPRs = allIssues.filter(i => i.critical > 0);
  if (criticalPRs.length > 0) {
    criticalPRs.forEach(pr => {
      actionPlan += `- **PR #${pr.pr.id}**: Fix ${pr.critical} critical issue(s)\n`;
    });
  } else {
    actionPlan += `- No critical issues found ✅\n`;
  }

  actionPlan += `\n### Short-term (This Week)\n\n`;

  const highPRs = allIssues.filter(i => i.high > 0);
  if (highPRs.length > 0) {
    highPRs.forEach(pr => {
      actionPlan += `- **PR #${pr.pr.id}**: Address ${pr.high} high priority issue(s)\n`;
    });
  } else {
    actionPlan += `- No high priority issues found ✅\n`;
  }

  actionPlan += `\n### Medium-term (Next Sprint)\n\n`;

  const mediumPRs = allIssues.filter(i => i.medium > 0);
  if (mediumPRs.length > 0) {
    mediumPRs.forEach(pr => {
      actionPlan += `- **PR #${pr.pr.id}**: Improve ${pr.medium} medium priority item(s)\n`;
    });
  } else {
    actionPlan += `- No medium priority issues found ✅\n`;
  }

  actionPlan += `\n## Next Steps\n\n`;
  actionPlan += `1. Review full Gemini analysis in GEMINI_CODE_REVIEW.md\n`;
  actionPlan += `2. Address all critical issues first\n`;
  actionPlan += `3. Create GitHub issues for high priority items\n`;
  actionPlan += `4. Schedule fixes based on estimated time\n`;
  actionPlan += `5. Re-review PRs after fixes are applied\n`;
  actionPlan += `6. Merge in recommended order\n`;

  return actionPlan;
}

function generateFixSummary(reviews) {
  console.log('📝 Generating fix summary...');

  let summary = `# Gemini AI Code Review - Quick Fix Summary\n\n`;
  summary += `Generated: ${new Date().toISOString()}\n\n`;

  reviews.forEach(review => {
    if (review.review) {
      summary += `## PR #${review.prConfig.id}: ${review.prConfig.name}\n\n`;

      // Extract critical and high issues sections
      const criticalSection = review.review.match(/## Critical Issues\s*([\s\S]*?)(?=##|$)/i);
      const highSection = review.review.match(/## High Priority Issues\s*([\s\S]*?)(?=##|$)/i);

      if (criticalSection) {
        summary += `### ❌ Critical Issues\n\n`;
        summary += criticalSection[1].trim() + '\n\n';
      }

      if (highSection) {
        summary += `### ⚠️ High Priority Issues\n\n`;
        summary += highSection[1].trim() + '\n\n';
      }

      summary += `---\n\n`;
    }
  });

  return summary;
}

async function main() {
  console.log('🚀 Gemini AI Code Review - Starting...\n');

  // Initialize Gemini
  initializeGemini();

  // Review all PRs
  const reviews = [];

  for (const prConfig of PR_CONFIGS) {
    const review = await reviewPR(prConfig);
    if (review) {
      reviews.push(review);
    }

    // Add a small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Generate full review document
  console.log('\n📄 Generating review documents...');

  let fullReview = `# Gemini AI Code Review - Complete Analysis\n\n`;
  fullReview += `Generated: ${new Date().toISOString()}\n`;
  fullReview += `Model: Gemini 1.5 Pro\n`;
  fullReview += `PRs Reviewed: ${reviews.length}\n\n`;

  reviews.forEach(review => {
    fullReview += `\n${'='.repeat(100)}\n`;
    fullReview += `# PR #${review.prConfig.id}: ${review.prConfig.name}\n`;
    fullReview += `${'='.repeat(100)}\n\n`;
    fullReview += `**Branch**: ${review.prConfig.branch}\n`;
    fullReview += `**Description**: ${review.prConfig.description}\n`;
    fullReview += `**Focus Areas**: ${review.prConfig.focus.join(', ')}\n`;
    fullReview += `**Files Reviewed**: ${review.fileCount}\n`;
    fullReview += `**Code Size**: ${(review.bundleSize / 1024).toFixed(2)} KB\n\n`;

    if (review.review) {
      fullReview += review.review;
    } else {
      fullReview += `**Error**: ${review.error}\n`;
    }

    fullReview += '\n\n';
  });

  // Generate action plan
  const actionPlan = generateActionPlan(reviews);

  // Generate fix summary
  const fixSummary = generateFixSummary(reviews);

  // Write documents
  const outputDir = PROJECT_ROOT;

  fs.writeFileSync(path.join(outputDir, 'GEMINI_CODE_REVIEW.md'), fullReview);
  console.log('✅ Created: GEMINI_CODE_REVIEW.md');

  fs.writeFileSync(path.join(outputDir, 'GEMINI_ACTION_PLAN.md'), actionPlan);
  console.log('✅ Created: GEMINI_ACTION_PLAN.md');

  fs.writeFileSync(path.join(outputDir, 'GEMINI_FIX_SUMMARY.md'), fixSummary);
  console.log('✅ Created: GEMINI_FIX_SUMMARY.md');

  console.log('\n🎉 Gemini AI Code Review Complete!');
  console.log(`\n📊 Summary:`);
  console.log(`   - Reviews completed: ${reviews.filter(r => r.review).length}/${reviews.length}`);
  console.log(`   - Reports generated: 3`);
  console.log(`\n📁 Output files:`);
  console.log(`   - ${path.join(outputDir, 'GEMINI_CODE_REVIEW.md')}`);
  console.log(`   - ${path.join(outputDir, 'GEMINI_ACTION_PLAN.md')}`);
  console.log(`   - ${path.join(outputDir, 'GEMINI_FIX_SUMMARY.md')}`);
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
