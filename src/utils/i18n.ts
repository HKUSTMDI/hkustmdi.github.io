import zhTranslations from '../../locales/zh.json';
import enTranslations from '../../locales/en.json';

export type Locale = 'zh' | 'en';

export const translations = {
  zh: zhTranslations,
  en: enTranslations,
};

export const getTranslation = (locale: Locale, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const getCurrentLocale = (): Locale => {
  if (typeof window === 'undefined') return 'zh';
  
  // 首先尝试从localStorage获取
  const storedLocale = localStorage.getItem('locale') as Locale;
  if (storedLocale && ['zh', 'en'].includes(storedLocale)) {
    return storedLocale;
  }
  
  // 然后尝试从URL获取
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(segment => segment !== '');
  const urlLocale = segments[0] as Locale;
  
  if (['zh', 'en'].includes(urlLocale)) {
    // 将URL中的语言保存到localStorage
    localStorage.setItem('locale', urlLocale);
    return urlLocale;
  }
  
  // 最后尝试从浏览器语言设置获取
  const browserLang = navigator.language.split('-')[0];
  const locale = browserLang === 'zh' ? 'zh' : 'en';
  localStorage.setItem('locale', locale);
  return locale;
};

export const changeLocale = (newLocale: Locale): void => {
  if (typeof window === 'undefined') return;
  
  // 保存语言偏好到localStorage
  localStorage.setItem('locale', newLocale);
};
