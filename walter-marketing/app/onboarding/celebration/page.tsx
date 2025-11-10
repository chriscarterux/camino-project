"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CelebrationAnimation } from "@/components/onboarding/CelebrationAnimation";
import { useOnboarding } from "@/lib/onboarding/context";
import {
  trackOnboardingStepViewed,
  trackOnboardingStepCompleted,
  trackInsightGenerated,
  trackInsightViewed,
  trackActivation,
} from "@/lib/analytics/client";

/**
 * Step 8: Activation Moment
 * Reveal first AI insight with celebration
 */
export default function CelebrationPage() {
  const router = useRouter();
  const { state, setInsightId, setCurrentStep } = useOnboarding();
  const [insight, setInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    setCurrentStep(8);

    // Redirect if not enough reflections
    if (state.reflections.length < 3) {
      router.push("/onboarding");
      return;
    }

    // Track step viewed
    const userId = "temp_user_id"; // TODO: Get from auth context
    trackOnboardingStepViewed(userId, 8, "celebration");

    const startTime = Date.now();

    // Generate insight (mock for now)
    generateInsight();

    return () => {
      // Track time spent when leaving
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackOnboardingStepCompleted(userId, 8, "celebration", timeSpent);
    };
  }, [state.reflections, router, setCurrentStep]);

  const generateInsight = async () => {
    try {
      setIsGenerating(true);

      // TODO: Call actual AI API to generate insight
      // For now, use a mock insight based on intent
      const mockInsights = {
        identity:
          "You're carrying beliefs about who you 'should' be that don't match who you truly are. Your reflections reveal a pattern of self-judgment that obscures your authentic strengths.",
        worldview:
          "You expect the world to work in predictable ways, and feel frustrated when it doesn't. Your reflections show a tension between your desire for control and your yearning for spontaneity.",
        relationships:
          "You give more than you receive, and struggle to ask for what you need. Your reflections reveal a pattern of prioritizing others' needs while neglecting your own.",
        all: "You're ready to see yourself, the world, and your relationships through a new lens. Your reflections show courage in questioning long-held assumptions.",
      };

      const insightText = mockInsights[state.intent || "all"];

      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const insightId = `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Track insight generation
      const userId = "temp_user_id"; // TODO: Get from auth context
      trackInsightGenerated(userId, {
        insight_id: insightId,
        insight_type: "pattern",
        reflection_count: 3,
        reflection_ids: state.reflections.map((r) => r.id),
        dimension: state.intent === "all" ? "identity" : state.intent!,
        generation_time_ms: 2000,
        ai_model: "gpt-4",
        days_since_signup: 0,
      } as any);

      setInsight(insightText);
      setInsightId(insightId);
      setIsGenerating(false);

      // Track insight viewed
      trackInsightViewed(userId, {
        insight_id: insightId,
        insight_type: "pattern",
        is_first_insight: true,
        time_since_generation_seconds: 0,
        source: "onboarding",
        days_since_signup: 0,
      } as any);

      // Track activation achieved
      trackActivation(userId, {
        reflection_count: 3,
        insight_id: insightId,
        insight_type: "pattern",
        days_since_signup: 0,
        session_count: 1,
        first_dimension: state.intent === "all" ? "identity" : state.intent!,
        activation_path: "onboarding",
      } as any);
    } catch (error) {
      console.error("Failed to generate insight:", error);
      setIsGenerating(false);
      // Show error state or fallback
    }
  };

  const handleComplete = () => {
    router.push("/onboarding/complete");
  };

  if (isGenerating || !insight) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto border-4 border-[var(--camino-gold)] border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[var(--camino-slate)] mb-2">
            Analyzing Your Reflections...
          </h2>
          <p className="text-lg text-[var(--camino-slate)]/70">
            Our AI is discovering patterns in your thoughts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <CelebrationAnimation insightText={insight} onComplete={handleComplete} />
      </div>
    </div>
  );
}
