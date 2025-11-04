import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { initServerAnalytics } from '@/lib/analytics';
import { generateInsightForUser } from '@/lib/insights/service';
import { withValidation } from '@/lib/validation/middleware';
import { generateInsightSchema } from '@/lib/validation/schemas';

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
 *
 * Triggered when user completes 3rd reflection
 *
 * Validation middleware:
 * - reflection_ids: Array of 3-10 valid UUIDs
 * - dimension: 'identity' | 'worldview' | 'relationships' (default: 'identity')
 */
export const POST = withValidation(generateInsightSchema, async (request, validatedData) => {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reflection_ids, dimension } = validatedData;

    // Use shared insight generation function
    const result = await generateInsightForUser(
      supabase,
      user.id,
      reflection_ids,
      dimension
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
});
