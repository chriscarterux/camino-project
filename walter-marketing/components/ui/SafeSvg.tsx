import DOMPurify from 'isomorphic-dompurify';

interface SafeSvgProps {
  svg: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * SafeSvg Component
 *
 * Renders SVG content safely by sanitizing it to prevent XSS attacks.
 * Use this component when rendering dynamic SVG content from user input,
 * APIs, or any untrusted source.
 *
 * Security Features:
 * - Removes script tags
 * - Strips event handlers (onclick, onload, etc.)
 * - Blocks foreign objects, iframes, and embeds
 * - Validates against XSS patterns
 *
 * @example
 * ```tsx
 * <SafeSvg
 *   svg={userUploadedSvg}
 *   className="w-12 h-12"
 *   ariaLabel="User avatar"
 * />
 * ```
 */
export function SafeSvg({ svg, className, ariaLabel }: SafeSvgProps) {
  // Sanitize SVG with strict security settings
  const sanitized = DOMPurify.sanitize(svg, {
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
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });

  // If sanitization removed all content, show error state
  if (!sanitized || sanitized.length === 0) {
    console.error('SafeSvg: SVG content was invalid or became empty after sanitization');
    return (
      <div
        className={className}
        role="img"
        aria-label={ariaLabel || 'Invalid SVG'}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
            fill="#FEE2E2"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <path
            d="M12 8v4m0 4h.01"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={className}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
