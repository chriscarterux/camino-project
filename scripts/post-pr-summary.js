#!/usr/bin/env node

/**
 * Post user-friendly PR summaries for Walter
 *
 * This script generates simple, non-technical summaries of what changed
 * in each PR and posts them as comments.
 */

const { execSync } = require('child_process');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAchL4eqlFTzTaH5UuoPP-yUXPrRMSKmdM';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

async function getPRInfo(prNumber) {
  try {
    const info = execSync(`gh pr view ${prNumber} --json title,body,files,additions,deletions`, {
      encoding: 'utf-8'
    });
    return JSON.parse(info);
  } catch (error) {
    console.error(`Error getting PR info: ${error.message}`);
    return null;
  }
}

async function getPRDiff(prNumber) {
  try {
    return execSync(`gh pr diff ${prNumber}`, {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024
    });
  } catch (error) {
    console.error(`Error getting diff: ${error.message}`);
    return null;
  }
}

async function generateWalterSummary(prInfo, diff) {
  const prompt = `
You are creating a summary for Walter, a non-technical co-founder who needs to understand what changed in this pull request.

# PR Information
**Title:** ${prInfo.title}
**Files Changed:** ${prInfo.files.length}
**Lines Added:** ${prInfo.additions}
**Lines Deleted:** ${prInfo.deletions}

# Changes (Diff)
\`\`\`
${diff.substring(0, 15000)} ${diff.length > 15000 ? '... (truncated)' : ''}
\`\`\`

# Your Task
Create a brief, friendly summary that Walter can understand. Use this format:

## 📝 What Changed (For Walter)

### In Simple Terms
[1-2 sentences explaining what this PR does in plain English, no technical jargon]

### What's New
- [Bullet point 1: specific thing added/changed]
- [Bullet point 2: specific thing added/changed]
- [etc.]

### Why This Matters
[1-2 sentences explaining the business value or user benefit]

### What to Test
[Simple instructions for what Walter should verify works, OR state "Nothing to test - documentation only" if applicable]

### Anything to Watch Out For
[Any caveats, breaking changes, or things to be aware of, OR state "None - safe to merge"]

Keep it conversational and friendly. Avoid technical terms unless absolutely necessary (and explain them if you must use them).
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(`Error generating summary: ${error.message}`);
    return null;
  }
}

async function postSummaryToPR(prNumber, summary) {
  try {
    const tempFile = `/tmp/walter_summary_${prNumber}.md`;
    const fs = require('fs');
    fs.writeFileSync(tempFile, summary);

    execSync(`gh pr comment ${prNumber} --body-file "${tempFile}"`, {
      stdio: 'inherit'
    });

    fs.unlinkSync(tempFile);
    console.log(`✅ Posted summary to PR #${prNumber}`);
    return true;
  } catch (error) {
    console.error(`❌ Error posting summary: ${error.message}`);
    return false;
  }
}

async function checkIfSummaryExists(prNumber) {
  try {
    const comments = execSync(`gh pr view ${prNumber} --json comments --jq '.comments[].body'`, {
      encoding: 'utf-8'
    });
    return comments.includes('📝 What Changed (For Walter)');
  } catch (error) {
    return false;
  }
}

async function processPR(prNumber, force = false) {
  console.log(`\n🔍 Processing PR #${prNumber}...`);

  // Check if summary already exists
  if (!force && await checkIfSummaryExists(prNumber)) {
    console.log(`⏭️  Summary already exists for PR #${prNumber}, skipping...`);
    return;
  }

  // Get PR info
  const prInfo = await getPRInfo(prNumber);
  if (!prInfo) {
    console.error(`❌ Could not get info for PR #${prNumber}`);
    return;
  }

  // Get diff
  const diff = await getPRDiff(prNumber);
  if (!diff) {
    console.error(`❌ Could not get diff for PR #${prNumber}`);
    return;
  }

  console.log(`📊 PR #${prNumber}: ${prInfo.title}`);
  console.log(`   Files: ${prInfo.files.length}, +${prInfo.additions}, -${prInfo.deletions}`);

  // Generate summary
  console.log(`🤖 Generating Walter-friendly summary...`);
  const summary = await generateWalterSummary(prInfo, diff);

  if (!summary) {
    console.error(`❌ Could not generate summary for PR #${prNumber}`);
    return;
  }

  // Post summary
  await postSummaryToPR(prNumber, summary);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📋 PR Summary Generator for Walter

Usage:
  node post-pr-summary.js <pr-number>         # Post summary for one PR
  node post-pr-summary.js <pr1> <pr2> ...     # Post summaries for multiple PRs
  node post-pr-summary.js --open              # Post summaries for all open PRs
  node post-pr-summary.js --force <pr>        # Force re-post even if summary exists

Examples:
  node post-pr-summary.js 14
  node post-pr-summary.js 14 15
  node post-pr-summary.js --open
`);
    process.exit(0);
  }

  let prNumbers = [];
  let force = false;

  if (args[0] === '--open') {
    // Get all open PRs
    const openPRs = execSync(`gh pr list --json number --jq '.[].number'`, {
      encoding: 'utf-8'
    }).trim().split('\n').filter(Boolean);
    prNumbers = openPRs.map(n => parseInt(n));
    console.log(`📋 Found ${prNumbers.length} open PRs: ${prNumbers.join(', ')}`);
  } else if (args[0] === '--force') {
    force = true;
    prNumbers = args.slice(1).map(n => parseInt(n));
  } else {
    prNumbers = args.map(n => parseInt(n));
  }

  if (prNumbers.length === 0) {
    console.log('ℹ️  No PRs to process');
    process.exit(0);
  }

  console.log(`🚀 Processing ${prNumbers.length} PR(s)...\n`);

  for (const prNumber of prNumbers) {
    await processPR(prNumber, force);

    // Wait between PRs to avoid rate limits
    if (prNumbers.indexOf(prNumber) < prNumbers.length - 1) {
      console.log('\n⏳ Waiting 3 seconds...\n');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('\n✨ All summaries complete!');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
