'use client';

import { X } from 'lucide-react';

interface Source {
  title: string;
  url: string;
  favicon?: string;
}

interface SourcesPopupProps {
  sources: Source[];
  isVisible: boolean;
  onClose: () => void;
  t: (key: keyof typeof import('@/lib/translations').translations.en) => string;
}

export function SourcesPopup({ sources, isVisible, onClose, t }: SourcesPopupProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 hidden md:flex">
      <div className="bg-card/95 backdrop-blur-sm rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-semibold text-card-foreground">{t('sourcesTitle')}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title={t('close')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Sources List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {sources.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {t('noSources')}
            </div>
          ) : (
            sources.map((source, index) => (
            <div
              key={index}
              className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => window.open(source.url, '_blank')}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  {source.favicon ? (
                    <img 
                      src={source.favicon} 
                      alt="" 
                      className="w-6 h-6 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm">🌐</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-card-foreground mb-1">
                    {source.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {source.url}
                  </p>
                </div>
              </div>
            </div>
          ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground text-center">
            Click on any source to open it in a new tab
          </p>
        </div>
      </div>
    </div>
  );
}
