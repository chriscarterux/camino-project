"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Sparkles, TrendingUp, Award, Heart, Star } from "lucide-react";

interface EncouragingToastProps {
  message: string;
  visible: boolean;
  onClose?: () => void;
  duration?: number;
  type?: 'success' | 'milestone' | 'encouragement';
}

// Calm, supportive messages that feel professional yet warm
const encouragingPhrases = [
  "Great progress",
  "You're doing amazing",
  "Keep up the great work",
  "Well done",
  "You're on a roll",
  "Excellent work",
  "Making great strides",
  "Fantastic effort",
  "You're crushing it",
  "Beautiful work",
];

export function EncouragingToast({
  message,
  visible,
  onClose,
  duration = 3000,
  type = 'success',
}: EncouragingToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setIsExiting(false);

      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, duration - 300);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [visible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'milestone':
        return <Award className="h-5 w-5 text-[#E2C379]" />;
      case 'encouragement':
        return <Heart className="h-5 w-5 text-[#E2C379]" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-[#E2C379]" />;
    }
  };

  return (
    <div
      className={`fixed top-24 right-6 z-50 transition-all duration-300 ease-out ${
        isExiting
          ? 'opacity-0 translate-x-4'
          : 'opacity-100 translate-x-0 animate-gentle-bounce'
      }`}
    >
      <div className="bg-white dark:bg-[#2D2F33] border-2 border-[#E2C379] rounded-xl shadow-2xl px-6 py-4 flex items-center gap-3 min-w-[280px]">
        <div className="flex-shrink-0 animate-scale-in">{getIcon()}</div>
        <div className="flex-1">
          <p className="font-semibold text-[#2D2F33] dark:text-white">{message}</p>
        </div>
        <div className="flex-shrink-0">
          <Sparkles className="h-4 w-4 text-[#E2C379] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Custom animations for the toast
export const toastAnimations = `
  @keyframes gentle-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }

  @keyframes scale-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate-gentle-bounce {
    animation: gentle-bounce 0.6s ease-out;
  }

  .animate-scale-in {
    animation: scale-in 0.5s ease-out;
  }
`;
