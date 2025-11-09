/**
 * Tests for Robust HTTP Client
 * Verifies retry logic, exponential backoff, circuit breaker, and error handling
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { RobustHTTPClient } from '@/lib/lms/client'
import {
  LMSNetworkError,
  LMSAuthError,
  LMSRateLimitError,
  LMSCircuitBreakerError,
} from '@/lib/lms/errors'

// Mock fetch globally
global.fetch = jest.fn() as any

describe('RobustHTTPClient', () => {
  let client: RobustHTTPClient

  beforeEach(() => {
    client = new RobustHTTPClient()
    client.reset() // Reset circuit breaker state
    jest.clearAllMocks()
  })

  describe('Retry Logic', () => {
    it('should retry failed requests up to maxRetries times', async () => {
      const mockFetch = jest.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)

      global.fetch = mockFetch as any

      const result = await client.request('https://api.test.com/data')

      expect(result).toEqual({ success: true })
      expect(mockFetch).toHaveBeenCalledTimes(3) // 1 initial + 2 retries
    })

    it('should throw error after max retries exceeded', async () => {
      // Mock delay to speed up test
      jest.spyOn(client as any, 'delay').mockResolvedValue(undefined)

      const mockFetch = jest.fn()
        .mockRejectedValue(new Error('Persistent network error'))

      global.fetch = mockFetch

      await expect(client.request('https://api.test.com/data')).rejects.toThrow()
      expect(mockFetch).toHaveBeenCalledTimes(4) // 1 initial + 3 retries
    }, 10000)

    it('should not retry on auth errors', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => 'Unauthorized',
      } as Response)

      global.fetch = mockFetch

      await expect(client.request('https://api.test.com/data')).rejects.toThrow(LMSAuthError)
      expect(mockFetch).toHaveBeenCalledTimes(1) // No retries for auth errors
    })

    it('should not retry on validation errors', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 422,
        text: async () => JSON.stringify({ message: 'Validation failed' }),
      } as Response)

      global.fetch = mockFetch

      await expect(client.request('https://api.test.com/data')).rejects.toThrow()
      expect(mockFetch).toHaveBeenCalledTimes(1) // No retries for validation errors
    })
  })

  describe('Exponential Backoff', () => {
    it('should implement exponential backoff between retries', async () => {
      const delays: number[] = []
      const originalDelay = (client as any).delay.bind(client)

      // Spy on delay method
      jest.spyOn(client as any, 'delay').mockImplementation(async (ms: number) => {
        delays.push(ms)
        return Promise.resolve()
      })

      const mockFetch = jest.fn()
        .mockRejectedValueOnce(new Error('Error 1'))
        .mockRejectedValueOnce(new Error('Error 2'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)

      global.fetch = mockFetch

      await client.request('https://api.test.com/data')

      // Verify exponential backoff: 1000ms, 2000ms
      expect(delays.length).toBe(2)
      expect(delays[0]).toBe(1000) // initialDelay
      expect(delays[1]).toBe(2000) // initialDelay * backoffMultiplier^1
    })

    it('should cap delay at maxDelayMs', async () => {
      const client = new RobustHTTPClient({
        retry: {
          maxRetries: 10,
          initialDelayMs: 1000,
          maxDelayMs: 5000,
          backoffMultiplier: 3,
        },
      })

      const delays: number[] = []
      jest.spyOn(client as any, 'delay').mockImplementation(async (ms: number) => {
        delays.push(ms)
        return Promise.resolve()
      })

      const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'))
      global.fetch = mockFetch

      await expect(client.request('https://api.test.com/data')).rejects.toThrow()

      // All delays should be capped at 5000ms
      const exceedsMax = delays.some(delay => delay > 5000)
      expect(exceedsMax).toBe(false)
    })
  })

  describe('Circuit Breaker', () => {
    it('should open circuit after failure threshold reached', async () => {
      const client = new RobustHTTPClient({
        circuitBreaker: {
          failureThreshold: 3,
          resetTimeoutMs: 60000,
        },
        retry: {
          maxRetries: 0, // Disable retries for this test
          initialDelayMs: 1000,
          maxDelayMs: 10000,
          backoffMultiplier: 2,
        },
      })

      const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'))
      global.fetch = mockFetch

      // Trigger 3 failures to open circuit
      for (let i = 0; i < 3; i++) {
        try {
          await client.request('https://api.test.com/data')
        } catch (e) {
          // Expected to fail
        }
      }

      const stats = client.getStats()
      expect(stats.circuitState).toBe('OPEN')

      // Next request should be blocked by circuit breaker
      await expect(client.request('https://api.test.com/data')).rejects.toThrow(
        LMSCircuitBreakerError
      )
    })

    it('should transition to HALF_OPEN after reset timeout', async () => {
      jest.useFakeTimers()

      const client = new RobustHTTPClient({
        circuitBreaker: {
          failureThreshold: 2,
          resetTimeoutMs: 1000, // 1 second for testing
        },
        retry: {
          maxRetries: 0,
          initialDelayMs: 100,
          maxDelayMs: 1000,
          backoffMultiplier: 2,
        },
      })

      const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'))
      global.fetch = mockFetch

      // Trigger failures to open circuit
      for (let i = 0; i < 2; i++) {
        try {
          await client.request('https://api.test.com/data')
        } catch (e) {
          // Expected
        }
      }

      expect(client.getStats().circuitState).toBe('OPEN')

      // Fast-forward past reset timeout
      jest.advanceTimersByTime(1100)

      // Circuit should now be HALF_OPEN
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      await client.request('https://api.test.com/data')
      expect(client.getStats().circuitState).toBe('HALF_OPEN')

      jest.useRealTimers()
    })

    it('should close circuit after successful requests in HALF_OPEN', async () => {
      jest.useFakeTimers()

      const client = new RobustHTTPClient({
        circuitBreaker: {
          failureThreshold: 2,
          resetTimeoutMs: 1000,
        },
        retry: {
          maxRetries: 0,
          initialDelayMs: 100,
          maxDelayMs: 1000,
          backoffMultiplier: 2,
        },
      })

      const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'))
      global.fetch = mockFetch

      // Open the circuit
      for (let i = 0; i < 2; i++) {
        try {
          await client.request('https://api.test.com/data')
        } catch (e) {
          // Expected
        }
      }

      // Wait for reset timeout
      jest.advanceTimersByTime(1100)

      // Make 3 successful requests to close circuit
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      for (let i = 0; i < 3; i++) {
        await client.request('https://api.test.com/data')
      }

      expect(client.getStats().circuitState).toBe('CLOSED')
      expect(client.getStats().failureCount).toBe(0)

      jest.useRealTimers()
    })
  })

  describe('Rate Limit Handling', () => {
    it('should handle rate limit with retry-after header', async () => {
      const delays: number[] = []
      jest.spyOn(client as any, 'delay').mockImplementation(async (ms: number) => {
        delays.push(ms)
        return Promise.resolve()
      })

      const mockFetch = jest.fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
          text: async () => JSON.stringify({ retry_after: 2 }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)

      global.fetch = mockFetch

      await client.request('https://api.test.com/data')

      expect(delays).toContain(2000) // Should wait 2 seconds (retry_after * 1000)
    })
  })

  describe('Timeout Handling', () => {
    it('should timeout long-running requests', async () => {
      const client = new RobustHTTPClient({ timeout: 100 }) // 100ms timeout

      const mockFetch = jest.fn().mockImplementation((url, options) => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({ success: true })
            })
          }, 500) // 500ms delay - longer than timeout

          // Simulate abort signal
          if (options?.signal) {
            options.signal.addEventListener('abort', () => {
              clearTimeout(timeout)
              const error = new Error('The operation was aborted')
              error.name = 'AbortError'
              reject(error)
            })
          }
        })
      })
      global.fetch = mockFetch

      await expect(client.request('https://api.test.com/data')).rejects.toThrow(
        LMSNetworkError
      )
    }, 10000)
  })

  describe('Error Classification', () => {
    it('should classify 401 as AuthError', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => 'Unauthorized',
      } as Response)

      global.fetch = mockFetch

      await expect(client.request('https://api.test.com/data')).rejects.toThrow(LMSAuthError)
    })

    it('should classify 429 as RateLimitError', async () => {
      // Mock delay to speed up test
      jest.spyOn(client as any, 'delay').mockResolvedValue(undefined)

      const mockFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 429,
        text: async () => 'Too many requests',
      } as Response)

      global.fetch = mockFetch

      await expect(client.request('https://api.test.com/data')).rejects.toThrow(
        LMSRateLimitError
      )
    }, 10000)

    it('should classify 500 as NetworkError', async () => {
      // Mock delay to speed up test
      jest.spyOn(client as any, 'delay').mockResolvedValue(undefined)

      const mockFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => 'Internal server error',
      } as Response)

      global.fetch = mockFetch

      await expect(client.request('https://api.test.com/data')).rejects.toThrow(
        LMSNetworkError
      )
    }, 10000)
  })
})
