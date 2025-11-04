import DOMPurify from 'isomorphic-dompurify';

export interface SvgValidationResult {
  isValid: boolean;
  sanitized?: string;
  error?: string;
  warnings?: string[];
}

/**
 * Validates and sanitizes SVG content to prevent XSS attacks
 *
 * This utility checks for common attack vectors in SVG files:
 * - Script tags that execute JavaScript
 * - Event handlers (onclick, onload, etc.)
 * - Foreign objects that can load external content
 * - Suspicious attributes and patterns
 *
 * @param svgContent - Raw SVG content as string
 * @returns Validation result with sanitized content or error
 *
 * @example
 * ```typescript
 * const result = validateAndSanitizeSvg(userUploadedSvg);
 * if (result.isValid) {
 *   await saveSvgToDatabase(result.sanitized);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export function validateAndSanitizeSvg(svgContent: string): SvgValidationResult {
  const warnings: string[] = [];

  // Basic validation checks
  if (!svgContent || typeof svgContent !== 'string') {
    return {
      isValid: false,
      error: 'SVG content is empty or not a string',
    };
  }

  // Check if it looks like an SVG
  if (!svgContent.includes('<svg')) {
    return {
      isValid: false,
      error: 'Not a valid SVG file - missing <svg> tag',
    };
  }

  // Check for dangerous tags before sanitization
  const dangerousTags = /<(script|iframe|object|embed|foreignObject)/i;
  if (dangerousTags.test(svgContent)) {
    warnings.push('SVG contains potentially dangerous tags (script, iframe, etc.) - they will be removed');
  }

  // Check for event handlers
  const eventHandlers = /on(load|error|click|mouseover|mouseenter|mouseleave|focus|blur|change|input|submit)=/i;
  if (eventHandlers.test(svgContent)) {
    warnings.push('SVG contains event handlers - they will be removed');
  }

  // Check for data URIs that could contain JavaScript
  const suspiciousDataUri = /data:text\/html|data:image\/svg\+xml.*<script/i;
  if (suspiciousDataUri.test(svgContent)) {
    warnings.push('SVG contains suspicious data URIs - they will be removed');
  }

  // Check for external references
  const externalRefs = /<use\s+[^>]*xlink:href=["']https?:\/\//i;
  if (externalRefs.test(svgContent)) {
    warnings.push('SVG contains external references - they may be removed or sanitized');
  }

  // Sanitize with DOMPurify
  const sanitized = DOMPurify.sanitize(svgContent, {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'foreignObject'],
    FORBID_ATTR: [
      'onload',
      'onerror',
      'onclick',
      'onmouseover',
      'onmouseenter',
      'onmouseleave',
      'onfocus',
      'onblur',
      'onchange',
      'oninput',
      'onsubmit',
      'onreset',
      'onselect',
      'onkeydown',
      'onkeyup',
      'onkeypress',
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });

  // Verify the sanitized content is still valid
  if (!sanitized || sanitized.length === 0) {
    return {
      isValid: false,
      error: 'SVG became invalid after sanitization - content may be entirely malicious',
      warnings,
    };
  }

  if (!sanitized.includes('<svg')) {
    return {
      isValid: false,
      error: 'SVG structure was destroyed during sanitization - likely contains malicious content',
      warnings,
    };
  }

  // Check size limits (prevent DoS via huge SVG files)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (sanitized.length > maxSize) {
    return {
      isValid: false,
      error: `SVG file too large (${(sanitized.length / 1024 / 1024).toFixed(2)}MB). Maximum size is 5MB`,
      warnings,
    };
  }

  return {
    isValid: true,
    sanitized,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Quick check if SVG content is safe (doesn't sanitize)
 * Use this for performance-sensitive scenarios where you just need a yes/no answer
 *
 * @param svgContent - SVG content to check
 * @returns true if safe, false if dangerous
 */
export function isSvgSafe(svgContent: string): boolean {
  if (!svgContent || typeof svgContent !== 'string') {
    return false;
  }

  // Check for obvious attack vectors
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on(load|error|click|mouseover)=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<foreignObject/i,
  ];

  return !dangerousPatterns.some(pattern => pattern.test(svgContent));
}

/**
 * Extracts SVG metadata (viewBox, dimensions, etc.)
 *
 * @param svgContent - SVG content
 * @returns Metadata object
 */
export function extractSvgMetadata(svgContent: string): {
  viewBox?: string;
  width?: string;
  height?: string;
  title?: string;
} {
  const metadata: any = {};

  // Extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
  if (viewBoxMatch) {
    metadata.viewBox = viewBoxMatch[1];
  }

  // Extract width
  const widthMatch = svgContent.match(/width=["']([^"']+)["']/i);
  if (widthMatch) {
    metadata.width = widthMatch[1];
  }

  // Extract height
  const heightMatch = svgContent.match(/height=["']([^"']+)["']/i);
  if (heightMatch) {
    metadata.height = heightMatch[1];
  }

  // Extract title
  const titleMatch = svgContent.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }

  return metadata;
}
