"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Intent } from "@/components/onboarding/IntentSelector";

interface Reflection {
  id: string;
  promptId: string;
  promptText: string;
  text: string;
  wordCount: number;
  timeSpent: number;
  timestamp: string;
}

interface OnboardingState {
  intent: Intent | null;
  reflections: Reflection[];
  currentStep: number;
  insightId: string | null;
  startTime: number;
}

interface OnboardingContextValue {
  state: OnboardingState;
  isHydrated: boolean;
  setIntent: (intent: Intent) => void;
  addReflection: (reflection: Omit<Reflection, "id" | "timestamp">) => void;
  setCurrentStep: (step: number) => void;
  setInsightId: (id: string) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

const STORAGE_KEY = "camino_onboarding_state";

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>({
    intent: null,
    reflections: [],
    currentStep: 1,
    insightId: null,
    startTime: Date.now(),
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load state from sessionStorage on mount
  // Using sessionStorage instead of localStorage for security:
  // - Sensitive reflection data is cleared when browser closes
  // - Prevents long-term storage of personal thoughts
  // - Appropriate for onboarding flow (no need to persist across sessions)
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
        console.error("Failed to load onboarding state:", error);
      }
    }
    // Mark as hydrated after attempting to load from sessionStorage
    setIsHydrated(true);
  }, []);

  // Save state to sessionStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  const setIntent = (intent: Intent) => {
    setState((prev) => ({ ...prev, intent }));
  };

  const addReflection = (reflection: Omit<Reflection, "id" | "timestamp">) => {
    const newReflection: Reflection = {
      ...reflection,
      id: `reflection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      reflections: [...prev.reflections, newReflection],
    }));
  };

  const setCurrentStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const setInsightId = (id: string) => {
    setState((prev) => ({ ...prev, insightId: id }));
  };

  const resetOnboarding = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState({
      intent: null,
      reflections: [],
      currentStep: 1,
      insightId: null,
      startTime: Date.now(),
    });
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        isHydrated,
        setIntent,
        addReflection,
        setCurrentStep,
        setInsightId,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
