"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ReflectionPromptProps {
  promptText: string;
  placeholder?: string;
  onSubmit: (text: string, wordCount: number, timeSpent: number) => void;
  minWords?: number;
  maxWords?: number;
  className?: string;
}

export function ReflectionPrompt({
  promptText,
  placeholder = "Take your time... your thoughts matter here.",
  onSubmit,
  minWords = 50,
  maxWords = 1000,
  className,
}: ReflectionPromptProps) {
  const [text, setText] = useState("");
  const [startTime] = useState(Date.now());
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Calculate word count
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const isValid = wordCount >= minWords && wordCount <= maxWords;
  const progress = Math.min((wordCount / minWords) * 100, 100);

  const handleSubmit = () => {
    if (!isValid) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    onSubmit(text, wordCount, timeSpent);
  };

  // Auto-resize textarea using ref instead of getElementById
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      {/* Prompt */}
      <div className="mb-8 p-6 bg-gradient-to-br from-[var(--camino-ivory)] to-[var(--camino-sandstone)] rounded-xl border-l-4 border-[var(--camino-gold)]">
        <h3 className="text-2xl font-serif font-bold text-[var(--camino-slate)] mb-2">
          Reflect
        </h3>
        <p className="text-lg text-[var(--camino-slate)]/80 leading-relaxed">
          {promptText}
        </p>
      </div>

      {/* Textarea */}
      <div
        className={cn(
          "relative rounded-xl border-2 transition-all duration-300",
          isFocused
            ? "border-[var(--camino-gold)] shadow-lg"
            : "border-[var(--camino-sandstone)]"
        )}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "w-full p-6 bg-white rounded-xl resize-none min-h-[300px] max-h-[600px]",
            "text-lg text-[var(--camino-slate)] leading-relaxed",
            "placeholder:text-[var(--camino-slate)]/40",
            "focus:outline-none",
            "font-sans"
          )}
          aria-label="Reflection text area"
          aria-describedby="word-count-indicator"
          data-private
        />

        {/* Word count indicator */}
        <div
          id="word-count-indicator"
          className="absolute bottom-4 right-4 flex items-center gap-3"
        >
          {/* Progress ring */}
          {wordCount > 0 && (
            <div className="relative w-12 h-12">
              <svg className="transform -rotate-90 w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#F4E9D8"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke={isValid ? "#E2C379" : "#C9A961"}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={cn(
                    "text-xs font-bold",
                    isValid ? "text-[var(--camino-gold)]" : "text-[var(--camino-slate)]/60"
                  )}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          )}

          {/* Word count */}
          <div className="text-right">
            <div
              className={cn(
                "text-sm font-semibold transition-colors duration-300",
                wordCount < minWords
                  ? "text-[var(--camino-slate)]/60"
                  : isValid
                  ? "text-[var(--camino-gold)]"
                  : "text-orange-500"
              )}
            >
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </div>
            <div className="text-xs text-[var(--camino-slate)]/50">
              {wordCount < minWords ? `${minWords - wordCount} more needed` : "Ready to submit"}
            </div>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          size="lg"
          className={cn(
            "px-8 py-6 text-lg font-semibold transition-all duration-300",
            "bg-gradient-to-r from-[var(--camino-gold)] to-[#C9A961]",
            "hover:shadow-lg hover:scale-105",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          aria-label={isValid ? "Submit reflection" : `Write at least ${minWords - wordCount} more words to continue`}
        >
          Continue
        </Button>
      </div>

      {/* Helper text */}
      {wordCount > 0 && wordCount < minWords && (
        <p className="mt-4 text-sm text-[var(--camino-slate)]/60 text-center animate-fade-in">
          Take your time. The most meaningful reflections come from deep thought.
        </p>
      )}
    </div>
  );
}
