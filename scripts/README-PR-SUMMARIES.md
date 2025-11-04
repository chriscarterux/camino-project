# PR Summary Generator for Walter

This script automatically generates user-friendly, non-technical summaries of pull requests that Walter can easily understand.

## What It Does

When you create a PR, this script:
1. Reads the code changes
2. Uses Gemini AI to translate technical changes into plain English
3. Posts a comment on the PR with sections like:
   - **In Simple Terms** - What changed in 1-2 sentences
   - **What's New** - Bullet points of specific changes
   - **Why This Matters** - Business value/user benefit
   - **What to Test** - Simple testing instructions
   - **Anything to Watch Out For** - Caveats or breaking changes

## Usage

### For a Single PR
```bash
GEMINI_API_KEY="your_key" node scripts/post-pr-summary.js 14
```

### For Multiple PRs
```bash
GEMINI_API_KEY="your_key" node scripts/post-pr-summary.js 14 15 16
```

### For All Open PRs
```bash
GEMINI_API_KEY="your_key" node scripts/post-pr-summary.js --open
```

### Force Re-Generate (if summary already exists)
```bash
GEMINI_API_KEY="your_key" node scripts/post-pr-summary.js --force 14
```

## Automatic Usage (Recommended)

### Option 1: GitHub Action
Add this to `.github/workflows/pr-summary.yml`:

```yaml
name: Generate PR Summary for Walter

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  summary:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Generate Walter Summary
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          node scripts/post-pr-summary.js ${{ github.event.pull_request.number }}
```

### Option 2: Pre-Push Hook
Add to `.git/hooks/pre-push`:

```bash
#!/bin/bash
# Auto-generate PR summaries when pushing new PRs

current_branch=$(git branch --show-current)
if [[ "$current_branch" =~ ^feature/ ]] || [[ "$current_branch" =~ ^HOW- ]]; then
  echo "Checking for new PR..."
  pr_number=$(gh pr view --json number -q .number 2>/dev/null)
  if [ -n "$pr_number" ]; then
    echo "Generating Walter summary for PR #$pr_number..."
    GEMINI_API_KEY="your_key" node scripts/post-pr-summary.js $pr_number
  fi
fi
```

### Option 3: Manual After PR Creation
Just run it manually after creating each PR:

```bash
# After creating PR #14
GEMINI_API_KEY="your_key" node scripts/post-pr-summary.js 14
```

## Environment Variables

You need to set your Gemini API key:

```bash
export GEMINI_API_KEY="AIzaSyAchL4eqlFTzTaH5UuoPP-yUXPrRMSKmdM"
```

Or add to your shell profile (~/.zshrc or ~/.bashrc):

```bash
echo 'export GEMINI_API_KEY="your_key_here"' >> ~/.zshrc
source ~/.zshrc
```

## Example Output

The script generates comments like this:

```markdown
## 📝 What Changed (For Walter)

### In Simple Terms
This pull request adds a guide explaining how to set up Upstash Redis,
which we're using to protect our lead capture forms from being spammed.

### What's New
- A step-by-step guide on creating an Upstash account and database
- Instructions on how to configure the connection in both local and production
- Tips for verifying the setup and troubleshooting common issues

### Why This Matters
By implementing rate limiting, we can ensure our lead capture forms remain
functional and avoid being overwhelmed by bots, giving us more accurate leads.

### What to Test
Nothing to test - documentation only

### Anything to Watch Out For
None - safe to merge
```

## Smart Features

- **Detects existing summaries** - Won't duplicate if already posted
- **Rate limit aware** - Adds delays between PRs to avoid API limits
- **Handles large diffs** - Truncates very large changes intelligently
- **Friendly language** - Avoids technical jargon

## Troubleshooting

### "Rate limit exceeded"
Wait 30-60 seconds and retry. Gemini has free tier limits.

### "Could not find PR"
Make sure the PR number exists and you're in the project directory.

### "Permission denied"
Make sure you have GitHub CLI (`gh`) authenticated:
```bash
gh auth login
```

## Integration with Slack

If you have Slack webhooks set up, summaries will also appear there automatically via GitHub notifications!

## Cost

Uses Gemini 2.0 Flash (free tier):
- Free: 15 requests per minute, 1,500 per day
- Cost for this script: $0 (free tier is plenty)

## Files

- `scripts/post-pr-summary.js` - Main script
- `scripts/review_current_prs.js` - Technical code review script (separate)
- `scripts/gemini-code-review.js` - Original comprehensive review script

---

**Created:** November 3, 2025
**Last Updated:** November 3, 2025
