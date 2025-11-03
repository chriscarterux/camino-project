"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { IntentSelector, Intent } from "@/components/onboarding/IntentSelector";
import { useOnboarding } from "@/lib/onboarding/context";
import { trackOnboardingStepViewed, trackOnboardingStepCompleted } from "@/lib/analytics";

/**
 * Step 2: Choose Intent
 * "What brings you here?" (Identity/Worldview/Relationships/All)
 */
export default function IntentPage() {
  const router = useRouter();
  const { state, setIntent, setCurrentStep } = useOnboarding();
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(state.intent);

  useEffect(() => {
    setCurrentStep(2);

    // Track step viewed
    const userId = "temp_user_id"; // TODO: Get from auth context
    trackOnboardingStepViewed(userId, 2, "choose_intent");

    const startTime = Date.now();

    return () => {
      // Track time spent when leaving
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackOnboardingStepCompleted(userId, 2, "choose_intent", timeSpent);
    };
  }, [setCurrentStep]);

  const handleContinue = () => {
    if (!selectedIntent) return;

    setIntent(selectedIntent);
    router.push("/onboarding/reflection/1");
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Progress bar */}
        <ProgressBar currentStep={2} totalSteps={9} className="mb-12" />

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--camino-slate)] mb-4">
            What brings you here?
          </h1>
          <p className="text-lg md:text-xl text-[var(--camino-slate)]/70 max-w-2xl mx-auto">
            Choose the dimension you'd like to explore. Don't worry—you can explore all of them
            later.
          </p>
        </div>

        {/* Intent selector */}
        <div className="mb-12">
          <IntentSelector onSelect={setSelectedIntent} selected={selectedIntent || undefined} />
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedIntent}
            size="lg"
            className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-[var(--camino-gold)] to-[#C9A961] hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
