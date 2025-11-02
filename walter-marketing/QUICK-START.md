# Quick Start - Testing Infrastructure

## TL;DR - Test It Now (30 seconds)

Run this single command to verify the testing infrastructure works:

```bash
npm test
```

**Expected output:**
```
PASS tests/unit/example.test.tsx
  Button Component
    ✓ renders button with correct text (Xms)
    ✓ calls onClick handler when clicked (Xms)
    ✓ applies correct CSS classes (Xms)

PASS tests/integration/auth-flow.test.tsx
  Authentication Flow Integration
    ✓ renders login form with all required fields (Xms)
    ✓ allows user to type in email and password fields (Xms)
    ✓ submits form when sign in button is clicked (Xms)

Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.834 s
```

✅ **If you see this, the testing infrastructure is working!**

---

## What Just Happened?

That command just proved:
- ✅ Jest is installed and configured
- ✅ React Testing Library works
- ✅ TypeScript/JSX transpilation works
- ✅ Component testing works
- ✅ User interaction testing works

---

## All Available Test Commands

```bash
# Unit & Integration Tests (FAST - runs now)
npm test                    # Run all Jest tests
npm run test:watch          # Watch mode (re-runs on save)
npm run test:coverage       # With coverage report

# E2E Tests (REQUIRES: dev server running)
npm run test:e2e            # End-to-end browser tests
npm run test:e2e:ui         # Interactive Playwright UI
npm run test:e2e:debug      # Step-by-step debugging

# Accessibility Tests (REQUIRES: dev server running)
npm run test:a11y           # WCAG compliance checks

# Performance Tests (REQUIRES: production build)
npm run test:perf           # Lighthouse CI audit

# Security Tests (runs now)
npm run test:security       # ESLint security + npm audit

# Everything
npm run test:all            # Run ALL test suites
npm run test:ci             # CI/CD simulation
```

---

## What's Included?

### 6 Testing Dimensions

1. **Unit Tests** - Fast component/function tests
2. **Integration Tests** - Multi-component interactions
3. **E2E Tests** - Full user journeys in real browser
4. **Accessibility Tests** - WCAG 2.1 AA compliance
5. **Performance Tests** - Core Web Vitals monitoring
6. **Security Tests** - OWASP Top 10 coverage

### Example Tests (31 total)

```
tests/
├── unit/example.test.tsx                    # ✅ 3 tests
├── integration/auth-flow.test.tsx           # ✅ 3 tests
├── e2e/homepage.spec.ts                     # 4 tests
├── accessibility/a11y.spec.ts               # 6 tests
├── performance/core-web-vitals.spec.ts      # 5 tests
└── security/security.spec.ts                # 7 tests
```

### Configuration Files

- `jest.config.js` - Jest + Next.js 15 setup
- `jest.setup.js` - Global mocks
- `playwright.config.ts` - E2E test config
- `lighthouserc.json` - Performance thresholds
- `.eslintrc.security.json` - Security rules

### Documentation

- `TESTING.md` - Complete testing guide (14k words)
- `TESTING-VERIFICATION.md` - How to verify each dimension
- `HOW-161-SUMMARY.md` - Implementation summary
- `QUICK-START.md` - This file!

---

## Test Each Dimension

### 1. Unit Tests ✅ (Works Now)

```bash
npm test
```

**What it tests:**
- Component rendering
- User interactions
- Props handling
- State management

**Speed:** < 1 second

---

### 2. Integration Tests ✅ (Works Now)

```bash
npm test tests/integration/
```

**What it tests:**
- Multi-component flows
- Form submissions
- API mocking
- Authentication flows

**Speed:** < 2 seconds

---

### 3. E2E Tests ⏳ (Needs Dev Server)

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run test:e2e
```

**What it tests:**
- Real browser interactions
- Page navigation
- Button clicks
- Form submissions
- Responsive design

**Speed:** 10-30 seconds

**See it in action:**
```bash
npm run test:e2e:ui  # Visual test runner
```

---

### 4. Accessibility Tests ⏳ (Needs Dev Server)

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run test:a11y
```

**What it tests:**
- WCAG violations
- Color contrast
- Keyboard navigation
- Screen reader support
- Form labels
- Heading hierarchy

**Speed:** 10-20 seconds

---

### 5. Performance Tests ⏳ (Needs Production Build)

