# Testing Infrastructure Documentation

## Overview

This document describes the comprehensive 6-dimensional testing infrastructure for the Camino marketing website.

## Test Dimensions

### 1. Unit Tests (Jest + React Testing Library)

**Purpose:** Test individual components and functions in isolation

**Location:** `tests/unit/`

**Run Command:**
```bash
npm test                 # Run all unit tests
npm run test:watch       # Watch mode for development
npm run test:coverage    # Generate coverage report
```

**Example:**
```typescript
// tests/unit/button.test.tsx
import { render, screen } from '@testing-library/react'
import Button from '@/components/Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

**Coverage Thresholds:**
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

### 2. Integration Tests (Jest + React Testing Library)

**Purpose:** Test how multiple components work together

**Location:** `tests/integration/`

**Run Command:**
```bash
npm test tests/integration/
```

**Example:**
```typescript
// tests/integration/auth-flow.test.tsx
test('user can sign in with email and password', async () => {
  // Test complete authentication flow
})
```

### 3. E2E Tests (Playwright)

**Purpose:** Test complete user journeys in a real browser

**Location:** `tests/e2e/`

**Run Command:**
```bash
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Run with Playwright UI
npm run test:e2e:debug        # Debug mode
```

**Example:**
```typescript
// tests/e2e/homepage.spec.ts
test('user can navigate from homepage to pricing', async ({ page }) => {
  await page.goto('/')
  await page.click('a[href="/pricing"]')
  await expect(page).toHaveURL(/pricing/)
})
```

**Configuration:** `playwright.config.ts`

### 4. Accessibility Tests (Playwright + Axe)

**Purpose:** Ensure WCAG 2.1 AAA compliance

**Location:** `tests/accessibility/`

**Run Command:**
```bash
npm run test:a11y
```

**Standards Tested:**
- WCAG 2.0 Level A
- WCAG 2.0 Level AA
- WCAG 2.1 Level A
- WCAG 2.1 Level AA

**Example:**
```typescript
// tests/accessibility/a11y.spec.ts
test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  expect(results.violations).toEqual([])
})
```

**Key Checks:**
- Proper heading hierarchy
- Alt text on images
- Form labels
- Keyboard navigation
- Color contrast
- ARIA attributes

### 5. Performance Tests (Lighthouse CI)

**Purpose:** Ensure Core Web Vitals and performance benchmarks

**Location:** `tests/performance/`

**Run Command:**
```bash
npm run test:perf
```

**Configuration:** `lighthouserc.json`

**Metrics:**
- **LCP (Largest Contentful Paint):** < 2.5s (target: < 2.0s)
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **TBT (Total Blocking Time):** < 300ms
- **FCP (First Contentful Paint):** < 2.0s

**Thresholds:**
- Performance Score: ≥ 90
- Accessibility Score: 100
- Best Practices Score: ≥ 90
- SEO Score: ≥ 90

**Example:**
```typescript
// tests/performance/core-web-vitals.spec.ts
test('meets Core Web Vitals thresholds', async ({ page }) => {
  await page.goto('/')
  const metrics = await getPerformanceMetrics(page)
  expect(metrics.LCP).toBeLessThan(2500)
})
```

### 6. Security Tests (ESLint + Manual Tests)

**Purpose:** Identify security vulnerabilities and enforce secure coding

**Location:** `tests/security/`

**Run Command:**
```bash
npm run test:security
npm audit                    # Check dependency vulnerabilities
```

**Configuration:** `.eslintrc.security.json`

**Security Checks:**
- No hardcoded secrets/API keys
- SQL injection prevention
- XSS (Cross-Site Scripting) prevention
- CSRF protection
- Security headers (X-Frame-Options, CSP, etc.)
- HTTPS enforcement
- Secure cookie settings
- Rate limiting on API routes
- Input sanitization

**OWASP Top 10 Coverage:**
1. Injection (SQL, XSS)
2. Broken Authentication
3. Sensitive Data Exposure
4. XML External Entities (XXE)
5. Broken Access Control
6. Security Misconfiguration
7. Cross-Site Scripting (XSS)
8. Insecure Deserialization
9. Using Components with Known Vulnerabilities
10. Insufficient Logging & Monitoring

## Running All Tests

### Development Workflow

```bash
# During development - run unit tests in watch mode
npm run test:watch

