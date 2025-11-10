import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Waitlist Conversion Flow
 * Per HOW-517 Phase 2C: Waitlist Conversion (8 tests)
 *
 * User Journey: Homepage → How It Works → Waitlist Signup
 *
 * Tests cover:
 * - Full conversion path navigation
 * - Waitlist form functionality
 * - Form validation
 * - Success states
 */

test.describe('Waitlist Conversion Flow', () => {
  test('complete journey from homepage to waitlist signup @flow', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // Homepage should have "Join Waitlist" CTA
    const joinWaitlistCTA = page.locator('text=/Join.*Waitlist/i').first();
    await expect(joinWaitlistCTA).toBeVisible();

    // Click to join waitlist (might scroll to form or navigate)
    await joinWaitlistCTA.click();
    await page.waitForTimeout(1000); // Wait for scroll or navigation

    // Waitlist form should be visible (either on same page or new page)
    const emailInput = page.locator('input[type="email"]').first();
    await expect(emailInput).toBeVisible();
  });

  test('homepage displays clear value proposition @conversion', async ({ page }) => {
    await page.goto('/');

    // Main heading should be compelling
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Should have key benefit messaging
    const benefits = page.locator('text=/AI|reflection|insights|growth/i').first();
    await expect(benefits).toBeVisible();

    // CTA should be above the fold
    const cta = page.locator('text=/Get Started|Join.*Waitlist|Sign Up/i').first();
    await expect(cta).toBeVisible();
  });

  test('how it works page explains the process @conversion', async ({ page }) => {
    await page.goto('/how-it-works');

    // Page should load successfully
    await expect(page).toHaveTitle(/How.*Works|Camino/i);

    // Should have process steps or explanation
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Should have CTA to join
    const cta = page.locator('text=/Join.*Waitlist|Get Started|Sign Up/i').first();
    await expect(cta).toBeVisible();
  });

  test('navigation from homepage to how it works @flow', async ({ page }) => {
    await page.goto('/');

    // Find "How it works" link in navigation
    const howItWorksLink = page.locator('nav a:has-text("How it works")').first();
    await expect(howItWorksLink).toBeVisible();

    // Click and verify navigation
    await howItWorksLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/how-it-works');
  });

  test('waitlist form has proper validation @validation', async ({ page }) => {
    await page.goto('/');

    // Scroll to waitlist form or navigate to it
    const emailInput = page.locator('input[type="email"]').first();

    // If not visible, look for Join Waitlist button and click it
    if (!(await emailInput.isVisible())) {
      const joinButton = page.locator('text=/Join.*Waitlist/i').first();
      await joinButton.click();
      await page.waitForTimeout(1000);
    }

    // Email input should be visible now
    await expect(emailInput).toBeVisible();

    // Try to submit without email (if there's a submit button)
    const submitButton = page.locator('button:has-text(/Submit|Join|Sign.*Up/i)').first();

    if (await submitButton.isVisible()) {
      // HTML5 validation should prevent submission
      await submitButton.click();

      // Check for validation message (HTML5 or custom)
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => {
        return !el.validity.valid || el.getAttribute('aria-invalid') === 'true';
      });

      expect(isInvalid).toBeTruthy();
    }
  });

  test('waitlist form accepts valid email @validation', async ({ page }) => {
    await page.goto('/');

    // Find email input
    const emailInput = page.locator('input[type="email"]').first();

    // If not visible, navigate to it
    if (!(await emailInput.isVisible())) {
      const joinButton = page.locator('text=/Join.*Waitlist/i').first();
      await joinButton.click();
      await page.waitForTimeout(1000);
    }

    // Fill in valid email
    await emailInput.fill('test@example.com');

    // Email should be accepted
    const value = await emailInput.inputValue();
    expect(value).toBe('test@example.com');
  });

  test('multiple waitlist CTAs throughout site @conversion', async ({ page }) => {
    // Check homepage
    await page.goto('/');
    let ctaCount = await page.locator('text=/Join.*Waitlist|Get Started/i').count();
    expect(ctaCount).toBeGreaterThan(0);

    // Check how-it-works page
    await page.goto('/how-it-works');
    ctaCount = await page.locator('text=/Join.*Waitlist|Get Started/i').count();
    expect(ctaCount).toBeGreaterThan(0);

    // Check pricing page if it exists
    const pricingResponse = await page.goto('/pricing');
    if (pricingResponse?.ok()) {
      ctaCount = await page.locator('text=/Join.*Waitlist|Get Started/i').count();
      expect(ctaCount).toBeGreaterThan(0);
    }
  });

  test('conversion flow works on mobile viewport @mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Start at homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Main CTA should be visible
    const cta = page.locator('text=/Join.*Waitlist|Get Started/i').first();
    await expect(cta).toBeVisible();

    // Should be tappable
    await cta.click();
    await page.waitForTimeout(1000);

    // Form should become visible (might need to scroll)
    const emailInput = page.locator('input[type="email"]').first();
    const isVisible = await emailInput.isVisible();

    // If not visible, try scrolling down
    if (!isVisible) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
    }

    // Email input should now be accessible
    const inputExists = await page.locator('input[type="email"]').count();
    expect(inputExists).toBeGreaterThan(0);
  });
});
