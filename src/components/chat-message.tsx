'use client';

import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2, BookOpen, Eye, Image, Video, FileText, Code, File, Edit, X, Check, CheckCheck, ChevronRight, ChevronDown } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { LiveStatus } from './live-status';
import { useState } from 'react';
import { translations } from '@/lib/translations';
import React from 'react';
import { MediaFile } from '@/lib/file-utils';

interface ChatMessageProps {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  thinking?: string;
  codeExecution?: string;
  codeExecutionTime?: number;
  sources?: Array<{
    title: string;
    url: string;
    favicon?: string;
    snippet?: string;
  }>;
  media?: MediaFile[];
  currentModel: 'auto' | 'qbit' | 'qbit R1' | 'qbit R2';
  onRegenerate?: () => void;
  onShowSources?: () => void;
  onShowMedia?: () => void;
  onEditMessage?: (id: string, newContent: string) => void;
  responseTime?: number; // in milliseconds
}

export function ChatMessage({
  id,
  type,
  content,
  timestamp,
  thinking,
  codeExecution,
  codeExecutionTime,
  sources,
  media,
  currentModel,
  onRegenerate,
  onShowSources,
  onShowMedia,
  onEditMessage,
  responseTime
}: ChatMessageProps) {

  const [isCodeExecutionExpanded, setIsCodeExecutionExpanded] = useState(false);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [copied, setCopied] = useState(false);
  const t = (key: keyof typeof translations.en) => translations.en[key];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const getFileIcon = (mediaType: string) => {
    if (mediaType.startsWith('image/')) return <Image size={16} />;
    if (mediaType.startsWith('video/')) return <Video size={16} />;
    if (mediaType.includes('text') || mediaType.includes('markdown') || mediaType.includes('code')) return <Code size={16} />;
    if (mediaType.includes('pdf')) return <FileText size={16} />;
    return <File size={16} />;
  };

  const handleEdit = () => {
    onEditMessage?.(id, content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleConfirmEdit = () => {
    if (editContent.trim() !== content) {
      onEditMessage?.(id, editContent.trim());
    }
    setIsEditing(false);
  };

  if (type === 'user') {
    return (
      <div className="flex flex-col items-end">
        <div className={`chat-bubble user-message ${isEditing ? 'bg-muted rounded-xl p-4' : ''}`}>
          {isEditing ? (
            <textarea
              className="w-full bg-transparent text-foreground resize-none outline-none"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={editContent.split('\n').length}
            />
          ) : (
            <div className="text-foreground">
              {content}
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="flex items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleConfirmEdit}
            >
              Send
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 mt-2">
            <button 
              className="p-1 hover:bg-muted transition-colors rounded focus:outline-none focus:ring-0"
              onClick={() => {
                navigator.clipboard.writeText(content);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              title="Copy message"
            >
              {copied ? <CheckCheck size={14} className="text-green-500" /> : <Copy size={14} className="text-muted-foreground hover:text-foreground" />}
            </button>
            
            <button 
              className="p-1 hover:bg-muted transition-colors rounded focus:outline-none focus:ring-0"
              onClick={() => setIsEditing(true)}
              title="Edit message"
            >
              <Edit size={14} className="text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* --- MODIFIED THINKING BOX START --- */}
      {thinking && (currentModel === 'auto' || currentModel === 'qbit R1' || currentModel === 'qbit R2') && (
        <details className="think-box relative mb-2 group">
          <summary className="list-none cursor-pointer focus:outline-none">
            <div className="flex flex-row items-center gap-1 flex-shrink-0 h-7 mt-3 mb-1 sm:mx-3 w-[calc(100%-40px)]">
              <div className="w-[24px] h-[24px] flex items-center justify-center relative group">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[2] -mt-[1px] text-gray-500 dark:text-gray-400 group-hover:opacity-0 transition-opacity"
                >
                  <path d="M15 16.1378L14.487 15.2794L14 15.5705V16.1378H15ZM8.99997 16.1378H9.99997V15.5705L9.51293 15.2794L8.99997 16.1378ZM18 9C18 11.4496 16.5421 14.0513 14.487 15.2794L15.5129 16.9963C18.1877 15.3979 20 12.1352 20 9H18ZM12 4C13.7598 4 15.2728 4.48657 16.3238 5.33011C17.3509 6.15455 18 7.36618 18 9H20C20 6.76783 19.082 4.97946 17.5757 3.77039C16.0931 2.58044 14.1061 2 12 2V4ZM5.99997 9C5.99997 7.36618 6.64903 6.15455 7.67617 5.33011C8.72714 4.48657 10.2401 4 12 4V2C9.89382 2 7.90681 2.58044 6.42427 3.77039C4.91791 4.97946 3.99997 6.76783 3.99997 9H5.99997ZM9.51293 15.2794C7.4578 14.0513 5.99997 11.4496 5.99997 9H3.99997C3.99997 12.1352 5.81225 15.3979 8.48701 16.9963L9.51293 15.2794ZM9.99997 19.5001V16.1378H7.99997V19.5001H9.99997ZM10.5 20.0001C10.2238 20.0001 9.99997 19.7763 9.99997 19.5001H7.99997C7.99997 20.8808 9.11926 22.0001 10.5 22.0001V20.0001ZM13.5 20.0001H10.5V22.0001H13.5V20.0001ZM14 19.5001C14 19.7763 13.7761 20.0001 13.5 20.0001V22.0001C14.8807 22.0001 16 20.8808 16 19.5001H14ZM14 16.1378V19.5001H16V16.1378H14Z" fill="currentColor"></path>
                  <path d="M9 16.0001H15" stroke="currentColor"></path>
                  <path d="M12 16V12" stroke="currentColor" strokeLinecap="square"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down text-gray-500 dark:text-gray-400">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="flex-1 overflow-hidden text-gray-500 dark:text-gray-400">
                <span className="truncate">Thought for {formatResponseTime(responseTime || 0)}</span>
              </div>
            </div>
          </summary>
          
          <div className="max-h-[50vh] relative">
            <div className="relative isolate w-full h-full bg-background dark:bg-muted overflow-hidden border border-border rounded-3xl max-h-[50vh] flex flex-col justify-end leading-7 pb-2 px-5 mt-2">
              <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                <div className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  <Streamdown 
                    parseIncompleteMarkdown={true}
                    className="prose prose-sm max-w-none dark:prose-invert text-sm"
                    components={{
                      code: ({ node, inline, className, children, ...props }: { node?: any, inline?: boolean, className: string, children: React.ReactNode }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        if (inline) { return <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono text-foreground" {...props}>{children}</code>; }
                        const code = String(children);
                        return (
                          <div className="my-4 relative group">
                            <pre className="p-4 bg-muted rounded-lg overflow-x-auto relative">
                              <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); }}></button>
                            </pre>
                          </div>
                        );
                      }
                    }}>
                    {thinking}
                  </Streamdown>
                </div>
              </div>
            </div>
          </div>
        </details>
      )}
      {/* --- MODIFIED THINKING BOX END --- */}

      {/* Code Execution Box */}
      {codeExecution && (currentModel === 'qbit R2' || (currentModel === 'auto' && codeExecution)) && (
        <div className="code-execution-box mb-3 cursor-pointer overflow-hidden" onClick={() => setIsCodeExecutionExpanded(!isCodeExecutionExpanded)}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-foreground">Code Execution</div>
              <div className="text-muted-foreground text-sm">Tap to see executed code and results</div>
            </div>
            <div className="text-foreground transition-transform duration-300">
              {isCodeExecutionExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
          </div>
          
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden relative z-30 ${
              isCodeExecutionExpanded ? 'max-h-[800px] opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="text-muted-foreground text-sm leading-relaxed">
              <Streamdown 
                parseIncompleteMarkdown={true}
                className="prose prose-sm max-w-none dark:prose-invert text-sm"
                components={{
                  code: ({ node, inline, className, children, ...props }: { node: any, inline?: boolean, className: string, children: React.ReactNode }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    if (inline) { return <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono text-foreground" {...props}>{children}</code>; }
                    const code = String(children);
                    return (
                      <div className="my-4 relative group">
                        <pre className="p-4 bg-muted rounded-lg overflow-x-auto relative">
                          <button onClick={() => navigator.clipboard.writeText(code)} className="absolute top-2 right-2 p-2 bg-background/80 hover:bg-background border border-border/50 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 z-10" title="Copy code">
                            <Copy size={14} className="text-foreground" />
                          </button>
                          {language && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-background/80 border border-border/50 rounded text-xs font-mono text-muted-foreground">
                              {language}
                            </div>
                          )}
                          <code className={`text-sm font-mono text-foreground block ${language ? 'pt-8' : ''} ${className}`} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                  p: ({ children, ...props }) => {
                    const hasCodeBlock = React.Children.toArray(children).some(child => React.isValidElement(child) && child.type === 'code' && !(child.props as any).inline);
                    if (hasCodeBlock) { return <>{children}</>; }
                    return <p className="text-foreground mb-2 leading-relaxed" {...props}>{children}</p>;
                  },
                }}
              >
                {codeExecution}
              </Streamdown>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Message */}
      <div className="chat-bubble ai-message">
        <div className="text-foreground leading-relaxed">
          <Streamdown 
            parseIncompleteMarkdown={true}
            className="prose prose-sm max-w-none dark:prose-invert text-sm"
            components={{
              code: ({ node, inline, className, children, ...props }: { node: any, inline?: boolean, className: string, children: React.ReactNode }) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                if (inline) { return <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono text-foreground" {...props}>{children}</code>; }
                const code = String(children);
                return (
                  <div className="my-4 relative group">
                    <pre className="p-4 bg-muted rounded-lg overflow-x-auto relative">
                      <button onClick={() => navigator.clipboard.writeText(code)} className="absolute top-2 right-2 p-2 bg-background/80 hover:bg-background border border-border/50 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 z-10" title="Copy code">
                        <Copy size={14} className="text-foreground" />
                      </button>
                      {language && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-background/80 border border-border/50 rounded text-xs font-mono text-muted-foreground">
                          {language}
                        </div>
                      )}
                      <code className={`text-sm font-mono text-foreground block ${language ? 'pt-8' : ''} ${className}`} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              },
              p: ({ children, ...props }) => {
                const containsBlockElement = React.Children.toArray(children).some(child => {
                  if (React.isValidElement(child)) {
                    if (child.type === 'div' || child.type === 'pre') { return true; }
                    if (child.props && child.props.children) {
                      return React.Children.toArray(child.props.children).some(grandchild => React.isValidElement(grandchild) && (grandchild.type === 'div' || grandchild.type === 'pre'));
                    }
                  }
                  return false;
                });
                if (containsBlockElement) { return <>{children}</>; }
                return <p className="text-foreground mb-2 leading-relaxed" {...props}>{children}</p>;
              },
            }}
          >
            {content}
          </Streamdown>
        </div>
      </div>
      
      {/* Message Actions */}
      <div className="flex items-center gap-1 mt-2">
        {responseTime && (<span className="text-xs text-muted-foreground mr-4">{formatResponseTime(responseTime)}</span>)}
        <button className="p-1 hover:bg-muted transition-colors rounded focus:outline-none focus:ring-0" onClick={() => { navigator.clipboard.writeText(content); }} title={t('copyMessage')}>
          <Copy size={16} className="text-muted-foreground hover:text-foreground" />
        </button>
        {onRegenerate && (
          <button className="p-1 hover:bg-muted transition-colors rounded focus:outline-none focus:ring-0" onClick={onRegenerate} title={t('regenerateResponse')}>
            <RotateCcw size={16} className="text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
      
      {/* Sources Button */}
      {sources && sources.length > 0 && (
        <div className="mt-3">
          <button onClick={() => onShowSources?.()} className="flex items-center gap-2 bg-muted rounded-full px-3 py-1 hover:bg-muted transition-colors focus:outline-none focus:ring-0">
            <div className="flex items-center gap-1">
              {sources.slice(0, 3).map((source, index) => (
                <div key={index} className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  {source.favicon ? (
                    <img src={source.favicon} alt="" className="w-3 h-3 rounded" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <span className="text-white text-xs font-bold">b</span>
                  )}
                </div>
              ))}
            </div>
            <span className="text-foreground text-sm">{t('sources')}</span>
          </button>
        </div>
      )}
    </div>
  );
}