import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Circle } from "lucide-react";

export default function Home() {
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
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/journal">Start your Camino</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-20 md:py-32 lg:py-40">
          <div className="mx-auto max-w-5xl">
            {/* Main Heading */}
            <h1 className="text-center text-4xl font-serif font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Guided reflection for
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10">a meaningful life</span>
                <span className="absolute bottom-2 left-0 h-3 md:h-4 w-full bg-[#E2C379]/30 rounded"></span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
              Understand your patterns, act with purpose, and grow with a calm, intelligent guide.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-base h-12 px-8 group bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="/journal">
                  Start your Camino
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base h-12 px-8"
              >
                <Link href="/how-it-works">See how it works</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-col items-center gap-6">
              <p className="text-sm text-muted-foreground">
                Free tier available • No credit card required
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-[#E2C379]" />
                  <span>Daily prompts</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-[#E2C379]" />
                  <span>AI-powered insights</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-[#E2C379]" />
                  <span>1:1 coaching available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration - path motif */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] md:h-[800px] md:w-[800px] -translate-x-1/2 rounded-full bg-[#E2C379]/5 blur-3xl"></div>
          <div className="absolute right-0 top-1/2 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-[#F4E9D8]/30 blur-3xl"></div>
        </div>
      </section>

      {/* Problem → Outcome */}
      <section className="py-20 md:py-28 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Pain */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                The world rewards noise and speed
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Most people have never been taught to pause, reflect, and understand their inner patterns.
              </p>
            </div>

            {/* Outcome */}
            <div className="bg-card border rounded-2xl p-8 md:p-10 text-center">
              <p className="text-xl md:text-2xl font-serif leading-relaxed mb-6">
                Camino gives you a daily structure for thoughtful reflection and personal clarity—so you can move through life with <em className="font-semibold not-italic text-foreground">awareness</em>, <em className="font-semibold not-italic text-foreground">purpose</em>, and <em className="font-semibold not-italic text-foreground">peace</em>.
              </p>
              <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Link href="/journal">Try your first reflection free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Pillars */}
      <section id="pillars" className="py-20 md:py-28 lg:py-32 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              The Three Pillars
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Pillar 1 - Reflect */}
            <div className="text-center group">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E2C379]/20 group-hover:bg-[#E2C379]/30 transition-colors">
                <Circle className="h-8 w-8 text-[#E2C379]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Reflect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Gentle prompts that meet you where you are.
              </p>
            </div>

            {/* Pillar 2 - Discover */}
            <div className="text-center group">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E2C379]/20 group-hover:bg-[#E2C379]/30 transition-colors">
                <Circle className="h-8 w-8 text-[#E2C379]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Discover</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI that mirrors your themes back to you.
              </p>
            </div>

            {/* Pillar 3 - Grow */}
            <div className="text-center group">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E2C379]/20 group-hover:bg-[#E2C379]/30 transition-colors">
                <Circle className="h-8 w-8 text-[#E2C379]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Grow</h3>
              <p className="text-muted-foreground leading-relaxed">
                Short practices that become lasting change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Snapshots */}
      <section className="py-20 md:py-28 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Experience Camino
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Snapshot 1 - Reflect */}
            <div className="border rounded-2xl p-8 bg-card">
              <h3 className="text-xl font-bold mb-3">Reflect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Daily prompt + calm editor interface. Take 2-4 minutes to connect with yourself.
              </p>
            </div>

            {/* Snapshot 2 - Insights */}
            <div className="border rounded-2xl p-8 bg-card">
              <h3 className="text-xl font-bold mb-3">Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-generated themes such as <em>connection</em>, <em>balance</em>, or <em>self-trust</em>.
              </p>
            </div>

            {/* Snapshot 3 - Journey */}
            <div className="border rounded-2xl p-8 bg-card">
              <h3 className="text-xl font-bold mb-3">Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                Structured learning paths to deepen emotional intelligence and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="testimonials" className="py-20 md:py-28 lg:py-32 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              What People Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="relative border rounded-2xl p-8 bg-card group hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <svg className="h-8 w-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed mb-6 italic">
                Camino helped me see my life differently—not as something to fix, but as something to understand.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E2C379]/20 flex items-center justify-center font-semibold text-[#2D2F33]">
                  E
                </div>
                <div>
                  <p className="font-semibold">Early beta user</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="relative border rounded-2xl p-8 bg-card group hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <svg className="h-8 w-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed mb-6 italic">
                I use Camino every morning before work. It's like therapy, journaling, and strategy—all in one.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E2C379]/20 flex items-center justify-center font-semibold text-[#2D2F33]">
                  C
                </div>
                <div>
                  <p className="font-semibold">Coaching client</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="relative border rounded-2xl p-8 bg-card group hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <svg className="h-8 w-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed mb-6 italic">
                The insights are surprisingly accurate. Camino sees patterns I don't even realize I'm creating.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E2C379]/20 flex items-center justify-center font-semibold text-[#2D2F33]">
                  J
                </div>
                <div>
                  <p className="font-semibold">Journey member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 md:py-28 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
                Simple plans for every path
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start reflecting for free, or unlock deeper guidance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Reflect - Free */}
              <div className="border rounded-2xl p-6 bg-card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Reflect</h3>
                <p className="text-3xl font-bold mb-4">Free</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Free guided journaling + AI insights
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Daily reflection prompts</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Basic AI insights</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Weekly summaries</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/pricing">Get Started</Link>
                </Button>
              </div>

              {/* Journey */}
              <div className="border-2 border-[#E2C379] rounded-2xl p-6 bg-card relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E2C379] text-[#2D2F33] px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
                <h3 className="text-lg font-bold mb-2">Journey</h3>
                <p className="text-3xl font-bold mb-4">
                  $19.95<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Full reflection curriculum + adaptive lessons
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Everything in Reflect</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>AI pattern detection</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Structured learning path</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Adaptive plan + exports</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                  <Link href="/pricing">Start Journey</Link>
                </Button>
              </div>

              {/* Coach */}
              <div className="border rounded-2xl p-6 bg-card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Coach</h3>
                <p className="text-3xl font-bold mb-4">$1,000<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                <p className="text-sm text-muted-foreground mb-6">
                  1:1 coaching (3-month minimum)
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Everything in Journey</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>1:1 coaching</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[#E2C379] flex-shrink-0" />
                    <span>Custom guidance</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/pricing">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                See all plans →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-20 md:py-28 lg:py-32 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Try your first guided reflection
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Take three minutes to notice something real.
            </p>
            <Button asChild size="lg" className="text-base h-12 px-8 group bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/journal">
                Start now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
