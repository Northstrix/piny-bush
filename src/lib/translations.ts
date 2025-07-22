
export type Language = "en" | "es" | "he" | "pt" | "fr" | "ar" | "ru" | "zh";
export type Direction = "ltr" | "rtl";

export type TranslationSet = { [key: string]: string };

export const LANGUAGES: { code: Language; label: string, direction: Direction }[] = [
  { code: "en", label: "English", direction: 'ltr' },
  { code: "he", label: "עברית", direction: 'rtl' },
  { code: "es", label: "Español", direction: 'ltr' },
  { code: "pt", label: "Português", direction: 'ltr' },
  { code: "fr", label: "Français", direction: 'ltr' },
  { code: "ar", label: "العربية", direction: 'rtl' },
  { code: "ru", label: "Русский", direction: 'ltr' },
  { code: "zh", label: "粤语", direction: 'ltr' },
];

export function getDirection(lang: Language): Direction {
    const languageInfo = LANGUAGES.find(l => l.code === lang);
    return languageInfo ? languageInfo.direction : 'ltr';
}

// Dynamically import the JSON file for a given language
export const getTranslations = async (lang: Language): Promise<TranslationSet> => {
  try {
    const translations = await import(`./locales/${lang}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Could not load translations for language: ${lang}`, error);
    // Fallback to English if the language file is not found
    const englishTranslations = await import('./locales/en.json');
    return englishTranslations.default;
  }
};
