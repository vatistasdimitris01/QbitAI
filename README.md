# AI Chat App

A modern AI chat application built with Next.js, TypeScript, and Tailwind CSS. This app features both light and dark themes with a beautiful, mobile-first interface that matches the exact design from the provided images.

## Features

- **Dual Theme Support**: Light and dark themes with smooth transitions
- **Theme Toggle**: Easy switching between light and dark modes
- **Collapsible Sidebar**:
  - **Search Bar**: With magnifying glass icon and cancel button
  - **Navigation Item**: "pocket" with circular icon and selected state
  - **Today Section**: List of recent conversations
  - **Settings**: Gear icon with more options (three dots)
  - **Responsive**: Slides in from left on mobile, fixed on desktop
- **Chat Interface**: Real-time chat with user and AI messages
- **Thought Process**: Expandable AI thought process boxes
- **Sources Popup**: Centered modal that opens when clicking the sources button
- **Interactive Elements**: 
  - Upload file button (+ icon) - positioned outside input bar
  - Send button (arrow up icon) - changes opacity when disabled
  - Action buttons (copy, audio, thumbs up/down, regenerate)
  - Sources button - opens popup with all sources
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Smooth Animations**: For sidebar, sources popup, and other UI elements

## Design Elements

The app exactly matches the provided images with:

- **Sidebar**: 
  - Search bar with magnifying glass and cancel button
  - "pocket" navigation item with circular icon
  - "Today" section with conversation history
  - Settings with gear icon and three dots
- **Header**: Hamburger menu, app title with chevron, theme toggle, new chat button
- **Chat Bubbles**: Rounded message bubbles with proper alignment
- **Thought Boxes**: Expandable AI reasoning with "Tap to read my mind"
- **Input Bar**: Compact input field with external upload button and arrow up send button
- **Sources Popup**: Centered modal with source list and clickable links
- **Color Schemes**: 
  - Light theme: White background with dark text and gray accents
  - Dark theme: Black background with white text and gray accents

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

- **Switch Themes**: Tap the sun/moon icon in the header to toggle between light and dark themes
- **Open Sidebar**: Tap the hamburger menu icon in the header
- **Search**: Use the search bar in the sidebar to find conversations
- **Send Messages**: Type in the input bar and press Enter or tap the arrow up button
- **View AI Thoughts**: Tap on the "Thought for X seconds" box to see AI reasoning
- **View Sources**: Click the "Sources" button to see a popup with all sources
- **Upload Files**: Tap the + button outside the input bar (currently logs to console)
- **New Chat**: Tap the square icon in the header to start a new conversation

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS custom properties
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect, useRef)
- **Theme Management**: Local storage with CSS custom properties

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with ChatContainer
├── components/
│   ├── chat-container.tsx   # Main chat component with sidebar
│   ├── chat-header.tsx      # Header with menu, title, and theme toggle
│   ├── chat-input.tsx       # Input bar with external upload button
│   ├── chat-message.tsx     # Individual message component with sources
│   ├── sidebar.tsx          # Collapsible sidebar with search and navigation
│   ├── sources-popup.tsx    # Centered sources popup modal
│   └── theme-toggle.tsx     # Theme switching component
└── lib/
    └── utils.ts             # Utility functions
```

## Customization

### Colors
The app uses CSS custom properties for easy theming. Colors are defined in `globals.css`:

**Light Theme:**
- Background: `#ffffff` (white)
- Text: `#000000` (black)
- UI Elements: Various shades of gray
- Accents: Blue for links and sources

**Dark Theme:**
- Background: `#000000` (black)
- Text: `#ffffff` (white)
- UI Elements: Various shades of gray
- Accents: Blue for links and sources

### Adding AI Integration
To connect to a real AI service, modify the `handleSendMessage` function in `chat-container.tsx`:

```typescript
const handleSendMessage = async (content: string) => {
  // Add your AI API call here
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: content })
  });
  const aiResponse = await response.json();
  // Update messages with real AI response
};
```

## Future Enhancements

- Real AI integration (OpenAI, Anthropic, etc.)
- File upload functionality
- Voice input with speech recognition
- Message persistence
- User authentication
- Multiple chat threads
- Export conversations
- System theme detection
- More theme options
- Sidebar search functionality
- Conversation history management

## License

MIT License - feel free to use this project for your own AI chat applications!
