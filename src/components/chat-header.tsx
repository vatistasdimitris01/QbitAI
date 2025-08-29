'use client';

import { Menu, SquarePen } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { ModelSelector } from './model-selector';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatHeaderProps {
  onMenuClick?: () => void;
  onNewChat?: () => void;
  currentModel: 'auto' | 'qbit R1' | 'qbit R2';
  onModelChange: (model: 'auto' | 'qbit R1' | 'qbit R2') => void;
}

export function ChatHeader({
  onMenuClick,
  onNewChat,
  currentModel,
  onModelChange,
}: ChatHeaderProps) {
  const isMobile = useIsMobile();

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left side - Menu button on mobile */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <button 
              onClick={onMenuClick}
              className="text-foreground p-1 focus:outline-none focus:ring-0"
            >
              <Menu size={18} />
            </button>
          )}
        </div>
        
        {/* Center - App title */}
        <div className="text-center">
          <h1 className="text-lg font-semibold text-foreground">qbit</h1>
        </div>
        
        {/* Right side - New chat button (mobile only) and theme toggle */}
        <div className="flex items-center gap-2">
          {/* New chat button - show only on mobile */}
          {isMobile && (
            <button 
              onClick={handleNewChat}
              className="text-foreground p-1 focus:outline-none focus:ring-0"
            >
              <SquarePen size={18} />
            </button>
          )}
          
          {/* Theme toggle - only show on desktop */}
          <div className="hidden md:flex items-center gap-2">

            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
