import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Brain, BarChart3, Lightbulb, TrendingUp, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
            Walter
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/#features" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Features
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Testimonials
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Pricing
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="http://lms.localhost:8000/lms">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/pricing">Start Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern, bold design */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-20 md:py-32 lg:py-40">
          <div className="mx-auto max-w-5xl">
            {/* Badge */}
            <div className="mb-8 flex justify-center">
              <div className="group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-accent/50 transition-colors">
                <Sparkles className="h-3.5 w-3.5 text-foreground/60" />
                <span className="text-foreground/80">
                  Introducing Walter
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  AI-Powered Thinking Partner
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-center text-4xl font-serif font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Transform Reflection
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10">Into Action</span>
                <span className="absolute bottom-2 left-0 h-3 md:h-4 w-full bg-foreground/10 rounded"></span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
              Your AI-powered thinking partner that turns personal insights into a guided philosophy for modern life.
              Stop consuming, start integrating.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-base h-12 px-8 group">
                <Link href="/pricing">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base h-12 px-8"
              >
                <Link href="/#features">Learn More</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-col items-center gap-6">
              <p className="text-sm text-muted-foreground">
                Free tier available • No credit card required
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-foreground/60" />
                  <span>8-week programs</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-foreground/60" />
                  <span>AI-powered insights</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-foreground/60" />
                  <span>1:1 coaching available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] md:h-[800px] md:w-[800px] -translate-x-1/2 rounded-full bg-foreground/5 blur-3xl"></div>
          <div className="absolute right-0 top-1/2 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-foreground/3 blur-3xl"></div>
        </div>
      </section>

      {/* Problem/Solution Statement */}
      <section className="py-20 md:py-28 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Problem */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                Drowning in Self-Improvement Noise?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                You consume books, podcasts, and courses promising meaning or focus.
                Yet few systems help you <strong className="text-foreground font-semibold">integrate what you learn into everyday life</strong>.
              </p>
            </div>

            {/* Solution */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                      <span className="text-lg font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Capture Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Save lessons from books, therapy, and life experiences
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                      <span className="text-lg font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">AI-Guided Reflection</h3>
                      <p className="text-sm text-muted-foreground">
                        Adaptive prompts that help you think more clearly
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Take Action</h3>
                      <p className="text-sm text-muted-foreground">
                        Convert insights into personalized action plans
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 bg-card border rounded-2xl p-8 md:p-10">
                <p className="text-xl md:text-2xl font-serif leading-relaxed">
                  Walter bridges the gap between <em className="font-semibold not-italic text-foreground">insight</em> and <em className="font-semibold not-italic text-foreground">implementation</em>.
                </p>
                <p className="mt-6 text-muted-foreground">
                  A thoughtful system designed for self-aware professionals who value growth but need structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 md:py-28 lg:py-32 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Six Core Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to transform reflection into meaningful action
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 bg-card hover:border-foreground/20">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guided Reflection</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered prompts that adapt to your progress, helping you think more clearly about what matters most.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 bg-card hover:border-foreground/20">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Life Dashboard</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visual map showing alignment between your values, goals, and daily actions. See the big picture at a glance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 bg-card hover:border-foreground/20">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Insight Capture</h3>
              <p className="text-muted-foreground leading-relaxed">
                Save lessons from books, therapy, and life. AI converts them into actionable steps tailored to you.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 bg-card hover:border-foreground/20">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pattern Detection</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI mirrors back themes you didn't see: "You often mention 'control' when discussing work stress."
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 bg-card hover:border-foreground/20">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Learning Paths</h3>
              <p className="text-muted-foreground leading-relaxed">
                Personalized 8-week transformation programs curated from your reflections and goals.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 bg-card hover:border-foreground/20">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Weekly Summaries</h3>
              <p className="text-muted-foreground leading-relaxed">
                Spotify Wrapped for personal growth. See your evolution, breakthroughs, and patterns over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Three Personas */}
      <section id="testimonials" className="py-20 md:py-28 lg:py-32 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Built for Self-Aware Professionals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              People who value growth but need more than just another productivity app
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 - Sarah */}
            <div className="relative border rounded-2xl p-8 bg-card group hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <svg className="h-8 w-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                I know what matters to me, but I struggle to stay aligned with it day-to-day.
                Walter helps me check in with myself and course-correct before I drift too far.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center font-semibold">
                  S
                </div>
                <div>
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Senior Product Designer, 32</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Marcus */}
            <div className="relative border rounded-2xl p-8 bg-card group hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <svg className="h-8 w-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                I consume so much wisdom, but where does it go? Walter helps me actually internalize what I learn
                and turn it into habits that stick.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center font-semibold">
                  M
                </div>
                <div>
                  <p className="font-semibold">Marcus Rivera</p>
                  <p className="text-sm text-muted-foreground">Startup Founder, 38</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Leah */}
            <div className="relative border rounded-2xl p-8 bg-card group hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <svg className="h-8 w-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                I help others find clarity all day. I needed a tool that holds space for my own growth
                without judgment, just structure.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center font-semibold">
                  L
                </div>
                <div>
                  <p className="font-semibold">Leah Thompson</p>
                  <p className="text-sm text-muted-foreground">Career Coach, 29</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tease */}
      <section className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
                Choose Your Path
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start free, upgrade when you're ready for deeper transformation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Foundation Tier */}
              <div className="border rounded-2xl p-6 bg-card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Foundation</h3>
                <p className="text-3xl font-bold mb-4">Free</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Start your reflection practice
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-foreground/60 flex-shrink-0" />
                    <span>Daily reflection prompts</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-foreground/60 flex-shrink-0" />
                    <span>Basic insight capture</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-foreground/60 flex-shrink-0" />
                    <span>Weekly summaries</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/pricing">Get Started</Link>
                </Button>
              </div>

              {/* Transformation Tier */}
              <div className="border-2 border-foreground rounded-2xl p-6 bg-card relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
                <h3 className="text-lg font-bold mb-2">Transformation</h3>
                <p className="text-3xl font-bold mb-4">
                  $19.95<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  AI-powered insights & learning paths
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Everything in Foundation</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>AI pattern detection</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>8-week learning paths</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Life dashboard</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/pricing">Start Transforming</Link>
                </Button>
              </div>

              {/* Mastery Tier */}
              <div className="border rounded-2xl p-6 bg-card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Mastery</h3>
                <p className="text-3xl font-bold mb-4">$1,000</p>
                <p className="text-sm text-muted-foreground mb-6">
                  1:1 coaching + full platform
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-foreground/60 flex-shrink-0" />
                    <span>Everything in Transformation</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-foreground/60 flex-shrink-0" />
                    <span>8 weeks of 1:1 coaching</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-foreground/60 flex-shrink-0" />
                    <span>Custom transformation plan</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/pricing">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 lg:py-32 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Ready to Live More Deliberately?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Join hundreds of self-aware professionals who've chosen clarity over chaos.
              Start with our free tier. Upgrade when you're ready for transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base h-12 px-8 group">
                <Link href="/pricing">
                  Choose Your Path
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base h-12 px-8">
                <Link href="mailto:hello@walter.app">Talk to Us</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Questions? Email us at <a href="mailto:hello@walter.app" className="underline hover:text-foreground transition-colors">hello@walter.app</a>
            </p>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="border-t py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-serif font-bold tracking-tight inline-block mb-4">
                Walter
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your AI-powered thinking partner. Transform reflection into action.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4 text-sm">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
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
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="mailto:hello@walter.app" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-sm">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-muted-foreground hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Walter. Built with intention for those who seek clarity.
            </p>
            <div className="flex gap-6">
              <a
                href="https://twitter.com/walter"
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
                href="https://linkedin.com/company/walter"
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
