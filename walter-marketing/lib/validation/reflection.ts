/**
 * Input Validation for Reflection API
 *
 * Provides comprehensive input validation to prevent SQL injection,
 * XSS, and other security vulnerabilities.
 */

import { z } from 'zod';

/**
 * Schema for reflection creation
 */
export const createReflectionSchema = z.object({
  prompt_id: z.string().uuid('Invalid prompt ID format'),
  prompt_text: z.string()
    .min(1, 'Prompt text is required')
    .max(1000, 'Prompt text too long (max 1000 characters)')
    .trim(),
  content: z.string()
    .min(1, 'Reflection content is required')
    .max(10000, 'Reflection content too long (max 10000 characters)')
    .trim(),
  mood: z.enum([
    'excited',
    'hopeful',
    'neutral',
    'anxious',
    'frustrated',
    'grateful',
    'confused',
    'motivated',
  ]).optional(),
  dimension: z.enum(['identity', 'worldview', 'relationships']).optional(),
  session_number: z.number()
    .int('Session number must be an integer')
    .positive('Session number must be positive')
    .optional(),
});

export type CreateReflectionInput = z.infer<typeof createReflectionSchema>;

/**
 * Validate and sanitize reflection creation input
 *
 * @param input - Raw input from client
 * @returns Validated and sanitized input
 * @throws ZodError if validation fails
 */
export function validateCreateReflection(input: unknown): CreateReflectionInput {
  return createReflectionSchema.parse(input);
}

/**
 * Safe parse with error handling
 *
 * @param input - Raw input from client
 * @returns Result object with success status and data/error
 */
export function safeValidateCreateReflection(input: unknown) {
  return createReflectionSchema.safeParse(input);
}

/**
 * Additional security checks beyond schema validation
 */
export function performSecurityChecks(input: CreateReflectionInput): {
  safe: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check for SQL injection patterns
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(--|\/\*|\*\/|;)/,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
    /(UNION.*SELECT)/i,
  ];

  const fieldsToCheck = [input.prompt_id, input.prompt_text, input.content];

  for (const field of fieldsToCheck) {
    if (typeof field === 'string') {
      for (const pattern of sqlPatterns) {
        if (pattern.test(field)) {
          issues.push(`Potential SQL injection pattern detected in input`);
          break;
        }
      }
    }
  }

  // Check for XSS patterns
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>/gi,
    /javascript:/gi,
    /on\w+\s*=\s*["'][^"']*["']/gi, // Event handlers
  ];

  for (const field of fieldsToCheck) {
    if (typeof field === 'string') {
      for (const pattern of xssPatterns) {
        if (pattern.test(field)) {
          issues.push(`Potential XSS pattern detected in input`);
          break;
        }
      }
    }
  }

  // Check content length (prevent DoS)
  if (input.content.length > 10000) {
    issues.push('Content exceeds maximum length');
  }

  return {
    safe: issues.length === 0,
    issues,
  };
}

/**
 * Sanitize input by removing potentially dangerous characters
 * while preserving legitimate content
 */
export function sanitizeReflectionContent(content: string): string {
  // Remove null bytes
  let sanitized = content.replace(/\0/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  // Normalize line endings
  sanitized = sanitized.replace(/\r\n/g, '\n');

  return sanitized;
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Complete validation pipeline
 */
export function validateReflectionInput(input: unknown): {
  success: boolean;
  data?: CreateReflectionInput;
  error?: string;
  securityIssues?: string[];
} {
  // Step 1: Schema validation
  const schemaResult = safeValidateCreateReflection(input);

  if (!schemaResult.success) {
    return {
      success: false,
      error: `Validation error: ${schemaResult.error.errors.map(e => e.message).join(', ')}`,
    };
  }

  const validatedData = schemaResult.data;

  // Step 2: Security checks
  const securityResult = performSecurityChecks(validatedData);

  if (!securityResult.safe) {
    return {
      success: false,
      error: 'Security validation failed',
      securityIssues: securityResult.issues,
    };
  }

  // Step 3: Sanitization
  validatedData.content = sanitizeReflectionContent(validatedData.content);
  validatedData.prompt_text = sanitizeReflectionContent(validatedData.prompt_text);

  return {
    success: true,
    data: validatedData,
  };
}
