'use client';

import { useState, useEffect } from 'react';
import { translations, type Language } from '@/lib/translations';

export function useAppSettings() {
  const [language, setLanguage] = useState<Language>('en');
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Load settings from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedVibration = localStorage.getItem('vibrationEnabled');
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedVibration !== null) {
      setVibrationEnabled(savedVibration === 'true');
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    // Save vibration setting to localStorage
    localStorage.setItem('vibrationEnabled', vibrationEnabled.toString());
  }, [vibrationEnabled]);

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  return {
    language,
    setLanguage,
    vibrationEnabled,
    setVibrationEnabled,
    t,
  };
}
