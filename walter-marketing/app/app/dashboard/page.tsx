'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, TrendingUp, Loader2 } from "lucide-react";

interface DashboardStats {
  total_reflections: number;
  total_insights: number;
  current_streak: number;
  longest_streak: number;
  reflections_this_week: number;
  mood_distribution: Record<string, number>;
  dimension_breakdown: Record<string, number>;
  activity_heatmap: Array<{ date: string; count: number }>;
  recent_themes: string[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/dashboard/stats');

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Dashboard stats error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Your Journey Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress, insights, and transformation
          </p>
        </div>

        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Your Journey Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress, insights, and transformation
          </p>
        </div>

        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
          <p className="text-sm text-destructive">
            {error || 'Unable to load dashboard stats. Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  // Empty state for new users
  const isNewUser = stats.total_reflections === 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Your Journey Dashboard</h1>
        <p className="text-muted-foreground">
          {isNewUser
            ? "Welcome! Start your first reflection to begin tracking your progress"
            : "Track your progress, insights, and transformation"}
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
          <p className="text-3xl font-bold mb-1">
            {stats.reflections_this_week}
          </p>
          <p className="text-sm text-muted-foreground">
            This week • {stats.total_reflections} total
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Insights Captured</h3>
          </div>
          <p className="text-3xl font-bold mb-1">{stats.total_insights}</p>
          <p className="text-sm text-muted-foreground">
            {stats.total_insights === 0 ? 'Complete 3 reflections for your first insight' : 'Ready to integrate'}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Current Streak</h3>
          </div>
          <p className="text-3xl font-bold mb-1">
            {stats.current_streak} {stats.current_streak === 1 ? 'day' : 'days'}
          </p>
          <p className="text-sm text-muted-foreground">
            {stats.current_streak >= stats.longest_streak
              ? '🔥 Personal record!'
              : `Record: ${stats.longest_streak} days`}
          </p>
        </div>
      </div>

      {/* Mood Distribution */}
      {Object.keys(stats.mood_distribution).length > 0 && (
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-bold mb-4">Mood Distribution</h2>
          <div className="space-y-3">
            {Object.entries(stats.mood_distribution)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([mood, count]) => (
                <div key={mood} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{mood}</span>
                      <span className="text-sm text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(count / stats.total_reflections) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Dimension Breakdown */}
      {Object.keys(stats.dimension_breakdown).length > 0 && (
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-bold mb-4">Dimension Breakdown</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(stats.dimension_breakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([dimension, count]) => (
                <div key={dimension} className="flex items-center justify-between p-3 rounded-lg border">
                  <span className="text-sm font-medium capitalize">{dimension}</span>
                  <span className="text-2xl font-bold text-primary">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recent Themes */}
      {stats.recent_themes.length > 0 && (
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-bold mb-4">Recent Themes</h2>
          <div className="flex flex-wrap gap-2">
            {stats.recent_themes.map((theme) => (
              <span
                key={theme}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Activity Heatmap */}
      {stats.activity_heatmap.length > 0 && (
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-bold mb-4">Activity Last 90 Days</h2>
          <div className="flex flex-wrap gap-1">
            {stats.activity_heatmap
              .sort((a, b) => a.date.localeCompare(b.date))
              .slice(-90)
              .map(({ date, count }) => {
                const intensity = Math.min(count / 3, 1);
                return (
                  <div
                    key={date}
                    className="h-3 w-3 rounded-sm transition-colors"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${intensity})`,
                      opacity: count === 0 ? 0.1 : 1,
                    }}
                    title={`${date}: ${count} reflection${count === 1 ? '' : 's'}`}
                  />
                );
              })}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Darker squares indicate more reflections on that day
          </p>
        </div>
      )}

      {/* Empty state CTA */}
      {isNewUser && (
        <div className="rounded-lg border bg-card p-8 text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Start Your Journey</h2>
          <p className="text-muted-foreground mb-6">
            Complete your first reflection to unlock insights and track your progress
          </p>
          <Button asChild size="lg">
            <a href="/app/reflect">
              Start Reflecting
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
