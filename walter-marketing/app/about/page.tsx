import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
            Camino
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/how-it-works" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              How it works
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Pricing
            </Link>
            <Link href="/coaching" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Coaching
            </Link>
            <Link href="/essays" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Essays
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/journal">Start your Camino</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              About Camino
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We build calm technology that helps humans see themselves more clearly.
            </p>
          </div>
        </div>
      </section>

      {/* Why Camino */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Why Camino exists
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                We live in an era of unprecedented access to wisdom — yet most of us struggle to translate insight into lasting change. Self-help books pile up. Therapy sessions end without follow-through. Good intentions fade under the weight of daily demands.
              </p>
              <p className="mb-6">
                Camino was born from a simple question: <em className="text-foreground font-semibold">What if reflection could become a practice—not just a moment?</em>
              </p>
              <p>
                We created Camino to bridge the gap between awareness and action. A system that helps you see your patterns, understand your emotions, and grow with intention — all through the simple act of daily reflection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Bios */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              Meet the team
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Walter Calvo */}
              <div>
                <div className="mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#E2C379]/20 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-[#2D2F33]">W</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Walter Calvo</h3>
                  <p className="text-sm text-muted-foreground mb-4">Founder & Guide</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Walter is a coach, philosopher, and technologist who has spent the last decade helping leaders and creatives find clarity amid chaos. He believes that self-awareness is the foundation of meaningful work and life—and that technology should support, not replace, human wisdom.
                </p>
              </div>

              {/* Chris Carter */}
              <div>
                <div className="mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#E2C379]/20 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-[#2D2F33]">C</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Chris Carter</h3>
                  <p className="text-sm text-muted-foreground mb-4">Design & Product</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Chris is a designer and creative strategist who shapes Camino's product and brand experience. With 15+ years building emotionally resonant digital experiences, Chris believes that great design should feel invisible—serving human needs without distraction or noise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Excerpt */}
      <section className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-8 md:p-12">
              <p className="text-xl md:text-2xl font-serif italic mb-6 text-[#2D2F33]">
                "We measure success by quiet moments, not clicks."
              </p>
              <p className="text-muted-foreground mb-6">
                Camino will never chase addiction loops or endless notifications. We build technology that supports reflection — not distraction. Our aim is clarity, not capture.
              </p>
              <Link href="/manifesto" className="text-sm font-medium text-[#2D2F33] hover:underline">
                Read the full Manifesto →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Walk your own Camino
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Start your practice of guided reflection today.
            </p>
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/journal">
                Start reflecting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-serif font-bold tracking-tight inline-block mb-4">
                Camino
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guided reflection for a meaningful life.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/coaching" className="text-muted-foreground hover:text-foreground transition-colors">
                    Coaching
                  </Link>
                </li>
                <li>
                  <Link href="/journey" className="text-muted-foreground hover:text-foreground transition-colors">
                    Journey
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/manifesto" className="text-muted-foreground hover:text-foreground transition-colors">
                    Manifesto
                  </Link>
                </li>
                <li>
                  <Link href="/essays" className="text-muted-foreground hover:text-foreground transition-colors">
                    Essays
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Camino
            </p>
            <div className="flex gap-6">
              <a
                href="https://twitter.com/camino"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/camino"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
