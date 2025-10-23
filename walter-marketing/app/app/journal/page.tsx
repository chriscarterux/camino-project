import { Button } from "@/components/ui/button";
import { Plus, Calendar, BookOpen, Sparkles } from "lucide-react";

export default function JournalPage() {
  const reflections = [
    {
      id: 1,
      date: "Today",
      prompt: "What moment today made you feel most alive?",
      entry: "This morning during my walk, I noticed the sunrise and felt completely present. It reminded me to slow down more often.",
      aiResponse: "I notice you mentioned feeling 'present' - this aligns with your value of mindfulness. Consider: How might you create more moments like this throughout your week?",
    },
    {
      id: 2,
      date: "Yesterday",
      prompt: "What pattern are you noticing in your relationships?",
      entry: "I tend to overcommit and then feel resentful. I need to practice saying no earlier in the process.",
      aiResponse: "This connects to the insight you captured about boundaries last week. You've identified the pattern - what's one small experiment you could try this week?",
    },
    {
      id: 3,
      date: "3 days ago",
      prompt: "Where did you compromise your values today?",
      entry: "I stayed late at work even though I value balance. I was afraid of letting the team down.",
      aiResponse: "Fear of disappointing others appears often in your reflections. What would honoring both your values AND your team look like?",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Reflection Journal</h1>
          <p className="text-muted-foreground">
            AI-guided prompts to help you think more clearly
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Reflection
        </Button>
      </div>

      {/* Today's Prompt */}
      <div className="rounded-lg border-2 border-primary bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold">Today's Reflection Prompt</h2>
        </div>
        <p className="text-lg mb-4">
          What's one assumption you've been making about yourself that might not be true?
        </p>
        <Button>Start Reflecting</Button>
      </div>

      {/* Calendar View Toggle */}
      <div className="flex items-center gap-4">
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Calendar View
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>7 day streak</span>
        </div>
      </div>

      {/* Reflections List */}
      <div className="space-y-6">
        {reflections.map((reflection) => (
          <div key={reflection.id} className="rounded-lg border bg-card overflow-hidden">
            {/* Entry Header */}
            <div className="border-b bg-muted/30 px-6 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{reflection.date}</span>
              </div>
            </div>

            {/* Prompt */}
            <div className="px-6 pt-4">
              <div className="flex items-start gap-3 mb-4">
                <BookOpen className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prompt</p>
                  <p className="font-medium">{reflection.prompt}</p>
                </div>
              </div>
            </div>

            {/* User Entry */}
            <div className="px-6 py-4">
              <p className="text-sm text-muted-foreground mb-1">Your Reflection</p>
              <p className="leading-relaxed">{reflection.entry}</p>
            </div>

            {/* AI Response */}
            <div className="px-6 pb-4">
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium text-primary">AI Insight</p>
                </div>
                <p className="text-sm leading-relaxed">{reflection.aiResponse}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reflections.length === 0 && (
        <div className="rounded-lg border border-dashed bg-card p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Start your reflection practice</h3>
          <p className="text-muted-foreground mb-6">
            AI-powered prompts adapt to your progress and help you think more clearly
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Begin Today's Reflection
          </Button>
        </div>
      )}
    </div>
  );
}
