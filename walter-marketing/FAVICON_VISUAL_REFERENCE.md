# Camino Favicon Visual Reference

Visual guide showing where each favicon appears and design specifications.

---

## Design Overview

### Source Design
- **File:** camino_favicon.svg (546x548px)
- **Style:** Icon-only Camino logo
- **Motif:** Interlocking paths representing journey
- **Colors:** Gold gradient (#CF9930 → #F2C348)
- **Texture:** Fractal noise overlay for depth
- **Shape:** Nearly square, organic curves

### Color Palette

```
█ #CF9930 - Primary Gold (dark)
█ #DCB353 - Accent Gold
█ #E9C772 - Mid Gold
█ #F2C348 - Light Gold (highlight)
█ #E2C379 - Theme Color (average)
█ #2D2F33 - Background (charcoal)
```

---

## Favicon Sizes & Usage

### favicon-16x16.png
```
┌────────────────┐
│  16 x 16 px    │
│                │
│   [Camino]     │  Tiny icon
│   [Icon]       │  Gold gradient visible
│                │  Some detail preserved
└────────────────┘
```

**Where it appears:**
- Browser tab (standard resolution displays)
- Bookmarks bar
- Browser history
- Default favicon size

**Design notes:**
- Gradient still visible at this size
- Icon simplified but recognizable
- High contrast important
- Gold stands out on white/gray backgrounds

---

### favicon-32x32.png
```
┌──────────────────────────┐
│     32 x 32 px           │
│                          │
│     [Camino Icon]        │
│     More detail          │
│     Gradient clear       │
│                          │
└──────────────────────────┘
```

**Where it appears:**
- Browser tab (Retina displays)
- Bookmarks (high-DPI screens)
- Task switcher
- Better quality on modern monitors

**Design notes:**
- Full gradient visible
- Path details clear
- Texture hints visible
- Optimal for most desktop displays

---

### favicon-48x48.png
```
┌────────────────────────────────────┐
│         48 x 48 px                 │
│                                    │
│         [Camino Icon]              │
│         Full detail                │
│         Gradient & texture         │
│         All paths visible          │
│                                    │
└────────────────────────────────────┘
```

**Where it appears:**
- High-resolution displays
- Windows taskbar
- Large tab displays
- Pinned tabs (some browsers)

**Design notes:**
- All design elements visible
- Fractal texture apparent
- Full gold gradient
- Maximum tab icon quality

---

### apple-touch-icon.png (180x180)
```
┌─────────────────────────────────────────────┐
│              180 x 180 px                   │
│                                             │
│                                             │
│           [Camino Icon]                     │
│           High Quality                      │
│           Full gradient                     │
│           Texture visible                   │
│           All details                       │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

**Where it appears:**
- iOS home screen (iPhone/iPad)
- iOS bookmark icon
- Safari tab preview
- iOS app switcher
- iPad Slide Over/Split View

**Design notes:**
- iOS automatically adds rounded corners (don't pre-round)
- Use transparent background
- Full color and texture
- Optimized for Retina displays (2x/3x)
- Most visible version - make it count!

**iOS transformations:**
- Rounded corners applied automatically
- Slight shadow/gloss effect (can disable)
- Scales for different device sizes
- Preview in various contexts

---

### android-chrome-192x192.png
```
┌───────────────────────────────────────────────┐
│               192 x 192 px                    │
│                                               │
│                                               │
│            [Camino Icon]                      │
│            High Quality                       │
│            Full gradient                      │
│            All details                        │
│                                               │
│                                               │
└───────────────────────────────────────────────┘
```

**Where it appears:**
- Android home screen
- App drawer
- Android task switcher
- Add to Home Screen preview
- Shortcuts

**Design notes:**
- Adaptive icon support (maskable)
- Can be cropped to circle/rounded square
- Keep important elements centered
- Safe zone: 160px center area
- Full color and texture

---

### android-chrome-512x512.png
```
┌─────────────────────────────────────────────────────────────┐
│                      512 x 512 px                           │
│                                                             │
│                                                             │
│                                                             │
│                   [Camino Icon]                             │
│                   Maximum Quality                           │
│                   Full gradient                             │
│                   Perfect texture                           │
│                   All details crisp                         │
│                                                             │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Where it appears:**
- Android splash screen
- PWA install prompt
- Large icon displays
- Play Store (if submitted)
- High-DPI Android devices

**Design notes:**
- Highest quality version
- Used for PWA installation
- Scaled down for various uses
- Full fractal texture visible
- Maximum color depth
- Should be under 30KB for performance

---

### mstile-150x150.png
```
┌─────────────────────────────────────────┐
│            150 x 150 px                 │
│                                         │
│                                         │
│         [Camino Icon]                   │
│         High Quality                    │
│         Full gradient                   │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Where it appears:**
- Windows Start Menu tile
- Windows pinned sites
- Windows taskbar pins
- Microsoft Edge favorites

**Design notes:**
- Windows 8/10/11 tile
- Can have colored background (set in browserconfig.xml)
- Background color: #E2C379 (gold)
- Icon stands on colored background
- Should contrast with tile color

---

### safari-pinned-tab.svg
```
┌────────────────────────────────────┐
│       546 x 548 px (SVG)          │
│                                    │
│         ████████                   │
│       ████████████                 │
│      ██████  ██████                │  MONOCHROME
│     ██████    ██████               │  Solid black
│    ██████      ██████              │  No gradient
│   ██████        ██████             │  No texture
│  ██████          ██████            │  Pure paths
│ ██████            ██████           │
│                                    │
└────────────────────────────────────┘
```

**Where it appears:**
- Safari pinned tabs (macOS)
- Safari toolbar
- Safari tab overview
- Very minimal display

**Design notes:**
- **MUST be monochrome** (solid black)
- No gradients allowed
- No textures or effects
- Single color defined in HTML: `color="#CF9930"`
- Browser applies the color
- Should be recognizable as silhouette
- SVG format (scales perfectly)
- Keep file size under 5KB

---

## Platform-Specific Displays

### Desktop Browsers

**Chrome/Edge Tab:**
```
┌─────────────────────────────────┐
│ [🎨] Camino — Guided reflect... │
│  ↑ favicon-16x16.png (1x)       │
│  ↑ favicon-32x32.png (2x)       │
└─────────────────────────────────┘
```

**Firefox Tab:**
```
┌─────────────────────────────────┐
│ [🎨] Camino — Guided reflect... │
│  ↑ Uses .ico or PNGs            │
└─────────────────────────────────┘
```

**Safari Tab:**
```
┌─────────────────────────────────┐
│ [🎨] Camino — Guided reflect... │
│  ↑ favicon.ico or PNGs          │
└─────────────────────────────────┘
```

**Safari Pinned Tab:**
```
┌──────────────────────────┐
│ [◆] [■] [▲] [🎨] [●]     │
│  ↑ safari-pinned-tab.svg  │
│     with #CF9930 color    │
└──────────────────────────┘
```

---

### Mobile Displays

**iOS Home Screen:**
```
┌─────────────────────────────────────┐
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐   │
│  │[🎨]│  │ □  │  │ ○  │  │ △  │   │
│  │Cami│  │App │  │App │  │App │   │
│  └────┘  └────┘  └────┘  └────┘   │
│     ↑ apple-touch-icon.png         │
│       (180x180, rounded by iOS)    │
└─────────────────────────────────────┘
```

**Android Home Screen:**
```
┌─────────────────────────────────────┐
│  ●────●  ●────●  ●────●  ●────●   │
│  │[🎨]│  │ □  │  │ ○  │  │ △  │   │
│  │Cami│  │App │  │App │  │App │   │
│  ●────●  ●────●  ●────●  ●────●   │
│     ↑ android-chrome-192x192.png   │
│       (can be cropped to circle)   │
└─────────────────────────────────────┘
```

**iOS Bookmark:**
```
┌─────────────────────────────────┐
│ 📚 Favorites                    │
│ ┌────┐ Camino                   │
│ │[🎨]│ camino.com               │
│ └────┘                          │
│   ↑ apple-touch-icon.png        │
└─────────────────────────────────┘
```

**Android Chrome Splash:**
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│           ┌──────┐              │
│           │      │              │
│           │ [🎨] │              │
│           │      │              │
│           └──────┘              │
│                                 │
│           Camino                │
│                                 │
│   ↑ android-chrome-512x512.png  │
└─────────────────────────────────┘
```

---

### Windows Displays

**Start Menu Tile:**
```
┌─────────────────────────────────┐
│  ┌────────┬────────┬────────┐   │
│  │ [🎨]   │  □     │   ○    │   │
│  │ Camino │  App   │   App  │   │
│  ├────────┼────────┼────────┤   │
│  │  △     │  ◇     │   ☆    │   │
│  │  App   │  App   │   App  │   │
│  └────────┴────────┴────────┘   │
│     ↑ mstile-150x150.png         │
│       on #E2C379 background      │
└─────────────────────────────────┘
```

**Edge Pinned Site:**
```
┌─────────────────────────────────┐
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ [🎨] [□] [○] [△]    ☰  ⚙  ✕    │
│  ↑ mstile-150x150.png            │
└─────────────────────────────────┘
```

---

## Design Specifications

### Color Behavior

**Standard PNGs (16-512px):**
- Full RGBA color
- Gradient: #CF9930 → #F2C348
- Fractal noise texture overlay
- Transparent background
- Alpha channel preserved

**Safari SVG:**
- Pure black paths (#000)
- No gradients
- No textures
- Browser applies color from meta tag
- Result: Solid #CF9930 silhouette

### Size Optimization

| File | Target Size | Max Acceptable | Priority |
|------|-------------|----------------|----------|
| favicon-16x16.png | 1KB | 2KB | High |
| favicon-32x32.png | 1.5KB | 2KB | High |
| favicon-48x48.png | 2KB | 3KB | Medium |
| apple-touch-icon.png | 8KB | 10KB | High |
| android-chrome-192x192.png | 12KB | 15KB | High |
| android-chrome-512x512.png | 25KB | 30KB | Medium |
| mstile-150x150.png | 8KB | 10KB | Medium |
| safari-pinned-tab.svg | 2KB | 5KB | Low |
| **Total** | **~60KB** | **200KB** | Critical |

### Compression Settings

**Sharp:**
```javascript
.png({
  compressionLevel: 9,  // Max compression
  quality: 100,         // Lossless
  progressive: false,   // Faster loading
})
```

**ImageMagick:**
```bash
convert -background none \
        -resize 180x180 \
        -quality 100 \
        -define png:compression-level=9 \
        input.svg output.png
```

---

## Quality Checklist

### Visual Quality
- [ ] Gradient smooth at all sizes
- [ ] No pixelation or artifacts
- [ ] Paths clean and clear
- [ ] Colors accurate (#CF9930 → #F2C348)
- [ ] Texture visible on large sizes
- [ ] Transparent background preserved

### Technical Quality
- [ ] Correct dimensions (exactly)
- [ ] PNG color type: RGBA
- [ ] PNG bit depth: 8
- [ ] SVG monochrome (black only)
- [ ] File sizes within budget
- [ ] No corruption or errors

### Platform Testing
- [ ] Visible at 16x16px
- [ ] Clear at 32x32px
- [ ] Sharp at 48x48px
- [ ] iOS rounded corners look good
- [ ] Android circle crop acceptable
- [ ] Windows tile readable
- [ ] Safari silhouette recognizable

---

## Common Issues

### "Icon too dark at small sizes"
**Solution:** Gradient provides natural lightness variation. Lightest parts (#F2C348) remain visible even at 16x16.

### "Detail lost at 16x16"
**Expected:** At tiny sizes, only overall shape and color remain. Gold color is distinctive enough.

### "Texture not visible at small sizes"
**Expected:** Fractal noise only visible at 150px+. At small sizes, smooth gradient is better.

### "iOS icon has wrong corners"
**Not an issue:** iOS automatically applies rounded corners. Don't pre-round the PNG.

### "Android icon gets cropped"
**Solution:** Keep important elements within center 80% (safe zone). Current design works well.

### "Windows tile hard to see"
**Solution:** Tile background color (#E2C379) provides contrast. Icon is darker gold on lighter gold background.

### "Safari pinned tab too simple"
**Expected:** Safari pinned tabs are intentionally minimalist. Silhouette should be recognizable.

---

## Comparison with Competitors

### Similar Apps

**Typical favicon approach:**
- Single color icon
- Simple geometric shape
- Often just letter/initial
- Minimal detail

**Camino's approach:**
- Rich gold gradient
- Organic interlocking paths
- Subtle texture (large sizes)
- Distinctive brand element
- Works across all sizes

**Advantages:**
- More visually interesting
- Better brand recognition
- Premium feel (gold)
- Unique shape

---

## Future Considerations

### Potential Updates

1. **Animated favicon** (for notifications)
   - Subtle pulse effect
   - Gold glow
   - Progress indicator

2. **Dark mode variant**
   - Lighter gold for dark backgrounds
   - Better contrast
   - Platform detection

3. **Seasonal variants**
   - Holiday themes
   - Special events
   - Limited time designs

4. **Badge overlays**
   - Notification count
   - Status indicator
   - Progress ring

### Platform Evolution

Monitor for:
- New icon sizes required
- Platform-specific formats
- Emerging standards
- PWA requirements
- AR/VR display needs

---

## Resources

### Testing Tools
- [Favicon Checker](https://seositecheckup.com/tools/favicon-checker)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Maskable.app](https://maskable.app/) - Test Android adaptive icons

### Design Tools
- Figma - Icon design
- Sketch - Export at multiple sizes
- Photoshop - Raster editing
- Illustrator - Vector work

### Reference Devices
- iPhone 14 Pro (iOS 16+)
- Samsung Galaxy S23 (Android 13+)
- Windows 11 PC
- macOS Sonoma (Safari 17+)

---

**Last Updated:** 2025-11-03
