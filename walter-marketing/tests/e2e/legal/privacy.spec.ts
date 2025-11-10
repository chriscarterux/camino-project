import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Privacy Policy Page
 * Per HOW-517 Phase 2B: Privacy Policy (8 tests)
 *
 * Tests cover:
 * - Policy content visibility
 * - GDPR compliance elements
 * - Last updated date
 * - Navigation and user rights
 */

test.describe('Privacy Policy Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/legal/privacy');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Privacy|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'Privacy Policy' }).first();
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

  test('displays all 8 policy sections @content', async ({ page }) => {
    // Verify all major sections are present
    const sections = [
      'Overview',
      'Information We Collect',
      'How We Use Your Data',
      'Data Ownership',
      'AI Processing',
      'Data Storage & Security',
      'Your Rights',
      'Contact',
    ];

    for (const section of sections) {
      const sectionHeading = page.locator(`h2:has-text("${section}")`).first();
      await expect(sectionHeading).toBeVisible();
    }
  });

  test('displays GDPR compliance elements @content', async ({ page }) => {
    // Data ownership section
    const dataOwnership = page.locator('text=/You own your reflections/i').first();
    await expect(dataOwnership).toBeVisible();

    // User rights section with export/delete options
    const exportData = page.locator('text=/Export your data/i').first();
    await expect(exportData).toBeVisible();

    const deleteAccount = page.locator('text=/Delete your account/i').first();
    await expect(deleteAccount).toBeVisible();

    // Encryption mentioned
    const encryption = page.locator('text=/encrypted/i').first();
    await expect(encryption).toBeVisible();
  });

  test('displays privacy contact email @content', async ({ page }) => {
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

  test('page is responsive on mobile viewport @responsive', async ({ page }) => {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Main content should still be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // At least one section should be visible
    const firstSection = page.locator('h2:has-text("Overview")').first();
    await expect(firstSection).toBeVisible();

    // Navigation should adapt
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
    await page.waitForLoadState('networkidle');

    // Should have no console errors (excluding CSP/TLS warnings)
    expect(consoleErrors).toHaveLength(0);
  });
});
