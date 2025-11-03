import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  initServerAnalytics,
  trackServerInsightViewed,
  trackServerActivation,
  calculateDaysSinceSignup,
} from '@/lib/analytics';

// Initialize server analytics
initServerAnalytics();

/**
 * GET - Fetch specific insight and track view
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the insight
    const { data: insight, error } = await supabase
      .from('insights')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw error;
    }

    if (!insight) {
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    // Get user profile for signup date and activation status
    const { data: profile } = await supabase
      .from('profiles')
      .select('created_at, is_activated')
      .eq('id', user.id)
      .single();

    // Check if this is the first insight
    const { count: insightCount } = await supabase
      .from('insights')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    const isFirstInsight = insightCount === 1;

    // Calculate time since insight was generated
    const generatedAt = new Date(insight.created_at);
    const now = new Date();
    const timeSinceGeneration = Math.floor((now.getTime() - generatedAt.getTime()) / 1000);

    // Get source from query params
    const url = new URL(request.url);
    const source = url.searchParams.get('source') || 'direct_link';

    // Track insight viewed event
    trackServerInsightViewed(user.id, {
      insight_id: insight.id,
      insight_type: insight.type,
      is_first_insight: isFirstInsight,
      time_since_generation_seconds: timeSinceGeneration,
      source: source as any,
      days_since_signup: calculateDaysSinceSignup(profile?.created_at || user.created_at),
    });

    // If this is first insight AND user hasn't been activated yet, fire activation event
    if (isFirstInsight && !profile?.is_activated) {
      // Get reflection count
      const { count: reflectionCount } = await supabase
        .from('reflections')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get session count (from sessions table if it exists, otherwise estimate)
      // TODO: Implement proper session tracking
      const sessionCount = 1;

      // Track activation
      trackServerActivation(user.id, {
        reflection_count: reflectionCount || 3,
        insight_id: insight.id,
        insight_type: insight.type,
        days_since_signup: calculateDaysSinceSignup(profile?.created_at || user.created_at),
        session_count: sessionCount,
        first_dimension: insight.dimension || 'identity',
        activation_path: source === 'onboarding' ? 'onboarding' : 'organic',
      });

      // Update user profile to mark as activated
      await supabase
        .from('profiles')
        .update({
          is_activated: true,
          activated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      // Store activation record
      await supabase
        .from('user_activations')
        .insert({
          user_id: user.id,
          activated_at: new Date().toISOString(),
          reflection_count: reflectionCount || 3,
          insight_id: insight.id,
          days_since_signup: calculateDaysSinceSignup(profile?.created_at || user.created_at),
          session_count: sessionCount,
          activation_path: source === 'onboarding' ? 'onboarding' : 'organic',
        });
    }

    // Mark insight as viewed in database
    await supabase
      .from('insights')
      .update({
        viewed_at: new Date().toISOString(),
        view_count: (insight.view_count || 0) + 1,
      })
      .eq('id', id);

    return NextResponse.json({
      insight,
      is_first_insight: isFirstInsight,
      is_activation_moment: isFirstInsight && !profile?.is_activated,
    });
  } catch (error) {
    console.error('Get insight error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insight' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete insight
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('insights')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete insight error:', error);
    return NextResponse.json(
      { error: 'Failed to delete insight' },
      { status: 500 }
    );
  }
}
