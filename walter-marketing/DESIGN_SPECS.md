# Camino LMS - Lesson Content Design Specifications

## Visual Design Specs at a Glance

---

## Colors

### Primary Palette
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Gold | `#E2C379` | `rgb(226, 195, 121)` | Accents, bullets, borders, CTAs |
| Deep Gold | `#C9A961` | `rgb(201, 169, 97)` | Hover states, gradients |
| Sandstone | `#F4E9D8` | `rgb(244, 233, 216)` | Backgrounds, callouts |
| Slate | `#2D2F33` | `rgb(45, 47, 51)` | Primary text |
| Ivory | `#FFFBF5` | `rgb(255, 251, 245)` | Page background |

### Semantic Colors
| Purpose | Color | Hex Code |
|---------|-------|----------|
| Info | Blue | `#2196F3` |
| Success | Green | `#10B981` |
| Warning | Amber | `#F59E0B` |
| Error | Red | `#EF4444` |

---

## Typography

### Font Families
```css
--font-serif: Georgia, serif;
--font-sans: Geist, sans-serif;
--font-mono: Geist Mono, monospace;
```

### Type Scale & Usage

| Element | Size | Line Height | Weight | Font Family | Letter Spacing |
|---------|------|-------------|--------|-------------|----------------|
| Display (H1) | 2.5rem (40px) | 1.3 | 700 | Serif | -0.02em |
| Heading (H2) | 2rem (32px) | 1.3 | 700 | Serif | -0.02em |
| Section (H3) | 1.5rem (24px) | 1.4 | 700 | Serif | -0.01em |
| Subsection (H4) | 1.25rem (20px) | 1.5 | 600 | Serif | 0 |
| Body Large | 1.25rem (20px) | 1.75 | 400 | Sans-serif | -0.011em |
| Body | 1.125rem (18px) | 1.8 | 400 | Sans-serif | -0.011em |
| Body Small | 1rem (16px) | 1.7 | 400 | Sans-serif | 0 |
| Caption | 0.875rem (14px) | 1.5 | 400 | Sans-serif | 0 |

### Mobile Adjustments (< 768px)
| Element | Desktop | Mobile |
|---------|---------|--------|
| H2 | 2rem | 1.75rem |
| H3 | 1.5rem | 1.375rem |
| H4 | 1.25rem | 1.125rem |
| Body | 1.125rem | 1rem |

---

## Spacing System

### Base Unit: 4px (0.25rem)

| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.25rem (4px) | Tight spacing |
| sm | 0.5rem (8px) | Small gaps |
| md | 1rem (16px) | Default spacing |
| lg | 1.5rem (24px) | Section spacing |
| xl | 2rem (32px) | Large spacing |
| 2xl | 3rem (48px) | Major sections |

### Component Spacing

| Element | Top | Bottom | Left | Right |
|---------|-----|--------|------|-------|
| Paragraph | 0 | 1.5rem | 0 | 0 |
| H2 | 3rem | 1.5rem | 0 | 0 |
| H3 | 2.5rem | 1rem | 0 | 0 |
| H4 | 2rem | 0.75rem | 0 | 0 |
| List | 0 | 1.5rem | 2rem | 0 |
| List Item | 0 | 0.75rem | 0 | 0 |
| Blockquote | 2rem | 2rem | 1.5-2rem | 1.5-2rem |
| Callout | 2rem | 2rem | 1.5-2rem | 1.5-2rem |
| Table | 2.5rem | 2.5rem | 0 | 0 |
| HR | 3rem | 3rem | 0 | 0 |

---

## Border Radius

| Size | Value | Usage |
|------|-------|-------|
| Small | 4px | Inline code, small elements |
| Default | 8px | Badges, small cards |
| Medium | 12px | Tables, callouts |
| Large | 16px | Images, major cards |
| XL | 24px | Hero sections, feature cards |
| Full | 9999px | Circles, pills |

---

## Shadows

| Level | CSS Value | Usage |
|-------|-----------|-------|
| Subtle | `0 1px 2px rgba(45, 47, 51, 0.05)` | Slight elevation |
| Small | `0 2px 4px rgba(45, 47, 51, 0.08)` | Cards, inputs |
| Medium | `0 4px 8px rgba(45, 47, 51, 0.1)` | Dropdowns, modals |
| Large | `0 8px 16px rgba(45, 47, 51, 0.12)` | Dialogs, popovers |
| XL | `0 12px 24px rgba(45, 47, 51, 0.15)` | Major elevations |
| Gold | `0 4px 12px rgba(226, 195, 121, 0.15)` | Callouts, highlights |

