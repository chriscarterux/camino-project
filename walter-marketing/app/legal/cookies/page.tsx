import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/camino-logo.svg"
              alt="Camino"
              width={120}
              height={40}
              priority
            />
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </nav>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-serif font-bold mb-4">Cookie Policy</h1>
            <p className="text-sm text-muted-foreground mb-12">Last updated: October 2025</p>

            <h2>1. Overview</h2>
            <p>
              Camino uses cookies and similar technologies to improve site performance and personalize your experience.
            </p>

            <h2>2. Types of Cookies We Use</h2>
            <ul>
              <li><strong>Essential Cookies:</strong> For authentication and core functionality.</li>
              <li><strong>Analytics Cookies:</strong> Anonymous data that helps us understand usage trends.</li>
              <li><strong>Preference Cookies:</strong> Store user settings like theme and language.</li>
            </ul>

            <h2>3. Managing Cookies</h2>
            <p>
              You can disable cookies in your browser at any time, though some features may not function properly.
            </p>

            <h2>4. Contact</h2>
            <p>
              For cookie-related inquiries: <a href="mailto:privacy@camino.app" className="text-[#E2C379] hover:underline">privacy@camino.app</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Camino
          </p>
        </div>
      </footer>
    </div>
  );
}
