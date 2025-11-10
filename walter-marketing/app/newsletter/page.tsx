"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";
import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail("");
  };

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
            <div className="w-16 h-16 rounded-2xl bg-[#E2C379]/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-[#E2C379]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              The Camino Newsletter
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Weekly insights on personal growth, AI-powered coaching, and evidence-based frameworks.
            </p>
            <p className="text-lg text-muted-foreground">
              No spam, no sales pitches. Just valuable content to support your growth journey.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Form */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                  />
                  {error && (
                    <p id="email-error" className="text-sm text-red-500 mt-2">
                      {error}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By subscribing, you agree to receive weekly emails from Camino. You can unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">You're subscribed!</h2>
                <p className="text-muted-foreground mb-6">
                  Check your inbox for a confirmation email. We'll send you our next newsletter soon.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                >
                  Subscribe Another Email
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">
              What You'll Get
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Weekly Insights</h3>
                <p className="text-muted-foreground">
                  Practical frameworks, research-backed strategies, and actionable tips for personal growth. No fluff, just value.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Behind the Scenes</h3>
                <p className="text-muted-foreground">
                  Exclusive updates on Camino's development, early access to new features, and insights into our approach to AI-powered coaching.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Expert Perspectives</h3>
                <p className="text-muted-foreground">
                  Learn from our team's combined expertise in psychology, neurodivergence, and technology. Deep dives into frameworks that actually work.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Community Stories</h3>
                <p className="text-muted-foreground">
                  Real experiences from people using our frameworks for growth. See how others are navigating their journeys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Stats */}
      <section className="py-16 md:py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#E2C379] mb-2">Weekly</div>
                <div className="text-sm text-muted-foreground">Delivery Schedule</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#E2C379] mb-2">5 min</div>
                <div className="text-sm text-muted-foreground">Average Read Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#E2C379] mb-2">0</div>
                <div className="text-sm text-muted-foreground">Spam Emails</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#E2C379] mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Unsubscribe Anytime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Your Privacy Matters</h2>
            <p className="text-muted-foreground mb-6">
              We respect your privacy. Your email will only be used to send you our weekly newsletter. We'll never share your information with third parties or send you promotional emails beyond what you subscribed for.
            </p>
            <div className="flex gap-4 justify-center text-sm">
              <Link href="/legal/privacy" className="text-[#E2C379] hover:underline">
                Privacy Policy
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/legal/terms" className="text-[#E2C379] hover:underline">
                Terms of Service
              </Link>
            </div>
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
