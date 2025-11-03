# Camino Favicon Setup

Complete favicon package for Camino web application, optimized for all modern browsers, devices, and platforms.

## Overview

This favicon package provides comprehensive icon support across:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS, Android)
- Windows tiles and pinned sites
- Progressive Web App (PWA) installation
- Safari pinned tabs

**Total Package Size:** <200KB (target)
**Cache Duration:** 1 year (immutable)
**Generated:** 2025-11-03

---

## Files Generated

### Standard Favicons

| File | Dimensions | Purpose |
|------|-----------|---------|
| `favicon.ico` | 16x16, 32x32, 48x48 | Multi-resolution icon for legacy browsers |
| `favicon-16x16.png` | 16x16 | Standard favicon (modern browsers) |
| `favicon-32x32.png` | 32x32 | Standard favicon (high-DPI displays) |
| `favicon-48x48.png` | 48x48 | Standard favicon (larger displays) |

### Apple iOS

| File | Dimensions | Purpose |
|------|-----------|---------|
| `apple-touch-icon.png` | 180x180 | iOS home screen, bookmarks, Safari tabs |

### Android Chrome

| File | Dimensions | Purpose |
|------|-----------|---------|
| `android-chrome-192x192.png` | 192x192 | Android home screen icon |
| `android-chrome-512x512.png` | 512x512 | Android splash screen, high-res displays |

### Windows

| File | Dimensions | Purpose |
|------|-----------|---------|
| `mstile-150x150.png` | 150x150 | Windows Start Menu tile |

### Safari

| File | Dimensions | Purpose |
|------|-----------|---------|
| `safari-pinned-tab.svg` | 546x548 | Safari pinned tab (monochrome) |

### Configuration Files

| File | Purpose |
|------|---------|
| `site.webmanifest` | PWA manifest for Android/Chrome installation |
| `browserconfig.xml` | Windows tile configuration |

---

## Brand Colors

### Primary Palette
- **Primary Gold:** `#CF9930` - Main brand color, Safari mask icon
- **Light Gold:** `#F2C348` - Gradient highlight
- **Mid Gold:** `#E9C772` - Gradient middle
- **Accent Gold:** `#DCB353` - Gradient accent

### Theme Colors
- **Theme Color:** `#E2C379` - Average gold for meta tags, Windows tiles
- **Background:** `#2D2F33` - Dark charcoal for PWA background

