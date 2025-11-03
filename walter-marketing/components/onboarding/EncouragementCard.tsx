"use client";

import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, Target } from "lucide-react";

interface EncouragementCardProps {
  reflectionCount: number;
  totalNeeded: number;
  className?: string;
}

const encouragementMessages = [
  {
    count: 1,
    title: "Great start!",
    message: "Two more reflections to unlock your first insight.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    count: 2,
    title: "You're doing amazing!",
    message: "One more reflection until we can show you your patterns.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    count: 3,
    title: "Ready for your insight!",
    message: "We're analyzing your reflections to reveal your patterns.",
    icon: <Target className="w-6 h-6" />,
  },
];

export function EncouragementCard({
  reflectionCount,
  totalNeeded,
  className,
}: EncouragementCardProps) {
  const encouragement = encouragementMessages[reflectionCount - 1];

  if (!encouragement) return null;

  const progress = (reflectionCount / totalNeeded) * 100;

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto p-8 rounded-2xl",
        "bg-gradient-to-br from-[var(--camino-ivory)] via-[var(--camino-sandstone)] to-[var(--camino-ivory)]",
        "border-2 border-[var(--camino-gold)]/30",
        "shadow-xl",
        "animate-fade-in",
        className
      )}
    >
      {/* Icon and Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-14 h-14 bg-[var(--camino-gold)]/20 rounded-full flex items-center justify-center text-[var(--camino-gold)]">
          {encouragement.icon}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-serif font-bold text-[var(--camino-slate)] mb-2">
            {encouragement.title}
          </h2>
          <p className="text-lg text-[var(--camino-slate)]/80 leading-relaxed">
            {encouragement.message}
          </p>
        </div>
      </div>

      {/* Progress visualization */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[var(--camino-slate)]/70">
            Progress to activation
          </span>
          <span className="text-sm font-bold text-[var(--camino-gold)]">
            {reflectionCount} / {totalNeeded} reflections
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--camino-gold)] to-[#C9A961] transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={reflectionCount}
            aria-valuemin={0}
            aria-valuemax={totalNeeded}
            aria-label={`${reflectionCount} of ${totalNeeded} reflections completed`}
          />
        </div>

        {/* Reflection dots */}
        <div className="flex justify-center gap-3 mt-4">
          {Array.from({ length: totalNeeded }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-500",
                index < reflectionCount
                  ? "bg-[var(--camino-gold)] scale-110 shadow-md"
                  : "bg-white/50 border-2 border-[var(--camino-gold)]/30"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Motivational quote */}
      {reflectionCount === 2 && (
        <div className="mt-6 pt-6 border-t border-[var(--camino-gold)]/20">
          <p className="text-sm italic text-[var(--camino-slate)]/70 text-center">
            "The unexamined life is not worth living." — Socrates
          </p>
        </div>
      )}
    </div>
  );
}
