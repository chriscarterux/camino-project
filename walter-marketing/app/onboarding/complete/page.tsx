"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding/context";
import { trackOnboardingStepViewed, trackOnboardingStepCompleted } from "@/lib/analytics";
import { Bell, Calendar, Sparkles } from "lucide-react";

/**
 * Step 9: Next Steps
 * Set daily reminder, explore dashboard (optional)
 */
export default function CompletePage() {
  const router = useRouter();
  const { state, resetOnboarding } = useOnboarding();
  const [reminderTime, setReminderTime] = useState("09:00");
  const [reminderEnabled, setReminderEnabled] = useState(false);

  useEffect(() => {
    // Redirect if not activated
    if (!state.insightId) {
      router.push("/onboarding");
      return;
    }

    // Track step viewed
    const userId = "temp_user_id"; // TODO: Get from auth context
    trackOnboardingStepViewed(userId, 9, "complete");

    const startTime = Date.now();

    return () => {
      // Track time spent when leaving
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackOnboardingStepCompleted(userId, 9, "complete", timeSpent);
    };
  }, [state.insightId, router]);

  const handleSetupReminder = () => {
    // TODO: Implement reminder setup
    setReminderEnabled(true);
  };

  const handleGoToDashboard = () => {
    // Clear onboarding state
    resetOnboarding();

    // Redirect to dashboard
    router.push("/app/dashboard");
  };

  const handleSkipReminder = () => {
    router.push("/app/dashboard");
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Success message */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--camino-gold)] to-[#C9A961] rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--camino-slate)] mb-4">
            You're Activated!
          </h1>

          <p className="text-xl text-[var(--camino-slate)]/70 max-w-2xl mx-auto">
            You've completed your first three reflections and received your first insight. This is
            just the beginning of your transformation journey.
          </p>
        </div>

        {/* Next steps cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Daily reflection reminder */}
          <div className="p-8 bg-white rounded-xl border-2 border-[var(--camino-sandstone)] hover:border-[var(--camino-gold)] transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--camino-gold)]/20 rounded-full flex items-center justify-center text-[var(--camino-gold)]">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[var(--camino-slate)] mb-2">
                  Daily Reflections
                </h3>
                <p className="text-sm text-[var(--camino-slate)]/70">
                  Set a daily reminder to continue your reflection practice
                </p>
              </div>
            </div>

            {!reminderEnabled ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="reminder-time"
                    className="block text-sm font-medium text-[var(--camino-slate)]/70 mb-2"
                  >
                    Preferred time
                  </label>
                  <input
                    id="reminder-time"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[var(--camino-sandstone)] rounded-lg focus:border-[var(--camino-gold)] focus:outline-none"
                  />
                </div>
                <Button
                  onClick={handleSetupReminder}
                  className="w-full bg-[var(--camino-gold)] hover:bg-[#C9A961]"
                >
                  Set Daily Reminder
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-[var(--camino-gold)] mb-2">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-[var(--camino-slate)]">
                  Reminder set for {reminderTime}
                </p>
              </div>
            )}
          </div>

          {/* Explore dashboard */}
          <div className="p-8 bg-gradient-to-br from-[var(--camino-ivory)] to-[var(--camino-sandstone)] rounded-xl border-2 border-[var(--camino-gold)]/30">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--camino-gold)]/20 rounded-full flex items-center justify-center text-[var(--camino-gold)]">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[var(--camino-slate)] mb-2">
                  Your Dashboard
                </h3>
                <p className="text-sm text-[var(--camino-slate)]/70">
                  View your insights, track progress, and continue your journey
                </p>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-sm text-[var(--camino-slate)]/70">
                <span className="w-1.5 h-1.5 bg-[var(--camino-gold)] rounded-full mr-2" />
                Access your first insight
              </li>
              <li className="flex items-center text-sm text-[var(--camino-slate)]/70">
                <span className="w-1.5 h-1.5 bg-[var(--camino-gold)] rounded-full mr-2" />
                See all your reflections
              </li>
              <li className="flex items-center text-sm text-[var(--camino-slate)]/70">
                <span className="w-1.5 h-1.5 bg-[var(--camino-gold)] rounded-full mr-2" />
                Explore learning paths
              </li>
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleGoToDashboard}
            size="lg"
            className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-[var(--camino-gold)] to-[#C9A961] hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Go to Dashboard
          </Button>

          {!reminderEnabled && (
            <Button
              onClick={handleSkipReminder}
              size="lg"
              variant="outline"
              className="px-12 py-6 text-lg font-semibold border-2 border-[var(--camino-gold)] text-[var(--camino-gold)] hover:bg-[var(--camino-gold)] hover:text-white transition-all duration-300"
            >
              Skip for Now
            </Button>
          )}
        </div>

        {/* Stats summary */}
        <div className="mt-12 pt-12 border-t border-[var(--camino-sandstone)]">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-serif font-bold text-[var(--camino-gold)] mb-1">
                {state.reflections.length}
              </div>
              <div className="text-sm text-[var(--camino-slate)]/70">Reflections</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-[var(--camino-gold)] mb-1">1</div>
              <div className="text-sm text-[var(--camino-slate)]/70">Insight</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-[var(--camino-gold)] mb-1">
                {Math.floor(
                  state.reflections.reduce((sum, r) => sum + r.timeSpent, 0) / 60
                )}
                m
              </div>
              <div className="text-sm text-[var(--camino-slate)]/70">Time Invested</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
