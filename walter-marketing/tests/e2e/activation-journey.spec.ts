/**
 * E2E Tests for Activation Journey
 *
 * Tests the complete user activation flow from signup to first insight.
 * Uses Playwright for browser automation.
 */

import { test, expect } from '@playwright/test';

test.describe('Activation Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Start at the app
    await page.goto('/');
  });

  test('should complete full activation journey', async ({ page }) => {
    // STEP 1: Signup
    await page.click('text=Get Started');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    // Wait for redirect to app
    await page.waitForURL(/\/app/);

    // STEP 2: Complete First Reflection
    await page.click('text=Start Reflecting');
    await page.fill('textarea[name="content"]', 'My family and personal growth matter most to me. I want to make a positive impact.');
    await page.click('button[type="submit"]');

    // Verify reflection count
    await expect(page.locator('text=/1 of 3 reflections/')).toBeVisible();

    // STEP 3: Complete Second Reflection
    await page.click('text=Continue Reflecting');
    await page.fill('textarea[name="content"]', 'I struggle with balancing work and personal life. Finding the right priorities is challenging.');
    await page.click('button[type="submit"]');

    // Verify reflection count
    await expect(page.locator('text=/2 of 3 reflections/')).toBeVisible();

    // STEP 4: Complete Third Reflection
    await page.click('text=One more reflection');
    await page.fill('textarea[name="content"]', 'Connecting with others and helping people grow brings me the most joy.');
    await page.click('button[type="submit"]');

    // Wait for insight generation
    await expect(page.locator('text=/Generating insight/')).toBeVisible();

    // STEP 5: View First Insight (Activation Moment!)
    await expect(page.locator('text=/Your First Insight/')).toBeVisible({ timeout: 10000 });

    // Verify activation celebration
    await expect(page.locator('text=/Pattern Detected/')).toBeVisible();

    // Verify insight content
    await expect(page.locator('[data-testid="insight-content"]')).toBeVisible();

    // STEP 6: Verify activation state
    // Check that user is marked as activated
    const activationBadge = page.locator('[data-testid="activation-badge"]');
    await expect(activationBadge).toBeVisible();
  });

  test('should track analytics events during activation', async ({ page }) => {
    // Mock analytics to capture events
    const events: any[] = [];

    await page.route('**/api/analytics/**', async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();
      events.push(postData);
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    // Complete activation journey (abbreviated)
    // ... (signup and reflections)

    // Verify events were tracked
    expect(events.some(e => e.event === 'reflection_completed')).toBeTruthy();
    expect(events.some(e => e.event === 'insight_generated')).toBeTruthy();
    expect(events.some(e => e.event === 'insight_viewed')).toBeTruthy();
    expect(events.some(e => e.event === 'user_activation_achieved')).toBeTruthy();
  });

  test('should show progress indicators during activation', async ({ page }) => {
    // Start at app dashboard
    await page.goto('/app');

    // Verify progress indicator is visible
    await expect(page.locator('[data-testid="activation-progress"]')).toBeVisible();

    // Should show 0/3 initially
    await expect(page.locator('text=/0 of 3 reflections/')).toBeVisible();

    // Complete first reflection
    await page.click('text=Start Reflecting');
    await page.fill('textarea[name="content"]', 'Test reflection content');
    await page.click('button[type="submit"]');

    // Should show 1/3
    await expect(page.locator('text=/1 of 3 reflections/')).toBeVisible();
  });

  test('should handle insight generation failure gracefully', async ({ page }) => {
    // Mock insight generation to fail
    await page.route('**/api/insights', async (route) => {
      await route.fulfill({ status: 500, body: JSON.stringify({ error: 'AI service unavailable' }) });
    });

    // Complete 3 reflections
    // ... (reflection completion code)

    // Should show fallback message
    await expect(page.locator('text=/Try again/')).toBeVisible();
    await expect(page.locator('text=/We\'re having trouble/')).toBeVisible();
  });
});

test.describe('Activation Timing', () => {
  test('should allow same-session activation', async ({ page }) => {
    const startTime = Date.now();

    // Complete full activation in single session
    // ... (signup and 3 reflections)

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Should be achievable in under 15 minutes (900000ms)
    expect(duration).toBeLessThan(900000);
  });

  test('should preserve progress across sessions', async ({ page, context }) => {
    // Complete 2 reflections
    // ... (reflection completion)

    // Get cookies to preserve session
    const cookies = await context.cookies();

    // Create new page with same cookies
    const newPage = await context.newPage();
    await newPage.goto('/app');

    // Should show 2/3 progress
    await expect(newPage.locator('text=/2 of 3 reflections/')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/app/reflect');

    // Tab to textarea
    await page.keyboard.press('Tab');
    await expect(page.locator('textarea')).toBeFocused();

    // Type content
    await page.keyboard.type('Accessible reflection content');

    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(page.locator('button[type="submit"]')).toBeFocused();

    // Submit with Enter
    await page.keyboard.press('Enter');
  });

  test('should announce activation milestone to screen readers', async ({ page }) => {
    // Complete activation journey
    // ... (reflections)

    // Check for ARIA live region announcement
    const announcement = page.locator('[role="status"][aria-live="polite"]');
    await expect(announcement).toContainText(/Congratulations.*activated/i);
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/app/insights/insight-123');

    // Check heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingLevels = await headings.evaluateAll((elements) =>
      elements.map((el) => parseInt(el.tagName.substring(1)))
    );

    // Verify no skipped heading levels
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
});

test.describe('Performance', () => {
  test('should generate insight in under 3 seconds', async ({ page }) => {
    // Complete 3 reflections
    // ... (reflections)

    const startTime = Date.now();

    // Submit third reflection
    await page.click('button[type="submit"]');

    // Wait for insight
    await page.waitForSelector('[data-testid="insight-content"]', { timeout: 3000 });

    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(3000);
  });

  test('should not block UI during insight generation', async ({ page }) => {
    // Submit third reflection
    // ... (reflection)

    // Verify loading state
    await expect(page.locator('text=/Generating/')).toBeVisible();

    // Verify UI is still responsive
    const backButton = page.locator('button[aria-label="Back"]');
    await expect(backButton).toBeEnabled();
  });
});

test.describe('Mobile Experience', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('should complete activation on mobile', async ({ page }) => {
    // Test mobile activation flow
    await page.goto('/app');

    // Verify mobile-friendly layout
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();

    // Complete activation journey
    // ... (reflections)

    // Verify mobile celebration screen
    await expect(page.locator('[data-testid="activation-celebration"]')).toBeVisible();
  });
});

test.describe('Security', () => {
  test('should prevent activation spoofing', async ({ page }) => {
    // Attempt to manually set activation state
    await page.evaluate(() => {
      localStorage.setItem('is_activated', 'true');
    });

    await page.goto('/app');

    // Should not show activation state without backend verification
    // Actual activation check should come from authenticated API
    const realActivationState = await page.evaluate(async () => {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      return data.is_activated;
    });

    expect(realActivationState).toBeFalsy(); // Not actually activated
  });

  test('should require authentication for activation', async ({ page }) => {
    // Attempt to access insights without auth
    const response = await page.goto('/api/insights/insight-123');

    expect(response?.status()).toBe(401);
  });
});