### Color Application
- **Gradients:** Original SVG uses gold gradient (#CF9930 → #F2C348)
- **Monochrome:** Safari pinned tab uses solid black (#000)
- **Texture:** Fractal noise overlay (removed for small sizes)

---

## Implementation

### Next.js Metadata (app/layout.tsx)

The favicon package is integrated via Next.js App Router metadata API:

```tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#CF9930' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#E2C379',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Camino',
  },
};
```

### Manual HTML (if needed)

```html
<!-- Standard favicons -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="shortcut icon" href="/favicon.ico">

<!-- Apple touch icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Safari pinned tab -->
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#CF9930">

<!-- Web app manifest -->
<link rel="manifest" href="/site.webmanifest">

<!-- Theme colors -->
<meta name="theme-color" content="#E2C379">
<meta name="msapplication-TileColor" content="#E2C379">
<meta name="msapplication-config" content="/browserconfig.xml">

<!-- Apple web app -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Camino">
```

---

## File Contents

### site.webmanifest

```json
{
  "name": "Camino",
  "short_name": "Camino",
  "description": "12-week integrated transformation journey",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#E2C379",
  "background_color": "#2D2F33",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### browserconfig.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#E2C379</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

---

## Generation

### Prerequisites

**Option 1: Sharp (Recommended)**
```bash
npm install --save-dev sharp
```

**Option 2: ImageMagick**
```bash
brew install imagemagick
```

### Running the Generator

```bash
# Using the generation script
node scripts/generate-favicons-simple.js

# Or using the full-featured script (requires Sharp)
node scripts/generate-favicons.js
```

### Source File

- **Location:** `/Users/howdycarter/Downloads/camino_favicon.svg`
- **Dimensions:** 546x548px (nearly square)
- **Design:** Icon-only version of Camino logo
- **Features:** Interlocking path motif with gold gradient and fractal noise

### Manual Generation

If you prefer to generate favicons manually:

1. Open `camino_favicon.svg` in your preferred tool (Figma, Sketch, Photoshop)
2. Export PNG files at required dimensions (transparent background)
3. For Safari pinned tab: Convert gradient to solid black
4. Use ImageMagick to create ICO: `convert favicon-{16,32,48}x{16,32,48}.png favicon.ico`

---

## Testing

### Browser Testing

| Browser | Test | Status |
|---------|------|--------|
| Chrome Desktop | Favicon displays in tab | ☐ |
| Chrome Desktop | Bookmark icon correct | ☐ |
| Firefox Desktop | Favicon displays in tab | ☐ |
| Firefox Desktop | Bookmark icon correct | ☐ |
| Safari Desktop | Favicon displays in tab | ☐ |
| Safari Desktop | Pinned tab shows monochrome | ☐ |
| Edge Desktop | Favicon displays in tab | ☐ |
| Edge Desktop | Pinned site tile correct | ☐ |

### Mobile Testing

| Platform | Test | Status |
|----------|------|--------|
| iOS Safari | Bookmark icon (180x180) | ☐ |
| iOS Safari | Home screen icon rounded corners | ☐ |
| iOS Safari | Status bar color correct | ☐ |
| Android Chrome | Home screen icon (192x192) | ☐ |
| Android Chrome | Splash screen (512x512) | ☐ |
| Android Chrome | Theme color in address bar | ☐ |

### Windows Testing

| Test | Status |
|------|--------|
| Edge pinned tile displays | ☐ |
| Tile color matches brand | ☐ |
| Tile icon scales properly | ☐ |

### Performance Testing

| Metric | Target | Status |
|--------|--------|--------|
| Total package size | <200KB | ☐ |
| All files load without 404 | 100% | ☐ |
| Cache headers set correctly | 1 year | ☐ |
| No render blocking | Yes | ☐ |

### Accessibility Testing

| Test | Status |
|------|--------|
| Icons visible at 16x16 | ☐ |
| Sufficient contrast at small sizes | ☐ |
| Safari pinned tab readable | ☐ |
| No visual glitches on any platform | ☐ |

### PWA Testing

| Test | Status |
|------|--------|
| Manifest valid JSON | ☐ |
| Icons referenced correctly | ☐ |
| Install prompt shows correct icon | ☐ |
| Installed app uses correct icon | ☐ |

---

## Testing Commands

```bash
# Validate manifest JSON
cat public/site.webmanifest | jq

# Validate browserconfig XML
xmllint public/browserconfig.xml

# Check file sizes
du -h public/favicon*.png public/apple-touch-icon.png public/android-chrome-*.png

# Test locally
npm run dev
# Visit http://localhost:3000 and check browser tab

# Test on mobile (requires ngrok or similar)
ngrok http 3000
# Visit ngrok URL on mobile device
```

---

## Optimization

All PNG files are optimized with:
- **Compression Level:** 9 (maximum)
- **Quality:** 100 (lossless)
- **Color Space:** sRGB
- **Alpha Channel:** Transparent background
- **Interlacing:** None (faster loading)

Safari SVG optimizations:
- **Gradient Removed:** Solid black fill
- **Texture Removed:** No filter effects
- **Paths Simplified:** Original geometry preserved
- **ViewBox Preserved:** 0 0 546 548

---

## Browser Support

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | 4+ | Full |
| Firefox | 3.5+ | Full |
| Safari | 3.1+ | Full |
| Edge | All | Full |
| iOS Safari | 1.1+ | Full |
| Android Chrome | All | Full |
| IE 11 | 11 | Legacy (deprecated) |

---

## Troubleshooting

### Favicons not showing

1. **Hard refresh:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Clear browser cache:** Favicons are aggressively cached
3. **Check DevTools Network:** Look for 404 errors
4. **Verify file paths:** All paths should be absolute from root: `/favicon.ico`

### iOS icon not updating

1. Delete bookmark and re-add
2. Clear Safari cache completely
3. Check file is exactly 180x180px
4. Ensure transparent background (iOS adds rounded corners)

### Windows tile wrong color

1. Verify `browserconfig.xml` exists in `/public`
2. Check `TileColor` hex value: `#E2C379`
3. Clear Edge browsing data
4. Re-pin site to Start Menu

### Manifest not loading

1. Validate JSON syntax: `cat public/site.webmanifest | jq`
2. Check MIME type served: `application/manifest+json`
3. Verify icon paths are correct
4. Test PWA install flow

### Safari pinned tab not showing

1. Ensure SVG is pure black (`fill="#000"`)
2. Remove gradients and filters
3. Check SVG has proper viewBox
4. Verify `mask-icon` meta tag has correct color

---

## Performance Optimization

### Caching Strategy

Next.js automatically serves static assets with optimal headers:

```
Cache-Control: public, max-age=31536000, immutable
```

This means:
- **1 year cache duration**
- **No revalidation needed** (immutable)
- **Publicly cacheable** (CDN-friendly)

### Size Budget

| Category | Budget | Actual |
|----------|--------|--------|
| ICO file | 15KB | TBD |
| Small PNGs (16-48px) | 2KB each | TBD |
| Medium PNG (150-180px) | 5KB each | TBD |
| Large PNGs (192-512px) | 20KB each | TBD |
| Safari SVG | 2KB | ~2KB |
| Manifest + Config | 1KB | <500B |
| **Total** | **200KB** | **TBD** |

### Loading Strategy

Favicons are loaded:
- **Async:** Don't block page rendering
- **High Priority:** Browser loads before other assets
- **Early Discovery:** In `<head>` for parser discovery

---

## Maintenance

### When to regenerate

- Logo design changes
- Brand color updates
- New platform requirements
- Optimization improvements

### Regeneration process

1. Update source SVG
2. Run generation script
3. Test across all platforms
4. Update this documentation
5. Commit and deploy

### Version tracking

Current version: **1.0.0** (Initial release)

---

## Security

### SVG Safety

Safari pinned tab SVG:
- **No scripts:** Pure path data only
- **No external resources:** Self-contained
- **No event handlers:** Static SVG
- **Sanitized:** No potentially harmful content

### CORS Headers

For CDN deployment, ensure CORS headers allow favicon access:

```
Access-Control-Allow-Origin: *
```

### Content Security Policy

If using CSP, allow favicon resources:

```
Content-Security-Policy: img-src 'self' data:
```

---

## Resources

### Design Source
- Camino logo icon variant (gold gradient version)
- Original dimensions: 546x548px
- Fractal noise texture overlay

### Tools Used
- **Sharp:** PNG generation and optimization
- **ImageMagick:** ICO file creation
- **SVGO:** SVG optimization (if needed)

### References
- [Web App Manifest Spec](https://www.w3.org/TR/appmanifest/)
- [Apple Touch Icon Guidelines](https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons/)
- [Favicon Cheat Sheet](https://github.com/audreyfeldroy/favicon-cheat-sheet)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

---

## License

All favicon files are proprietary to Camino. Unauthorized use is prohibited.

**Copyright © 2025 Camino. All rights reserved.**

---

## Changelog

### 1.0.0 - 2025-11-03
- Initial favicon package created
- All standard sizes generated
- iOS, Android, Windows support
- Safari pinned tab monochrome variant
- PWA manifest and browserconfig
- Complete testing checklist
- Comprehensive documentation

---

## Contact

For questions or issues with the favicon package, contact the development team.

**Last Updated:** 2025-11-03
