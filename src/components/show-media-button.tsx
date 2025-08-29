'use client';

import { Eye } from 'lucide-react';
import { MediaFile } from '@/lib/file-utils';

interface ShowMediaButtonProps {
  files: MediaFile[];
  onShowMedia: () => void;
}

export function ShowMediaButton({ files, onShowMedia }: ShowMediaButtonProps) {
  if (files.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40">
      <button
        onClick={onShowMedia}
        className="flex items-center gap-2 bg-muted hover:bg-muted backdrop-blur-sm rounded-full px-4 py-2 text-foreground transition-colors focus:outline-none focus:ring-0 shadow-lg"
        title={`Show ${files.length} uploaded file${files.length > 1 ? 's' : ''}`}
      >
        <Eye size={16} />
        <span className="text-sm font-medium">
          Media ({files.length})
        </span>
      </button>
    </div>
  );
}
