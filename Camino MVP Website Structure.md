# **Camino MVP Website Structure**

## **0\) Purpose**

A lean, conversion‑oriented site that proves demand for *guided reflection* and routes users into: (1) free Reflect app, (2) $19.95/mo Journey (LMS), (3) $1,000/mo Coaching beta.

---

## **1\) Routes & IA (Information Architecture)**

* **/** — Home

* **/how-it-works** — Product tour (Reflect → Insights → Journey)

* **/pricing** — Plans & checkout

* **/journal** — Free prompt lead magnet (try before signup)

* **/signup**, **/login**, **/reset-password**

* **/app** — Auth wall → Reflect dashboard (MVP web app shell)

  * **/app/reflect** — Daily prompt \+ editor

  * **/app/insights** — AI summaries & patterns

  * **/app/profile** — Settings, exports, billing link

* **/journey** — LMS overview (features \+ CTA to subscribe)

* **/coaching** — 1:1 program overview \+ application form

* **/about** — Story, team, manifesto excerpt

* **/essays** — (optional MVP) SEO/essays list

  * **/essays/{slug}**

* **/manifesto** — Shareable philosophy page

* **/support** — FAQ \+ contact

* **/legal/privacy**, **/legal/terms**, **/legal/cookies**

**Primary nav:** How it works · Pricing · Coaching · Essays (optional) · Login · **Start your Camino** (CTA)  
 **Footer:** About · Manifesto · Essays · Support · Legal · Social

---

## **2\) Page‑by‑Page Structure**

### **Home (/)**

* **Hero**

  * H1: *Guided reflection for a meaningful life.*

  * Subhead: One‑line value proposition

  * CTAs: **Start your Camino** (signup) · **See how it works**

  * Visual: path/compass motif

* **Problem → Outcome**

  * Pain (noise, burnout) → Outcome (clarity, deliberate action)

* **Three Pillars** (feature trio)

  * Reflect · Discover · Grow (icons \+ 1‑liners)

* **Product snapshots** (3 screenshots)

* **Social proof** (3 quotes \+ avatars)

* **Pricing teaser** (table summary \+ link)

* **Lead magnet** (email capture: “Get your first prompt”)

* **SEO block** (short essay teaser)

  ### **How It Works (/how-it-works)**

* **Onboarding snapshot** (2–3 questions → Life Lens)

* **Daily rhythm** (2–4 minutes/day, streaks)

* **Insights** (themes, emotions, patterns)

* **Journeys** (modules & outcomes)

* **Privacy** (plain‑language data blurb)

* **CTA:** Start free

  ### **Pricing (/pricing)**

* **Plan cards**

  * Reflect (Free) — prompts \+ basic insights

  * Journey ($19.95/mo) — full curriculum \+ adaptive plan \+ exports

  * Coach ($1,000/mo) — 1:1 coaching (3‑month min)

* **FAQ** (billing, cancel anytime)

* **Trust** (Stripe, SSO)

* **CTA buttons** wired to checkout

  ### **Journal Lead Magnet (/journal)**

* **Try a Prompt** (inline editor)

* **Gate**: “See your first insight” → email/signup

* **Post‑gate**: 1–2 AI observations \+ invite to Journey

  ### **App Shell (/app)**

* **Global layout** (sidebar: Reflect / Insights / Profile)

* **/app/reflect**

  * Today’s prompt (title \+ context) \+ editor

  * Save, Streak, Next prompt

* **/app/insights**

  * Weekly summary card

  * Pattern chips (e.g., “control”, “belonging”)

  * Suggested lesson tiles (links to /journey)

* **/app/profile**

  * Account, exports (.txt/.json), notifications

  * Billing portal (Stripe link)

    ### **Journey (/journey)**

* Program overview (modules, outcomes, time reqs)

* What you’ll get (videos, exercises, reflections)

* Student stories (2–3 quotes)

* CTA: Subscribe → Stripe → LMS enroll (Thinkific/Teachable)

  ### **Coaching (/coaching)**

* Promise: A guide for your inner work & performance

* What’s included (biweekly calls, AI follow‑ups)

* Who it’s for (checklist)

* Application form (Typeform/Calendly)

  ### **About (/about)**

* Story (why Camino)

* Mini bios (Walter & Chris)

* Manifesto excerpt \+ link

  ### **Support (/support)**

* FAQs (account, billing, privacy, exports)

* Contact form

  ### **Legal (/legal/\*)**

* Privacy · Terms · Cookies

  ---

  ## **3\) Component Inventory (Design System)**

* Header (nav \+ CTA)

* Hero block (H1 \+ subhead \+ dual CTA)

* Feature trio cards (icon/title/body)

* Screenshot carousel (single image on mobile)

* Testimonial strip (avatar/name/quote)

* Pricing table (monthly; annual toggle later)

* FAQ accordion

* Lead capture (inline \+ modal)

* App editor (prompt, textarea, save)

* Insight chips & summary card

* Footer (compact)

  ---

  ## **4\) Content & Copy Map (MVP)**

* **H1:** Guided reflection for a meaningful life.

* **Value 1‑liner:** Understand your patterns, act with purpose, and grow with a calm, intelligent guide.

* **Pillars:**

  * Reflect — Gentle prompts that meet you where you are.

  * Discover — AI that mirrors your themes back to you.

  * Grow — Short practices that become lasting change.

* **Journal CTA copy:** Try a 3‑minute prompt. Notice something real.

* **Privacy blurb:** Your words are yours. Encrypted, exportable, and never sold.

  ---

  ## **5\) User Flows**

**A) Free → Paid**

1. Home → /journal (sample prompt)

2. Gate → signup

3. Post‑gate insight → /pricing (Journey upsell)

4. Stripe checkout → LMS enroll webhook → welcome email

**B) Reflect habit**

1. Signup → onboarding Qs → /app/reflect

2. Daily email nudge → submit → streak \+ micro‑insight

3. Weekly summary → suggest Journey lesson

**C) Coaching lead**  
 Home/Insights → /coaching → apply → Calendly → close 5–10 beta clients

---

## **6\) Tech Integrations**

* **Auth/Data:** Supabase (tables: users, prompts, entries, insights)

* **AI:** OpenAI (summaries, pattern extraction)

* **Payments:** Stripe (Checkout \+ Customer Portal)

* **LMS:** Thinkific/Teachable (SSO linkback)

* **Email:** ConvertKit/MailerLite (onboarding, nudges)

* **Analytics:** PostHog (events below)

  ---

  ## **7\) Analytics Events (PostHog)**

* `view_home`, `cta_click_home_start`

* `start_prompt_trial`, `complete_prompt_trial`

* `signup_complete`, `onboarding_complete`

* `entry_saved`, `streak_day_n`

* `insight_viewed`, `suggested_lesson_click`

* `checkout_opened`, `checkout_completed`

* `coach_apply_started`, `coach_apply_submitted`

  ---

  ## **8\) SEO/Performance/Accessibility**

* Titles/Meta: “Camino — Guided reflection for a meaningful life”

* Schema: Organization, SoftwareApplication, Article

* OG image: path motif with H1 overlay

* Perf: Next.js Image, lazy‑load screenshots, edge caching

* A11y: high contrast, keyboard nav, reduced‑motion respect, labels on inputs, ARIA on dialogs

  ---

  ## **9\) CMS Schema (for essays & prompts)**

**Posts**: title, slug, excerpt, body (MDX), cover\_image, tags\[\], published\_at, seo\_title, seo\_description

**Prompts**: id, title, body\_md, category, difficulty, suggested\_next\_ids\[\]

**Testimonials**: name, role, avatar\_url, quote, visible

---

## **10\) Launch Checklist (MVP)**

* Domain \+ SSL

* Stripe products (Reflect=Free, Journey=$19.95, Coach=manual)

* Webhooks: Stripe → LMS enroll; signup → email welcome

* 12 starter prompts \+ 2 sample insights

* 4 LMS modules live (videos \+ exercises)

* 3 testimonials (seed)

* Privacy/Terms pages

* Uptime & error logging (Sentry)

  ---

  ## **11\) Future Hooks (post‑MVP)**

* Streak badges \+ shareable insight cards

* Referral program

* Mobile‑responsive PWA shell

* Coach portal (Year 2\)

---

# **Camino — Home Page Content**

## **Hero Section**

**Headline:** Guided reflection for a meaningful life.

**Subheadline:** Understand your patterns, act with purpose, and grow with a calm, intelligent guide.

**Primary CTA:** Start your Camino  
 **Secondary CTA:** See how it works

**Visual:** A soft, winding golden path through morning fog, symbolizing clarity emerging through reflection.

---

## **Problem → Outcome**

**Pain:** The world rewards noise and speed. Most people have never been taught to pause, reflect, and understand their inner patterns.  
 **Outcome:** Camino gives you a daily structure for thoughtful reflection and personal clarity—so you can move through life with awareness, purpose, and peace.

**CTA:** Try your first reflection free.

---

## **The Three Pillars**

**Reflect** — Gentle daily prompts that meet you where you are.  
 **Discover** — AI mirrors your words back to you, revealing hidden patterns.  
 **Grow** — Micro‑practices and insights turn awareness into sustainable change.

---

## **Product Snapshots**

1. **Reflect:** Daily prompt \+ calm editor interface.

2. **Insights:** AI‑generated themes such as *connection*, *balance*, or *self‑trust.*

