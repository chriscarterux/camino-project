"use client";

import { useEffect, useState } from "react";

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  animate?: boolean;
  onMilestone?: (milestone: number) => void;
}

export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  showPercentage = true,
  animate = true,
  onMilestone,
}: ProgressRingProps) {
  const [displayProgress, setDisplayProgress] = useState(animate ? 0 : progress);
  const [previousProgress, setPreviousProgress] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayProgress / 100) * circumference;

  useEffect(() => {
    if (!animate) {
      setDisplayProgress(progress);
      return;
    }

    // Smooth animation to new progress value
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = (progress - displayProgress) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayProgress((prev) => {
        const newProgress = prev + increment;

        // Check for milestone crossings (25%, 50%, 75%, 100%)
        if (onMilestone) {
          const milestones = [25, 50, 75, 100];
          for (const milestone of milestones) {
            if (prev < milestone && newProgress >= milestone) {
              onMilestone(milestone);
            }
          }
        }

        if (currentStep >= steps) {
          clearInterval(timer);
          return progress;
        }
        return newProgress;
      });
    }, duration / steps);

    return () => clearInterval(timer);
  }, [progress, animate, onMilestone]);

  // Pulse animation when progress changes
  const hasChanged = displayProgress !== previousProgress;
  useEffect(() => {
    if (hasChanged) {
      setPreviousProgress(displayProgress);
    }
  }, [displayProgress, hasChanged]);

  return (
    <div
      className="relative inline-flex transition-transform duration-300 hover:scale-105"
      style={{ width: size, height: size }}
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle with subtle glow */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted opacity-20"
        />
        {/* Progress circle with smooth animation */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          strokeLinecap="round"
          style={{
            filter: displayProgress === 100 ? 'drop-shadow(0 0 8px rgba(226, 195, 121, 0.6))' : 'none',
          }}
        />
        {/* Gradient definition for the progress ring */}
        <defs>
          <linearGradient id="progressGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#E2C379" />
            <stop offset="100%" stopColor="#C9A961" />
          </linearGradient>
        </defs>
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-bold text-[#2D2F33] transition-all duration-300 ${
              hasChanged ? 'scale-110' : 'scale-100'
            }`}
            style={{ fontSize: size / 4 }}
          >
            {Math.round(displayProgress)}%
          </span>
        </div>
      )}
      {/* Celebration sparkle when complete */}
      {displayProgress === 100 && (
        <div className="absolute inset-0 animate-ping opacity-20">
          <div className="w-full h-full rounded-full bg-[#E2C379]" />
        </div>
      )}
    </div>
  );
}
