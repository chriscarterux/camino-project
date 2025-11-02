import { test, expect } from '@playwright/test'

test.describe('Homepage E2E', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Check that the page loaded
    await expect(page).toHaveTitle(/Camino/)

    // Check for key hero section elements
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/')

    // Click on pricing link
    await page.click('a[href="/pricing"]')

    // Verify we're on pricing page
    await expect(page).toHaveURL(/.*pricing/)
    await expect(page.locator('h1')).toContainText(/pricing/i)
  })

  test('should display CTA buttons', async ({ page }) => {
    await page.goto('/')

    // Check for primary CTA
    const ctaButton = page.locator('button, a').filter({ hasText: /get started|start/i }).first()
    await expect(ctaButton).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Check that content is visible on mobile
    await expect(page.locator('h1')).toBeVisible()

    // Check for mobile menu (hamburger)
    const mobileMenuButton = page.locator('button[aria-label*="menu" i]')
    if (await mobileMenuButton.count() > 0) {
      await expect(mobileMenuButton).toBeVisible()
    }
  })
})