3. **Journey:** Structured learning paths to deepen emotional intelligence and purpose.

---

## **Social Proof**

“Camino helped me see my life differently—not as something to fix, but as something to understand.”  
 *— Early beta user*

“I use Camino every morning before work. It’s like therapy, journaling, and strategy—all in one.”  
 *— Coaching client*

---

## **Pricing Teaser**

| Plan | Description | Price |
| ----- | ----- | ----- |
| **Reflect** | Free guided journaling \+ AI insights | Free |
| **Journey** | Full reflection curriculum \+ adaptive lessons | $19.95/mo |
| **Coach** | 1:1 guided coaching (3‑month minimum) | $1,000/mo |

CTA: See all plans → /pricing

---

## **Lead Magnet**

**Headline:** Try your first guided reflection.

**Subtext:** Take three minutes to notice something real.  
 **CTA:** Start now → /journal

---

## **Footer**

**Tagline:** Guided reflection for a meaningful life.  
 **Links:** How it works · Pricing · Coaching · About · Manifesto · Essays · Support · Legal · Social

**Copyright:** © 2025 Camino

---

# **Camino — How It Works Page Content**

## **Hero Section**

**Headline:** See how guided reflection transforms your day.

**Subheadline:** Camino blends human wisdom with adaptive AI to help you reflect, discover patterns, and grow with clarity.

**Primary CTA:** Start your Camino  
 **Secondary CTA:** Try a free reflection

**Visual:** Clean three-step graphic flow: Reflect → Discover → Grow.

---

## **Section 1: The Daily Flow — Reflect**

**Headline:** A daily moment to pause and listen to yourself.

**Copy:** Each morning, Camino offers a guided prompt designed to draw your attention inward. The prompts are crafted from psychology, philosophy, and coaching practice—built to reveal what matters most right now.  
 You write freely. Camino listens and helps you connect the dots.

**Visual:** Editor UI showing prompt \+ journal entry in progress.

**CTA:** Try a reflection → /journal

---

## **Section 2: Discover Patterns — Insights**

**Headline:** Your words reveal your patterns.

**Copy:** Camino’s AI reads between the lines of your reflections, gently surfacing themes like belonging, self-doubt, resilience, and purpose.  
 You’ll start noticing connections that were always there—but never this clear.

**Visual:** Insight dashboard with highlighted keywords or emotion tags.

**CTA:** Explore insights → /app/insights

---

## **Section 3: Grow With Guidance — Journey**

**Headline:** Structured learning for lasting growth.

**Copy:** The Camino Journey is a guided curriculum that turns awareness into action. Through weekly lessons, reflection exercises, and short videos, you’ll develop habits of emotional clarity, focus, and resilience.  
 Each step builds toward what we call *a life well lived.*

**Visual:** LMS module cards with progress indicators.

**CTA:** Joi

---

# **Camino — Pricing Page Content**

## **Hero Section**

**Headline:** Simple plans for every path.

**Subheadline:** Start reflecting for free, or unlock deeper guidance through structured journeys and personalized coaching.

**Primary CTA:** Start your Camino  
 **Secondary CTA:** Try guided reflection free

**Visual:** Tiered pricing cards with subtle gradient backgrounds symbolizing depth and progression.

---

## **Section 1: Pricing Overview**

| Plan | Description | Price |
| ----- | ----- | ----- |
| **Reflect** | Daily guided journaling \+ basic AI insights | **Free** |
| **Journey** | Full reflection curriculum \+ adaptive learning path | **$19.95/mo** |
| **Coach** | 1:1 hybrid coaching with personalized guidance | **$1,000/mo (3-month minimum)** |

**CTA:** Start free → /signup

---

## **Section 2: Reflect — The Foundation**

**Headline:** Start where you are.

**Copy:** Begin your Camino with free daily refl

---

# **Camino — Journal (Free Prompt Lead Magnet) Page Content**

## **Hero Section**

**Headline:** Try your first guided reflection.

**Subheadline:** Take three minutes to notice something real. Experience how Camino helps you turn reflection into insight.

**Primary CTA:** Start reflecting now  
 **Secondary CTA:** Learn how Camino works → /how-it-works

**Visual:** Minimal journal interface preview — a centered text editor with a sample prompt and calm background gradient.

---

## **Section 1: Step Into Reflection**

**Headline:** A simple space to pause and think.

**Copy:** Begin your Camino with a single question. The prompt below invites you to write freely for a few minutes—no judgment, no pressure. Camino will help you see patterns and insights afterward.

**Visual:** Inline editor with placeholder prompt.

**Prompt Example:**

*When was the last time you felt truly present? What was happening around you?*

**CTA:** Start writing → opens in-page editor

---

## **Section 2: The Reflection Flow (Interactive)**

1. User types 2–3 paragraphs into editor.

2. On submit → modal or inline reveal: *“Processing your reflection…”*

3. AI generates a brief insight summary.

**AI Summary Example:**

*You often feel most grounded when you're in nature or in quiet moments without screens. Consider setting aside a few minutes daily to recreate that presence.*

**CTA:** See more insights → /app/insights

---

## **Section 3: Conversion Gate — Join to Save Your Insight**

**Headline:** Your insight is ready.

**Copy:** To save and revisit your reflection, create your free Camino account. Your data is private, encrypted, and always yours.

**CTA:** Create my free account → /signup

**Secondary CTA:** Continue without saving (optional preview mode)

---

## **Section 4: Why Reflection Works**

**Headline:** The science of slowing down.

**Copy:** Journaling for just five minutes a day improves focus, reduces stress, and builds emotional resilience. Camino turns that practice into a guided experience that learns and grows with you.

**Visual:** Clean infographic: “Reflect → Notice → Grow.”

---

## **Section 5: Testimonials / Early Feedback**

“This simple question hit me harder than therapy sessions.”  
 *— Early Beta User*

“Camino made reflection easy—I finally understood my thought patterns.”  
 *— Reflect User*

---

## **Section 6: Closing CTA**

**Headline:** Start your Camino today.

**Copy:** Clarity begins with a single question. Take your first step.

**CTA:** Start free → /signup

---

**Footer:** How it works · Pricing · Coaching · About · Manifesto · Essays · Support · Legal · Social  
 **Copyright:** © 2025 Camino

---

# **Camino — Signup, Login, and Reset Password Pages Content**

## **/signup — Create Account**

**Headline:** Start your Camino.

**Subheadline:** Guided reflection begins with a single step. Create your free account to start writing, saving your reflections, and discovering insights about yourself.

**Form Fields:**

* Name (optional)

* Email

* Password (minimum 8 characters)

* I agree to the Terms of Service and Privacy Policy

**Primary CTA:** Create account  
 **Secondary CTA:** Already have an account? → Log in

**Visual:** Subtle circular path animation behind form; calming gradient.

**Copy below form:**

Your reflections are private, encrypted, and belong to you.

---

## **/login — Access Your Camino**

**Headline:** Welcome back.

**Subheadline:** Pick up where you left off — your reflections and insights are waiting.

**Form Fields:**

* Email

* Password

**Primary CTA:** Log in  
 **Secondary CTA:** Forgot password? → /reset-password

**Visual:** Dimmed path motif leading into horizon (symbol of continuation).

**Microcopy:**

Having trouble logging in? Contact support → /support

---

## **/reset-password — Reset Your Password**

**Headline:** Reset your password.

**Subheadline:** Enter your email address and we’ll send you a secure link to reset it.

**Form Fields:**

* Email

**Primary CTA:** Send reset link  
 **Secondary CTA:** Back to login → /login

**Microcopy:**

Password resets are valid for 24 hours.

---

## **Shared Elements Across All Auth Pages**

**Visual Tone:** Calm, uncluttered, warm tones. Minimal distractions.

**Footer:**

* Privacy · Terms · Support

**Copyright:** © 2025 Camino

---

# **Camino — App (Reflect Dashboard) Page Content**

## **/app — Reflect Dashboard Overview**

**Purpose:** The central hub for reflection, insights, and progress tracking.

**Headline:** Welcome back to your Camino.

**Subheadline:** Your reflections, insights, and growth all in one place.

**Visual:** Minimal dashboard with three main cards: *Today’s Reflection*, *Insights*, and *Progress.*

---

## **Section 1: Today’s Reflection**

**Headline:** Today’s prompt awaits.

**Prompt Example:**

*What’s one thing you learned about yourself this week?*

**Features:**

* Rich text editor (autosave enabled)

* Character counter and streak tracker

* “Generate Insight” button (triggers AI summary)

**CTA:** Reflect now → /app/reflect

**Microcopy:**

You’ve reflected 7 days in a row — consistency builds clarity.

---

## **Section 2: Insights Snapshot**

**Headline:** Your patterns at a glance.

**Copy:** Camino surfaces key themes from your reflections — the ideas and emotions that repeat, evolve, and define your current journey.

**Visual:** Card grid with top 3 insight chips (e.g., *connection*, *growth*, *focus*).

**CTA:** View full insights → /app/insights

---

## **Section 3: Your Journey Progress**

**Headline:** Reflection turns into growth.

**Copy:** As you reflect and review your insights, Camino tracks your journey through modules on awareness, belonging, resilience, and purpose.

**Visual:** Progress bar or ring visualization showing module completion.

**CTA:** Continue your journey → /journey

---

## **Section 4: Encouragement Quote**

