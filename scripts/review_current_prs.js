#!/usr/bin/env node

/**
 * Review PRs #14 and #15 with Gemini AI and post reviews to GitHub
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = '/Users/howdycarter/Documents/projects/camino-project';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAchL4eqlFTzTaH5UuoPP-yUXPrRMSKmdM';

// PR configurations for #14 and #15
const PR_CONFIGS = [
  {
    number: 14,
    title: 'Add Upstash Redis setup documentation (HOW-414)',
    branch: 'feature/HOW-414-upstash-redis',
    worktreePath: path.join(PROJECT_ROOT, 'worktrees', 'HOW-414-upstash-redis'),
  },
  {
    number: 15,
    title: 'Add comprehensive production environment variables documentation (HOW-415)',
    branch: 'feature/HOW-415-production-env-vars',
    worktreePath: path.join(PROJECT_ROOT, 'worktrees', 'HOW-415-production-env-vars'),
  }
];

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

async function getDiffContent(prNumber) {
  try {
    const diff = execSync(`gh pr diff ${prNumber}`, {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024
    });
    return diff;
  } catch (error) {
    console.error(`Error getting diff for PR #${prNumber}:`, error.message);
    return null;
  }
}

async function reviewPRWithGemini(prConfig) {
  console.log(`\n🔍 Reviewing PR #${prConfig.number}: ${prConfig.title}`);

  // Get the PR diff
  const diff = await getDiffContent(prConfig.number);

  if (!diff) {
    console.error(`❌ Could not get diff for PR #${prConfig.number}`);
    return null;
  }

  console.log(`📊 Diff size: ${(diff.length / 1024).toFixed(2)} KB`);

  const prompt = `
You are an expert code reviewer. Review this pull request for a production application.

# PR Information
- **PR #${prConfig.number}**: ${prConfig.title}
- **Branch**: ${prConfig.branch}

# PR Diff
\`\`\`diff
${diff}
\`\`\`

# Review Instructions
This is a documentation-only PR. Focus your review on:

1. **Documentation Quality**
   - Clarity and completeness
   - Accuracy of technical details
   - Ease of following setup instructions
   - Missing information or edge cases

2. **Security Considerations**
   - Are credentials handled safely in examples?
   - Are security best practices mentioned?
   - Are there any exposed secrets or sensitive info?

3. **User Experience**
   - Is the documentation easy to navigate?
   - Are examples realistic and helpful?
   - Is troubleshooting comprehensive?

4. **Accuracy**
   - Are environment variable names correct?
   - Are URLs and endpoints accurate?
   - Are cost estimates reasonable?

# Output Format
Provide a concise, actionable review in markdown format:

## Summary
[1-2 sentence overview]

## Strengths
- [What's done well]

## Issues Found
- [List any problems, if any]

## Recommendations
- [Specific improvements, if needed]

## Verdict
**[APPROVE / REQUEST CHANGES / COMMENT]**

Keep the review focused and practical. If everything looks good, say so!
`;

  try {
    console.log('🤖 Sending to Gemini AI...');
    const result = await model.generateContent(prompt);
    const review = result.response.text();
    console.log('✅ Review generated');
    return review;
  } catch (error) {
    console.error(`❌ Gemini AI error: ${error.message}`);
    return null;
  }
}

async function postReviewToGitHub(prNumber, reviewBody) {
  try {
    console.log(`💬 Posting review to PR #${prNumber}...`);

    // Create a review comment file
    const tempFile = `/tmp/review_${prNumber}.md`;
    const fullReview = `## 🤖 Gemini AI Code Review

${reviewBody}

---
*Reviewed with Gemini 2.0 Flash*`;

    fs.writeFileSync(tempFile, fullReview);

    // Post the review using gh CLI
    execSync(`gh pr comment ${prNumber} --body-file "${tempFile}"`, {
      cwd: PROJECT_ROOT,
      stdio: 'inherit'
    });

    console.log(`✅ Review posted to PR #${prNumber}`);

    // Clean up temp file
    fs.unlinkSync(tempFile);

    return true;
  } catch (error) {
    console.error(`❌ Error posting review to PR #${prNumber}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Gemini AI Code Review for PRs #14 and #15\n');

  for (const prConfig of PR_CONFIGS) {
    try {
      // Generate review
      const review = await reviewPRWithGemini(prConfig);

      if (!review) {
        console.error(`⚠️  Skipping PR #${prConfig.number} due to review generation failure`);
        continue;
      }

      // Post to GitHub
      await postReviewToGitHub(prConfig.number, review);

      // Add delay between PRs to respect rate limits
      if (prConfig.number !== PR_CONFIGS[PR_CONFIGS.length - 1].number) {
        console.log('\n⏳ Waiting 3 seconds before next review...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

    } catch (error) {
      console.error(`❌ Error processing PR #${prConfig.number}:`, error.message);
    }
  }

  console.log('\n✨ All reviews complete!');
  console.log('\n📋 Next steps:');
  console.log('  1. Check PR #14: https://github.com/chriscarterux/camino-project/pull/14');
  console.log('  2. Check PR #15: https://github.com/chriscarterux/camino-project/pull/15');
  console.log('  3. Address any feedback from Gemini');
  console.log('  4. Merge when ready');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
