import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Your Journey Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress, insights, and transformation
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Reflections</h3>
          </div>
          <p className="text-3xl font-bold mb-1">24</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Insights Captured</h3>
          </div>
          <p className="text-3xl font-bold mb-1">12</p>
          <p className="text-sm text-muted-foreground">Ready to integrate</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Current Streak</h3>
          </div>
          <p className="text-3xl font-bold mb-1">7 days</p>
          <p className="text-sm text-muted-foreground">Keep it going!</p>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-bold mb-4">Continue Your Learning</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
            <div>
              <h3 className="font-semibold mb-1">Foundations of Self-Awareness</h3>
              <p className="text-sm text-muted-foreground">Week 2 of 8 • 65% complete</p>
            </div>
            <Button size="sm">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "Completed reflection", time: "2 hours ago", type: "reflection" },
            { action: "Added insight from 'Atomic Habits'", time: "Yesterday", type: "insight" },
            { action: "Completed Week 1 summary", time: "3 days ago", type: "summary" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-0">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
