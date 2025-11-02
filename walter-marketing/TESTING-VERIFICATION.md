# Testing Infrastructure Verification Guide

This guide shows you how to verify that each testing dimension actually works as advertised.

## Quick Verification (5 minutes)

Run these commands in order to verify all test dimensions:

```bash
# 1. Unit Tests (should pass - 6 tests)
npm test

# 2. E2E Tests (will fail - no dev server running yet, but proves Playwright works)
npm run test:e2e

# 3. Check that test scripts exist
npm run test:watch --help
npm run test:coverage --help
npm run test:a11y --help
```

## Detailed Verification by Dimension

### 1. Unit Tests - VERIFY NOW ✅

**Run this:**
```bash
npm test
```

**Expected output:**
```
PASS tests/unit/example.test.tsx
  Button Component
    ✓ renders button with correct text
    ✓ calls onClick handler when clicked
    ✓ applies correct CSS classes

PASS tests/integration/auth-flow.test.tsx
  Authentication Flow Integration
    ✓ renders login form with all required fields
    ✓ allows user to type in email and password fields
    ✓ submits form when sign in button is clicked

Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
```

**What this proves:**
- ✅ Jest is configured correctly
- ✅ TypeScript/JSX is being transpiled
- ✅ React Testing Library works
- ✅ Component rendering works
- ✅ User interaction testing works

**Try breaking a test:**
```bash
# Edit tests/unit/example.test.tsx
# Change line 12 from:
expect(screen.getByText('Click me')).toBeInTheDocument()
# To:
expect(screen.getByText('Wrong text')).toBeInTheDocument()

# Run test again - should FAIL
npm test

# Change it back and tests should PASS again
```

---

### 2. Integration Tests - VERIFY NOW ✅

**Run this:**
```bash
npm test tests/integration/
```

**Expected output:**
```
PASS tests/integration/auth-flow.test.tsx
  Authentication Flow Integration
    ✓ renders login form with all required fields
    ✓ allows user to type in email and password fields
    ✓ submits form when sign in button is clicked
```

**What this proves:**
- ✅ Multi-component interactions work
- ✅ Supabase mocking works (check jest.setup.js)
- ✅ Form interactions can be tested

---

### 3. E2E Tests - NEED DEV SERVER ⏳

**Prerequisites:**
You need the dev server running first.

**Option A: Run with dev server (recommended)**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run E2E tests
npm run test:e2e
```

**Option B: Let Playwright start the server automatically**
```bash
# This uses the webServer config in playwright.config.ts
npm run test:e2e
```

**Expected behavior:**
- Browser opens (or runs headless)
- Navigates to http://localhost:3000
- Tests interact with actual rendered pages
- Tests either pass or fail with specific errors

**What this proves:**
- ✅ Playwright is installed
- ✅ Browser automation works
- ✅ Real browser testing works
- ✅ Navigation testing works

**Interactive mode (see it in action):**
```bash
npm run test:e2e:ui
```
This opens Playwright's UI where you can:
- See tests run in real browsers
- Debug failures visually
- Step through tests line by line

---

### 4. Accessibility Tests - VERIFY WITH DEV SERVER ⏳

**Run this:**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run accessibility tests
npm run test:a11y
```

**What happens:**
- Playwright opens your pages
- Axe scans for WCAG violations
- Reports specific accessibility issues

**Expected output (if violations found):**
```
❌ Expected: []
   Received: [
     {
       "id": "color-contrast",
       "impact": "serious",
       "description": "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds"
     }
   ]
```

**Expected output (if no violations):**
```
✓ homepage should not have accessibility violations
✓ pricing page should not have accessibility violations
✓ form elements should have proper labels
✓ should have proper heading hierarchy
✓ images should have alt text
✓ should support keyboard navigation
```

**What this proves:**
- ✅ Axe accessibility scanner works
- ✅ WCAG compliance is being checked
- ✅ Specific a11y rules are tested