“The path is made by walking.” — Antonio Machado

**Subtext:** Every reflection adds another step forward.

---

## **Section 5: Secondary Navigation**

**Tabs:**

* Reflect

* Insights

* Profile

**Footer Links:** Journal · Journey · Coaching · Support · Logout

**Copyright:** © 2025 Camino

---

# **Camino — /app/reflect Page Content**

## **Page Purpose**

To provide a focused, meditative space for daily reflection. This is where users spend most of their time writing and connecting with their thoughts.

---

## **Hero / Header Section**

**Headline:** Take a moment to reflect.

**Subheadline:** Your guided prompt for today is waiting.

**Visual:** Calm minimal interface, centered text editor on soft neutral background.

---

## **Reflection Area**

**Prompt Example:**

*What emotion has been most present for you this week? What might it be teaching you?*

**Features:**

* **Text editor:** Large writing area with autosave and subtle cursor animation.

* **Timer:** Optional 5-minute reflection timer.

* **Mood selector:** Small emoji scale (🙂😐☹️) to track daily emotion.

* **Streak indicator:** Displays reflection streak days.

* **AI Insight button:** Appears after user submits entry.

**Primary CTA:** Generate Insight → /app/insights

**Secondary CTA:** Save & Close

---

## **After Submission (AI Summary Modal)**

**Headline:** Your reflection summary.

**Example Output:**

*You seem to be in a season of transition, balancing growth with uncertainty. This week’s reflections show resilience emerging from discomfort.*

**Options:**

* Save this insight to profile

* Add to Journey → /journey

**CTA:** Continue → /app/insights

---

## **Sidebar Navigation (persistent)**

* **Reflect** (active)

* **Insights**

* **Profile**

**Footer Links:** Journal · Journey · Coaching · Support · Logout

---

**Microcopy:**

Every reflection is a step forward. Keep walking your Camino.

**Copyright:** © 2025 Camino

---

# **Camino — /app/insights Page Content**

## **Page Purpose**

Provide users with clear, meaningful summaries of their reflections, revealing emotional and thematic patterns over time. The goal: turn awareness into understanding.

---

## **Header**

**Headline:** Discover what your reflections are telling you.

**Subheadline:** Camino helps you see the invisible threads connecting your thoughts, emotions, and experiences.

**Visual:** Insight dashboard with gentle animations showing tags or pattern bubbles emerging from user data.

---

## **Section 1: Weekly Summary**

**Headline:** This week’s reflection themes.

**Example Output:**

* **Theme 1:** *Resilience* — You’ve been reflecting on how challenges are shaping your confidence.

* **Theme 2:** *Connection* — You’re valuing time spent with others and seeking more meaningful interactions.

* **Theme 3:** *Direction* — You’re questioning next steps and redefining success on your own terms.

**Visual:** A set of colored insight chips or keyword clusters.

**CTA:** Deepen these insights → /journey

---

## **Section 2: Emotional Patterns**

**Headline:** How your emotions evolve over time.

**Copy:** Camino tracks emotional tone across your reflections, helping you visualize your state of mind and emotional balance over time.

**Visual:** Simple line or radial chart tracking daily mood logs (from Reflect page).

**Microcopy:**

You’ve felt most centered when focusing on connection and gratitude.

---

## **Section 3: Reflection History**

**Headline:** See how your thinking has evolved.

**Copy:** Revisit past reflections by theme or date. Camino’s AI surfaces highlights and patterns, helping you connect moments of insight across time.

**Features:**

* Filter by tag (e.g., *clarity*, *purpose*, *fear*)

* View snippet previews

* Click-through to full reflection entries

**CTA:** View full reflection → /app/reflect/{id}

---

## **Section 4: Recommended Lessons**

**Headline:** Continue your growth with guided lessons.

**Copy:** Based on your recent reflections, Camino recommends lessons from the Journey curriculum to help you take the next step.

**Example Cards:**

1. *Module 2: Belonging* — “Understanding what anchors you.”

2. *Module 3: Resilience* — “Turning challenge into growth.”

3. *Module 4: Purpose* — “Clarify what matters most.”

**CTA:** Start Lesson → /journey

---

## **Section 5: Insight Sharing (Optional Feature)**

**Headline:** Celebrate your progress.

**Copy:** Export or share your insights privately with a coach or friend. Reflection grows deeper when witnessed.

**CTAs:**

* Export Insights → PDF / CSV

* Share with Coach → /coaching

---

## **Sidebar Navigation (persistent)**

* Reflect

* Insights (active)

* Profile

**Footer Links:** Journal · Journey · Coaching · Support · Logout

**Copyright:** © 2025 Camino

---

# **Camino — /app/profile Page Content**

## **Page Purpose**

Give users control over their account, privacy, data exports, and subscription details. The tone is empowering and transparent — users should feel ownership of their reflections and data.

---

## **Header**

**Headline:** Your profile and settings.

**Subheadline:** Manage your account, privacy, and journey — your reflections belong to you.

**Visual:** Clean profile card layout: avatar circle, name, and progress summary.

---

## **Section 1: Account Overview**

**Headline:** Your Camino at a glance.

**Fields:**

* Name

* Email

* Member since (date)

* Reflection streak (e.g., “12 days in a row”)

* Subscription type (Reflect / Journey / Coach)

**CTA:** Edit profile info

---

## **Section 2: Subscription & Billing**

**Headline:** Your plan and billing.

**Copy:** Update your plan or manage payments securely through Stripe.

**Features:**

* Current plan display (Free / Journey / Coach)

* Billing date and renewal info

* Buttons:

  * Upgrade / Downgrade Plan

  * View Billing History (links to Stripe portal)

  * Cancel Subscription (confirmation modal)

**CTA:** Manage Billing → opens Stripe customer portal

**Microcopy:**

Camino uses secure, encrypted billing through Stripe. You can cancel anytime.

---

## **Section 3: Privacy & Data**

**Headline:** Your reflections are yours.

**Copy:** You have full control over your data — export, download, or delete at any time.

**Options:**

* Export Reflections (.txt / .json / .csv)

* Download AI Insights (.pdf)

* Delete All Data (confirmation required)

**Microcopy:**

Data deletions are permanent. We never sell or share your information.

---

## **Section 4: Notifications**

**Headline:** Stay in rhythm with your reflections.

**Options:**

* Daily reflection reminders

* Weekly insight summaries

* Product updates & new lessons

**CTA:** Save Preferences

---

## **Section 5: Coaching Connection (for Coach plan only)**

**Headline:** Your Coach Connection.

**Copy:** Access your personalized session notes, insights, and next scheduled call.

**Fields:**

* Assigned Coach: \[Name\]

* Next Session: \[Date \+ Time\]

* Session Notes: \[Secure link\]

**CTA:** Message Your Coach → /coaching

---

## **Footer Links**

Support · Journal · Journey · Logout

**Copyright:** © 2025 Camino

---

# **Camino — /journey Page Content**

## **Page Purpose**

Showcase the Camino Journey learning experience — a structured, self-paced curriculum that transforms reflection into growth. Designed to convert free users into paid Journey subscribers.

---

## **Hero Section**

**Headline:** Turn reflection into transformation.

**Subheadline:** The Camino Journey is your guided path toward awareness, belonging, resilience, and purpose.

**Primary CTA:** Join the Journey ($19.95/mo)  
 **Secondary CTA:** Try guided reflection free → /journal

**Visual:** Layered path motif symbolizing depth and movement through the four modules.

---

## **Section 1: What is the Camino Journey?**

**Headline:** A structured reflection curriculum for a meaningful life.

**Copy:** Journey takes you deeper than daily reflection. It’s a four-part learning system combining guided prompts, short lessons, and adaptive AI feedback — helping you build sustainable habits of self-awareness, emotional regulation, and purpose-driven action.

**Modules Overview:**

1. **Awareness** — Understand your patterns and how they shape your world.

2. **Belonging** — Cultivate connection and grounded relationships.

3. **Resilience** — Build emotional strength and composure under pressure.

4. **Purpose & Performance** — Align your daily actions with what truly matters.

**Visual:** Horizontal progression bar showing each module milestone.

---

## **Section 2: How It Works**

**Step 1:** Reflect with daily prompts designed to uncover insight.  
 **Step 2:** Camino’s AI mirrors your themes back to you — showing what’s changing over time.  
 **Step 3:** Engage with weekly lessons, micro-practices, and guided exercises.  
 **Step 4:** Track your progress and celebrate small wins.

**CTA:** Start your first module → /signup

---

## **Section 3: Inside the Experience**

**Headline:** Each module includes…

**Content Features:**

* Short video lessons by Walter Calvo

* Reflective exercises and journaling prompts

* AI-powered insight summaries

* Printable takeaway sheets

* Optional coach-guided integration sessions

**Visual:** Screenshot of a lesson interface with calm typography and progress bar.

---

## **Section 4: Benefits & Outcomes**

**Headline:** What you’ll gain from your Camino.

**List:**

* Clarity about your emotions and patterns

* Stronger emotional resilience

* Renewed sense of belonging and connection

* Purpose-driven focus in work and life

* A personal growth practice that lasts

**CTA:** Begin the Journey ($19.95/mo)

---

## **Section 5: Testimonials**

“The Camino Journey helped me understand my triggers and rebuild my confidence.”  
 *— Journey Member*

