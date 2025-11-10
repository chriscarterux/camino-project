"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { ReflectionPrompt } from "@/components/onboarding/ReflectionPrompt";
import { EncouragementCard } from "@/components/onboarding/EncouragementCard";
import { useOnboarding } from "@/lib/onboarding/context";
import { getPrompt } from "@/lib/onboarding/prompts";
import {
  trackOnboardingStepViewed,
  trackOnboardingStepCompleted,
  trackReflectionCompleted,
} from "@/lib/analytics/client";

/**
 * Steps 3, 5, 7: Reflection Pages
 * User completes reflections with prompts based on their intent
 */
export default function ReflectionPage({ params }: { params: { number: string } }) {
  const router = useRouter();
  const { state, addReflection, setCurrentStep } = useOnboarding();
  const reflectionNumber = parseInt(params.number);
  const [showEncouragement, setShowEncouragement] = useState(false);

  // Validate reflection number
  if (reflectionNumber < 1 || reflectionNumber > 3) {
    router.push("/onboarding");
    return null;
  }

  // Redirect if intent not selected
  useEffect(() => {
    if (!state.intent) {
      router.push("/onboarding/intent");
      return;
    }

    // Set current step (3, 5, or 7)
    const stepNumber = reflectionNumber === 1 ? 3 : reflectionNumber === 2 ? 5 : 7;
    setCurrentStep(stepNumber);

    // Track step viewed
    const userId = "temp_user_id"; // TODO: Get from auth context
    trackOnboardingStepViewed(userId, stepNumber, `reflection_${reflectionNumber}`);

    const startTime = Date.now();

    return () => {
      // Track time spent when leaving
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackOnboardingStepCompleted(userId, stepNumber, `reflection_${reflectionNumber}`, timeSpent);
    };
  }, [state.intent, reflectionNumber, router, setCurrentStep]);

  if (!state.intent) {
    return null;
  }

  const prompt = getPrompt(state.intent, reflectionNumber);
  const stepNumber = reflectionNumber === 1 ? 3 : reflectionNumber === 2 ? 5 : 7;

  const handleSubmit = (text: string, wordCount: number, timeSpent: number) => {
    // Save reflection
    addReflection({
      promptId: prompt.id,
      promptText: prompt.text,
      text,
      wordCount,
      timeSpent,
    });

    // Track analytics
    const userId = "temp_user_id"; // TODO: Get from auth context
    trackReflectionCompleted(userId, {
      reflection_id: prompt.id,
      reflection_count: reflectionNumber,
      prompt_id: prompt.id,
      prompt_text: prompt.text,
      dimension: prompt.dimension,
      word_count: wordCount,
      time_spent_seconds: timeSpent,
      session_number: 1,
      days_since_signup: 0,
    } as any);

    // Show encouragement (except after reflection 3)
    if (reflectionNumber < 3) {
      setShowEncouragement(true);

      // Navigate to next reflection after 3 seconds
      setTimeout(() => {
        router.push(`/onboarding/reflection/${reflectionNumber + 1}`);
      }, 3000);
    } else {
      // After third reflection, go to celebration
      router.push("/onboarding/celebration");
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Progress bar */}
        <ProgressBar currentStep={stepNumber} totalSteps={9} className="mb-12" />

        {/* Show encouragement card or reflection prompt */}
        {showEncouragement ? (
          <div className="animate-fade-in">
            <EncouragementCard reflectionCount={reflectionNumber} totalNeeded={3} />
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Reflection number indicator */}
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-[var(--camino-gold)]/20 rounded-full">
                <span className="text-sm font-semibold text-[var(--camino-gold)]">
                  Reflection {reflectionNumber} of 3
                </span>
              </div>
            </div>

            {/* Reflection prompt */}
            <ReflectionPrompt promptText={prompt.text} onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
}
