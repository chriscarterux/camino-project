import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Newsletter Page
 * Per HOW-517 Phase 2A: Newsletter Page (12 tests)
 *
 * Tests cover:
 * - Newsletter signup form with email validation
 * - Form submission and success state
 * - What You'll Get section (4 benefits)
 * - Newsletter stats display
 * - Privacy notice
 * - Navigation and responsive design
 */

test.describe('Newsletter Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/newsletter');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Newsletter|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'The Camino Newsletter' }).first();
    await expect(heading).toBeVisible();
  });

  test('displays hero section explaining newsletter @content', async ({ page }) => {
    // Hero should explain weekly insights
    const weekly = page.locator('text=/Weekly insights/i').first();
    await expect(weekly).toBeVisible();

    // No spam promise
    const noSpam = page.locator('text=/No spam.*no sales pitches/i').first();
    await expect(noSpam).toBeVisible();

    // Evidence-based content
    const evidenceBased = page.locator('text=/evidence-based/i').first();
    await expect(evidenceBased).toBeVisible();
  });

  test('displays email signup form @content', async ({ page }) => {
    // Email input should be visible
    const emailInput = page.locator('input[type="email"]#email').first();
    await expect(emailInput).toBeVisible();

    // Label should be visible
    const label = page.locator('label[for="email"]').first();
    await expect(label).toBeVisible();
    await expect(label).toHaveText(/Email Address/i);

    // Subscribe button should be visible
    const submitButton = page.locator('button[type="submit"]').first();
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText(/Subscribe/i);
  });

  test('form validation - empty email @validation', async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // HTML5 validation should prevent submission or show error
    const emailInput = page.locator('input[type="email"]#email').first();
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => {
      return !el.validity.valid || el.getAttribute('aria-invalid') === 'true';
    });

    // Either HTML5 validation or custom validation should trigger
    expect(isInvalid).toBeTruthy();
  });

  test('form validation - invalid email format @validation', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]#email').first();
    const submitButton = page.locator('button[type="submit"]').first();

    // Enter invalid email
    await emailInput.fill('notanemail');
    await submitButton.click();
    await page.waitForTimeout(500);

    // Should show error message or HTML5 validation
    const errorMessage = page.locator('text=/valid email/i').first();
    const errorVisible = await errorMessage.isVisible().catch(() => false);

    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => {
      return !el.validity.valid;
    });

    // Either custom error or HTML5 validation should trigger
    expect(errorVisible || isInvalid).toBeTruthy();
  });

  test('form accepts valid email @validation', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]#email').first();

    // Fill valid email
    await emailInput.fill('test@example.com');

    // Email should be accepted
    const value = await emailInput.inputValue();
    expect(value).toBe('test@example.com');

    // Input should be valid
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => {
      return el.validity.valid;
    });
    expect(isValid).toBeTruthy();
  });

  test('form submission shows success state @functionality', async ({ page, browserName }) => {
    // Known issue: Form submission success state doesn't render in webkit
    // Works correctly in chromium and firefox
    test.skip(browserName === 'webkit', 'Webkit form submission rendering issue');

    const emailInput = page.locator('input[type="email"]#email').first();
    const submitButton = page.locator('button[type="submit"]').first();

    // Fill and submit form
    await emailInput.fill('test@example.com');
    await submitButton.click();

    // Wait for success message to appear
    const successMessage = page.locator('h2', { hasText: 'subscribed' }).first();
    await expect(successMessage).toBeVisible({ timeout: 10000 });

    // Check icon should be visible
    const checkIcon = page.locator('svg').filter({ has: page.locator('path') }).first();
    await expect(checkIcon).toBeVisible();
  });

  test('displays "What You\'ll Get" section with 4 benefits @content', async ({ page }) => {
    // What You'll Get heading
    const heading = page.locator('h2:has-text("What You\'ll Get")').first();
    await expect(heading).toBeVisible();

    // All 4 benefit cards
    const benefits = [
      'Weekly Insights',
      'Behind the Scenes',
      'Expert Perspectives',
      'Community Stories',
    ];

    for (const benefit of benefits) {
      const benefitCard = page.locator(`h3:has-text("${benefit}")`).first();
      await expect(benefitCard).toBeVisible();
    }
  });

  test('displays newsletter stats @content', async ({ page }) => {
    // Newsletter stats should be visible
    const stats = [
      'Weekly',
      '5 min',
      '0',
      '100%',
    ];

    for (const stat of stats) {
      const statValue = page.locator(`div:has-text("${stat}")`).first();
      await expect(statValue).toBeVisible();
    }

    // Should mention no spam
    const noSpam = page.locator('text=/Spam Emails/i').first();
    await expect(noSpam).toBeVisible();

    // Should mention unsubscribe
    const unsubscribe = page.locator('text=/Unsubscribe Anytime/i').first();
    await expect(unsubscribe).toBeVisible();
  });

  test('displays privacy notice with links @content', async ({ page }) => {
    // Privacy notice heading
    const privacyHeading = page.locator('h2:has-text("Your Privacy Matters")').first();
    await expect(privacyHeading).toBeVisible();

    // Privacy policy link
    const privacyLink = page.locator('a[href="/legal/privacy"]').first();
    await expect(privacyLink).toBeVisible();

    // Terms link
    const termsLink = page.locator('a[href="/legal/terms"]').first();
    await expect(termsLink).toBeVisible();

    // Privacy commitment text
    const commitment = page.locator('text=/never share your information/i').first();
    await expect(commitment).toBeVisible();
  });

  test('navigation elements work correctly @navigation', async ({ page }) => {
    // Logo should be visible and link to homepage
    const logo = page.locator('nav a:has(img[alt="Camino"])').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');

    // Team link should be visible
    const teamLink = page.locator('nav a:has-text("Team")').first();
    await expect(teamLink).toBeVisible();

    // Join Waitlist button should be visible
    const joinButton = page.locator('text=/Join.*Waitlist/i').first();
    await expect(joinButton).toBeVisible();
  });

  test('page has no console errors @quality', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        // Filter out expected CSP warnings and TLS errors
        const text = msg.text();
        if (!text.includes('Content-Security-Policy') &&
            !text.includes('plugin-types') &&
            !text.includes('TLS error') &&
            !text.includes('Failed to load resource')) {
          consoleErrors.push(text);
        }
      }
    });

    // Reload page to check for console errors
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should have no console errors (excluding CSP/TLS warnings)
    expect(consoleErrors).toHaveLength(0);
  });
});
