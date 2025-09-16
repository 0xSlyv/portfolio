'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const ACCENT_COLORS = {
  purple: '#7066A8',
  shinnypurple: '#B1AFFF',
  lightpurple: '#987D9A',
  pink: '#CB80AB',
  blue: '#3B82F6',
  green: '#22C55E',
  orange: '#F97316',
  red: '#991F36',
  lightblue: '#8EACCD',
  skyblue: '#7EACB5'
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  selectedAccent: keyof typeof ACCENT_COLORS;
  setAccent: (accentName: keyof typeof ACCENT_COLORS) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => { },
  selectedAccent: 'purple',
  setAccent: () => { },
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState<keyof typeof ACCENT_COLORS>('purple');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--dynamic-accent-color');
    const accentName = Object.keys(ACCENT_COLORS).find(key => ACCENT_COLORS[key as keyof typeof ACCENT_COLORS] === accent) as keyof typeof ACCENT_COLORS;
    if (accentName) {
      setSelectedAccent(accentName);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const setAccent = (accentName: keyof typeof ACCENT_COLORS) => {
    const hexColor = ACCENT_COLORS[accentName];
    document.documentElement.style.setProperty('--dynamic-accent-color', hexColor);
    localStorage.setItem('accent', hexColor);
    setSelectedAccent(accentName);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, selectedAccent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeScript = () => {
  const themeScript = `
    (function() {
      const theme = localStorage.getItem('theme');
      const accent = localStorage.getItem('accent');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      const accentColor = accent ? accent : '${ACCENT_COLORS['purple']}';
      document.documentElement.style.setProperty('--dynamic-accent-color', accentColor);
    })()
  `;

  return (
    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
  );
};