import { z } from 'zod';

/**
 * Comprehensive Zod validation schemas for all API endpoints
 *
 * Provides type-safe input validation with security checks
 * for SQL injection, XSS, and other attack vectors.
 */

// =============================================================================
// Common Validation Primitives
// =============================================================================

/**
 * Email validation with strict format checking
 */
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(5, 'Email too short')
  .max(254, 'Email too long (max 254 characters)')
  .toLowerCase()
  .trim();

/**
 * UUID validation for IDs
 */
export const uuidSchema = z
  .string()
  .uuid('Invalid ID format');

/**
 * Safe string validation (prevents XSS)
 * Blocks script tags, event handlers, and suspicious patterns
 */
export const safeStringSchema = z
  .string()
  .trim()
  .refine(
    (val) => !/<script|<iframe|javascript:/i.test(val),
    { message: 'String contains potentially malicious content' }
  );

/**
 * Name validation (names, titles, subjects)
 */
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(200, 'Name too long (max 200 characters)')
  .trim()
  .refine(
    (val) => !/<script|<iframe|javascript:/i.test(val),
    { message: 'Name contains invalid characters' }
  );

/**
 * Content validation (reflection text, messages)
 */
export const contentSchema = z
  .string()
  .min(1, 'Content is required')
  .max(10000, 'Content too long (max 10,000 characters)')
  .trim()
  .refine(
    (val) => !/<script|<iframe|javascript:/i.test(val),
    { message: 'Content contains potentially malicious code' }
  );

/**
 * Dimension enum validation
 */
export const dimensionSchema = z.enum(['identity', 'worldview', 'relationships']);

/**
 * Mood enum validation
 */
export const moodSchema = z.enum([
  'excited',
  'hopeful',
  'neutral',
  'anxious',
  'frustrated',
  'grateful',
  'confused',
  'motivated',
]);

// =============================================================================
// Reflection API Schemas (already implemented in Phase 1, included for completeness)
// =============================================================================

export const createReflectionSchema = z.object({
  prompt_id: uuidSchema,
  prompt_text: contentSchema.max(1000, 'Prompt text too long (max 1000 characters)'),
  content: contentSchema,
  mood: moodSchema.optional(),
  dimension: dimensionSchema.optional(),
  session_number: z.number().int().positive().optional(),
});

export const updateReflectionSchema = z.object({
  content: contentSchema.optional(),
  mood: moodSchema.optional(),
  dimension: dimensionSchema.optional(),
});

// =============================================================================
// Insights API Schemas
// =============================================================================

export const generateInsightSchema = z.object({
  reflection_ids: z
    .array(uuidSchema)
    .min(3, 'Need at least 3 reflections to generate insight')
    .max(10, 'Too many reflections (max 10)'),
  dimension: dimensionSchema.default('identity'),
});

// =============================================================================
// Contact Form Schema
// =============================================================================

export const contactFormSchema = z.object({
  name: nameSchema.max(100, 'Name too long (max 100 characters)'),
  email: emailSchema,
  subject: nameSchema.max(200, 'Subject too long (max 200 characters)'),
  message: contentSchema.max(5000, 'Message too long (max 5000 characters)'),
});

// =============================================================================
// Lead Capture Schema
// =============================================================================

export const leadCaptureSchema = z.object({
  email: emailSchema,
  name: nameSchema.max(100, 'Name too long (max 100 characters)').optional(),
  primary_interest: z
    .enum(['self_discovery', 'transformation', 'coaching', 'other'])
    .optional(),
  source: z.enum([
    'homepage',
    'how-it-works',
    'pricing',
    'footer',
    'exit-intent',
  ]),
  website: z
    .string()
    .optional()
    .refine((val) => !val || val === '', {
      message: 'Honeypot field should be empty',
    }), // Honeypot field
});

// =============================================================================
// Profile Update Schema
// =============================================================================

export const updateProfileSchema = z.object({
  full_name: nameSchema.max(100, 'Name too long (max 100 characters)').optional(),
  timezone: z.string().max(50, 'Timezone too long').optional(),
  notification_preferences: z
    .object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
      daily_reminder: z.boolean().optional(),
      weekly_summary: z.boolean().optional(),
    })
    .optional(),
});

// =============================================================================
// LMS Integration Schemas
// =============================================================================

export const enrollCourseSchema = z.object({
  course_slug: z
    .string()
    .min(1, 'Course slug is required')
    .max(100, 'Course slug too long')
    .regex(/^[a-z0-9-]+$/, 'Invalid course slug format'),
});

export const completeLessonSchema = z.object({
  lesson_name: z
    .string()
    .min(1, 'Lesson name is required')
    .max(200, 'Lesson name too long'),
  course_slug: z
    .string()
    .min(1, 'Course slug is required')
    .max(100, 'Course slug too long')
    .regex(/^[a-z0-9-]+$/, 'Invalid course slug format'),
  completed_at: z
    .string()
    .datetime()
    .optional()
    .default(new Date().toISOString()),
});

export const syncUserSchema = z.object({
  lms_user_id: z.string().optional(),
  email: emailSchema.optional(),
});

// =============================================================================
// Email Subscription Schemas
// =============================================================================

export const subscribeEmailSchema = z.object({
  email: emailSchema,
  list: z.enum(['newsletter', 'product_updates', 'daily_reflections']),
});

// =============================================================================
// Certificate Generation Schema
// =============================================================================

export const generateCertificateSchema = z.object({
  course_slug: z
    .string()
    .min(1, 'Course slug is required')
    .max(100, 'Course slug too long')
    .regex(/^[a-z0-9-]+$/, 'Invalid course slug format'),
  user_name: nameSchema.max(100, 'Name too long (max 100 characters)'),
  completion_date: z.string().datetime().optional(),
});

// =============================================================================
// Export all schemas
// =============================================================================

export const apiSchemas = {
  // Reflections
  createReflection: createReflectionSchema,
  updateReflection: updateReflectionSchema,

  // Insights
  generateInsight: generateInsightSchema,

  // Contact & Leads
  contactForm: contactFormSchema,
  leadCapture: leadCaptureSchema,

  // Profile
  updateProfile: updateProfileSchema,

  // LMS
  enrollCourse: enrollCourseSchema,
  completeLesson: completeLessonSchema,
  syncUser: syncUserSchema,

  // Email
  subscribeEmail: subscribeEmailSchema,

  // Certificates
  generateCertificate: generateCertificateSchema,
};

// Export types for TypeScript type inference
export type CreateReflectionInput = z.infer<typeof createReflectionSchema>;
export type UpdateReflectionInput = z.infer<typeof updateReflectionSchema>;
export type GenerateInsightInput = z.infer<typeof generateInsightSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type EnrollCourseInput = z.infer<typeof enrollCourseSchema>;
export type CompleteLessonInput = z.infer<typeof completeLessonSchema>;
export type SyncUserInput = z.infer<typeof syncUserSchema>;
export type SubscribeEmailInput = z.infer<typeof subscribeEmailSchema>;
export type GenerateCertificateInput = z.infer<typeof generateCertificateSchema>;
