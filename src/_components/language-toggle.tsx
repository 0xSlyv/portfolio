'use client';

import { useI18n } from '../i18n/I18nProvider';

const LanguageToggle = () => {
  const { toggleLanguage, language } = useI18n();

  return (
    <button
      onClick={toggleLanguage}
      className="w-10 h-10 rounded-full bg-secondary hover:bg-accent transition-all flex items-center justify-center group"
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
    >
      <span className="sr-only">
        {language === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
      </span>
      <div className="relative w-5 h-5 text-sm font-medium">
        <span 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            language === 'en' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          EN
        </span>
        <span 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            language === 'es' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ES
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;
