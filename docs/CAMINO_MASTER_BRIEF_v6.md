# The Camino Master Manual
**Guided reflection for a meaningful life.**

---

> **Document Version**: v6.0 | **Last Updated**: December 2025
>
> **Status Legend**: `[LIVE]` Deployed | `[PARTIAL]` In Progress | `[PLANNED]` Not Started

---

## Table of Contents

1. [Chapter 1: Identity & Vision](#chapter-1-identity--vision)
2. [Chapter 2: The Customer Journey](#chapter-2-the-customer-journey)
3. [Chapter 3: Product Ecosystem](#chapter-3-product-ecosystem)
4. [Chapter 4: The AI Intelligence Layer](#chapter-4-the-ai-intelligence-layer)
5. [Chapter 5: Technical Architecture](#chapter-5-technical-architecture)
6. [Chapter 6: Business & Operations](#chapter-6-business--operations)
7. [Chapter 7: Roadmap](#chapter-7-roadmap)
8. [Chapter 8: Design System & Brand](#chapter-8-design-system--brand)
9. [Appendices](#appendices)
   - [Appendix E: Glossary of Terms](#appendix-e-glossary-of-terms) ← **Start here for definitions**

---

## Implementation Status Overview

| Feature | Status | Notes |
|---------|--------|-------|
| Daily Prompts System | `[LIVE]` | 28-day rotation across 3 dimensions |
| Activation Moment | `[LIVE]` | 3 reflections + 1 insight view |
| Security Layer | `[LIVE]` | CSRF, rate limiting, validation, PII removal |
| Onboarding Flow | `[LIVE]` | Welcome → Quiz → Reflections → Celebration |
| Email System | `[LIVE]` | Resend: welcome, reminders, contact |
| AI Insights | `[PARTIAL]` | Framework exists, Gemini integration pending |
| LMS Integration | `[PARTIAL]` | Frappe framework ready, awaiting deployment |
| Stripe Payments | `[PARTIAL]` | Checkout exists, product config needed |
| 3 Engagement Tracks | `[PLANNED]` | Standard, Creative, Deep Dive |
| Integration Engine | `[PLANNED]` | AI pattern → course recommendations |
| Weekly Summary "Wrapped" | `[PLANNED]` | Enhanced insights visualization |

---

## Key Terms Quick Reference

> **Full definitions with examples in [Appendix E: Glossary](#appendix-e-glossary-of-terms)**

| Term | Definition | Criteria |
|------|------------|----------|
| **Reflection** | User's written response to a daily prompt | Content + mood + dimension |
| **Insight** | AI-generated pattern from multiple reflections | Requires 3+ reflections |
| **Activation** | User's "aha moment" — key success metric | 3 reflections + 1 insight viewed |
| **Prompt** | Daily question for self-exploration | 28-day rotation cycle |
| **Dimension** | Psychological axis: Identity, Worldview, or Relationships | 3 total, balanced distribution |
| **Lens** | Unconscious filter distorting reality (e.g., Scarcity, Performance) | `[PLANNED]` for AI detection |
| **Phase** | Stage in journey: Foundation → Exploration → Integration | 28 days each (84 total) |
| **Streak** | Consecutive days of reflection | Resets if day missed |

**Subscription Tiers:**

| | **DISCOVER** | **JOURNEY** | **TRANSFORM** | **CATALYST** |
|---|---|---|---|---|
| **Type** | B2C | B2C | B2C | B2B |
| **Price** | $97/mo | $197/mo | $497/mo | $298-797/seat |
| **Duration** | Monthly | Monthly | Monthly | 12-week program |
| **Reflections** | 2/month | 4/month | Unlimited | Daily (84 days) |
| **Prompts** | Standard | Standard | Personalized | CALVO Method™ |
| **AI Insights** | 1/month | 3/month | Unlimited | Integrated |
| **Pattern Detection** | — | Monthly | Real-time | Real-time |
| **AI Mirroring** | — | Basic | Advanced | Advanced |
| **Predictive Insights** | — | — | ✓ | ✓ |
| **Courses** | 1/month | Unlimited | Unlimited + AI | Full curriculum |
| **Coaching** | — | — | 2 sessions (1:1) | 6 sessions (group) |
| **Support** | Email | Priority | Direct Coach | Dedicated CSM |
| **Best For** | Individuals exploring | Committed self-learners | Personal transformation | Teams & orgs |

**Why These Numbers:**

| Number | Meaning | Rationale |
|--------|---------|-----------|
| **3** | Reflections to activate | Minimum for pattern detection |
| **7** | Days to activation target | Before user drop-off |
| **28** | Prompt rotation cycle | Monthly variety without repetition |
| **60%** | Activation rate target | Industry benchmark for retention |

---

## Chapter 1: Identity & Vision

### 1.1 The Core Truth

**"You are not broken. You are just seeing through the wrong lens."**

Modern self-help treats people as problems to be fixed. Camino believes that anxiety, burnout, impostor syndrome, and confusion are not character flaws—they are symptoms of misaligned "lenses" (unconscious semantic filters through which we view reality).

**Examples:**
- **Scarcity Lens**: A neutral email from your boss feels like a threat to your job.
- **Performance Lens**: Rest feels like laziness.

**The Camino Thesis: Three-Dimensional Coherence Model**

True transformation is a shift in *coherence* across three dimensions:

| Dimension | From | To |
|-----------|------|-----|
| **Identity** | Conditional Worth ("I am what I achieve") | Inherent Worth ("I am enough") |
| **Worldview** | Scarcity ("Life is a battle") | Abundance ("Life is a gift") |
| **Relationships** | Isolation ("I am alone") | Interconnection ("I am part of the whole") |

**The Outcome: "Grounded Generosity"**

When these three dimensions align, users achieve a state of natural embodiment of worth, abundance, and influence—replacing the fragmented, reactive state of modern burnout.

### 1.2 The Solution: An Active Thinking Partner

Camino is not a passive journal. It is an **active thinking partner**.

| Capability | Description |
|------------|-------------|
| **It Asks** | "What aspect of this stress feels within your control?" |
| **It Remembers** | Connects today's frustration to last month's fear |
| **It Mirrors** | Highlights your own language to reveal cognitive patterns |

### 1.3 Target Audience

#### Sarah, the Intentional Designer (32)
- **Role**: Senior Product Designer
- **Vibe**: Reads "Atomic Habits", uses Figma, drinks oat flat whites
- **Quote**: *"I know what matters to me, but I struggle to stay aligned with it day-to-day."*
- **Pain Point**: Drowning in self-improvement content but can't sustain habits
- **Goal**: A "fidelity tracker" for her soul—structure and consistency

#### Marcus, the Searching Founder (38)
- **Role**: Startup Founder (Post-Exit)
- **Vibe**: YC alum, burned out, skeptical of "woo-woo" spirituality
- **Quote**: *"I consume so much wisdom, but where does it go?"*
- **Pain Point**: High achiever, burned out. Views introspection as high-leverage
- **Goal**: Resilience and clarity. "Insights per minute."

#### Leah, the Conscious Professional (29)
- **Role**: Executive Coach
- **Vibe**: Active on LinkedIn, teaches others
- **Quote**: *"I help others find clarity—I need a tool for my own growth."*
- **Pain Point**: Holds space for everyone else but has no container for herself
- **Goal**: Deepen her own practice to serve clients better

### 1.4 Brand Identity

**"Calm Technology" for a Noisy World.**

| Element | Approach |
|---------|----------|
| **Voice** | Socratic, Clear, Warm. We ask, never preach. |
| **Aesthetic** | Minimalist, Spacious, Natural. OKLCH color space. |
| **No Gamification** | No "pings" or flashy badges. |

### 1.5 The Transformation Model

**Reflect → Discover → Grow**

1. **Reflect (Data)**: User dumps raw thoughts. *"I'm annoyed at Mike."*
2. **Discover (Pattern)**: AI aggregates data. *"You're often annoyed when competence is questioned."*
3. **Grow (Action)**: User experiments. *"Next time, I'll name the feeling instead of blaming Mike."*

---

## Chapter 2: The Customer Journey

### 2.1 Entry: The "Reflect" Intro `[LIVE]`

- **Source**: Organic content (Substack essays) or Paid Social ("Pattern Interruption" ads)
- **Lead Magnet**: Free Introduction to Self-Discovery
- **Promise**: "See yourself clearly."

**Onboarding Flow** (`/onboarding/*`):
1. **Welcome**: Value proposition and signup
2. **Intent Quiz**: 5 questions to establish baseline values
3. **3 Guided Reflections**: Initial data gathering
4. **Celebration**: First insight reveal

### 2.2 Activation: The "Aha" Moment `[LIVE]`

**Definition**: User completes **3 Reflections** AND views **1 Pattern Insight**.

| Metric | Target |
|--------|--------|
| Days to Activation | < 7 days |
| Activation Rate | 60% of signups |

**Tracking**: `user_activations` table + `activation_funnel` view

### 2.3 Retention: The Habit Loop

Using the "Hook Model":

1. **External Trigger**: Daily email reminder at user-selected time
2. **Internal Trigger**: "Confusion" or "overwhelm" → open Camino
3. **Action**: 3-minute guided reflection (low friction)
4. **Variable Reward**: Insights, patterns, weekly summaries
5. **Investment**: More entries = smarter AI mirror

### 2.4 Transition: The Upsell Path

**Discover → Journey:**
*"I want to reflect more than twice a month..."*
→ Upgrade to **Journey** for 4 reflections, 3 insights, and unlimited courses.

**Journey → Transform:**
*"I see the patterns now... but I need help changing them."*
→ Upgrade to **Transform** for unlimited everything + 2 coaching sessions/month.

**Value proposition for Transform:**
- Coaching alone = $398/month (2 × $199)
- Platform (Journey) = $197/month
- Transform = $497/month
- **Save $98/month** by choosing Transform

---

## Chapter 3: Product Ecosystem

### 3.1 DISCOVER ($97/mo) `[LIVE]`

| Attribute | Value |
|-----------|-------|
| **Status** | Entry Tier |
| **Price** | $97/month |
| **Promise** | "See yourself clearly." |
| **Trial** | 14 days free |

**Features:**
- 2 reflections/month
- 1 AI insight/month
- Standard prompt rotation (28-day cycle)
- 1 course/month
- Email support
- Basic dashboard

**AI Capabilities (Basic):**
- Standard prompts (not personalized)
- Monthly insight generation
- No pattern detection
- No AI mirroring

**Three Engagement Tracks** `[PLANNED]`:
1. **Standard**: Balanced writing and multiple choice
2. **Creative**: Metaphor-rich prompts (*"If your day was a weather pattern..."*)
3. **Deep Dive**: Therapy-adjacent probing questions

### 3.2 JOURNEY ($197/mo) `[PARTIAL]`

| Attribute | Value |
|-----------|-------|
| **Status** | Core Revenue Engine (LMS integration in progress) |
| **Price** | $197/month |
| **Promise** | "Close the gap between knowing and doing." |
| **Trial** | 14 days free |

**Features:**
- 4 reflections/month
- 3 AI insights/month
- Standard prompt rotation
- Unlimited courses from 20-course library
- Priority support

**AI Capabilities (Standard):**
- Standard prompts (not personalized)
- 3 insights/month
- Monthly pattern summary
- Basic AI mirroring
- AI course recommendations

#### The Core 30-Day Curriculum

| Phase | Days | Focus | Themes |
|-------|------|-------|--------|
| **1. Curiosity & Presence** | 1-6 | Awareness of now | Joy, Authenticity, Surprise, Grounding |
| **2. Awareness & Emotion** | 7-12 | Emotional intelligence | Stress, Safety, Energy Drain, Rest |
| **3. Meaning & Values** | 13-18 | What truly matters | Pride, Lessons, Inspiration, Legacy |
| **4. Growth & Possibility** | 19-24 | Embracing change | Learning, Belief Updates, Resilience |
| **5. Gratitude & Integration** | 25-30 | Bringing it together | Kindness, Resolution, Release, Evolution |

#### The Integration Engine `[PLANNED]`

- **Curated Access**: 2 courses/month based on AI-detected patterns
- **Integration Prompts**: Daily questions bridging course concepts to life

#### The 20-Course Library

**Track 1: Personal Development**
1. Imposter Syndrome & Confidence
2. Emotional Intelligence (EQ)
3. Mindfulness
4. Attention Management
5. Happiness Science
6. Life Coaching Essentials
7. Goal Setting (GTD)
8. Self-Leadership
9. Resilience
10. Values Alignment

**Track 2: Professional Development**
11. Social Learning
12. Public Speaking
13. Presentation Skills
14. Leadership & Influence
15. Leadership for Women
16. Critical Thinking
17. Conflict Resolution
18. Change Management
19. Project Management
20. Appreciative Inquiry

### 3.3 TRANSFORM ($497/mo) `[PARTIAL]`

| Attribute | Value |
|-----------|-------|
| **Status** | Premium Tier with Human Coaching |
| **Price** | $497/month |
| **Promise** | "Transform with expert guidance." |
| **Trial** | 14 days free |
| **Coaching Value** | 2 sessions × $199 = $398/month |

**Features (Everything in Journey, plus):**
- Unlimited reflections
- Unlimited AI insights
- Personalized prompts (AI + Coach curated)
- 2 coaching sessions/month (2 hours total)
- Unlimited courses + AI-curated learning paths
- Direct coach access
- Priority scheduling

**AI Capabilities (Advanced + Human Integration):**
- Personalized prompts based on patterns + coach input
- Unlimited on-demand insights
- Real-time pattern detection across all dimensions
- Advanced AI mirroring with behavioral analysis
- Predictive insights ("Based on patterns, you may be approaching...")
- Session prep reports (AI briefs your coach before each session)
- Custom AI-curated learning paths
- Weekly summaries shared with coach

**Value Proposition:**
```
Coaching alone:     $398/month (2 × $199)
Platform (Journey): $197/month
Total separate:     $595/month
Transform price:    $497/month
YOU SAVE:           $98/month (17%)
```

### 3.4 CATALYST (B2B: $298-797/seat) `[PLANNED]`

| Attribute | Value |
|-----------|-------|
| **Status** | Enterprise & Education Tier |
| **Price** | $797/seat (10-50) → $497/seat (201+) |
| **Education** | 40% discount on all seat tiers |
| **Promise** | "Transform your organization from the inside out." |

**The CALVO Method™ Program:**

A structured 12-week (84-day) transformation program based on the integrative framework for Identity, Worldview, and Relational transformation.

| Phase | Weeks | Focus | Outcome |
|-------|-------|-------|---------|
| **Identity Shift** | 1-4 | Self-compassion, inherent worth, growth identity, agency | Stable identity foundation |
| **Worldview Shift** | 5-8 | Abundance, systems thinking, multi-perspective capacity | Expanded perception |
| **Relationship Shift** | 9-12 | Interconnection, influence, contribution, self-authorization | Integrated action |
| **Integration** | 13-16 | Consolidation, embodiment | Sustainable transformation |

**Program Structure:**
- **Daily AI engagement**: 15-30 minutes (21-42 hours total)
- **Group coaching**: 6 sessions across 12 weeks
- **Integration support**: Weeks 13-16 with reduced AI (3x/week)
- **Total developmental dose**: 21-42 hours AI + 6 hours coaching per person

**The Outcome: Grounded Generosity**

When Identity, Worldview, and Relationship shift together, they create self-reinforcing transformation:

```
Grounded → Generous → Grounded → Generous
    ↑                              ↓
    └──────────────────────────────┘
```

- **Grounded**: Identity is stable, not dependent on achievement or approval
- **Generous**: Contributing from genuine desire, not obligation or worth-proving
- **Self-reinforcing**: Being grounded enables generosity; generosity deepens groundedness

**Applications:**

| Population | Focus |
|------------|-------|
| **Leadership/Executive** | Grounded leadership, strategic abundance thinking, authentic influence |
| **Education - Students** | SEL alignment, gifted/LD/neurodivergent tracks |
| **Education - Educators** | Burnout prevention, inherent worth not tied to outcomes |
| **Teams** | Psychological safety, collaborative problem-solving, generative culture |
| **Clinical** | Complement to therapy, between-session support |

---

### 3.5 The Three Shifts (2026) `[PLANNED]`

- **Focus**: Identity-level transformation
- **Concept**: Shifting how you see Yourself, Reality, and Your Place in Things

---

## Chapter 4: The AI Intelligence Layer

### 4.1 Intelligence Strategy `[PARTIAL]`

| Attribute | Value |
|-----------|-------|
| **Model** | Gemini 2.0 Flash (via Google AI Platform) |
| **Status** | Framework exists; returns placeholder insights while integration pending |
| **Philosophy** | "Mirroring" not "Advising" |

**The Rule**: AI reflects patterns (*"You frequently mention X when Y happens"*), never prescribes (*"You should do X"*).

### 4.2 The Prompt Taxonomy `[LIVE]`

Three dimensions for holistic data gathering (implemented in `20250105_prompts_system.sql`):

| Dimension | Question Type | Tags |
|-----------|--------------|------|
| **Identity** | "What did you learn about yourself today?" | `self-discovery`, `authenticity`, `values` |
| **Worldview** | "What assumption was challenged today?" | `perspective`, `beliefs`, `meaning-making` |
| **Relationships** | "Describe a meaningful interaction today." | `connection`, `boundaries`, `empathy` |

### 4.3 The Insight Algorithm `[PARTIAL]`

**Trigger**: `generateInsightForUser` fires after every 3rd reflection.

**Process**:
1. Fetch last 3 reflections
2. Inject system prompt for pattern analysis
3. Generate insight object with `type`, `title`, `content`, `themes`
4. Save to `insights` table

**Output Types**: `pattern`, `theme`, `lens_shift`

---

## Chapter 5: Technical Architecture

### 5.1 The Stack `[LIVE]`

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, ShadCN UI |
| **Backend** | Supabase (Postgres, Auth, Edge Functions) |
| **LMS Platform** | Frappe/Docker `[PARTIAL]` |
| **Analytics** | PostHog |
| **Rate Limiting** | Upstash Redis |
| **Email** | Resend |
| **Payments** | Stripe `[PARTIAL]` |
| **Hosting** | Vercel (web), Coolify/VPS (LMS) |
| **Domain** | camino.to |

**Repo Structure**: Monorepo with worktree-based development (e.g., `worktrees/HOW-123-feature-name`)

### 5.2 Database Schema `[LIVE]`

**Core Tables:**

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | User data | `plan`, `streak_days`, `is_activated`, `lms_user_id` |
| `reflections` | User entries | `content`, `mood`, `prompt_id`, `dimension` |
| `insights` | AI patterns | `type`, `title`, `content`, `reflection_ids` |
| `prompts` | Daily questions | `dimension`, `day_number`, `phase`, `tags` |
| `leads` | Marketing capture | `email`, `source`, `utm_*` |
| `user_activations` | Activation tracking | `activated_at`, `reflection_count`, `insight_id` |

**Subscription Tables** (in `subscription-system` worktree):

| Table | Purpose |
|-------|---------|
| `subscription_tiers` | Tier definitions with Stripe price IDs |
| `subscriptions` | User subscription status and usage |
| `subscription_history` | Audit trail for changes |
| `subscription_usage` | Per-resource rate limiting |
| `promo_codes` | Promotional pricing |

**Analytics Views:**
- `activation_funnel`: Conversion tracking
- `activation_metrics`: Per-user activation data

### 5.3 Security Architecture `[LIVE]`

Comprehensive hardening via HOW-482 through HOW-491:

| Protection | Implementation | Ticket |
|------------|----------------|--------|
| Input Validation | Zod schemas for all endpoints | HOW-482 |
| SQL Injection | Parameterized queries only | HOW-482 |
| XSS Protection | React escaping + CSP headers | HOW-485 |
| CSRF Protection | sessionStorage tokens | HOW-486 |
| Rate Limiting | Upstash Redis distributed | HOW-487 |
| Spam Prevention | Honeypot fields | HOW-488 |
| Command Injection | Input sanitization | HOW-489 |
| SVG Sanitization | Safe rendering | HOW-491 |
| PII Removal | Analytics sanitization | HOW-483 |
| Ownership Verification | DELETE endpoint checks | HOW-484 |

**Security Headers** (`next.config.ts`):
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://js.stripe.com
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### 5.4 Testing Infrastructure `[LIVE]`

| Type | Tool | Command |
|------|------|---------|
| Unit Tests | Jest | `npm run test` |
| E2E Tests | Playwright | `npm run test:e2e` |
| Accessibility | Axe-Core | `npm run test:a11y` |
| Security Scans | Custom scripts | `npm run test:security` |
| CI Pipeline | All tests | `npm run test:ci` |

**Test Locations:**
- `__tests__/` - Unit tests
- `tests/e2e/` - Playwright E2E
- `tests/integration/` - API tests
- `tests/security/` - Security audits

### 5.5 Email System `[LIVE]`

**Provider**: Resend

| Template | Trigger | Endpoint |
|----------|---------|----------|
| Welcome | On signup | `/api/emails/welcome` |
| Daily Reminder | Scheduled | `/api/emails/daily-reminder` |
| Weekly Summary | Scheduled `[PARTIAL]` | `/api/emails/weekly-summary` |
| Contact Form | User submission | `/api/emails/contact` |
| Newsletter | Lead capture | `/api/emails/subscribe` |

### 5.6 API Routes `[LIVE]`

**Reflections:**
- `GET/POST /api/reflections` - List and create
- `GET/PUT/DELETE /api/reflections/[id]` - Individual CRUD

**Insights:**
- `GET/POST /api/insights` - List and generate (requires 3+ reflections)
- `GET/PUT/DELETE /api/insights/[id]` - Individual CRUD

**Prompts:**
- `GET /api/prompts/daily` - Today's reflection prompt

**LMS:**
- `POST /api/lms/sync-user` - Sync to Frappe
- `POST /api/lms/enroll` - Course enrollment
- `GET /api/lms/progress` - Progress tracking
- `GET /api/lms/course/[slug]` - Course details
- `POST /api/lms/complete-lesson` - Mark complete

**Other:**
- `POST /api/checkout` - Stripe checkout session
- `GET/POST /api/profile` - User profile
- `POST /api/leads` - Lead capture (fire-and-forget)

---

## Chapter 6: Business & Operations

### 6.1 Pricing Model

Camino offers four tiers: three for individuals (B2C) and one for organizations (B2B).

---

#### INDIVIDUAL TIERS (B2C)

| | **DISCOVER** | **JOURNEY** | **TRANSFORM** |
|---|---|---|---|
| **Price** | $97/mo | $197/mo | $497/mo |
| **Best For** | Getting started | Self-guided depth | Full transformation |
| **Trial** | 14 days free | 14 days free | 14 days free |

**Core Features:**

| Feature | DISCOVER | JOURNEY | TRANSFORM |
|---------|----------|---------|-----------|
| Reflections | 2/month | 4/month | Unlimited |
| AI Insights | 1/month | 3/month | Unlimited |
| Courses | 1/month | Unlimited | Unlimited + AI-curated |
| 1:1 Coaching | — | — | 2 sessions/month (2 hrs) |
| Support | Email | Priority | Direct Coach Access |

**AI Capabilities:**

| AI Feature | DISCOVER | JOURNEY | TRANSFORM |
|------------|----------|---------|-----------|
| Daily Prompts | Standard | Standard | Personalized by AI + Coach |
| Pattern Detection | — | Monthly summary | Real-time across all dimensions |
| AI Mirroring | — | Basic | Advanced + Coaching Integration |
| Predictive Insights | — | — | ✓ |
| Session Prep Reports | — | — | ✓ (AI briefs your coach) |
| Custom Learning Paths | — | — | ✓ |
| Weekly Summary | — | Basic email | Detailed + shared with coach |

**Pricing Psychology (Decoy Effect):**

Journey ($197) is positioned as a "decoy" to make Transform ($497) the obvious choice:

| Calculation | Value |
|-------------|-------|
| Transform coaching value | $398 (2 × $199/session) |
| Journey platform price | $197 |
| Total if purchased separately | $595 |
| Transform actual price | $497 |
| **Customer savings** | **$98/month (17%)** |

**Decision logic:** "For $300 more than Journey, I get $398 of coaching. That's a $98 discount on coaching alone, plus the platform is essentially free."

---

#### ORGANIZATION TIER (B2B): CATALYST `[PLANNED]`

For teams, schools, and enterprises implementing the full CALVO Method™ program.

**Pricing (Per Seat):**

| Seats | Enterprise | Education (40% off) |
|-------|------------|---------------------|
| 10-50 | $797/seat | $478/seat |
| 51-200 | $597/seat | $358/seat |
| 201+ | $497/seat | $298/seat |

**Minimum commitment:** 10 seats

**What's Included:**

| Feature | CATALYST |
|---------|----------|
| **Program** | Full 12-week CALVO Method™ |
| **Structure** | 84 days daily AI + 6 group coaching sessions |
| **Phases** | Identity (wks 1-4) → Worldview (wks 5-8) → Relationship (wks 9-12) |
| **Integration** | Weeks 13-16: 3x/week AI + 2 optional sessions |
| **Total Contact** | 21-42 hours AI + 6 hours group coaching per person |

**Platform Features:**

| Feature | 10-50 seats | 51-200 seats | 201+ seats |
|---------|-------------|--------------|------------|
| Admin Dashboard | Basic | Advanced | Custom |
| Progress Reporting | Team | Department | Org-wide + benchmarking |
| Cohort Management | 1 cohort | Multiple | Unlimited |
| Implementation | Self-guided | Dedicated CSM | Dedicated team |
| Training | Video library | Live (2 hrs) | Custom program |
| Branding | Camino | Co-branded | White-label option |

**Coaching Model:**

| Seats | Ratio | Sessions |
|-------|-------|----------|
| 10-50 | 1:10 | 6 group sessions |
| 51-200 | 1:12 | 6 group sessions |
| 201+ | 1:15 | 6 group + executive 1:1 option |

**Education-Specific Features:**

| Feature | Description |
|---------|-------------|
| SEL Alignment | CASEL framework mapped |
| Educator Program | Included (up to 15% of seats) |
| Student Tracks | General Ed, Gifted, Learning Differences, Neurodivergent |
| Parent Reports | Progress visibility portal |
| PD Credits | Available for educators |
| Research Partnership | Optional academic collaboration |

**Add-Ons:**

| Add-On | Price |
|--------|-------|
| Executive 1:1 Coaching | $199/session |
| Extended Integration (months 4-6) | $197/person |
| Facilitator Certification | $2,997/person |
| Custom Content Development | $10,000+ |
| API Integration (HRIS/LMS) | $5,000 setup + $500/mo |

---

#### ALL TIERS COMPARISON

| | **DISCOVER** | **JOURNEY** | **TRANSFORM** | **CATALYST** |
|---|---|---|---|---|
| **Type** | B2C | B2C | B2C | B2B |
| **Price** | $97/mo | $197/mo | $497/mo | $298-797/seat |
| **Duration** | Monthly | Monthly | Monthly | 12-week program |
| | | | | |
| **Reflections** | 2/mo | 4/mo | Unlimited | Daily (84 days) |
| **AI Insights** | 1/mo | 3/mo | Unlimited | Integrated |
| **Pattern Detection** | — | Monthly | Real-time | Real-time |
| **AI Mirroring** | — | Basic | Advanced | Advanced |
| **Predictive AI** | — | — | ✓ | ✓ |
| | | | | |
| **Courses** | 1/mo | Unlimited | Unlimited + AI | Full curriculum |
| **Coaching** | — | — | 2 sessions (1:1) | 6 sessions (group) |
| **Support** | Email | Priority | Direct Coach | Dedicated CSM |
| | | | | |
| **Best For** | Individuals exploring | Committed self-learners | Personal transformation | Teams & organizations |

---

#### Value Ladder

```
DISCOVER ($97/mo)
    ↓ "I want more reflections and insights..."
JOURNEY ($197/mo)
    ↓ "I need help changing my patterns..."
TRANSFORM ($497/mo)
    ↓ "I want this for my whole team..."
CATALYST ($298-797/seat)
```

### 6.2 Success Metrics `[LIVE]`

Tracked via `activation_funnel` Postgres view:

| Metric | Measurement | Target |
|--------|-------------|--------|
| Signups | `auth.users` count | - |
| Engagement | Users with 1, 2, 3 reflections | - |
| Activation | First insight viewed | 60% within 7 days |

### 6.3 Operational Workflow

**Linear-to-Worktree Process:**

1. **Ticket**: Feature starts as Linear Issue (e.g., `HOW-123`)
2. **Branch**: Created as `feature/HOW-123-description`
3. **Worktree**: Isolated development in `worktrees/HOW-123-*`
4. **Migration**: SQL files include ticket ID
5. **Deployment**: Merge to `main` triggers Vercel + Docker builds

---

## Chapter 7: Roadmap

### 7.1 Completed (Phase 1: Foundation)

**Core Features:**
- HOW-160: Activation Moment (3 reflections + 1 insight)
- HOW-177: Analytics (`user_activations`, `activation_funnel`)
- HOW-180: Onboarding Flow (welcome → quiz → reflections → celebration)
- HOW-499: Lead Capture (fire-and-forget email)
- HOW-511: Prompts System (28 prompts across 3 dimensions)

**Security Hardening (HOW-482 through HOW-491):**
- SQL injection prevention, PII removal, ownership verification
- XSS protection, CSRF tokens, rate limiting
- Honeypot validation, command injection prevention, SVG sanitization

**Marketing Pages:**
- HOW-469: Pricing page
- HOW-470: Life Model Framework
- HOW-471: Before/After examples

### 7.2 In Progress (Phase 2: Journey)

- **LMS Frappe Deployment**: Docker setup complete, awaiting production
- **Stripe Product Configuration**: Checkout flow exists, needs price IDs
- **Gemini AI Integration**: Replace placeholder with real AI
- **Subscription System Merge**: Ready in `subscription-system` worktree

### 7.3 Planned

- **3 Engagement Tracks**: Standard, Creative, Deep Dive prompt variants
- **Integration Engine**: AI pattern → course recommendation logic
- **Weekly Summary "Wrapped"**: Enhanced email with visualizations
- **Admin Dashboard CRUD**: Complete user/course management

### 7.4 Future (Phase 3: 2026)

- **The Three Shifts**: Advanced identity work
- **Community Features**: Peer connections and sharing
- **Advanced Analytics**: Personal growth visualizations

---

## Chapter 8: Design System & Brand

### 8.1 Visual Philosophy

**"Calm Technology"** - Minimal, spacious, intentional.

| Element | Value |
|---------|-------|
| **Palette** | Stone (Grounding), Amber (Insight), Emerald (Growth) |
| **Color Space** | OKLCH for perceptual uniformity |
| **Typography** | Geist Sans (UI), Georgia (Reading) |
| **Gamification** | None. No pings, badges, or streaks UI. |

---

## Appendices

### Appendix A: Operational Runbooks

**Manual MVP Protocol** (for early testing):
1. Onboard user
2. Send Day 1-7 prompts (Baseline)
3. Review Day 7 patterns
4. Assign courses manually
5. Send Day 8-30 prompts (Integration)

### Appendix B: Prompt Engineering Guidelines

- **The Mirror**: Reflect back, don't advise
- **The Bridge**: Connect course concepts to lived experience
- **The Lens**: Identify cognitive patterns, not prescribe fixes

### Appendix C: Key File References

| Component | Path |
|-----------|------|
| Database Migrations | `walter-marketing/supabase/migrations/*.sql` |
| AI Insights Service | `walter-marketing/lib/insights/service.ts` |
| Prompts System | `walter-marketing/supabase/migrations/20250105_prompts_system.sql` |
| Subscription System | `worktrees/subscription-system/.../001_subscription_system.sql` |
| API Routes | `walter-marketing/app/api/*/route.ts` |
| Security Config | `walter-marketing/next.config.ts` |
| Validation Schemas | `walter-marketing/lib/validation/` |
| Analytics | `walter-marketing/lib/analytics/` |
| Email Templates | `walter-marketing/app/api/emails/*/route.ts` |
| LMS Integration | `walter-marketing/lib/lms/*.ts` |
| Onboarding Pages | `walter-marketing/app/onboarding/` |
| Tests | `walter-marketing/__tests__/`, `walter-marketing/tests/` |

### Appendix D: Environment Variables

Required for production deployment:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI
GOOGLE_AI_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# LMS
LMS_API_URL=
LMS_API_KEY=
LMS_API_SECRET=
```

### Appendix E: Glossary of Terms

This glossary defines all key terms used in Camino, including technical criteria, rationale, and examples.

---

#### CORE CONCEPTS

##### Reflection

| Attribute | Definition |
|-----------|------------|
| **What it is** | A user's written response to a daily prompt—the fundamental unit of self-exploration in Camino |
| **Technical** | Database record with `content`, `mood`, `prompt_id`, `dimension`, `created_at` |
| **Contains** | Free-text response, mood indicator (good/neutral/low), linked prompt, dimension tag |
| **User sees** | A journaling interface with the day's prompt and a text area for their response |

**Example Reflection:**
> **Prompt:** "What belief about yourself feels most limiting right now?"
> **Response:** "I keep thinking I'm not experienced enough to lead. Even when I get good feedback, I dismiss it as luck or lowered expectations."
> **Mood:** neutral
> **Dimension:** identity

---

##### Insight

| Attribute | Definition |
|-----------|------------|
| **What it is** | An AI-generated pattern or observation derived from analyzing multiple reflections |
| **Technical** | Generated after 3+ reflections; stored with `type`, `title`, `content`, `reflection_ids` |
| **Types** | `pattern` (recurring theme), `theme` (grouping), `lens_shift` (perspective change) |
| **User sees** | A card/panel showing the AI's observation about their thinking patterns |

**Example Insight:**
> **Type:** Pattern
> **Title:** "The Competence Question"
> **Content:** "Across your last three reflections, I notice a recurring theme: when your competence is questioned—even subtly—you shift to self-doubt rather than curiosity. This 'Performance Lens' may be filtering how you interpret feedback."

**Why insights matter:** They prove the AI understands the user's unique psychology, creating the "aha moment" that drives engagement.

---

##### Activation

| Attribute | Definition |
|-----------|------------|
| **What it is** | The moment a user realizes Camino is more than a journal—the product's key success metric |
| **Criteria** | User completes **3 reflections** AND **views 1 insight** |
| **Technical** | Triggers `user_activation_achieved` event; recorded in `user_activations` table |
| **Target** | 60% of signups activate within 7 days |

**Why 3 reflections?**
| Reason | Explanation |
|--------|-------------|
| **Statistical validity** | 3 data points establish a trend vs. an anomaly |
| **AI quality** | Minimum dataset for meaningful pattern detection |
| **Psychological research** | Users experience "aha" between reflection 2-3 |
| **Time investment** | ~30-45 minutes total (10-15 min each)—enough to feel invested |

**The Activation Funnel:**
```
Signup (100%) → R1 (80%) → R2 (70%) → R3 (65%) → Insight Viewed (60%) = ACTIVATED
```

---

##### Prompt

| Attribute | Definition |
|-----------|------------|
| **What it is** | A daily question designed to surface patterns, beliefs, and insights |
| **Technical** | Stored in `prompts` table with `text`, `dimension`, `day_number`, `phase`, `tags` |
| **Rotation** | 28-day cycle; `day_number = (days_since_signup % 28) + 1` |
| **User sees** | One new prompt each day on their reflect page |

**Prompt Design Principles:**
- Open-ended (not yes/no)
- Emotionally safe but probing
- Dimension-specific (identity, worldview, or relationships)
- No advice embedded—purely reflective

**Example Prompts by Dimension:**
| Dimension | Example Prompt |
|-----------|----------------|
| Identity | "What did you learn about yourself today that surprised you?" |
| Worldview | "What assumption about how the world works did you question today?" |
| Relationships | "What pattern in your relationships keeps repeating?" |

---

##### Dimension

| Attribute | Definition |
|-----------|------------|
| **What it is** | One of three psychological axes for self-exploration |
| **The Three** | Identity, Worldview, Relationships |
| **Technical** | Enum: `'identity' | 'worldview' | 'relationships'` |
| **Distribution** | Prompts and insights are tagged and balanced across all three |

**The Three Dimensions Explained:**

| Dimension | Core Question | Focus Areas | Transformation |
|-----------|---------------|-------------|----------------|
| **Identity** | "Who am I?" | Self-concept, authenticity, worth, beliefs about self | Conditional → Inherent worth |
| **Worldview** | "How does reality work?" | Assumptions, perspectives, meaning-making | Scarcity → Abundance |
| **Relationships** | "How do I connect?" | Patterns, boundaries, attachment, contribution | Isolation → Interconnection |

**Why these three:** They cover the complete psychological person (self, world, others) and align with Camino's Three-Dimensional Coherence Model.

---

##### Lens

| Attribute | Definition |
|-----------|------------|
| **What it is** | An unconscious semantic filter through which a user interprets reality |
| **Status** | Core philosophy concept; `[PLANNED]` for AI detection |
| **Types** | Performance Lens, Scarcity Lens, Victim Lens, Achievement Lens, etc. |
| **User sees** | (Future) Insights that identify which lens is active |

**Example Lenses:**
| Lens | How it distorts | Example |
|------|-----------------|---------|
| **Performance** | Views everything through productivity/achievement | Rest feels like laziness |
| **Scarcity** | Views world as lacking resources/opportunity | A neutral email feels like a threat |
| **Victim** | Views self as powerless to circumstances | Problems are always external |

**Why it matters:** Lenses explain *how* limiting beliefs affect outcomes. A "lens shift" insight is the highest-value type.

---

##### Phase

| Attribute | Definition |
|-----------|------------|
| **What it is** | A stage in the 84-day transformation journey |
| **Technical** | Enum in prompts table: `'foundation' | 'exploration' | 'integration'` |
| **Current** | Only Foundation (Days 1-28) is implemented |

**The Three Phases:**

| Phase | Days | Focus | What User Does | Status |
|-------|------|-------|----------------|--------|
| **Foundation** | 1-28 | Build awareness | Daily reflections across 3 dimensions | `[LIVE]` |
| **Exploration** | 29-56 | Deepen understanding | Psychometrics, assessments, pattern analysis | `[PLANNED]` |
| **Integration** | 57-84 | Apply learnings | Personal history mapping, action experiments | `[PLANNED]` |

---

##### Streak

| Attribute | Definition |
|-----------|------------|
| **What it is** | Consecutive days of reflection activity |
| **Technical** | `profiles.streak_days` integer; resets to 0 if day missed |
| **User sees** | (Future) Streak counter on dashboard |

**Streak Milestones:**
| Milestone | Days | Significance |
|-----------|------|--------------|
| First Week | 7 | Habit formation begins |
| Two Weeks | 14 | Pattern data becomes robust |
| Month | 30 | Deep commitment indicator |

---

#### SUBSCRIPTION TIERS

##### Discover ($97/mo)

| Attribute | Value |
|-----------|-------|
| **Price** | $97/month |
| **Purpose** | Entry point—prove value, enable exploration |
| **Trial** | 14 days free |
| **Reflections** | 2/month |
| **AI Insights** | 1/month |
| **AI Features** | Basic (no pattern detection, no mirroring) |
| **Courses** | 1/month |
| **Support** | Email |

---

##### Journey ($197/mo)

| Attribute | Value |
|-----------|-------|
| **Price** | $197/month |
| **Purpose** | Self-guided depth—for committed explorers |
| **Trial** | 14 days free |
| **Reflections** | 4/month |
| **AI Insights** | 3/month |
| **AI Features** | Standard (monthly patterns, basic mirroring) |
| **Courses** | Unlimited |
| **Support** | Priority |

---

##### Transform ($497/mo)

| Attribute | Value |
|-----------|-------|
| **Price** | $497/month |
| **Purpose** | Full transformation with human coaching |
| **Trial** | 14 days free |
| **Reflections** | Unlimited |
| **AI Insights** | Unlimited |
| **AI Features** | Advanced (real-time patterns, predictive, coaching integration) |
| **Courses** | Unlimited + AI-curated paths |
| **Coaching** | 2 sessions/month (2 hrs total, $398 value) |
| **Support** | Direct coach access |

---

##### Catalyst ($298-797/seat) — B2B

| Attribute | Value |
|-----------|-------|
| **Price** | $797/seat (10-50), $597/seat (51-200), $497/seat (201+) |
| **Education** | 40% discount on all tiers |
| **Purpose** | Organizational transformation via CALVO Method™ |
| **Program** | 12-week structured (84 days) |
| **Phases** | Identity → Worldview → Relationship → Integration |
| **AI Engagement** | Daily, 15-30 min (21-42 hours total) |
| **Coaching** | 6 group sessions (1:10-1:15 ratio) |
| **Outcome** | Grounded Generosity — stable identity enabling sustainable contribution |

**Why "Catalyst":**
- Implies multiplication effect (one investment → many transformations)
- You become the spark for organizational change
- Natural progression: DISCOVER → JOURNEY → TRANSFORM → CATALYST

---

##### Tier Comparison Matrix

| Feature | Discover | Journey | Transform | Catalyst |
|---------|----------|---------|-----------|----------|
| **Type** | B2C | B2C | B2C | B2B |
| **Price** | $97/mo | $197/mo | $497/mo | $298-797/seat |
| **Duration** | Monthly | Monthly | Monthly | 12-week program |
| **Reflections** | 2/month | 4/month | Unlimited | Daily (84 days) |
| **AI Insights** | 1/month | 3/month | Unlimited | Integrated |
| **Pattern Detection** | — | Monthly | Real-time | Real-time |
| **AI Mirroring** | — | Basic | Advanced | Advanced |
| **Predictive Insights** | — | — | ✓ | ✓ |
| **Courses** | 1/month | Unlimited | Unlimited + AI | Full curriculum |
| **Coaching** | — | — | 2 sessions (1:1) | 6 sessions (group) |
| **Support** | Email | Priority | Direct Coach | Dedicated CSM |

##### AI Feature Breakdown by Tier

| AI Capability | Discover | Journey | Transform | Catalyst |
|---------------|----------|---------|-----------|----------|
| Daily prompts | Generic | Generic | Personalized | CALVO Method™ |
| Insight generation | 1/month cap | 3/month cap | Unlimited | Integrated |
| Pattern detection | None | 30-day lookback | Full history | Full history |
| AI mirroring depth | None | Surface themes | Deep behavioral | Deep behavioral |
| Course recommendations | Manual | Basic suggestions | AI-curated paths | Full curriculum |
| Weekly summary | None | Basic email | Detailed + coach | Org dashboard |
| Coaching integration | — | — | AI preps coach | Group + optional 1:1 |
| Predictive insights | — | — | ✓ | ✓ |

---

#### ADDITIONAL TERMS

##### Engagement Tracks `[PLANNED]`

| Track | Description | Prompt Style |
|-------|-------------|--------------|
| **Standard** | Balanced mix of writing and reflection | Direct, clear questions |
| **Creative** | Metaphor-rich, artistic prompts | "If your day was weather..." |
| **Deep Dive** | Therapy-adjacent probing | Intense, emotionally exploratory |

*Not yet implemented—all users currently receive Standard track.*

---

##### Integration Engine `[PLANNED]`

| Attribute | Definition |
|-----------|------------|
| **What it is** | AI system that recommends courses based on detected patterns |
| **How it works** | Analyzes insight themes → Maps to relevant courses → Suggests 2/month |
| **Example** | User shows "perfectionism" pattern → Recommends "Imposter Syndrome" course |

---

##### Mood

| Attribute | Definition |
|-----------|------------|
| **What it is** | User's emotional state when writing a reflection |
| **Options** | `good`, `neutral`, `low` |
| **Purpose** | Contextualizes reflection content; enables mood tracking over time |

---

##### Tags

| Attribute | Definition |
|-----------|------------|
| **What it is** | Metadata labels on prompts and insights |
| **Examples** | `self-discovery`, `authenticity`, `values`, `perspective`, `burnout` |
| **Purpose** | Enable filtering, pattern grouping, and course recommendations |

---

#### QUICK REFERENCE: WHY THESE NUMBERS?

**B2C Tiers:**

| Number | Where Used | Rationale |
|--------|------------|-----------|
| **3** | Reflections for activation | Minimum for pattern detection; psychological "trend" threshold |
| **7** | Days to activation target | Captures engaged users before drop-off; aligns with habit research |
| **28** | Prompt rotation cycle | 4 weeks = monthly renewal; enough variety to prevent repetition |
| **60%** | Activation rate target | Industry benchmark for "activated" users; predicts retention |
| **$97** | Discover price | Entry point; low enough to try, high enough to signal value |
| **$197** | Journey price | Decoy tier; good value but strategically positioned below Transform |
| **$497** | Transform price | Includes $398 coaching value + platform; 17% savings vs. separate purchase |
| **$199** | Coaching session rate | Market rate for quality life coaching; 2 sessions = $398/month value |
| **2** | Reflections in Discover | Creates scarcity; pushes serious users toward higher tiers |
| **4** | Reflections in Journey | Moderate limit; weekly reflection pace |

**B2B Tier (CATALYST):**

| Number | Where Used | Rationale |
|--------|------------|-----------|
| **12** | Program weeks | Research-based: 3 phases × 4 weeks = sustainable transformation |
| **84** | Program days | 12 weeks of daily engagement; enough for habit formation |
| **6** | Coaching sessions | Strategic placement: weeks 1, 3, 6, 8, 10, 12 for depth + integration |
| **$797** | Per seat (10-50) | Premium positioning; includes full program + group coaching |
| **$497** | Per seat (201+) | Volume discount; scales for enterprise |
| **40%** | Education discount | Standard institutional discount; enables school adoption |
| **10** | Minimum seats | Ensures cohort viability for group coaching dynamics |
| **1:10-1:15** | Coaching ratio | Optimal group size for depth + efficiency |

---

*The Camino Master Manual v6.0*
*Last Updated: December 2025*
