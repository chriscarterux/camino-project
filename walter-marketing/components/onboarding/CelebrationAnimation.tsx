"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface CelebrationAnimationProps {
  onComplete?: () => void;
  insightText: string;
  className?: string;
}

export function CelebrationAnimation({
  onComplete,
  insightText,
  className,
}: CelebrationAnimationProps) {
  const [stage, setStage] = useState<"confetti" | "reveal" | "insight">("confetti");
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    // Generate confetti pieces
    const colors = ["#E2C379", "#F4E9D8", "#C9A961", "#8B7355", "#DCC9A8"];
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfettiPieces(pieces);

    // Stage 1: Confetti (0-2s)
    const revealTimer = setTimeout(() => {
      setStage("reveal");
    }, 2000);

    // Stage 2: Reveal message (2-4s)
    const insightTimer = setTimeout(() => {
      setStage("insight");
    }, 4000);

    // Stage 3: Show insight (4s+)
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 6000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(insightTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {/* Confetti */}
      {stage === "confetti" && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${piece.x}%`,
                top: "-20px",
                backgroundColor: piece.color,
                animationDelay: `${piece.delay}s`,
                animationDuration: "3s",
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}

      {/* Celebration message */}
      <div className="text-center py-16 animate-fade-in">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-[var(--camino-gold)] to-[#C9A961] rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[var(--camino-gold)] rounded-full blur-xl opacity-50 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        {stage === "confetti" && (
          <h1 className="text-5xl font-serif font-bold text-[var(--camino-slate)] mb-4 animate-slide-up">
            Congratulations!
          </h1>
        )}

        {/* Reveal stage */}
        {stage === "reveal" && (
          <div className="animate-fade-in">
            <h1 className="text-5xl font-serif font-bold text-[var(--camino-slate)] mb-6">
              Here's What We See
            </h1>
            <p className="text-xl text-[var(--camino-slate)]/70 max-w-2xl mx-auto">
              Based on your reflections, we've identified a pattern in your thinking...
            </p>
          </div>
        )}

        {/* Insight stage */}
        {stage === "insight" && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-[var(--camino-slate)] mb-8">
              Your First Insight
            </h2>

            {/* Insight card */}
            <div className="p-8 bg-gradient-to-br from-[var(--camino-ivory)] to-[var(--camino-sandstone)] rounded-2xl border-2 border-[var(--camino-gold)] shadow-2xl">
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-[var(--camino-gold)]/20 rounded-full">
                  <span className="text-sm font-semibold text-[var(--camino-gold)]">
                    Pattern Detected
                  </span>
                </div>
              </div>

              <blockquote className="text-xl text-[var(--camino-slate)]/90 leading-relaxed font-serif italic mb-6">
                "{insightText}"
              </blockquote>

              <div className="pt-6 border-t border-[var(--camino-gold)]/30">
                <p className="text-base text-[var(--camino-slate)]/70 leading-relaxed">
                  This is just the beginning. Over the next 12 weeks, you'll discover deeper
                  patterns across all three dimensions: Identity, Worldview, and Your Place in the
                  World.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Particle effects */}
      {stage === "insight" && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--camino-gold)] rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
