"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  lang: string;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with 'en' or from localStorage if you want persistence
  const [lang, setLang] = useState<string>('en'); 

  useEffect(() => {
    // Optionally load language preference from localStorage
    const storedLang = localStorage.getItem('appLanguage');
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const toggleLang = () => {
    setLang((prevLang) => {
      const newLang = prevLang === 'en' ? 'ar' : 'en';
      // Optionally save language preference to localStorage
      localStorage.setItem('appLanguage', newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
