# Camino Project Development Workflow

**Last Updated:** 2025-11-02
**Version:** 1.0

## 🎯 Overview

This document defines the systematic workflow for implementing all 42 Linear issues using OpenSpec-driven development.

**Core Principle:** Every Linear issue gets an OpenSpec proposal BEFORE implementation begins.

---

## 📋 Per-Issue Development Process

For **every** Linear issue (HOW-XXX), follow these steps:

### Step 1: Create Feature Branch

```bash
cd /Users/howdycarter/Documents/projects/camino-project/walter-marketing
git checkout main
git pull origin main
git checkout -b feature/HOW-XXX-short-description
```

**Branch Naming Convention:** `feature/HOW-XXX-short-description`

**Examples:**
- `feature/HOW-117-value-prop`
- `feature/HOW-119-testing-infrastructure`
- `feature/HOW-111-homepage-hero`

### Step 2: Create OpenSpec Proposal

```bash
cd /Users/howdycarter/Documents/projects/camino-project
mkdir -p openspec/changes/HOW-XXX-short-name
cd openspec/changes/HOW-XXX-short-name
touch proposal.md tasks.md
```

**Fill in `proposal.md` with:**

```markdown
# Change: [Linear Issue Title]

## Linear Issue
**ID:** HOW-XXX
**Title:** [Full title]
**Priority:** [🔴 Urgent / 🟡 High / 🟢 Medium / ⚪ Low]
**Effort:** [X hours]
**Link:** https://linear.app/howdycarter/issue/HOW-XXX

## Context
[Why this issue exists, what problem it solves, business value]

## Current State
[What exists today in the codebase - be specific about files, components, APIs]

## Desired State
[What should exist after implementation - specific outcomes, user experience]

## Technical Approach
[How we'll implement - specific technologies, patterns, architecture decisions]

**Files to Modify:**
- `path/to/file1.tsx` - [What changes]
- `path/to/file2.ts` - [What changes]
- `path/to/file3.css` - [What changes]

**New Files to Create:**
- `path/to/new-component.tsx` - [Purpose]
- `path/to/new-util.ts` - [Purpose]

## Task Breakdown

- [ ] Task 1: [Specific action]
- [ ] Task 2: [Specific action]
- [ ] Task 3: [Specific action]
- [ ] Task 4: [Testing]
- [ ] Task 5: [Documentation]

## Testing Requirements

### Unit Tests (Jest + React Testing Library)
- [ ] [Specific component test]
- [ ] [Specific function test]
- [ ] [Edge case test]
- [ ] Target coverage: 80%+

### Integration Tests
- [ ] [API integration test]
- [ ] [Service integration test]
- [ ] [Data flow test]

### E2E Tests (Playwright)
- [ ] [User journey test - Chrome]
- [ ] [User journey test - Firefox]
- [ ] [User journey test - Safari]
- [ ] [Mobile responsive test - iOS]
- [ ] [Mobile responsive test - Android]

### Accessibility Tests
- [ ] WCAG AAA compliance (axe-core)
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible (NVDA/VoiceOver tested)
- [ ] Color contrast ratios verified
- [ ] Focus states visible and logical

### Performance Tests
- [ ] Page load time <2.5s
- [ ] LCP (Largest Contentful Paint) <2.5s
- [ ] FID (First Input Delay) <100ms
- [ ] CLS (Cumulative Layout Shift) <0.1
- [ ] Lighthouse score >90

### Security Tests
- [ ] Input sanitization (XSS prevention)
- [ ] CSRF protection on forms
- [ ] Authentication checks on protected routes
- [ ] Authorization (users access only their own data)
- [ ] Rate limiting implemented
- [ ] Security headers verified

## Acceptance Criteria

- [ ] Criterion 1: [Specific measurable outcome]
- [ ] Criterion 2: [Specific measurable outcome]
- [ ] Criterion 3: [Specific measurable outcome]
- [ ] All tests passing (unit, integration, E2E, a11y, perf, security)
- [ ] Code reviewed (awaiting approval)
- [ ] Documentation updated (comments, README, Storybook if applicable)
- [ ] Linear issue updated with progress

## Dependencies

**Depends On (Must be completed first):**
- HOW-XXX: [Issue title]
- HOW-YYY: [Issue title]

**Blocks (Cannot start until this is done):**
- HOW-ZZZ: [Issue title]
- HOW-AAA: [Issue title]

## Estimated Effort

**Total:** [X hours]

**Breakdown:**
- Implementation: [Y hours]
- Testing: [Z hours]
- Documentation: [A hours]
- Review & Iteration: [B hours]

## Risks & Mitigations

**Risk 1:** [Description of potential issue]
**Mitigation:** [How to prevent or handle it]

**Risk 2:** [Description of potential issue]
**Mitigation:** [How to prevent or handle it]

## Next Steps After Completion

1. Run full test suite: `npm test && npm run test:e2e`
2. Update Linear issue status to "In Review"
3. Archive OpenSpec change to `openspec/specs/`
4. **Request approval** (DO NOT COMMIT without explicit approval)
5. After approval: Commit, push, create PR
```

