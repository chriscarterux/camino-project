import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/dashboard/stats
 *
 * Returns real analytics data for user dashboard
 * Replaces hardcoded mock data with actual database queries
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parallel queries for better performance
    const [
      reflectionsResult,
      insightsResult,
      profileResult,
      moodDistributionResult,
      dimensionBreakdownResult,
      recentInsightsResult,
    ] = await Promise.all([
      // Total reflections count
      supabase
        .from('reflections')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),

      // Total insights count
      supabase
        .from('insights')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),

      // Get streak from profile
      supabase
        .from('profiles')
        .select('streak_days')
        .eq('id', user.id)
        .single(),

      // Mood distribution (group by mood)
      supabase
        .from('reflections')
        .select('mood')
        .eq('user_id', user.id)
        .not('mood', 'is', null),

      // Dimension breakdown (group by dimension)
      supabase
        .from('reflections')
        .select('dimension')
        .eq('user_id', user.id)
        .not('dimension', 'is', null),

      // Recent insights for themes
      supabase
        .from('insights')
        .select('title, content, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3),
    ]);

    // Calculate mood distribution
    const moodCounts: Record<string, number> = {};
    moodDistributionResult.data?.forEach((row) => {
      const mood = row.mood;
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    // Calculate dimension breakdown
    const dimensionCounts: Record<string, number> = {};
    dimensionBreakdownResult.data?.forEach((row) => {
      const dimension = row.dimension;
      dimensionCounts[dimension] = (dimensionCounts[dimension] || 0) + 1;
    });

    // Extract themes from recent insights
    const recentThemes: string[] = [];
    recentInsightsResult.data?.forEach((insight) => {
      // Extract first significant word from title as theme
      const titleWords = insight.title.split(' ');
      const theme = titleWords.find(word => word.length > 4);
      if (theme && !recentThemes.includes(theme.toLowerCase())) {
        recentThemes.push(theme.toLowerCase());
      }
    });

    // Calculate reflections this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { count: reflectionsThisWeek } = await supabase
      .from('reflections')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', oneWeekAgo.toISOString());

    // Get activity heatmap (last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const { data: activityData } = await supabase
      .from('reflections')
      .select('created_at')
      .eq('user_id', user.id)
      .gte('created_at', ninetyDaysAgo.toISOString());

    // Group activity by date for heatmap
    const activityByDate: Record<string, number> = {};
    activityData?.forEach((row) => {
      const date = new Date(row.created_at).toISOString().split('T')[0];
      activityByDate[date] = (activityByDate[date] || 0) + 1;
    });

    // Convert to array format for frontend
    const activityHeatmap = Object.entries(activityByDate).map(([date, count]) => ({
      date,
      count,
    }));

    // Current streak from profile (updated automatically by trigger)
    const currentStreak = profileResult.data?.streak_days || 0;

    // For longest_streak, we'll use current streak for now
    // TODO: Add record_streak column to profiles table to track personal best
    const longestStreak = currentStreak;

    const stats = {
      total_reflections: reflectionsResult.count || 0,
      total_insights: insightsResult.count || 0,
      current_streak: currentStreak,
      longest_streak: longestStreak,
      reflections_this_week: reflectionsThisWeek || 0,
      mood_distribution: moodCounts,
      dimension_breakdown: dimensionCounts,
      activity_heatmap: activityHeatmap,
      recent_themes: recentThemes.slice(0, 5), // Top 5 themes
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
