import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey || apiKey === 'your_google_api_key_here') {
      return NextResponse.json({
        status: 'error',
        message: 'API key not configured',
        details: 'Please set GOOGLE_GENERATIVE_AI_API_KEY in your .env.local file'
      });
    }

    // Test the API key with a simple request
    const model = google('gemini-2.5-flash');
    
    try {
      const result = await streamText({
        model,
        messages: [{ role: 'user', content: 'Say "Hello, API is working!"' }],
      });
      
      // Get the full text from the stream
      let fullText = '';
      for await (const chunk of result.textStream) {
        fullText += chunk;
      }
      
      return NextResponse.json({
        status: 'success',
        message: 'API key is working',
        response: fullText,
        apiKeyPrefix: apiKey.substring(0, 10) + '...'
      });
    } catch (apiError: unknown) {
      return NextResponse.json({
        status: 'error',
        message: 'API key test failed',
        details: apiError instanceof Error ? apiError.message : 'Unknown API error',
        apiKeyPrefix: apiKey.substring(0, 10) + '...'
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Server error',
      details: (error as Error).message
    });
  }
}
