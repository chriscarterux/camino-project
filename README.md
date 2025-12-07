# Camino Project (formerly Walter) 🚀
## 12-Week Integrated Transformation Journey

Complete platform for dimensional transformation through AI-assisted reflection and coaching.

---

## 📖 **DEVELOPER WORKFLOW**

**🚨 IMPORTANT:** Before making any code changes, read:

1. **`.claude/INSTRUCTIONS.md`** - Critical rules and workflow overview (READ FIRST)
2. **`.claude/WORKFLOW.md`** - Complete development workflow documentation
3. **`openspec/README.md`** - OpenSpec-driven development guide

**Key Principles:**
- One Linear issue = One OpenSpec proposal = One feature branch
- Create OpenSpec proposal BEFORE coding
- Run all 6 test dimensions BEFORE requesting approval
- Never commit without explicit human approval

**Current Focus:** 42 Linear issues (HOW-111 to HOW-152) prioritized by urgency.

---

## 🔧 **LOCAL SETUP**

**Configure Your Environment:**

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update paths in `.env.local`:**
   ```bash
   # Update these two lines with your actual paths:
   PROJECT_ROOT=/path/to/camino-project
   OBSIDIAN_VAULT=/path/to/obsidian/vaults/yourname
   ```

3. **Path placeholders in documentation:**
   All workflow documentation uses placeholders like `{PROJECT_ROOT}` and `{OBSIDIAN_VAULT}`. These reference the paths you configured in `.env.local`.

**Why this matters:**
- Makes workflows portable across team members
- Prevents committing personal file paths to git
- Enables consistent documentation references

See `.env.example` for detailed setup instructions.

---

## 🗂️ Project Structure

```
camino-project/
├── camino-marketing/          # Next.js marketing website
│   ├── app/                   # App router pages
│   │   ├── page.tsx          # Landing page
│   │   ├── pricing/          # Pricing page
│   │   ├── booking/          # Cal.com booking
│   │   └── api/checkout/     # Stripe integration
│   ├── components/ui/        # shadcn/ui components
│   └── .env.example          # Environment variables template
│
├── camino-lms/               # Frappe LMS (8-week programs)
│   ├── docker-compose.yml   # Docker configuration
│   └── SETUP.md             # Complete LMS setup guide
│
├── camino-web-app/          # React reflection app (future)
└── initium/                 # Project generator & docs
    └── generated-projects/camino-web-app/docs/
        ├── PRD.md          # Product Requirements (450 lines)
        ├── TRD.md          # Technical Requirements (280 lines)
        └── API.md          # API Specification (554 lines)
```

---

## 🚀 Quick Start (5 minutes)

### 1. Install Docker Desktop
```bash
brew install --cask docker
# Then open Docker Desktop app
```

### 2. Start Frappe LMS
```bash
cd camino-lms
docker compose up -d

# Wait ~2 minutes for initialization
# Access: http://lms.localhost:8000/lms
# Login: Administrator / admin
```

### 3. Start Marketing Website
```bash
cd camino-marketing

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Stripe keys

# Run development server
npm run dev

# Access: http://localhost:3000
```

---

## 💳 Stripe Setup

### Get Test API Keys
1. Create account at https://dashboard.stripe.com
2. Toggle to **Test Mode**
3. Go to Developers → API Keys
4. Copy **Secret key** and **Publishable key**

### Configure Environment
```bash
cd camino-marketing
cp .env.example .env.local
```