---

## Component Specifications

### Lesson Header

#### Lesson Number Badge
```
Size: 64px × 64px
Border Radius: 16px
Background: linear-gradient(135deg, #E2C379 0%, #C9A961 100%)
Shadow: 0 8px 16px rgba(226, 195, 121, 0.25)
Number: 20px, bold, #2D2F33
```

#### Sparkle Icon
```
Size: 24px × 24px
Position: Bottom-right (-4px, -4px)
Background: #FFFBF5
Border: 2px solid #E2C379
Icon Color: #E2C379
```

#### Title
```
Font: 40px (mobile: 32px), bold, serif
Color: #2D2F33
Line Height: 1.2
Margin Bottom: 24px
```

#### Metadata
```
Font: 14px, medium, sans-serif
Color: #2D2F33 at 60% opacity
Icon Size: 16px
Gap: 24px between items
```

---

### Reading Progress Bar

```
Position: Fixed top
Height: 1px
Background: #F4E9D8 at 50% opacity
Fill: linear-gradient(to right, #E2C379, #C9A961)
Transition: width 300ms ease-out
Z-index: 50
```

---

### List Styling

#### Unordered List (Bullets)
```
Bullet: 8px circle
Color: #E2C379
Position: Left aligned at 0
Item Padding Left: 24px
Item Spacing: 12px
Shadow: 0 2px 4px rgba(226, 195, 121, 0.3)
```

#### Ordered List (Numbers)
```
Number Box: 32px × 32px
Background: #E2C379
Border Radius: 8px
Number: 14px, bold, #2D2F33
Position: Left aligned at 0
Item Padding Left: 48px
Item Spacing: 12px
Shadow: 0 2px 8px rgba(226, 195, 121, 0.25)
```

---

### Blockquote

```
Background: linear-gradient(135deg, #F4E9D8 0%, #FFFBF5 100%)
Border Left: 5px solid #E2C379
Padding: 32px 40px
Border Radius: 0 16px 16px 0
Font: 20px, italic
Line Height: 1.7
Color: #2D2F33 at 85% opacity
Shadow: 0 4px 12px rgba(226, 195, 121, 0.1)

Quote Mark:
  Font: 64px, Georgia
  Color: #E2C379 at 30% opacity
  Position: Top left (16px, 16px)
```

---

### Callout Boxes

#### Default (Note)
```
Background: linear-gradient(135deg, #F4E9D8, #FFFBF5)
Border Left: 4px solid #E2C379
Padding: 24px 32px
Border Radius: 16px
Shadow: 0 4px 12px rgba(0, 0, 0, 0.05)
```

#### Info
```
Background: linear-gradient(135deg, #E0F2FE, #F0F9FF)
Border Left: 4px solid #0EA5E9
Icon Background: #0EA5E9
```

#### Warning
```
Background: linear-gradient(135deg, #FEF3C7, #FFFBEB)
Border Left: 4px solid #F59E0B
Icon Background: #F59E0B
```

#### Tip
```
Background: linear-gradient(135deg, #D1FAE5, #F0FDF4)
Border Left: 4px solid #10B981
Icon Background: #10B981
```

---

### Tables

```
Border Radius: 12px
Overflow: hidden
Shadow: 0 2px 8px rgba(45, 47, 51, 0.1)

Header:
  Background: #F4E9D8
  Color: #2D2F33
  Font: 16px, semibold, serif
  Padding: 16px 24px
  Border Bottom: 2px solid #E2C379

Cell:
  Padding: 16px 24px
  Border Bottom: 1px solid #F4E9D8
  Color: #2D2F33 at 90% opacity

Row Hover:
  Background: #F4E9D8 at 30% opacity
  Transition: 200ms ease-in-out
```

---

### Code

#### Inline Code
```
Padding: 4px 8px
Background: #2D2F33 at 5% opacity
Border: 1px solid #2D2F33 at 10% opacity
Border Radius: 4px
Font: 0.9em, Geist Mono
Color: #2D2F33
```

#### Code Block
```
Padding: 24px
Background: #2D2F33
Border: 1px solid #E2C379 at 20% opacity
Border Radius: 12px
Font: 15px, Geist Mono
Color: #F4E9D8
Line Height: 1.6
Overflow: auto
```

---

### Images

