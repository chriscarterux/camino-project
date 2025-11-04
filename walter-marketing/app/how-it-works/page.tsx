"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Heart, Compass, Sparkles, Check, Clock } from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const phases = [
  {
    id: "phase-1",
    number: 1,
    name: "Foundation",
    subtitle: "Identity Anchoring",
    duration: "20-30 min",
    description: "Establish baseline self-awareness through daily reflection and identify your starting point.",
    details: [
      "7 days of guided reflection prompts",
      "Pattern recognition basics",
      "Life model snapshot creation",
      "Foundation for deeper work",
    ],
    example: "Discover recurring themes in your thoughts and behaviors through consistent journaling practice.",
  },
  {
    id: "phase-2",
    number: 2,
    name: "Psychometrics",
    subtitle: "Scientific Frameworks",
    duration: "60-90 min",
    description: "Complete validated assessments to map your psychological architecture.",
    details: [
      "10+ validated psychometric assessments",
      "MBTI personality framework",
      "Enneagram type and wings",
      "Attachment style mapping",
      "Big 5 personality traits",
      "Strengths and values identification",
    ],
    example: "Learn you're an INTJ with anxious attachment and high conscientiousness—context that transforms how AI understands you.",
  },
  {
    id: "phase-3",
    number: 3,
    name: "History",
    subtitle: "Lived Experience",
    duration: "45-60 min",
    description: "Map formative experiences and core narratives that shape your worldview.",
    details: [
      "Childhood and formative experiences",
      "Core beliefs and narratives",
      "Relationship patterns over time",
      "Significant life transitions",
      "Triggers and coping mechanisms",
    ],
    example: "Connect your childhood experience of busy parents to your current pattern of anxious attachment in relationships.",
  },
  {
    id: "phase-4",
    number: 4,
    name: "Integration",
    subtitle: "Pattern Recognition",
    duration: "30-45 min",
    description: "AI synthesizes all previous phases into your comprehensive Life Model.",
    details: [
      "Cross-dimensional pattern analysis",
      "Identity-worldview-relationships mapping",
      "Strength and trigger identification",
      "Core narrative synthesis",
      "Personalized context architecture",
    ],
    example: "See how your INTJ traits + ADHD + anxious attachment create a unique pattern of deep work preference but collaboration anxiety.",
  },
  {
    id: "phase-5",
    number: 5,
    name: "Application",
    subtitle: "Making It Useful",
    duration: "45-60 min",
    description: "Activate your Life Model for personalized AI guidance across all life decisions.",
    details: [
      "Life Model context injection",
      "Personalized AI conversations",
      "Decision-making frameworks",
      "Pattern-aware guidance",
      "Continuous learning and updates",
    ],
    example: "Ask about career changes and get advice tailored to YOUR psychological wiring, not generic tips for everyone.",
  },
];

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
            <Link href="/before-after" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Examples
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
              <Link href="#waitlist">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2C379]/30 bg-[#E2C379]/10 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-[#E2C379]" />
              <span className="text-sm font-medium">Coming Q1 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              How the Life Model Framework Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              A structured 5-phase methodology that transforms generic AI into deeply personalized intelligence through context engineering
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="#waitlist">Join Waitlist</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/before-after">See Examples</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Phases Accordion */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                The 5 Phases of Your Life Model
              </h2>
              <p className="text-lg text-muted-foreground">
                Start light (Phases 1-2) or go deep (all 5 phases)
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {phases.map((phase) => (
                <AccordionItem
                  key={phase.id}
                  value={phase.id}
                  className="border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E2C379]/20 flex-shrink-0">
                        <span className="text-xl font-bold text-[#E2C379]">{phase.number}</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold">{phase.name}</h3>
                        <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {phase.duration}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-6">
                    <p className="text-muted-foreground mb-4">{phase.description}</p>
                    <ul className="space-y-2 mb-4">
                      {phase.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-[#E2C379]/10 border border-[#E2C379]/30 rounded-lg p-4">
                      <p className="text-sm font-medium mb-1">Example:</p>
                      <p className="text-sm text-muted-foreground italic">{phase.example}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Radiant Integration Theory (RIT) */}
      <section className="py-20 md:py-28 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Radiant Integration Theory (RIT)
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The psychological framework that powers personalized AI guidance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card border rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E2C379]/20 mb-4">
                  <Brain className="h-8 w-8 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Identity</h3>
                <p className="text-sm text-muted-foreground">
                  How you see yourself—personality, strengths, triggers, and core beliefs
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E2C379]/20 mb-4">
                  <Compass className="h-8 w-8 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Worldview</h3>
                <p className="text-sm text-muted-foreground">
                  How you see the world—values, assumptions, and meaning-making frameworks
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E2C379]/20 mb-4">
                  <Heart className="h-8 w-8 text-[#E2C379]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Relationships</h3>
                <p className="text-sm text-muted-foreground">
                  How you connect with others—attachment styles, patterns, and relational needs
                </p>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-8">
              <h3 className="text-lg font-bold mb-4">The Core Insight</h3>
              <p className="text-muted-foreground mb-4">
                These three dimensions aren't separate—they're <strong>radically integrated</strong>. Your identity shapes your worldview. Your worldview influences your relationships. Your relationships reinforce your identity.
              </p>
              <p className="text-muted-foreground">
                RIT maps these cross-dimensional patterns to give AI the psychological context it needs to provide truly personalized guidance. It's not about filling out a form—it's about understanding the complete system that is <em>you</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Human-AI Co-Creation */}
      <section className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Human-AI Co-Creation
              </h2>
              <p className="text-lg text-muted-foreground">
                This isn't a form you fill out once—it's an ongoing partnership
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E2C379]/20">
                    <span className="text-lg font-bold text-[#E2C379]">1</span>
                  </div>
                  <h3 className="text-lg font-bold">You Provide Context</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Through reflection, assessments, and lived experience, you build your Life Model
                </p>
              </div>

              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E2C379]/20">
                    <span className="text-lg font-bold text-[#E2C379]">2</span>
                  </div>
                  <h3 className="text-lg font-bold">AI Recognizes Patterns</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Machine learning identifies cross-dimensional patterns you might not see yourself
                </p>
              </div>

              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E2C379]/20">
                    <span className="text-lg font-bold text-[#E2C379]">3</span>
                  </div>
                  <h3 className="text-lg font-bold">You Confirm or Refine</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Review AI insights, accept what resonates, refine what doesn't—you're the expert
                </p>
              </div>

              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E2C379]/20">
                    <span className="text-lg font-bold text-[#E2C379]">4</span>
                  </div>
                  <h3 className="text-lg font-bold">Model Evolves</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your Life Model updates as you grow, ensuring AI guidance stays relevant
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-6">
                The result? AI that knows you're an INTJ with ADHD and anxious attachment—not because you told it once, but because it's woven into every interaction.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/before-after">See It in Action</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Time Investment Summary */}
      <section className="py-20 md:py-28 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Total Time Investment
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose your depth based on your goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-xl p-8 bg-card">
                <h3 className="text-2xl font-bold mb-2">Start Light</h3>
                <div className="text-4xl font-bold text-[#E2C379] mb-4">~2 hours</div>
                <p className="text-muted-foreground mb-4">
                  Phases 1-2: Foundation + Psychometrics
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Basic personality framework</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Enough context for useful AI guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Perfect for testing the framework</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-[#E2C379] rounded-xl p-8 bg-card relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E2C379] text-[#2D2F33] px-3 py-1 rounded-full text-xs font-medium">
                  Recommended
                </div>
                <h3 className="text-2xl font-bold mb-2">Go Deep</h3>
                <div className="text-4xl font-bold text-[#E2C379] mb-4">~4 hours</div>
                <p className="text-muted-foreground mb-4">
                  All 5 Phases: Complete Life Model
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Full psychological context architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Cross-dimensional pattern recognition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Deeply personalized AI guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2C379]/30 bg-[#E2C379]/10 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium">Coming Q1 2026</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                Build Your Life Model
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-2 leading-relaxed">
                Join the waitlist and be among the first to transform generic AI into deeply personalized intelligence.
              </p>
            </div>

            <LeadCaptureForm
              source="how-it-works"
              variant="card"
              showInterest={true}
            />
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
                Context engineering for personalized AI.
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
                  <Link href="/before-after" className="text-muted-foreground hover:text-foreground transition-colors">
                    Examples
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
                  <Link href="/essays" className="text-muted-foreground hover:text-foreground transition-colors">
                    Essays
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
