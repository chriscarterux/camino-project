import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Story Page
 * Per HOW-517 Phase 2A: Story Page (12 tests)
 *
 * Tests cover:
 * - The Problem We Saw section
 * - Founder journey (Jon, Dr. Walter, Christopher)
 * - What We're Building (3 core beliefs)
 * - Our Commitment (4 commitment cards)
 * - Navigation and responsive design
 */

test.describe('Story Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/story');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Story|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'Our Story' }).first();
    await expect(heading).toBeVisible();
  });

  test('displays hero section with mission @content', async ({ page }) => {
    // Hero should explain why building Camino
    const why = page.locator('text=/Why we\'re building Camino/i').first();
    await expect(why).toBeVisible();

    // Should mention personal growth
    const personalGrowth = page.locator('text=/personal growth/i').first();
    await expect(personalGrowth).toBeVisible();
  });

  test('displays "The Problem We Saw" section @content', async ({ page }) => {
    // Problem section heading
    const problemHeading = page.locator('h2:has-text("The Problem We Saw")').first();
    await expect(problemHeading).toBeVisible();

    // Should critique generic advice
    const genericAdvice = page.locator('text=/One-size-fits-all solutions don\'t work/i').first();
    await expect(genericAdvice).toBeVisible();

    // Should mention lack of personalization
    const personalization = page.locator('text=/different place.*different brains/i').first();
    await expect(personalization).toBeVisible();
  });

  test('displays "How We Got Here" with all 3 founders @content', async ({ page }) => {
    // How We Got Here heading
    const journeyHeading = page.locator('h2:has-text("How We Got Here")').first();
    await expect(journeyHeading).toBeVisible();

    // All 3 founders should be mentioned
    const jon = page.locator('text=/Jon.*ADHD.*autism/i').first();
    await expect(jon).toBeVisible();

    const walter = page.locator('text=/Dr\\. Walter.*clinical psychology/i').first();
    await expect(walter).toBeVisible();

    const christopher = page.locator('text=/Christopher.*17 years/i').first();
    await expect(christopher).toBeVisible();
  });

  test('explains Jon\'s neurodivergent coaching background @content', async ({ page }) => {
    // Jon's story should mention neurodivergent frameworks
    const jonStory = page.locator('text=/frameworks that actually worked for neurodivergent/i').first();
    await expect(jonStory).toBeVisible();

    // Should mention working WITH different brains
    const withBrains = page.locator('text=/with.*different brains.*not against/i').first();
    await expect(withBrains).toBeVisible();
  });

  test('explains Dr. Walter\'s clinical psychology background @content', async ({ page }) => {
    // Dr. Walter's story should mention clinical psychology
    const walterBg = page.locator('text=/clinical psychology/i').first();
    await expect(walterBg).toBeVisible();

    // Should mention bridging research and practice
    const bridging = page.locator('text=/bridging academic research/i').first();
    await expect(bridging).toBeVisible();

    // Should mention therapy room insights
    const therapy = page.locator('text=/therapy room/i').first();
    await expect(therapy).toBeVisible();
  });

  test('explains Christopher\'s technology and AI background @content', async ({ page }) => {
    // Christopher's story should mention 17 years building products
    const experience = page.locator('text=/17 years building products/i').first();
    await expect(experience).toBeVisible();

    // Should mention AI and thoughtful application
    const ai = page.locator('text=/AI.*genuinely useful.*thoughtfully/i').first();
    await expect(ai).toBeVisible();
  });

  test('displays "What We\'re Building" with 3 core beliefs @content', async ({ page }) => {
    // What We're Building heading
    const buildingHeading = page.locator('h2:has-text("What We\'re Building")').first();
    await expect(buildingHeading).toBeVisible();

    // Should mention 3 core beliefs
    const coreBeliefs = page.locator('text=/three core beliefs/i').first();
    await expect(coreBeliefs).toBeVisible();

    // Your context matters
    const context = page.locator('text=/Your context matters/i').first();
    await expect(context).toBeVisible();

    // Frameworks need structure
    const structure = page.locator('text=/Frameworks need structure/i').first();
    await expect(structure).toBeVisible();

    // AI amplifies expertise
    const aiAmplifies = page.locator('text=/AI amplifies expertise/i').first();
    await expect(aiAmplifies).toBeVisible();
  });

  test('displays "Our Commitment to You" with 4 commitments @content', async ({ page }) => {
    // Our Commitment heading
    const commitmentHeading = page.locator('h2:has-text("Our Commitment to You")').first();
    await expect(commitmentHeading).toBeVisible();

    // All 4 commitment cards
    const commitments = [
      'Privacy Always',
      'Evidence-Based',
      'Human-First',
      'For Everyone',
    ];

    for (const commitment of commitments) {
      const commitmentCard = page.locator(`h3:has-text("${commitment}")`).first();
      await expect(commitmentCard).toBeVisible();
    }
  });

  test('explains privacy and data ownership commitment @content', async ({ page }) => {
    // Privacy commitment
    const privacy = page.locator('text=/never share.*sell.*your data/i').first();
    await expect(privacy).toBeVisible();

    // Data ownership
    const ownership = page.locator('text=/belong to you/i').first();
    await expect(ownership).toBeVisible();
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
