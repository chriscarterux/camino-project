import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  initServerAnalytics,
  trackServerReflectionCompleted,
  calculateDaysSinceSignup,
} from '@/lib/analytics';
import { generateInsightForUser } from '@/lib/insights/service';
import { validateReflectionInput } from '@/lib/validation/reflection';
import { checkReflectionRateLimit } from '@/lib/rate-limit';

// Initialize server analytics
initServerAnalytics();

// GET - Fetch user's reflections
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: reflections, error } = await supabase
      .from('reflections')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ reflections });
  } catch (error) {
    console.error('Get reflections error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reflections' },
      { status: 500 }
    );
  }
}

// POST - Create new reflection
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // SECURITY: Rate limiting - 10 reflections per hour per user
    const rateLimitResult = await checkReflectionRateLimit(user.id);
    if (!rateLimitResult.success) {
      console.warn('[Security] Reflection rate limit exceeded', {
        userId: user.id,
        limit: rateLimitResult.limit,
        reset: new Date(rateLimitResult.reset).toISOString(),
      });

      return NextResponse.json(
        {
          error: 'Too many reflections. Please try again later.',
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    let rawInput: unknown;
    try {
      rawInput = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // SECURITY: Comprehensive input validation with SQL injection and XSS prevention
    const validationResult = validateReflectionInput(rawInput);

    if (!validationResult.success) {
      console.warn('[Security] Reflection validation failed', {
        error: validationResult.error,
        issues: validationResult.issues,
        userId: user.id,
      });

      return NextResponse.json(
        { error: validationResult.error || 'Invalid input' },
        { status: 400 }
      );
    }

    const { prompt_id, prompt_text, content, mood, dimension, session_number } = validationResult.data;

    const { data: reflection, error } = await supabase
      .from('reflections')
      .insert({
        user_id: user.id,
        prompt_id,
        prompt_text,
        content,
        mood,
        dimension,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Update streak
    await updateStreak(supabase, user.id);

    // Get total reflection count
    const { count: reflectionCount } = await supabase
      .from('reflections')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get user profile for signup date
    const { data: profile } = await supabase
      .from('profiles')
      .select('created_at')
      .eq('id', user.id)
      .single();

    // Calculate time spent (from start of request)
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // Calculate word count
    const wordCount = content.trim().split(/\s+/).length;

    // Track reflection completed event
    // SECURITY: Do not send prompt_text (PII) or content to analytics
    // Only send metadata for privacy protection
    trackServerReflectionCompleted(user.id, {
      reflection_id: reflection.id,
      reflection_count: reflectionCount || 1,
      prompt_id, // Send only the ID, not the text
      prompt_text: '', // REMOVED: Sensitive data - prompt text could contain PII
      dimension: dimension || undefined,
      word_count: wordCount,
      time_spent_seconds: timeSpent,
      mood: mood || undefined,
      session_number: session_number || 1,
      days_since_signup: calculateDaysSinceSignup(profile?.created_at || user.created_at),
    });

    // If this is the 3rd reflection, trigger insight generation
    let shouldGenerateInsight = false;
    let insight = null;

    if (reflectionCount === 3) {
      shouldGenerateInsight = true;

      // Get the last 3 reflections
      const { data: recentReflections } = await supabase
        .from('reflections')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (recentReflections && recentReflections.length === 3) {
        // Generate insight directly with authenticated context
        // This replaces the unauthenticated fetch call that was causing failures
        try {
          const result = await generateInsightForUser(
            supabase,
            user.id,
            recentReflections.map(r => r.id),
            dimension || 'identity'
          );

          if (result.success) {
            insight = result.insight;
          } else {
            console.error('Failed to generate insight:', result.error);
          }
        } catch (error) {
          console.error('Failed to generate insight:', error);
        }
      }
    }

    return NextResponse.json({
      reflection,
      reflection_count: reflectionCount,
      should_generate_insight: shouldGenerateInsight,
      insight,
    });
  } catch (error) {
    console.error('Create reflection error:', error);
    return NextResponse.json(
      { error: 'Failed to save reflection' },
      { status: 500 }
    );
  }
}

// Helper function to update user streak
async function updateStreak(supabase: any, userId: string) {
  const { data: reflections } = await supabase
    .from('reflections')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(30);

  if (!reflections || reflections.length === 0) {
    return;
  }

  // Calculate streak
  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < reflections.length - 1; i++) {
    const current = new Date(reflections[i].created_at);
    const next = new Date(reflections[i + 1].created_at);

    current.setHours(0, 0, 0, 0);
    next.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else if (diffDays > 1) {
      break;
    }
  }

  // Update profile
  await supabase
    .from('profiles')
    .update({ streak_days: streak })
    .eq('id', userId);
}
