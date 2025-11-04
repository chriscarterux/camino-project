"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, Download, ArrowRight, Brain, Heart, Users, Target, Sparkles } from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const phases = [
  {
    number: 1,
    name: "Foundation",
    duration: "7 days",
    description: "Establish baseline self-awareness through daily reflection",
    icon: Brain,
    color: "#E2C379",
    details: [
      "Daily guided reflection prompts",
      "Pattern recognition basics",
      "Life model snapshot creation",
      "Foundation for deeper work",
    ],
    example: "Discover recurring themes in your thoughts and behaviors through consistent journaling practice.",
  },
  {
    number: 2,
    name: "Psychometrics",
    duration: "3-5 days",
    description: "Build psychological context through validated assessments",
    icon: Target,
    color: "#E2C379",
    details: [
      "10+ validated psychometric tests",
      "Personality type mapping",
      "Attachment style analysis",
      "Strengths assessment",
    ],
    example: "Understand how your anxious attachment style shapes your relationship patterns and communication needs.",
  },
  {
    number: 3,
    name: "Personal History",
    duration: "7-10 days",
    description: "Map formative experiences that shaped your worldview",
    icon: Heart,
    color: "#E2C379",
    details: [
      "Timeline of key life events",
      "Family system analysis",
      "Narrative pattern identification",
      "Core belief exploration",
    ],
    example: "Connect childhood experiences of high achievement pressure to adult perfectionism and burnout patterns.",
  },
  {
    number: 4,
    name: "Context Engineering",
    duration: "5-7 days",
    description: "Structure insights into AI-readable context framework",
    icon: Sparkles,
    color: "#E2C379",
    details: [
      "Life Model architecture design",
      "Context hierarchy creation",
      "Integration mapping",
      "Coherence checking",
    ],
    example: "Transform scattered insights into structured context: 'ADHD + anxious attachment + childhood trauma = specific prompting needs'.",
  },
  {
    number: 5,
    name: "AI Integration",
    duration: "3-5 days",
    description: "Test and refine your Life Model with AI systems",
    icon: Users,
    color: "#E2C379",
    details: [
      "Life Model API integration",
      "Real-world testing scenarios",
      "Refinement based on results",
      "Download complete model",
    ],
    example: "Test Life Model AI responses vs generic AI - see how context transforms advice quality and relevance.",
  },
];

const principles = [
  {
    title: "Context is King",
    description: "Generic AI advice fails because it lacks your unique context. Your Life Model provides the missing psychological framework.",
  },
  {
    title: "Integration Over Isolation",
    description: "Your personality, history, and patterns don't exist in silos. The framework shows how everything connects.",
  },
  {
    title: "Actionable Self-Knowledge",
    description: "Self-awareness without application is just interesting. Life Models turn insight into better AI interactions.",
  },
  {
    title: "Validated Foundations",
    description: "Built on established psychological frameworks, not pop psychology. Real science, real results.",
  },
  {
    title: "Portable Intelligence",
    description: "Your Life Model works across any AI system. One framework, infinite applications.",
  },
  {
    title: "Privacy First",
    description: "You own your Life Model completely. Download it, delete it, use it however you want.",
  },
  {
    title: "Continuous Refinement",
    description: "Life Models evolve as you do. Update your context as you grow and change.",
  },
];

export default function LifeModelFrameworkPage() {
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
            <Link href="/life-model-framework" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Framework
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

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            The Life Model Framework
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Context Engineering for Personalized AI
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Transform generic AI into a personalized intelligence system through a structured framework that captures your psychology, history, and patterns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="#waitlist">Build Your Life Model</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#framework-pdf">
                <Download className="h-4 w-4 mr-2" />
                Download Framework PDF
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is a Life Model */}
      <section className="py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
              What is a Life Model?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A <strong>Life Model</strong> is your digital psychological twin—a structured framework that captures the essential context AI needs to provide truly personalized guidance.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Think of it as the difference between asking a stranger for advice versus asking someone who deeply knows you, your history, your patterns, and your goals. Generic AI is the stranger. Life Model AI is the friend who actually gets you.
            </p>
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3">Why Generic AI Fails</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>No understanding of your personality type or attachment style</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Ignorant of formative experiences that shaped your worldview</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Unaware of recurring patterns and triggers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Cannot account for neurodivergence (ADHD, autism, etc.)</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#E2C379]/10 border border-[#E2C379]/30 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-[#E2C379]">How Life Model AI Succeeds</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 shrink-0 mt-0.5 text-[#E2C379]" />
                  <span>Knows your MBTI, Enneagram, attachment style, and how they interact</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 shrink-0 mt-0.5 text-[#E2C379]" />
                  <span>Understands key life events and how they shaped you</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 shrink-0 mt-0.5 text-[#E2C379]" />
                  <span>Recognizes your patterns, triggers, and coping mechanisms</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 shrink-0 mt-0.5 text-[#E2C379]" />
                  <span>Adapts communication style to your neurodivergence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Phases */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              The 5 Phases of Life Model Building
            </h2>
            <div className="space-y-12">
              {phases.map((phase) => {
                const Icon = phase.icon;
                return (
                  <div
                    key={phase.number}
                    className="border rounded-2xl p-8 bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-6">
                      <div
                        className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${phase.color}20`, border: `2px solid ${phase.color}` }}
                      >
                        <Icon className="h-8 w-8" style={{ color: phase.color }} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-baseline gap-3 mb-2">
                          <h3 className="text-2xl font-bold">
                            Phase {phase.number}: {phase.name}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {phase.description}
                        </p>
                        <ul className="grid md:grid-cols-2 gap-3 mb-4">
                          {phase.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="h-5 w-5 shrink-0 mt-0.5 text-[#E2C379]" />
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm">
                            <strong className="text-foreground">Example:</strong>{" "}
                            <span className="text-muted-foreground">{phase.example}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              Core Principles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, idx) => (
                <div key={idx} className="bg-card border rounded-lg p-6">
                  <h3 className="font-semibold mb-2 text-lg">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download PDF CTA */}
      <section id="framework-pdf" className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Download the Complete Framework
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the full Life Model Framework PDF with detailed methodology, examples, and implementation guide.
            </p>
            <Button size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Download className="h-5 w-5 mr-2" />
              Download PDF (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-center">
              Ready to Build Yours?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 text-center">
              Join the waitlist to be first to access the Life Model Framework when we launch in Q1 2026.
            </p>

            <LeadCaptureForm
              source="life-model-framework"
              variant="card"
              showInterest={true}
            />
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
                <li>
                  <Link href="/life-model-framework" className="text-muted-foreground hover:text-foreground transition-colors">
                    Framework
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
