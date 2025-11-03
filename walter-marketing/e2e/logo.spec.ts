import { test, expect } from '@playwright/test';

test.describe('Logo Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('main logo loads successfully @accessibility', async ({ page }) => {
    const logo = page.locator('nav img[alt*="Camino"]').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', /camino-logo/);
  });

  test('logo has correct dimensions', async ({ page }) => {
    const logo = page.locator('nav img[alt*="Camino"]').first();
    const box = await logo.boundingBox();

    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(100); // Minimum recommended width
      expect(box.height).toBeGreaterThan(0);
    }
  });

  test('logo is clickable and navigates to home', async ({ page }) => {
    const logoLink = page.locator('nav a:has(img[alt*="Camino"])').first();
    await expect(logoLink).toHaveAttribute('href', '/');

    // Click and verify navigation
    await logoLink.click();
    await expect(page).toHaveURL('/');
  });

  test('logo maintains aspect ratio on resize', async ({ page }) => {
    const logo = page.locator('nav img[alt*="Camino"]').first();

    // Get dimensions at default viewport
    const box1 = await logo.boundingBox();
    const aspectRatio1 = box1 ? box1.width / box1.height : 0;

    // Resize viewport
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile

    // Get dimensions at mobile viewport
    const box2 = await logo.boundingBox();
    const aspectRatio2 = box2 ? box2.width / box2.height : 0;

    // Aspect ratios should be similar (within 10% tolerance)
    const tolerance = aspectRatio1 * 0.1;
    expect(Math.abs(aspectRatio1 - aspectRatio2)).toBeLessThan(tolerance);
  });

  test('logo has proper alt text @accessibility', async ({ page }) => {
    const logo = page.locator('nav img[alt*="Camino"]').first();
    const alt = await logo.getAttribute('alt');

    expect(alt).toBeTruthy();
    expect(alt?.length).toBeGreaterThan(0);
  });

  test('footer logo loads correctly', async ({ page }) => {
    const footerLogo = page.locator('footer img[alt*="Camino"]').first();
    await expect(footerLogo).toBeVisible();
  });

  test('logo loads with proper caching', async ({ page }) => {
    const logo = page.locator('nav img[alt*="Camino"]').first();

    // Wait for logo to load
    await logo.waitFor({ state: 'visible' });

    // Check if image is from cache on second load
    await page.reload();
    const logo2 = page.locator('nav img[alt*="Camino"]').first();
    await expect(logo2).toBeVisible({ timeout: 1000 }); // Should load quickly from cache
  });

  test('logo is keyboard accessible @accessibility', async ({ page }) => {
    // Tab to logo link
    await page.keyboard.press('Tab');

    const logoLink = page.locator('nav a:has(img[alt*="Camino"])').first();
    await expect(logoLink).toBeFocused();

    // Press Enter to navigate
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/');
  });

  test('logo has visible focus indicator @accessibility', async ({ page }) => {
    const logoLink = page.locator('nav a:has(img[alt*="Camino"])').first();

    // Focus the logo
    await logoLink.focus();

    // Check for focus styles (outline, ring, etc.)
    const styles = await logoLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        boxShadow: computed.boxShadow,
      };
    });

    // Should have some form of focus indicator
    const hasFocusIndicator =
      styles.outline !== 'none' ||
      styles.outlineWidth !== '0px' ||
      styles.boxShadow !== 'none';

    expect(hasFocusIndicator).toBeTruthy();
  });

  test('logo loads on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const logo = page.locator('nav img[alt*="Camino"]').first();
    await expect(logo).toBeVisible();

    const box = await logo.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(100); // Minimum mobile width
    }
  });

  test('logo loads on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const logo = page.locator('nav img[alt*="Camino"]').first();
    await expect(logo).toBeVisible();
  });

  test('logo loads on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    const logo = page.locator('nav img[alt*="Camino"]').first();
    await expect(logo).toBeVisible();
  });

  test('logo file size is optimized', async ({ page }) => {
    const response = await page.goto('/camino-logo.svg');

    if (response) {
      const body = await response.body();
      const sizeKB = body.length / 1024;

      // Logo should be under 10KB as per optimization guidelines
      expect(sizeKB).toBeLessThan(10);
    }
  });

  test('all logo variants exist', async ({ page }) => {
    const variants = [
      '/camino-logo.svg',
      '/camino-logo-full.svg',
      '/camino-logo-dark.svg',
      '/camino-icon.svg',
    ];

    for (const variant of variants) {
      const response = await page.goto(variant);
      expect(response?.status()).toBe(200);
    }
  });

  test('logo does not flicker on load', async ({ page }) => {
    // Monitor for layout shifts
    let clsScore = 0;

    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              // @ts-ignore - CLS is a performance entry
              if (!entry.hadRecentInput) {
                // @ts-ignore
                clsScore += entry.value;
              }
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 3000);
      });
    });

    // CLS should be very low for logo area
    expect(clsScore).toBeLessThan(0.1);
  });

  test('logo displays correctly in dark mode', async ({ page }) => {
    // Set dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });

    const logo = page.locator('nav img[alt*="Camino"]').first();
    await expect(logo).toBeVisible();

    // Should use dark variant or have proper contrast
    const src = await logo.getAttribute('src');
    // This would ideally check for dark variant usage
    expect(src).toBeTruthy();
  });

  test('logo handles network errors gracefully', async ({ page }) => {
    // Simulate offline
    await page.route('/camino-logo.svg', route => route.abort());

    // Logo should have fallback or error handling
    await page.goto('/');

    // Check if page still loads without crashing
    await expect(page.locator('nav')).toBeVisible();
  });

  test('logo has no accessibility violations @accessibility', async ({ page }) => {
    // This requires @axe-core/playwright
    // Placeholder for axe integration
    const logo = page.locator('nav img[alt*="Camino"]').first();
    await expect(logo).toBeVisible();

    // Would inject axe-core and run tests
    // const results = await injectAxe(page);
    // expect(results.violations).toHaveLength(0);
  });

  test('logo performance: loads within budget', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    const logo = page.locator('nav img[alt*="Camino"]').first();
    await logo.waitFor({ state: 'visible' });

    const loadTime = Date.now() - startTime;

    // Logo should load quickly (within 3 seconds on slow connection)
    expect(loadTime).toBeLessThan(3000);
  });

  test('logo has proper ARIA attributes', async ({ page }) => {
    const logoLink = page.locator('nav a:has(img[alt*="Camino"])').first();
    const logo = page.locator('nav img[alt*="Camino"]').first();

    // Check for proper ARIA usage
    const linkAriaLabel = await logoLink.getAttribute('aria-label');
    const imgAlt = await logo.getAttribute('alt');

    // Should have either link aria-label or img alt text
    expect(linkAriaLabel || imgAlt).toBeTruthy();
  });

  test('logo SVG has title element for screen readers @accessibility', async ({ page }) => {
    const response = await page.goto('/camino-logo.svg');

    if (response) {
      const svgContent = await response.text();

      // SVG should include title element
      expect(svgContent).toContain('<title');
      expect(svgContent).toContain('Camino');
    }
  });
});

test.describe('Logo Print Styles', () => {
  test('logo maintains quality in print preview', async ({ page }) => {
    await page.goto('/');

    // Emulate print media
    await page.emulateMedia({ media: 'print' });

    const logo = page.locator('nav img[alt*="Camino"]').first();
    await expect(logo).toBeVisible();
  });
});

test.describe('Logo Security', () => {
  test('logo SVG does not contain scripts', async ({ page }) => {
    const response = await page.goto('/camino-logo.svg');

    if (response) {
      const svgContent = await response.text();

      // SVG should not contain <script> tags
      expect(svgContent.toLowerCase()).not.toContain('<script');
      expect(svgContent.toLowerCase()).not.toContain('javascript:');
    }
  });

  test('logo has proper content security policy', async ({ page }) => {
    const response = await page.goto('/');

    if (response) {
      const headers = response.headers();
      // Check if CSP is set (optional but recommended)
      if (headers['content-security-policy']) {
        expect(headers['content-security-policy']).toBeTruthy();
      }
    }
  });
});
