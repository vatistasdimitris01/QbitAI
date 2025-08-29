import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

const model = google('gemini-2.5-flash');

export async function POST(req: NextRequest) {
  try {
    const { messages, language = 'en' } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ title: 'New Chat' });
    }

    // Check if API key is configured
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY === 'your_google_api_key_here') {
      // Fallback title generation
      const firstMessage = messages[0];
      return NextResponse.json({ 
        title: firstMessage.content.slice(0, 30) + '...' 
      });
    }

    // Create a prompt for title generation
    const languagePrompts = {
      en: 'Generate a short, descriptive title (max 40 characters) for this conversation based on the first few messages. Return only the title, nothing else.',
      el: 'Δημιούργησε έναν σύντομο, περιγραφικό τίτλο (μέγιστο 40 χαρακτήρες) για αυτή τη συνομιλία βάσει των πρώτων μηνυμάτων. Επέστρεψε μόνο τον τίτλο, τίποτα άλλο.',
      es: 'Genera un título corto y descriptivo (máximo 40 caracteres) para esta conversación basado en los primeros mensajes. Devuelve solo el título, nada más.',
      de: 'Generiere einen kurzen, beschreibenden Titel (maximal 40 Zeichen) für dieses Gespräch basierend auf den ersten Nachrichten. Gib nur den Titel zurück, nichts anderes.',
      ru: 'Создайте короткий, описательный заголовок (максимум 40 символов) для этого разговора на основе первых сообщений. Верните только заголовок, ничего больше.',
      zh: '根据前几条消息为这次对话生成一个简短、描述性的标题（最多40个字符）。只返回标题，不要其他内容。',
      fr: 'Générez un titre court et descriptif (maximum 40 caractères) pour cette conversation basé sur les premiers messages. Retournez seulement le titre, rien d\'autre.',
    };

    const prompt = languagePrompts[language as keyof typeof languagePrompts] || languagePrompts.en;
    
    const messageContent = messages
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join('\n')
      .slice(0, 500); // Limit content length

    const { text } = await generateText({
      model,
      prompt: `${prompt}\n\nConversation:\n${messageContent}`,
    });

    // Clean up the title
    const title = text.trim().replace(/^["']|["']$/g, '').slice(0, 40);

    return NextResponse.json({ title: title || 'New Chat' });

  } catch (error) {
    console.error('Error generating title:', error);
    return NextResponse.json({ title: 'New Chat' });
  }
}