“I’ve done therapy, coaching, and journaling. Camino ties them all together.”  
 *— Early Beta Tester*

---

## **Section 6: FAQ**

**Q:** How long does each module take?  
 **A:** Most users spend 2–3 weeks per module, but you can go at your own pace.

**Q:** Can I cancel anytime?  
 **A:** Yes. You can manage or cancel your subscription anytime from your profile.

**Q:** Do I need to complete the modules in order?  
 **A:** The Journey is designed sequentially, but you can revisit or skip freely.

---

## **Section 7: Final CTA**

**Headline:** Start your Journey today.

**Copy:** Join hundreds of others building lives of awareness and purpose.

**CTA:** Subscribe now → /signup

---

**Footer:** How it works · Pricing · Coaching · About · Manifesto · Support · Legal  
 **Copyright:** © 2025 Camino

---

# **Camino — /coaching Page Content**

## **Page Purpose**

Highlight the 1:1 Camino Coaching experience — a premium program combining human insight and AI reflection tools. The goal is to convert high-intent users into coaching applicants.

---

## **Hero Section**

**Headline:** Guidance for your next evolution.

**Subheadline:** Camino Coaching blends human wisdom with intelligent reflection tools to help you grow with clarity, composure, and purpose.

**Primary CTA:** Apply for Coaching  
 **Secondary CTA:** Explore the Journey → /journey

**Visual:** Elegant portrait of Walter Calvo or a serene mentor figure, overlaid with a golden circular path.

---

## **Section 1: What Camino Coaching Is**

**Headline:** A personalized path toward your best self.

**Copy:** Camino Coaching is a 1:1 program for leaders, creators, and seekers who want structured support in integrating reflection into real change. Each engagement blends guided conversation, personalized exercises, and AI-powered insight summaries between sessions.

**Visual:** Split layout — left: coaching call photo, right: app insights dashboard.

**CTA:** Apply for Coaching → /signup

---

## **Section 2: What’s Included**

**Headline:** A three-month transformational engagement.

**Copy:** Every Camino Coaching partnership includes:

* Biweekly 60-minute sessions with Walter or a certified Camino Coach

* Personalized reflection prompts tied to your life themes

* AI-generated session summaries and progress tracking

* Custom growth plan with practical milestones

* Access to the full Camino Journey curriculum

**Visual:** Timeline graphic — Week 1 (Discovery), Week 4 (Breakthrough), Week 8 (Integration), Week 12 (Alignment).

---

## **Section 3: Who It’s For**

**Headline:** Coaching is for you if…

**List:**

* You’re navigating transition — in career, purpose, or identity.

* You lead others and want to lead from awareness, not reaction.

* You feel successful but restless, seeking deeper meaning.

* You’re ready for accountability and transformation.

**CTA:** Schedule an Intro Call → Calendly link

---

## **Section 4: Coaching Framework**

**Headline:** The Camino Method.

**Copy:**  
 Camino Coaching uses a three-part framework:

1. **Awareness:** Clarify the stories shaping your behavior.

2. **Belonging:** Strengthen connection and trust in relationships.

3. **Resilience:** Build calm composure under stress and uncertainty.

Each session closes with a reflective practice and a clear next step.

---

## **Section 5: Client Voices**

“Walter helped me reconnect with my purpose. Camino turned insight into action.”  
 *— Executive Client*

“This process gave me the courage to slow down and make the right decisions.”  
 *— Creative Professional*

**Visual:** Testimonial carousel with headshots and first names.

---

## **Section 6: Investment**

**Headline:** Your investment in growth.

**Copy:** Coaching requires a three-month commitment to create lasting results.

| Program | Duration | Price |
| ----- | ----- | ----- |
| Camino Coaching | 3 months | $1,000/mo |

**Includes:** All Journey modules \+ AI reflection tools \+ 1:1 guidance.

**CTA:** Apply Now → Application Form (Typeform/Calendly)

**Microcopy:**

Limited spots available. Applications reviewed within 48 hours.

---

## **Section 7: FAQ**

**Q:** What happens after I apply?  
 **A:** You’ll receive an email to schedule a 20-minute discovery call with Walter or a certified coach.

**Q:** Do you offer shorter sessions or single consultations?  
 **A:** Not at this time. Camino focuses on deeper, sustained transformation.

**Q:** Can companies enroll teams?  
 **A:** Yes — see Camino for Teams (coming soon in Enterprise offerings).

---

## **Section 8: Final CTA**

**Headline:** Take your Camino further.

**Copy:** Transformation begins when reflection meets action. Apply today to begin your next chapter.

**CTA:** Apply for Coaching → Application Form

---

**Footer:** How it works · Pricing · Coaching · About · Manifesto · Support · Legal  
 **Copyright:** © 2025 Camino

---

# **Camino — /coaching Page Content**

## **Page Purpose**

Highlight the 1:1 Camino Coaching experience — a premium program combining human insight and AI reflection tools. The goal is to convert high-intent users into coaching applicants.

---

## **Hero Section**

**Headline:** Guidance for your next evolution.

**Subheadline:** Camino Coaching blends human wisdom with intelligent reflection tools to help you grow with clarity, composure, and purpose.

**Primary CTA:** Apply for Coaching  
 **Secondary CTA:** Explore the Journey → /journey

**Visual:** Elegant portrait of Walter Calvo or a serene mentor figure, overlaid with a golden circular path.

---

## **Section 1: What Camino Coaching Is**

**Headline:** A personalized path toward your best self.

**Copy:** Camino Coaching is a 1:1 program for leaders, creators, and seekers who want structured support in integrating reflection into real change. Each engagement blends guided conversation, personalized exercises, and AI‑powered insight summaries between sessions.

**Visual:** Split layout — left: coaching call photo, right: app insights dashboard.

**CTA:** Apply for Coaching → /signup

---

## **Section 2: What’s Included**

**Headline:** A three‑month transformational engagement.

**Copy:** Every Camino Coaching partnership includes:

* Biweekly 60‑minute sessions with Walter or a certified Camino Coach

* Personalized reflection prompts tied to your life themes

* AI‑generated session summaries and progress tracking

* Custom growth plan with practical milestones

* Access to the full Camino Journey curriculum

**Visual:** Timeline graphic — Week 1 (Discovery), Week 4 (Breakthrough), Week 8 (Integration), Week 12 (Alignment).

---

## **Section 3: Who It’s For**

**Headline:** Coaching is for you if…

**List:**

* You’re navigating transition — in career, purpose, or identity.

* You lead others and want to lead from awareness, not reaction.

* You feel successful but restless, seeking deeper meaning.

* You’re ready for accountability and transformation.

**CTA:** Schedule an Intro Call → Calendly link

---

## **Section 4: Coaching Framework**

**Headline:** The Camino Method.

**Copy:**  
 Camino Coaching uses a three‑part framework:

1. **Awareness:** Clarify the stories shaping your behavior.

2. **Belonging:** Strengthen connection and trust in relationships.

3. **Resilience:** Build calm composure under stress and uncertainty.

Each session closes with a reflective practice and a clear next step.

---

## **Section 5: Client Voices**

“Walter helped me reconnect with my purpose. Camino turned insight into action.”  
 *— Executive Client*

“This process gave me the courage to slow down and make the right decisions.”  
 *— Creative Professional*

**Visual:** Testimonial carousel with headshots and first names.

---

## **Section 6: Investment**

**Headline:** Your investment in growth.

**Copy:** Coaching requires a three‑month commitment to create lasting results.

| Program | Duration | Price |
| ----- | ----- | ----- |
| Camino Coaching | 3 months | $1,000/mo |

**Includes:** All Journey modules \+ AI reflection tools \+ 1:1 guidance.

**CTA:** Apply Now → Application Form (Typeform/Calendly)

**Microcopy:**

Limited spots available. Applications reviewed within 48 hours.

---

## **Section 7: FAQ**

**Q:** What happens after I apply?  
 **A:** You’ll receive an email to schedule a 20‑minute discovery call with Walter or a certified coach.

**Q:** Do you offer shorter sessions or single consultations?  
 **A:** Not at this time. Camino focuses on deeper, sustained transformation.

**Q:** Can companies enroll teams?  
 **A:** Yes — see Camino for Teams (coming soon in Enterprise offerings).

---

## **Section 8: Final CTA**

**Headline:** Take your Camino further.

**Copy:** Transformation begins when reflection meets action. Apply today to begin your next chapter.

**CTA:** Apply for Coaching → Application Form

---

**Footer:** How it works · Pricing · Coaching · About · Manifesto · Support · Legal  
 **Copyright:** © 2025 Camino

---

# **Camino — /essays Page Content**

## **Page Purpose**

To host Camino’s thought leadership and reflective essays. This page builds credibility, improves SEO, and invites users into deeper conversations about awareness, resilience, and human growth.

---

## **Hero Section**

**Headline:** Reflections for the modern mind.

**Subheadline:** Essays on awareness, belonging, and resilience — written to help you live and lead with clarity.

**Visual:** Minimal editorial-style layout with serif headlines and ample whitespace.

---

## **Section 1: Featured Essays**

**Headline:** Featured reflections.

**Example Articles:**

1. **“The Art of the Pause”** — Why reflection is the missing link in performance.

2. **“Belonging in a Disconnected World”** — How self-awareness rebuilds human connection.

3. **“Resilience Isn’t Toughness”** — The science of staying open under pressure.

