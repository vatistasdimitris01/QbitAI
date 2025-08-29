'use client';

import { X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Source {
  title: string;
  url: string;
  favicon?: string;
}

interface SourcesDrawerProps {
  sources: Source[];
  isVisible: boolean;
  onClose: () => void;
  t: (key: keyof typeof import('@/lib/translations').translations.en) => string;
}

export function SourcesDrawer({ sources, isVisible, onClose, t }: SourcesDrawerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      setCurrentY(0);
    }
  }, [isVisible]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) {
      setCurrentY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentY > 100) {
      onClose();
    } else {
      setCurrentY(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    if (deltaY > 0) {
      setCurrentY(deltaY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (currentY > 100) {
      onClose();
    } else {
      setCurrentY(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY, currentY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:hidden">
      <div 
        ref={drawerRef}
        className="bg-white dark:bg-gray-900 w-full max-h-[95vh] rounded-t-xl overflow-hidden transition-transform duration-300 ease-out"
        style={{ 
          transform: `translateY(${currentY}px)`,
          maxHeight: currentY > 0 ? '95vh' : '80vh'
        }}
      >
        {/* Drag Handle */}
        <div 
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('searchResults')}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sources List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {sources.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              {t('noSources')}
            </div>
          ) : (
            sources.map((source, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700"
                onClick={() => window.open(source.url, '_blank')}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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
                      <span className="text-white text-xs font-bold">b</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      bing.com
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {source.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
