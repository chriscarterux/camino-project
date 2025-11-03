import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle } from "lucide-react";

export default function HowItWorksPage() {
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
              See how guided reflection transforms your day
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              Camino blends human wisdom with adaptive AI to help you reflect, discover patterns, and grow with clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="/journal">
                  Start your Camino
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/journal">Try a free reflection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Step Flow */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Circle className="h-3 w-3 fill-[#E2C379] text-[#E2C379]" />
                <span className="text-sm font-medium">Reflect</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <Circle className="h-3 w-3 fill-[#E2C379] text-[#E2C379]" />
                <span className="text-sm font-medium">Discover</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <Circle className="h-3 w-3 fill-[#E2C379] text-[#E2C379]" />
                <span className="text-sm font-medium">Grow</span>
              </div>
            </div>
          </div>

          {/* Section 1: The Daily Flow — Reflect */}
          <div className="max-w-6xl mx-auto mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-muted/30 border rounded-2xl p-8 h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Editor UI preview</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  A daily moment to pause and listen to yourself
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Each morning, Camino offers a guided prompt designed to draw your attention inward. The prompts are crafted from psychology, philosophy, and coaching practice—built to reveal what matters most right now.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  You write freely. Camino listens and helps you connect the dots.
                </p>
                <Button asChild className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                  <Link href="/journal">Try a reflection</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2: Discover Patterns — Insights */}
          <div className="max-w-6xl mx-auto mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Your words reveal your patterns
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Camino's AI reads between the lines of your reflections, gently surfacing themes like belonging, self-doubt, resilience, and purpose.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  You'll start noticing connections that were always there—but never this clear.
                </p>
                <Button asChild variant="outline">
                  <Link href="/pricing">Explore insights</Link>
                </Button>
              </div>
              <div>
                <div className="bg-muted/30 border rounded-2xl p-8 h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Insight dashboard preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Grow With Guidance — Journey */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-muted/30 border rounded-2xl p-8 h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">LMS module cards preview</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Structured learning for lasting growth
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The Camino Journey is a guided curriculum that turns awareness into action. Through weekly lessons, reflection exercises, and short videos, you'll develop habits of emotional clarity, focus, and resilience.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Each step builds toward what we call <em className="font-semibold not-italic">a life well lived</em>.
                </p>
                <Button asChild className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                  <Link href="/journey">Join the Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Rhythm */}
      <section className="py-20 md:py-28 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              A sustainable rhythm
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Camino is designed to fit into your life, not disrupt it.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E2C379] mb-2">2-4 min</div>
                <p className="text-sm text-muted-foreground">Daily reflection time</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E2C379] mb-2">Weekly</div>
                <p className="text-sm text-muted-foreground">AI-powered summaries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E2C379] mb-2">Streaks</div>
                <p className="text-sm text-muted-foreground">Build consistency over time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Assurance */}
      <section className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Your words are yours
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Encrypted, exportable, and never sold. Your reflections remain private and under your control.
            </p>
            <Link href="/legal/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline">
              Read our privacy policy →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Start your Camino today
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Begin with a free reflection. See how awareness changes everything.
            </p>
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/journal">
                Start free
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
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/camino-logo.svg"
                  alt="Camino"
                  width={100}
                  height={32}
                />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guided reflection for a meaningful life.
              </p>
            </div>

            {/* Product */}
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

            {/* Company */}
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

            {/* Legal */}
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

          {/* Bottom Bar */}
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
