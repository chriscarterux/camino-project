"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Shield, Sparkles, Users, Lock, Target, Lightbulb } from "lucide-react";

export default function ApproachPage() {
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
              Our Approach
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              We believe personal growth requires both human wisdom and technological innovation.
            </p>
            <p className="text-lg text-muted-foreground">
              Camino combines evidence-based coaching frameworks with AI-powered insights to create a personalized growth experience that actually works.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-center">
              Three Core Principles
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Our approach is built on three foundational beliefs about personal growth and technology.
            </p>

            <div className="space-y-12">
              {/* Principle 1: Human-First */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#E2C379]/10 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-[#E2C379]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Human-First, Always</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Technology should enhance human connection and growth, never replace it. Every feature we build starts with understanding real human needs, challenges, and aspirations. AI is a powerful tool, but the insights, empathy, and wisdom of experienced coaches remain irreplaceable.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform uses AI to amplify coaching effectiveness, not substitute the human element that makes personal growth meaningful.
                  </p>
                </div>
              </div>

              {/* Principle 2: AI-Powered Insights */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#E2C379]/10 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-[#E2C379]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">AI-Powered Insights</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Modern AI enables personalization at a scale that was previously impossible. By analyzing your reflections, psychometric data, and context, our AI can identify patterns, suggest relevant frameworks, and surface insights that would take months to discover on your own.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The key is context engineering: teaching the AI about you, your values, your history, and your goals so it can provide genuinely personalized guidance rather than generic advice.
                  </p>
                </div>
              </div>

              {/* Principle 3: Mission-Driven */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#E2C379]/10 flex items-center justify-center">
                    <Target className="h-8 w-8 text-[#E2C379]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Mission-Driven Development</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    We're not building features for the sake of growth metrics or engagement hooks. Every decision is guided by our mission: making evidence-based personal growth accessible, effective, and sustainable for everyone.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This means saying no to addictive design patterns, respecting user privacy, and building tools that empower rather than exploit. Your growth is the goal, not your engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works in Practice */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-center">
              How It Works in Practice
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Our principles translate into specific practices and features.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#E2C379]/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Coaching Frameworks</h3>
                <p className="text-muted-foreground">
                  All our frameworks are designed by PhD psychologists and experienced coaches with years of real-world practice. We don't rely on pop psychology or untested theories.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#E2C379]/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Context-Aware AI</h3>
                <p className="text-muted-foreground">
                  Our AI learns about your unique situation, values, and goals through structured reflection and psychometric assessment. This creates truly personalized guidance.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#E2C379]/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Privacy by Design</h3>
                <p className="text-muted-foreground">
                  Your reflections and insights belong to you. We never share, sell, or use your data to train external AI systems. End-to-end encryption protects your privacy.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#E2C379]/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Neurodiversity Support</h3>
                <p className="text-muted-foreground">
                  Our frameworks are designed for different minds, not just neurotypical ones. ADHD, autism, and other neurodivergent experiences inform our design decisions.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#E2C379]/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Continuous Improvement</h3>
                <p className="text-muted-foreground">
                  We iterate based on real user feedback and coaching outcomes. Our frameworks evolve as we learn what actually helps people grow.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#E2C379]/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sustainable Growth</h3>
                <p className="text-muted-foreground">
                  We optimize for long-term transformation, not short-term dopamine hits. Our tools encourage reflection, not endless scrolling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 md:py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
              Why This Matters
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="leading-relaxed mb-4">
                The personal growth industry is filled with generic advice, questionable frameworks, and platforms designed to maximize engagement rather than actual growth. Many apps treat users as data points to optimize, not humans with unique needs and aspirations.
              </p>
              <p className="leading-relaxed mb-4">
                We believe you deserve better. Personal growth is deeply personal—it requires understanding your unique history, values, neurology, and goals. Cookie-cutter solutions don't work because no two people are starting from the same place or heading in the same direction.
              </p>
              <p className="leading-relaxed">
                By combining expert coaching frameworks with AI-powered personalization while maintaining unwavering respect for your privacy and autonomy, we're building the personal growth platform we wish existed—one that actually helps you become who you want to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-t bg-muted/30" id="waitlist">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Experience the Difference
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the waitlist to be first to access Camino when we launch in Q1 2026.
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
