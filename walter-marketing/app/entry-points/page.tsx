"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Target, Compass, Heart, Sparkles } from "lucide-react";

// Entry point coaching paths
const entryPoints = [
  {
    id: "clarity",
    title: "Find Clarity",
    icon: Compass,
    description: "Feeling lost or uncertain about your direction? Start with our structured frameworks to understand yourself better and discover what truly matters to you.",
    benefits: [
      "Self-discovery exercises",
      "Values and priorities mapping",
      "Life model assessment",
      "Personalized insights"
    ],
    cta: "Start with Clarity",
    color: "text-blue-600"
  },
  {
    id: "goals",
    title: "Set Meaningful Goals",
    icon: Target,
    description: "Know what you want but struggling to make progress? Our AI-powered coaching helps you set realistic, personalized goals and stay accountable.",
    benefits: [
      "Goal-setting frameworks",
      "Progress tracking",
      "AI accountability partner",
      "Adaptive strategies"
    ],
    cta: "Define Your Goals",
    color: "text-green-600"
  },
  {
    id: "relationships",
    title: "Improve Relationships",
    icon: Heart,
    description: "Looking to strengthen connections or navigate relationship challenges? Get expert guidance rooted in clinical psychology and neurodivergent-friendly approaches.",
    benefits: [
      "Communication frameworks",
      "Conflict resolution tools",
      "Relationship dynamics insights",
      "Evidence-based strategies"
    ],
    cta: "Build Better Connections",
    color: "text-pink-600"
  },
  {
    id: "neurodivergent",
    title: "Neurodivergent Support",
    icon: Sparkles,
    description: "ADHD, autism, or other neurodivergent traits? Our frameworks are designed to work with your brain, not against it. Get support that actually fits how you think.",
    benefits: [
      "ADHD-friendly strategies",
      "Autism-aware approaches",
      "Executive function support",
      "Sensory-conscious methods"
    ],
    cta: "Get Tailored Support",
    color: "text-purple-600"
  }
];

export default function EntryPointsPage() {
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
              Start Your Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Everyone's path to growth is different. Choose the entry point that resonates with where you are right now.
            </p>
            <p className="text-lg text-muted-foreground">
              No matter which path you choose, you'll get personalized, AI-powered coaching rooted in clinical psychology and neurodivergent-friendly frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Entry Points Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {entryPoints.map((entry) => {
                const Icon = entry.icon;
                return (
                  <div
                    key={entry.id}
                    className="bg-card border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-7 w-7 ${entry.color}`} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{entry.title}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                        What You'll Get
                      </h3>
                      <ul className="space-y-2">
                        {entry.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full ${entry.color.replace('text-', 'bg-')}`} />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      asChild
                      className="w-full"
                      variant="outline"
                    >
                      <Link href="/#waitlist">{entry.cta}</Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              That's completely normal. Our onboarding process will help you discover the best starting point based on your unique situation, goals, and preferences.
            </p>
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/#waitlist">Join Waitlist</Link>
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
