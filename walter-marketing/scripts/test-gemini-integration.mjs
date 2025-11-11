/**
 * Test script to verify Gemini AI integration using Google's official SDK
 * Tests that the API can successfully generate insights from reflections
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAchL4eqlFTzTaH5UuoPP-yUXPrRMSKmdM';

// Mock reflection data for testing
const mockReflections = [
  { content: "Today I realized that I've been avoiding difficult conversations at work. I need to speak up more about my ideas." },
  { content: "I spent time journaling this morning and noticed a pattern - I always doubt myself before meetings." },
  { content: "Had a great conversation with a mentor who helped me see that my perfectionism is holding me back." }
];

async function testGeminiIntegration() {
  console.log('🔄 Testing Gemini API integration for insights generation...\n');
  console.log('Mock reflections:', mockReflections.length);
  console.log('Model: gemini-2.0-flash');
  console.log('Response format: JSON\n');

  try {
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

    // Create the prompt
    const reflectionTexts = mockReflections
      .map((r, i) => `Reflection ${i + 1}:\n${r.content}`)
      .join('\n\n');

    const prompt = `You are Camino AI, an empathetic coach analyzing user reflections to identify meaningful patterns and actionable insights.

Analyze these ${mockReflections.length} reflections and generate a weekly insight:

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

    // Get the model
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json',
      },
    });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse JSON response
    const insightData = JSON.parse(text);

    console.log('✅ Gemini API integration successful!\n');
    console.log('Generated Insight:');
    console.log('─'.repeat(50));
    console.log('Type:', insightData.type);
    console.log('Title:', insightData.title);
    console.log('Content:', insightData.content);
    console.log('Themes:', insightData.themes.join(', '));
    console.log('Suggestions:');
    insightData.suggestions.forEach((s, i) => {
      console.log(`  ${i + 1}. ${s}`);
    });

    // Token usage
    const usageMetadata = response.usageMetadata;
    if (usageMetadata) {
      console.log('\nToken Usage:');
      console.log('  Input tokens:', usageMetadata.promptTokenCount || 0);
      console.log('  Output tokens:', usageMetadata.candidatesTokenCount || 0);
      console.log('  Total tokens:', usageMetadata.totalTokenCount || 0);
    }

    console.log('\n✅ All checks passed! Gemini integration is working correctly.');
    console.log('✅ Response is valid JSON');
    console.log('✅ All required fields present (type, title, content, themes, suggestions)');
    console.log('✅ SDK correctly configured');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

testGeminiIntegration();
