import React from 'react';
import { useTheme } from './ThemeContext';

export const ThemeSelector = ({ modeOnly = false, showLabels = false }) => {
  const { currentTheme, setCurrentTheme, themes, mode, toggleMode, isDark } = useTheme();

  if (modeOnly) {
    return (
      <button
        onClick={toggleMode}
        className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-theme-primary dark:hover:text-theme-primary border border-gray-200 dark:border-gray-700/80 transition-all cursor-pointer shadow-xs active:scale-95"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <i className={`fas ${isDark ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-500'} text-sm`} />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/70 p-1.5 rounded-full backdrop-blur-md shadow-xs">
      {/* Light / Dark Mode Toggle */}
      <button
        onClick={toggleMode}
        className="w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-theme-primary dark:hover:text-theme-primary transition-all cursor-pointer shadow-xs shrink-0"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <i className={`fas ${isDark ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-500'} text-xs`} />
      </button>

      <div className="w-px h-3.5 bg-gray-300 dark:bg-gray-700 mx-0.5" />

      {/* Palette Colors */}
      <div className="flex items-center space-x-1.5 px-0.5">
        {themes.map((theme) => (
          <button
            key={theme.class}
            onClick={() => setCurrentTheme(theme.class)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 relative cursor-pointer ${
              currentTheme === theme.class 
                ? 'scale-125 ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 shadow-md' 
                : 'hover:scale-115 opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundColor: theme.color }}
            title={`Switch to ${theme.name} theme`}
            aria-label={`Switch to ${theme.name} theme`}
          />
        ))}
      </div>
    </div>
  );
};
