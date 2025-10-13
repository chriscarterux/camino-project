"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function JournalPage() {
  const [reflection, setReflection] = useState("");
  const [showInsight, setShowInsight] = useState(false);
  const [showSignupGate, setShowSignupGate] = useState(false);

  const handleSubmit = () => {
    // In production, this would call AI API
    setShowInsight(true);
    setTimeout(() => setShowSignupGate(true), 2000);
  };

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
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Try your first guided reflection
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Take three minutes to notice something real. Experience how Camino helps you turn reflection into insight.
            </p>
          </div>
        </div>
      </section>

      {/* Reflection Interface */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!showInsight ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    A simple space to pause and think
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Begin your Camino with a single question. The prompt below invites you to write freely for a few minutes—no judgment, no pressure. Camino will help you see patterns and insights afterward.
                  </p>
                </div>

                {/* Prompt */}
                <div className="bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-6 mb-8">
                  <p className="text-lg italic text-[#2D2F33]">
                    When was the last time you felt truly present? What was happening around you?
                  </p>
                </div>

                {/* Editor */}
                <div className="mb-8">
                  <textarea
                    className="w-full min-h-[300px] p-6 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
                    placeholder="Start writing your reflection here..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {reflection.length} characters
                  </p>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={reflection.length < 50}
                  size="lg"
                  className="w-full bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
                >
                  Generate Insight
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                {/* AI Summary */}
                <div className="mb-8 bg-card border rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-4">Your reflection summary</h3>
                  <div className="bg-muted/30 p-6 rounded-lg mb-6">
                    <p className="text-muted-foreground italic">
                      You often feel most grounded when you're in nature or in quiet moments without screens. Consider setting aside a few minutes daily to recreate that presence.
                    </p>
                  </div>

                  {showSignupGate ? (
                    <>
                      <div className="border-t pt-6 mt-6">
                        <h3 className="text-xl font-bold mb-4">Your insight is ready</h3>
                        <p className="text-muted-foreground mb-6">
                          To save and revisit your reflection, create your free Camino account. Your data is private, encrypted, and always yours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33] flex-1">
                            <Link href="/signup">Create my free account</Link>
                          </Button>
                          <Button asChild variant="outline" size="lg" className="flex-1">
                            <Link href="/">Continue without saving</Link>
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      Processing your reflection...
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why Reflection Works */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              The science of slowing down
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Journaling for just five minutes a day improves focus, reduces stress, and builds emotional resilience. Camino turns that practice into a guided experience that learns and grows with you.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-2xl p-6 bg-card">
                <p className="text-lg italic mb-4">
                  "This simple question hit me harder than therapy sessions."
                </p>
                <p className="text-sm text-muted-foreground">— Early Beta User</p>
              </div>
              <div className="border rounded-2xl p-6 bg-card">
                <p className="text-lg italic mb-4">
                  "Camino made reflection easy—I finally understood my thought patterns."
                </p>
                <p className="text-sm text-muted-foreground">— Reflect User</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Start your Camino today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Clarity begins with a single question. Take your first step.
            </p>
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/signup">
                Start free
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
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-serif font-bold tracking-tight inline-block mb-4">
                Camino
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
