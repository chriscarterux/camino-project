#!/usr/bin/env node

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = "AIzaSyAchL4eqlFTzTaH5UuoPP-yUXPrRMSKmdM";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    console.log('🔍 Listing available Gemini models...\n');

    // Try the simplest model first
    const models = ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-flash'];

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log(`✅ ${modelName} - WORKING`);
        console.log(`   Response: ${result.response.text()}\n`);
      } catch (error) {
        console.log(`❌ ${modelName} - NOT AVAILABLE`);
        console.log(`   Error: ${error.message}\n`);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listModels();
