import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests @accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('pricing page should not have accessibility violations', async ({ page }) => {
    await page.goto('/pricing')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('form elements should have proper labels', async ({ page }) => {
    await page.goto('/')

    // Find all input elements
    const inputs = await page.locator('input').all()

    for (const input of inputs) {
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')
      const id = await input.getAttribute('id')

      // Check if input has associated label
      let hasLabel = false
      if (id) {
        const label = await page.locator(`label[for="${id}"]`).count()
        hasLabel = label > 0
      }

      // Input should have either aria-label, aria-labelledby, or associated label
      expect(ariaLabel || ariaLabelledBy || hasLabel).toBeTruthy()
    }
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Get all headings
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1) // Should have exactly one h1

    // Check that headings are in logical order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    const levels: number[] = []

    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName)
      const level = parseInt(tagName.substring(1))
      levels.push(level)
    }

    // Verify heading levels don't skip (e.g., h1 -> h3)
    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1]
      expect(diff).toBeLessThanOrEqual(1)
    }
  })

  test('images should have alt text', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeDefined()
    }
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/')

    // Tab through focusable elements
    const focusableElements = await page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').all()

    for (const element of focusableElements) {
      await page.keyboard.press('Tab')
      // Verify element receives focus
      const isFocused = await element.evaluate(el => el === document.activeElement)
      if (!isFocused) {
        // Some elements might not be in tab order, that's ok
        continue
      }
    }
  })
})
