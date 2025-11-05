import { z } from 'zod';

/**
 * Validation and sanitisation helpers for the reflections API.
 * Ensures payloads are well-formed and do not contain obvious SQL/XSS payloads.
 */
export const reflectionSchema = z.object({
  prompt_id: z.string().uuid({ message: 'prompt_id must be a valid UUID' }),
  prompt_text: z
    .string({ required_error: 'prompt_text is required' })
    .trim()
    .min(1, 'prompt_text cannot be empty')
    .max(1000, 'prompt_text is too long'),
  content: z
    .string({ required_error: 'content is required' })
    .trim()
    .min(1, 'content cannot be empty')
    .max(10000, 'content is too long'),
  mood: z
    .string()
    .trim()
    .min(1, 'mood cannot be empty')
    .max(64, 'mood is too long')
    .optional(),
  dimension: z.enum(['identity', 'worldview', 'relationships']).optional(),
  session_number: z
    .number({ invalid_type_error: 'session_number must be a number' })
    .int('session_number must be an integer')
    .positive('session_number must be positive')
    .max(1000, 'session_number is unexpectedly large')
    .optional(),
});

export type ReflectionPayload = z.infer<typeof reflectionSchema>;

const SQL_PATTERNS: RegExp[] = [
  /(;\s*(DROP|ALTER|TRUNCATE)\b)/i,
  /(--|\/\*)/, // inline comments often used in injections
  /\bUNION\b\s+SELECT/i,
  /\bOR\b\s+1\s*=\s*1\b/i,
  /\bEXEC(UTE)?\b/i,
];

const XSS_PATTERNS: RegExp[] = [
  /<script[\s>]/i,
  /<iframe[\s>]/i,
  /javascript:/i,
  /on(?:load|error|click|mouseover|focus|blur)\s*=\s*/i,
];

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

function sanitizeText(input: string): string {
  return input.replace(CONTROL_CHARS, '').replace(/\r\n?/g, '\n').trim();
}

function detectPatterns(value: string, patterns: RegExp[]): string[] {
  return patterns.filter(pattern => pattern.test(value)).map(pattern => pattern.source);
}

export interface ValidationSuccess {
  success: true;
  data: ReflectionPayload;
}

export interface ValidationFailure {
  success: false;
  error: string;
  issues?: string[];
}

export type ValidationResult = ValidationSuccess | ValidationFailure;

export function validateReflectionInput(payload: unknown): ValidationResult {
  const parsed = reflectionSchema.safeParse(payload);

  if (!parsed.success) {
    const message = parsed.error.errors.map(error => error.message).join(', ');
    return { success: false, error: message };
  }

  const dirty = parsed.data;

  const sanitized: ReflectionPayload = {
    ...dirty,
    prompt_text: sanitizeText(dirty.prompt_text),
    content: sanitizeText(dirty.content),
    mood: dirty.mood ? sanitizeText(dirty.mood) : undefined,
    session_number: dirty.session_number,
  };

  const issues: string[] = [];
  const fieldsToCheck: Array<[string, string]> = [
    ['prompt_text', sanitized.prompt_text],
    ['content', sanitized.content],
  ];

  for (const [field, value] of fieldsToCheck) {
    const sqlHits = detectPatterns(value, SQL_PATTERNS);
    if (sqlHits.length > 0) {
      issues.push(`${field} contains disallowed SQL patterns`);
    }

    const xssHits = detectPatterns(value, XSS_PATTERNS);
    if (xssHits.length > 0) {
      issues.push(`${field} contains disallowed HTML/JS patterns`);
    }
  }

  if (issues.length > 0) {
    return {
      success: false,
      error: 'Invalid input detected',
      issues,
    };
  }

  return { success: true, data: sanitized };
}