**CTA:** Read more → /essays/{slug}

---

## **Section 2: All Essays**

**Headline:** Explore the Camino Journal.

**Layout:** List or grid view with each card showing:

* Title

* Excerpt (1–2 lines)

* Author name

* Reading time (e.g., 4 min read)

* Publish date

**Example Entries:**

* *“Guided Reflection and the Modern Leader”* — How reflective practice shapes conscious leadership.

* *“Why Awareness Beats Motivation”* — The quiet foundation of sustainable growth.

* *“Learning to Belong to Yourself First”* — Emotional stability starts from self-trust.

---

## **Section 3: Subscribe CTA**

**Headline:** Never stop reflecting.

**Copy:** Join the Camino community and receive new essays and reflection prompts directly to your inbox.

**CTA:** Subscribe to Reflections → (integrated with Substack or ConvertKit)

**Microcopy:**

No noise, just clarity — delivered weekly.

---

## **Section 4: Author Block**

**Headline:** About the author.

**Copy:**  
 **Walter Calvo** — Founder, coach, and creator of Camino. Walter writes about self-awareness, leadership, and the intersection of psychology and human design.  
 **Chris Carter** — Designer and creative strategist shaping Camino’s product and brand experience.

**CTA:** Learn more → /about

---

## **Section 5: SEO Elements**

* Dynamic meta titles: `{Essay Title} | Camino Essays`

* Description: “Guided reflections and essays on awareness, belonging, and purpose by Camino.”

* Structured data: Article schema

* OG image: Camino Journal logo on soft background

---

**Footer:** How it works · Pricing · Coaching · About · Manifesto · Support · Legal  
 **Copyright:** © 2025 Camino

---

# **Camino — /essays/{slug} Page Content**

## **Page Purpose**

Display individual essay articles in a clean, immersive reading experience. Encourage reflection and guide users to related content, the Journey program, or newsletter subscription.

---

## **Layout Overview**

**Structure:**

* Title & subtitle

* Author \+ date \+ reading time

* Hero image (optional)

* Main essay body (MDX or CMS-driven)

* Reflective takeaway

* Related articles

* CTA block (Journey or subscription)

---

## **Example Essay Template**

### **Title**

**“The Art of the Pause”**

### **Subtitle**

Why reflection is the missing link in performance.

### **Author Line**

By *Walter Calvo* · 5 min read · Published March 2025

### **Hero Image**

A winding trail cutting through quiet morning light.

---

## **Essay Body (Example)**

We live in a world that celebrates speed. Every metric — productivity, engagement, response time — tells us faster is better. But somewhere along the way, we stopped asking whether the direction was right.

Reflection is not the opposite of action. It is the foundation of intelligent action.

When we pause, the noise fades. Our thoughts reveal their patterns. Our emotions show their lessons. And from that clarity, action becomes deliberate, not reactive.

The Camino practice turns this truth into structure — short, daily prompts that help you see what’s driving your choices and how you can realign with purpose.

“Stillness is not the absence of movement. It’s the presence of awareness.”

### **Reflective Question**

*Where in your life could a pause bring clarity?*

---

## **Reflective Takeaway Block**

**Headline:** Take this reflection with you.

**Copy:** Awareness grows in small moments of attention. Try journaling on today’s takeaway — and see what clarity emerges.

**CTA:** Start reflecting → /journal

---

## **Related Essays**

**Headline:** Continue your Camino.

**Example Cards:**

1. *“Belonging in a Disconnected World”* — The power of seeing yourself in others.

2. *“Resilience Isn’t Toughness”* — Growth begins where control ends.

3. *“Guided Reflection and the Modern Leader”* — Awareness as the new advantage.

**CTA:** View all essays → /essays

---

## **Bottom CTA**

**Headline:** Reflection changes everything.

**Copy:** Take your reflections deeper with the Camino Journey — a guided path toward awareness and belonging.

**CTA:** Join the Journey → /journey

---

## **Footer**

How it works · Pricing · Coaching · About · Manifesto · Support · Legal  
 **Copyright:** © 2025 Camino

---

# **Camino — /manifesto Page Content**

## **Page Purpose**

The heart of Camino’s philosophy. This page expresses the values, beliefs, and guiding principles behind the brand — blending poetry, clarity, and conviction. It deepens emotional connection with users and reinforces Camino’s voice: calm, wise, and human.

---

## **Hero Section**

**Headline:** The Camino Manifesto.

**Subheadline:** A declaration of what we stand for — and what we walk toward.

**Visual:** Golden circle path motif or an illuminated compass resting on an open journal.

---

## **Section 1: The Path**

**Headline:** Life is not a race. It’s a walk.

**Copy:** We move fast, but we rarely arrive. Camino exists to remind us that growth is not in the sprint — it’s in the steady rhythm of reflection. Each step, each question, each pause brings us closer to ourselves.

**Quote:**

“The path is made by walking.” — Antonio Machado

---

## **Section 2: Our Beliefs**

**Headline:** What guides our walk.

**Core Principles:**

1. **Awareness is strength.**  
    True power begins with seeing things clearly — within and without.

2. **Reflection is action.**  
    Slowing down is not stopping. It’s how direction is chosen.

3. **Belonging is built.**  
    Connection is created through understanding — of self, of others, of purpose.

4. **Resilience is openness.**  
    The strongest people are those who stay flexible, curious, and kind.

5. **Technology should serve the soul.**  
    AI is a tool for awareness, not replacement — a mirror for meaning.

---

## **Section 3: The Promise**

**Headline:** We build for humans, not habits.

**Copy:** Camino will never chase addiction loops or endless notifications. We build technology that supports reflection — not distraction. Our aim is clarity, not capture.

**Subcopy:**

We measure success by quiet moments, not clicks.

---

## **Section 4: The Invitation**

**Headline:** Walk your own Camino.

**Copy:** Your path will not look like anyone else’s. That’s the point. This is your space to pause, notice, and grow. We’re simply here to walk beside you.

**CTA:** Start reflecting → /journal

**Secondary CTA:** Read more essays → /essays

---

## **Section 5: Visual Closing**

**Visual Concept:** A looping animation of a path being drawn — circle by circle — representing the lifelong journey of reflection.

**Tagline:** Guided reflection for a meaningful life.

---

**Footer:** How it works · Pricing · Coaching · About · Support · Legal  
 **Copyright:** © 2025 Camino

---

# **Camino — Legal Pages Content**

## **/legal/privacy — Privacy Policy**

**Last updated:** October 2025

### **1\. Overview**

Camino values your privacy. Your reflections, insights, and data are encrypted and never shared or sold. This policy explains how we collect, use, and protect your information.

### **2\. Information We Collect**

* **Account Data:** Name, email, password (hashed).

* **Reflection Data:** Journal entries and insights generated through the app.

* **Usage Data:** Basic analytics (page views, clicks, device type) to improve experience.

### **3\. How We Use Your Data**

* To deliver and improve the Camino experience.

* To provide AI-generated insights based on your reflections.

* To manage your account, billing, and support requests.

### **4\. Data Ownership**

You own your reflections. Camino simply provides the tools to store and process them securely.

### **5\. AI Processing**

AI is used only to generate insights for your personal account. No reflections are shared externally or used for training external AI systems.

### **6\. Data Storage & Security**

All data is encrypted in transit and at rest using Supabase’s secure infrastructure.

### **7\. Your Rights**

You may:

* Export your data (.txt, .json, or .pdf)

* Delete your account and all data

* Opt out of AI summaries

### **8\. Contact**

For privacy inquiries: **privacy@camino.app**

---

## **/legal/terms — Terms of Service**

**Effective Date:** October 2025

### **1\. Agreement**

By creating an account or using Camino, you agree to these terms.

### **2\. Eligibility**

You must be 18 or older to use Camino’s paid services.

### **3\. Subscriptions & Billing**

* Monthly subscriptions renew automatically.

* Cancel anytime from your profile.

* Refunds are handled on a case-by-case basis.

### **4\. Intellectual Property**

All Camino content, including prompts, modules, and visuals, are property of Camino. You may not reproduce or resell materials without permission.

### **5\. User Conduct**

You agree not to:

* Misuse Camino’s platform.

* Attempt to access other users’ data.

* Use Camino for illegal or harmful activity.

### **6\. Disclaimers**

Camino is not a substitute for therapy or medical advice. It is a reflective tool designed for personal growth and development.

### **7\. Limitation of Liability**

Camino and its team are not liable for indirect, incidental, or consequential damages arising from your use of the app.

### **8\. Contact**

For support or questions about these terms: **support@camino.app**

---

## **/legal/cookies — Cookie Policy**

**Last updated:** October 2025

### **1\. Overview**

Camino uses cookies and similar technologies to improve site performance and personalize your experience.

### **2\. Types of Cookies We Use**

* **Essential Cookies:** For authentication and core functionality.

* **Analytics Cookies:** Anonymous data that helps us understand usage trends.

* **Preference Cookies:** Store user settings like theme and language.

### **3\. Managing Cookies**

You can disable cookies in your browser at any time, though some features may not function properly.

### **4\. Contact**

For cookie-related inquiries: **privacy@camino.app**

---

**Footer:** How it works · Pricing · Coaching · About · Support · Legal  
 **Copyright:** © 2025 Camino

---

# **Camino — Full Website Sitemap & Content Overview**

## **Purpose**

