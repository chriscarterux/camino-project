"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "Reflect",
    price: "Free",
    description: "Free guided journaling + basic insights",
    features: [
      "Daily reflection prompts",
      "Basic AI insights",
      "Weekly summaries",
      "Exportable reflections",
    ],
    cta: "Start Free",
    href: "/journal",
    highlighted: false,
  },
  {
    name: "Journey",
    price: "$19.95",
    period: "/month",
    description: "Full reflection curriculum + adaptive plan + exports",
    features: [
      "Everything in Reflect",
      "AI pattern detection",
      "Structured learning paths",
      "4 core modules (Awareness, Belonging, Resilience, Purpose)",
      "Adaptive lesson recommendations",
      "Advanced exports (.txt/.json)",
      "Priority support",
    ],
    cta: "Start Journey",
    href: "/api/checkout?tier=journey",
    highlighted: true,
  },
  {
    name: "Coach",
    price: "$1,000",
    period: "/month",
    description: "1:1 coaching (3-month minimum)",
    note: "3-month minimum commitment",
    features: [
      "Everything in Journey",
      "Biweekly 60-minute sessions",
      "Personalized reflection prompts",
      "AI-generated session summaries",
      "Custom growth plan with milestones",
      "Access to full Journey curriculum",
    ],
    cta: "Apply for Coaching",
    href: "/coaching",
    highlighted: false,
  },
];

export default function PricingPage() {
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
              <Link href={process.env.NEXT_PUBLIC_LMS_URL || "http://lms.localhost:8000/lms"}>Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/journal">Start your Camino</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Simple plans for every path
          </h1>
          <p className="text-xl text-muted-foreground">
            Start reflecting for free, or unlock deeper guidance through structured journeys and personalized coaching.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`border rounded-2xl p-8 flex flex-col bg-card relative ${
                tier.highlighted
                  ? "border-2 border-[#E2C379] shadow-lg"
                  : "hover:shadow-md transition-shadow"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E2C379] text-[#2D2F33] px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-muted-foreground ml-1 text-sm">
                    {tier.period}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {tier.description}
              </p>
              {tier.note && (
                <p className="text-xs text-muted-foreground mb-6">
                  {tier.note}
                </p>
              )}
              <Button
                asChild
                className={`mb-8 ${tier.highlighted ? "bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]" : ""}`}
                variant={tier.highlighted ? "default" : "outline"}
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
              <ul className="space-y-3 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 mt-0.5 text-[#E2C379]" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold mb-8">
              Secure & Trusted
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#E2C379]" />
                <span>Stripe secure payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#E2C379]" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#E2C379]" />
                <span>Encrypted data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes! Upgrade or downgrade anytime. Changes take effect at your next billing cycle.",
              },
              {
                q: "What's included in the Journey program?",
                a: "Four core modules: Awareness, Belonging, Resilience, and Purpose. Each includes video lessons, reflection exercises, and adaptive AI guidance. Most users complete modules in 2-3 weeks each.",
              },
              {
                q: "How does the AI work?",
                a: "AI analyzes your reflections to detect themes and patterns, then mirrors them back with personalized insights. All processing is private and encrypted.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Reflect and Journey tiers can be cancelled anytime. Coach tier requires a 3-month minimum commitment, then becomes month-to-month.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-card mt-auto">
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
