"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "Foundation",
    price: "Free",
    description: "Start your reflection journey",
    features: [
      "Core reflection tools",
      "Basic AI journaling (10/month)",
      "Life Lens dashboard",
      "Insight capture (up to 20)",
      "Community access",
    ],
    cta: "Start Free",
    href: "/app/dashboard",
    highlighted: false,
  },
  {
    name: "Transformation",
    price: "$19.95",
    period: "/month",
    description: "For committed self-development",
    features: [
      "Everything in Foundation",
      "Unlimited AI reflections & insights",
      "Full Learning Path Generator",
      "8-week guided programs",
      "Weekly AI-powered summaries",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Transformation",
    href: "/api/checkout?tier=transformation",
    highlighted: true,
  },
  {
    name: "Mastery",
    price: "$1,000",
    period: "/month",
    description: "Human-AI hybrid coaching",
    note: "3-month minimum commitment",
    features: [
      "Everything in Transformation",
      "Dedicated 1:1 human coach",
      "2x monthly coaching sessions",
      "Life architecture workshops",
      "Custom curriculum design",
      "Direct messaging with coach",
      "AI maintains context between sessions",
    ],
    cta: "Book Consultation",
    href: "/booking",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold">
            Walter
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/#features" className="text-sm hover:underline">
              Features
            </Link>
            <Link href="/pricing" className="text-sm hover:underline">
              Pricing
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/app/dashboard">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Choose Your Path
          </h1>
          <p className="text-xl text-muted-foreground">
            Start free. Upgrade when you're ready for transformation.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`border rounded-lg p-8 flex flex-col ${
                tier.highlighted
                  ? "ring-2 ring-primary shadow-lg scale-105"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <div className="text-xs font-bold text-primary mb-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-muted-foreground ml-1">
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
                className={`mb-8 ${tier.highlighted ? "" : "variant-outline"}`}
                variant={tier.highlighted ? "default" : "outline"}
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
              <ul className="space-y-3 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t py-16 bg-muted/30">
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
                q: "What's included in the 8-week program?",
                a: "Structured modules covering values discovery, reflection practices, pattern recognition, habit design, and integration. Includes quizzes, assignments, and a completion certificate.",
              },
              {
                q: "How does the AI coaching work?",
                a: "AI analyzes your journal entries to detect themes and patterns, then mirrors them back with questions and practices. For Mastery tier, AI maintains context between human coaching sessions.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Foundation and Transformation tiers can be cancelled anytime. Mastery tier requires a 3-month commitment, then month-to-month.",
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
      <footer className="border-t py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Walter. Built with intention for those who seek clarity.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:underline"
              >
                Terms
              </Link>
              <Link
                href="mailto:hello@walter.app"
                className="text-sm text-muted-foreground hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
