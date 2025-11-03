"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";

/**
 * Onboarding router - redirects to the appropriate step
 */
export default function OnboardingPage() {
  const router = useRouter();
  const { state } = useOnboarding();

  useEffect(() => {
    // Determine which step to show based on state
    if (!state.intent) {
      // No intent selected, start at welcome
      router.push("/onboarding/welcome");
    } else if (state.reflections.length === 0) {
      // Intent selected, no reflections yet
      router.push("/onboarding/reflection/1");
    } else if (state.reflections.length < 3) {
      // Some reflections completed, continue
      router.push(`/onboarding/reflection/${state.reflections.length + 1}`);
    } else if (!state.insightId) {
      // All reflections done, show celebration
      router.push("/onboarding/celebration");
    } else {
      // Everything complete, show next steps
      router.push("/onboarding/complete");
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-[var(--camino-gold)]">
        Loading your journey...
      </div>
    </div>
  );
}
