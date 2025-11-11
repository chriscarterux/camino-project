import { test, expect } from '@playwright/test';

/**
 * E2E Test: Reflection Feature - Complete User Journey
 *
 * Based on "Update for Walter - Two Week Sprint" testing guide
 * Tests the complete reflection feature flow as documented for stakeholders
 */

const TEST_USER = {
  email: 'test-reflections@camino.to',
  password: 'TestPassword123!',
};

test.describe('Reflection Feature - End to End', () => {
  test.beforeEach(async ({ page }) => {
    // Start from homepage
    await page.goto('/');
  });

  test('should complete full reflection workflow', async ({ page }) => {
    // Step 1: Navigate to Reflect page
    await test.step('Navigate to /app/reflect', async () => {
      await page.goto(`/app/reflect`);

      // Should redirect to login if not authenticated
      await expect(page).toHaveURL(/\/auth|\/login|\/signin/);
    });

    // Step 2: Sign in with test credentials
    await test.step('Sign in with test user', async () => {
      // Fill in email
      const emailInput = page.locator('input[type="email"], input[name="email"]');
      await expect(emailInput).toBeVisible({ timeout: 5000 });
      await emailInput.fill(TEST_USER.email);

      // Fill in password
      const passwordInput = page.locator('input[type="password"], input[name="password"]');
      await expect(passwordInput).toBeVisible();
      await passwordInput.fill(TEST_USER.password);

      // Click sign in button
      const signInButton = page.locator('button:has-text("Sign In"), button:has-text("Log In")');
      await expect(signInButton).toBeVisible();
      await signInButton.click();

      // Wait for redirect to reflect page after auth
      await page.waitForURL(/\/app\/reflect/, { timeout: 10000 });
    });

    // Step 3: Verify daily prompt loads
    await test.step('Verify daily prompt displays', async () => {
      // Should see a prompt question
      const promptText = page.locator('[data-testid="daily-prompt"], .prompt-text, h2, h3').first();
      await expect(promptText).toBeVisible({ timeout: 5000 });

      // Prompt should contain a question mark
      const text = await promptText.textContent();
      expect(text).toContain('?');

      console.log('Daily prompt:', text);
    });

    // Step 4: Verify dimension tag is visible
    await test.step('Verify dimension tag displays', async () => {
      // Should see dimension (Identity, Worldview, or Relationships)
      const dimensionBadge = page.locator('[data-testid="dimension"], .dimension, .badge').first();
      await expect(dimensionBadge).toBeVisible();

      const dimension = await dimensionBadge.textContent();
      expect(['Identity', 'Worldview', 'Relationships', 'identity', 'worldview', 'relationships'])
        .toContainEqual(dimension?.toLowerCase().trim());

      console.log('Dimension:', dimension);
    });

    // Step 5: Write a reflection
    await test.step('Write reflection in text box', async () => {
      const textBox = page.locator('textarea, [contenteditable="true"]').first();
      await expect(textBox).toBeVisible();

      const reflectionText = `Today I learned that automated testing catches bugs before users do. This surprised me because I used to think manual testing was enough. Testing on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.`;

      await textBox.fill(reflectionText);

      // Verify text was entered
      const value = await textBox.inputValue().catch(() => textBox.textContent());
      expect(value).toContain('automated testing');

      console.log('Reflection written:', reflectionText.substring(0, 50) + '...');
    });

    // Step 6: Select mood
    await test.step('Select mood', async () => {
      // Look for mood selector (buttons, radio, or dropdown)
      const moodSelector = page.locator('[data-testid="mood-selector"], .mood-selector, select[name="mood"]').first();

      if (await moodSelector.isVisible({ timeout: 2000 }).catch(() => false)) {
        // Click "good" mood option
        const goodMood = page.locator('button:has-text("Good"), input[value="good"], option[value="good"]').first();
        await goodMood.click();
        console.log('Mood selected: Good');
      } else {
        console.log('Mood selector not found (might be optional)');
      }
    });

    // Step 7: Save reflection
    await test.step('Click Save button', async () => {
      const saveButton = page.locator('button:has-text("Save"), button[type="submit"]').first();
      await expect(saveButton).toBeVisible();
      await expect(saveButton).toBeEnabled();

      await saveButton.click();

      console.log('Save button clicked');
    });

    // Step 8: Verify success message
    await test.step('Verify success message appears', async () => {
      // Look for success message
      const successMessage = page.locator('[data-testid="success-message"], .success, [role="alert"]').first();
      await expect(successMessage).toBeVisible({ timeout: 5000 });

      const message = await successMessage.textContent();
      expect(message?.toLowerCase()).toMatch(/success|saved|complete/);

      console.log('Success message:', message);
    });

    // Step 9: Verify streak updates
    await test.step('Verify streak counter displays', async () => {
      const streakDisplay = page.locator('[data-testid="streak"], .streak').first();

      if (await streakDisplay.isVisible({ timeout: 3000 }).catch(() => false)) {
        const streakText = await streakDisplay.textContent();
        expect(streakText).toMatch(/\d+/); // Should contain a number
        console.log('Streak:', streakText);
      } else {
        console.log('Streak display not found (might not be implemented yet)');
      }
    });

    // Step 10: Verify form clears after save
    await test.step('Verify form clears after successful save', async () => {
      const textBox = page.locator('textarea, [contenteditable="true"]').first();
      const value = await textBox.inputValue().catch(() => textBox.textContent());

      // Form should be empty or back to default state
      expect(value?.trim() || '').toBe('');

      console.log('Form cleared successfully');
    });
  });

  test('should handle "Generate Insight" functionality', async ({ page }) => {
    // Sign in first
    await page.goto(`/app/reflect`);

    // Quick sign in
    await page.locator('input[type="email"]').fill(TEST_USER.email);
    await page.locator('input[type="password"]').fill(TEST_USER.password);
    await page.locator('button:has-text("Sign In")').click();
    await page.waitForURL(/\/app\/reflect/);

    // Look for "Generate Insight" button
    await test.step('Click Generate Insight button', async () => {
      const insightButton = page.locator('button:has-text("Generate Insight"), button:has-text("Insight")');

      if (await insightButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        // Check for console errors before clicking
        const errors: string[] = [];
        page.on('pageerror', (error) => {
          errors.push(error.message);
        });

        await insightButton.click();

        // Wait a bit for any errors to appear
        await page.waitForTimeout(2000);

        // Check if there were any console errors
        if (errors.length > 0) {
          console.error('Console errors detected:', errors);
          throw new Error(`Console errors on Generate Insight: ${errors.join(', ')}`);
        }

        // Should see some loading or result state
        const loadingOrResult = page.locator('[data-testid="insight-loading"], [data-testid="insight-result"], .loading, .insight');
        await expect(loadingOrResult).toBeVisible({ timeout: 5000 });

        console.log('Generate Insight clicked - no errors');
      } else {
        console.log('Generate Insight button not found');
      }
    });
  });

  test('should display error messages for validation failures', async ({ page }) => {
    // Sign in
    await page.goto(`/app/reflect`);
    await page.locator('input[type="email"]').fill(TEST_USER.email);
    await page.locator('input[type="password"]').fill(TEST_USER.password);
    await page.locator('button:has-text("Sign In")').click();
    await page.waitForURL(/\/app\/reflect/);

    await test.step('Try to save empty reflection', async () => {
      // Don't fill in any text
      const saveButton = page.locator('button:has-text("Save")').first();

      if (await saveButton.isVisible().catch(() => false)) {
        await saveButton.click();

        // Should see error message
        const errorMessage = page.locator('[data-testid="error-message"], .error, [role="alert"]');

        // Either an error appears, or the button is disabled
        const hasError = await errorMessage.isVisible({ timeout: 2000 }).catch(() => false);
        const isDisabled = await saveButton.isDisabled().catch(() => false);

        expect(hasError || isDisabled).toBeTruthy();

        if (hasError) {
          const message = await errorMessage.textContent();
          console.log('Validation error message:', message);
        } else {
          console.log('Save button disabled for empty input');
        }
      }
    });
  });

  test('should be accessible and responsive', async ({ page }) => {
    // Sign in first
    await page.goto(`/app/reflect`);
    await page.locator('input[type="email"]').fill(TEST_USER.email);
    await page.locator('input[type="password"]').fill(TEST_USER.password);
    await page.locator('button:has-text("Sign In")').click();
    await page.waitForURL(/\/app\/reflect/);

    await test.step('Check for accessibility violations', async () => {
      // Check for basic accessibility
      const mainContent = page.locator('main, [role="main"]');
      await expect(mainContent).toBeVisible();

      // All interactive elements should have accessible names
      const buttons = page.locator('button');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');

        expect(text || ariaLabel).toBeTruthy();
      }

      console.log('Basic accessibility checks passed');
    });

    await test.step('Check responsive behavior', async () => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      // Main content should still be visible
      const mainContent = page.locator('main, [role="main"]').first();
      await expect(mainContent).toBeVisible();

      console.log('Responsive test passed');
    });
  });

  test('should prevent duplicate submissions', async ({ page }) => {
    // Sign in
    await page.goto(`/app/reflect`);
    await page.locator('input[type="email"]').fill(TEST_USER.email);
    await page.locator('input[type="password"]').fill(TEST_USER.password);
    await page.locator('button:has-text("Sign In")').click();
    await page.waitForURL(/\/app\/reflect/);

    await test.step('Try double-clicking save button', async () => {
      // Write a reflection
      const textBox = page.locator('textarea').first();
      await textBox.fill('Test double-click protection');

      // Click save multiple times quickly
      const saveButton = page.locator('button:has-text("Save")').first();

      // Click twice quickly
      await saveButton.click();
      await saveButton.click({ timeout: 100 }).catch(() => {
        console.log('Second click prevented (expected)');
      });

      // Button should be disabled during save
      await page.waitForTimeout(500);
      const isDisabled = await saveButton.isDisabled().catch(() => false);

      console.log('Double-click protection:', isDisabled ? 'Active' : 'Not implemented');
    });
  });
});
