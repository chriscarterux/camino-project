# Walter Marketing Website
## Next.js 15 + TypeScript + Tailwind CSS + Stripe

Beautiful, minimalist marketing site for Walter - AI-powered thinking partner platform.

---

## 🎨 Design

**Theme:** Minimalist black & white using OKLCH color space
- Clean, sophisticated aesthetic
- Geist font family (sans + mono)
- Subtle shadows and borders
- Perfect for thoughtful, intentional brand

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Stripe keys to .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
walter-marketing/
├── app/
│   ├── page.tsx              # Landing page
│   ├── pricing/page.tsx      # Pricing tiers
│   ├── booking/page.tsx      # Cal.com integration
│   ├── api/checkout/         # Stripe checkout
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles + theme
│
├── components/ui/
│   └── button.tsx            # Button component
│
├── lib/
│   └── utils.ts              # Utility functions
│
├── .env.example              # Environment template
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── tsconfig.json             # TypeScript config
```

---

## 🔑 Environment Variables

Create `.env.local` with:

```env
# Stripe (Get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# LMS Integration
LMS_API_URL=http://lms.localhost:8000
LMS_API_KEY=your_api_key
LMS_API_SECRET=your_api_secret
```

---

## 💳 Stripe Integration

### Test Mode
Use these test cards in Stripe checkout:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

Any future expiry, any CVC, any billing address.

### Checkout Flow
1. User clicks pricing tier button
2. Redirects to `/api/checkout?tier=transformation`
3. Stripe checkout session created
4. Payment processed
5. Redirect to success page
6. Webhook creates LMS account (to be implemented)

---

## 📄 Pages

### Landing Page (`/`)
- Hero section with value proposition
- Problem statement (self-improvement noise)
- 6 core features
- User testimonials (Sarah, Marcus, Leah)
- CTA sections

### Pricing Page (`/pricing`)
- **Foundation:** Free tier
- **Transformation:** $19.95/month (Stripe checkout)
- **Mastery:** $1,000/month (booking consultation)
- FAQ section

### Booking Page (`/booking`)
- Cal.com integration placeholder
- Consultation scheduling for Mastery tier
- What to expect section

---

## 🎨 Theme Customization

The theme is defined in `app/globals.css` using CSS custom properties.

### Color Palette
```css
--primary: oklch(0 0 0)              /* Black */
--background: oklch(0.9900 0 0)      /* Near white */
--muted: oklch(0.9700 0 0)           /* Light gray */
--border: oklch(0.9200 0 0)          /* Border gray */
```

### Dark Mode
Automatically switches based on system preference. All colors have dark mode variants defined.

---

## 🧩 Components

### Button
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">
  Start Transformation
</Button>
```

**Variants:** `default`, `outline`, `secondary`, `ghost`, `link`
**Sizes:** `sm`, `default`, `lg`, `icon`

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Add environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add `STRIPE_SECRET_KEY` and other vars

### Environment URLs
- **Production:** `https://walter.app` (your domain)
- **Preview:** Auto-generated for each PR
- **Development:** `http://localhost:3000`

---

## 🔗 Integration with LMS

### User Flow
1. User completes Stripe checkout
2. Webhook received at `/api/webhooks/stripe`
3. Create user in Frappe LMS
4. Enroll in transformation program
5. Send welcome email with credentials

### API Integration (To Implement)
```typescript
// Create LMS user after payment
const response = await fetch(`${LMS_API_URL}/api/resource/User`, {
  method: 'POST',
  headers: {
    'Authorization': `token ${LMS_API_KEY}:${LMS_API_SECRET}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: customerEmail,
    first_name: customerName
  })
});
```

---

## 📊 Analytics (To Add)

Recommended tools:
- **Vercel Analytics** - Built-in, zero config
- **Google Analytics 4** - User tracking
- **PostHog** - Product analytics
- **Sentry** - Error tracking

---

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast WCAG AA compliant

---

## 🧪 Testing

```bash
# Type checking
npm run build

# Linting
npm run lint

# Production build test
npm run build && npm run start
```

---

## 📝 Content Updates

### Update Pricing
Edit `app/pricing/page.tsx` → `pricingTiers` array

### Update Features
Edit `app/page.tsx` → Features section array

### Update Testimonials
Edit `app/page.tsx` → Social Proof section array

---

## 🎯 Performance

- **Lighthouse Score:** Target 95+ on all metrics
- **Image Optimization:** Use Next.js `<Image>` component
- **Font Loading:** Optimized with next/font
- **Code Splitting:** Automatic with App Router

---

## 🤝 Support

For questions or issues:
- Email: hello@walter.app
- Documentation: `/README.md` in project root

---

**Built with:**
- Next.js 15
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- Stripe SDK
- Geist Font

**Status:** ✅ Ready for development
**Next:** Add Stripe keys and run `npm run dev`
