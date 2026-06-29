import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentLocale, changeLocale, type Locale } from '../utils/i18n';

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  changeLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Locale>('zh');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // 首先尝试从URL获取语言
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(segment => segment !== '');
    const urlLocale = segments[0] as Locale;
    
    if (['zh', 'en'].includes(urlLocale)) {
      console.log('🌍 LanguageContext: Using URL locale:', urlLocale);
      setLanguageState(urlLocale);
      // 将URL中的语言保存到localStorage
      localStorage.setItem('locale', urlLocale);
    } else {
      // 如果URL中没有语言，使用localStorage或默认值
      const currentLocale = getCurrentLocale();
      console.log('🌍 LanguageContext: Using stored/default locale:', currentLocale);
      setLanguageState(currentLocale);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'locale' && e.newValue) {
        setLanguageState(e.newValue as Locale);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
  };

  const changeLanguage = (lang: Locale) => {
    if (!isClient) return;
    console.log('🌍 LanguageContext: Changing language to:', lang);
    console.log('🌍 LanguageContext: Current language before change:', language);
    changeLocale(lang);
    setLanguageState(lang);
    console.log('🌍 LanguageContext: Language state updated to:', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
