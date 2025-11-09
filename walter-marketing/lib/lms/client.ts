/**
 * Robust HTTP client for LMS integrations
 * Features: automatic retry, exponential backoff, circuit breaker, rate limit handling
 */

import {
  LMSError,
  LMSNetworkError,
  LMSRateLimitError,
  LMSCircuitBreakerError,
  classifyLMSError,
} from './errors'

interface RetryConfig {
  maxRetries: number
  initialDelayMs: number
  maxDelayMs: number
  backoffMultiplier: number
}

interface CircuitBreakerConfig {
  failureThreshold: number
  resetTimeoutMs: number
}

interface ClientConfig {
  retry: RetryConfig
  circuitBreaker: CircuitBreakerConfig
  timeout: number
}

enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

const DEFAULT_CONFIG: ClientConfig = {
  retry: {
    maxRetries: 3,
    initialDelayMs: 1000,
    maxDelayMs: 10000,
    backoffMultiplier: 2,
  },
  circuitBreaker: {
    failureThreshold: 5,
    resetTimeoutMs: 60000, // 1 minute
  },
  timeout: 30000, // 30 seconds
}

export class RobustHTTPClient {
  private config: ClientConfig
  private circuitState: CircuitState = CircuitState.CLOSED
  private failureCount: number = 0
  private lastFailureTime: number = 0
  private successCount: number = 0

  constructor(config?: Partial<ClientConfig>) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      retry: { ...DEFAULT_CONFIG.retry, ...config?.retry },
      circuitBreaker: {
        ...DEFAULT_CONFIG.circuitBreaker,
        ...config?.circuitBreaker,
      },
    }
  }

  /**
   * Make HTTP request with retry logic, backoff, and circuit breaker
   */
  async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Check circuit breaker state
    this.updateCircuitState()

    if (this.circuitState === CircuitState.OPEN) {
      this.logError('Circuit breaker is OPEN - blocking request', {
        url,
        failureCount: this.failureCount,
      })
      throw new LMSCircuitBreakerError()
    }

    let lastError: Error | undefined
    const { maxRetries, initialDelayMs, backoffMultiplier, maxDelayMs } = this.config.retry

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          const error = await this.handleErrorResponse(response)

          // Don't retry on auth or validation errors
          if (error.name === 'LMSAuthError' || error.name === 'LMSValidationError') {
            this.recordFailure()
            throw error
          }

          // Handle rate limiting with retry-after header
          if (error instanceof LMSRateLimitError && error.retryAfter) {
            this.logWarning(`Rate limited - waiting ${error.retryAfter}s before retry`, {
              attempt,
              url,
            })
            await this.delay(error.retryAfter * 1000)
            continue
          }

          lastError = error
          throw error
        }

        this.recordSuccess()
        const data = await response.json()
        this.logInfo('Request succeeded', { url, attempt, statusCode: response.status })
        return data as T

      } catch (error) {
        lastError = error as Error

        // Don't retry on abort (timeout) or non-retryable errors
        if (error instanceof Error && error.name === 'AbortError') {
          this.recordFailure()
          this.logError('Request timeout', { url, attempt, timeout: this.config.timeout })
          throw new LMSNetworkError(`Request timeout after ${this.config.timeout}ms`)
        }

        // Don't retry on auth/validation errors
        if (
          error instanceof LMSError &&
          (error.name === 'LMSAuthError' || error.name === 'LMSValidationError')
        ) {
          this.recordFailure()
          throw error
        }

        // Log retry attempt
        if (attempt < maxRetries) {
          const delay = Math.min(
            initialDelayMs * Math.pow(backoffMultiplier, attempt),
            maxDelayMs
          )

          this.logWarning('Request failed - retrying with exponential backoff', {
            attempt: attempt + 1,
            maxRetries,
            delayMs: delay,
            url,
            error: error instanceof Error ? error.message : String(error),
          })

          await this.delay(delay)
        } else {
          this.recordFailure()
          this.logError('Request failed - max retries exceeded', {
            attempts: attempt + 1,
            url,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      }
    }

    // If we get here, all retries failed
    this.recordFailure()
    throw lastError || new LMSNetworkError('Request failed after all retries')
  }

  /**
   * Handle error response and classify into specific error type
   */
  private async handleErrorResponse(response: Response): Promise<LMSError> {
    let responseBody: any
    let message = `HTTP ${response.status}`

    try {
      const text = await response.text()
      try {
        responseBody = JSON.parse(text)
        message = responseBody.message || responseBody.error || message
      } catch {
        message = text || message
      }
    } catch {
      // Failed to read response body
    }

    const error = classifyLMSError(response.status, message, responseBody)

    this.logError('LMS API error', {
      statusCode: response.status,
      errorType: error.name,
      message,
    })

    return error
  }

  /**
   * Update circuit breaker state based on failures and time
   */
  private updateCircuitState(): void {
    const now = Date.now()
    const timeSinceLastFailure = now - this.lastFailureTime

    if (this.circuitState === CircuitState.OPEN) {
      // Check if we should transition to HALF_OPEN
      if (timeSinceLastFailure >= this.config.circuitBreaker.resetTimeoutMs) {
        this.circuitState = CircuitState.HALF_OPEN
        this.successCount = 0
        this.logInfo('Circuit breaker transitioning to HALF_OPEN', {
          timeSinceLastFailure,
        })
      }
    }
  }

  /**
   * Record successful request
   */
  private recordSuccess(): void {
    if (this.circuitState === CircuitState.HALF_OPEN) {
      this.successCount++

      // After 3 successful requests in HALF_OPEN, close the circuit
      if (this.successCount >= 3) {
        this.circuitState = CircuitState.CLOSED
        this.failureCount = 0
        this.logInfo('Circuit breaker transitioning to CLOSED', {
          successCount: this.successCount,
        })
      }
    } else if (this.circuitState === CircuitState.CLOSED) {
      // Reset failure count on success
      if (this.failureCount > 0) {
        this.failureCount = Math.max(0, this.failureCount - 1)
      }
    }
  }

  /**
   * Record failed request
   */
  private recordFailure(): void {
    this.failureCount++
    this.lastFailureTime = Date.now()

    if (
      this.circuitState !== CircuitState.OPEN &&
      this.failureCount >= this.config.circuitBreaker.failureThreshold
    ) {
      this.circuitState = CircuitState.OPEN
      this.logError('Circuit breaker transitioning to OPEN', {
        failureCount: this.failureCount,
        threshold: this.config.circuitBreaker.failureThreshold,
      })
    }
  }

  /**
   * Delay execution for specified milliseconds
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Logging methods - can be replaced with proper logging library
   */
  private logInfo(message: string, context?: Record<string, any>): void {
    console.log('[LMS Client INFO]', message, context || '')
  }

  private logWarning(message: string, context?: Record<string, any>): void {
    console.warn('[LMS Client WARNING]', message, context || '')
  }

  private logError(message: string, context?: Record<string, any>): void {
    console.error('[LMS Client ERROR]', message, context || '')
  }

  /**
   * Get current circuit breaker stats (useful for monitoring)
   */
  getStats() {
    return {
      circuitState: this.circuitState,
      failureCount: this.failureCount,
      successCount: this.successCount,
      lastFailureTime: this.lastFailureTime,
    }
  }

  /**
   * Reset circuit breaker (useful for testing)
   */
  reset(): void {
    this.circuitState = CircuitState.CLOSED
    this.failureCount = 0
    this.successCount = 0
    this.lastFailureTime = 0
  }
}

// Default client instance
export const httpClient = new RobustHTTPClient()
