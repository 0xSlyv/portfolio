import en from './en';
import es from './es';

export { en, es };
export type { Language } from '../types';

export type Translation = typeof en;

export const languages = {
  en: 'English',
  es: 'Español',
} as const;
