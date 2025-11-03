# Camino Scripts

Development and build scripts for the Camino project.

## Favicon Generation

### generate-favicons-simple.js

Quick favicon generation script that works with or without Sharp.

**Usage:**
```bash
node scripts/generate-favicons-simple.js
```

**Features:**
- Generates all favicon sizes (16x16 to 512x512)
- Creates Safari pinned tab (monochrome SVG)
- Generates site.webmanifest and browserconfig.xml
- Auto-detects Sharp or ImageMagick
- Falls back to manual instructions if neither available

**Requirements:**
- Node.js 16+
- Either Sharp OR ImageMagick

**Install Sharp:**
```bash
npm install --save-dev sharp
```

**Install ImageMagick:**
```bash
brew install imagemagick
```

---

### generate-favicons.js

Full-featured favicon generation with documentation and size analysis.

**Usage:**
```bash
node scripts/generate-favicons.js
```

**Features:**
- All features from simple script
- Generates FAVICON_SETUP.md documentation
- Calculates total package size
- Provides optimization recommendations
- Validates against 200KB budget

**Requirements:**
- Same as simple script

---

### test-favicons.js

Comprehensive test suite for favicon package.

**Usage:**
```bash
node scripts/test-favicons.js
```

**Tests:**
1. File existence and sizes
2. Total package size (<200KB)
3. JSON validity (site.webmanifest)
4. XML validity (browserconfig.xml)
5. SVG security and monochrome check
6. Next.js layout.tsx integration
7. PNG dimensions (requires Sharp)

**Exit Codes:**
- `0` - All tests passed
- `1` - Tests failed (blocking issues)

**Requirements:**
- Node.js 16+
- Optional: Sharp (for dimension checks)

---

## Quick Start

### First Time Setup

1. **Install dependencies:**
   ```bash
   npm install --save-dev sharp
   ```

2. **Generate favicons:**
   ```bash
   node scripts/generate-favicons-simple.js
   ```

3. **Test the package:**
   ```bash
   node scripts/test-favicons.js
   ```

4. **Commit the results:**
   ```bash
   git add public/favicon* public/apple-touch-icon.png public/android-chrome-* public/mstile-* public/safari-pinned-tab.svg public/site.webmanifest public/browserconfig.xml
   git commit -m "Add complete favicon package"
   ```

---

## Troubleshooting

### "Source file not found"

Make sure the source SVG is at:
```
/Users/howdycarter/Downloads/camino_favicon.svg
```

Or update the `SOURCE_SVG` constant in the scripts.

### "Sharp not available"

Install Sharp:
```bash
npm install --save-dev sharp
```

Or install ImageMagick:
```bash
brew install imagemagick
```

### "Tests failing"

Run the test script to see specific issues:
```bash
node scripts/test-favicons.js
```

Common issues:
- Missing files (re-run generator)
- Invalid JSON/XML (check syntax)
- Wrong dimensions (regenerate with correct source)
- Package too large (optimize PNGs)

---

## Maintenance

### Regenerating Favicons

When the logo changes:

1. Update source SVG
2. Run generation script
3. Run tests
4. Commit changes

### Updating Colors

Update these constants in the scripts:
- `PRIMARY_GOLD`: #CF9930
- `THEME_COLOR`: #E2C379
- `BACKGROUND`: #2D2F33

---

## File Locations

**Source:**
- `/Users/howdycarter/Downloads/camino_favicon.svg`

**Output:**
- `/public/favicon*`
- `/public/apple-touch-icon.png`
- `/public/android-chrome-*`
- `/public/mstile-*`
- `/public/safari-pinned-tab.svg`
- `/public/site.webmanifest`
- `/public/browserconfig.xml`

**Documentation:**
- `/FAVICON_SETUP.md`

**Integration:**
- `/app/layout.tsx`

---

## Next Steps

After generating favicons:

1. Test locally: `npm run dev`
2. Check browser tab for favicon
3. Test on mobile devices
4. Deploy and verify in production
5. Update FAVICON_SETUP.md with test results

---

## Support

For questions or issues, see:
- `FAVICON_SETUP.md` - Complete documentation
- Test output for specific errors
- Next.js metadata API docs

---

**Last Updated:** 2025-11-03
