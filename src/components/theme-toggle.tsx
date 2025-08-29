'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './theme-provider';
import { vibrateThemeChange } from '@/lib/vibration';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    vibrateThemeChange();
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'light') {
      return <Moon size={16} className="text-foreground" />;
    } else if (theme === 'dark') {
      return <Sun size={16} className="text-foreground" />;
    } else {
      return <Monitor size={16} className="text-foreground" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-0"
      aria-label="Toggle theme"
      title={`Current theme: ${theme}`}
    >
      {getIcon()}
    </button>
  );
}
