import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

/**
 * GET /api/prompts/daily
 *
 * Returns the daily reflection prompt for the user.
 *
 * Per HOW-511 specs:
 * - Returns prompt based on user's journey day
 * - Falls back to random if no journey tracking
 * - Response includes: id, text, dimension, dayNumber
 */

// Response schema per HOW-511
const DailyPromptSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  dimension: z.enum(['identity', 'worldview', 'relationships']),
  dayNumber: z.number(),
});

export async function GET() {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;

    // Get user's journey day (number of days since first reflection)
    // For MVP, we'll use a simple calculation based on profile creation
    const { data: profile } = await supabase
      .from('profiles')
      .select('created_at')
      .eq('id', userId)
      .single();

    let dayNumber = 1;

    if (profile?.created_at) {
      const createdDate = new Date(profile.created_at);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Use modulo to cycle through 28-day rotation
      dayNumber = (diffDays % 28) || 28; // 1-28, not 0-27
    }

    // Fetch prompt for this day
    const { data: prompt, error } = await supabase
      .from('prompts')
      .select('id, text, dimension, day_number')
      .eq('day_number', dayNumber)
      .limit(1)
      .single();

    if (error) {
      // If specific day not found, fall back to random prompt
      console.warn(`[Prompts] No prompt found for day ${dayNumber}, using fallback`);

      const { data: fallbackPrompt, error: fallbackError } = await supabase
        .from('prompts')
        .select('id, text, dimension, day_number')
        .limit(1)
        .single();

      if (fallbackError || !fallbackPrompt) {
        console.error('[Prompts] Fallback failed:', fallbackError);
        return NextResponse.json(
          { error: 'No prompts available' },
          { status: 500 }
        );
      }

      const response = {
        id: fallbackPrompt.id,
        text: fallbackPrompt.text,
        dimension: fallbackPrompt.dimension,
        dayNumber: fallbackPrompt.day_number,
      };

      return NextResponse.json(response);
    }

    const response = {
      id: prompt.id,
      text: prompt.text,
      dimension: prompt.dimension,
      dayNumber: prompt.day_number,
    };

    // Validate response matches schema
    DailyPromptSchema.parse(response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Prompts API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
