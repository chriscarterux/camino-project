#!/bin/bash
# Extract course ZIPs and prepare for Frappe LMS import
# Usage: ./scripts/extract-and-import.sh

set -e

COURSE_ZIPS_DIR="/Users/chriscarter/Documents/GitHub/walter-project/CORPORATE TRNG ZIPS"
EXTRACT_DIR="/Users/chriscarter/Documents/GitHub/walter-project/course-content-extracted"

echo "🚀 Camino Course Extraction Tool"
echo "================================"
echo ""

# Create extraction directory
mkdir -p "$EXTRACT_DIR"

# Count total ZIPs
total_zips=$(find "$COURSE_ZIPS_DIR" -name "*.zip" -type f | wc -l | tr -d ' ')
echo "Found $total_zips course ZIPs"
echo ""

# Extract each ZIP
counter=0
find "$COURSE_ZIPS_DIR" -name "*.zip" -type f | while read zipfile; do
  counter=$((counter + 1))
  filename=$(basename "$zipfile" .zip)

  # Clean up filename (remove number suffixes)
  clean_name=$(echo "$filename" | sed 's/[0-9a-f]*e*$//' | sed 's/_$//')

  echo "[$counter/$total_zips] Extracting: $clean_name"

  # Create course folder
  course_folder="$EXTRACT_DIR/$clean_name"
  mkdir -p "$course_folder"

  # Extract ZIP
  unzip -q "$zipfile" -d "$course_folder" 2>/dev/null || echo "  ⚠️  Extraction warning (may be partial)"

  echo "  ✓ Extracted to: $course_folder"
done

echo ""
echo "✅ Extraction complete!"
echo ""
echo "Courses extracted to: $EXTRACT_DIR"
echo ""
echo "📝 Next steps:"
echo "1. Review extracted folders"
echo "2. Upload courses to Frappe LMS: http://lms.localhost:8000"
echo "3. For each course:"
echo "   - Create course in Frappe"
echo "   - Copy content from Training Manual.docx"
echo "   - Upload PowerPoint and resources"
echo "   - Enable certification"
echo ""
echo "💡 Tip: Start with 5 courses to test the workflow!"
