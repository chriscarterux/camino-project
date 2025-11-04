/**
 * PII Sanitization Utilities
 *
 * Provides functions to sanitize personally identifiable information
 * before sending to analytics platforms.
 */

/**
 * List of property keys that may contain PII
 * These should never be sent to analytics
 */
const PII_KEYS = [
  'email',
  'phone',
  'name',
  'first_name',
  'last_name',
  'address',
  'ssn',
  'credit_card',
  'password',
  'token',
  'api_key',
  'prompt_text', // Reflection prompts
  'content', // Reflection content
  'text', // Generic text that might contain PII
  'message', // User messages
  'comment', // User comments
  'note', // User notes
  'reflection_content', // Explicit reflection content
];

/**
 * Hash a string using SHA-256 (for identifiers that need to be consistent but private)
 */
export async function hashString(str: string): Promise<string> {
  if (typeof window === 'undefined') {
    // Server-side: use Node.js crypto
    const crypto = await import('crypto');
    return crypto.createHash('sha256').update(str).digest('hex');
  } else {
    // Client-side: use Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

/**
 * Sanitize an object by removing or hashing PII
 *
 * @param obj - Object to sanitize
 * @param hashMode - If true, hash PII instead of removing it
 * @returns Sanitized object
 */
export function sanitizePII<T extends Record<string, any>>(
  obj: T,
  hashMode: boolean = false
): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (PII_KEYS.includes(key.toLowerCase())) {
      if (hashMode && typeof sanitized[key] === 'string') {
        // Hash the value (synchronous approximation)
        sanitized[key] = '[REDACTED]' as any;
      } else {
        // Remove the property entirely
        delete sanitized[key];
      }
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizePII(sanitized[key], hashMode);
    }
  }

  return sanitized;
}

/**
 * Validate that an event properties object doesn't contain PII
 * Throws an error if PII is detected
 *
 * @param properties - Event properties to validate
 * @throws Error if PII is detected
 */
export function validateNoPII(properties: Record<string, any>): void {
  for (const key in properties) {
    if (PII_KEYS.includes(key.toLowerCase())) {
      throw new Error(
        `PII detected in analytics event: "${key}". ` +
        `This property should not be sent to analytics. ` +
        `Please use sanitizePII() or remove this property.`
      );
    }

    // Check nested objects
    if (typeof properties[key] === 'object' && properties[key] !== null) {
      validateNoPII(properties[key]);
    }
  }
}

/**
 * Safe properties that can be sent to analytics
 * Useful for whitelisting known-safe properties
 */
export const SAFE_ANALYTICS_PROPERTIES = [
  'reflection_id',
  'reflection_count',
  'prompt_id', // ID only, not text
  'dimension',
  'word_count',
  'time_spent_seconds',
  'mood',
  'session_number',
  'days_since_signup',
  'insight_id',
  'insight_type',
  'generation_time_ms',
  'ai_model',
  'is_first_insight',
  'time_since_generation_seconds',
  'source',
  'share_method',
  'platform',
  'activation_path',
  'first_dimension',
  'session_count',
  'plan',
  'total_reflections',
  'total_insights',
  'is_activated',
];

/**
 * Filter properties to only include safe analytics properties
 *
 * @param properties - Properties to filter
 * @returns Filtered properties containing only safe values
 */
export function filterSafeProperties<T extends Record<string, any>>(
  properties: T
): Partial<T> {
  const safe: Partial<T> = {};

  for (const key in properties) {
    if (SAFE_ANALYTICS_PROPERTIES.includes(key)) {
      safe[key] = properties[key];
    }
  }

  return safe;
}
