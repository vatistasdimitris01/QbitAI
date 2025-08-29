'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './chat-header';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ModelSelector } from './model-selector';
import { CustomSidebar } from './custom-sidebar';
import { SourcesPopup } from './sources-popup';
import { SourcesDrawer } from './sources-drawer';
import { SettingsPopup } from './settings-popup';
import { LiveStatus } from './live-status';
import { MarkdownRenderer } from './markdown-renderer';
import { ShowMediaButton } from './show-media-button';
import { MediaCarousel } from './media-carousel';
import { LoadingAnimation } from './loading-animation';
import { useAppSettings } from '@/hooks/use-app-settings';
import { useIsMobile } from '@/hooks/use-mobile';
import { MediaFile } from '@/lib/file-utils';
import { vibrateStreamingTyping } from '@/lib/vibration';
import { ArrowDownCircle, ChevronDown, Eye } from 'lucide-react';
import { Conversation, ConversationContent, ConversationScrollButton } from './conversation';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  thoughtProcess?: string;
  thoughtTime?: number;
  codeExecution?: string;
  codeExecutionTime?: number;
  sources?: Array<{ title: string; url: string; favicon?: string }>;
  media?: MediaFile[];
  modelUsed?: string;
  timestamp: Date;
  responseTime?: number; // in milliseconds
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export function ChatContainer() {
  const { language, setLanguage, vibrationEnabled, setVibrationEnabled, t } = useAppSettings();
  const isMobile = useIsMobile();
  const [showSourcesPopup, setShowSourcesPopup] = useState(false);
  const [showSourcesDrawer, setShowSourcesDrawer] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [currentSources, setCurrentSources] = useState<Array<{ title: string; url: string; favicon?: string }>>([]);
  const [currentModel, setCurrentModel] = useState<'auto' | 'qbit' | 'qbit R1' | 'qbit R2'>('auto');

  const handleModelChange = (model: 'auto' | 'qbit' | 'qbit R1' | 'qbit R2') => {
    setCurrentModel(model);
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputBarPosition, setInputBarPosition] = useState<'center' | 'bottom'>('center');
  const [liveStatus, setLiveStatus] = useState<'searching' | 'thinking' | 'reading' | 'generating' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<{ title: string; url: string; favicon?: string }>>([]);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Closed by default on all devices
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([]);
  const [showMediaCarousel, setShowMediaCarousel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const lastStreamingVibration = useRef<number>(0);

  // No longer automatically open sidebar based on mobile state

  // Initialize with a new session
  useEffect(() => {
    if (!isInitialized) {
      const sessionId = Date.now().toString();
      const newSession: ChatSession = {
        id: sessionId,
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setSessions([newSession]);
      setCurrentSessionId(sessionId);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Add streaming vibration when AI is responding
  useEffect(() => {
    if (isMobile && vibrationEnabled) {
      const now = Date.now();
      // Only vibrate every 2 seconds during streaming to avoid too much vibration
      if (now - lastStreamingVibration.current > 2000) {
        vibrateStreamingTyping(vibrationEnabled);
        lastStreamingVibration.current = now;
      }
    }
  }, [isMobile, vibrationEnabled]);

  // Single welcome message per chat
  const welcomeMessage = t('welcome');

  // Move input bar to bottom after first message
  useEffect(() => {
    if (messages.length > 0 && inputBarPosition === 'center') {
      setInputBarPosition('bottom');
    }
  }, [messages.length, inputBarPosition]);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isGenerating) return;

    const startTime = Date.now();

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent.trim(),
      media: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
      modelUsed: currentModel,
      timestamp: new Date(),
    };

    // Log user message
    console.log('👤 User Message:', {
      content: messageContent.trim(),
      model: currentModel === 'auto' ? 'qbit R1' : currentModel,
      tool: currentModel === 'auto' || currentModel === 'qbit R1' ? 'thinking' : 'fast',
      timestamp: new Date().toISOString()
    });

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);
    setIsStreaming(true);

    // Create abort controller for this request
    const controller = new AbortController();
    setAbortController(controller);

    try {
      // Check if we need web search
      const needsWebSearch = await checkIfNeedsWebSearch(messageContent.trim());
      let webSearchPerformed = false;
      
      if (needsWebSearch) {
        setLiveStatus('searching');
        setSearchQuery(messageContent.trim());
        webSearchPerformed = true;
        
        // Perform web search
        const searchResponse = await fetch('/api/web-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: messageContent.trim() }),
          signal: controller.signal,
        });
        
        if (searchResponse.ok) {
          const { results } = await searchResponse.json();
          setSearchResults(results);
          setLiveStatus('reading');
          
          // Add sources to the message
          userMessage.sources = results;
        } else {
          // Even if search fails, mark that web search was attempted
          setSearchResults([]);
          setLiveStatus('reading');
          userMessage.sources = [];
        }
      }

      // Only show generating status (breathing ball) for generation
      setLiveStatus('generating');
      
      // Prepare message content with files
      const messageContentWithFiles = uploadedFiles.length > 0 
        ? [
            {
              type: 'text',
              text: messageContent.trim(),
            },
            ...uploadedFiles.map(file => ({
              type: 'file',
              data: file.data,
              mediaType: file.mediaType,
            }))
          ]
        : messageContent.trim();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content,
            })),
            {
              role: 'user',
              content: messageContentWithFiles,
            },
          ],
          modelType: currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2' ? 'thinking' : 'fast',
          selectedModel: currentModel === 'auto' ? 'qbit R1' : currentModel,
          webSearchResults: searchResults,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let aiResponse = '';
      let thoughtProcess = '';
      let thoughtTime = 0;

      // Create AI message placeholder
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        type: 'ai',
        content: '',
        thoughtProcess: (currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2') ? '' : undefined,
        thoughtTime: (currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2') ? 0 : undefined,
        modelUsed: currentModel,
        timestamp: new Date(),
        sources: webSearchPerformed ? searchResults : undefined,
      };

      // Log AI response start
      console.log('🤖 AI Response Started:', {
        model: currentModel,
        tool: currentModel === 'qbit R1' || currentModel === 'qbit R2' ? 'thinking' : 'fast',
        timestamp: new Date().toISOString()
      });

      // Add AI message placeholder immediately
      setMessages(prev => [...prev, aiMessage]);

      // Read the streaming response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        console.log('Received chunk:', chunk);
        
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              console.log('Parsed data:', parsed);
              
              if (parsed.type === 'text-delta') {
                aiResponse += parsed.textDelta;
                // Update the AI message in real-time with sources
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: aiResponse, sources: webSearchPerformed ? searchResults : undefined }
                    : msg
                ));
              } else if (parsed.type === 'thinking') {
                // Handle thinking data
                thoughtProcess = parsed.content || '';
                thoughtTime = parsed.time || 2;
                
                console.log('🧠 Thinking Data Received:', {
                  type: parsed.type,
                  content: parsed.content,
                  time: parsed.time,
                  fullParsed: parsed
                });
                
                // Update thinking process in real-time
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, thoughtProcess, thoughtTime }
                    : msg
                ));
                
                // Log thinking process
                console.log('🧠 Thinking Process Updated:', {
                  thoughtProcess: thoughtProcess,
                  thoughtTime: thoughtTime,
                  model: currentModel,
                  timestamp: new Date().toISOString()
                });
              } else if (parsed.type === 'code-execution') {
                // Handle code execution results
                console.log('💻 Code Execution Result Received:', {
                  type: parsed.type,
                  content: parsed.content,
                  time: parsed.time,
                  fullParsed: parsed
                });
                
                // Store code execution results separately
                const codeExecutionContent = parsed.content || '';
                const codeExecutionTime = parsed.time || 0;
                
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { 
                        ...msg, 
                        codeExecution: codeExecutionContent,
                        codeExecutionTime: codeExecutionTime,
                        sources: webSearchPerformed ? searchResults : undefined 
                      }
                    : msg
                ));
              } else if (parsed.type === 'text') {
                // Handle direct text response
                aiResponse = parsed.text || '';
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: aiResponse, sources: webSearchPerformed ? searchResults : undefined }
                    : msg
                ));
              }
            } catch (e) {
              console.log('Parse error:', e, 'for data:', data);
              // Try to handle plain text response
              if (data && data.trim() && !data.startsWith('{')) {
                aiResponse += data;
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: aiResponse, sources: webSearchPerformed ? searchResults : undefined }
                    : msg
                ));
              }
            }
          } else if (line.trim() && !line.startsWith('data:')) {
              // Handle plain text response
              aiResponse += line;
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { ...msg, content: aiResponse, sources: webSearchPerformed ? searchResults : undefined }
                  : msg
              ));

            }
        }
      }

      // Only show thinking if actual thinking data was received
      if ((currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2') && !thoughtProcess) {
        console.log('🧠 No thinking data received for', currentModel);
      }

      // Log final AI response
      console.log('🤖 AI Response Complete:', {
        content: aiResponse,
        thinking: (currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2') ? thoughtProcess : 'N/A',
        thoughtTime: (currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2') ? thoughtTime : 'N/A',
        model: currentModel === 'auto' ? 'qbit R1' : currentModel,
        tool: (currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2') ? 'thinking' : 'fast',
        timestamp: new Date().toISOString()
      });

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Clear uploaded files after sending message
      setUploadedFiles([]);

      // Final update to session with thinking process and response time
      setMessages(prev => {
        const finalMessages = prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, thoughtProcess, thoughtTime, responseTime, sources: webSearchPerformed ? searchResults : undefined }
            : msg
        );
        updateSession(finalMessages);
        return finalMessages;
      });

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Don't add error message if it was aborted
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was aborted by user');
      } else {
        // Add error message with more details
        let errorContent = `Error: ${(error as Error).message}. `;
        
        // Add specific guidance based on error type
        if ((error as Error).message.includes('Failed to get response')) {
          errorContent += `\n\n**This usually means:**\n• Your Google AI API key is invalid or expired\n• You've exceeded your API quota\n• There's a network connectivity issue\n\n**To fix this:**\n1. Get a new API key from https://makersuite.google.com/app/apikey\n2. Update your .env.local file\n3. Restart the development server`;
        }
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: errorContent,
          modelUsed: currentModel,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsGenerating(false);
    setIsStreaming(false);
       setLiveStatus(null);
      setAbortController(null);
    }
  };

  const updateSession = async (newMessages: Message[]) => {
    const title = await generateChatTitle(newMessages);
    setSessions(prev => prev.map(session => 
      session.id === currentSessionId 
        ? {
            ...session,
            messages: newMessages,
            updatedAt: new Date(),
            title: title,
          }
        : session
    ));
  };

  const createNewChat = () => {
    const sessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: sessionId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(sessionId);
    setMessages([]);
  };

  const loadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
    }
  };

  const handleUploadFile = () => {
    console.log('Upload file clicked');
  };

  const handleShowSources = () => {
    // Get sources from the last AI message
    const lastAIMessage = messages.filter(msg => msg.type === 'ai').pop();
    if (lastAIMessage?.sources) {
      setCurrentSources(lastAIMessage.sources);
    }
    // Show popup on desktop, drawer on mobile
    if (window.innerWidth >= 768) {
      setShowSourcesPopup(true);
    } else {
      setShowSourcesDrawer(true);
    }
  };



  const handleRegenerate = async (messageId: string) => {
    // Find the message to regenerate
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1 || messageIndex === 0) return; // Can't regenerate first message or user message
    
    // Get the user message that prompted this AI response
    const userMessage = messages[messageIndex - 1];
    if (userMessage.type !== 'user') return;
    
    console.log('🔄 Regenerating AI response for message:', messageId);
    console.log('Original AI message content:', messages[messageIndex].content);
    console.log('Regenerating from user message:', userMessage.content);
    
    // Remove the current AI message and all messages after it
    setMessages(prev => prev.slice(0, messageIndex));
    
    // Generate new response for the same user message without logging user message again
    await handleRegenerateResponse(userMessage);
  };

  const handleRegenerateResponse = async (userMessage: Message) => {
    if (isGenerating) return;

    const startTime = Date.now();
    setIsGenerating(true);
    setLiveStatus('generating');

    // Prepare message content with files
    const messageContentWithFiles = userMessage.media && userMessage.media.length > 0 
      ? [
          {
            type: 'text',
            text: userMessage.content.trim(),
          },
          ...userMessage.media.map(file => ({
            type: 'file',
            data: file.data,
            mediaType: file.mediaType,
          }))
        ]
      : userMessage.content.trim();

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.filter(msg => msg.id !== userMessage.id).map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content,
            })),
            {
              role: 'user',
              content: messageContentWithFiles,
            },
          ],
          modelType: (currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2') ? 'thinking' : 'fast',
        selectedModel: currentModel === 'auto' ? 'qbit R1' : currentModel,
          webSearchResults: searchResults,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      // Create new AI message
      const aiMessageId = Date.now().toString();
      const aiMessage: Message = {
        id: aiMessageId,
        type: 'ai',
        content: '',
        thoughtProcess: currentModel === 'qbit R1' || currentModel === 'qbit R2' ? '' : undefined,
        thoughtTime: currentModel === 'qbit R1' || currentModel === 'qbit R2' ? 0 : undefined,
        modelUsed: currentModel,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);

      let aiResponse = '';
      let thoughtProcess = '';
      let thoughtTime = 0;
      let codeExecution = '';
      let codeExecutionTime = 0;
      let webSearchPerformed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.type === 'text-delta') {
                aiResponse += parsed.textDelta;
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: aiResponse }
                    : msg
                ));
              } else if (parsed.type === 'thinking-delta') {
                thoughtProcess += parsed.thinkingDelta;
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, thoughtProcess }
                    : msg
                ));
              } else if (parsed.type === 'thinking-time') {
                thoughtTime = parsed.thinkingTime;
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, thoughtTime }
                    : msg
                ));
              } else if (parsed.type === 'web-search-performed') {
                webSearchPerformed = true;
              } else if (parsed.type === 'code-execution') {
                // Handle code execution results
                codeExecution = parsed.content || '';
                codeExecutionTime = parsed.time || 0;
                
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, codeExecution, codeExecutionTime }
                    : msg
                ));
              } else if (parsed.type === 'sources') {
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: aiResponse, sources: parsed.sources }
                    : msg
                ));
              }
            } catch (e) {
              // Handle plain text response
              if (line.trim() && !line.startsWith('data:')) {
                aiResponse += line;
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: aiResponse, sources: webSearchPerformed ? searchResults : undefined }
                    : msg
                ));
              }
            }
          } else if (line.trim() && !line.startsWith('data:')) {
            // Handle plain text response
            aiResponse += line;
            setMessages(prev => prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, content: aiResponse, sources: webSearchPerformed ? searchResults : undefined }
                : msg
            ));
          }
        }
      }

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Final update to session with thinking process and response time
      setMessages(prev => {
        const finalMessages = prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, thoughtProcess, thoughtTime, codeExecution, codeExecutionTime, responseTime, sources: webSearchPerformed ? searchResults : undefined }
            : msg
        );
        updateSession(finalMessages);
        return finalMessages;
      });

    } catch (error) {
      console.error('Error regenerating response:', error);
      
      // Don't add error message if it was aborted
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was aborted by user');
      } else {
        // Add error message with more details
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `Error: ${(error as Error).message}. Please check your API key and try again.`,
          modelUsed: currentModel,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsGenerating(false);
      setLiveStatus(null);
      setAbortController(null);
    }
  };

  const handleRemoveSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    
    // If we're removing the current session, switch to the first available session
    if (sessionId === currentSessionId) {
      const remainingSessions = sessions.filter(session => session.id !== sessionId);
      if (remainingSessions.length > 0) {
        setCurrentSessionId(remainingSessions[0].id);
        setMessages(remainingSessions[0].messages);
      } else {
        // Create a new session if no sessions remain
        createNewChat();
      }
    }
  };

  const checkIfNeedsWebSearch = async (query: string): Promise<boolean> => {
    // Enhanced heuristic: check if query contains time-sensitive or current event keywords
    const webSearchKeywords = [
      'weather', 'news', 'today', 'latest', 'current', 'recent', 'now', 'live',
      'price', 'stock', 'market', 'covid', 'election', 'sports', 'score',
      'restaurant', 'hotel', 'booking', 'flight', 'movie', 'show', 'event',
      'temperature', 'forecast', 'conditions', 'update', 'breaking', 'headlines',
      'results', 'scores', 'standings', 'schedule', 'tickets', 'availability'
    ];
    
    const lowerQuery = query.toLowerCase();
    return webSearchKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  const enhanceSearchQuery = (query: string): string => {
    // Make search queries more specific and intelligent
    const lowerQuery = query.toLowerCase();
    
    // For weather queries, add "weather" if not present and specify location
    if (lowerQuery.includes('weather') || lowerQuery.includes('temperature') || lowerQuery.includes('forecast')) {
      if (!lowerQuery.includes('weather')) {
        query = `weather ${query}`;
      }
      
      // If it's a city name without country, try to be more specific
      if (lowerQuery.includes('athens') && !lowerQuery.includes('greece') && !lowerQuery.includes('georgia') && !lowerQuery.includes('pennsylvania')) {
        // Default to Athens, Greece for weather queries unless specified otherwise
        query = query.replace(/\bathens\b/i, 'Athens Greece');
      }
    }
    
    return query;
  };

  const generateChatTitle = async (messages: Message[]) => {
    if (messages.length === 0) return 'New Chat';
    
    try {
      const response = await fetch('/api/generate-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.slice(0, 3), // Use first 3 messages for title generation
          language: language,
        }),
      });

      if (response.ok) {
        const { title } = await response.json();
        return title;
      }
    } catch (error) {
      console.error('Error generating title:', error);
    }

    // Fallback: use first user message
    const firstUserMessage = messages.find(msg => msg.type === 'user');
    return firstUserMessage ? firstUserMessage.content.slice(0, 30) + '...' : 'New Chat';
  };

  const handleStopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsGenerating(false);
    setIsStreaming(false);
    setLiveStatus(null);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileUpload = (files: MediaFile[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    if (uploadedFiles.length === 1) {
      setShowMediaCarousel(false);
    }
  };

  const handleShowMedia = () => {
    setShowMediaCarousel(true);
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    // Find the message index
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    // Update the message content
    setMessages(prev => prev.map((msg, index) => 
      index === messageIndex 
        ? { ...msg, content: newContent }
        : msg
    ));

    // Remove all messages after this one
    setMessages(prev => prev.slice(0, messageIndex + 1));

    // Regenerate the AI response
    handleRegenerateResponse(messages[messageIndex]);
  };

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

  const handleStartEdit = (messageId: string, content: string) => {
    setIsEditing(true);
    setEditContent(content);
    setEditingMessageId(messageId);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent('');
    setEditingMessageId(null);
  };

  const handleConfirmEdit = (newContent: string) => {
    if (!editingMessageId) return;

    // Find the message to edit by ID
    const messageIndex = messages.findIndex(msg => msg.id === editingMessageId);
    if (messageIndex === -1) return;

    // Update the message content
    setMessages(prev => prev.map((msg, index) => 
      index === messageIndex 
        ? { ...msg, content: newContent }
        : msg
    ));

    // Remove all messages after this one
    setMessages(prev => prev.slice(0, messageIndex + 1));

    // Regenerate the AI response
    handleRegenerateResponse(messages[messageIndex]);

    // Exit edit mode
    setIsEditing(false);
    setEditContent('');
    setEditingMessageId(null);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay for sidebar */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleToggleSidebar}
        />
      )}
      
      {/* Custom Sidebar */}
      <CustomSidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSessionSelect={loadSession}
        onRemoveSession={handleRemoveSession}
        onNewChat={createNewChat}
        onOpenSettings={() => setShowSettingsPopup(true)}
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
        vibrationEnabled={vibrationEnabled}
        t={t}
      />
      
      {/* Main content area - always takes full width */}
      <div className="w-full flex flex-col">
        <ChatHeader 
          onNewChat={createNewChat}
          onMenuClick={handleToggleSidebar}
          currentModel={currentModel}
          onModelChange={handleModelChange}
        />
        
        <Conversation className="flex-1 overflow-y-auto relative z-0" style={{ height: '100%' }}>
          <ConversationContent>
            <div className="max-w-4xl mx-auto px-4 pb-24">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center min-h-[60vh] md:min-h-[80vh]">
                  <div className="text-center max-w-2xl mx-auto welcome-message px-4">
                    <div className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 transition-all duration-500 text-foreground leading-tight">
                      {welcomeMessage}
         
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 space-y-6">
                  {messages.map((message, index) => (
                    <div key={message.id}>
                    {/* Show uploaded files above user messages */}
                    {message.type === 'user' && message.media && message.media.length > 0 && (
                      <div className="flex justify-end mb-3">
                        <div className="flex flex-col items-end gap-2 max-w-md">
                          {/* File count and view all button */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {message.media.length} file{message.media.length > 1 ? 's' : ''} attached
                            </span>
                            {message.media.length > 1 && (
                              <button
                                onClick={handleShowMedia}
                                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-0"
                              >
                                <Eye size={12} />
                                View all
                              </button>
                            )}
                          </div>
                          
                          {/* File thumbnails */}
                          <div className="flex gap-2">
                            {message.media.slice(0, 3).map((file) => (
                              <div key={file.id} className="flex-shrink-0">
                                {file.mediaType.startsWith('image/') ? (
                                  <img
                                    src={typeof file.data === 'string' ? file.data : URL.createObjectURL(new Blob([file.data]))}
                                    alt={file.name}
                                    className="w-12 h-12 object-cover rounded-lg border border-border/50"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-muted rounded-lg border border-border/50 flex items-center justify-center text-xs">
                                    {file.mediaType.startsWith('video/') ? '🎥' : 
                                     file.mediaType.includes('pdf') ? '📄' : 
                                     file.mediaType.includes('text') || file.mediaType.includes('code') ? '📝' : '📁'}
                                  </div>
                                )}
                              </div>
                            ))}
                            {message.media.length > 3 && (
                              <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg border border-border/50 flex items-center justify-center text-xs text-muted-foreground">
                                +{message.media.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <ChatMessage
                      id={message.id}
                      type={message.type}
                      content={message.content}
                      timestamp={message.timestamp}
                      thinking={message.thoughtProcess}
                      codeExecution={message.codeExecution}
                      codeExecutionTime={message.codeExecutionTime}
                      sources={message.sources}
                      media={message.media}
                      currentModel={currentModel}
                      onRegenerate={message.type === 'ai' ? () => handleRegenerate(message.id) : undefined}
                      onShowSources={message.sources && message.sources.length > 0 ? handleShowSources : undefined}
                      onShowMedia={message.media && message.media.length > 0 ? handleShowMedia : undefined}
                      onEditMessage={message.type === 'user' ? handleStartEdit : undefined}
                      responseTime={message.responseTime}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Loading Animation */}
            {isGenerating && (
              <LoadingAnimation />
            )}
            </div>
          </ConversationContent>
        {isGenerating && (
          <ConversationScrollButton />
        )}
      </Conversation>
        
      {/* Input Bar - Positioned based on state */}
      <div className={`transition-all duration-500 ease-in-out ${
        inputBarPosition === 'center' && messages.length === 0 
          ? 'absolute inset-0 flex items-center justify-center pointer-events-none z-20' 
          : 'relative z-10'
      }`}>
          <div className={`transition-all duration-500 ease-in-out ${
            (inputBarPosition === 'center' && messages.length === 0) 
              ? 'w-full max-w-2xl px-4 pointer-events-auto' 
              : 'w-full'
          }`}>
            <ChatInput 
              onSendMessage={handleSendMessage}

              onStopGeneration={handleStopGeneration}
              onEditMessage={handleConfirmEdit}
              onCancelEdit={handleCancelEdit}
              onEditContentChange={setEditContent}
              isGenerating={isGenerating}
              isEditing={isEditing}
              editContent={editContent}
              vibrationEnabled={vibrationEnabled}
              t={t}
              currentModel={currentModel}
              onModelChange={handleModelChange}
            />
          </div>
        </div>
      </div>
      
      <SourcesPopup 
        sources={currentSources}
        isVisible={showSourcesPopup}
        onClose={() => setShowSourcesPopup(false)}
        t={t}
      />
      <SourcesDrawer 
        sources={currentSources}
        isVisible={showSourcesDrawer}
        onClose={() => setShowSourcesDrawer(false)}
        t={t}
      />

      <SettingsPopup
        isVisible={showSettingsPopup}
        onClose={() => setShowSettingsPopup(false)}
        currentLanguage={language}
        onLanguageChange={setLanguage}
        vibrationEnabled={vibrationEnabled}
        onVibrationChange={setVibrationEnabled}
        t={t}
      />

      {/* Media Components */}
      <ShowMediaButton 
        files={uploadedFiles}
        onShowMedia={handleShowMedia}
      />
      
      <MediaCarousel
        files={uploadedFiles}
        isVisible={showMediaCarousel}
        onClose={() => setShowMediaCarousel(false)}
        onRemoveFile={handleRemoveFile}
      />
    </div>
  );
}