**Test it with a violation:**
Create a test page with bad contrast and watch it fail.

---

### 5. Performance Tests - VERIFY WITH BUILT APP ⏳

**Prerequisites:**
Lighthouse needs a production build.

**Run this:**
```bash
# Build the app first
npm run build

# Run Lighthouse CI
npm run test:perf
```

**What happens:**
- Starts production server
- Lighthouse audits pages 3 times
- Calculates median scores
- Compares against thresholds in lighthouserc.json

**Expected output:**
```
Checking assertions against 3 run(s)...

  ✓ categories:performance >= 0.9
  ✓ categories:accessibility >= 1.0
  ✓ categories:best-practices >= 0.9
  ✓ first-contentful-paint <= 2000ms
  ⚠ largest-contentful-paint <= 2500ms
```

**What this proves:**
- ✅ Lighthouse CI is configured
- ✅ Core Web Vitals are measured
- ✅ Performance thresholds are enforced
- ✅ Multiple page audits work

**Note:** This is the slowest test (takes 2-3 minutes).

---

### 6. Security Tests - VERIFY NOW ✅

**Run this:**
```bash
npm run test:security
```

**This runs TWO things:**

**Part 1: npm audit (dependency vulnerabilities)**
```
Expected output (if no vulnerabilities):
found 0 vulnerabilities

Expected output (if vulnerabilities):
4 low severity vulnerabilities
To address all issues, run: npm audit fix
```

**Part 2: ESLint security scan**
```
Expected output (if code is clean):
✨  Done

Expected output (if issues found):
/path/to/file.ts
  12:5  error  Possible timing attack  security/detect-possible-timing-attacks
  45:10 error  Possible hardcoded secret  no-secrets/no-secrets
```

**What this proves:**
- ✅ Dependency scanning works
- ✅ Security ESLint rules work
- ✅ Secret detection works
- ✅ OWASP patterns are checked

**Test it with a violation:**
```bash
# Add this to any .ts file:
const apiKey = "sk_live_" + "example_key_here"  // Intentionally obfuscated

# Run security scan
npm run test:security

# Should catch patterns like hardcoded API keys
```

---

## Comprehensive Test (Run Everything)

### Full Test Suite
```bash
npm run test:all
```

**This runs:**
1. Unit tests (Jest)
2. E2E tests (Playwright) - needs dev server
3. Accessibility tests (Playwright + Axe) - needs dev server
4. Security tests (ESLint + npm audit)

**Estimated time:** 2-5 minutes (depending on app size)

---

## CI/CD Simulation

**Run what would run in CI:**
```bash
npm run test:ci
```

**This runs:**
1. Unit tests with coverage report
2. E2E tests
3. Accessibility tests

**Coverage report location:**
```
coverage/
├── lcov-report/index.html  # Open this in browser
└── lcov.info               # For CI tools
```

---

## Test Coverage Verification

**Generate coverage report:**
```bash
npm run test:coverage
```

**Expected output:**
```
File           | % Stmts | % Branch | % Funcs | % Lines |
---------------|---------|----------|---------|---------|
All files      |   95.5  |   90.2   |   88.9  |   96.1  |
```

**View in browser:**
```bash
open coverage/lcov-report/index.html
```

**What this proves:**
- ✅ Coverage collection works
- ✅ Thresholds are enforced (70%)
- ✅ HTML reports are generated
- ✅ Uncovered code is highlighted

---

## Watch Mode (Developer Experience)

**Run tests in watch mode:**
```bash
npm run test:watch
```

**What happens:**
- Tests run automatically on file changes
- Only changed tests run (fast feedback)
- Interactive menu for filtering tests

**Try it:**
1. Start watch mode
2. Edit `tests/unit/example.test.tsx`
3. Save the file
4. Watch tests re-run automatically

**What this proves:**
- ✅ Fast feedback loop works
- ✅ Developer experience is smooth
- ✅ No manual re-running needed

---

## Debug Mode (When Tests Fail)

