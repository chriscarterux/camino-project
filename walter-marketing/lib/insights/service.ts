import { SupabaseClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
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
      ai_model: 'gemini-2.0-flash',
      tokens_used: insight.tokens_used,
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
 * Initialize Google Generative AI client
 */
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

/**
 * Helper function to generate insight using Gemini AI
 */
async function generateInsightWithAI(reflections: any[]) {
  const reflectionTexts = reflections
    .map((r, i) => `Reflection ${i + 1}:\n${r.content}`)
    .join('\n\n');

  const prompt = `You are Camino AI, an empathetic coach analyzing user reflections to identify meaningful patterns and actionable insights.

Analyze these ${reflections.length} reflections and generate a weekly insight:

${reflectionTexts}

Respond with JSON in this exact format:
{
  "type": "pattern" | "growth" | "challenge" | "opportunity",
  "title": "Short, compelling title (max 60 chars)",
  "content": "Thoughtful analysis of the pattern or theme you noticed. Be specific, empathetic, and actionable. 2-3 sentences.",
  "themes": ["theme1", "theme2", "theme3"],
  "suggestions": ["actionable suggestion 1", "actionable suggestion 2"]
}

Guidelines:
- Be warm, encouraging, and insightful
- Identify specific patterns or themes across reflections
- Make suggestions practical and achievable
- Use "you" language to make it personal
- Keep it concise but meaningful`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json',
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse JSON response
    const insightData = JSON.parse(text);

    // Log token usage for cost tracking
    const usageMetadata = response.usageMetadata;
    console.log('[AI Insight] Tokens used:', {
      input: usageMetadata?.promptTokenCount || 0,
      output: usageMetadata?.candidatesTokenCount || 0,
      total: usageMetadata?.totalTokenCount || 0,
    });

    return {
      type: insightData.type,
      title: insightData.title,
      content: insightData.content,
      themes: insightData.themes,
      suggestions: insightData.suggestions,
      tokens_used: usageMetadata?.totalTokenCount || 0,
    };
  } catch (error) {
    console.error('[AI Insight] Gemini API error:', error);

    // Fallback to graceful degradation
    return {
      type: 'pattern' as const,
      title: 'Reflection Pattern Detected',
      content: `Based on your ${reflections.length} reflections, I see you're actively engaging with your personal growth journey. Keep reflecting - patterns become clearer over time.`,
      themes: ['personal growth', 'self-reflection'],
      suggestions: ['Continue your daily reflection practice', 'Revisit previous insights to track your progress'],
      tokens_used: 0,
    };
  }
}