**Fill in `tasks.md` with detailed implementation checklist:**

```markdown
# Implementation Tasks: HOW-XXX

## Setup
- [ ] Branch created: `feature/HOW-XXX-short-name`
- [ ] Dependencies installed (if any new packages)
- [ ] Environment variables configured (if needed)

## Implementation
- [ ] [Detailed task 1]
- [ ] [Detailed task 2]
- [ ] [Detailed task 3]
...

## Testing
- [ ] Unit tests written
- [ ] Integration tests written
- [ ] E2E tests written
- [ ] Accessibility tests passing
- [ ] Performance tests passing
- [ ] Security tests passing

## Documentation
- [ ] Code comments added
- [ ] README updated (if applicable)
- [ ] Storybook stories created (for UI components)
- [ ] API docs updated (if applicable)

## Pre-Commit Checklist
- [ ] All tests passing locally
- [ ] No console errors/warnings
- [ ] Code formatted (Prettier)
- [ ] Linting passing (ESLint)
- [ ] Build succeeds: `npm run build`
- [ ] OpenSpec proposal tasks all checked off
- [ ] Linear issue updated with completion notes

## Review & Approval
- [ ] **STOP HERE** - Request approval before commit
- [ ] After approval: Commit with conventional format
- [ ] Push branch
- [ ] Create PR with OpenSpec proposal as body
- [ ] Archive OpenSpec change
```

### Step 3: Update Linear Issue with Proposal

Using Linear API or manual update, add to the issue description:

```markdown
## 📋 OpenSpec Proposal
Detailed implementation spec: `openspec/changes/HOW-XXX-name/proposal.md`

## 📊 Implementation Status
- [x] OpenSpec proposal created
- [ ] Implementation in progress
- [ ] Testing complete
- [ ] Ready for review

## 🔗 Branch
`feature/HOW-XXX-short-name`
```

### Step 4: Implement End-to-End

Work through the OpenSpec proposal systematically:

1. **Follow the tasks** in `tasks.md`
2. **Check off tasks** as you complete them
3. **Write tests** alongside implementation (TDD encouraged)
4. **Update Linear issue** status as you progress
5. **Keep OpenSpec proposal** synchronized with any changes

**Development Commands:**
```bash
# Run dev server
npm run dev

# Run tests
npm test                    # Unit tests
npm run test:e2e           # E2E tests (Playwright)
npm run test:a11y          # Accessibility tests (when set up)

# Check code quality
npm run lint               # ESLint
npm run format             # Prettier

# Build
npm run build              # Production build
```

### Step 5: Pre-Commit Checkpoint ⚠️ STOP HERE

**Before committing ANYTHING:**

1. **Run all tests:**
   ```bash
   npm test
   npm run test:e2e
   npm run lint
   npm run build
   ```

2. **Verify OpenSpec tasks:**
   - All tasks in `tasks.md` checked off
   - All acceptance criteria in `proposal.md` met
   - Testing requirements satisfied (all 6 dimensions)

3. **Generate change summary:**
   ```bash
   git status
   git diff
   ```

4. **Update Linear issue** with completion notes

5. **⛔ AWAIT APPROVAL**
   - Do NOT commit
   - Do NOT push
   - Do NOT create PR
   - **Request review from project owner**

