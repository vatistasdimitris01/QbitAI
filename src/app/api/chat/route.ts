import { google } from '@ai-sdk/google';
import { googleTools } from '@ai-sdk/google/internal';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Google AI models
const modelR1 = google('gemini-2.5-flash');
const modelR2 = google('gemini-2.5-pro');

export async function POST(req: NextRequest) {
  try {
    console.log('API route called');
    
    // Check request size
    const contentLength = req.headers.get('content-length');
    console.log('Request content length:', contentLength);
    
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB limit
      console.log('Request too large:', contentLength);
      return NextResponse.json(
        { error: 'Request too large. Please reduce file size.' },
        { status: 413 }
      );
    }
    const { messages, modelType = 'fast', webSearchResults = [], selectedModel = 'qbit R1' } = await req.json();
    
    console.log('Received request:', { 
      messagesCount: messages.length, 
      modelType, 
      selectedModel,
      hasFiles: messages.some((msg: any) => Array.isArray(msg.content) && msg.content.some((item: any) => item.type === 'file'))
    });
    
    // Filter out messages without content and ensure proper format
    const validMessages = messages
      .filter((msg: { content?: string | any[] }) => {
        if (Array.isArray(msg.content)) {
          // For file content, check if there's at least one text item or file
          return msg.content.some((item: any) => 
            (item.type === 'text' && item.text?.trim()) || 
            (item.type === 'file' && item.data)
          );
        }
        return msg.content && typeof msg.content === 'string' && msg.content.trim() !== '';
      })
      .map((msg: { role: string; content: string | any[] }) => {
        if (Array.isArray(msg.content)) {
          // Handle file content - keep the original format for Google AI SDK
          return {
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content, // Keep the original array format
          };
        }
        
        return {
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content as string,
        };
      });

    // Add web search results to the last user message if available
    if (webSearchResults.length > 0 && validMessages.length > 0) {
      const lastMessage = validMessages[validMessages.length - 1];
      if (lastMessage.role === 'user') {
        const searchContext = `\n\nWeb search results:\n${webSearchResults.map((result: any) => 
          `- ${result.title}: ${result.snippet} (${result.link})`
        ).join('\n')}`;
        lastMessage.content += searchContext;
        
        // Add instruction for AI to format links properly
        lastMessage.content += `\n\nPlease format any links in your response using markdown format [link text](url) and provide a comprehensive answer based on the search results.`;
      }
    }

    console.log('Valid messages:', validMessages);

    if (validMessages.length === 0) {
      return NextResponse.json(
        { error: 'No valid messages provided' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    console.log('API Key configured:', !!apiKey);
    console.log('API Key value:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set');
    
    // Select model based on user choice
    let selectedModelInstance;
    let useCodeExecution = false;
    
    if (selectedModel === 'qbit R2') {
      selectedModelInstance = modelR2;
      useCodeExecution = true;
      console.log('Using qbit R2 with code execution capabilities');
    } else {
      selectedModelInstance = modelR1;
      console.log('Using qbit R1 with thinking capabilities');
    }
    
    if (!apiKey || apiKey === 'your_google_api_key_here') {
      console.log('No valid API key found, using mock response');
      
      // Get current date and time for mock response
      const now = new Date();
      const currentDate = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const currentTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      });
      
      // Return a mock response for testing
      const mockResponse = `Hello! I'm qbit, your AI assistant. I can see you said: "${validMessages[validMessages.length - 1].content}"

📅 **Current Date & Time**: ${currentDate} at ${currentTime}

🔑 **API Key Setup Required**

To get real AI responses with thinking capabilities, please:

1. **Get a Google AI API key**: Visit https://makersuite.google.com/app/apikey
2. **Update your .env.local file**: Replace the placeholder with your actual API key
3. **Restart the server**: Stop and restart npm run dev

Current status: ${apiKey ? 'API key found but invalid' : 'No API key configured'}

For now, I'm running in demo mode! 🚀`;

      // Create a streaming response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const chunks = mockResponse.split(' ');
          let index = 0;
          
          const sendChunk = () => {
            if (index < chunks.length) {
              const chunk = chunks[index] + (index < chunks.length - 1 ? ' ' : '');
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text-delta', textDelta: chunk })}\n\n`));
              index++;
              setTimeout(sendChunk, 100);
            } else {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              controller.close();
            }
          };
          
          sendChunk();
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      });
    }

    // Configure thinking based on model type - always use thinking for qbit R1
    const thinkingConfig = modelType === 'thinking' ? {
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 2048, // Reduced thinking budget for more concise thoughts
            includeThoughts: true,
          }
        }
      }
    } : {};

    console.log('Using thinking config:', thinkingConfig);

    console.log('Thinking config:', thinkingConfig);

    // For thinking mode, use generateText to get reasoning, then create custom stream
    if (modelType === 'thinking') {
      console.log('Using thinking mode - generating text with reasoning');
      
      // Import generateText for thinking mode
      const { generateText } = await import('ai');
      
      try {
        // Get current date and time
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        const currentTime = now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          timeZoneName: 'short'
        });
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Add system message to make AI think more naturally
        const messagesWithSystem = [
          {
            role: 'system',
            content: `You are qbit, a helpful assistant made by vatistas dimitris. You have full autonomy to decide what tools to use, what to search for, and how to respond. You can think freely and act independently to help users in the best way possible.

**Current Date and Time:**
- Date: ${currentDate}
- Time: ${currentTime}
- Timezone: ${timezone}

**Model Capabilities:**
- ${selectedModel === 'qbit R1' ? 'You have thinking and reasoning capabilities. You can analyze problems step by step and explain your thought process.' : 'You have code execution capabilities. You can write and run Python code to solve complex problems, perform calculations, and provide accurate results.'}

**Available Tools:**
- Web search: You can search the internet for current information
- Code execution: ${useCodeExecution ? 'You can write and execute Python code' : 'Not available in this model'}
- File analysis: You can analyze uploaded files
- Current date/time: You have access to the current date and time information

**Your Approach:**
- Think independently and decide what tools you need
- Search for information when you need current data
- Execute code when you need calculations or data processing
- Use current date/time when relevant to provide timely information
- Always be helpful and provide the best possible response`
          },
          ...validMessages
        ];
        
        // Prepare messages with files for Google AI
        const messagesWithFiles = messagesWithSystem.map((msg: any) => {
          // If the message content is already an array (with files), use it directly
          if (Array.isArray(msg.content)) {
            return {
              role: msg.role,
              content: msg.content
            };
          }
          // Otherwise, return the message as is
          return msg;
        });

        // Generate text with reasoning or code execution
        let text: string, reasoning: any, toolCalls: any, toolResults: any;
        try {
          if (useCodeExecution) {
            // Use R2 with code execution
            const result = await generateText({
              model: selectedModelInstance,
              tools: { code_execution: googleTools.codeExecution({}) },
              messages: messagesWithFiles,
              ...thinkingConfig,
            });
            text = result.text;
            reasoning = result.reasoning;
            toolCalls = result.toolCalls;
            toolResults = result.toolResults;
            console.log('Code execution result:', { toolCalls, toolResults });
          } else {
            // Use R1 with thinking
            const result = await generateText({
              model: selectedModelInstance,
              messages: messagesWithFiles,
              ...thinkingConfig,
            });
            text = result.text;
            reasoning = result.reasoning;
          }
        } catch (error: any) {
          console.error('Error generating text with reasoning:', error);
          
          // Handle API rate limits and other errors gracefully
          if (error.statusCode === 429 || error.message?.includes('quota')) {
            text = `I'm currently experiencing high demand and can't process your request right now. This is likely due to API rate limits. 

**What you can do:**
- Try again in a few minutes
- Check your API key configuration
- Consider upgrading your API plan if you're hitting limits

For now, I can still help with general questions that don't require real-time data.`;
            reasoning = [{
              type: 'reasoning',
              text: '**API Rate Limit Encountered**\n\nThe user\'s request hit API rate limits. I need to explain this clearly and provide helpful alternatives while maintaining a supportive tone.'
            }];
          } else {
            text = `I encountered an error while processing your request: ${error.message || 'Unknown error'}. 

Please try again, and if the problem persists, check your API configuration.`;
            reasoning = [{
              type: 'reasoning',
              text: '**Error Handling**\n\nAn unexpected error occurred. I should inform the user clearly and suggest next steps.'
            }];
          }
        }

        console.log('Generated text with reasoning:', { text, reasoning });

        // Create a custom stream that includes thinking data
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          start(controller) {
            try {
              // First, send thinking data if available
              if (reasoning && reasoning.length > 0) {
                console.log('Sending thinking data:', reasoning);
                // Extract the reasoning text from the array
                const reasoningText = reasoning.map((r: any) => r.text || r.content || '').join('\n\n');
                
                // Natural thinking content - just the AI's actual thoughts
                const enhancedThinking = `🧠 **My Thinking Process**

${reasoningText}`;
                
                const thinkingData = {
                  type: 'thinking',
                  content: enhancedThinking,
                  time: 2
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(thinkingData)}\n\n`));
              } else {
                // Send a default thinking message if no reasoning is provided
                console.log('No reasoning data, sending default thinking');
                const thinkingData = {
                  type: 'thinking',
                  content: `🧠 **My Thinking Process**

I'm processing your request and thinking about the best way to respond...`,
                  time: 1
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(thinkingData)}\n\n`));
              }

              // Send code execution results if available
              if (toolResults && toolResults.length > 0) {
                console.log('Sending code execution results:', toolResults);
                const codeResults = toolResults.map((result: any) => {
                  if (result.toolName === 'code_execution') {
                    return `💻 **Code Execution Result**

\`\`\`python
${result.args?.code || 'Code executed'}
\`\`\`

**Output:**
\`\`\`
${result.result || 'No output'}
\`\`\``;
                  }
                  return '';
                }).filter(Boolean).join('\n\n');

                if (codeResults) {
                  const codeData = {
                    type: 'code-execution',
                    content: codeResults,
                    time: 1
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(codeData)}\n\n`));
                }
              }
              
              // Then send the text response
              const textChunks = text.split(' ');
              let index = 0;
              
              const sendTextChunk = () => {
                if (index < textChunks.length) {
                  const chunk = textChunks[index] + (index < textChunks.length - 1 ? ' ' : '');
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text-delta', textDelta: chunk })}\n\n`));
                  index++;
                  setTimeout(sendTextChunk, 20);
                } else {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  controller.close();
                }
              };
              
              sendTextChunk();
            } catch (error) {
              console.error('Streaming error:', error);
              controller.error(error);
            }
          }
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
          },
        });
      } catch (error) {
        console.error('Error generating text with reasoning:', error);
        // Fallback to regular streaming
      }
    }

    // Get current date and time for non-thinking mode
    const now = new Date();
    const currentDate = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const currentTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Add system message with date/time context for non-thinking mode
    const messagesWithSystem = [
      {
        role: 'system',
        content: `You are qbit, a helpful assistant made by vatistas dimitris.

**Current Date and Time:**
- Date: ${currentDate}
- Time: ${currentTime}
- Timezone: ${timezone}

You have access to current date and time information. Use this when relevant to provide timely responses.`
      },
      ...validMessages
    ];

    // Prepare messages with files for non-thinking mode
    const messagesWithFiles = messagesWithSystem.map((msg: any) => {
      if (msg.files && msg.files.length > 0) {
        // Convert files to Google AI format
        const fileContents = msg.files.map((file: any) => ({
          type: 'file',
          data: file.data,
          mediaType: file.mediaType,
        }));
        
        return {
          role: msg.role,
          content: [
            { type: 'text', text: msg.content },
            ...fileContents
          ]
        };
      }
      return msg;
    });

    // Generate streaming response for non-thinking mode
    try {
      const result = await streamText({
        model: modelR1,
        messages: messagesWithFiles,
        ...thinkingConfig,
      });

      console.log('Stream result created');
      console.log('Result type:', typeof result);
      console.log('Result methods:', Object.getOwnPropertyNames(result));

      // Return the streaming response in AI SDK format for non-thinking mode
      return result.toTextStreamResponse();
    } catch (error: any) {
      console.error('Error in streaming response:', error);
      
      // Handle API rate limits and other errors gracefully
      let errorMessage = 'I encountered an error while processing your request.';
      
      if (error.statusCode === 429 || error.message?.includes('quota')) {
        errorMessage = `I'm currently experiencing high demand and can't process your request right now. This is likely due to API rate limits. 

**What you can do:**
- Try again in a few minutes
- Check your API key configuration
- Consider upgrading your API plan if you're hitting limits

For now, I can still help with general questions that don't require real-time data.`;
      } else {
        errorMessage = `I encountered an error while processing your request: ${error.message || 'Unknown error'}. 

Please try again, and if the problem persists, check your API configuration.`;
      }

      // Create a simple error response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const chunks = errorMessage.split(' ');
          let index = 0;
          
          const sendChunk = () => {
            if (index < chunks.length) {
              const chunk = chunks[index] + (index < chunks.length - 1 ? ' ' : '');
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text-delta', textDelta: chunk })}\n\n`));
              index++;
              setTimeout(sendChunk, 50);
            } else {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              controller.close();
            }
          };
          
          sendChunk();
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      });
    }
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response', details: (error as Error).message },
      { status: 500 }
    );
  }
}
