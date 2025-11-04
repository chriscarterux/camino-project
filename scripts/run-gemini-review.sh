#!/bin/bash

#
# Gemini AI Code Review Runner
#
# This script makes it easy to run the Gemini code review
#

set -e

PROJECT_ROOT="/Users/howdycarter/Documents/projects/camino-project"
SCRIPT_PATH="$PROJECT_ROOT/scripts/gemini-code-review.js"

echo "🚀 Gemini AI Code Review Runner"
echo "================================"
echo ""

# Check if API key is set
if [ -z "$GEMINI_API_KEY" ]; then
    echo "❌ Error: GEMINI_API_KEY environment variable is not set"
    echo ""
    echo "Please set your Gemini API key:"
    echo "  export GEMINI_API_KEY=your_api_key_here"
    echo ""
    echo "Get your API key from: https://aistudio.google.com/app/apikey"
    echo ""
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    exit 1
fi

# Check if script exists
if [ ! -f "$SCRIPT_PATH" ]; then
    echo "❌ Error: Script not found at $SCRIPT_PATH"
    exit 1
fi

echo "✅ API key found"
echo "✅ Node.js found: $(node --version)"
echo "✅ Script found"
echo ""

# Run the review
echo "🎬 Starting code review..."
echo ""

cd "$PROJECT_ROOT"
node "$SCRIPT_PATH"

echo ""
echo "✅ Done! Check the generated reports:"
echo "   - GEMINI_CODE_REVIEW.md"
echo "   - GEMINI_ACTION_PLAN.md"
echo "   - GEMINI_FIX_SUMMARY.md"
