"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function StoryPage() {
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
            <Link href="/team" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Team
            </Link>
            <Link href="/essays" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Essays
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href={process.env.NEXT_PUBLIC_LMS_URL || "http://lms.localhost:8000/lms"}>Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/#waitlist">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-20 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Why we're building Camino, and what personal growth should actually look like.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              The Problem We Saw
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p className="leading-relaxed">
                Personal growth shouldn't be this hard. Yet for years, we watched people struggle with the same frustrating pattern: they'd read a book, feel inspired, maybe implement a technique for a week or two, then fall back into old habits. The insights never stuck. The transformation never happened.
              </p>
              <p className="leading-relaxed">
                The industry promised quick fixes and life-changing frameworks, but delivered generic advice that ignored the messy reality of being human. One-size-fits-all solutions don't work when everyone starts from a different place, with different brains, different histories, and different goals.
              </p>
              <p className="leading-relaxed">
                We saw people spending thousands on coaching that lacked structure, or buying apps that gamified growth into meaningless streaks. Neither approach respected the complexity of real transformation. Neither acknowledged that sustainable change requires both human wisdom and personalized context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              How We Got Here
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p className="leading-relaxed">
                This project emerged from three very different paths converging at the same realization: personal growth needs better tools.
              </p>
              <p className="leading-relaxed">
                <strong>Jon</strong> spent years building coaching frameworks that actually worked for neurodivergent minds. As someone with ADHD and autism, he knew firsthand that conventional productivity advice often made things worse. He created systems that worked <em>with</em> different brains, not against them. But he also saw how hard it was to deliver personalized coaching at scale.
              </p>
              <p className="leading-relaxed">
                <strong>Dr. Walter</strong> came from clinical psychology, bridging academic research with therapeutic practice. He watched clients make real breakthroughs in session, only to lose momentum between appointments. The insights were there, but the structure to implement them consistently wasn't. He knew the frameworks worked—they just needed to be accessible outside the therapy room.
              </p>
              <p className="leading-relaxed">
                <strong>Christopher</strong> had spent 17 years building products that solved human problems through technology. He'd seen AI mature from hype to genuinely useful tool—but only when applied thoughtfully. He believed the right technology could make expert coaching accessible to everyone, not just those who could afford $200/hour sessions.
              </p>
              <p className="leading-relaxed">
                When we came together, the vision became clear: combine evidence-based coaching frameworks with AI-powered personalization to create a growth platform that actually works. Not another app trying to maximize engagement. Not generic advice dressed up as wisdom. A real tool for real transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-16 md:py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              What We're Building
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p className="leading-relaxed">
                Camino is a personal growth platform built on three core beliefs:
              </p>
              <ol className="space-y-4 leading-relaxed">
                <li>
                  <strong>Your context matters.</strong> Generic advice fails because it ignores who you are, where you've been, and what you're trying to build. Real growth requires understanding your unique situation, values, neurology, and goals. That's why we start with deep context engineering—teaching the AI about you so it can provide truly personalized guidance.
                </li>
                <li>
                  <strong>Frameworks need structure.</strong> Inspiration fades. Motivation wavers. What sustains transformation is structured frameworks that guide you through the messy middle of change. We provide proven coaching methodologies, not motivational quotes. Real frameworks that have helped thousands of people actually change.
                </li>
                <li>
                  <strong>AI amplifies expertise.</strong> Modern AI can analyze patterns across your reflections, suggest relevant frameworks, and surface insights that would take months to discover on your own. But it can't replace human wisdom, empathy, or coaching expertise. When used right, AI makes expert coaching accessible to everyone while preserving what makes it effective.
                </li>
              </ol>
              <p className="leading-relaxed">
                This isn't about disrupting therapy or replacing coaches. It's about making evidence-based personal growth accessible, effective, and sustainable for everyone who's serious about becoming who they want to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Commitment */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
              Our Commitment to You
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Privacy Always</h3>
                <p className="text-muted-foreground">
                  Your reflections and insights belong to you. We'll never share, sell, or use your data to train external AI systems. Your growth journey is yours alone.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Evidence-Based</h3>
                <p className="text-muted-foreground">
                  Every framework comes from psychological research and real coaching experience. We don't follow trends—we follow what actually works.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Human-First</h3>
                <p className="text-muted-foreground">
                  Technology enhances growth, it doesn't replace human connection. We build tools that amplify coaching expertise, not eliminate it.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">For Everyone</h3>
                <p className="text-muted-foreground">
                  Whether you're neurotypical or neurodivergent, just starting or years into your journey, Camino adapts to you. Personal growth should work for all minds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-t" id="waitlist">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Join Our Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Be part of building a better approach to personal growth. Join the waitlist for early access when we launch in Q1 2026.
            </p>
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-card mt-auto">
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
                Context engineering for personalized AI.
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
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/essays" className="text-muted-foreground hover:text-foreground transition-colors">
                    Essays
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
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Camino
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
