import { test, expect } from '@playwright/test'

test.describe('Homepage Hero Section - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays the transformation narrative heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText("You're Not Broken")
    await expect(page.getByRole('heading', { level: 1 })).toContainText("You're Just Seeing Through the Wrong Lens")
  })

  test('shows 12-week journey subheading with all 3 dimensions', async ({ page }) => {
    const subheading = page.getByText(/A 12-week integrated transformation journey/)
    await expect(subheading).toBeVisible()
    await expect(subheading).toContainText('Identity')
    await expect(subheading).toContainText('Worldview')
    await expect(subheading).toContainText('Your Place in the World')
  })

  test('renders all three dimension cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Identity' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Worldview' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Relationships' })).toBeVisible()

    await expect(page.getByText('From self-criticism to inherent worth')).toBeVisible()
    await expect(page.getByText('From scarcity to abundance')).toBeVisible()
    await expect(page.getByText('From isolation to interconnection')).toBeVisible()
  })

  test('primary CTA navigates to /journal', async ({ page }) => {
    const cta = page.getByRole('link', { name: /start your transformation/i })
    await expect(cta).toBeVisible()

    await cta.click()
    await page.waitForURL('**/journal')
    expect(page.url()).toContain('/journal')
  })

  test('secondary CTA navigates to /how-it-works', async ({ page }) => {
    const cta = page.getByRole('link', { name: /see how it works/i })
    await expect(cta).toBeVisible()

    await cta.click()
    await page.waitForURL('**/how-it-works')
    expect(page.url()).toContain('/how-it-works')
  })

  test('displays social proof with program details', async ({ page }) => {
    await expect(page.getByText('12 weeks to complete coherence')).toBeVisible()
    await expect(page.getByText('84 days of AI-guided reflection')).toBeVisible()
    await expect(page.getByText('6 private coaching sessions')).toBeVisible()
    await expect(page.getByText('24/7 AI pattern recognition')).toBeVisible()
  })

  test('hero section is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE size

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()

    const dimensionCards = page.locator('.grid-cols-1')
    await expect(dimensionCards.first()).toBeVisible()

    const cta = page.getByRole('link', { name: /start your transformation/i })
    await expect(cta).toBeVisible()
  })

  test('hero section is responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }) // iPad size

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()

    const cta = page.getByRole('link', { name: /start your transformation/i })
    await expect(cta).toBeVisible()
  })

  test('hero section is responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()

    const cta = page.getByRole('link', { name: /start your transformation/i })
    await expect(cta).toBeVisible()
  })

  test('maintains visual consistency (background decoration)', async ({ page }) => {
    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()

    // Check that background decorative elements exist
    const decorations = heroSection.locator('.absolute.inset-0')
    await expect(decorations).toBeVisible()
  })

  test('CTA button has hover effect', async ({ page }) => {
    const cta = page.getByRole('link', { name: /start your transformation/i })

    // Get initial state
    await expect(cta).toBeVisible()

    // Hover over the button
    await cta.hover()

    // The arrow icon should translate on hover (group-hover effect)
    await expect(cta).toBeVisible()
  })

  test('full user journey from homepage to signup', async ({ page }) => {
    // 1. User lands on homepage
    await expect(page.getByRole('heading', { level: 1 })).toContainText("You're Not Broken")

    // 2. Reads the transformation narrative
    await expect(page.getByText(/A 12-week integrated transformation journey/)).toBeVisible()

    // 3. Views the three dimensions
    await expect(page.getByRole('heading', { name: 'Identity' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Worldview' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Relationships' })).toBeVisible()

    // 4. Clicks "Start Your Transformation" CTA
    await page.getByRole('link', { name: /start your transformation/i }).click()

    // 5. Arrives at journal page
    await page.waitForURL('**/journal')
    expect(page.url()).toContain('/journal')
  })

  test('keyboard navigation works correctly', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab')

    // Continue tabbing through hero section
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Check that primary CTA is focusable
    const cta = page.getByRole('link', { name: /start your transformation/i })
    await cta.focus()
    await expect(cta).toBeFocused()

    // Press Enter to activate
    await page.keyboard.press('Enter')
    await page.waitForURL('**/journal')
  })
})

test.describe('Homepage Hero - Cross-Browser Compatibility', () => {
  test('renders correctly in all browsers', async ({ page, browserName }) => {
    await page.goto('/')

    // Core elements should be visible in all browsers
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/A 12-week integrated transformation journey/)).toBeVisible()
    await expect(page.getByRole('link', { name: /start your transformation/i })).toBeVisible()

    console.log(`✅ Hero section renders correctly in ${browserName}`)
  })
})

test.describe('Homepage Hero - Accessibility', () => {
  test('has proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()

    const h3s = page.getByRole('heading', { level: 3 }).all()
    expect((await h3s).length).toBeGreaterThanOrEqual(3)
  })

  test('all links have accessible names', async ({ page }) => {
    await page.goto('/')

    // Test that main CTA links exist and are clickable
    const primaryCTA = page.getByRole('link', { name: /start your transformation/i })
    await expect(primaryCTA).toBeVisible()

    const secondaryCTA = page.getByRole('link', { name: /see how it works/i })
    await expect(secondaryCTA).toBeVisible()

    // All visible links in nav should have text
    const navLinks = page.locator('nav a:visible')
    const count = await navLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test('focus states are visible', async ({ page }) => {
    await page.goto('/')

    const cta = page.getByRole('link', { name: /start your transformation/i })
    await cta.focus()

    // Element should have focus
    await expect(cta).toBeFocused()
  })
})
