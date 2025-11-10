import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Team Page
 * Per HOW-517 Phase 2A: Team Page (12 tests)
 *
 * Tests cover:
 * - All 3 team members displayed
 * - Credentials and roles
 * - Bios and focus areas
 * - Contact links (LinkedIn, email)
 * - Mission & Values section
 * - Navigation and responsive design
 */

test.describe('Team Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/team');
  });

  test('page loads successfully with correct title', async ({ page }) => {
    // Page should load without errors
    await expect(page).toHaveTitle(/Team|Camino/i);

    // Main heading should be visible
    const heading = page.locator('h1', { hasText: 'Meet the Team' }).first();
    await expect(heading).toBeVisible();
  });

  test('displays all 3 team members @content', async ({ page }) => {
    // Verify all team members are present
    const teamMembers = [
      'Jon Carter',
      'Dr. Christopher Walter',
      'Christopher Carter',
    ];

    for (const member of teamMembers) {
      const memberHeading = page.locator(`h2:has-text("${member}")`).first();
      await expect(memberHeading).toBeVisible();
    }
  });

  test('displays team member credentials @content', async ({ page }) => {
    // Jon Carter - ADHD + Autism
    const jonCredentials = page.locator('text=ADHD + Autism').first();
    await expect(jonCredentials).toBeVisible();

    // Dr. Christopher Walter - PhD in Psychology
    const walterCredentials = page.locator('text=PhD in Psychology').first();
    await expect(walterCredentials).toBeVisible();

    // Christopher Carter - 17 years software engineering
    const christopherCredentials = page.locator('text=/17 years.*software engineering/i').first();
    await expect(christopherCredentials).toBeVisible();
  });

  test('displays team member roles @content', async ({ page }) => {
    // Check all roles are visible
    const roles = [
      'Co-Founder & Lead Coach',
      'Co-Founder & Clinical Director',
      'Co-Founder & Technology Lead',
    ];

    for (const role of roles) {
      const roleText = page.locator(`text=${role}`).first();
      await expect(roleText).toBeVisible();
    }
  });

  test('displays all team member bios @content', async ({ page }) => {
    // Jon's bio mentions neurodivergent
    const jonBio = page.locator('text=/neurodivergent minds/i').first();
    await expect(jonBio).toBeVisible();

    // Dr. Walter's bio mentions clinical expertise
    const walterBio = page.locator('text=/clinical expertise/i').first();
    await expect(walterBio).toBeVisible();

    // Christopher's bio mentions 17 years building products
    const christopherBio = page.locator('text=/17 years building products/i').first();
    await expect(christopherBio).toBeVisible();
  });

  test('displays focus areas for all members @content', async ({ page }) => {
    // Check focus areas are visible
    const focusAreas = [
      'Neurodivergent Life Design, Career Clarity',
      'Relationship Intelligence, Emotional Wellness',
      'Product & Technology',
    ];

    for (const focus of focusAreas) {
      const focusText = page.locator(`text=${focus}`).first();
      await expect(focusText).toBeVisible();
    }
  });

  test('LinkedIn links are present and valid @navigation', async ({ page }) => {
    // All team members should have LinkedIn links
    const linkedInLinks = page.locator('a:has-text("LinkedIn")');
    const count = await linkedInLinks.count();
    expect(count).toBe(3); // 3 team members

    // First LinkedIn link should be valid
    const firstLink = linkedInLinks.first();
    await expect(firstLink).toHaveAttribute('href', /linkedin\.com/);
    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', /noopener noreferrer/);
  });

  test('email links are present and valid @navigation', async ({ page }) => {
    // All team members should have email links
    const emailLinks = page.locator('a:has-text("Email")');
    const count = await emailLinks.count();
    expect(count).toBe(3); // 3 team members

    // Check email addresses
    const jonEmail = page.locator('a[href="mailto:jon@camino.app"]').first();
    await expect(jonEmail).toBeVisible();

    const walterEmail = page.locator('a[href="mailto:walter@camino.app"]').first();
    await expect(walterEmail).toBeVisible();

    const christopherEmail = page.locator('a[href="mailto:christopher@camino.app"]').first();
    await expect(christopherEmail).toBeVisible();
  });

  test('displays Mission & Values section with 4 values @content', async ({ page }) => {
    // Mission & Values heading
    const missionHeading = page.locator('h2:has-text("Our Mission & Values")').first();
    await expect(missionHeading).toBeVisible();

    // All 4 value cards
    const values = [
      'Human-First Technology',
      'Evidence-Based Methods',
      'Neurodiversity Awareness',
      'Privacy & Ownership',
    ];

    for (const value of values) {
      const valueHeading = page.locator(`h3:has-text("${value}")`).first();
      await expect(valueHeading).toBeVisible();
    }
  });

  test('navigation elements work correctly @navigation', async ({ page }) => {
    // Logo should be visible and link to homepage
    const logo = page.locator('nav a:has(img[alt="Camino"])').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');

    // Nav links should be visible
    const howItWorksLink = page.locator('nav a:has-text("How it works")').first();
    await expect(howItWorksLink).toBeVisible();

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

    // At least one team member should be visible
    const firstMember = page.locator('h2:has-text("Jon Carter")').first();
    await expect(firstMember).toBeVisible();

    // Mission section should be accessible (might need scroll)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    const missionExists = await page.locator('h2:has-text("Our Mission & Values")').count();
    expect(missionExists).toBeGreaterThan(0);
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