### Step 6: After Approval Only

Once you receive explicit approval to proceed:

```bash
# Stage all changes
git add .

# Commit with conventional commit format
git commit -m "feat(HOW-XXX): Brief description

- Completed task 1
- Completed task 2
- Completed task 3
- All tests passing (unit, integration, E2E, a11y, perf, security)

Linear: HOW-XXX
OpenSpec: archived
Reviewed-by: [Reviewer name]"

# Push feature branch
git push origin feature/HOW-XXX-short-name

# Create PR (using GitHub CLI)
gh pr create \
  --title "[HOW-XXX] Title from Linear issue" \
  --body "$(cat openspec/changes/HOW-XXX-name/proposal.md)" \
  --base main
```

### Step 7: Archive OpenSpec Change

Once PR is merged:

```bash
cd /Users/howdycarter/Documents/projects/camino-project
mv openspec/changes/HOW-XXX-name openspec/specs/
```

This moves the proposal to the "source of truth" archive.

---

## 🔧 Testing Requirements

Every issue MUST include all 6 testing dimensions:

### 1. Unit Tests (Jest + React Testing Library)
```typescript
// Example: __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders all variants correctly', () => {
    // Test default, outline, ghost, link variants
  })
})
```

**Target:** 80%+ code coverage

### 2. Integration Tests
Test data flow between components, API calls, service integration:

```typescript
// Example: Integration test for form submission
it('submits contact form and shows success message', async () => {
  render(<ContactForm />)

  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' }
  })
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'Test message' }
  })

  fireEvent.click(screen.getByText('Submit'))

  await waitFor(() => {
    expect(screen.getByText('Message sent successfully')).toBeInTheDocument()
  })
})
```

### 3. E2E Tests (Playwright)
Full user journeys across browsers:

```typescript
// Example: tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test'

test('user navigates from homepage to pricing', async ({ page }) => {
  await page.goto('/')

  // Verify homepage hero loads
  await expect(page.locator('h1')).toContainText('Transform how you see')

  // Click pricing CTA
  await page.click('text=Start Your Transformation')

  // Verify pricing page loads
  await expect(page).toHaveURL(/.*pricing/)
  await expect(page.locator('h1')).toContainText('Choose Your Journey')
})

test.describe('Cross-browser testing', () => {
  test('works in Chrome', async ({ page }) => { /* ... */ })
  test('works in Firefox', async ({ page }) => { /* ... */ })
  test('works in Safari', async ({ page }) => { /* ... */ })
})
```

### 4. Accessibility Tests
WCAG AAA compliance:

