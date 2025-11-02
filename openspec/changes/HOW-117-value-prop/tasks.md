# Implementation Tasks: HOW-117 Value Proposition

## Setup
- [x] Branch created: `feature/HOW-117-value-prop`
- [x] OpenSpec proposal created with 3 options + recommendation
- [ ] Stakeholder meeting scheduled

## Decision Process

### Pre-Meeting
- [ ] Send proposal to all stakeholders 24h before meeting
- [ ] Stakeholders read all 3 options + recommendation
- [ ] Stakeholders come prepared with initial preference

### Meeting Agenda (1 hour max)
- [ ] **0:00-0:10** Review context: Why this matters, what it blocks
- [ ] **0:10-0:30** Discuss each option:
  - Option 1: Transformation Focus
  - Option 2: Integration Differentiator
  - Option 3: Grounded Generosity Outcome
  - Recommended: Modified Option 3
- [ ] **0:30-0:45** Test each option:
  - Read aloud
  - Imagine on homepage hero
  - Check emotional resonance
  - Verify clarity ("grandma test")
  - Score against 6 criteria (clarity, differentiation, emotion, truth, memory, versatile)
- [ ] **0:45-0:55** Vote or consensus decision
- [ ] **0:55-1:00** Confirm decision, assign documentation tasks

### Post-Meeting
- [ ] Meeting notes documented
- [ ] Final decision confirmed in writing
- [ ] Rationale captured (why this option won)

## Documentation

### Linear Issue HOW-117
- [ ] Add comment with decision:
  ```
  DECISION: [Chosen value proposition]

  RATIONALE:
  - [Why this option was chosen]
  - [What makes it better than alternatives]
  - [How it scores on decision criteria]

  USAGE:
  - Homepage hero (verbatim)
  - Pricing page headline
  - About page intro
  - Meta descriptions
  - Social media tagline
  - All marketing materials

  NEXT STEPS:
  - Updated Themes.md in Obsidian
  - Updated 9 blocked issues
  - Team notified
  ```
- [ ] Change status to "Complete"

### Obsidian Themes.md
- [ ] Add "Core Value Proposition" section at top:
  ```markdown
  ## Core Value Proposition

  ### The One Sentence (Decided: 2025-11-02)
  "[Chosen value proposition]"

  ### Usage Guidelines
  - Use VERBATIM on homepage hero
  - Use as headline for pricing page
  - Reference in About page introduction
  - Basis for all meta descriptions (150-160 chars)
  - Social media tagline
  - Email subject lines (when appropriate)

  ### What It Means
  - [Brief explanation of each component]
  - [Why this resonates with target users]
  - [How it differentiates from competitors]

  ### What It's NOT
  - Not generic "transformation" language
  - Not defensive positioning
  - Not jargon or buzzwords
  - Not a feature list
  - Not a process explanation

  ### Testing/Validation
  - Clarity: [Score/feedback]
  - Differentiation: [Score/feedback]
  - Emotional appeal: [Score/feedback]
  - Memorability: [Score/feedback]

  ### Alternatives Considered
  1. [Option 1 - brief]
  2. [Option 2 - brief]
  3. [Option 3 - brief]

  **Why chosen option won:** [Brief rationale]
  ```

### Update Blocked Linear Issues (9 issues)

For each of these issues, add a comment:

**HOW-111** [CM-001] Homepage Hero:
- [ ] Comment: "✅ Value prop decided: [text]. Use verbatim in hero section."

**HOW-112** [CM-002] Features Section:
- [ ] Comment: "✅ Value prop decided: [text]. Support this with dimensional benefits."

**HOW-113** [CM-003] Pricing Page:
- [ ] Comment: "✅ Value prop decided: [text]. Use as page headline or intro."

**HOW-114** [CM-004] How It Works:
- [ ] Comment: "✅ Value prop decided: [text]. Explain HOW we deliver on this promise."

**HOW-115** [CM-005] IT Landing Page:
- [ ] Comment: "✅ Value prop decided: [text]. Flagship program delivers this transformation."

**HOW-121** [CM-006] About Page:
- [ ] Comment: "✅ Value prop decided: [text]. Mission is to help people achieve this."

**HOW-127** [CM-012] Lead Capture:
- [ ] Comment: "✅ Value prop decided: [text]. Form headline should reference this."

**HOW-129** [SEO-003] Meta Tags:
- [ ] Comment: "✅ Value prop decided: [text]. Use in all meta descriptions (150-160 chars)."

**HOW-120** [GTM-001] Launch Announcement:
- [ ] Comment: "✅ Value prop decided: [text]. Lead with this in all launch content."

## Communication

### Team Notification
- [ ] Slack message (if team Slack exists):
  ```
  🎯 Value Proposition Decided!

  After stakeholder meeting, we've chosen:

  "[Chosen value proposition]"

  This will appear on:
  - Homepage hero
  - Pricing page
  - All marketing materials

  See full rationale in Linear HOW-117 and Obsidian Themes.md

  Questions? Let's discuss in #camino channel.
  ```

- [ ] Email to all stakeholders (if no Slack):
  - Subject: "Camino Value Proposition Decided"
  - Body: Decision + rationale + where it will be used
  - Attach: Link to Themes.md, Linear issue

- [ ] Update project README (if needed)

## Validation (Optional but Recommended)

### User Testing (After Decision)
- [ ] Show value prop to 5 target users
- [ ] Ask: "What do you think this product does?"
- [ ] Ask: "Does this appeal to you? Why/why not?"
- [ ] Ask: "Can you repeat what you just read?"
- [ ] Collect feedback, iterate if major issues

### Competitor Check
- [ ] Review top 10 competitor value props
- [ ] Verify ours is differentiated
- [ ] Adjust if too similar to anyone

## Archive

- [ ] All documentation complete
- [ ] All blocked issues updated
- [ ] Team notified
- [ ] Move this proposal to `openspec/specs/HOW-117-value-prop/`
- [ ] Mark Linear HOW-117 as "Complete"
- [ ] Move to next issue: HOW-119 [TEST-001] Testing Infrastructure

---

**Status:** Awaiting stakeholder meeting
**Next Meeting:** [Schedule date/time]
**Attendees:** [List names]
**Decision Maker:** Howdy Carter (final call if no consensus)
