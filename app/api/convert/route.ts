import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import type { AIResponse } from '@/types';

export async function POST(request: Request) {
  try {
    const { notes } = await request.json();

    // Validate input
    if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide valid notes to convert.' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length,
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('GEMINI'))
    });
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key not configured. Please set GEMINI_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Initialize Gemini AI - using stable alias that points to latest Flash model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-latest',
    });

    // Craft the prompt for task extraction
    const prompt = `You are an AI assistant that extracts actionable tasks from unstructured notes.

Analyze the following notes and extract ONLY actionable tasks. Ignore general commentary, background information, or non-actionable statements.

For each task, determine:
1. task_title: A clear, concise action item (what needs to be done)
2. deadline: Extract any mentioned deadline or timeframe (e.g., "Friday", "next week", "by end of month"). If no deadline is mentioned, use null.
3. priority: Classify as "high", "medium", or "low" based on:
   - high: urgent language (ASAP, urgent, critical, deadline within 2 days)
   - medium: moderate urgency (this week, soon, important)
   - low: no urgency indicators or flexible timing

Return ONLY a valid JSON object in this exact format, with no additional text or markdown:
{
  "tasks": [
    {
      "task_title": "string",
      "deadline": "string or null",
      "priority": "high" | "medium" | "low"
    }
  ]
}

If no actionable tasks are found, return:
{
  "tasks": []
}

Notes to analyze:
${notes}`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up response (remove markdown code blocks if present)
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parse JSON response
    let aiResponse: AIResponse;
    try {
      aiResponse = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      return NextResponse.json(
        { success: false, error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    // Validate response structure
    if (!aiResponse.tasks || !Array.isArray(aiResponse.tasks)) {
      return NextResponse.json(
        { success: false, error: 'Invalid response format from AI.' },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      data: aiResponse,
    });

  } catch (error) {
    console.error('Error in convert API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}
