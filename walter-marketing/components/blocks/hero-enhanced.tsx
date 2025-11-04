"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Brain, Heart, Compass } from "lucide-react";
import Marquee from "react-fast-marquee";
import LeadCaptureForm from "@/components/LeadCaptureForm";

// Transformation dimensions for marquee
const transformationDimensions = [
  { icon: Brain, label: "Self-awareness", color: "#E2C379" },
  { icon: Heart, label: "Emotional clarity", color: "#E2C379" },
  { icon: Compass, label: "Life purpose", color: "#E2C379" },
  { icon: Sparkles, label: "Inner peace", color: "#E2C379" },
  { icon: Brain, label: "Pattern recognition", color: "#E2C379" },
  { icon: Heart, label: "Authentic connection", color: "#E2C379" },
];

export default function HeroEnhanced() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="container mx-auto px-4 py-20 md:py-32 lg:py-40">
        <div className="mx-auto max-w-5xl">
          {/* Pre-headline badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2C379]/30 bg-[#E2C379]/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#E2C379]" />
              <span className="text-sm font-medium">Coming Q1 2026 - Join the Waitlist</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-center text-4xl font-serif font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            You're Not Broken.
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10">You're Just Seeing Through the Wrong Lens</span>
              <span className="absolute bottom-2 left-0 h-3 md:h-4 w-full bg-[#E2C379]/30 rounded"></span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-base text-muted-foreground sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
            The <strong>Life Model Framework</strong>: A proven 5-phase methodology that transforms generic AI into deeply personalized guidance through context engineering—helping you see yourself (Identity), the world (Worldview), and your relationship to everything (Connection).
          </p>

          {/* Marquee - Transformation Benefits */}
          <div className="mt-12 mb-12">
            <Marquee
              gradient={true}
              gradientColor="#ffffff"
              gradientWidth={100}
              speed={40}
              className="py-4"
            >
              {transformationDimensions.map((item, index) => (
                <div
                  key={index}
                  className="mx-4 flex items-center gap-3 px-6 py-3 rounded-full border border-[#E2C379]/20 bg-card/50 backdrop-blur-sm"
                >
                  <item.icon className="h-5 w-5 text-[#E2C379]" />
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Three Dimensions Visual */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#E2C379]/10 to-transparent border border-[#E2C379]/20 hover:border-[#E2C379]/40 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E2C379]/20 mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-[#E2C379]">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Identity</h3>
              <p className="text-sm text-muted-foreground">From self-criticism to inherent worth</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#E2C379]/10 to-transparent border border-[#E2C379]/20 hover:border-[#E2C379]/40 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E2C379]/20 mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-[#E2C379]">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Worldview</h3>
              <p className="text-sm text-muted-foreground">From scarcity to abundance</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#E2C379]/10 to-transparent border border-[#E2C379]/20 hover:border-[#E2C379]/40 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E2C379]/20 mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-[#E2C379]">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Relationships</h3>
              <p className="text-sm text-muted-foreground">From isolation to interconnection</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33] text-base h-12 px-8 min-w-[200px]">
              <Link href="#waitlist">Join Waitlist</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base h-12 px-8 min-w-[200px]">
              <Link href="/life-model-framework">Learn the Framework</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-[#E2C379]" />
                <span>84 days of AI-guided reflection</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-[#E2C379]" />
                <span>6 private coaching sessions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-[#E2C379]" />
                <span>24/7 AI pattern recognition</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Join 1,000+ people on their transformation journey
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration - path motif */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] md:h-[800px] md:w-[800px] -translate-x-1/2 rounded-full bg-[#E2C379]/5 blur-3xl"></div>
        <div className="absolute right-0 top-1/2 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-[#F4E9D8]/30 blur-3xl"></div>
      </div>
    </section>
  );
}
