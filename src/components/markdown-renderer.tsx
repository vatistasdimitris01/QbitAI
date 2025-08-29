'use client';

import { Streamdown } from 'streamdown';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  t: (key: keyof typeof import('@/lib/translations').translations.en) => string;
}

export function MarkdownRenderer({ content, t }: MarkdownRendererProps) {
  const [copiedBlocks, setCopiedBlocks] = useState<Set<number>>(new Set());

  const copyToClipboard = async (text: string, blockIndex: number) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedBlocks(prev => new Set(prev).add(blockIndex));
      setTimeout(() => {
        setCopiedBlocks(prev => {
          const newSet = new Set(prev);
          newSet.delete(blockIndex);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="markdown-content">
      <Streamdown 
        parseIncompleteMarkdown={true}
        className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-l-muted-foreground prose-hr:border-muted-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-table:text-foreground prose-th:text-foreground prose-td:text-foreground"
        allowedImagePrefixes={["*"]}
        allowedLinkPrefixes={["*"]}
        components={{
          // Custom code block component with copy button
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (inline) {
              return (
                <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono text-foreground" {...props}>
                  {children}
                </code>
              );
            }

            const code = String(children);
            const blockIndex = Math.random(); // Simple unique ID

            return (
              <div className="my-4 relative group">
                {language && (
                  <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border rounded-t-lg">
                    <span className="text-xs font-mono text-muted-foreground">
                      {language}
                    </span>
                    <button
                      onClick={() => copyToClipboard(code, blockIndex)}
                      className="flex items-center gap-2 px-2 py-1 text-xs bg-background hover:bg-muted rounded transition-colors"
                      title={t('copy')}
                    >
                      {copiedBlocks.has(blockIndex) ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <Copy size={12} />
                      )}
                      {copiedBlocks.has(blockIndex) ? t('copied') : t('copy')}
                    </button>
                  </div>
                )}
                <pre className={`p-4 bg-muted rounded-lg overflow-x-auto ${!language ? 'rounded-t-lg' : ''}`}>
                  <code className={`text-sm font-mono text-foreground ${className}`} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          // Custom link component
          a: ({ href, children, ...props }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:underline"
              {...props}
            >
              {children}
            </a>
          ),
          // Custom heading components
          h1: ({ children, ...props }) => (
            <h1 className="text-2xl font-bold text-foreground mb-4" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-xl font-bold text-foreground mb-3" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-lg font-bold text-foreground mb-2" {...props}>
              {children}
            </h3>
          ),
          // Custom paragraph component
          p: ({ children, ...props }) => (
            <p className="text-foreground mb-2 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          // Custom list components
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside text-foreground mb-2 space-y-1" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside text-foreground mb-2 space-y-1" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-foreground" {...props}>
              {children}
            </li>
          ),
          // Custom blockquote component
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground mb-2" {...props}>
              {children}
            </blockquote>
          ),
          // Custom table components
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-border whitespace-nowrap" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-3 py-2 text-left font-semibold text-foreground bg-muted whitespace-nowrap" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-3 py-2 text-foreground whitespace-nowrap" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </Streamdown>
    </div>
  );
}