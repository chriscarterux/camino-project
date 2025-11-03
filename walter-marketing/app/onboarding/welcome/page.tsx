"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { trackOnboardingStepViewed, trackOnboardingStepCompleted } from "@/lib/analytics";
import { Sparkles } from "lucide-react";

/**
 * Step 1: Welcome Screen
 * "You're not broken. You're seeing through the wrong lens."
 */
export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    // Track step viewed
    const userId = "temp_user_id"; // TODO: Get from auth context
    trackOnboardingStepViewed(userId, 1, "welcome");

    const startTime = Date.now();

    return () => {
      // Track time spent when leaving
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackOnboardingStepCompleted(userId, 1, "welcome", timeSpent);
    };
  }, []);

  const handleContinue = () => {
    router.push("/onboarding/intent");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-4xl w-full text-center animate-fade-in">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--camino-gold)] to-[#C9A961] rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 bg-[var(--camino-gold)] rounded-full blur-xl opacity-30 animate-pulse" />
          </div>
        </div>

        {/* Main message */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--camino-slate)] mb-6 leading-tight">
          You're not broken.
          <br />
          You're seeing through the wrong lens.
        </h1>

        <p className="text-xl md:text-2xl text-[var(--camino-slate)]/70 mb-12 leading-relaxed max-w-3xl mx-auto">
          Camino reveals who you always were beneath false beliefs, limiting lenses, and learned
          powerlessness.
        </p>

        {/* Value propositions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          {[
            {
              title: "Discover Patterns",
              description: "See the invisible frameworks shaping your thoughts and choices",
            },
            {
              title: "Shift Perspectives",
              description: "Transform how you see yourself, the world, and your relationships",
            },
            {
              title: "Guided Growth",
              description: "AI-powered insights with human wisdom for meaningful change",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white/50 rounded-xl border border-[var(--camino-sandstone)] hover:border-[var(--camino-gold)] transition-all duration-300"
            >
              <h3 className="font-serif font-bold text-lg text-[var(--camino-slate)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--camino-slate)]/70">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={handleContinue}
          size="lg"
          className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-[var(--camino-gold)] to-[#C9A961] hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Begin Your Journey
        </Button>

        {/* Time estimate */}
        <p className="mt-6 text-sm text-[var(--camino-slate)]/50">
          Takes about 10-15 minutes to complete
        </p>
      </div>
    </div>
  );
}
