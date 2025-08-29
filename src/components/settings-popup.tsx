'use client';

import { X, Globe, Palette, MapPin, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from './theme-provider';
import { vibrateSettings, vibrateThemeChange, vibrateButton } from '@/lib/vibration';
import { useIsMobile } from '@/hooks/use-mobile';

interface SettingsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  currentLanguage: 'en' | 'el' | 'es' | 'de' | 'ru' | 'zh' | 'fr';
  onLanguageChange: (language: 'en' | 'el' | 'es' | 'de' | 'ru' | 'zh' | 'fr') => void;
  vibrationEnabled: boolean;
  onVibrationChange: (enabled: boolean) => void;
  t: (key: keyof typeof import('@/lib/translations').translations.en) => string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const themes = [
  { id: 'light', name: 'Light', icon: '☀️' },
  { id: 'dark', name: 'Dark', icon: '🌙' },
  { id: 'system', name: 'System', icon: '🖥️' },
];

export function SettingsPopup({ 
  isVisible, 
  onClose, 
  currentLanguage, 
  onLanguageChange,
  vibrationEnabled,
  onVibrationChange,
  t
}: SettingsPopupProps) {
  const { theme, setTheme } = useTheme();
  const [userLocation, setUserLocation] = useState<string>('');
  const isMobile = useIsMobile();

  useEffect(() => {
    // Detect user location and set language automatically
    if (navigator.language) {
      const userLang = navigator.language.split('-')[0];
      const supportedLang = languages.find(lang => lang.code === userLang);
      if (supportedLang && currentLanguage === 'en') {
        onLanguageChange(userLang as 'en' | 'el' | 'es' | 'de' | 'ru' | 'zh' | 'fr');
      }
      setUserLocation(userLang);
    }
  }, [currentLanguage, onLanguageChange]);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        vibrateButton();
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
      vibrateSettings();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-background border border-border rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">{t('settingsTitle')}</h2>
          <button
            onClick={() => {
              vibrateButton();
              onClose();
            }}
            className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-0"
            title={t('close')}
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Theme Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette size={20} className="text-foreground" />
              <h3 className="font-medium text-foreground">{t('themeSection')}</h3>
            </div>
            <div className="space-y-3">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    vibrateThemeChange();
                    setTheme(themeOption.id as 'light' | 'dark' | 'system');
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
                    theme === themeOption.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted hover:bg-muted/80 text-foreground hover:shadow-sm'
                  }`}
                >
                  <span className="text-lg">{themeOption.icon}</span>
                  <span>{t(themeOption.id as keyof typeof import('@/lib/translations').translations.en)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Vibration Section - Mobile Only */}
          {isMobile && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Smartphone size={20} className="text-foreground" />
                <h3 className="font-medium text-foreground">Haptic Feedback</h3>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    vibrateButton();
                    onVibrationChange(!vibrationEnabled);
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
                    vibrationEnabled
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted hover:bg-muted/80 text-foreground hover:shadow-sm'
                  }`}
                >
                  <span className="text-lg">📳</span>
                  <span className="flex-1 text-left">Enable Vibration</span>
                  <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                    vibrationEnabled 
                      ? 'bg-primary-foreground border-primary-foreground' 
                      : 'bg-transparent border-muted-foreground'
                  }`}>
                    {vibrationEnabled && (
                      <div className="w-2 h-2 bg-primary rounded-full m-1"></div>
                    )}
                  </div>
                </button>
                <div className="text-xs text-muted-foreground px-4">
                  Provides haptic feedback for interactions like opening sidebar, typing, and button presses
                </div>
              </div>
            </div>
          )}

          {/* Language Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={20} className="text-foreground" />
              <h3 className="font-medium text-foreground">{t('languageSection')}</h3>
            </div>
            {userLocation && (
              <div className="flex items-center gap-2 mb-3 p-2 bg-muted rounded-lg">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('detected')}: {languages.find(lang => lang.code === userLocation)?.name || t('unknown')}
                </span>
              </div>
            )}
            <div className="space-y-3">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    vibrateButton();
                    onLanguageChange(language.code as 'en' | 'el' | 'es' | 'de' | 'ru' | 'zh' | 'fr');
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
                    currentLanguage === language.code
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted hover:bg-muted/80 text-foreground hover:shadow-sm'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
