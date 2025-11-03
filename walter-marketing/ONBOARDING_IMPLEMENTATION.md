# Camino Onboarding Flow Implementation

**Issue:** HOW-180
**Date:** 2025-11-03
**Status:** ✅ Complete

---

## Overview

This document details the implementation of Camino's optimized onboarding flow designed to achieve user activation (3 reflections + first insight) within 10-15 minutes.

### Activation Moment

As defined in HOW-160:
- **Definition:** User completes 3 reflections AND receives their first AI-generated insight
- **Target:** >60% of signups reach activation within 7 days
- **Time to Activation:** 10-15 minutes (same session possible)

---

## Architecture

### Directory Structure

```
app/onboarding/
├── layout.tsx                 # Onboarding layout with context provider
├── page.tsx                   # Router to appropriate step
├── welcome/page.tsx           # Step 1: Welcome screen
├── intent/page.tsx            # Step 2: Choose dimension
├── reflection/[number]/       # Steps 3, 5, 7: Reflections
│   └── page.tsx
├── celebration/page.tsx       # Step 8: Activation moment
└── complete/page.tsx          # Step 9: Next steps

components/onboarding/
├── ProgressBar.tsx            # Visual progress indicator
├── IntentSelector.tsx         # Dimension selection UI
├── ReflectionPrompt.tsx       # Reflection input with validation
├── EncouragementCard.tsx      # Progress motivation
└── CelebrationAnimation.tsx   # Activation celebration

lib/onboarding/
├── context.tsx                # State management
└── prompts.ts                 # Reflection prompts by intent

lib/analytics/
├── types.ts                   # Event type definitions
├── client.ts                  # Client-side tracking
└── index.ts                   # Export module
```

---

## Implementation Details

### 1. Onboarding Flow (9 Steps)

#### Step 1: Welcome Screen (`/onboarding/welcome`)

**Purpose:** Set the tone and communicate value proposition

**Key Elements:**
- Hero message: "You're not broken. You're seeing through the wrong lens."
- Three value propositions
- Time estimate (10-15 minutes)
- Single CTA: "Begin Your Journey"

**Analytics:**
- `onboarding_step_viewed` (step 1)
- `onboarding_step_completed` (step 1)

#### Step 2: Choose Intent (`/onboarding/intent`)

**Purpose:** Personalize the experience based on user interest

**Options:**
- Identity: "Discover who you are beneath false beliefs"
- Worldview: "Question assumptions about how the world works"
- Relationships: "Understand patterns in how you connect"
- All Dimensions: "Explore all three dimensions"

**Features:**
- Large, accessible cards with icons
- Single-select with visual confirmation
- Progress indicator (2/9)

**Analytics:**
- Tracks selected intent for personalization
- Influences reflection prompts

#### Steps 3, 5, 7: Reflections (`/onboarding/reflection/[1-3]`)

**Purpose:** Gather meaningful user input for pattern detection

**Features:**
- Intent-based prompts from `lib/onboarding/prompts.ts`
- Word count validation (min 50 words)
- Time tracking
- Auto-resizing textarea
- Progress visualization
- Encouragement between reflections

**Reflection Prompts:**

*Identity:*
1. "What belief about yourself feels most limiting right now?"
2. "When do you feel most like your authentic self?"
3. "If you could let go of one belief about who you're 'supposed to be', what would it be?"

*Worldview:*
1. "What assumption about how the world works do you question most?"
2. "Describe a time when reality surprised you."
3. "What belief about 'how things should be' causes you the most frustration?"

*Relationships:*
1. "What pattern in your relationships keeps repeating?"
2. "Think of a difficult relationship. What role do you typically play?"
3. "What do you need from others that you find hard to ask for?"

**Analytics:**
- `reflection_completed` (count: 1, 2, 3)
- Tracks word count, time spent, dimension

#### Steps 4, 6: Encouragement (`EncouragementCard`)

**Purpose:** Maintain momentum between reflections

**Features:**
- Contextual messages based on progress
- Visual progress bar
- Reflection count indicator
- Motivational quote (step 6)
- Auto-redirect after 3 seconds

**Messages:**
- After reflection 1: "Great start! Two more reflections to unlock your first insight."
- After reflection 2: "You're doing amazing! One more reflection until we can show you your patterns."

#### Step 8: Celebration (`/onboarding/celebration`)

**Purpose:** Deliver the activation moment with impact

**Features:**
- Confetti animation
- Three-stage reveal:
  1. Confetti + "Congratulations!" (0-2s)
  2. "Here's What We See" (2-4s)
  3. First insight displayed (4s+)
- Pattern badge
- Preview of 12-week journey
- AI insight generation (mock for MVP)

**Analytics:**
- `insight_generated`
- `insight_viewed`
- `user_activation_achieved` 🎉

#### Step 9: Complete (`/onboarding/complete`)

**Purpose:** Set up ongoing engagement