A complete content and navigation overview for Camino’s MVP website — summarizing all pages, URLs, and core CTAs for design, development, and marketing alignment.

---

## **Top-Level Navigation**

**Primary Nav:** How it works · Pricing · Coaching · Essays · Login · **Start your Camino (CTA)**  
 **Footer:** About · Manifesto · Essays · Support · Legal · Social

---

## **Pages Overview**

### **1\. Home (/)**

* Hero: Guided reflection for a meaningful life.

* Key Sections: Problem → Outcome, Three Pillars (Reflect · Discover · Grow), Pricing Teaser, Lead Magnet.

* CTAs: Start your Camino / Try your first reflection.

### **2\. How It Works (/how-it-works)**

* Explains the flow: Reflect → Discover → Grow.

* Visual walkthrough of app & AI insights.

* CTA: Start free.

### **3\. Pricing (/pricing)**

* Plans: Reflect (Free), Journey ($19.95/mo), Coach ($1,000/mo).

* Comparison table \+ FAQ.

* CTA: Start your Camino.

### **4\. Journal (/journal)**

* Free lead magnet — interactive reflection prompt.

* Post-entry insight \+ signup gate.

* CTA: Create my free account.

### **5\. Auth Pages (/signup, /login, /reset-password)**

* Simple forms for access.

* Messaging: “Your reflections are private, encrypted, and belong to you.”

### **6\. App (/app)**

* Dashboard: Today’s Reflection, Insights, and Progress.

* Quick access to subroutes:

  * /app/reflect → Daily prompt editor.

  * /app/insights → AI summaries & emotional patterns.

  * /app/profile → Settings, exports, billing.

### **7\. Journey (/journey)**

* Four-module LMS overview: Awareness, Belonging, Resilience, Purpose.

* Details what’s included in $19.95/mo plan.

* CTA: Join the Journey.

### **8\. Coaching (/coaching)**

* 1:1 premium coaching overview with Walter Calvo.

* Features, framework, client stories, and pricing ($1,000/mo).

* CTA: Apply for Coaching.

### **9\. About (/about)**

* Camino’s story and founding philosophy.

* Bios: Walter Calvo, Chris Carter.

* Manifesto excerpt and link to full version.

### **10\. Essays (/essays)**

* List of reflective essays for SEO and authority building.

* Featured and recent posts.

* CTA: Subscribe for updates.

### **11\. Essay Detail (/essays/{slug})**

* Individual essay layout with reflective question and related articles.

* CTA: Join the Journey.

### **12\. Manifesto (/manifesto)**

* Camino’s philosophical foundation: Awareness, Reflection, Belonging, Resilience.

* Invites visitors to “Walk your own Camino.”

* CTA: Start reflecting.

### **13\. Support (/support)**

* FAQ \+ Contact form (support@camino.app).

* Answers about account, billing, data, and coaching.

* CTA: Send Message.

### **14\. Legal Pages**

* /legal/privacy — Privacy Policy.

* /legal/terms — Terms of Service.

* /legal/cookies — Cookie Policy.

---

## **User Flow Summary**

1. **Visitor lands on Home** → Tries prompt on /journal.

2. Completes reflection → Prompted to sign up (/signup).

3. Enters app → Starts reflecting (/app/reflect).

4. Receives insights (/app/insights) → Invited to subscribe (/pricing).

5. Enrolls in Journey → Accesses modules (/journey).

6. Optional upgrade → Coaching (/coaching).

---

## **CTA Summary**

| Page | Primary CTA | Secondary CTA |
| ----- | ----- | ----- |
| Home | Start your Camino | See how it works |
| How It Works | Start free | Try a reflection |
| Pricing | Start your Camino | Try free reflection |
| Journal | Create free account | Continue without saving |
| Journey | Join the Journey | Try reflection free |
| Coaching | Apply for Coaching | Schedule intro call |
| Manifesto | Start reflecting | Read essays |
| Support | Contact Support | Read FAQ |

---

## **Visual System References**

* **Palette:** Gold, sandstone, deep slate gray.

* **Typography:** Modern serif \+ geometric sans.

* **Iconography:** Circular path motif (reflective journey).

* **Imagery:** Calm natural landscapes symbolizing clarity and progress.

---

## **SEO & Metadata**

**Title Format:** `{Page Title} | Camino — Guided Reflection for a Meaningful Life`  
 **Meta Description:** “Camino helps you reflect, grow, and live with awareness through guided journaling, AI insights, and coaching.”  
 **OG Image:** Golden path illustration \+ tagline.

---

**Final Note:**  
 This sitemap forms the structural foundation for Camino’s MVP web build and future scaling — connecting reflection, learning, and human growth into one unified experience.

---

# **Camino — Developer Handoff Document**

## **Purpose**

Provide developers with a clear, actionable breakdown of how to implement the Camino MVP website and app based on the sitemap and content documents.

---

## **Tech Stack Summary**

* **Framework:** Next.js 14 (App Router)

* **Styling:** Tailwind CSS \+ shadcn/ui components

* **Backend:** Supabase (Auth, Database, Storage)

* **AI Layer:** OpenAI API (GPT-5 for reflection summaries & insight extraction)

* **Payments:** Stripe (Subscriptions \+ Customer Portal)

* **LMS Integration:** Thinkific / Teachable (initial) or custom CMS in Supabase

* **Email:** ConvertKit / MailerLite (marketing & reflection reminders)

* **Analytics:** PostHog or Vercel Analytics

---

## **Folder Structure (Proposed)**

app/

  ├── (marketing)/

  │   ├── page.tsx                   \# Home

  │   ├── how-it-works/page.tsx

  │   ├── pricing/page.tsx

  │   ├── journal/page.tsx

  │   ├── journey/page.tsx

  │   ├── coaching/page.tsx

  │   ├── about/page.tsx

  │   ├── essays/page.tsx

  │   ├── essays/\[slug\]/page.tsx

  │   ├── manifesto/page.tsx

  │   └── support/page.tsx

  │

  ├── (auth)/

  │   ├── signup/page.tsx

  │   ├── login/page.tsx

  │   ├── reset-password/page.tsx

  │

  ├── (app)/                        \# Authenticated area

  │   ├── layout.tsx                \# Sidebar nav (Reflect / Insights / Profile)

  │   ├── page.tsx                  \# Dashboard overview

  │   ├── reflect/page.tsx

  │   ├── insights/page.tsx

  │   ├── profile/page.tsx

  │

  ├── (legal)/

  │   ├── privacy/page.tsx

  │   ├── terms/page.tsx

  │   └── cookies/page.tsx

  │

  ├── components/

  │   ├── ui/ (Button, Card, Modal, Form, Input, etc.)

  │   ├── layout/ (Header, Footer, Sidebar, NavLinks)

  │   ├── content/ (Hero, CTA, Testimonials, PricingTable)

  │   ├── journal/ (PromptEditor, InsightModal)

  │   └── shared/ (Icons, Logos, Animations)

  │

  ├── lib/

  │   ├── supabaseClient.ts

  │   ├── ai.ts (OpenAI helper functions)

  │   ├── stripe.ts

  │   └── utils.ts

  │

  ├── data/

  │   ├── prompts.json

  │   ├── modules.json

  │   └── testimonials.json

  │

  ├── styles/

  │   └── globals.css

  │

  ├── middleware.ts (auth routing)

  ├── layout.tsx (root shell)

  └── page.tsx (root redirect)

---

## **Component Mapping**

| Page | Components Used |
| ----- | ----- |
| Home | Hero, FeatureCards, Testimonials, CTASection |
| How It Works | StepsSection, ScreenshotCarousel, CTASection |
| Pricing | PricingTable, FAQAccordion, PlanCards |
| Journal | PromptEditor, InsightModal, SignupGate |
| Dashboard | DashboardCards, ProgressRing, InsightPreview |
| Reflect | PromptEditor, SaveButton, TimerWidget |
| Insights | InsightChips, Chart, LessonRecommendations |
| Profile | ProfileForm, BillingPortalButton, ExportModal |
| Journey | ModuleCards, ProgressBar, LessonPreview |
| Coaching | Timeline, TestimonialCarousel, ApplicationForm |
| About | FounderBio, ManifestoPreview, CTASection |
| Essays | ArticleCardGrid, SubscribeBanner |
| Essay Detail | ArticleBody, RelatedPosts, ReflectionPrompt |
| Manifesto | PrincipleCards, QuoteBlock, CTASection |
| Support | FAQAccordion, ContactForm |
| Legal Pages | MarkdownRenderer |

---

## **Supabase Schema Overview**

### **Tables**

1. **users**

   * id (uuid)

   * email (text)

   * name (text)

   * plan (text: free/journey/coach)

   * created\_at (timestamp)

2. **reflections**

   * id (uuid)

   * user\_id (uuid, fk → users.id)

   * prompt\_id (int)

   * content (text)

   * mood (int)

   * created\_at (timestamp)

3. **insights**

   * id (uuid)

   * user\_id (uuid)

   * summary (text)

   * themes (text\[\])

   * created\_at (timestamp)

4. **journey\_progress**

   * id (uuid)

   * user\_id (uuid)

   * module\_id (int)

   * completed (bool)

   * updated\_at (timestamp)

5. **subscriptions**

   * id (uuid)

   * user\_id (uuid)

   * stripe\_customer\_id (text)

   * plan (text)

   * status (text)

