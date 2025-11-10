import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Life Model Framework Page
 * Per HOW-517 Phase 2A: Life Model Page (10 tests)
 *
 * Tests cover:
 * - Life Model explanation
 * - Framework overview (5 phases)
 * - Benefits section (7 principles)
 * - CTA to framework page
 * - Navigation and accessibility
 */

test.describe('Life Model Framework Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/life-model-framework');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Life Model|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('displays all 5 framework phases @content', async ({ page }) => {
    // Verify all 5 phases are present
    const phaseNames = [
      'Foundation',
      'Psychometrics',
      'Personal History',
      'Context Engineering',
      'AI Integration',
    ];

    for (const phaseName of phaseNames) {
      const phase = page.locator(`text=${phaseName}`).first();
      await expect(phase).toBeVisible();
    }

    // Verify phase numbers 1-5 are present (displayed as "Phase 1:", "Phase 2:", etc.)
    for (let i = 1; i <= 5; i++) {
      const phaseNumber = page.locator(`text=/Phase ${i}:/`).first();
      await expect(phaseNumber).toBeVisible();
    }
  });

  test('displays all 7 framework principles @content', async ({ page }) => {
    const principlesTitles = [
      'Context is King',
      'Integration Over Isolation',
      'Actionable Self-Knowledge',
      'Validated Foundations',
      'Portable Intelligence',
      'Privacy First',
      'Continuous Refinement',
    ];

    for (const title of principlesTitles) {
      const principle = page.locator(`text="${title}"`).first();
      await expect(principle).toBeVisible();
    }
  });

  test('phase durations are displayed correctly @content', async ({ page }) => {
    // Check that each phase shows its duration
    const durations = ['7 days', '3-5 days', '7-10 days', '5-7 days', '3-5 days'];

    for (const duration of durations) {
      const durationText = page.locator(`text="${duration}"`).first();
      await expect(durationText).toBeVisible();
    }
  });

  test('navigation links are present and clickable', async ({ page }) => {
    const navLinks = [
      { text: 'How it works', href: '/how-it-works' },
      { text: 'Pricing', href: '/pricing' },
      { text: 'Framework', href: '/life-model-framework' },
      { text: 'Essays', href: '/essays' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a:has-text("${link.text}")`).first();
      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveAttribute('href', link.href);
    }
  });

  test('CTA buttons are visible and functional @interaction', async ({ page }) => {
    // Look for primary CTA buttons (Get Started, Download, etc.)
    const ctaButtons = page.locator('button, a').filter({ hasText: /Get Started|Download|Sign Up|Start Free/i });

    // At least one CTA should be present
    const ctaCount = await ctaButtons.count();
    expect(ctaCount).toBeGreaterThan(0);

    // First CTA should be visible
    const firstCta = ctaButtons.first();
    await expect(firstCta).toBeVisible();
  });

  test('page is responsive on mobile viewport @responsive', async ({ page }) => {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Main content should still be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Scroll to phases section (phases might be below the fold on mobile)
    await page.evaluate(() => window.scrollTo(0, 800));

    // At least one phase heading should be visible after scrolling
    const phasesHeading = page.locator('text=The 5 Phases').first();
    await expect(phasesHeading).toBeVisible();

    // Navigation should adapt (mobile menu or collapsed nav)
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
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

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Should have no console errors (excluding CSP/TLS warnings)
    expect(consoleErrors).toHaveLength(0);
  });

  test('logo links back to homepage @navigation', async ({ page }) => {
    const logo = page.locator('nav a:has(img[alt*="Camino"])').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');

    // Click logo and verify navigation
    await logo.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
  });

  test('page content is accessible via keyboard @accessibility', async ({ page }) => {
    // Focus on the page first
    await page.locator('body').click();

    // Tab through interactive elements
    await page.keyboard.press('Tab'); // First focusable element (logo)

    // Verify at least one element is focusable and visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Continue tabbing to verify navigation is keyboard accessible
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // At least one element should still be focused
    await expect(page.locator(':focus')).toBeVisible();
  });
});
