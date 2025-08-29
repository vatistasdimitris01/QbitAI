'use client';

import { ArrowUp, Check, Paperclip, Square, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { extractFileContent, isSupportedFileType, MediaFile } from '@/lib/file-utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { vibrateStreamingTyping } from '@/lib/vibration';
import { ModelSelector } from './model-selector'; // Assuming ModelSelector is in the same directory

// Define the props for the ChatInput component
interface ChatInputProps {
  onSendMessage: (message: string, files?: MediaFile[]) => void;
  onUploadFile?: (files: MediaFile[]) => void;
  onStopGeneration?: () => void;
  onEditMessage?: (message: string) => void;
  onCancelEdit?: () => void;
  onEditContentChange?: (content: string) => void;
  placeholder?: string;
  isGenerating?: boolean;
  isEditing?: boolean;
  editContent?: string;
  vibrationEnabled?: boolean;
  t: (key: keyof typeof import('@/lib/translations').translations.en) => string;
  currentModel: 'auto' | 'qbit R1' | 'qbit R2';
  onModelChange: (model: 'auto' | 'qbit R1' | 'qbit R2') => void;
}

export function ChatInput({
  onSendMessage,
  onUploadFile,
  onStopGeneration,
  onEditMessage,
  onCancelEdit,
  onEditContentChange,
  placeholder = "Ask Anything",
  isGenerating = false,
  isEditing = false,
  editContent = '',
  vibrationEnabled = true,
  t,
  currentModel,
  onModelChange,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const lastVibrationTime = useRef<number>(0);

  // Automatically adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message, editContent, uploadedFiles]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if ((trimmedMessage || uploadedFiles.length > 0) && !isGenerating) {
      onSendMessage(trimmedMessage, uploadedFiles);
      setMessage('');
      setUploadedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
  };
  
  const handleEdit = () => {
    if (editContent.trim() && onEditMessage) {
      onEditMessage(editContent.trim());
    }
  };
  
  const handleCancel = () => {
    if (onCancelEdit) {
        onCancelEdit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
      e.preventDefault();
      if (isEditing) {
        handleEdit();
      } else {
        handleSend();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    if (isEditing && onEditContentChange) {
        onEditContentChange(target.value);
    } else {
        setMessage(target.value);
    }

    if (isMobile && vibrationEnabled && target.value.length > 0) {
      const now = Date.now();
      if (now - lastVibrationTime.current > 500) {
        vibrateStreamingTyping(vibrationEnabled);
        lastVibrationTime.current = now;
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    try {
      const supportedFiles = files.filter(isSupportedFileType);
      if (supportedFiles.length !== files.length) {
        console.warn('Some files were not supported and were skipped');
      }

      const mediaFiles = await Promise.all(
        supportedFiles.map(file => extractFileContent(file))
      );
      
      setUploadedFiles(prevFiles => [...prevFiles, ...mediaFiles]);
      
      if(onUploadFile){
        onUploadFile(mediaFiles);
      }

    } catch (error) {
      console.error('Error processing files:', error);
    }

    if(event.target){
        event.target.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  const currentMessage = isEditing ? editContent : message;
  const canSubmit = (currentMessage.trim() || uploadedFiles.length > 0) && !isGenerating;

  return (
    <div className="absolute inset-x-0 bottom-0 mx-auto max-w-breakout z-40 print:hidden">
      <div className="relative z-40 flex flex-col items-center w-full">
        <div className="relative w-full px-4 md:px-0 pb-2 sm:pb-4">
          <form
            className="w-full text-base flex flex-col gap-2 items-center justify-center relative z-10"
            onSubmit={(e) => { e.preventDefault(); isEditing ? handleEdit() : handleSend(); }}
          >
            <div className="flex flex-col gap-0 justify-center w-full relative items-center">
              <input 
                ref={fileInputRef}
                className="hidden" 
                multiple 
                type="file" 
                name="files" 
                onChange={handleFileSelect}
                accept="image/*,video/*,.pdf,.txt,.md,.csv,.html,.css,.js,.json,.xml,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.swift,.kt,.scala,.ts,.jsx,.tsx"
              />
              <div
                className="query-bar group z-10 bg-card relative w-full overflow-hidden shadow-md max-w-4xl border border-border pb-12 px-2 sm:px-3 rounded-3xl"
              >
                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="w-full flex flex-row gap-2 mt-3 px-1 whitespace-nowrap flex-wrap">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="max-w-full">
                        <div className="flex flex-row items-center text-sm transition ease-in-out gap-2 relative group/chip cursor-pointer bg-card border border-border hover:bg-accent rounded-xl h-12 justify-between p-0.5">
                          <figure className="relative flex-shrink-0 aspect-square overflow-hidden w-11 h-11 ms-0 me-0 rounded-lg">
                            {file.type.startsWith('image/') ? (
                              <img alt={file.name} className="h-full w-full mx-auto object-cover" src={file.content} />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-secondary text-xs text-secondary-foreground p-1">
                                {file.name}
                              </div>
                            )}
                          </figure>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 disabled:opacity-60 disabled:cursor-not-allowed duration-100 bg-secondary text-secondary-foreground hover:bg-accent border border-border h-6 w-6 rounded-full absolute transition-all scale-50 opacity-0 -top-1.5 -right-1.5 group-hover/chip:opacity-100 group-hover/chip:scale-100"
                            type="button"
                            aria-label="Remove"
                          >
                            <X className="stroke-[2] size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="relative z-10">
                  <textarea
                    ref={textareaRef}
                    dir="auto"
                    aria-label={isEditing ? "Edit your message" : "Ask Anything"}
                    className="w-full px-2 sm:px-3 pt-5 mb-5 bg-transparent focus:outline-none text-foreground align-bottom placeholder-muted-foreground"
                    style={{ resize: 'none', minHeight: '44px' }}
                    value={currentMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={!uploadedFiles.length ? (isEditing ? "Edit your message..." : isGenerating ? t('thinking') : placeholder) : "Describe the files..."}
                    rows={1}
                  />
                </div>
                
                <div className="flex gap-1.5 absolute inset-x-0 bottom-0 border-2 border-transparent p-2 max-w-full">
                   {isEditing ? (
                     <button
                        onClick={handleCancel}
                        type="button"
                        aria-label="Cancel edit"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 select-none border border-border text-foreground hover:bg-accent h-10 w-10 rounded-full"
                    >
                        <X size={18} className="text-muted-foreground" />
                    </button>
                  ) : (
                    <button
                        onClick={handleUploadClick}
                        disabled={isGenerating}
                        type="button"
                        aria-label="Attach"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 select-none bg-secondary text-secondary-foreground hover:bg-accent border border-border h-10 w-10 rounded-full"
                    >
                        <Paperclip size={18} className="transition-colors duration-100" />
                    </button>
                  )}
                  
                  <div className="flex grow gap-1.5 max-w-full">
                    <ModelSelector currentModel={currentModel} onModelChange={onModelChange} className="bg-secondary text-secondary-foreground hover:bg-accent border border-border" />
                  </div>

                  <div className="ml-auto flex flex-row items-end gap-1">
                    {isEditing ? (
                        <button
                            onClick={handleEdit}
                            disabled={!editContent.trim()}
                            type="submit"
                            aria-label="Confirm edit"
                            className={`group flex flex-col justify-center rounded-full focus:outline-none ${!editContent.trim() && 'opacity-50 cursor-not-allowed'}`}
                        >
                            <div className="h-10 relative aspect-square flex items-center justify-center rounded-full bg-green-500 text-white">
                                <Check size={20} />
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={isGenerating ? onStopGeneration : handleSend}
                            type={isGenerating? 'button' : 'submit'}
                            aria-label={isGenerating ? "Stop generating" : "Submit"}
                            disabled={!canSubmit}
                            className={`group flex flex-col justify-center rounded-full focus:outline-none ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <div className="h-10 relative aspect-square flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                                {isGenerating ? (
                                    <Square size={20} fill="currentColor"/>
                                ) : (
                                    <ArrowUp size={20} />
                                )}
                            </div>
                        </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}