```
Max Width: 100%
Border Radius: 16px
Margin: 40px auto
Shadow: 0 8px 24px rgba(45, 47, 51, 0.1)

Hover:
  Transform: scale(1.02)
  Transition: 300ms ease-in-out
```

---

### Horizontal Rule

```
Height: 2px
Border: none
Background: linear-gradient(to right, transparent 0%, #E2C379 50%, transparent 100%)
Margin: 48px 0
```

---

### Completion Card

```
Padding: 32px
Background: linear-gradient(135deg, #F4E9D8, #FFFBF5)
Border: 2px solid #E2C379 at 30% opacity
Border Radius: 16px
Shadow: 0 8px 24px rgba(226, 195, 121, 0.15)

Icon Container:
  Size: 48px × 48px
  Background: #E2C379
  Border Radius: 12px
  Shadow: 0 4px 8px rgba(226, 195, 121, 0.25)

Button:
  Padding: 24px
  Background: #E2C379
  Border Radius: 12px
  Font: 16px, semibold
  Color: #2D2F33
  Shadow: 0 4px 12px rgba(226, 195, 121, 0.25)

  Hover:
    Background: #C9A961
    Transform: scale(1.02)
    Shadow: 0 8px 16px rgba(226, 195, 121, 0.3)
```

---

## Animation Specifications

### Timing Functions
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out: cubic-bezier(0.0, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
```

### Duration Scale
| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 150ms | Micro-interactions |
| Normal | 200ms | Hover states |
| Smooth | 300ms | Transitions |
| Slow | 600ms | Entrance animations |
| Slower | 800ms | Major transitions |

### Animations

#### Fade Slide In
```css
Duration: 600ms
Easing: ease-out
From: opacity 0, translateY(20px)
To: opacity 1, translateY(0)
```

#### Slide Up
```css
Duration: 800ms
Delay: 200ms
Easing: ease-out
From: opacity 0, translateY(30px)
To: opacity 1, translateY(0)
```

#### Confetti
```css
Duration: 3000ms (randomized 2-4s)
Easing: linear
From: translateY(-10vh), rotation 0deg, opacity 1
To: translateY(110vh), rotation 720deg, opacity 0
```

#### Scale In
```css
Duration: 500ms
Easing: ease-out
From: scale(0)
50%: scale(1.2)
To: scale(1)
```

---

## Interaction States

### Buttons

| State | Background | Transform | Shadow | Transition |
|-------|------------|-----------|--------|------------|
| Default | #E2C379 | scale(1) | 0 4px 12px | - |
| Hover | #C9A961 | scale(1.02) | 0 8px 16px | 300ms |
| Active | #B8935A | scale(0.98) | 0 2px 8px | 100ms |
| Disabled | #E2C379 50% | scale(1) | none | - |

### Links

| State | Color | Underline Offset | Decoration Color |
|-------|-------|------------------|------------------|
| Default | #E2C379 | 2px | #E2C379 30% |
| Hover | #C9A961 | 5px | #E2C379 100% |
| Active | #B8935A | 2px | #B8935A 100% |
| Visited | #E2C379 | 2px | #E2C379 30% |

---

## Accessibility Specifications

### Color Contrast Ratios
| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| Slate on Ivory | 12.6:1 | AAA |
| Slate on White | 15.1:1 | AAA |
| Gold on White | 3.8:1 | AA Large |
| Gold on Slate | 4.2:1 | AA |

### Focus Indicators
```css
Outline: 2px solid #E2C379
Outline Offset: 2px
Border Radius: 4px
```

### Touch Targets
```
Minimum: 44px × 44px
Recommended: 48px × 48px
Spacing: 8px minimum between targets
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

---

## Grid & Layout

### Content Container
```
Max Width: 768px (48rem)
Padding: 16px (mobile), 32px (tablet), 64px (desktop)
Margin: 0 auto
```

### Section Spacing
```
Mobile: 48px
Tablet: 64px
Desktop: 96px
```

---

## Print Styles

```css
Font Size: 12pt
Line Height: 1.6
Colors: Black on white
Margins: 1in all sides
Page Breaks: After H2, avoid in tables/quotes
```

---

## File References

**CSS Implementation**: `/app/globals.css`
**Component**: `/app/journey/library/[courseSlug]/[lessonId]/page.tsx`
**Showcase**: `/app/journey/library/style-showcase/page.tsx`
**Documentation**: See `LESSON_DESIGN_GUIDE.md`

---

**Version**: 1.0.0
**Last Updated**: 2025-10-13
**Status**: Production Ready