---

## **CMS Integration**

* **Essays & Prompts:** Managed via Notion or Markdown (MDX in `/data/` folder).

* **Testimonials, FAQs, and Manifesto lines:** Simple JSON files in `/data/` for static rendering.

---

## **Stripe Integration**

* Product IDs: `reflect_free`, `journey_monthly`, `coach_monthly`

* Use Stripe Checkout Sessions for upgrades.

* Sync webhook → Supabase `subscriptions` table for plan updates.

---

## **AI Integration (OpenAI)**

* **Prompt Analysis:** `analyzeReflection()` → Generates summary \+ themes.

* **Insight Retrieval:** `getInsightsForUser()` → Groups entries by pattern.

* **Lesson Recommendation:** `recommendLesson()` → Maps insights → LMS modules.

---

## **Analytics Events (PostHog)**

* `signup_complete`

* `entry_saved`

* `insight_viewed`

* `plan_upgraded`

* `lesson_completed`

* `coach_apply_submitted`

---

## **Deployment Notes**

* **Hosting:** Vercel (Next.js optimized)

* **Environment Variables:**

  * `NEXT_PUBLIC_SUPABASE_URL`

  * `NEXT_PUBLIC_SUPABASE_KEY`

  * `OPENAI_API_KEY`

  * `STRIPE_SECRET_KEY`

  * `CONVERTKIT_API_KEY`

* **SEO Config:** next-seo.json

* **Error Tracking:** Sentry optional

---

## **Developer Handoff Summary**

This document bridges content, design, and engineering. It defines:

* Full folder \+ routing architecture

* Core component mapping

* Data \+ CMS structures

* API integration points

* Analytics \+ deployment standards

Camino’s guiding principle in code and content: **build calm technology that helps humans see themselves more clearly.**

---

# **Camino — Design Handoff Document**

## **Purpose**

This document provides a full visual and interaction design guide for the Camino MVP. It ensures consistency across UI, UX, and brand expression for developers and designers working in Figma.

---

## **Design Philosophy**

Camino is built on **reflective calm** — clarity without emptiness, sophistication without noise. Every visual element should feel grounded, human, and quietly confident.

**Design principles:**

1. **Space as a function of reflection** — generous white space supports clarity.

2. **Typography as voice** — balanced between wisdom and warmth.

3. **Motion with intention** — gentle fades, slow transitions, no bounce.

4. **Color as emotion** — gold for illumination, slate for grounding, sand for humanity.

---

## **Brand System**

### **Logo**

* **Primary:** Camino wordmark with circular path mark (symbolizing reflection and growth).

* **Usage:** Horizontal for web headers, standalone mark for favicon and mobile app icon.

* **Clear space:** At least 1× logo height on all sides.

* **Minimum size:** 24px height for digital.

### **Color Palette**

| Name | Hex | Usage |
| ----- | ----- | ----- |
| **Camino Gold** | `#E2C379` | Highlights, buttons, icons |
| **Slate Gray** | `#2D2F33` | Primary text, background contrast |
| **Sandstone** | `#F4E9D8` | Backgrounds, cards |
| **Ivory** | `#FFFBF5` | Page backgrounds |
| **Midnight Ink** | `#1A1B1C` | Header/footer tone |

Gradients (optional): Gold → Sandstone linear overlay for subtle depth.

### **Typography**

| Element | Typeface | Style |
| ----- | ----- | ----- |
| Headlines | **Playfair Display** | Elegant serif, bold weight |
| Body | **Inter** | Clean sans-serif, medium/regular |
| Accents / Quotes | **Crimson Pro** | Italic or light weight for poetic tone |

### **Iconography**

* **Theme:** Line-based icons with rounded terminals.

* **Color:** Slate or gold depending on background.

* **Style:** Consistent stroke width (1.5px), minimal embellishment.

### **Photography**

* **Style:** Soft natural lighting, human-centered moments, warm tones.

* **Themes:** Paths, nature, morning light, stillness, notebooks, hands in motion.

* **Avoid:** Stock corporate scenes or high-saturation imagery.

---

## **Layout System**

* **Grid:** 12-column fluid grid (80px max gutter on desktop, 16px on mobile).

* **Breakpoints:**

  * sm: 480px

  * md: 768px

  * lg: 1024px

  * xl: 1440px

* **Spacing scale:** 4px baseline grid → 8, 16, 24, 32, 48, 64\.

* **Corner radius:** 12px standard, 24px for hero cards.

* **Elevation:**

  * Card shadow: `0px 2px 12px rgba(0,0,0,0.06)`

  * Hover state: `0px 4px 16px rgba(0,0,0,0.08)`

---

## **Component Library**

**Buttons:**

* Primary (Gold): Filled gold, dark text, rounded-xl.

* Secondary (Outline): Slate border, transparent fill.

* Text (Link): Gold underline hover.

**Cards:**

* Used for pricing, reflections, and essays.

* Background: Sandstone or Ivory.

* Rounded corners, soft shadows, and light gradient overlay.

**Forms:**

* Inputs: Minimal outline with focus glow in gold.

* Labels always visible; placeholders never primary.

* Button spacing: 24px above form bottom.

**Modals:**

* Background: \#FFFBF5 (semi-transparent overlay).

* Slide-up transition (150ms ease-in-out).

* Rounded corners (24px).

**Navigation:**

* Top Nav: Transparent until scroll → transitions to solid Ivory.

* Footer: Midnight Ink with gold links.

**CTAs:**

* Style: Bold serif heading \+ short subtext.

* Background: Gold gradient with soft animation.

---

## **Motion System**

* **Timing:** 150–300ms transitions.

* **Ease:** cubic-bezier(0.25, 0.1, 0.25, 1\)

* **Examples:**

  * Fade-in hero content on scroll.

  * Subtle underline motion on hover.

  * Insight cards slide upward gently when loaded.

---

## **Accessibility**

* Minimum contrast ratio: 4.5:1.

* Font size: 16px base (1rem).

* Keyboard focus: Gold outline glow.

* Screen reader labels for reflection prompts and insights.

---

## **Figma File Structure**

Figma

├── Brand Assets

│   ├── Logos (Horizontal, Icon)

│   ├── Color Styles

│   ├── Typography System

│   └── Icon Set

│

├── UI Components

│   ├── Buttons

│   ├── Cards

│   ├── Inputs / Forms

│   ├── Navbars / Footers

│   ├── Modals / Alerts

│   └── Layout Grids

│

├── Marketing Pages

│   ├── Home

│   ├── How It Works

│   ├── Pricing

│   ├── Journal

│   ├── Journey

│   ├── Coaching

│   ├── About / Manifesto

│   └── Essays

│

├── App (Authenticated)

│   ├── Dashboard

│   ├── Reflect (Prompt Editor)

│   ├── Insights (AI Summary)

│   ├── Profile (Settings / Billing)

│

└── Style Guide

    ├── Components Showcase

    ├── Interaction Demos

    └── Animation Prototypes

---

## **Deliverables for Developers**

1. Exported SVG logo \+ icons (filled \+ outline variants).

2. Figma link with components built as Auto Layout.

Design tokens export (Tailwind \+ CSS variables):

 :root {

  \--color-gold: \#E2C379;

  \--color-sandstone: \#F4E9D8;

  \--color-slate: \#2D2F33;

  \--radius-md: 12px;

  \--radius-lg: 24px;

  \--transition-base: 200ms ease-in-out;

}

3. 

---

## **Summary**

Camino’s design system merges calm reflection with structured clarity.  
 Every layout, color, and interaction should feel **intentional, not reactive** — evoking stillness, awareness, and growth.

---

# **Camino — Marketing Handoff Document**

## **Purpose**

This document bridges product design and marketing strategy. It outlines Camino’s tone of voice, messaging framework, launch campaigns, and ongoing content strategy — ensuring that every outward expression of the brand reflects its core philosophy of guided reflection.

---

## **Brand Positioning**

**Tagline:** Guided reflection for a meaningful life.

**Core Message:** Camino helps people slow down, gain clarity, and reconnect with purpose through guided reflection, AI insights, and human coaching.

**Elevator Pitch:**  
 Camino is where mindfulness meets performance. It blends reflection and AI to help individuals and teams build awareness, belonging, and resilience — the essential skills for meaningful living and modern leadership.

**Market Category:** Reflective performance & digital coaching.

**Audience Segments:**

1. **Reflective Seekers** — Individuals seeking emotional clarity and personal growth.

2. **Purpose-Driven Professionals** — Leaders balancing ambition and wellbeing.

3. **Corporate Clients** — Organizations investing in reflective leadership programs.

---

## **Tone of Voice**

Camino’s voice should sound **calm, clear, and wise** — never self-serious, never corporate. It’s the language of presence and perspective.

**Tone Traits:**

* **Empathetic:** Speak like a guide, not a guru.

* **Grounded:** Avoid fluff, focus on clarity and real outcomes.

* **Human:** Warm, conversational, sincere.

* **Purposeful:** Every sentence should help the reader feel more seen, not more sold to.

**Example Rewrite:**

❌ “Unlock your highest potential through cutting-edge AI.”  
 ✅ “See yourself more clearly. Grow with intention.”

---

## **Messaging Framework**