# Before committing - run relevant test suites
npm test                    # Unit + Integration
npm run test:e2e           # E2E tests
npm run test:a11y          # Accessibility

# Full test suite (takes longer)
npm run test:all
```

### CI/CD Pipeline

```bash
# Run in CI
npm run test:ci
```

This includes:
- Unit tests with coverage
- E2E tests
- Accessibility tests

## Test Organization

```
tests/
├── unit/               # Component unit tests
│   └── *.test.tsx
├── integration/        # Integration tests
│   └── *.test.tsx
├── e2e/               # End-to-end tests
│   └── *.spec.ts
├── accessibility/     # Accessibility tests
│   └── *.spec.ts
├── performance/       # Performance tests
│   └── *.spec.ts
└── security/          # Security tests
    └── *.spec.ts
```

## Writing Tests

### Unit Test Template

```typescript
import { render, screen } from '@testing-library/react'
import { ComponentName } from '@/components/ComponentName'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByRole('...')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    const user = userEvent.setup()
    render(<ComponentName />)
    await user.click(screen.getByRole('button'))
    // assertions
  })
})
```

### E2E Test Template

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should complete user journey', async ({ page }) => {
    await page.goto('/')
    // interact with page
    await expect(page).toHaveURL(/expected/)
  })
})
```

## Configuration Files

- `jest.config.js` - Jest configuration for unit/integration tests
- `jest.setup.js` - Jest setup file with global mocks
- `playwright.config.ts` - Playwright E2E test configuration
- `lighthouserc.json` - Lighthouse CI performance thresholds
- `.eslintrc.security.json` - Security-focused ESLint rules

## Best Practices

### 1. Test Pyramid
- **Many** unit tests (fast, isolated)
- **Some** integration tests (moderate speed)
- **Few** E2E tests (slow, comprehensive)

### 2. Test Naming
```typescript
// Good
test('user can sign in with valid credentials')

// Bad
test('test1')
```

### 3. Arrange-Act-Assert Pattern
```typescript
test('button click increments counter', () => {
  // Arrange
  render(<Counter />)

  // Act
  fireEvent.click(screen.getByRole('button'))

  // Assert
  expect(screen.getByText('1')).toBeInTheDocument()
})
```

### 4. Avoid Testing Implementation Details
```typescript
// Good - test behavior
expect(screen.getByText('Welcome')).toBeInTheDocument()

// Bad - test implementation
expect(component.state.isLoaded).toBe(true)
```

### 5. Use Data-TestId Sparingly
Prefer semantic queries (role, label, text) over data-testid

```typescript
// Good
screen.getByRole('button', { name: /submit/i })

// Acceptable when no alternative
screen.getByTestId('complex-widget')
```

## Continuous Integration

### Pre-Commit Hook
```bash
# Add to .husky/pre-commit
npm test
npm run lint
```

### GitHub Actions (Example)
```yaml
- name: Run tests
  run: npm run test:ci

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Troubleshooting

### Jest Tests Failing

**Issue:** Module resolution errors
```bash
# Clear Jest cache
npx jest --clearCache
```

**Issue:** TypeScript types not found
```bash
npm install --save-dev @types/jest @types/node
```

### Playwright Tests Failing

**Issue:** Browser not installed
```bash
npx playwright install
```

**Issue:** Tests timing out
```typescript
// Increase timeout in test
test('slow test', async ({ page }) => {
  test.setTimeout(60000) // 60 seconds
  // ...
})
```

### Performance Tests Failing

**Issue:** LCP threshold exceeded
- Check image sizes (use next/image)
- Enable CDN caching
- Lazy load below-the-fold content

**Issue:** CLS problems
- Add width/height to images
- Reserve space for ads/embeds
- Avoid inserting content above existing content

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Axe Accessibility](https://www.deque.com/axe/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Support

For questions or issues with testing:
1. Check this documentation
2. Review example tests in `tests/` directories
3. Consult the HOW-161 Linear issue for context
