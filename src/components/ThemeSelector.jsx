import React from 'react';
import { useTheme } from './ThemeContext';

export const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme, themes } = useTheme();

  return (
    <div className="flex items-center space-x-2 bg-gray-800/40 border border-gray-700/50 p-1.5 rounded-full backdrop-blur-md">
      {themes.map((theme) => (
        <button
          key={theme.class}
          onClick={() => setCurrentTheme(theme.class)}
          className={`w-4 h-4 rounded-full transition-all duration-300 relative ${
            currentTheme === theme.class 
              ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-gray-900 shadow-lg' 
              : 'hover:scale-110 opacity-70 hover:opacity-100'
          }`}
          style={{ backgroundColor: theme.color }}
          title={`Switch to ${theme.name} theme`}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  );
};
