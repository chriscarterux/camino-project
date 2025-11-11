/**
 * List available Gemini models
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAchL4eqlFTzTaH5UuoPP-yUXPrRMSKmdM';

async function listModels() {
  console.log('🔍 Fetching available Gemini models...\n');

  try {
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const models = await genAI.listModels();

    console.log('Available Models:');
    console.log('─'.repeat(70));

    for (const model of models) {
      console.log(`\nName: ${model.name}`);
      console.log(`Display Name: ${model.displayName}`);
      console.log(`Description: ${model.description}`);
      if (model.supportedGenerationMethods) {
        console.log(`Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
      }
    }

  } catch (error) {
    console.error('❌ Error listing models:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

listModels();
