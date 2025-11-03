"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
  // Add defensive validation for edge cases
  const progress = totalSteps > 0
    ? Math.min((currentStep / totalSteps) * 100, 100)
    : 0;

  return (
    <div className={cn("w-full", className)}>
      {/* Progress indicator text */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[var(--camino-slate)]/70 font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-[var(--camino-gold)] font-semibold">
          {Math.round(progress)}% complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[var(--camino-sandstone)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--camino-gold)] to-[#C9A961] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label={`Step ${currentStep} of ${totalSteps}`}
        />
      </div>

      {/* Dots indicator (optional, for visual reference) */}
      <div className="flex justify-center gap-2 mt-4" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              index < currentStep
                ? "bg-[var(--camino-gold)] w-3"
                : index === currentStep - 1
                ? "bg-[var(--camino-gold)] scale-125"
                : "bg-[var(--camino-sandstone)]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
