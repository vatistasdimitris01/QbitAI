'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Trash2, FileText, Image, Video, Code, File } from 'lucide-react';
import { MarkdownRenderer } from './markdown-renderer';

interface MediaFile {
  id: string;
  name: string;
  type: string;
  data: string | ArrayBuffer;
  mediaType: string;
  content?: string; // For text-based files
}

interface MediaCarouselProps {
  files: MediaFile[];
  isVisible: boolean;
  onClose: () => void;
  onRemoveFile: (fileId: string) => void;
}

export function MediaCarousel({ files, isVisible, onClose, onRemoveFile }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isVisible || files.length === 0) return null;

  const currentFile = files[currentIndex];

  const getFileIcon = (mediaType: string) => {
    if (mediaType.startsWith('image/')) return <Image size={24} />;
    if (mediaType.startsWith('video/')) return <Video size={24} />;
    if (mediaType.includes('text') || mediaType.includes('markdown') || mediaType.includes('code')) return <Code size={24} />;
    if (mediaType.includes('pdf')) return <FileText size={24} />;
    return <File size={24} />;
  };

  const renderFileContent = (file: MediaFile) => {
    const { mediaType, data, content } = file;

    if (mediaType.startsWith('image/')) {
      return (
        <div className="flex items-center justify-center h-full w-full">
          <img 
            src={typeof data === 'string' ? data : URL.createObjectURL(new Blob([data]))} 
            alt={file.name}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            style={{ maxWidth: '95vw', maxHeight: '80vh' }}
          />
        </div>
      );
    }

    if (mediaType.startsWith('video/')) {
      return (
        <div className="flex items-center justify-center h-full w-full">
          <video 
            src={typeof data === 'string' ? data : URL.createObjectURL(new Blob([data]))} 
            controls
            className="max-w-full max-h-full w-auto h-auto"
            style={{ maxWidth: '95vw', maxHeight: '80vh' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (mediaType.includes('text') || mediaType.includes('markdown') || mediaType.includes('code') || mediaType.includes('pdf')) {
      return (
        <div className="h-full w-full overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {content ? (
              <MarkdownRenderer content={content} t={() => ''} />
            ) : (
              <pre className="whitespace-pre-wrap text-sm">
                {typeof data === 'string' ? data : new TextDecoder().decode(data as ArrayBuffer)}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-center">
          <File size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{file.name}</p>
          <p className="text-sm text-muted-foreground">{mediaType}</p>
        </div>
      </div>
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? files.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === files.length - 1 ? 0 : prev + 1));
  };

  const handleRemoveFile = () => {
    onRemoveFile(currentFile.id);
    if (files.length === 1) {
      onClose();
    } else if (currentIndex === files.length - 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
              <div className="flex items-center justify-between p-3 bg-background/20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {getFileIcon(currentFile.mediaType)}
          <div>
            <h3 className="font-medium text-foreground text-sm">{currentFile.name}</h3>
            <p className="text-xs text-muted-foreground">
              {currentIndex + 1} of {files.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={handleRemoveFile}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-0"
            title="Remove file"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-0"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {/* Navigation Buttons */}
        {files.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/20 hover:bg-background/40 rounded-full transition-colors focus:outline-none focus:ring-0 z-10"
              title="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/20 hover:bg-background/40 rounded-full transition-colors focus:outline-none focus:ring-0 z-10"
              title="Next"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* File Content */}
        <div className="h-full p-2">
          {renderFileContent(currentFile)}
        </div>
      </div>

      {/* Thumbnails */}
      {files.length > 1 && (
        <div className="p-3 bg-background/20 backdrop-blur-sm">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {files.map((file, index) => (
              <button
                key={file.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-0 ${
                  index === currentIndex 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted'
                }`}
                title={file.name}
              >
                {getFileIcon(file.mediaType)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
