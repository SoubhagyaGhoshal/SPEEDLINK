import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem('speedlink-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Save theme to localStorage
    localStorage.setItem('speedlink-theme', theme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS custom properties
    if (theme === 'light') {
      document.documentElement.style.setProperty('--bg-primary', '#ffffff');
      document.documentElement.style.setProperty('--bg-secondary', '#f8f9fa');
      document.documentElement.style.setProperty('--text-primary', '#1a1a1a');
      document.documentElement.style.setProperty('--text-secondary', '#666666');
      document.documentElement.style.setProperty('--border-color', '#e0e0e0');
      document.documentElement.style.setProperty('--card-bg', '#ffffff');
      document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#000000');
      document.documentElement.style.setProperty('--bg-secondary', '#111111');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#cfcfcf');
      document.documentElement.style.setProperty('--border-color', '#222222');
      document.documentElement.style.setProperty('--card-bg', '#111111');
      document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.6)');
    }
  }, [theme, isLoaded]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    changeTheme,
    toggleTheme,
    isLoaded
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
