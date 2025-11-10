import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Resources Page
 * Per HOW-517 Phase 2A: Resources Page (12 tests)
 *
 * Tests cover:
 * - Resource listings (8 resources)
 * - Category filtering (5 categories)
 * - Download buttons
 * - Resource count display
 * - Navigation and responsive design
 */

test.describe('Resources Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resources');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Resources|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'Free Resources' }).first();
    await expect(heading).toBeVisible();
  });

  test('displays hero section explaining free resources @content', async ({ page }) => {
    // Hero should explain resources are free
    const free = page.locator('text=/All resources are free/i').first();
    await expect(free).toBeVisible();

    // No signup required
    const noSignup = page.locator('text=/No signup required/i').first();
    await expect(noSignup).toBeVisible();

    // Evidence-based methods
    const evidenceBased = page.locator('text=/evidence-based/i').first();
    await expect(evidenceBased).toBeVisible();
  });

  test('displays all 5 category filter buttons @content', async ({ page }) => {
    // All category buttons should be visible
    const categories = [
      'All Resources',
      'Frameworks',
      'Guides',
      'Videos',
      'Podcasts',
    ];

    for (const category of categories) {
      const categoryButton = page.locator(`button:has-text("${category}")`).first();
      await expect(categoryButton).toBeVisible();
    }
  });

  test('displays all 8 resources by default @content', async ({ page }) => {
    // Should show 8 resources initially (all)
    const resourceCards = page.locator('text=Download').count();
    expect(await resourceCards).toBeGreaterThanOrEqual(8);

    // Should display resource count
    const count = page.locator('text=/Showing.*resources/i').first();
    await expect(count).toBeVisible();
  });

  test('each resource has title, description, and download button @content', async ({ page }) => {
    // Check first resource has all elements
    const firstResource = page.locator('h3').first();
    await expect(firstResource).toBeVisible();

    // Should have description
    const description = page.locator('text=/Comprehensive guide|Learn how to|Evidence-based/i').first();
    await expect(description).toBeVisible();

    // Should have download button
    const downloadButton = page.locator('button:has-text("Download"), a:has-text("Download")').first();
    await expect(downloadButton).toBeVisible();
  });

  test('category filtering works - Frameworks @functionality', async ({ page }) => {
    // Click Frameworks category
    const frameworksButton = page.locator('button:has-text("Frameworks")').first();
    await frameworksButton.click();
    await page.waitForTimeout(500);

    // Should show Life Model Framework
    const lifeModel = page.locator('text=/Life Model Framework/i').first();
    await expect(lifeModel).toBeVisible();

    // Should show Neurodivergent Productivity Framework
    const neurodivergent = page.locator('text=/Neurodivergent.*Framework/i').first();
    await expect(neurodivergent).toBeVisible();

    // Resource count should update
    const count = page.locator('text=/Showing.*resource/i').first();
    await expect(count).toBeVisible();
  });

  test('category filtering works - Guides @functionality', async ({ page }) => {
    // Click Guides category
    const guidesButton = page.locator('button:has-text("Guides")').first();
    await guidesButton.click();
    await page.waitForTimeout(500);

    // Should show Context Engineering guide
    const contextEngineering = page.locator('text=/Context Engineering/i').first();
    await expect(contextEngineering).toBeVisible();

    // Should show Psychometrics guide
    const psychometrics = page.locator('text=/Psychometrics/i').first();
    await expect(psychometrics).toBeVisible();
  });

  test('category filtering works - Videos @functionality', async ({ page }) => {
    // Click Videos category
    const videosButton = page.locator('button:has-text("Videos")').first();
    await videosButton.click();
    await page.waitForTimeout(500);

    // Should show video content
    const video = page.locator('text=/AI-Powered Reflection|Video/i').first();
    await expect(video).toBeVisible();
  });

  test('category filtering works - Podcasts @functionality', async ({ page }) => {
    // Click Podcasts category
    const podcastsButton = page.locator('button:has-text("Podcasts")').first();
    await podcastsButton.click();
    await page.waitForTimeout(500);

    // Should show podcast content
    const podcast = page.locator('text=/Future of Personal Growth|Podcast/i').first();
    await expect(podcast).toBeVisible();
  });

  test('download buttons have correct attributes @content', async ({ page }) => {
    // First download button
    const downloadLink = page.locator('a:has-text("Download")').first();
    await expect(downloadLink).toBeVisible();

    // Should have target="_blank"
    const target = await downloadLink.getAttribute('target');
    expect(target).toBe('_blank');

    // Should have rel="noopener noreferrer"
    const rel = await downloadLink.getAttribute('rel');
    expect(rel).toContain('noopener');
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