**Features:**
- Success confirmation
- Daily reflection reminder setup
- Preview of dashboard features
- Statistics summary (reflections, insights, time invested)
- Two CTAs:
  - "Go to Dashboard" (primary)
  - "Skip for Now" (secondary)

**Analytics:**
- Tracks reminder setup
- Final onboarding completion

---

### 2. State Management

**Context: `lib/onboarding/context.tsx`**

```typescript
interface OnboardingState {
  intent: Intent | null;
  reflections: Reflection[];
  currentStep: number;
  insightId: string | null;
  startTime: number;
}
```

**Features:**
- React Context API for global state
- localStorage persistence
- State restoration on page reload
- Reset functionality

**Methods:**
- `setIntent(intent: Intent)`
- `addReflection(reflection)`
- `setCurrentStep(step: number)`
- `setInsightId(id: string)`
- `resetOnboarding()`

---

### 3. Analytics Integration

**Events Tracked:**

| Event | Trigger | Properties |
|-------|---------|------------|
| `onboarding_step_viewed` | Page load | step_number, step_name |
| `onboarding_step_completed` | Page exit | step_number, step_name, time_spent_seconds |
| `reflection_completed` | Submit reflection | reflection_count, word_count, dimension, time_spent |
| `insight_generated` | AI generates insight | insight_type, reflection_count, generation_time_ms |
| `insight_viewed` | User sees insight | is_first_insight, source: "onboarding" |
| `user_activation_achieved` | First insight viewed | reflection_count, days_since_signup, activation_path: "onboarding" |

**Implementation:**
- PostHog integration (when configured)
- Offline event queuing
- Type-safe event tracking
- Privacy-respecting (DNT support)

---

### 4. Design System

**Colors:**
- Gold accent: `#E2C379` (--camino-gold)
- Sandstone: `#F4E9D8` (--camino-sandstone)
- Slate: `#2D2F33` (--camino-slate)
- Ivory: `#FFFBF5` (--camino-ivory)
- Midnight: `#1A1B1C` (--camino-midnight)

**Typography:**
- Headings: Georgia (serif)
- Body: Geist Sans
- Emphasis: Large, readable text
- Mobile-first responsive sizing

**Components:**
- Rounded corners (12-24px)
- Subtle shadows
- Smooth transitions (200ms)
- Gold gradient buttons
- Progress indicators

---

### 5. Accessibility (WCAG AAA)

**Keyboard Navigation:**
- All interactive elements are keyboard accessible
- Focus states clearly visible
- Logical tab order

**Screen Readers:**
- Proper ARIA labels on all components
- `role="progressbar"` with valuenow/valuemin/valuemax
- `aria-pressed` for selected states
- Descriptive button labels

**Visual:**
- High contrast text (AAA compliant)
- Focus indicators
- Reduced motion support

**Forms:**
- Clear validation messages
- Error states
- Helper text
- Accessible textarea with data-private attribute

---

### 6. Performance

**Optimizations:**
- Code splitting by route
- Lazy loading of animations
- Optimistic UI updates
- Local state persistence (no API calls for navigation)
- Debounced word count calculation

**Targets:**
- Page load: <3 seconds
- Time to Interactive: <3.9 seconds
- Reflection submission: <1 second response

**Monitoring:**
- Performance metrics in analytics
- Load time tracking per step
- Drop-off analysis

---

### 7. Security

**Input Validation:**
- XSS prevention on all user input
- `data-private` attribute on sensitive fields
- Content sanitization before storage

**Privacy:**
- localStorage used only for onboarding state
- Reflections marked private in analytics
- No sensitive data in URLs
- Session replay masks all inputs

---

## Testing

### Unit Tests (`tests/unit/onboarding/`)

**Components tested:**
- ProgressBar: Progress calculation, ARIA labels, step dots
- IntentSelector: Option rendering, selection, keyboard nav
- EncouragementCard: Messages, progress, quotes
- ReflectionPrompt: Word count validation, submission

**Run:**
```bash
npm test tests/unit/onboarding
```

### Integration Tests (`tests/integration/onboarding/`)

**Context tested:**
- State initialization
- Intent setting
- Reflection adding
- localStorage persistence
- State restoration
- Reset functionality

**Prompts tested:**
- Correct prompts by intent
- All dimensions represented
- Prompt structure

**Run:**
```bash
npm test tests/integration/onboarding
```

### E2E Tests (`tests/e2e/onboarding/`)

**Complete flow:**
1. Welcome → Begin
2. Select intent
3. Complete 3 reflections
4. View celebration
5. Complete setup

**Scenarios tested:**
- Full happy path
- Back navigation with state preservation
- Word count validation
- Progress display
- Keyboard navigation
- ARIA labels
- Performance (<3s page loads)

**Run:**
```bash
npm run test:e2e tests/e2e/onboarding
```

### Accessibility Tests

