import en from '../locales/en';
import es from '../locales/es';

const dictionaries = {
  en: () => Promise.resolve(en),
  es: () => Promise.resolve(es),
} as const;

export const getDictionary = async (locale: 'en' | 'es') => {
  return dictionaries[locale]();
};
