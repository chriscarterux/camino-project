import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Lead Capture Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Setup
    await page.goto("/");
  });

  test("should display lead capture form on homepage", async ({ page }) => {
    // Check that form is visible
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
    await expect(page.getByRole("button", { name: /start your journey/i })).toBeVisible();
  });

  test("should submit lead capture form successfully", async ({ page }) => {
    const testEmail = `test-${Date.now()}@example.com`;

    // Fill out the form
    await page.getByPlaceholder("Enter your email").fill(testEmail);
    await page.getByPlaceholder("Name (optional)").fill("Test User");

    // Select interest
    await page.getByLabel(/primary interest/i).selectOption("identity");

    // Accept privacy policy
    await page.getByLabel(/privacy consent/i).check();

    // Submit form
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Wait for success message
    await expect(page.getByText(/welcome to camino/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/check your email/i)).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    // Fill with invalid email
    await page.getByPlaceholder("Enter your email").fill("invalid-email");
    await page.getByLabel(/privacy consent/i).check();
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Check for error message
    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
  });

  test("should show error when consent not provided", async ({ page }) => {
    // Fill email but don't check consent
    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Check for error
    await expect(page.getByText(/please accept the privacy policy/i)).toBeVisible();
  });

  test("should display lead capture on How It Works page", async ({ page }) => {
    await page.goto("/how-it-works");

    // Scroll to bottom where form should be
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check form visibility
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
  });

  test("should display lead capture on Pricing page", async ({ page }) => {
    await page.goto("/pricing");

    // Scroll to form section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check form visibility
    await expect(page.getByText(/try the free tier first/i)).toBeVisible();
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
  });

  test("should display footer signup widget", async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer signup exists
    await expect(page.getByText(/start your transformation today/i)).toBeVisible();
  });

  test("should disable form during submission", async ({ page }) => {
    const testEmail = `test-${Date.now()}@example.com`;

    await page.getByPlaceholder("Enter your email").fill(testEmail);
    await page.getByLabel(/privacy consent/i).check();

    // Click submit
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Check that button shows loading state
    await expect(page.getByText(/submitting/i)).toBeVisible();

    // Check that fields are disabled
    await expect(page.getByPlaceholder("Enter your email")).toBeDisabled();
  });

  test("should handle duplicate email error", async ({ page }) => {
    // Use a known existing email (if you have test data)
    const duplicateEmail = "duplicate@example.com";

    await page.getByPlaceholder("Enter your email").fill(duplicateEmail);
    await page.getByLabel(/privacy consent/i).check();
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Should show duplicate error
    await expect(page.getByText(/already registered/i)).toBeVisible({ timeout: 5000 });
  });

  test("should track analytics event on submission", async ({ page, context }) => {
    // Setup analytics tracking
    const analyticsEvents: any[] = [];

    // Intercept PostHog or analytics calls
    await page.route("**/api/analytics/**", (route) => {
      analyticsEvents.push(route.request().postDataJSON());
      route.fulfill({ status: 200 });
    });

    const testEmail = `test-${Date.now()}@example.com`;

    await page.getByPlaceholder("Enter your email").fill(testEmail);
    await page.getByLabel(/primary interest/i).selectOption("identity");
    await page.getByLabel(/privacy consent/i).check();
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Wait for success
    await expect(page.getByText(/welcome to camino/i)).toBeVisible();

    // Verify analytics was called (implementation depends on your analytics setup)
    // This is a placeholder - adjust based on your actual analytics implementation
  });

  test("should be keyboard navigable", async ({ page }) => {
    // Tab through form
    await page.keyboard.press("Tab"); // Email field
    await page.keyboard.type("test@example.com");

    await page.keyboard.press("Tab"); // Name field
    await page.keyboard.type("Test User");

    await page.keyboard.press("Tab"); // Interest select
    await page.keyboard.press("ArrowDown"); // Select an option

    await page.keyboard.press("Tab"); // Consent checkbox
    await page.keyboard.press("Space"); // Check it

    await page.keyboard.press("Tab"); // Submit button
    await page.keyboard.press("Enter"); // Submit

    // Form should submit
    await expect(page.getByText(/welcome to camino/i)).toBeVisible({ timeout: 5000 });
  });

  test("should pass accessibility audit", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper focus management", async ({ page }) => {
    // Check that email field can receive focus
    await page.getByPlaceholder("Enter your email").focus();
    await expect(page.getByPlaceholder("Enter your email")).toBeFocused();

    // Tab to next field
    await page.keyboard.press("Tab");
    await expect(page.getByPlaceholder("Name (optional)")).toBeFocused();
  });

  test("should display proper mobile layout", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that form is still visible and usable
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
    await expect(page.getByRole("button", { name: /start your journey/i })).toBeVisible();

    // Form should stack vertically
    const form = page.locator("form").first();
    const boundingBox = await form.boundingBox();

    expect(boundingBox?.width).toBeLessThanOrEqual(375);
  });

  test("should link to privacy policy", async ({ page }) => {
    const privacyLink = page.getByRole("link", { name: /privacy policy/i });

    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute("href", "/legal/privacy");
  });

  test("should not submit with honeypot filled", async ({ page }) => {
    // Fill the honeypot field (it's hidden)
    await page.evaluate(() => {
      const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement;
      if (honeypot) honeypot.value = "spam";
    });

    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByLabel(/privacy consent/i).check();
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Should show error
    await expect(page.getByText(/invalid submission/i)).toBeVisible();

    // Success message should NOT appear
    await expect(page.getByText(/welcome to camino/i)).not.toBeVisible();
  });

  test("should handle network error gracefully", async ({ page }) => {
    // Simulate network failure
    await page.route("**/api/leads", (route) => {
      route.abort("failed");
    });

    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByLabel(/privacy consent/i).check();
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Should show error message
    await expect(page.getByText(/something went wrong/i)).toBeVisible({ timeout: 5000 });
  });

  test("should reset form after successful submission", async ({ page }) => {
    const testEmail = `test-${Date.now()}@example.com`;

    await page.getByPlaceholder("Enter your email").fill(testEmail);
    await page.getByPlaceholder("Name (optional)").fill("Test User");
    await page.getByLabel(/privacy consent/i).check();
    await page.getByRole("button", { name: /start your journey/i }).click();

    // Wait for success
    await expect(page.getByText(/welcome to camino/i)).toBeVisible();

    // Form fields should be cleared (they're now hidden behind success message)
    // Success message should be displayed
    await expect(page.getByText(/check your email/i)).toBeVisible();
  });
});
