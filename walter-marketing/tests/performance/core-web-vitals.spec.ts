import { test, expect } from '@playwright/test'

test.describe('Performance Tests - Core Web Vitals', () => {
  test('should meet Core Web Vitals thresholds on homepage', async ({ page }) => {
    await page.goto('/')

    // Measure performance metrics
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const metrics: Record<string, number> = {}

          entries.forEach((entry: any) => {
            if (entry.entryType === 'largest-contentful-paint') {
              metrics.LCP = entry.renderTime || entry.loadTime
            }
          })

          // Get First Input Delay via PerformanceObserver
          const fid = performance.getEntriesByType('first-input')
          if (fid.length > 0) {
            metrics.FID = (fid[0] as any).processingStart - (fid[0] as any).startTime
          }

          // Get Cumulative Layout Shift
          const cls = performance.getEntriesByType('layout-shift')
          metrics.CLS = cls.reduce((sum: number, entry: any) => {
            if (!entry.hadRecentInput) {
              return sum + entry.value
            }
            return sum
          }, 0)

          resolve(metrics)
        }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })

        // Timeout after 10 seconds
        setTimeout(() => resolve({}), 10000)
      })
    })

    // Core Web Vitals thresholds
    // LCP should be less than 2.5 seconds
    if ('LCP' in performanceMetrics) {
      expect(performanceMetrics.LCP).toBeLessThan(2500)
    }

    // FID should be less than 100 milliseconds
    if ('FID' in performanceMetrics) {
      expect(performanceMetrics.FID).toBeLessThan(100)
    }

    // CLS should be less than 0.1
    if ('CLS' in performanceMetrics) {
      expect(performanceMetrics.CLS).toBeLessThan(0.1)
    }
  })

  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have optimized images', async ({ page }) => {
    await page.goto('/')

    // Get all images
    const images = await page.locator('img').all()

    for (const img of images) {
      // Check if image has width and height attributes (prevents layout shift)
      const width = await img.getAttribute('width')
      const height = await img.getAttribute('height')

      // Images should have dimensions specified
      expect(width || height).toBeTruthy()

      // Check if using Next.js Image component (has priority attribute on hero images)
      const isPriority = await img.getAttribute('data-priority')
      if (isPriority) {
        // Priority images should load quickly
        const loaded = await img.evaluate((el: HTMLImageElement) => el.complete)
        expect(loaded).toBeTruthy()
      }
    }
  })

  test('should minimize JavaScript bundle size', async ({ page }) => {
    await page.goto('/')

    // Get all script tags
    const scripts = await page.evaluate(() => {
      const scriptTags = Array.from(document.querySelectorAll('script[src]'))
      return scriptTags.map(script => ({
        src: script.getAttribute('src'),
      }))
    })

    // Check that we're using proper code splitting
    // Next.js should create multiple smaller bundles, not one huge bundle
    const hasCodeSplitting = scripts.length > 3
    expect(hasCodeSplitting).toBeTruthy()
  })

  test('should use resource hints for performance', async ({ page }) => {
    await page.goto('/')

    // Check for preconnect, dns-prefetch, or preload hints
    const resourceHints = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel]'))
      return links.map(link => ({
        rel: link.getAttribute('rel'),
        href: link.getAttribute('href'),
      }))
    })

    // Should have some resource hints
    const hasHints = resourceHints.some(hint =>
      hint.rel && ['preconnect', 'dns-prefetch', 'preload', 'prefetch'].includes(hint.rel)
    )

    expect(hasHints).toBeTruthy()
  })
})
