'use client';

import React from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { languages } from '../../i18n/locales';
import { BsCheckLg } from "react-icons/bs";

const PopLanguage = () => {
    const { language, setLanguage } = useI18n();

    return (
        <div className="p-2 rounded-md min-w-[150px]">
            <span className="text-secondary-text text-xs mb-2 px-2 block">Select Language</span>
            <div className="flex flex-col gap-1">
                {Object.entries(languages).map(([code, name]) => (
                    <button
                        key={code}
                        onClick={() => setLanguage(code as any)}
                        className={`
              w-full px-3 py-2 rounded-sm text-sm text-left transition-colors duration-200
              flex items-center justify-between
              ${language === code ? 'bg-theme-color/10 text-theme-color' : 'text-primary-text hover:bg-hover'}
            `}
                    >
                        <span>{name}</span>
                        {language === code && (
                            <BsCheckLg className="text-theme-color text-xs" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PopLanguage;
