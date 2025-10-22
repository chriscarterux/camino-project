import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function JourneyPage() {
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
              Turn reflection into transformation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              The Camino Journey is your guided path toward awareness, belonging, resilience, and purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="/pricing">
                  Join the Journey ($19.95/mo)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/journal">Try guided reflection free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Journey */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
              A structured reflection curriculum for a meaningful life
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center">
              Journey takes you deeper than daily reflection. It's a four-part learning system combining guided prompts, short lessons, and adaptive AI feedback — helping you build sustainable habits of self-awareness, emotional regulation, and purpose-driven action.
            </p>

            {/* Four Modules */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="border rounded-2xl p-8 bg-card hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E2C379]/20 flex items-center justify-center font-bold text-[#2D2F33]">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Awareness</h3>
                </div>
                <p className="text-muted-foreground">
                  Understand your patterns and how they shape your world.
                </p>
              </div>

              <div className="border rounded-2xl p-8 bg-card hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E2C379]/20 flex items-center justify-center font-bold text-[#2D2F33]">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Belonging</h3>
                </div>
                <p className="text-muted-foreground">
                  Cultivate connection and grounded relationships.
                </p>
              </div>

              <div className="border rounded-2xl p-8 bg-card hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E2C379]/20 flex items-center justify-center font-bold text-[#2D2F33]">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Resilience</h3>
                </div>
                <p className="text-muted-foreground">
                  Build emotional strength and composure under pressure.
                </p>
              </div>

              <div className="border rounded-2xl p-8 bg-card hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E2C379]/20 flex items-center justify-center font-bold text-[#2D2F33]">
                    4
                  </div>
                  <h3 className="text-xl font-bold">Purpose & Performance</h3>
                </div>
                <p className="text-muted-foreground">
                  Align your daily actions with what truly matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">
              How it works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E2C379] mb-3">1</div>
                <p className="text-sm font-medium mb-2">Reflect</p>
                <p className="text-xs text-muted-foreground">
                  Daily prompts designed to uncover insight
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E2C379] mb-3">2</div>
                <p className="text-sm font-medium mb-2">Discover</p>
                <p className="text-xs text-muted-foreground">
                  AI mirrors your themes over time
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E2C379] mb-3">3</div>
                <p className="text-sm font-medium mb-2">Learn</p>
                <p className="text-xs text-muted-foreground">
                  Weekly lessons and practices
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E2C379] mb-3">4</div>
                <p className="text-sm font-medium mb-2">Grow</p>
                <p className="text-xs text-muted-foreground">
                  Track progress and celebrate wins
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              Each module includes...
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Short video lessons by Walter Calvo</h3>
                  <p className="text-sm text-muted-foreground">
                    Practical wisdom delivered in digestible 5-10 minute videos
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Reflective exercises and journaling prompts</h3>
                  <p className="text-sm text-muted-foreground">
                    Structured practice to deepen understanding
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">AI-powered insight summaries</h3>
                  <p className="text-sm text-muted-foreground">
                    See your patterns emerge week by week
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Printable takeaway sheets</h3>
                  <p className="text-sm text-muted-foreground">
                    Reference materials for continued practice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              What you'll gain from your Camino
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Clarity about your emotions and patterns</span>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Stronger emotional resilience</span>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Renewed sense of belonging and connection</span>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Purpose-driven focus in work and life</span>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">A personal growth practice that lasts</span>
              </div>
            </div>
            <div className="mt-12">
              <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="/pricing">Begin the Journey ($19.95/mo)</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">
              Student stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-2xl p-8 bg-card">
                <p className="text-lg italic mb-4">
                  "The Camino Journey helped me understand my triggers and rebuild my confidence."
                </p>
                <p className="text-sm text-muted-foreground">— Journey Member</p>
              </div>
              <div className="border rounded-2xl p-8 bg-card">
                <p className="text-lg italic mb-4">
                  "I've done therapy, coaching, and journaling. Camino ties them all together."
                </p>
                <p className="text-sm text-muted-foreground">— Early Beta Tester</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">How long does each module take?</h3>
              <p className="text-muted-foreground">
                Most users spend 2–3 weeks per module, but you can go at your own pace.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes. You can manage or cancel your subscription anytime from your profile.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Do I need to complete the modules in order?</h3>
              <p className="text-muted-foreground">
                The Journey is designed sequentially, but you can revisit or skip freely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Start your Journey today
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join hundreds of others building lives of awareness and purpose.
            </p>
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/pricing">
                Subscribe now
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
