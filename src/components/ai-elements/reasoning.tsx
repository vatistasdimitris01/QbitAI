'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Reasoning = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & {
    isStreaming?: boolean;
  }
>(({ className, isStreaming = false, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isStreaming) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isStreaming]);

  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('w-full', className)}
      {...props}
    />
  );
});
Reasoning.displayName = 'Reasoning';

const ReasoningTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> & {
    title?: string;
  }
>(({ className, title = 'Reasoning', children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      'flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      <span>{title}</span>
    </div>
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    {children}
  </CollapsiblePrimitive.Trigger>
));
ReasoningTrigger.displayName = 'ReasoningTrigger';

const ReasoningContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      className
    )}
    {...props}
  >
    <div className="px-4 py-3 pt-0">
      <div className="rounded-md bg-muted/50 p-3 text-muted-foreground">
        {children}
      </div>
    </div>
  </CollapsiblePrimitive.Content>
));
ReasoningContent.displayName = 'ReasoningContent';

export { Reasoning, ReasoningTrigger, ReasoningContent };