**Debug Playwright tests:**
```bash
npm run test:e2e:debug
```

**What happens:**
- Playwright Inspector opens
- You can step through tests
- See browser actions in real-time
- Inspect page state at each step

**What this proves:**
- ✅ Debugging tools work
- ✅ Test failures can be investigated
- ✅ Visual feedback is available

---

## Verification Checklist

Copy this checklist and check off as you verify:

### Immediate Verification (No server needed)
- [ ] `npm test` - Unit tests pass (6 tests)
- [ ] `npm run test:coverage` - Coverage report generated
- [ ] `npm run test:security` - Security scan completes
- [ ] `open coverage/lcov-report/index.html` - Coverage report opens

### With Dev Server (Terminal 1: npm run dev)
- [ ] `npm run test:e2e` - E2E tests run
- [ ] `npm run test:e2e:ui` - Playwright UI opens
- [ ] `npm run test:a11y` - Accessibility tests run

### With Production Build (npm run build first)
- [ ] `npm run test:perf` - Lighthouse CI runs
- [ ] Performance scores displayed
- [ ] Thresholds enforced

### Developer Experience
- [ ] `npm run test:watch` - Watch mode works
- [ ] `npm run test:e2e:debug` - Debug mode opens
- [ ] Edit test file - Watch mode re-runs automatically

### All Together
- [ ] `npm run test:all` - Full suite runs
- [ ] `npm run test:ci` - CI simulation works

---

## Expected File Changes

After running tests, you should see these new directories:

```
walter-marketing/
├── coverage/              # From npm run test:coverage
│   ├── lcov-report/      # HTML coverage report
│   └── lcov.info         # Coverage data
├── test-results/         # From Playwright failures
├── playwright-report/    # From Playwright HTML reporter
└── .lighthouseci/        # From Lighthouse CI
```

These are all gitignored.

---

## Troubleshooting Verification

### "npm test" doesn't work
```bash
# Check Jest is installed
npm list jest

# Clear Jest cache
npx jest --clearCache

# Run with verbose output
npm test -- --verbose
```

### "npm run test:e2e" times out
```bash
# Make sure dev server is running
npm run dev  # In separate terminal

# Or let Playwright start it (may take longer first time)
npm run test:e2e
```

### "npm run test:perf" fails
```bash
# Make sure you built first
npm run build

# Check port 3000 is free
lsof -i :3000  # Kill any process using port 3000
```

### No coverage report generated
```bash
# Check configuration
cat jest.config.js | grep collectCoverage

# Force coverage collection
npm test -- --coverage
```

---

## Quick Smoke Test (30 seconds)

**Run this single command to verify basics:**
```bash
npm test && echo "✅ Unit tests work!" || echo "❌ Unit tests broken"
```

**Expected output:**
```
Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
✅ Unit tests work!
```

---

## Next Steps After Verification

Once you've verified everything works:

1. **Read the examples** - Look at the test files to understand patterns
2. **Write your first test** - Test a real component from the app
3. **Set up pre-commit hook** - Run tests before every commit
4. **Integrate with CI** - Add to GitHub Actions or your CI tool
5. **Monitor coverage** - Keep it above 70%

---

## Questions to Answer During Verification

**Unit Tests:**
- ✅ Do tests run in under 1 second?
- ✅ Can you test components?
- ✅ Can you test user interactions?

**E2E Tests:**
- ✅ Does browser open (or run headless)?
- ✅ Can you navigate pages?
- ✅ Can you test user flows?

**Accessibility:**
- ✅ Are WCAG violations detected?
- ✅ Are specific issues reported?
- ✅ Can you test keyboard navigation?

**Performance:**
- ✅ Are Core Web Vitals measured?
- ✅ Are thresholds enforced?
- ✅ Do you get specific metrics?

**Security:**
- ✅ Are dependencies scanned?
- ✅ Are code patterns checked?
- ✅ Are secrets detected?

If you can answer YES to all these questions, the testing infrastructure is fully functional! 🎉
