import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Cookie Policy Page
 * Per HOW-517 Phase 2B: Cookie Policy (8 tests)
 *
 * Tests cover:
 * - Cookie policy content
 * - Types of cookies explained
 * - User control options
 * - Navigation elements
 */

test.describe('Cookie Policy Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/legal/cookies');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Cookie|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'Cookie Policy' }).first();
    await expect(heading).toBeVisible();
  });

  test('displays last updated date @content', async ({ page }) => {
    // Last updated date should be visible
    const lastUpdated = page.locator('text=/Last updated:/i').first();
    await expect(lastUpdated).toBeVisible();

    // Should contain a date
    const dateText = await lastUpdated.textContent();
    expect(dateText).toMatch(/\d{4}/); // Should contain a year
  });

  test('displays all cookie policy sections @content', async ({ page }) => {
    // Verify all major sections are present
    const sections = [
      'Overview',
      'Types of Cookies We Use',
      'Managing Cookies',
      'Contact',
    ];

    for (const section of sections) {
      const sectionHeading = page.locator(`h2:has-text("${section}")`).first();
      await expect(sectionHeading).toBeVisible();
    }
  });

  test('displays all 3 types of cookies @content', async ({ page }) => {
    // Verify all cookie types are explained
    const cookieTypes = [
      'Essential Cookies',
      'Analytics Cookies',
      'Preference Cookies',
    ];

    for (const cookieType of cookieTypes) {
      const cookieDescription = page.locator(`text=${cookieType}`).first();
      await expect(cookieDescription).toBeVisible();
    }
  });

  test('explains cookie purposes @content', async ({ page }) => {
    // Essential cookies explanation
    const essential = page.locator('text=/authentication.*core functionality/i').first();
    await expect(essential).toBeVisible();

    // Analytics cookies explanation
    const analytics = page.locator('text=/Anonymous data/i').first();
    await expect(analytics).toBeVisible();

    // Preference cookies explanation
    const preference = page.locator('text=/theme.*language/i').first();
    await expect(preference).toBeVisible();
  });

  test('displays cookie management options @content', async ({ page }) => {
    // Managing cookies section
    const management = page.locator('text=/disable cookies in your browser/i').first();
    await expect(management).toBeVisible();

    // Warning about functionality
    const functionalityWarning = page.locator('text=/some features may not function/i').first();
    await expect(functionalityWarning).toBeVisible();
  });

  test('displays contact email @content', async ({ page }) => {
    // Privacy contact email should be visible and clickable
    const emailLink = page.locator('a[href*="privacy@camino"]').first();
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', /mailto:privacy@camino/);
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
});
