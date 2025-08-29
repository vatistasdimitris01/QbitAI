import { NextRequest, NextResponse } from 'next/server';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  favicon?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Check if API keys are configured
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (!apiKey || !searchEngineId) {
      return NextResponse.json({ 
        error: 'Google Search API not configured',
        results: []
      });
    }

    // Perform Google Custom Search
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&num=5`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!response.ok) {
      console.error('Google Search API error:', data);
      return NextResponse.json({ 
        error: 'Search failed',
        results: []
      });
    }

    // Process results and fetch favicons
    const results: SearchResult[] = [];
    
    if (data.items) {
      for (const item of data.items) {
        const favicon = await getFavicon(item.link);
        
        results.push({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          favicon: favicon
        });
      }
    }

    return NextResponse.json({ results });

  } catch (error) {
    console.error('Web search error:', error);
    return NextResponse.json({ 
      error: 'Search failed',
      results: []
    });
  }
}

async function getFavicon(url: string): Promise<string | undefined> {
  try {
    const domain = new URL(url).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    
    // Test if favicon exists
    const response = await fetch(faviconUrl);
    if (response.ok) {
      return faviconUrl;
    }
  } catch (error) {
    console.error('Favicon fetch error:', error);
  }
  
  return undefined;
}
