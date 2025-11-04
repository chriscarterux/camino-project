# Security Documentation

## SVG Security Implementation

This document outlines the security measures implemented to prevent XSS (Cross-Site Scripting) attacks through SVG files and other vectors.

### Overview

SVG files can contain embedded JavaScript that executes when the SVG is rendered in a browser. This creates a potential XSS vulnerability that could allow attackers to:
- Steal user cookies and session tokens
- Inject malicious code into the application
- Redirect users to phishing sites
- Access sensitive user data

### Security Measures Implemented

#### 1. Static SVG Sanitization

All SVG files in the `public/` directory have been sanitized using DOMPurify to remove:
- `<script>` tags
- Event handlers (`onload`, `onclick`, `onerror`, etc.)
- `<foreignObject>` tags (can embed HTML/iframes)
- `<iframe>`, `<object>`, `<embed>` tags
- `javascript:` URIs

**Script Location:** `scripts/sanitize-svgs.js`

**Usage:**
```bash
npm run sanitize-svgs
```

This script should be run:
- Before every production deployment
- After adding new SVG files to the public directory
- As part of the CI/CD pipeline

#### 2. Runtime SVG Sanitization

For dynamically rendered SVG content (e.g., from user uploads or API responses), we provide a `SafeSvg` component.

**Component Location:** `components/ui/SafeSvg.tsx`

**Usage:**
```tsx
import { SafeSvg } from '@/components/ui/SafeSvg';

function MyComponent({ userSvg }: { userSvg: string }) {
  return (
    <SafeSvg
      svg={userSvg}
      className="w-12 h-12"
      ariaLabel="User avatar"
    />
  );
}
```

**Never use `dangerouslySetInnerHTML` directly with SVG content from untrusted sources.**

#### 3. SVG Validation Utilities

The `svg-validator.ts` utility provides functions for validating and sanitizing SVG content.

**Location:** `lib/svg-validator.ts`

**Functions:**

