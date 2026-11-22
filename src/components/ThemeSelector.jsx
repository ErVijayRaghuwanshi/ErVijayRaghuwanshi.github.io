import React from 'react';
import { useTheme } from './ThemeContext';

export const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme, themes } = useTheme();

  return (
    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 px-2.5 py-1.5 rounded-full backdrop-blur-md">
      {themes.map((theme) => (
        <button
          key={theme.class}
          onClick={() => setCurrentTheme(theme.class)}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 relative cursor-pointer ${
            currentTheme === theme.class 
              ? 'scale-125 ring-2 ring-white dark:ring-white ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 shadow-md' 
              : 'hover:scale-115 opacity-70 hover:opacity-100'
          }`}
          style={{ backgroundColor: theme.color }}
          title={`Switch to ${theme.name} theme`}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  );
};
