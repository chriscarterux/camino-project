import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { initServerAnalytics } from '@/lib/analytics';
import { generateInsightForUser } from '@/lib/insights/service';

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

    // Use shared insight generation function
    const result = await generateInsightForUser(
      supabase,
      user.id,
      reflection_ids,
      dimension || 'identity'
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to generate insight' },
        { status: 500 }
      );
    }

    return NextResponse.json({ insight: result.insight });
  } catch (error) {
    console.error('Generate insight error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insight' },
      { status: 500 }
    );
  }
}
