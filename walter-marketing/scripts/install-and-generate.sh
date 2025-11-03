#!/bin/bash

# Install Sharp for favicon generation
echo "📦 Installing Sharp..."
cd /Users/howdycarter/Documents/projects/camino-project/worktrees/HOW-278-favicon-package/walter-marketing

# Install sharp as dev dependency
npm install --save-dev sharp

# Generate favicons
echo ""
echo "🎨 Generating favicons..."
node scripts/generate-favicons.js

echo ""
echo "✅ Complete!"
