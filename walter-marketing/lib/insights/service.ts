import { SupabaseClient } from '@supabase/supabase-js';
import {
  trackServerInsightGenerated,
  calculateDaysSinceSignup,
} from '@/lib/analytics';

/**
 * Insight generation result
 */
export interface InsightGenerationResult {
  insight: {
    id: string;
    user_id: string;
    type: string;
    title: string;
    content: string;
    dimension: string;
    reflection_ids: string[];
    created_at: string;
    updated_at: string;
  };
  success: boolean;
  error?: string;
}

/**
 * Generate insight from reflections with proper authentication context
 * This function should be called directly instead of making an HTTP request
 * to ensure the authentication context is preserved.
 *
 * @param supabase - Authenticated Supabase client
 * @param userId - User ID from authenticated session
 * @param reflectionIds - Array of reflection IDs to analyze
 * @param dimension - Dimension for the insight (default: 'identity')
 * @returns InsightGenerationResult
 */
export async function generateInsightForUser(
  supabase: SupabaseClient,
  userId: string,
  reflectionIds: string[],
  dimension: string = 'identity'
): Promise<InsightGenerationResult> {
  const startTime = Date.now();

  try {
    // Validate input
    if (!reflectionIds || reflectionIds.length < 3) {
      return {
        insight: null as any,
        success: false,
        error: 'Need at least 3 reflections to generate insight',
      };
    }

    // Fetch reflections for analysis
    const { data: reflections, error: fetchError } = await supabase
      .from('reflections')
      .select('*')
      .in('id', reflectionIds)
      .eq('user_id', userId);

    if (fetchError || !reflections || reflections.length < 3) {
      throw fetchError || new Error('Could not fetch reflections');
    }

    // Get user profile for signup date
    const { data: profile } = await supabase
      .from('profiles')
      .select('created_at')
      .eq('id', userId)
      .single();

    // Generate insight using AI
    const insight = await generateInsightWithAI(reflections);

    // Save insight to database
    const { data: savedInsight, error: saveError } = await supabase
      .from('insights')
      .insert({
        user_id: userId,
        type: insight.type,
        title: insight.title,
        content: insight.content,
        dimension: dimension,
        reflection_ids: reflectionIds,
      })
      .select()
      .single();

    if (saveError) {
      throw saveError;
    }

    // Track insight generated event
    const generationTime = Date.now() - startTime;
    trackServerInsightGenerated(userId, {
      insight_id: savedInsight.id,
      insight_type: insight.type,
      reflection_count: reflections.length,
      reflection_ids: reflectionIds,
      dimension: dimension,
      generation_time_ms: generationTime,
      ai_model: 'gpt-4',
      days_since_signup: calculateDaysSinceSignup(profile?.created_at),
    });

    return {
      insight: savedInsight,
      success: true,
    };
  } catch (error) {
    console.error('Generate insight error:', error);
    return {
      insight: null as any,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate insight',
    };
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
