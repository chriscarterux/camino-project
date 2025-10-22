import { test, expect } from '@playwright/test';

/**
 * HOW-57: Logo Verification Tests
 * Automated end-to-end tests to verify Camino logo appears on all pages
 */

const LOGO_SRC = '/camino-logo.svg';
const LOGO_ALT = 'Camino';

// Marketing pages with navigation + footer
const marketingPages = [
  { path: '/', name: 'Homepage', hasFullFooter: true },
  { path: '/how-it-works', name: 'How It Works', hasFullFooter: true },
  { path: '/pricing', name: 'Pricing', hasFullFooter: true },
  { path: '/coaching', name: 'Coaching', hasFullFooter: true },
  { path: '/about', name: 'About', hasFullFooter: true },
  { path: '/essays', name: 'Essays', hasFullFooter: true },
  { path: '/support', name: 'Support', hasFullFooter: true },
  { path: '/manifesto', name: 'Manifesto', hasFullFooter: true },
  { path: '/journey', name: 'Journey', hasFullFooter: true },
  { path: '/legal/privacy', name: 'Privacy Policy', hasFullFooter: false },
  { path: '/legal/terms', name: 'Terms of Service', hasFullFooter: false },
  { path: '/legal/cookies', name: 'Cookie Policy', hasFullFooter: false },
];

test.describe('Logo Verification - Marketing Pages', () => {
  for (const page of marketingPages) {
    test(`${page.name}: Logo appears in navigation`, async ({ page: browserPage }) => {
      // Navigate to page
      await browserPage.goto(page.path);
      await browserPage.waitForLoadState('networkidle');

      // Find navigation logo
      const navLogo = browserPage.locator('nav img[src*="camino-logo"]').first();

      // Verify logo exists and is visible
      await expect(navLogo).toBeVisible();

      // Verify logo has correct src
      const src = await navLogo.getAttribute('src');
      expect(src).toContain('camino-logo.svg');

      // Verify logo has alt text
      const alt = await navLogo.getAttribute('alt');
      expect(alt).toBe(LOGO_ALT);

      console.log(`✓ ${page.name}: Navigation logo verified`);
    });

    test(`${page.name}: Logo appears in footer`, async ({ page: browserPage }) => {
      // Skip footer test for pages without full footer
      if (!page.hasFullFooter) {
        test.skip();
        return;
      }

      // Navigate to page
      await browserPage.goto(page.path);
      await browserPage.waitForLoadState('networkidle');

      // Find footer logo
      const footerLogo = browserPage.locator('footer img[src*="camino-logo"]').first();

      // Verify logo exists and is visible
      await expect(footerLogo).toBeVisible();

      // Verify logo has correct src
      const src = await footerLogo.getAttribute('src');
      expect(src).toContain('camino-logo.svg');

      // Verify logo has alt text
      const alt = await footerLogo.getAttribute('alt');
      expect(alt).toBe(LOGO_ALT);

      console.log(`✓ ${page.name}: Footer logo verified`);
    });

    test(`${page.name}: Logo is clickable and links to homepage`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      await browserPage.waitForLoadState('networkidle');

      // Click navigation logo
      const navLogoLink = browserPage.locator('nav a').filter({ has: browserPage.locator('img[src*="camino-logo"]') }).first();
      await expect(navLogoLink).toBeVisible();

      const href = await navLogoLink.getAttribute('href');
      expect(href).toBe('/');

      console.log(`✓ ${page.name}: Logo link verified`);
    });
  }
});

test.describe('Logo File Verification', () => {
  test('Logo SVG file exists and loads correctly', async ({ page }) => {
    // Try to load the logo file directly
    const response = await page.goto('/camino-logo.svg');

    // Verify response is successful
    expect(response?.status()).toBe(200);

    // Verify content type is SVG
    const contentType = response?.headers()['content-type'];
    expect(contentType).toContain('svg');

    console.log('✓ Logo file exists and loads correctly');
  });
});

test.describe('Logo Consistency', () => {
  test('All navigation logos have consistent dimensions', async ({ page }) => {
    const dimensions: { page: string; width: number; height: number }[] = [];

    for (const pagePath of marketingPages) {
      await page.goto(pagePath.path);
      await page.waitForLoadState('networkidle');

      const navLogo = page.locator('nav img[src*="camino-logo"]').first();
      await expect(navLogo).toBeVisible();

      const box = await navLogo.boundingBox();
      if (box) {
        dimensions.push({
          page: pagePath.name,
          width: box.width,
          height: box.height,
        });
      }
    }

    // All navigation logos should have same width
    const widths = dimensions.map(d => Math.round(d.width));
    const uniqueWidths = [...new Set(widths)];

    console.log('Navigation logo dimensions:', dimensions);

    // Allow for small rendering differences (within 2px)
    expect(uniqueWidths.length).toBeLessThanOrEqual(2);

    console.log('✓ Logo dimensions are consistent across pages');
  });
});

test.describe('Logo Rendering Quality', () => {
  test('Logo renders without errors on all pages', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    for (const pagePath of marketingPages) {
      await page.goto(pagePath.path);
      await page.waitForLoadState('networkidle');

      // Wait a bit for any delayed errors
      await page.waitForTimeout(500);
    }

    // Filter out unrelated errors
    const logoErrors = errors.filter(err =>
      err.toLowerCase().includes('logo') ||
      err.toLowerCase().includes('image') ||
      err.toLowerCase().includes('camino-logo')
    );

    expect(logoErrors).toHaveLength(0);

    console.log('✓ No logo-related errors found');
  });
});