```typescript
// Example: Accessibility test with axe-core
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

**Manual checks:**
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Screen reader testing (NVDA on Windows, VoiceOver on Mac)
- Color contrast ratios (use WebAIM contrast checker)
- Focus indicators visible
- Skip links present

### 5. Performance Tests
Core Web Vitals targets:

```javascript
// Example: Lighthouse CI config (.lighthouserc.json)
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run start",
      "url": ["http://localhost:3000/"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "first-input-delay": ["error", {"maxNumericValue": 100}]
      }
    }
  }
}
```

### 6. Security Tests
OWASP Top 10 checks:

```typescript
// Example: Security tests
describe('Security', () => {
  it('sanitizes user input to prevent XSS', () => {
    const maliciousInput = '<script>alert("XSS")</script>'
    render(<CommentForm />)
    fireEvent.change(screen.getByLabelText('Comment'), {
      target: { value: maliciousInput }
    })
    fireEvent.click(screen.getByText('Submit'))

    // Verify script tag is escaped/removed
    expect(screen.queryByText('alert("XSS")')).not.toBeInTheDocument()
  })

  it('includes CSRF token in forms', () => {
    render(<ContactForm />)
    expect(screen.getByName('_csrf')).toBeInTheDocument()
  })

  it('enforces authentication on protected routes', async () => {
    const response = await fetch('/api/protected', {
      headers: { Authorization: '' }
    })
    expect(response.status).toBe(401)
  })
})
```

**Manual security checks:**
- `npm audit` passing
- Security headers present (CSP, X-Frame-Options, etc.)
- HTTPS enforced
- Sensitive data not logged
- Rate limiting on API routes

---

## 📊 Issue Priority Levels

All 42 issues have been prioritized:

### 🔴 URGENT (8 issues)
**Blockers - Do First:**
- HOW-117: [PR-001] Value Proposition (blocks 9 issues)
- HOW-119: [TEST-001] Testing Infrastructure (blocks 4 issues)
- HOW-135: [PROD-003] Analytics (blocks 3 issues)
- HOW-118: [PR-002] Activation Moment
- HOW-111: [CM-001] Homepage Hero
- HOW-127: [CM-012] Lead Capture Form
- HOW-138: [PROD-006] Onboarding Flow
- HOW-151: [GTM-007] Launch Checklist

### 🟡 HIGH (23 issues)
**Critical Path - Do Soon:**
Content, SEO foundation, testing, product features

### 🟢 MEDIUM (9 issues)
**Important - Can Wait:**
Supporting pages, advanced SEO

### ⚪ LOW (2 issues)
**Post-Launch:**
GTM content, launch activities

---

## 🚨 Critical Rules

1. **NO COMMITS** without explicit approval
2. **NO MERGES** without explicit approval
3. **NO PR CREATION** without explicit approval
4. **ALWAYS** create OpenSpec proposal before implementation
5. **ALWAYS** update Linear issue with OpenSpec plan
6. **ALWAYS** run all 6 test dimensions before requesting approval
7. **KEEP** Linear as single source of truth for status
8. **USE** OpenSpec for implementation details and audit trail
9. **ONE BRANCH** per Linear issue (no multi-issue branches)
10. **CONVENTIONAL COMMITS** (feat, fix, docs, style, refactor, test, chore)

---

## 🔗 Links & Resources

- **Linear Workspace:** https://linear.app/howdycarter
- **Obsidian Project Docs:** /Users/howdycarter/Documents/obsidian-vaults/howdycarter/01_PROJECTS/Camino/
- **OpenSpec Directory:** /Users/howdycarter/Documents/projects/camino-project/openspec/
- **Project Repository:** /Users/howdycarter/Documents/projects/camino-project/
- **Marketing Site:** /Users/howdycarter/Documents/projects/camino-project/walter-marketing/

---

## 📝 Commit Message Format

Use **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

Linear: HOW-XXX
OpenSpec: archived
Reviewed-by: [Name]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Scope:** Linear issue ID (HOW-XXX)

**Examples:**
```
feat(HOW-117): define value proposition

- Stakeholder meeting held
- Option 3 selected with modification
- Updated Themes.md in Obsidian
- Updated 9 blocked issues

Linear: HOW-117
OpenSpec: archived
Reviewed-by: Howdy Carter
```

```
feat(HOW-119): set up testing infrastructure

- Installed Jest + React Testing Library
- Configured jest.config.js (80% coverage target)
- Added test scripts to package.json
- Created sample Button component test
- Configured Playwright for E2E
- Set up Lighthouse CI in GitHub Actions

All tests passing. Coverage: 82%

Linear: HOW-119
OpenSpec: archived
Reviewed-by: Howdy Carter
```

---

## 🎯 Success Metrics

Track these for each issue:

- **Time to OpenSpec proposal:** <30 minutes
- **Time to first implementation:** <1 day after proposal
- **Test coverage:** >80%
- **All 6 testing dimensions:** Complete
- **Zero commits without approval**
- **Linear issue always reflects current status**
- **OpenSpec proposal matches final implementation**

---

## 🔄 Workflow Summary (TL;DR)

```
1. Create branch: feature/HOW-XXX-name
2. Create OpenSpec proposal in openspec/changes/HOW-XXX-name/
3. Update Linear issue with proposal
4. Implement following OpenSpec spec
5. Check off tasks as completed
6. Run all tests (6 dimensions)
7. ⛔ STOP - Request approval
8. ✅ After approval: Commit → Push → PR → Archive OpenSpec
9. Repeat for next issue
```

---

**Remember:** This workflow ensures quality, traceability, and systematic progress through all 42 issues. Follow it religiously, and we'll ship a world-class product! 🚀

---

*Last updated: 2025-11-02*
*Version: 1.0*
*Issues prioritized: 42/42*
