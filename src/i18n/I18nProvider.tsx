'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { en, es, type Language } from './locales';

type I18nContextType<T = any> = {
  t: T;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

const translations = { en, es } as const;

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Update language based on URL and sync with localStorage
  const updateLanguage = useCallback((newLang: Language) => {
    if (translations[newLang] && language !== newLang) {
      setLanguage(newLang);
      localStorage.setItem('language', newLang);
      document.documentElement.lang = newLang;
    }
  }, [language]);

  // Initialize language from URL, localStorage, or browser preference
  useEffect(() => {
    // Get language from URL first
    const pathLang = pathname?.split('/')[1];
    if (pathLang === 'en' || pathLang === 'es') {
      updateLanguage(pathLang);
      setMounted(true);
      return;
    }

    // Fallback to localStorage or browser preference
    const savedLanguage = localStorage.getItem('language') as Language | null;
    const browserLanguage = navigator.language.split('-')[0] as Language;

    if (savedLanguage && translations[savedLanguage]) {
      updateLanguage(savedLanguage);
    } else if (translations[browserLanguage as keyof typeof translations]) {
      updateLanguage(browserLanguage);
    }

    setMounted(true);
  }, [pathname, updateLanguage]);

  // Handle language change with URL update
  const changeLanguage = useCallback((newLang: Language) => {
    updateLanguage(newLang);

    // Update URL if needed
    if (pathname) {
      const newPath = pathname.replace(/^\/(en|es)/, `/${newLang}`);
      if (newPath !== pathname) {
        router.push(newPath);
      }
    }
  }, [pathname, router, updateLanguage]);

  // Handle language toggle with URL update
  const toggleLanguage = useCallback(() => {
    const newLang = language === 'en' ? 'es' : 'en';
    changeLanguage(newLang);
  }, [language, changeLanguage]);

  if (!mounted) return null;

  return (
    <I18nContext.Provider
      value={{
        t: translations[language],
        language,
        setLanguage: changeLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n<T = any>(): I18nContextType<T> {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context as I18nContextType<T>;
}