**Automated:**
- axe-core integration
- WCAG AAA compliance checks
- Keyboard navigation tests

**Run:**
```bash
npm run test:a11y
```

---

## Configuration

### Environment Variables

```env
# Analytics (optional for MVP)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Customization

**Reflection prompts:** Edit `lib/onboarding/prompts.ts`

**Onboarding steps:** Modify page components in `app/onboarding/`

**Analytics events:** Extend `lib/analytics/types.ts`

**Design tokens:** Update `app/globals.css` CSS variables

---

## Usage

### Starting Onboarding

```typescript
// Redirect new users to onboarding
router.push('/onboarding');

// Or start at specific step
router.push('/onboarding/welcome');
```

### Accessing Onboarding State

```typescript
import { useOnboarding } from '@/lib/onboarding/context';

function MyComponent() {
  const { state, setIntent, addReflection } = useOnboarding();

  // Access current state
  console.log(state.intent);
  console.log(state.reflections.length);

  // Update state
  setIntent('identity');
}
```

### Tracking Analytics

```typescript
import { trackOnboardingStepViewed } from '@/lib/analytics';

trackOnboardingStepViewed(userId, stepNumber, stepName);
```

---

## Future Enhancements

### Phase 2 (Post-MVP)

1. **Real AI Insight Generation**
   - Integrate with GPT-4 or similar
   - Pattern detection algorithm
   - Quality scoring

2. **Email Nudges**
   - Reminder for reflection 2 & 3
   - Re-engagement if user drops off
   - Insight delivery via email

3. **A/B Testing**
   - Test different prompts
   - Optimize encouragement messages
   - Experiment with flow variations

4. **Enhanced Analytics**
   - Funnel visualization
   - Drop-off analysis
   - Cohort comparison

5. **Personalization**
   - Adaptive prompts based on responses
   - Dynamic encouragement
   - Intelligent timing

---

## Metrics & Success Criteria

### Primary Metric

**Activation Rate:** % of users who complete 3 reflections + view first insight

**Target:** >60% within 7 days

### Secondary Metrics

- **Step Completion Rates:**
  - Welcome → Intent: >80%
  - Intent → Reflection 1: >80%
  - Reflection 1 → Reflection 2: >70%
  - Reflection 2 → Reflection 3: >65%
  - Reflection 3 → Insight Viewed: >95%

- **Time to Activation:** Median 10-15 minutes

- **Retention Impact:**
  - 30-day retention: 5x higher for activated users
  - Upgrade rate: 3x higher for activated users

### Quality Metrics

- **Reflection Quality:**
  - Average word count: >100 words
  - Time spent per reflection: 2-5 minutes

- **User Satisfaction:**
  - Insight quality rating: >4 stars
  - NPS among activated users: >50

---

## Known Issues & Limitations

### Current Limitations

1. **Mock Insight Generation**
   - Using predefined insights per intent
   - Need real AI integration for production

2. **No User Authentication**
   - Using temp_user_id placeholder
   - Need auth integration before launch

3. **No Email Integration**
   - Daily reminder setup not functional
   - Requires email service configuration

4. **No Backend Persistence**
   - Reflections stored only in localStorage
   - Need database integration for persistence

### Planned Fixes

All limitations will be addressed in integration phase with existing Camino backend.

---

## Deployment Checklist

- [x] All components implemented
- [x] Unit tests passing
- [x] Integration tests passing
- [x] E2E tests passing
- [x] Accessibility tests passing
- [ ] Auth integration
- [ ] Backend API integration
- [ ] AI insight generation
- [ ] Email service integration
- [ ] Analytics configured
- [ ] Performance tested
- [ ] Security audit
- [ ] Documentation complete

---

## Support & Troubleshooting

### Common Issues

**localStorage not persisting:**
- Check browser settings (private mode disables localStorage)
- Verify localStorage quota not exceeded

**Tests failing:**
- Clear node_modules and reinstall
- Check mock implementations
- Verify test environment setup

**Analytics not tracking:**
- Check PostHog API key configured
- Verify Do Not Track is disabled
- Check browser console for errors

### Debug Mode

Enable analytics debug logging:

```typescript
// In lib/analytics/client.ts
config.debug = true;
```

---

## References

- [HOW-160: Activation Moment Definition](../ACTIVATION_MOMENT.md)
- [HOW-177: Analytics Instrumentation](../../HOW-177-analytics-instrumentation/)
- [Linear Issue HOW-180](https://linear.app/howdycarter/issue/HOW-180)
- [Product Vision](../../../../../obsidian-vaults/howdycarter/01_PROJECTS/Camino/)

---

## Changelog

**2025-11-03:**
- Initial implementation complete
- 9-step onboarding flow
- Analytics integration
- Complete test suite
- Documentation

---

**Implementation Status:** ✅ Complete
**Tests Status:** ✅ All Passing
**Ready for Integration:** Yes
**Estimated Time to Activation:** 10-15 minutes
