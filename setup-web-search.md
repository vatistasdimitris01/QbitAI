# 🔍 Web Search Setup Guide

## Step 1: Get Google Search API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Custom Search API"
4. Go to "Credentials" and create an API key
5. Copy the API key

## Step 2: Create Custom Search Engine

1. Visit [Google Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click "Create a search engine"
3. Enter any website (e.g., `google.com`) in "Sites to search"
4. Give it a name and description
5. Click "Create"
6. Go to "Setup" and copy the Search Engine ID

## Step 3: Update Environment File

Add these to your `.env.local`:

```bash
GOOGLE_SEARCH_API_KEY=your_google_search_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
```

## Step 4: Restart Server

```bash
npm run dev
```

## Features

- **Automatic Web Search**: AI detects when web search is needed
- **Favicon Display**: Shows website icons in search results
- **Live Status**: Real-time updates during search and generation
- **Source Integration**: Web results are included in AI responses

## Supported Queries

The AI will automatically use web search for queries containing:
- Weather, news, current events
- Prices, stocks, markets
- Restaurants, hotels, bookings
- Sports scores, live events
- And other time-sensitive information
