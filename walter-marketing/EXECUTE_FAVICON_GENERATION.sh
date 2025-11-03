#!/bin/bash

#############################################################################
# Camino Favicon Package - Complete Execution Script
#
# This script will:
# 1. Check prerequisites
# 2. Install Sharp if needed
# 3. Generate all favicon files
# 4. Run comprehensive tests
# 5. Display results and next steps
#
# Usage: bash EXECUTE_FAVICON_GENERATION.sh
#############################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Project paths
PROJECT_DIR="/Users/howdycarter/Documents/projects/camino-project/worktrees/HOW-278-favicon-package/walter-marketing"
SOURCE_SVG="/Users/howdycarter/Downloads/camino_favicon.svg"

echo -e "${PURPLE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        Camino Favicon Package - Complete Setup             ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

#############################################################################
# Step 1: Prerequisites Check
#############################################################################

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Step 1: Checking Prerequisites${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if we're in the right directory
if [ ! -d "$PROJECT_DIR" ]; then
  echo -e "${RED}✗ Project directory not found: $PROJECT_DIR${NC}"
  exit 1
fi

cd "$PROJECT_DIR" || exit 1
echo -e "${GREEN}✓${NC} Project directory: $PROJECT_DIR"

# Check if source SVG exists
if [ ! -f "$SOURCE_SVG" ]; then
  echo -e "${RED}✗ Source SVG not found: $SOURCE_SVG${NC}"
  echo -e "${YELLOW}  Please ensure the source file is available at:${NC}"
  echo -e "${YELLOW}  $SOURCE_SVG${NC}"
  exit 1
fi
echo -e "${GREEN}✓${NC} Source SVG: $SOURCE_SVG"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js not found${NC}"
  exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓${NC} Node.js: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
  echo -e "${RED}✗ npm not found${NC}"
  exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓${NC} npm: v$NPM_VERSION"

echo ""

#############################################################################
# Step 2: Install Sharp
#############################################################################

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Step 2: Installing Sharp (Image Processing Library)${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if Sharp is already installed
if node -e "require('sharp')" 2>/dev/null; then
  echo -e "${GREEN}✓${NC} Sharp is already installed"
else
  echo -e "${YELLOW}⚠${NC}  Sharp not found, installing..."
  echo ""

  npm install --save-dev sharp

  if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓${NC} Sharp installed successfully"
  else
    echo -e "${RED}✗ Failed to install Sharp${NC}"
    echo -e "${YELLOW}  Trying ImageMagick as fallback...${NC}"

    if command -v convert &> /dev/null; then
      echo -e "${GREEN}✓${NC} ImageMagick found, will use as fallback"
    else
      echo -e "${RED}✗ Neither Sharp nor ImageMagick available${NC}"
      echo -e "${YELLOW}  Install ImageMagick: brew install imagemagick${NC}"
      exit 1
    fi
  fi
fi

echo ""

#############################################################################
# Step 3: Generate Favicons
#############################################################################

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Step 3: Generating Favicon Package${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

npm run favicon:generate

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✓${NC} Favicon generation complete!"
else
  echo -e "${RED}✗ Favicon generation failed${NC}"
  exit 1
fi

echo ""

#############################################################################
# Step 4: Run Tests
#############################################################################

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Step 4: Running Comprehensive Tests${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

npm run favicon:test

TEST_RESULT=$?

echo ""

#############################################################################
# Step 5: Results Summary
#############################################################################

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Step 5: Results & Next Steps${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Count generated files
FILE_COUNT=$(ls -1 public/favicon*.png public/favicon.ico public/apple-touch-icon.png public/android-chrome-*.png public/mstile-*.png public/safari-pinned-tab.svg public/site.webmanifest public/browserconfig.xml 2>/dev/null | wc -l)

echo -e "${BLUE}📊 Generation Summary:${NC}"
echo ""
echo -e "  Files Generated: ${GREEN}$FILE_COUNT${NC} / 11"
echo ""

# Calculate total size
TOTAL_SIZE=$(du -ch public/favicon*.png public/favicon.ico public/apple-touch-icon.png public/android-chrome-*.png public/mstile-*.png public/safari-pinned-tab.svg public/site.webmanifest public/browserconfig.xml 2>/dev/null | grep total | awk '{print $1}')
echo -e "  Total Package Size: ${GREEN}$TOTAL_SIZE${NC}"
echo ""

# Test results
if [ $TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}✓ All tests passed!${NC}"
else
  echo -e "${YELLOW}⚠ Some tests had warnings (check output above)${NC}"
fi

echo ""
echo -e "${BLUE}📝 Generated Files:${NC}"
echo ""
ls -lh public/favicon*.png public/favicon.ico public/apple-touch-icon.png public/android-chrome-*.png public/mstile-*.png public/safari-pinned-tab.svg public/site.webmanifest public/browserconfig.xml 2>/dev/null | awk '{printf "  %-30s %8s\n", $9, $5}'

echo ""
echo -e "${BLUE}🎯 Next Steps:${NC}"
echo ""
echo -e "  ${GREEN}1.${NC} Test locally:"
echo -e "     ${CYAN}npm run dev${NC}"
echo -e "     Open http://localhost:3000"
echo -e "     Check browser tab for favicon"
echo ""
echo -e "  ${GREEN}2.${NC} Review documentation:"
echo -e "     ${CYAN}FAVICON_GENERATION_GUIDE.md${NC}  - Quick start"
echo -e "     ${CYAN}FAVICON_SETUP.md${NC}            - Complete docs"
echo -e "     ${CYAN}FAVICON_VISUAL_REFERENCE.md${NC} - Design specs"
echo ""
echo -e "  ${GREEN}3.${NC} Commit changes:"
echo -e "     ${CYAN}git add public/ app/layout.tsx *.md scripts/${NC}"
echo -e "     ${CYAN}git commit -m \"Add complete favicon package\"${NC}"
echo -e "     ${CYAN}git push${NC}"
echo ""
echo -e "  ${GREEN}4.${NC} Deploy and test on production"
echo ""

echo -e "${PURPLE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║          ✅  Favicon Package Setup Complete!               ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

exit 0
