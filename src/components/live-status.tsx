'use client';

import { Search, Brain, Globe, Copy } from 'lucide-react';

interface LiveStatusProps {
  status: 'searching' | 'thinking' | 'reading' | 'generating' | null;
  query?: string;
  sources?: Array<{ title: string; url: string; favicon?: string }>;
  t: (key: keyof typeof import('@/lib/translations').translations.en) => string;
}

export function LiveStatus({ status, query, sources, t }: LiveStatusProps) {
  if (!status) return null;

  const getStatusText = () => {
    switch (status) {
      case 'searching':
        return `${t('searching')} "${query}"`;
      case 'thinking':
        return t('thinking');
      case 'reading':
        return t('readingSources');
      case 'generating':
        return t('generating');
      default:
        return '';
    }
  };

  const statusText = getStatusText();
  if (!statusText) return null;

  return (
    <div className="mb-2">
      {/* Clean status text with letter animation */}
      <div className="text-sm text-muted-foreground">
        <span className="inline-block">
          {statusText.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-pulse"
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: '1.5s',
                animationIterationCount: 'infinite'
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
