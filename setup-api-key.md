# 🔑 Google AI API Key Setup Guide

## Step 1: Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Update Environment File

1. Open `ai-chat-app/.env.local`
2. Replace the placeholder with your actual API key:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyC...your_actual_key_here
```

## Step 3: Restart the Server

1. Stop the current server (Ctrl+C)
2. Run `npm run dev` again

## Step 4: Test

1. Open http://localhost:3000
2. Switch to "qbit R1" model
3. Send a message
4. You should see actual AI thinking and responses!

## Troubleshooting

- **"API key found but invalid"**: Make sure you copied the full API key
- **"No API key configured"**: Check that `.env.local` exists and has the correct format
- **Still showing mock responses**: Restart the server after updating the API key

## Example .env.local

```bash
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
```

⚠️ **Important**: Never commit your API key to version control!
