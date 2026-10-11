'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'auto' | 'day' | 'evening';

interface ThemeContextType {
  mode: ThemeMode;
  resolvedTheme: 'day' | 'evening';
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'auto',
  resolvedTheme: 'day',
  setMode: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('auto');
  const [resolvedTheme, setResolvedTheme] = useState<'day' | 'evening'>('day');

  // Compute Adama local time (Africa/Addis_Ababa, UTC+3)
  const getAdamaTheme = (): 'day' | 'evening' => {
    try {
      const now = new Date();
      // Format current time into Addis Ababa hour
      const hourStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Addis_Ababa',
        hour: 'numeric',
        hourCycle: 'h23',
      }).format(now);
      const hour = parseInt(hourStr, 10);
      // 06:00 to 17:59 is day, 18:00 to 05:59 is evening
      return hour >= 6 && hour < 18 ? 'day' : 'evening';
    } catch {
      const currentHour = new Date().getHours();
      return currentHour >= 6 && currentHour < 18 ? 'day' : 'evening';
    }
  };

  useEffect(() => {
    // Load saved mode from localStorage
    const saved = localStorage.getItem('dosha_theme_mode') as ThemeMode | null;
    const initialMode: ThemeMode = saved === 'day' || saved === 'evening' || saved === 'auto' ? saved : 'auto';
    setModeState(initialMode);

    const activeTheme = initialMode === 'auto' ? getAdamaTheme() : initialMode;
    setResolvedTheme(activeTheme);
    document.documentElement.setAttribute('data-theme', activeTheme);

    // Periodically re-check time every 5 minutes if in auto mode
    const interval = setInterval(() => {
      if (mode === 'auto') {
        const currentAdama = getAdamaTheme();
        setResolvedTheme(currentAdama);
        document.documentElement.setAttribute('data-theme', currentAdama);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [mode]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('dosha_theme_mode', newMode);
    const active = newMode === 'auto' ? getAdamaTheme() : newMode;
    setResolvedTheme(active);
    document.documentElement.setAttribute('data-theme', active);
  };

  const toggleTheme = () => {
    if (mode === 'auto') {
      setMode('evening');
    } else if (mode === 'evening') {
      setMode('day');
    } else {
      setMode('auto');
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, resolvedTheme, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
