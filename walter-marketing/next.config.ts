import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Allow scripts from self and specific trusted sources
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.posthog.com https://js.stripe.com",
              // Allow styles from self with inline styles (needed for Tailwind)
              "style-src 'self' 'unsafe-inline'",
              // Allow images from self, data URIs, and HTTPS sources
              "img-src 'self' data: https:",
              // Allow fonts from self and data URIs
              "font-src 'self' data:",
              // Allow connections to self and trusted APIs
              "connect-src 'self' https://app.posthog.com https://api.stripe.com https://46.202.93.22:8000 https://cjechozcgxrjbsumltho.supabase.co",
              // Allow frames only from Stripe (for payment forms)
              "frame-src 'self' https://js.stripe.com",
              // Block object/embed tags (prevents SVG script execution)
              "object-src 'none'",
              // Prevent base tag hijacking
              "base-uri 'self'",
              // Only allow form submissions to same origin
              "form-action 'self'",
              // Prevent loading of plugins
              "plugin-types 'none'",
              // Block all mixed content
              "upgrade-insecure-requests",
            ].join('; ')
          },
          {
            // Prevent clickjacking attacks
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            // Prevent MIME type sniffing
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            // Enable XSS protection
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            // Control referrer information
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            // Enforce HTTPS
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            // Control which browser features can be used
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
