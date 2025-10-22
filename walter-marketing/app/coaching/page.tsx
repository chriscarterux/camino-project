import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function CoachingPage() {
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
              Guidance for your next evolution
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              Camino Coaching blends human wisdom with intelligent reflection tools to help you grow with clarity, composure, and purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="/booking">
                  Apply for Coaching
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/journey">Explore the Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Camino Coaching Is */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
              A personalized path toward your best self
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center max-w-3xl mx-auto">
              Camino Coaching is a 1:1 program for leaders, creators, and seekers who want structured support in integrating reflection into real change. Each engagement blends guided conversation, personalized exercises, and AI-powered insight summaries between sessions.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              A three-month transformational engagement
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center">
              Every Camino Coaching partnership includes:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Biweekly 60-minute sessions with Walter or a certified Camino Coach</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep, focused conversations that move you forward
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Personalized reflection prompts tied to your life themes</h3>
                  <p className="text-sm text-muted-foreground">
                    Custom prompts based on your patterns and goals
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">AI-generated session summaries and progress tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    See your evolution between sessions
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Custom growth plan with practical milestones</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear steps toward your transformation
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-[#E2C379] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Access to the full Camino Journey curriculum</h3>
                  <p className="text-sm text-muted-foreground">
                    All four modules included
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Visual */}
            <div className="mt-12 grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-sm font-bold text-[#E2C379] mb-2">Week 1</div>
                <p className="text-xs text-muted-foreground">Discovery</p>
              </div>
              <div>
                <div className="text-sm font-bold text-[#E2C379] mb-2">Week 4</div>
                <p className="text-xs text-muted-foreground">Breakthrough</p>
              </div>
              <div>
                <div className="text-sm font-bold text-[#E2C379] mb-2">Week 8</div>
                <p className="text-xs text-muted-foreground">Integration</p>
              </div>
              <div>
                <div className="text-sm font-bold text-[#E2C379] mb-2">Week 12</div>
                <p className="text-xs text-muted-foreground">Alignment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              Coaching is for you if...
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  You're navigating transition — in career, purpose, or identity
                </span>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  You lead others and want to lead from awareness, not reaction
                </span>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  You feel successful but restless, seeking deeper meaning
                </span>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-[#E2C379] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  You're ready for accountability and transformation
                </span>
              </div>
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="/booking">Schedule an Intro Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Framework */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              The Camino Method
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center">
              Camino Coaching uses a three-part framework:
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#E2C379]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#2D2F33]">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Awareness</h3>
                <p className="text-sm text-muted-foreground">
                  Clarify the stories shaping your behavior
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#E2C379]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#2D2F33]">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Belonging</h3>
                <p className="text-sm text-muted-foreground">
                  Strengthen connection and trust in relationships
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#E2C379]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#2D2F33]">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Resilience</h3>
                <p className="text-sm text-muted-foreground">
                  Build calm composure under stress and uncertainty
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-12 italic">
              Each session closes with a reflective practice and a clear next step.
            </p>
          </div>
        </div>
      </section>

      {/* Client Voices */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">
              Client voices
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-2xl p-8 bg-card">
                <p className="text-lg italic mb-4">
                  "Walter helped me reconnect with my purpose. Camino turned insight into action."
                </p>
                <p className="text-sm text-muted-foreground">— Executive Client</p>
              </div>
              <div className="border rounded-2xl p-8 bg-card">
                <p className="text-lg italic mb-4">
                  "This process gave me the courage to slow down and make the right decisions."
                </p>
                <p className="text-sm text-muted-foreground">— Creative Professional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              Your investment in growth
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center">
              Coaching requires a three-month commitment to create lasting results.
            </p>

            <div className="border-2 border-[#E2C379] rounded-2xl p-8 bg-card max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Camino Coaching</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-4xl font-bold">$1,000</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">3-month duration</p>
              </div>
              <p className="text-center text-muted-foreground mb-6">
                <strong className="text-foreground">Includes:</strong> All Journey modules + AI reflection tools + 1:1 guidance
              </p>
              <Button asChild size="lg" className="w-full bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="/booking">Apply Now</Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Limited spots available. Applications reviewed within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">What happens after I apply?</h3>
              <p className="text-muted-foreground">
                You'll receive an email to schedule a 20-minute discovery call with Walter or a certified coach.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Do you offer shorter sessions or single consultations?</h3>
              <p className="text-muted-foreground">
                Not at this time. Camino focuses on deeper, sustained transformation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Can companies enroll teams?</h3>
              <p className="text-muted-foreground">
                Yes — see Camino for Teams (coming soon in Enterprise offerings).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Take your Camino further
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Transformation begins when reflection meets action. Apply today to begin your next chapter.
            </p>
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/booking">
                Apply for Coaching
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
