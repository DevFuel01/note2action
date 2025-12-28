import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('GEMINI_API_KEY not set');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Try to list models
    console.log('Attempting to list available models...\n');
    
    // Try a simple generation with different model names
    const modelsToTry = [
      'gemini-pro',
      'gemini-1.5-flash',
      'gemini-1.5-flash-002',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro',
      'gemini-2.0-flash-exp',
    ];

    for (const modelName of modelsToTry) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello');
        const response = await result.response;
        console.log(`✅ ${modelName} WORKS!`);
        console.log(`Response: ${response.text().substring(0, 50)}...\n`);
        break; // Stop after first working model
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}\n`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();
