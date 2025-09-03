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

  const applyAccentColorToDom = (accentName: keyof typeof ACCENT_COLORS) => {
    const hexColor = ACCENT_COLORS[accentName];
    document.documentElement.style.setProperty('--dynamic-accent-color', hexColor);
  };

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
    setSelectedAccent(accentName);
    localStorage.setItem('accent', accentName);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialMode = false;
    if (savedTheme === 'dark') {
      initialMode = true;
    } else if (savedTheme === 'light') {
      initialMode = false;
    } else if (prefersDark) {
      initialMode = true;
    }
    if (initialMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setIsDarkMode(initialMode);

    // Load Accent Color
    const savedAccent = localStorage.getItem('accent') as keyof typeof ACCENT_COLORS | null;
    if (savedAccent && ACCENT_COLORS[savedAccent]) {
      setSelectedAccent(savedAccent);
      applyAccentColorToDom(savedAccent);
    } else {
      setSelectedAccent('purple');
      applyAccentColorToDom('purple');
    }
  }, []);

  useEffect(() => {
    applyAccentColorToDom(selectedAccent);
  }, [selectedAccent]);

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