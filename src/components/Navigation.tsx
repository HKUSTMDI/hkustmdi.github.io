'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getTranslation, type Locale } from '../utils/i18n';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const router = useRouter();
  
  // 使用LanguageContext中的语言状态，而不是从URL获取
  const currentLanguage = language;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        const target = event.target as Element;
        const dropdown = target.closest('.language-dropdown');
        if (!dropdown) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const navItems = [
    { name: getTranslation(currentLanguage, 'navigation.home'), href: `/${currentLanguage}` },
    { name: getTranslation(currentLanguage, 'navigation.people'), href: `/${currentLanguage}/people` },
    { name: getTranslation(currentLanguage, 'navigation.project'), href: `/${currentLanguage}/project` },
    { name: getTranslation(currentLanguage, 'navigation.collaboration'), href: `/${currentLanguage}/collaboration` },
    { name: getTranslation(currentLanguage, 'navigation.dataset'), href: `/${currentLanguage}/dataset` },
  ];

  const handleLanguageChange = (lang: Locale) => {
    changeLanguage(lang);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    
    // 获取当前路径并替换语言部分
    const currentPath = router.asPath;
    let newPath = '';
    
    // 如果当前路径以 /zh 或 /en 开头，替换语言部分
    if (currentPath.startsWith('/zh') || currentPath.startsWith('/en')) {
      newPath = currentPath.replace(/^\/[a-z]{2}/, `/${lang}`);
    } else {
      // 如果当前路径没有语言前缀，添加语言前缀
      newPath = `/${lang}${currentPath === '/' ? '' : currentPath}`;
    }
    
    router.push(newPath);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${currentLanguage}`} className="flex items-center space-x-3">
              <Image
                src="/static/website/images/home/logo.webp"
                alt={getTranslation(currentLanguage, 'navigation.labName')}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
              <span 
                className="text-xs sm:text-base md:text-xl font-bold text-gray-800 mobile-title"
              >
                {getTranslation(currentLanguage, 'navigation.labName')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden desktop-nav">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-semibold transition-all duration-300 ${
                    router.asPath === item.href
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Function Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              {/* Open Source Button */}
              <a
                href="https://github.com/HKUSTMDI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>{getTranslation(currentLanguage, 'navigation.openSource')}</span>
              </a>

              {/* Language Switcher */}
              <div className="relative language-dropdown">
                <button
                  onClick={() => {
                    console.log('🌍 Language dropdown clicked, current state:', isDropdownOpen);
                    console.log('🌍 Current language:', language);
                    console.log('🌍 Button text:', getTranslation(language, 'navigation.chinese'));
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 text-sm font-semibold rounded-md transition-all duration-300 w-[80px] ${
                    isDropdownOpen 
                      ? 'text-blue-600 bg-blue-50 border-2 border-blue-300 shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fa-solid fa-earth-americas"></i>
                  <span className="whitespace-nowrap">
                    {currentLanguage === 'zh' ? getTranslation(currentLanguage, 'navigation.chinese') : getTranslation(currentLanguage, 'navigation.english')}
                  </span>
                  <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-[60]">
                    <button
                      onClick={() => {
                        console.log('🇨🇳 Chinese button clicked');
                        handleLanguageChange('zh');
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 rounded-t-md mb-1 ${
                        currentLanguage === 'zh' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-700'
                      }`}
                    >
                      🇨🇳 中文
                    </button>
                    <button
                      onClick={() => {
                        console.log('🇺🇸 English button clicked');
                        handleLanguageChange('en');
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 rounded-b-md ${
                        currentLanguage === 'en' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-700'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 mobile-nav">
            {/* Mobile Language Switcher */}
            <div className="relative language-dropdown">
              <button
                onClick={() => {
                  console.log('🌍 Mobile language dropdown clicked, current state:', isDropdownOpen);
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className={`flex items-center justify-center space-x-1 px-2 py-1 text-xs font-semibold rounded transition-all duration-300 w-[60px] ${
                  isDropdownOpen 
                    ? 'text-blue-600 bg-blue-50 border-2 border-blue-300 shadow-sm' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <i className="fa-solid fa-earth-americas text-xs"></i>
                <span className="whitespace-nowrap">
                  {currentLanguage === 'zh' ? getTranslation(currentLanguage, 'navigation.shortChinese') : getTranslation(currentLanguage, 'navigation.english')}
                </span>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-[60]">
                  <button
                    onClick={() => {
                      console.log('🇨🇳 Mobile Chinese button clicked');
                      handleLanguageChange('zh');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors duration-200 rounded-t-md mb-1 ${
                      currentLanguage === 'zh' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-700'
                    }`}
                  >
                    🇨🇳 中文
                  </button>
                  <button
                    onClick={() => {
                      console.log('🇺🇸 Mobile English button clicked');
                      handleLanguageChange('en');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors duration-200 rounded-b-md ${
                      currentLanguage === 'en' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-700'
                    }`}
                  >
                    🇺🇸 EN
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
            >
              <span className="sr-only">{getTranslation(currentLanguage, 'navigation.openMenu')}</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-base font-semibold transition-all duration-300 ${
                  router.asPath === item.href
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Open Source Button */}
            <div className="px-4 py-3 border-t border-gray-200">
              <a
                href="https://github.com/HKUSTMDI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>{getTranslation(currentLanguage, 'navigation.openSource')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;