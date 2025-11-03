import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  initServerAnalytics,
  trackServerInsightGenerated,
  calculateDaysSinceSignup,
} from '@/lib/analytics';

// Initialize server analytics
initServerAnalytics();

/**
 * GET - Fetch user's insights
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: insights, error } = await supabase
      .from('insights')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Get insights error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}

/**
 * POST - Generate new insight
 * Triggered when user completes 3rd reflection
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reflection_ids, dimension } = await request.json();

    if (!reflection_ids || reflection_ids.length < 3) {
      return NextResponse.json(
        { error: 'Need at least 3 reflections to generate insight' },
        { status: 400 }
      );
    }

    // Fetch reflections for analysis
    const { data: reflections, error: fetchError } = await supabase
      .from('reflections')
      .select('*')
      .in('id', reflection_ids)
      .eq('user_id', user.id);

    if (fetchError || !reflections || reflections.length < 3) {
      throw fetchError || new Error('Could not fetch reflections');
    }

    // Get user profile for signup date
    const { data: profile } = await supabase
      .from('profiles')
      .select('created_at')
      .eq('id', user.id)
      .single();

    // Generate insight using AI (OpenAI)
    const insight = await generateInsightWithAI(reflections);

    // Save insight to database
    const { data: savedInsight, error: saveError } = await supabase
      .from('insights')
      .insert({
        user_id: user.id,
        type: insight.type,
        title: insight.title,
        content: insight.content,
        dimension: dimension || 'identity',
        reflection_ids: reflection_ids,
      })
      .select()
      .single();

    if (saveError) {
      throw saveError;
    }

    // Track insight generated event
    const generationTime = Date.now() - startTime;
    trackServerInsightGenerated(user.id, {
      insight_id: savedInsight.id,
      insight_type: insight.type,
      reflection_count: reflections.length,
      reflection_ids: reflection_ids,
      dimension: dimension || 'identity',
      generation_time_ms: generationTime,
      ai_model: 'gpt-4',
      days_since_signup: calculateDaysSinceSignup(profile?.created_at || user.created_at),
    });

    return NextResponse.json({ insight: savedInsight });
  } catch (error) {
    console.error('Generate insight error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insight' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to generate insight using AI
 */
async function generateInsightWithAI(reflections: any[]) {
  // TODO: Integrate with OpenAI API
  // For now, return a placeholder insight

  const reflectionTexts = reflections.map(r => r.content).join('\n\n');

  // This would call OpenAI API in production
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [
  //     { role: "system", content: "You are Camino AI, analyzing user reflections to identify patterns..." },
  //     { role: "user", content: reflectionTexts }
  //   ]
  // });

  // Placeholder insight
  return {
    type: 'pattern' as const,
    title: 'Emerging Pattern Detected',
    content: `Based on your last ${reflections.length} reflections, I've noticed a pattern: You're exploring themes of personal growth and self-discovery. There's a consistent thread of curiosity about your own potential and a desire to understand yourself more deeply.`,
  };
}
