import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camino — Guided reflection for a meaningful life",
  description: "Understand your patterns, act with purpose, and grow with a calm, intelligent guide. Camino helps you reflect, discover, and grow through daily guided reflection.",

  // Favicon configuration
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#CF9930' },
    ],
  },

  // Web app manifest
  manifest: '/site.webmanifest',

  // Theme colors for browsers and mobile devices
  themeColor: '#E2C379',

  // Additional meta tags
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Camino',
  },

  // Open Graph metadata (for social sharing)
  openGraph: {
    title: "Camino — Guided reflection for a meaningful life",
    description: "Understand your patterns, act with purpose, and grow with a calm, intelligent guide.",
    type: 'website',
    siteName: 'Camino',
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary',
    title: "Camino — Guided reflection for a meaningful life",
    description: "Understand your patterns, act with purpose, and grow with a calm, intelligent guide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Windows tile config */}
        <meta name="msapplication-TileColor" content="#E2C379" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
