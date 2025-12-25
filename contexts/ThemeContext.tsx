// contexts/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ThemeColor, 
  GradientTheme, 
  ThemeConfig, 
  DEFAULT_THEME_CONFIG,
  applyTheme as applyThemeUtil,
  resetTheme as resetThemeUtil,
  getCurrentTheme,
  saveThemeToBackend,
  fetchThemeFromBackend
} from '@/lib/theme-utils';

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => Promise<void>;
  resetTheme: () => Promise<void>;
  isLoading: boolean;
  isSaving: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        setIsLoading(true);
        
        // Try to fetch from backend first
        const backendTheme = await fetchThemeFromBackend();
        
        if (backendTheme) {
          setThemeState(backendTheme);
          await applyThemeUtil(backendTheme);
        } else {
          // Fallback to localStorage or default
          const localTheme = getCurrentTheme();
          setThemeState(localTheme);
          await applyThemeUtil(localTheme);
        }
      } catch (error) {
        console.error('Error initializing theme:', error);
        const localTheme = getCurrentTheme();
        setThemeState(localTheme);
        await applyThemeUtil(localTheme);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  const setTheme = async (newTheme: Partial<ThemeConfig>) => {
    try {
      setIsSaving(true);
      const updatedTheme = { ...theme, ...newTheme };
      
      // Apply to DOM
      await applyThemeUtil(updatedTheme);
      
      // Update state
      setThemeState(updatedTheme);
      
      // Save to backend
      await saveThemeToBackend(updatedTheme);
      
    } catch (error) {
      console.error('Error setting theme:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const resetTheme = async () => {
    try {
      setIsSaving(true);
      await resetThemeUtil();
      setThemeState(DEFAULT_THEME_CONFIG);
    } catch (error) {
      console.error('Error resetting theme:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme, isLoading, isSaving }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}