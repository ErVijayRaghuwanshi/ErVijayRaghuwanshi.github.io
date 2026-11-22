import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { name: 'Blue', class: 'theme-blue', color: '#2563eb' },
  { name: 'Purple', class: 'theme-purple', color: '#9333ea' },
  { name: 'Green', class: 'theme-green', color: '#16a34a' },
  { name: 'Red', class: 'theme-red', color: '#dc2626' },
  { name: 'Orange', class: 'theme-orange', color: '#ea580c' }
];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'theme-blue';
  });

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme_mode');
    if (savedMode) return savedMode;
    // Default to dark mode for developer portfolio aesthetic
    return 'dark';
  });

  const activeTheme = themes.find(t => t.class === currentTheme) || themes[0];

  const toggleMode = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // 1. Sync light/dark class on root
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    root.style.colorScheme = mode;
    localStorage.setItem('theme_mode', mode);
  }, [mode]);

  useEffect(() => {
    // 2. Remove all accent theme classes and apply active
    themes.forEach(t => {
      document.body.classList.remove(t.class);
    });
    document.body.classList.add(currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setCurrentTheme, 
      activeTheme, 
      themes, 
      mode, 
      toggleMode, 
      isDark: mode === 'dark' 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
