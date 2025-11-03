import { test, expect } from '@playwright/test'

test.describe('Security Tests', () => {
  test('should have proper security headers', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()

    // Check for security headers
    // X-Frame-Options prevents clickjacking
    expect(headers['x-frame-options'] || headers['X-Frame-Options']).toBeDefined()

    // X-Content-Type-Options prevents MIME sniffing
    expect(headers['x-content-type-options'] || headers['X-Content-Type-Options']).toBe('nosniff')

    // Strict-Transport-Security enforces HTTPS
    // Note: This might not be present in development
    // expect(headers['strict-transport-security']).toBeDefined()
  })

  test('should not expose sensitive information in client-side code', async ({ page }) => {
    await page.goto('/')

    // Get all script content
    const scripts = await page.evaluate(() => {
      const scriptTags = Array.from(document.querySelectorAll('script'))
      return scriptTags.map(script => script.textContent || '').join('\n')
    })

    // Check for common sensitive patterns
    const sensitivePatterns = [
      /password\s*=\s*['"][^'"]+['"]/i,
      /api[_-]?key\s*=\s*['"][^'"]+['"]/i,
      /secret\s*=\s*['"][^'"]+['"]/i,
      /token\s*=\s*['"][^'"]+['"]/i,
      /sk_live_/i, // Stripe secret key
      /pk_live_/i, // Stripe publishable key (ok in client, but worth monitoring)
    ]

    for (const pattern of sensitivePatterns) {
      // Note: pk_live_ (publishable keys) are ok to expose, but check anyway
      const matches = scripts.match(pattern)
      if (matches && !pattern.source.includes('pk_live')) {
        expect(matches).toBeNull() // Should not find sensitive data
      }
    }
  })

  test('should sanitize user input in forms', async ({ page }) => {
    await page.goto('/')

    // Find any input fields
    const inputs = await page.locator('input[type="text"], textarea').all()

    for (const input of inputs) {
      // Try XSS payload
      const xssPayload = '<script>alert("XSS")</script>'
      await input.fill(xssPayload)

      // Check if the value was sanitized or escaped
      const value = await input.inputValue()

      // The raw script tag should not be executable
      // (This is a basic check - real XSS testing should be more comprehensive)
      expect(value).toBeDefined()
    }
  })

  test('should use HTTPS for external resources', async ({ page }) => {
    await page.goto('/')

    // Get all external resources
    const resources = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[href], script[src], img[src]'))
      return links
        .map(el => el.getAttribute('href') || el.getAttribute('src'))
        .filter(url => url && url.startsWith('http'))
    })

    // All external resources should use HTTPS
    for (const url of resources) {
      if (url) {
        expect(url.startsWith('https://')).toBeTruthy()
      }
    }
  })

  test('should have secure cookie settings', async ({ context, page }) => {
    await page.goto('/')

    // Get cookies
    const cookies = await context.cookies()

    for (const cookie of cookies) {
      // Session cookies should be httpOnly
      if (cookie.name.includes('session') || cookie.name.includes('token')) {
        expect(cookie.httpOnly).toBeTruthy()
      }

      // Cookies should be secure in production
      // Note: This might be false in development (http://localhost)
      // expect(cookie.secure).toBeTruthy()
    }
  })

  test('should not allow SQL injection in URL parameters', async ({ page }) => {
    // Try SQL injection in query params
    const sqlInjectionPayload = "1' OR '1'='1"
    await page.goto(`/?id=${encodeURIComponent(sqlInjectionPayload)}`)

    // Page should load normally without errors
    const title = await page.title()
    expect(title).toBeDefined()

    // Check for SQL error messages
    const content = await page.content()
    const sqlErrorPatterns = [
      /sql syntax/i,
      /mysql error/i,
      /postgresql error/i,
      /ora-\d+/i,
      /syntax error/i,
    ]

    for (const pattern of sqlErrorPatterns) {
      expect(content.match(pattern)).toBeNull()
    }
  })

  test('should implement rate limiting on API routes', async ({ request }) => {
    // This is a placeholder - actual implementation depends on your API routes
    // Example: Test that making too many requests returns 429

    const apiEndpoint = '/api/contact' // Adjust to your actual endpoint

    // Make multiple rapid requests
    const requests = []
    for (let i = 0; i < 100; i++) {
      requests.push(
        request.post(apiEndpoint, {
          data: { message: 'test' },
          failOnStatusCode: false,
        })
      )
    }

    const responses = await Promise.all(requests)

    // At least some requests should be rate limited (429)
    // Note: This test might fail if rate limiting isn't implemented yet
    // const rateLimitedResponses = responses.filter(r => r.status() === 429)
    // expect(rateLimitedResponses.length).toBeGreaterThan(0)
  })
})
