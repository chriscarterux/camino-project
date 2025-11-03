# Camino Logo Usage Guidelines

## Logo Files

The Camino logo is available in multiple formats for different use cases:

### SVG Files (Vector)
- `/public/camino-logo.svg` - Main horizontal logo (optimized, 6.2KB)
- `/public/camino-logo-full.svg` - Full version with complete metadata
- `/public/camino-logo-dark.svg` - Version optimized for dark backgrounds
- `/public/camino-icon.svg` - Icon-only version (path symbol)

### Dimensions
- **Full Logo**: 3230x548px (aspect ratio ~5.9:1)
- **Icon Only**: 548x548px (square format)

## Color Palette

### Primary Gold Gradient
The logo features a sophisticated gold gradient that represents the journey and transformation:

- **Dark Gold**: `#CF9930` - Represents depth and grounding
- **Medium Gold**: `#DCB353` - Transitional shade
- **Light Gold**: `#E9C772` - Represents growth and illumination
- **Bright Gold**: `#F2C348` - The peak of transformation

### Dark Background Variant
For dark backgrounds, use the enhanced colors with better contrast:
- **Enhanced Gold**: `#F2D580` to `#FFE09E`
- Ensures WCAG AAA contrast compliance

## Minimum Sizes

### Digital Applications
- **Website Header**: Minimum 120px width
- **Mobile Navigation**: Minimum 100px width
- **Favicon/App Icon**: Use icon-only version, minimum 32x32px
- **Social Media Profile**: Icon-only, 400x400px minimum

### Print Applications
- **Business Cards**: Minimum 1 inch width
- **Letterhead**: Minimum 1.5 inches width
- **Large Format**: Scale proportionally

## Clear Space

Maintain clear space around the logo equal to the height of the "i" in "Camino":
- Minimum clear space: 0.1x the logo height on all sides
- For icon-only: 0.15x the icon height on all sides

## Usage Guidelines

### DO:
- Use the provided SVG files for web applications
- Maintain the original aspect ratio
- Use the dark variant on dark backgrounds (#2D2F33 or darker)
- Use the icon-only version for square formats (social media, app icons)
- Ensure sufficient contrast with background (minimum 4.5:1 ratio)

### DON'T:
- Rotate or distort the logo
- Change the colors or gradient
- Add effects like shadows, outlines, or glows
- Place on busy or distracting backgrounds
- Use low-resolution versions
- Recreate or modify the logo

## Accessibility

All logo files include:
- Semantic `<title>` elements for screen readers
- ARIA labels for context
- Proper alt text recommendations: "Camino - 12-week integrated transformation journey" or simply "Camino"

### Color Contrast
- Light background: WCAG AA compliant (4.5:1)
- Dark background variant: WCAG AAA compliant (7:1)

## File Optimization

All SVG files are optimized:
- Removed fractal noise filter for performance
- Proper viewBox for responsive scaling
- Minified paths and attributes
- Target file size: <10KB per file
- No external dependencies

## Implementation

### React/Next.js
```tsx
import Image from 'next/image'

<Image
  src="/camino-logo.svg"
  alt="Camino - 12-week integrated transformation journey"
  width={200}
  height={34}
  priority
/>
```

### HTML
```html
<img
  src="/camino-logo.svg"
  alt="Camino - 12-week integrated transformation journey"
  width="200"
  height="34"
/>
```

### Icon Only
```tsx
<Image
  src="/camino-icon.svg"
  alt="Camino"
  width={48}
  height={48}
/>
```

## Brand Voice

The logo represents:
- **The Path Symbol**: The interlocking paths represent the journey of transformation
- **Gold Gradient**: Symbolizes progression from depth to illumination
- **Serif Typography**: Conveys wisdom, trust, and timelessness
- **Balance**: The design balances structure (paths) with flow (typography)

## Questions?

For logo usage questions or custom formats, contact the design team.

---

**Last Updated**: November 2025
**Version**: 1.0.0