```bash
# Build first (one time)
npm run build

# Run Lighthouse
npm run test:perf
```

**What it tests:**
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Total Blocking Time (TBT)
- Lighthouse scores

**Speed:** 2-3 minutes (audits pages 3 times)

---

### 6. Security Tests ✅ (Works Now)

```bash
npm run test:security
```

**What it tests:**
- Dependency vulnerabilities
- Hardcoded secrets
- XSS patterns
- SQL injection risks
- Insecure coding patterns

**Speed:** 5-10 seconds

---

## Visual Guides

### Coverage Report

```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

Opens visual HTML report showing:
- What code is tested
- What code is NOT tested
- Line-by-line coverage
- Branch coverage

### Playwright UI (Interactive)

```bash
# Start dev server first
npm run dev

# In another terminal
npm run test:e2e:ui
```

Opens Playwright Inspector where you can:
- Watch tests run in real browsers
- Pause and inspect page state
- See network requests
- Debug test failures visually

---

## Common Workflows

### During Development

```bash
# Terminal 1: Watch tests (auto-runs on save)
npm run test:watch

# Terminal 2: Dev server
npm run dev

# Edit code, tests re-run automatically ✨
```

### Before Committing

```bash
# Run fast tests
npm test

# Run security scan
npm run test:security

# If both pass, you're good to commit!
```

### Before Pushing

```bash
# Start dev server
npm run dev  # Terminal 1

# Run E2E + accessibility
npm run test:e2e && npm run test:a11y  # Terminal 2
```

### Before Deploying

```bash
# Full test suite
npm run test:ci

# If passes, safe to deploy!
```

---

## Verification Checklist

Run through this to verify everything works:

**Right Now (No server needed):**
- [ ] `npm test` → Tests pass
- [ ] `npm run test:security` → Security scan runs
- [ ] `npm run test:coverage` → Coverage report generates

**With Dev Server (npm run dev in Terminal 1):**
- [ ] `npm run test:e2e` → E2E tests run
- [ ] `npm run test:e2e:ui` → Playwright UI opens
- [ ] `npm run test:a11y` → Accessibility tests run

**With Production Build (npm run build first):**
- [ ] `npm run test:perf` → Lighthouse runs

---

## Troubleshooting

### Tests won't run

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Jest cache
npx jest --clearCache
```

### E2E tests timeout

```bash
# Make sure dev server is running
npm run dev  # In separate terminal

# Then run E2E tests
npm run test:e2e
```

### Coverage report missing

```bash
# Generate with explicit flag
npm test -- --coverage

# Open report
open coverage/lcov-report/index.html
```

---

## Next Steps

1. ✅ **You've verified tests work** - Great!
2. 📖 **Read TESTING.md** - Comprehensive guide
3. ✍️ **Write your first test** - Test a real component
4. 🔄 **Set up pre-commit hook** - Auto-run tests
5. 🚀 **Add to CI/CD** - GitHub Actions integration

---

## Questions?

**"How do I test a specific file?"**
```bash
npm test -- path/to/test.test.tsx
```

**"How do I see what's not covered?"**
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

**"How do I debug a failing test?"**
```bash
# For Jest tests
npm test -- --verbose

# For Playwright tests
npm run test:e2e:debug
```

**"How do I skip slow tests locally?"**
```bash
# Run only unit tests (fast)
npm test

# Skip E2E/performance tests
```

---

## Summary

You now have **6-dimensional testing infrastructure**:

| Dimension | Command | Speed | Status |
|-----------|---------|-------|--------|
| Unit | `npm test` | < 1s | ✅ Works now |
| Integration | `npm test` | < 2s | ✅ Works now |
| E2E | `npm run test:e2e` | ~30s | ⏳ Needs dev server |
| Accessibility | `npm run test:a11y` | ~20s | ⏳ Needs dev server |
| Performance | `npm run test:perf` | ~3m | ⏳ Needs build |
| Security | `npm run test:security` | ~10s | ✅ Works now |

**Start with:** `npm test` ← Do this now! 🎯

---

**Ready to verify?** → See `TESTING-VERIFICATION.md` for detailed verification steps
**Ready to learn?** → See `TESTING.md` for comprehensive testing guide
**Need summary?** → See `HOW-161-SUMMARY.md` for implementation details
