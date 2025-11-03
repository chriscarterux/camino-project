/**
 * End-to-End Tests for Complete Onboarding Flow
 *
 * Tests the entire user journey from welcome to activation
 */

import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/onboarding');
    await page.evaluate(() => localStorage.clear());
  });

  test('completes full onboarding flow successfully', async ({ page }) => {
    // Step 1: Welcome page
    await page.goto('/onboarding/welcome');
    await expect(page.locator('h1')).toContainText("You're not broken");
    await page.click('text=Begin Your Journey');

    // Step 2: Choose intent
    await expect(page).toHaveURL(/\/onboarding\/intent/);
    await expect(page.locator('h1')).toContainText('What brings you here?');

    // Select Identity intent
    await page.click('button:has-text("Identity")');
    await page.click('text=Continue');

    // Step 3: First reflection
    await expect(page).toHaveURL(/\/onboarding\/reflection\/1/);
    await expect(page.locator('text=Reflection 1 of 3')).toBeVisible();

    // Fill in reflection (50+ words)
    const reflection1Text =
      'I believe that I need to always be productive and achieving things to have value. This belief makes me feel guilty when I rest or take time for myself. I think this comes from messages I received growing up about the importance of hard work and achievement. It feels limiting because it prevents me from enjoying life and being present.';

    await page.fill('textarea', reflection1Text);
    await page.waitForTimeout(500); // Wait for word count to update
    await page.click('text=Continue');

    // Step 4: Encouragement card
    await expect(page.locator('text=Great start!')).toBeVisible();

    // Wait for auto-redirect to reflection 2
    await page.waitForTimeout(3500);

    // Step 5: Second reflection
    await expect(page).toHaveURL(/\/onboarding\/reflection\/2/);
    await expect(page.locator('text=Reflection 2 of 3')).toBeVisible();

    const reflection2Text =
      'I feel most authentic when I am creating something without worrying about whether it is good enough or what others will think. In those moments I am just absorbed in the process and enjoying it. The difference is that I am not judging myself or comparing myself to others. I can just be present with what I am doing and feeling. This feels rare and precious to me.';

    await page.fill('textarea', reflection2Text);
    await page.waitForTimeout(500);
    await page.click('text=Continue');

    // Step 6: Encouragement card
    await expect(page.locator("text=You're doing amazing!")).toBeVisible();

    // Wait for auto-redirect to reflection 3
    await page.waitForTimeout(3500);

    // Step 7: Third reflection
    await expect(page).toHaveURL(/\/onboarding\/reflection\/3/);
    await expect(page.locator('text=Reflection 3 of 3')).toBeVisible();

    const reflection3Text =
      'If I could let go of one belief about who I am supposed to be it would be the belief that I need to be perfect and never make mistakes. This belief makes me avoid trying new things and taking risks because I am afraid of failing or looking foolish. I think I would be happier and more fulfilled if I could see mistakes as learning opportunities instead of proof that I am not good enough.';

    await page.fill('textarea', reflection3Text);
    await page.waitForTimeout(500);
    await page.click('text=Continue');

    // Step 8: Celebration page
    await expect(page).toHaveURL(/\/onboarding\/celebration/);

    // Wait for insight generation
    await expect(page.locator('text=Analyzing Your Reflections')).toBeVisible();
    await page.waitForTimeout(2500);

    // Celebration animation
    await expect(page.locator('text=Congratulations')).toBeVisible();
    await page.waitForTimeout(2500);

    // Insight revealed
    await expect(page.locator('text=Your First Insight')).toBeVisible();
    await expect(page.locator('text=Pattern Detected')).toBeVisible();

    // Wait for auto-redirect to complete page
    await page.waitForTimeout(6500);

    // Step 9: Complete page
    await expect(page).toHaveURL(/\/onboarding\/complete/);
    await expect(page.locator("text=You're Activated!")).toBeVisible();
    await expect(page.locator('text=3')).toBeVisible(); // 3 reflections
    await expect(page.locator('text=1')).toBeVisible(); // 1 insight
  });

  test('allows navigation back and preserves state', async ({ page }) => {
    // Start onboarding
    await page.goto('/onboarding/welcome');
    await page.click('text=Begin Your Journey');

    // Select intent
    await page.click('button:has-text("Worldview")');
    await page.click('text=Continue');

    // Go back using browser back button
    await page.goBack();

    // Verify we're back on intent page
    await expect(page).toHaveURL(/\/onboarding\/intent/);

    // Verify selection is preserved
    const worldviewButton = page.locator('button:has-text("Worldview")');
    await expect(worldviewButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('validates minimum word count for reflections', async ({ page }) => {
    // Navigate to first reflection
    await page.goto('/onboarding/welcome');
    await page.click('text=Begin Your Journey');
    await page.click('button:has-text("Identity")');
    await page.click('text=Continue');

    // Try to submit with too few words
    await page.fill('textarea', 'This is too short');

    // Continue button should be disabled
    const continueButton = page.locator('button:has-text("Continue")');
    await expect(continueButton).toBeDisabled();

    // Fill in enough words
    const validText =
      'This is a longer reflection that meets the minimum word count requirement. I am writing enough words to pass validation and continue with the onboarding process. The system requires at least fifty words to ensure meaningful reflections.';

    await page.fill('textarea', validText);

    // Continue button should be enabled
    await expect(continueButton).toBeEnabled();
  });

  test('displays progress correctly throughout flow', async ({ page }) => {
    await page.goto('/onboarding/intent');

    // Check progress on intent page (step 2)
    await expect(page.locator('text=Step 2 of 9')).toBeVisible();
    await expect(page.locator('text=22% complete')).toBeVisible();

    // Select intent and continue
    await page.click('button:has-text("All Dimensions")');
    await page.click('text=Continue');

    // Check progress on first reflection (step 3)
    await expect(page.locator('text=Step 3 of 9')).toBeVisible();
    await expect(page.locator('text=33% complete')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('onboarding flow is keyboard navigable', async ({ page }) => {
    await page.goto('/onboarding/welcome');

    // Tab to Begin button and activate
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/onboarding\/intent/);

    // Navigate through intent options with keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter'); // Select first option

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter'); // Click continue
  });

  test('has proper ARIA labels', async ({ page }) => {
    await page.goto('/onboarding/intent');

    // Check intent buttons have proper labels
    const identityButton = page.locator('button:has-text("Identity")');
    await expect(identityButton).toHaveAttribute('aria-label', /Select Identity/i);

    // Check progress bar has proper ARIA attributes
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toHaveAttribute('aria-valuenow');
    await expect(progressBar).toHaveAttribute('aria-valuemin');
    await expect(progressBar).toHaveAttribute('aria-valuemax');
  });
});

test.describe('Performance', () => {
  test('page loads within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/onboarding/welcome');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000);
  });

  test('reflection submission is responsive', async ({ page }) => {
    await page.goto('/onboarding/welcome');
    await page.click('text=Begin Your Journey');
    await page.click('button:has-text("Identity")');
    await page.click('text=Continue');

    const reflection =
      'This is a test reflection with enough words to meet the minimum requirement. I am writing about my thoughts and feelings to ensure the system accepts this input and processes it correctly. This should be sufficient for testing purposes.';

    await page.fill('textarea', reflection);

    const startTime = Date.now();
    await page.click('text=Continue');

    // Should show encouragement within 1 second
    await expect(page.locator('text=Great start!')).toBeVisible({ timeout: 1000 });
    const responseTime = Date.now() - startTime;

    expect(responseTime).toBeLessThan(1000);
  });
});
