import { NextRequest, NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';

/**
 * Validation middleware for API routes
 *
 * Provides centralized input validation using Zod schemas
 * with automatic error handling and security logging.
 *
 * @example
 * ```typescript
 * import { withValidation } from '@/lib/validation/middleware';
 * import { contactFormSchema } from '@/lib/validation/schemas';
 *
 * export const POST = withValidation(contactFormSchema, async (request, validatedData) => {
 *   // validatedData is typed and validated
 *   const { name, email, subject, message } = validatedData;
 *   // ... process request
 * });
 * ```
 */

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  issues?: z.ZodIssue[];
}

/**
 * Validates request JSON body against a Zod schema
 */
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      console.error('[Validation] Request validation failed:', {
        issues: result.error.issues,
        timestamp: new Date().toISOString(),
      });

      return {
        success: false,
        error: 'Validation failed',
        issues: result.error.issues,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('[Validation] Failed to parse request body:', error);
    return {
      success: false,
      error: 'Invalid JSON',
    };
  }
}

/**
 * Higher-order function that wraps API route handlers with validation
 *
 * @param schema - Zod schema to validate request body against
 * @param handler - Async function that receives validated data
 * @returns Next.js API route handler
 */
export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (request: NextRequest, validatedData: T) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const validation = await validateRequestBody(request, schema);

    if (!validation.success) {
      // Return detailed validation errors in development
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json(
          {
            error: validation.error,
            issues: validation.issues,
          },
          { status: 400 }
        );
      }

      // Return generic error in production (don't leak validation details)
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Call handler with validated data
    return handler(request, validation.data!);
  };
}

/**
 * Validates query parameters against a Zod schema
 */
export function validateQueryParams<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): ValidationResult<T> {
  try {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const result = schema.safeParse(params);

    if (!result.success) {
      console.error('[Validation] Query param validation failed:', {
        issues: result.error.issues,
        timestamp: new Date().toISOString(),
      });

      return {
        success: false,
        error: 'Invalid query parameters',
        issues: result.error.issues,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('[Validation] Failed to validate query params:', error);
    return {
      success: false,
      error: 'Invalid query parameters',
    };
  }
}
