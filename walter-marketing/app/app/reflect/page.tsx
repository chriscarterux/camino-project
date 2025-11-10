"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Save, TrendingUp, Loader2 } from "lucide-react";

interface DailyPrompt {
  id: string;
  text: string;
  dimension: 'identity' | 'worldview' | 'relationships';
  dayNumber: number;
}

export default function ReflectPage() {
  const [reflection, setReflection] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<DailyPrompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [streak, setStreak] = useState<number>(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch daily prompt on mount (per HOW-511)
  useEffect(() => {
    async function fetchDailyPrompt() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/prompts/daily');

        if (!response.ok) {
          throw new Error('Failed to fetch daily prompt');
        }

        const data = await response.json();
        setPrompt(data);
      } catch (err) {
        console.error('Error fetching prompt:', err);
        setError('Could not load today\'s prompt. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchDailyPrompt();
  }, []);

  const handleSave = async () => {
    if (!prompt) {
      setError('No prompt available');
      return;
    }

    try {
      setSaving(true);
      setSaveSuccess(false);
      setError(null);

      const response = await fetch('/api/reflections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt_id: prompt.id,
          prompt_text: prompt.text,
          content: reflection,
          mood: mood || undefined,
          dimension: prompt.dimension,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save reflection');
      }

      const data = await response.json();

      // Update streak from response
      if (data.new_streak) {
        setStreak(data.new_streak);
      }

      // Show success message
      setSaveSuccess(true);

      // Clear form after successful save
      setReflection('');
      setMood(null);

      // If insight was generated, show it
      if (data.insight) {
        console.log('Generated insight:', data.insight);
        // TODO: Show insight modal or navigate to insights page
      }

      // If this is a record streak, celebrate!
      if (data.is_record_streak) {
        console.log('🎉 New record streak!');
        // TODO: Show celebration animation
      }
    } catch (err) {
      console.error('Error saving reflection:', err);
      setError(err instanceof Error ? err.message : 'Could not save reflection. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateInsight = () => {
    // Navigate to insights or show modal
    console.log("Generating insight");
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
          Take a moment to reflect
        </h1>
        <p className="text-muted-foreground">
          Your guided prompt for today is waiting
        </p>
      </div>

      {/* Prompt - Loading, Error, and Success states (per HOW-511) */}
      <div className="bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-6 mb-8">
        {loading && (
          <div className="flex items-center gap-3 text-[#2D2F33]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p className="text-lg italic">Loading today's prompt...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-red-600">
            <p className="text-lg font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {prompt && !loading && !error && (
          <>
            <p className="text-lg italic text-[#2D2F33]">
              {prompt.text}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Day {prompt.dayNumber} • {prompt.dimension}
            </p>
          </>
        )}
      </div>

      {/* Mood Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">
          How are you feeling today?
        </label>
        <div className="flex gap-4 justify-center">
          {[
            { emoji: "😊", label: "Good", value: "good" },
            { emoji: "😐", label: "Neutral", value: "neutral" },
            { emoji: "☹️", label: "Low", value: "low" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setMood(option.value)}
              className={`flex flex-col items-center gap-2 p-4 border rounded-lg transition-all ${
                mood === option.value
                  ? "border-[#E2C379] bg-[#E2C379]/10"
                  : "hover:border-muted-foreground"
              }`}
            >
              <span className="text-3xl">{option.emoji}</span>
              <span className="text-xs text-muted-foreground">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="mb-6">
        <textarea
          className="w-full min-h-[400px] p-6 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
          placeholder="Start writing your reflection here..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">
            {reflection.length} characters
          </p>
          {streak > 0 && (
            <p className="text-sm text-muted-foreground">
              🔥 Streak: {streak} {streak === 1 ? 'day' : 'days'}
            </p>
          )}
        </div>
      </div>

      {/* Success/Error Messages */}
      {saveSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ Reflection saved successfully!</p>
          {streak > 0 && (
            <p className="text-green-700 text-sm mt-1">
              Your streak is now {streak} {streak === 1 ? 'day' : 'days'}! Keep it up!
            </p>
          )}
        </div>
      )}

      {error && !loading && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">✗ {error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleSave}
          size="lg"
          variant="outline"
          className="flex-1"
          disabled={reflection.length < 10 || saving || !prompt}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save & Close
            </>
          )}
        </Button>
        <Button
          onClick={handleGenerateInsight}
          size="lg"
          className="flex-1 bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
          disabled={reflection.length < 50}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Generate Insight
        </Button>
      </div>

      {/* Microcopy */}
      <p className="text-center text-sm text-muted-foreground mt-8 italic">
        Every reflection is a step forward. Keep walking your Camino.
      </p>
    </div>
  );
}