| Layer | Message | Example |
| ----- | ----- | ----- |
| **Problem** | People are burned out and disconnected from themselves. | “We move faster than we think — and lose sight of what matters.” |
| **Solution** | Camino provides a daily space for reflection and clarity. | “One reflection a day can change how you show up in life.” |
| **Benefit** | More awareness, resilience, and belonging. | “See patterns. Build balance. Lead consciously.” |
| **Proof** | Guided by experts, powered by AI, trusted by humans. | “Blending psychology, leadership, and adaptive AI.” |
| **CTA** | Start your Camino. | “Your reflection starts here.” |

---

## **Launch Campaign — Phase 1: Awareness**

**Objective:** Introduce Camino as a new category: reflective performance.

**Channels:**

* Substack essays: “The Art of the Pause,” “Why Reflection is the Future of Work.”

* LinkedIn storytelling from Walter & Chris.

* Instagram Reels: reflective visuals \+ short quotes.

* Email series: “Your First 5 Reflections.”

**Sample Campaign Theme:** *“See Yourself Clearly.”*

* Visuals: mirrors, sunrise light, handwritten reflections.

* Tagline: “Awareness is the beginning of everything.”

**CTA:** Start free → camino.app/journal

---

## **Campaign — Phase 2: Engagement & Conversion**

**Objective:** Drive signups for Journey ($19.95/mo) and Coaching ($1,000/mo).

**Channels:**

* Retargeted ads to journal visitors.

* Case studies: how reflection improved focus, relationships, or leadership.

* Webinars: “How to Reflect for Performance.”

* Partner newsletters (Calm professionals, wellness coaches, design leaders).

**Core Message:** “Reflection isn’t slowing down — it’s speeding up with direction.”

**Offers:**

* Free first module of Journey.

* Coaching application incentive: 1 free reflection analysis report.

---

## **Campaign — Phase 3: Retention & Community**

**Objective:** Create a flywheel of belonging and sustained engagement.

**Initiatives:**

* Camino Circles (monthly reflection groups).

* Subscriber newsletter: “The Weekly Reflection.”

* Camino Journal (digital \+ printed release Year 2).

**Community Motto:** “Walk together, grow together.”

**Retention Tactics:**

* Weekly email reminders to reflect.

* AI-generated monthly insights summaries.

* Reflection streak milestones.

---

## **Content Strategy**

**Publishing Schedule:**

* Weekly essay → Substack / LinkedIn

* Monthly theme → blog \+ reflection prompt

* Quarterly whitepaper → leadership \+ AI insight series

**Content Pillars:**

1. **Awareness:** Mindfulness, presence, reflection.

2. **Resilience:** Emotional intelligence, adaptability, calm strength.

3. **Belonging:** Connection, community, leadership.

**Visual Aesthetic:**

* Clean editorial layouts with serif titles.

* Muted palette, natural textures, generous white space.

---

## **Marketing Tech Stack**

* **Email:** ConvertKit

* **CRM:** Notion \+ Zapier integration → Supabase contacts

* **Analytics:** Plausible \+ Mixpanel

* **Ad Platforms:** LinkedIn Ads, Meta Ads (retargeting only)

* **SEO Tools:** Ahrefs \+ Google Search Console

---

## **Key Metrics (12-month goals)**

| Metric | Target |
| ----- | ----- |
| Website Visitors | 50,000 |
| Journal Signups | 10,000 |
| Paid Subscribers | 2,000 |
| Coaching Clients | 50 |
| Newsletter Subscribers | 15,000 |
| Retention Rate | 80% |

---

## **Summary**

Camino’s marketing exists to make people **feel seen and inspired**, not sold to. Every piece of content should extend the brand’s promise: *guided reflection for a meaningful life.*  
 This is more than a campaign — it’s an invitation to walk the path with awareness.

---

# **Camino — Investor Deck Content**

## **Slide 1 — Title**

**Camino**  
 **Tagline:** Guided reflection for a meaningful life.  
 Empowering awareness, resilience, and belonging through guided reflection and AI.

---

## **Slide 2 — The Problem**

We live in the most connected era — yet people feel more **disconnected** than ever.

* Burnout and loneliness are epidemic-level challenges.

* High performers lack time and frameworks for reflection.

* Existing wellness tools focus on habit tracking, not human awareness.

**The gap:** No scalable system exists to cultivate meaningful self-reflection and emotional intelligence.

---

## **Slide 3 — The Solution**

**Camino:** A reflective performance platform blending mindfulness, psychology, and AI.

* Daily guided reflections.

* Personalized AI insights.

* Structured learning and coaching journeys.

**Result:** Awareness becomes measurable, resilience becomes repeatable, and belonging becomes actionable.

---

## **Slide 4 — The Product**

Camino is a **hybrid digital \+ human coaching ecosystem.**

**Products:**

1. **Camino Reflect (Free):** Daily guided journaling \+ AI summaries.

2. **Camino Journey ($19.95/mo):** LMS-based reflection curriculum.

3. **Camino Coach ($1,000/mo):** Hybrid 1:1 human \+ AI coaching.

4. **Camino Enterprise ($10K–$25K):** Leadership resilience programs for teams.

**MVP Launch:** Web app with guided journaling, insights, and subscription flow.

---

## **Slide 5 — The Market**

**Wellness & Coaching Market:**

* Global wellness market \> **$400B by 2027**.

* Coaching industry \> **$20B** and growing 7% CAGR.

* AI-driven self-development tools accelerating adoption.

**Target Segments:**

* Reflective Seekers (B2C)

* Purpose-Driven Professionals (B2C)

* Corporate Teams & Leaders (B2B)

**Opportunity:** A scalable, AI-personalized coaching system built for self-awareness — a white space between Calm and BetterUp.

---

## **Slide 6 — Business Model**

| Tier | Product | Price | Revenue Mix |
| ----- | ----- | ----- | ----- |
| 1 | Camino Reflect | Free | Acquisition Funnel |
| 2 | Camino Journey | $19.95/mo | 70% recurring revenue |
| 3 | Camino Coach | $1,000/mo | 20% high-value clients |
| 4 | Camino Enterprise | $10K–$25K | 10% B2B engagements |

**Projected ARR (Year 3): $2.5M**

---

## **Slide 7 — Traction (Projected MVP Metrics)**

* 5,000 users in first 6 months.

* 1,000 paid subscribers by Month 12\.

* 5 coaching clients (pilot phase) in first quarter.

* 90% retention rate from reflection habit loops.

**Organic Growth Engine:** Substack essays, reflection newsletter, social storytelling.

---

## **Slide 8 — Technology Advantage**

Camino’s **Reflection Engine** combines:

* Guided prompt sequencing based on psychology & leadership frameworks.

* AI pattern recognition across reflections → emotional insights.

* Adaptive learning paths via AI (recommend next reflection or module).

**Edge:** Personalization and scalability without losing human tone.

---

## **Slide 9 — Competitive Landscape**

| Company | Focus | Differentiator |
| ----- | ----- | ----- |
| Calm | Meditation | Relaxation focus, not reflection |
| Headspace | Mindfulness | Routine-based, not insight-based |
| BetterUp | Coaching | High-touch, enterprise-only |
| Notion | Journaling | No guided insights |
| **Camino** | Reflection & Performance | AI-guided \+ human-integrated model |

---

## **Slide 10 — Go-to-Market Strategy**

**Phase 1 (0–6 months):** Launch MVP web app \+ build reflective audience via content.

* Channels: Substack, LinkedIn, Instagram.

* Funnel: Journal → Signup → Journey.

**Phase 2 (6–12 months):** Scale Journey \+ Coaching programs.

* Retargeting ads, email series, and partnerships.

**Phase 3 (Year 2+):** Expand B2B via Camino Enterprise.

* Corporate pilots \+ leadership networks.

---

## **Slide 11 — Financial Forecast**

| Year | Users | Subscribers | Revenue | Focus |
| ----- | ----- | ----- | ----- | ----- |
| 1 | 5,000 | 1,000 | $250K | MVP validation |
| 2 | 50,000 | 5,000 | $750K | Brand scaling |
| 3 | 200,000 | 20,000 | $2.5M | Enterprise growth |

Break-even projected by mid-Year 2\.

---

## **Slide 12 — Team**

**Walter Calvo** — Founder & Vision Lead  
 Performance psychologist and reflective leadership coach.

**Chris Carter** — Design & Product Lead  
 UX strategist with 15 years building emotionally resonant digital experiences.

Future hires:

* Marketing & Partnerships Director

* Coaching Operations Lead

* Full-stack Engineer

---

## **Slide 13 — Roadmap**

**Phase 1:** MVP Launch (Now–6 months) → Core journaling \+ LMS \+ Stripe integration.  
 **Phase 2:** Growth → AI insights, content flywheel, coaching pilot.  
 **Phase 3:** Scale → Corporate pilots, reflection model licensing.

**Long-term Vision:** Camino becomes the category leader in **reflective performance technology.**

---

## **Slide 14 — Ask**

**Funding Goal:** $500K pre-seed  
 **Use of Funds:**

* 40% Product Development (AI, LMS, UX)

* 30% Marketing & Community Growth

* 20% Coaching Pilot \+ B2B Development

* 10% Operations & Legal

**Runway:** 12–15 months.

---

## **Slide 15 — Closing**

**Tagline:** Guided reflection for a meaningful life.  
 Because awareness is the foundation of everything.

**Contact:**  
 Walter Calvo — Founder  
 📩 walter@camino.app  
 🌐 camino.app

