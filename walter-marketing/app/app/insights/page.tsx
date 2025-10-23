import { Button } from "@/components/ui/button";
import { Plus, Search, Tag, BookOpen, Calendar } from "lucide-react";

export default function InsightsPage() {
  const insights = [
    {
      id: 1,
      title: "The power of tiny habits",
      source: "Atomic Habits by James Clear",
      content: "Small changes compound over time. Focus on systems, not goals.",
      tags: ["habits", "systems", "growth"],
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Values alignment reduces decision fatigue",
      source: "Therapy Session",
      content: "When my actions align with my values, decisions become easier and I feel more at peace.",
      tags: ["values", "decision-making", "alignment"],
      date: "1 week ago"
    },
    {
      id: 3,
      title: "Morning reflection sets the tone",
      source: "Personal Reflection",
      content: "Starting the day with 10 minutes of journaling helps me stay intentional throughout the day.",
      tags: ["reflection", "morning-routine", "intentionality"],
      date: "2 weeks ago"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Insights</h1>
          <p className="text-muted-foreground">
            Capture and organize lessons from books, therapy, and life
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Insight
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search insights..."
            className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button variant="outline">
          <Tag className="mr-2 h-4 w-4" />
          Filter by Tag
        </Button>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold">{insight.title}</h3>
              <span className="text-xs text-muted-foreground">{insight.date}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <BookOpen className="h-4 w-4" />
              <span>{insight.source}</span>
            </div>

            <p className="text-muted-foreground mb-4">{insight.content}</p>

            <div className="flex items-center gap-2">
              {insight.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (shown when no insights) */}
      {insights.length === 0 && (
        <div className="rounded-lg border border-dashed bg-card p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No insights yet</h3>
          <p className="text-muted-foreground mb-6">
            Start capturing lessons from books, therapy, and life experiences
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Insight
          </Button>
        </div>
      )}
    </div>
  );
}