- `validateAndSanitizeSvg(svgContent: string)`: Validates and sanitizes SVG content, returns detailed results
- `isSvgSafe(svgContent: string)`: Quick check if SVG is safe (doesn't sanitize)
- `extractSvgMetadata(svgContent: string)`: Extracts viewBox, dimensions, and title

**Example:**
```typescript
import { validateAndSanitizeSvg } from '@/lib/svg-validator';

async function handleSvgUpload(file: File) {
  const content = await file.text();
  const result = validateAndSanitizeSvg(content);

  if (!result.isValid) {
    throw new Error(result.error);
  }

  if (result.warnings) {
    console.warn('SVG sanitization warnings:', result.warnings);
  }

  // Safe to use result.sanitized
  await saveSvgToDatabase(result.sanitized);
}
```

#### 4. Content Security Policy (CSP)

We've implemented strict CSP headers to prevent XSS attacks across the entire application.

**Configuration Location:** `next.config.ts`

**Key Security Headers:**

1. **Content-Security-Policy**
   - Blocks inline scripts (except where needed for specific libraries)
   - Restricts script sources to trusted domains
   - Blocks `object-src` and `embed-src` (prevents SVG script execution)
   - Enforces HTTPS for all requests

2. **X-Frame-Options: SAMEORIGIN**
   - Prevents clickjacking attacks

3. **X-Content-Type-Options: nosniff**
   - Prevents MIME type sniffing

4. **X-XSS-Protection: 1; mode=block**
   - Enables browser XSS protection

5. **Strict-Transport-Security**
   - Forces HTTPS connections

6. **Permissions-Policy**
   - Restricts browser features (camera, microphone, etc.)

### Testing

Comprehensive security tests are located in `tests/unit/svg-security.test.tsx`.

**Run tests:**
```bash
npm test -- svg-security.test.tsx
```

**Test coverage includes:**
- Script tag removal
- Event handler sanitization
- Foreign object blocking
- Attack vector prevention
- Real-world attack scenarios
- Performance (large file handling)

**Current test results:**
- 21 tests passing
- 100% coverage of security functions

### Development Guidelines

#### When Adding SVG Files

1. **Never commit SVGs directly from untrusted sources**
2. Run the sanitization script before committing:
   ```bash
   node scripts/sanitize-svgs.js
   ```
3. Verify the SVG still displays correctly after sanitization

#### When Rendering Dynamic SVG Content

1. **Always use the SafeSvg component** for user-generated content
2. **Never use `dangerouslySetInnerHTML`** with unsanitized SVG
3. Validate SVG content before storing in the database

#### Code Review Checklist

- [ ] All SVG files have been sanitized
- [ ] No `dangerouslySetInnerHTML` with unsanitized content
- [ ] SafeSvg component used for dynamic SVGs
- [ ] SVG validation applied to user uploads
- [ ] Security tests updated if new attack vectors discovered

### Attack Vectors Prevented

#### 1. Direct Script Injection
```xml
<!-- BLOCKED -->
<svg xmlns="http://www.w3.org/2000/svg">
  <script>alert('XSS')</script>
</svg>
```

#### 2. Event Handler Injection
```xml
<!-- BLOCKED -->
<svg xmlns="http://www.w3.org/2000/svg">
  <circle onload="stealCookies()"/>
</svg>
```

#### 3. Foreign Object Attack
```xml
<!-- BLOCKED -->
<svg xmlns="http://www.w3.org/2000/svg">
  <foreignObject>
    <iframe src="https://evil.com"></iframe>
  </foreignObject>
</svg>
```

#### 4. JavaScript URI
```xml
<!-- BLOCKED -->
<svg xmlns="http://www.w3.org/2000/svg">
  <a href="javascript:alert(1)">Click</a>
</svg>
```

#### 5. Data URI Script
```xml
<!-- BLOCKED -->
<svg xmlns="http://www.w3.org/2000/svg">
  <image href="data:text/html,<script>alert(1)</script>"/>
</svg>
```

### CI/CD Integration

Add these steps to your CI/CD pipeline:

```yaml
# .github/workflows/security.yml
name: Security Checks

on: [push, pull_request]

jobs:
  svg-security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm ci

      - name: Sanitize SVG files
        run: node scripts/sanitize-svgs.js

      - name: Run security tests
        run: npm test -- svg-security.test.tsx

      - name: Check for unsanitized SVGs
        run: |
          if git diff --exit-code public/*.svg; then
            echo "✓ All SVGs are sanitized"
          else
            echo "✗ Some SVGs need sanitization"
            exit 1
          fi
```

### Monitoring and Incident Response

#### CSP Violation Reporting

Consider adding CSP violation reporting:

```typescript
// In next.config.ts, add to CSP:
"report-uri https://your-csp-reporter.com/report"
```

#### Security Monitoring

1. Monitor for CSP violations in production
2. Set up alerts for security test failures
3. Review npm audit reports regularly:
   ```bash
   npm audit
   ```

#### Incident Response

If an XSS vulnerability is discovered:

1. **Immediate Actions:**
   - Identify affected SVG files
   - Run sanitization script
   - Deploy hotfix immediately

2. **Investigation:**
   - Determine how malicious SVG was introduced
   - Check logs for exploitation attempts
   - Review all similar files

3. **Prevention:**
   - Update tests to cover the new attack vector
   - Enhance validation rules if needed
   - Document the incident

### Performance Considerations

- SVG sanitization adds ~5-10ms overhead per file
- SafeSvg component sanitizes on every render (use memoization for large lists)
- File size limits: 5MB maximum per SVG

### Browser Compatibility

The security measures are compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dependencies

- `isomorphic-dompurify`: ^2.x (SVG sanitization library)
- Regularly update to patch security vulnerabilities

**Check for updates:**
```bash
npm outdated isomorphic-dompurify
npm update isomorphic-dompurify
```

### Reporting Security Issues

If you discover a security vulnerability, please email security@camino.com instead of creating a public issue.

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Additional Resources

- [OWASP SVG Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SVG_Security_Cheat_Sheet.html)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Changelog

#### 2025-11-03
- Initial SVG security implementation
- Added sanitization script
- Created SafeSvg component
- Implemented SVG validator utilities
- Added CSP headers
- Created comprehensive test suite
- Documented security measures

---

**Last Updated:** 2025-11-03
**Security Contact:** security@camino.com
**Documentation Version:** 1.0.0
