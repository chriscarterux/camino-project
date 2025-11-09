/**
 * Custom error types for LMS integration
 * Provides specific error handling for different failure scenarios
 */

export class LMSError extends Error {
  public readonly statusCode?: number
  public readonly timestamp: Date

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'LMSError'
    this.statusCode = statusCode
    this.timestamp = new Date()
    Object.setPrototypeOf(this, LMSError.prototype)
  }
}

export class LMSNetworkError extends LMSError {
  constructor(message: string = 'Network error occurred while connecting to LMS') {
    super(message)
    this.name = 'LMSNetworkError'
    Object.setPrototypeOf(this, LMSNetworkError.prototype)
  }
}

export class LMSAuthError extends LMSError {
  constructor(message: string = 'Authentication failed with LMS', statusCode?: number) {
    super(message, statusCode)
    this.name = 'LMSAuthError'
    Object.setPrototypeOf(this, LMSAuthError.prototype)
  }
}

export class LMSValidationError extends LMSError {
  public readonly validationErrors?: Record<string, string[]>

  constructor(
    message: string = 'Validation error',
    validationErrors?: Record<string, string[]>,
    statusCode?: number
  ) {
    super(message, statusCode)
    this.name = 'LMSValidationError'
    this.validationErrors = validationErrors
    Object.setPrototypeOf(this, LMSValidationError.prototype)
  }
}

export class LMSRateLimitError extends LMSError {
  public readonly retryAfter?: number

  constructor(
    message: string = 'Rate limit exceeded',
    retryAfter?: number,
    statusCode?: number
  ) {
    super(message, statusCode)
    this.name = 'LMSRateLimitError'
    this.retryAfter = retryAfter
    Object.setPrototypeOf(this, LMSRateLimitError.prototype)
  }
}

export class LMSCircuitBreakerError extends LMSError {
  constructor(message: string = 'Circuit breaker is open - too many recent failures') {
    super(message, 503)
    this.name = 'LMSCircuitBreakerError'
    Object.setPrototypeOf(this, LMSCircuitBreakerError.prototype)
  }
}

/**
 * Classifies HTTP errors into specific error types
 */
export function classifyLMSError(
  statusCode: number,
  message: string,
  responseBody?: any
): LMSError {
  switch (statusCode) {
    case 401:
    case 403:
      return new LMSAuthError(message, statusCode)
    case 422:
    case 400:
      return new LMSValidationError(
        message,
        responseBody?.validation_errors || responseBody?.errors,
        statusCode
      )
    case 429:
      const retryAfter = responseBody?.retry_after || undefined
      return new LMSRateLimitError(message, retryAfter, statusCode)
    case 500:
    case 502:
    case 503:
    case 504:
      return new LMSNetworkError(message)
    default:
      return new LMSError(message, statusCode)
  }
}
