'use client';

import { Search, Settings, MoreHorizontal, X, Menu, Trash2, SquarePen } from 'lucide-react';
import { useState } from 'react';

interface ChatSession {
  id: string;
  title: string;
  messages: Array<{ id: string; type: string; content: string }>;
  createdAt: Date;
  updatedAt: Date;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onNewChat: () => void;
  sessions: ChatSession[];
  currentSessionId: string;
  onSessionSelect: (sessionId: string) => void;
  onRemoveSession: (sessionId: string) => void;
  t: (key: keyof typeof import('@/lib/translations').translations.en) => string;
}

export function Sidebar({ isOpen, onClose, onOpen, onNewChat, sessions, currentSessionId, onSessionSelect, onRemoveSession, t }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Closed sidebar click area - only visible when closed */}
      {!isOpen && (
        <div 
          className="fixed inset-y-0 left-0 z-30 w-16 bg-transparent cursor-pointer md:hidden"
          onClick={onOpen}
        />
      )}

      {/* Toggle button - positioned outside sidebar */}
      <button 
        onClick={isOpen ? onClose : onOpen}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background text-foreground transition-all duration-200 border border-border/50"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <div className="relative w-5 h-5">
          <Menu 
            size={20} 
            className={`absolute inset-0 transition-all duration-200 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
          />
          <X 
            size={20} 
            className={`absolute inset-0 transition-all duration-200 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
          />
        </div>
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-background/95 backdrop-blur-sm transform transition-transform duration-200 ease-in-out border-r border-border/50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full relative pt-16">
          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={onNewChat}
              className="w-full flex items-center gap-3 p-3 text-foreground hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
            >
              <SquarePen size={16} />
              <span className="font-medium">{t('newChat')}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder={t('searchChats')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-transparent border border-border/50 rounded-lg text-sm text-foreground placeholder-muted-foreground outline-none focus:border-border transition-colors"
              />
            </div>
          </div>

          {/* Chat Sessions */}
          <div className="flex-1 px-4 overflow-y-auto">
            <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">{t('recentChats')}</h3>
            <div className="space-y-1">
              {filteredSessions.length === 0 ? (
                <div className="text-sm text-muted-foreground py-2">
                  {t('noConversations')}
                </div>
              ) : (
                filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group text-sm text-foreground hover:bg-muted/30 rounded-lg px-3 py-2 transition-colors ${
                      session.id === currentSessionId ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => onSessionSelect(session.id)}
                      >
                        <div className="font-medium truncate">{session.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(session.updatedAt)}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveSession(session.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted/50 rounded transition-all duration-200"
                        title={t('removeChat')}
                      >
                        <Trash2 size={14} className="text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-3 text-sm text-foreground hover:text-muted-foreground transition-colors">
                <Settings size={16} />
                {t('settings')}
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
