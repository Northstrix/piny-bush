
"use client";

import { createContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Language, Direction, getDirection, getTranslations, TranslationSet } from "@/lib/translations";
import { trackEvent } from "@/lib/analytics";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
  t: (key: string,
    params?: {[key: string]: string | number | undefined}
  ) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [translations, setTranslations] = useState<TranslationSet>({});
  const [enTranslations, setEnTranslations] = useState<TranslationSet>({});

  useEffect(() => {
    trackEvent('page_view', { language: 'en' });
    getTranslations('en').then(setEnTranslations);
  }, []);

  useEffect(() => {
    getTranslations(language).then(setTranslations);
  }, [language]);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    trackEvent('language_change', { language: newLanguage });
  }, []);
  
  const direction = getDirection(language);

  const t = useCallback((key: string, params?: {[key: string]: string | number | undefined}) => {
    let translation = translations[key] || enTranslations[key] || (params as any)?.defaultValue;
    
    // Default to the key itself if no translation is found anywhere
    if (translation === undefined) {
      translation = key;
    }

    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        if (value !== undefined) {
          translation = translation.replace(`{{${paramKey}}}`, String(value));
        }
      });
    }

    return translation;
  }, [language, translations, enTranslations]);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
