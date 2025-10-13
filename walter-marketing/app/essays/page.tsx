"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EssaysPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/emails/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Subscribe error:', error);
      alert('There was an error subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const featuredEssays = [
    {
      title: "The Art of the Pause",
      excerpt: "Why reflection is the missing link in performance",
      author: "Walter Calvo",
      readTime: "5 min read",
      slug: "the-art-of-the-pause",
    },
    {
      title: "Belonging in a Disconnected World",
      excerpt: "How self-awareness rebuilds human connection",
      author: "Walter Calvo",
      readTime: "6 min read",
      slug: "belonging-in-a-disconnected-world",
    },
    {
      title: "Resilience Isn't Toughness",
      excerpt: "The science of staying open under pressure",
      author: "Chris Carter",
      readTime: "4 min read",
      slug: "resilience-isnt-toughness",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
            Camino
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

      {/* Hero */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Reflections for the modern mind
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Essays on awareness, belonging, and resilience — written to help you live and lead with clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Essays */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12">
              Featured reflections
            </h2>

            <div className="space-y-8">
              {featuredEssays.map((essay) => (
                <Link
                  key={essay.slug}
                  href={`/essays/${essay.slug}`}
                  className="block border rounded-2xl p-8 bg-card hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#E2C379] transition-colors">
                        {essay.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {essay.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{essay.author}</span>
                        <span>•</span>
                        <span>{essay.readTime}</span>
                      </div>
                    </div>
                    <div className="text-[#E2C379] group-hover:translate-x-2 transition-transform">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Never stop reflecting
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the Camino community and receive new essays and reflection prompts directly to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Subscribed! Check your email for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              No noise, just clarity — delivered weekly
            </p>
          </div>
        </div>
      </section>

      {/* Author Block */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">
              About the authors
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#E2C379]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#2D2F33]">W</span>
                </div>
                <h3 className="font-bold mb-2">Walter Calvo</h3>
                <p className="text-sm text-muted-foreground">
                  Founder, coach, and creator of Camino. Walter writes about self-awareness, leadership, and the intersection of psychology and human design.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#E2C379]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#2D2F33]">C</span>
                </div>
                <h3 className="font-bold mb-2">Chris Carter</h3>
                <p className="text-sm text-muted-foreground">
                  Designer and creative strategist shaping Camino's product and brand experience.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-serif font-bold tracking-tight inline-block mb-4">
                Camino
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
