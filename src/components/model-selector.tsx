'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface ModelSelectorProps {
  currentModel: 'auto' | 'qbit R1' | 'qbit R2';
  onModelChange: (model: 'auto' | 'qbit R1' | 'qbit R2') => void;
  className?: string;
}

export function ModelSelector({
  currentModel,
  onModelChange,
  className
}: ModelSelectorProps) {
  const models = [
    { id: 'auto', name: 'Auto' },
    { id: 'qbit R2', name: 'Heavy' },
    { id: 'qbit R1', name: 'Expert' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`flex items-center gap-1 ${className}`}>
          {models.find(model => model.id === currentModel)?.name || 'Expert'}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {models.map((model) => (
          <DropdownMenuItem key={model.id} onClick={() => onModelChange(model.id as 'auto' | 'qbit' | 'qbit R1' | 'qbit R2')}>
            {model.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}