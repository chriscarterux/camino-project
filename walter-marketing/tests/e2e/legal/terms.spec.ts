import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Terms of Service Page
 * Per HOW-517 Phase 2B: Terms of Service (8 tests)
 *
 * Tests cover:
 * - Terms content visibility
 * - All major sections
 * - Effective date
 * - Navigation elements
 */

test.describe('Terms of Service Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/legal/terms');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Terms|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'Terms of Service' }).first();
    await expect(heading).toBeVisible();
  });

  test('displays effective date @content', async ({ page }) => {
    // Effective date should be visible
    const effectiveDate = page.locator('text=/Effective Date:/i').first();
    await expect(effectiveDate).toBeVisible();

    // Should contain a date
    const dateText = await effectiveDate.textContent();
    expect(dateText).toMatch(/\d{4}/); // Should contain a year
  });

  test('displays all 8 terms sections @content', async ({ page }) => {
    // Verify all major sections are present
    const sections = [
      'Agreement',
      'Eligibility',
      'Subscriptions & Billing',
      'Intellectual Property',
      'User Conduct',
      'Disclaimers',
      'Limitation of Liability',
      'Contact',
    ];

    for (const section of sections) {
      const sectionHeading = page.locator(`h2:has-text("${section}")`).first();
      await expect(sectionHeading).toBeVisible();
    }
  });

  test('displays subscription and billing terms @content', async ({ page }) => {
    // Subscription terms should be visible
    const autoRenew = page.locator('text=/renew automatically/i').first();
    await expect(autoRenew).toBeVisible();

    const cancelAnytime = page.locator('text=/Cancel anytime/i').first();
    await expect(cancelAnytime).toBeVisible();

    const refunds = page.locator('text=/Refunds/i').first();
    await expect(refunds).toBeVisible();
  });

  test('displays user conduct and disclaimers @content', async ({ page }) => {
    // User conduct section
    const conduct = page.locator('text=/User Conduct/i').first();
    await expect(conduct).toBeVisible();

    // Disclaimer about therapy
    const therapyDisclaimer = page.locator('text=/not a substitute for therapy/i').first();
    await expect(therapyDisclaimer).toBeVisible();

    // Age requirement
    const ageRequirement = page.locator('text=/18 or older/i').first();
    await expect(ageRequirement).toBeVisible();
  });

  test('displays support contact email @content', async ({ page }) => {
    // Support contact email should be visible and clickable
    const emailLink = page.locator('a[href*="support@camino"]').first();
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', /mailto:support@camino/);
  });

  test('navigation elements work correctly @navigation', async ({ page }) => {
    // Logo should be visible and link to homepage
    const logo = page.locator('nav a:has(img[alt*="Camino"])').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');

    // Back to Home button should be visible
    const backButton = page.locator('text=Back to Home').first();
    await expect(backButton).toBeVisible();

    // Click back button and verify navigation
    await backButton.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
  });

  test('page is responsive on mobile viewport @responsive', async ({ page }) => {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Main content should still be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // At least one section should be visible
    const firstSection = page.locator('h2:has-text("Agreement")').first();
    await expect(firstSection).toBeVisible();

    // Navigation should adapt
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });
});
