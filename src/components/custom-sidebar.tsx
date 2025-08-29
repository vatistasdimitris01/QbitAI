'use client';

import { useState, useRef } from 'react';
import { SquarePen, Settings, Trash2, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { vibrateButton, vibrateDropdown, vibrateSidebarOpen } from '@/lib/vibration';

interface ChatSession {
  id: string;
  title: string;
  messages: Array<{ id: string; type: string; content: string }>;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSessionSelect: (sessionId: string) => void;
  onRemoveSession: (sessionId: string) => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
  isOpen: boolean;
  onToggle: () => void;
  vibrationEnabled: boolean;
  t: (key: keyof typeof import('@/lib/translations').translations.en) => string;
}

export function CustomSidebar({
  sessions,
  currentSessionId,
  onSessionSelect,
  onRemoveSession,
  onNewChat,
  onOpenSettings,
  isOpen,
  onToggle,
  vibrationEnabled,
  t,
}: CustomSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const handleToggle = () => {
    if (!isOpen) {
      vibrateSidebarOpen(vibrationEnabled);
    } else {
      vibrateDropdown(vibrationEnabled);
    }
    onToggle();
  };

  // On mobile, if sidebar is closed, show only the toggle button
  if (isMobile && !isOpen) {
    return (
      <div className="fixed top-4 left-4 z-[60]">
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background text-foreground transition-colors duration-300 ease-in-out border border-border/50"
          title="Open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full bg-sidebar shadow-sm z-50
        ${isMobile ? 'fixed inset-y-0 left-0 w-[85%] transform transition-transform duration-500 ease-in-out' : isOpen ? 'w-64' : 'w-16'}
        ${isMobile && isOpen ? 'translate-x-0' : isMobile && !isOpen ? '-translate-x-full' : ''}
        ${!isMobile ? 'relative' : ''}
      `}
    >
      {/* Toggle / Logo Section */}
      <div className="flex items-center justify-between px-3 py-2">
        {isOpen && (
          <h2 className="text-base font-semibold text-sidebar-foreground tracking-tight">
            qbit
          </h2>
        )}
        <button
          onClick={handleToggle}
          className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-0"
          title={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-500 ease-in-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={() => {
              vibrateButton(vibrationEnabled);
              onNewChat();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-0
              ${!isOpen ? 'justify-center' : ''}
            `}
            title={!isOpen ? t('newChat') : undefined}
          >
            <SquarePen size={!isOpen ? 20 : 16} />
            {isOpen && (
              <span className="font-medium text-sm truncate">
                {t('newChat')}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        {isOpen ? (
          <div className="px-3 pb-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-accent-foreground"
                size={16}
              />
              <input
                type="text"
                placeholder={t('searchChats')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-transparent rounded-lg text-sm text-sidebar-foreground placeholder-sidebar-accent-foreground outline-none focus:outline-none focus:ring-0 focus:bg-sidebar-accent transition-colors"
                ref={searchInputRef}
              />
            </div>
          </div>
        ) : (
          <div className="px-3 pb-3">
            <button
              onClick={() => {
                handleToggle();
                setTimeout(() => {
                  searchInputRef.current?.focus();
                }, 300);
              }}
              className="w-full flex items-center justify-center p-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors focus:outline-none focus:ring-0"
              title={t('searchChats')}
            >
              <Search size={20} />
            </button>
          </div>
        )}

        {/* Chat List - Hidden when collapsed */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto px-2">
            <h3 className="px-2 text-xs font-semibold text-sidebar-accent-foreground mb-2">
              {t('recentChats')}
            </h3>
            <div className="space-y-1">
              {filteredSessions.length === 0 ? (
                <div className="text-sm text-sidebar-accent-foreground py-2 px-2">
                  {t('noConversations')}
                </div>
              ) : (
                filteredSessions.map(session => (
                  <div key={session.id} className="relative group">
                    <button
                      onClick={() => onSessionSelect(session.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors truncate
                        ${
                          session.id === currentSessionId
                            ? 'bg-sidebar-accent text-sidebar-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent'
                        }
                      `}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {session.title}
                        </div>
                      </div>
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onRemoveSession(session.id);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-sidebar-accent rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      title={t('removeChat')}
                    >
                      <Trash2
                        size={14}
                        className="text-sidebar-accent-foreground hover:text-sidebar-foreground"
                      />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 relative z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Settings button clicked');
            vibrateButton(vibrationEnabled);
            onOpenSettings();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            console.log('Settings button mouse down');
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors focus:outline-none focus:ring-0 cursor-pointer relative z-20 pointer-events-auto
            ${!isOpen ? 'justify-center' : ''}
          `}
          title={!isOpen ? t('settings') : undefined}
          style={{ pointerEvents: 'auto' }}
        >
          <Settings size={!isOpen ? 20 : 16} />
          {isOpen && <span className="text-sm">{t('settings')}</span>}
        </button>
      </div>
    </div>
  );
}
