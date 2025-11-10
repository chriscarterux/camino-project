import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Approach Page
 * Per HOW-517 Phase 2A: Approach Page (12 tests)
 *
 * Tests cover:
 * - Core principles (Human-First, AI-Powered, Mission-Driven)
 * - How it works in practice (6 feature cards)
 * - Why this matters section
 * - Navigation and responsive design
 */

test.describe('Approach Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/approach');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Approach|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'Our Approach' }).first();
    await expect(heading).toBeVisible();
  });

  test('displays hero section with mission statement @content', async ({ page }) => {
    // Hero should explain the core approach
    const humanWisdom = page.locator('text=/human wisdom.*technological innovation/i').first();
    await expect(humanWisdom).toBeVisible();

    // Mentions AI-powered insights
    const aiInsights = page.locator('text=/AI-powered insights/i').first();
    await expect(aiInsights).toBeVisible();
  });

  test('displays all 3 core principles @content', async ({ page }) => {
    // Verify all core principles are present
    const principles = [
      'Human-First, Always',
      'AI-Powered Insights',
      'Mission-Driven Development',
    ];

    for (const principle of principles) {
      const principleHeading = page.locator(`h3:has-text("${principle}")`).first();
      await expect(principleHeading).toBeVisible();
    }
  });

  test('explains human-first principle @content', async ({ page }) => {
    // Human-First section should be detailed
    const humanFirst = page.locator('h3:has-text("Human-First")').first();
    await expect(humanFirst).toBeVisible();

    // Should mention technology enhancing, not replacing
    const enhance = page.locator('text=/enhance.*never replace/i').first();
    await expect(enhance).toBeVisible();

    // Heart icon should be visible
    const heartIcon = page.locator('svg').filter({ has: page.locator('path') }).first();
    await expect(heartIcon).toBeVisible();
  });

  test('explains AI-powered insights principle @content', async ({ page }) => {
    // AI-Powered Insights section
    const aiPowered = page.locator('h3:has-text("AI-Powered Insights")').first();
    await expect(aiPowered).toBeVisible();

    // Should mention context engineering
    const contextEngineering = page.locator('text=/context engineering/i').first();
    await expect(contextEngineering).toBeVisible();

    // Should mention personalization
    const personalization = page.locator('text=/genuinely personalized/i').first();
    await expect(personalization).toBeVisible();
  });

  test('explains mission-driven principle @content', async ({ page }) => {
    // Mission-Driven Development section
    const missionDriven = page.locator('h3:has-text("Mission-Driven")').first();
    await expect(missionDriven).toBeVisible();

    // Should mention no growth metrics manipulation
    const noGrowthHacks = page.locator('text=/not building features for.*growth metrics/i').first();
    await expect(noGrowthHacks).toBeVisible();

    // Should mention user empowerment
    const empower = page.locator('text=/empower rather than exploit/i').first();
    await expect(empower).toBeVisible();
  });

  test('displays "How It Works in Practice" with 6 features @content', async ({ page }) => {
    // How It Works heading
    const howItWorks = page.locator('h2:has-text("How It Works in Practice")').first();
    await expect(howItWorks).toBeVisible();

    // All 6 feature cards
    const features = [
      'Expert Coaching Frameworks',
      'Context-Aware AI',
      'Privacy by Design',
      'Neurodiversity Support',
      'Continuous Improvement',
      'Sustainable Growth',
    ];

    for (const feature of features) {
      const featureHeading = page.locator(`h3:has-text("${feature}")`).first();
      await expect(featureHeading).toBeVisible();
    }
  });

  test('displays privacy and neurodiversity commitments @content', async ({ page }) => {
    // Privacy by Design
    const privacy = page.locator('text=/never share.*sell.*your data/i').first();
    await expect(privacy).toBeVisible();

    const encryption = page.locator('text=/encryption/i').first();
    await expect(encryption).toBeVisible();

    // Neurodiversity Support
    const neurodiversity = page.locator('text=/ADHD.*autism/i').first();
    await expect(neurodiversity).toBeVisible();
  });

  test('displays "Why This Matters" section @content', async ({ page }) => {
    // Why This Matters heading
    const whyMatters = page.locator('h2:has-text("Why This Matters")').first();
    await expect(whyMatters).toBeVisible();

    // Should critique the industry
    const genericAdvice = page.locator('text=/generic advice.*questionable frameworks/i').first();
    await expect(genericAdvice).toBeVisible();

    // Should emphasize personalization
    const deeplyPersonal = page.locator('text=/deeply personal/i').first();
    await expect(deeplyPersonal).toBeVisible();
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

  test('page is responsive on mobile viewport @responsive', async ({ page }) => {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Main heading should still be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // At least one principle should be visible
    const firstPrinciple = page.locator('h3:has-text("Human-First")').first();
    await expect(firstPrinciple).toBeVisible();

    // Scroll to see feature cards
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    const howItWorks = page.locator('h2:has-text("How It Works")').first();
    const isVisible = await howItWorks.isVisible();
    expect(isVisible).toBeTruthy();
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
