"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Globe, Users, Infinity } from "lucide-react";

export type Intent = "identity" | "worldview" | "relationships" | "all";

interface IntentOption {
  value: Intent;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const intentOptions: IntentOption[] = [
  {
    value: "identity",
    label: "Identity",
    description: "Discover who you are beneath false beliefs and limiting lenses",
    icon: <Sparkles className="w-8 h-8" />,
    color: "#E2C379",
  },
  {
    value: "worldview",
    label: "Worldview",
    description: "Question assumptions about how the world works",
    icon: <Globe className="w-8 h-8" />,
    color: "#C9A961",
  },
  {
    value: "relationships",
    label: "Relationships",
    description: "Understand patterns in how you connect with others",
    icon: <Users className="w-8 h-8" />,
    color: "#8B7355",
  },
  {
    value: "all",
    label: "All Dimensions",
    description: "Explore all three dimensions of transformation",
    icon: <Infinity className="w-8 h-8" />,
    color: "#2D2F33",
  },
];

interface IntentSelectorProps {
  onSelect: (intent: Intent) => void;
  selected?: Intent;
}

export function IntentSelector({ onSelect, selected }: IntentSelectorProps) {
  const [hoveredIntent, setHoveredIntent] = useState<Intent | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
      {intentOptions.map((option) => {
        const isSelected = selected === option.value;
        const isHovered = hoveredIntent === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            onMouseEnter={() => setHoveredIntent(option.value)}
            onMouseLeave={() => setHoveredIntent(null)}
            onFocus={() => setHoveredIntent(option.value)}
            onBlur={() => setHoveredIntent(null)}
            className={cn(
              "relative p-6 rounded-xl border-2 transition-all duration-300 text-left",
              "hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--camino-gold)] focus:ring-offset-2",
              isSelected
                ? "border-[var(--camino-gold)] bg-gradient-to-br from-[var(--camino-ivory)] to-[var(--camino-sandstone)] shadow-lg"
                : "border-[var(--camino-sandstone)] bg-white hover:border-[var(--camino-gold)]/50"
            )}
            aria-pressed={isSelected}
            aria-label={`Select ${option.label}: ${option.description}`}
          >
            {/* Icon */}
            <div
              className={cn(
                "flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300",
                isSelected || isHovered
                  ? "bg-[var(--camino-gold)]/20"
                  : "bg-[var(--camino-sandstone)]"
              )}
              style={{
                color: isSelected || isHovered ? option.color : "#2D2F33",
              }}
            >
              {option.icon}
            </div>

            {/* Label */}
            <h3
              className={cn(
                "text-xl font-serif font-bold mb-2 transition-colors duration-300",
                isSelected ? "text-[var(--camino-slate)]" : "text-[var(--camino-slate)]/80"
              )}
            >
              {option.label}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--camino-slate)]/70 leading-relaxed">
              {option.description}
            </p>

            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-[var(--camino-gold)] rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
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
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
