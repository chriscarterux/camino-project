import { Calendar, TrendingUp, Target, Lightbulb } from "lucide-react";

export default function SummariesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Weekly Summaries</h1>
        <p className="text-muted-foreground">
          Spotify Wrapped for personal growth - see your evolution over time
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">This Week's Summary</h3>
            <span className="text-sm text-muted-foreground">Oct 16-22, 2025</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Reflections</span>
              </div>
              <p className="text-2xl font-bold">7</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">New Insights</span>
              </div>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Streak</span>
              </div>
              <p className="text-2xl font-bold">7 days</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Key Themes</h4>
              <p className="text-muted-foreground">
                This week, you frequently mentioned "balance" and "boundaries" in your reflections.
                You're recognizing patterns around work-life integration.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Notable Progress</h4>
              <p className="text-muted-foreground">
                You completed Week 2 of your learning path and captured insights from 2 different sources.
                Your reflection consistency has improved 40% from last week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