Edit `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

### Test Checkout
1. Visit http://localhost:3000/pricing
2. Click "Start Transformation" ($19.95/mo)
3. Use test card: `4242 4242 4242 4242`
4. Any future expiry date
5. Any CVC

---

## 📚 LMS Configuration

See complete guide: `camino-lms/SETUP.md`

### Create Transformation Program

1. **Access LMS Admin:**
   - http://lms.localhost:8000/desk
   - Login: Administrator / admin

2. **Create Course:**
   - Go to: LMS → Course → New
   - **Title:** Camino Journey Program
   - **Short Intro:** 8-week guided journey...
   - **Duration:** 8 weeks
   - Save

3. **Add Chapters & Lessons:**
   - Week 1: Foundation - Values & Life Lens
   - Week 2: Reflection Practice
   - Week 3: Pattern Recognition
   - (See SETUP.md for complete curriculum)

4. **Create Batch:**
   - LMS → Batch → New
   - **Title:** Camino Cohort Q1 2025
   - **Course:** Camino Journey Program
   - **Seats:** 20
   - Save

---

## 🔗 Complete User Journey

### 1. User discovers Camino
```
https://localhost:3000 (Marketing Site)
├── Reads about features
├── Views pricing
└── Chooses tier
```

### 2. Free Tier → Direct signup
```
User clicks "Start Free"
→ Redirect to LMS: http://lms.localhost:8000/lms
→ Create account
→ Access limited features
```

### 3. Transformation Tier ($19.95/mo)
```
User clicks "Start Transformation"
→ Stripe Checkout: /api/checkout?tier=transformation
→ Payment success
→ Webhook creates LMS account + enrolls in program
→ Email with login credentials
→ Access full LMS
```

### 4. Mastery Tier ($1,000/mo)
```
User clicks "Book Consultation"
→ Booking page: /booking
→ Cal.com widget (or email)
→ Schedule coaching call
→ Manual enrollment + coaching setup
```

---

## 🎨 Design System

**Theme:** Minimalist black & white using OKLCH color space

### Brand Colors
- **Primary:** Pure black `oklch(0 0 0)`
- **Background:** Near white `oklch(0.99 0 0)`
- **Accent:** Subtle gray `oklch(0.94 0 0)`

### Typography
- **Sans:** Geist (body text)
- **Serif:** Georgia (headings)
- **Mono:** Geist Mono (code)

### Key Values
- **Radius:** 0.5rem (subtle roundness)
- **Shadow:** Minimal, consistent elevation
- **Spacing:** 0.25rem base unit

---

## 📊 Pricing Tiers

| Tier | Price | Features | LMS Access |
|------|-------|----------|------------|
| **Foundation** | Free | Basic reflection, 10 AI prompts/mo, 20 insights | Limited course access |
| **Transformation** | $19.95/mo | Unlimited, 8-week programs, weekly summaries | Full program access |
| **Mastery** | $1,000/mo | Everything + 1:1 coaching, custom curriculum | Full access + private coaching |

---

## 🔌 Integrations

### Stripe Webhook (Post-Payment Automation)
```typescript
// webhook endpoint: /api/webhooks/stripe

// On checkout.session.completed:
1. Create LMS user account
2. Enroll in Transformation Program
3. Send welcome email
4. Grant LMS access
```

### Frappe LMS API
```bash
# Create user
POST http://lms.localhost:8000/api/resource/User
Authorization: token API_KEY:API_SECRET
{
  "email": "user@example.com",
  "first_name": "Sarah"
}

# Enroll in course
POST http://lms.localhost:8000/api/resource/LMS Enrollment
{
  "member": "user@example.com",
  "course": "camino-journey-program"
}
```

### Cal.com Booking
```tsx
// In /app/booking/page.tsx
import Cal from "@calcom/embed-react";

<Cal
  calLink="camino/consultation"
  config={{theme: "light"}}
/>
```

---

## 🛠️ Development Commands

### Marketing Site
```bash
cd camino-marketing

npm run dev        # Development server (localhost:3000)
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint check
```

### LMS
```bash
cd camino-lms

docker compose up -d           # Start LMS
docker compose down            # Stop LMS
docker compose logs -f frappe  # View logs
docker compose restart         # Restart services
```

---

## 📦 Deployment

### Marketing Site → Vercel
```bash
cd camino-marketing

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# STRIPE_SECRET_KEY
# STRIPE_PUBLISHABLE_KEY
```

### LMS → Frappe Cloud
1. Sign up: https://frappecloud.com/lms/signup
2. Deploy Camino LMS
3. Configure domain
4. Import course content

---

## 📝 Documentation

### Product Vision
- **PRD:** `initium/generated-projects/camino-web-app/docs/PRD.md`
  - Complete product strategy
  - User personas (Sarah, Marcus, Leah)
  - 8-week transformation roadmap
  - Business model & pricing rationale

### Technical Specs
- **TRD:** `initium/generated-projects/camino-web-app/docs/TRD.md`
  - React + TypeScript stack
  - Deployment architecture
  - Security requirements

### API Reference
- **API:** `initium/generated-projects/camino-web-app/docs/API.md`
  - Complete endpoint specifications
  - Authentication flows
  - Webhook implementations

---

## 🚧 Next Steps

### Phase 1: MVP (Weeks 1-6)
- [x] Marketing website
- [x] Stripe checkout
- [x] LMS setup
- [ ] Stripe webhook automation
- [ ] Welcome email flow
- [ ] User dashboard

### Phase 2: Enhancement (Weeks 7-12)
- [ ] AI reflection engine (OpenAI/Claude API)
- [ ] Pattern detection algorithms
- [ ] Weekly summary generator
- [ ] Mobile responsive refinements

### Phase 3: Scale (Weeks 13+)
- [ ] Mobile app (React Native)
- [ ] Community discussions
- [ ] Coaching scheduler automation
- [ ] Advanced analytics

---

## 🤝 Contributing

This is a private project. For questions or support:
- Email: hello@walter.app
- Documentation: See `/docs` folder

---

## 📄 License

Proprietary - © 2025 Walter

---

## 🎯 Success Metrics (90 Days)

- 3,000+ free tier signups
- 60%+ weekly active usage
- 10%+ conversion to paid
- NPS score >50
- 80%+ complete Life Lens onboarding

---

**Status:** ✅ Core infrastructure complete
**Next:** Run `docker compose up -d` in `camino-lms/` to launch!
