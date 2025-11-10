import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Entry Points Page
 * Per HOW-517 Phase 2A: Entry Points Page (12 tests)
 *
 * Tests cover:
 * - 4 coaching entry point cards
 * - Each entry point with icon, description, benefits, CTA
 * - "Not Sure" section for uncertain users
 * - Navigation and responsive design
 */

test.describe('Entry Points Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/entry-points');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Entry Points|Camino|Start Your Journey/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'Start Your Journey' }).first();
    await expect(heading).toBeVisible();
  });

  test('displays hero section explaining entry points @content', async ({ page }) => {
    // Hero should explain personalized paths
    const personalized = page.locator('text=/path to growth is different/i').first();
    await expect(personalized).toBeVisible();

    // Should mention AI-powered coaching
    const aiPowered = page.locator('text=/AI-powered coaching/i').first();
    await expect(aiPowered).toBeVisible();

    // Should mention clinical psychology
    const clinical = page.locator('text=/clinical psychology/i').first();
    await expect(clinical).toBeVisible();
  });

  test('displays all 4 entry point cards @content', async ({ page }) => {
    // All 4 entry point titles should be visible
    const entryPoints = [
      'Find Clarity',
      'Set Meaningful Goals',
      'Improve Relationships',
      'Neurodivergent Support',
    ];

    for (const entry of entryPoints) {
      const card = page.locator(`h2:has-text("${entry}")`).first();
      await expect(card).toBeVisible();
    }
  });

  test('Find Clarity entry point has correct content @content', async ({ page }) => {
    // Find the Find Clarity card
    const clarityCard = page.locator('text=Find Clarity').first();
    await expect(clarityCard).toBeVisible();

    // Should mention self-discovery
    const selfDiscovery = page.locator('text=/self-discovery|understand yourself/i').first();
    await expect(selfDiscovery).toBeVisible();

    // Should have CTA button
    const cta = page.locator('text=/Start with Clarity/i').first();
    await expect(cta).toBeVisible();
  });

  test('Set Meaningful Goals entry point has correct content @content', async ({ page }) => {
    // Find the Goals card
    const goalsCard = page.locator('text=Set Meaningful Goals').first();
    await expect(goalsCard).toBeVisible();

    // Should mention goal-setting
    const goalSetting = page.locator('text=/realistic.*goals|goal-setting/i').first();
    await expect(goalSetting).toBeVisible();

    // Should have CTA button
    const cta = page.locator('text=/Define Your Goals/i').first();
    await expect(cta).toBeVisible();
  });

  test('Improve Relationships entry point has correct content @content', async ({ page }) => {
    // Find the Relationships card
    const relationshipsCard = page.locator('text=Improve Relationships').first();
    await expect(relationshipsCard).toBeVisible();

    // Should mention relationships
    const relationships = page.locator('text=/strengthen connections|relationship/i').first();
    await expect(relationships).toBeVisible();

    // Should have CTA button
    const cta = page.locator('text=/Build Better Connections/i').first();
    await expect(cta).toBeVisible();
  });

  test('Neurodivergent Support entry point has correct content @content', async ({ page }) => {
    // Find the Neurodivergent card
    const neurodivergentCard = page.locator('text=Neurodivergent Support').first();
    await expect(neurodivergentCard).toBeVisible();

    // Should mention ADHD and autism
    const adhdAutism = page.locator('text=/ADHD.*autism|neurodivergent/i').first();
    await expect(adhdAutism).toBeVisible();

    // Should have CTA button
    const cta = page.locator('text=/Get Tailored Support/i').first();
    await expect(cta).toBeVisible();
  });

  test('each entry point displays benefits list @content', async ({ page }) => {
    // Each card should have "What You'll Get" heading
    const benefitsHeadings = page.locator('text=/What You\'ll Get/i');
    const count = await benefitsHeadings.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // Check first card has benefits listed
    const firstBenefit = page.locator('text=/Self-discovery|Goal-setting|Communication|ADHD-friendly/i').first();
    await expect(firstBenefit).toBeVisible();
  });

  test('entry point CTAs link to waitlist @functionality', async ({ page }) => {
    // Find first CTA button
    const firstCta = page.locator('a:has-text("Start with Clarity")').first();
    await expect(firstCta).toBeVisible();

    // Should link to waitlist
    const href = await firstCta.getAttribute('href');
    expect(href).toContain('waitlist');
  });

  test('displays "Not Sure" section for uncertain users @content', async ({ page }) => {
    // Not Sure heading
    const notSureHeading = page.locator('h2:has-text("Not Sure Where to Start")').first();
    await expect(notSureHeading).toBeVisible();

    // Should mention onboarding process
    const onboarding = page.locator('text=/onboarding process/i').first();
    await expect(onboarding).toBeVisible();

    // Should have waitlist CTA
    const waitlistCta = page.locator('text=/Join Waitlist/i').last();
    await expect(waitlistCta).toBeVisible();
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
