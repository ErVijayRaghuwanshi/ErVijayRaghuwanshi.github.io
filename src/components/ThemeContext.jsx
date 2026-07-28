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

  const activeTheme = themes.find(t => t.class === currentTheme) || themes[0];

  useEffect(() => {
    // Remove all theme classes first
    themes.forEach(t => {
      document.body.classList.remove(t.class);
    });
    // Add current theme class
    document.body.classList.add(currentTheme);
    // Force dark mode at html level
    document.documentElement.classList.add('dark');
    // Save to local storage
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, activeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
