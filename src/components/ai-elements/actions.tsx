"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ActionProps extends React.ComponentProps<typeof Button> {
  tooltip?: string;
  label?: string;
  children: React.ReactNode;
}

const Actions = React.forwardRef<HTMLDivElement, ActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1 transition-opacity duration-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Actions.displayName = "Actions";

const Action = React.forwardRef<HTMLButtonElement, ActionProps>(
  ({ tooltip, label, children, className, ...props }, ref) => {
    const button = (
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
          className
        )}
        {...props}
      >
        {children}
        {label && <span className="sr-only">{label}</span>}
      </Button>
    );

    if (tooltip || label) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip || label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  }
);
Action.displayName = "Action";

export { Actions, Action };
