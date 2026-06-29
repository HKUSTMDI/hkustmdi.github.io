import React from 'react';
import { getTranslation, type Locale } from '@/utils/i18n';

interface KeywordFilterProps {
  keywords: string[];
  selectedKeywords: string[];
  onKeywordToggle: (keyword: string) => void;
  onClearAll: () => void;
  isMobile: boolean;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  language: Locale;
}

export const KeywordFilter: React.FC<KeywordFilterProps> = ({
  keywords,
  selectedKeywords,
  onKeywordToggle,
  onClearAll,
  isMobile,
  isDrawerOpen,
  onCloseDrawer,
  language
}) => {
  if (isMobile) {
    return (
      <>
        {/* 移动端遮罩 */}
        {isDrawerOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onCloseDrawer}
          />
        )}
        
        {/* 移动端侧滑抽屉 */}
        <div className={`fixed top-0 right-0 h-full w-4/5 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {getTranslation(language, 'pages.project.keywordsLabel')}
              </h3>
              <button
                onClick={onCloseDrawer}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => onKeywordToggle(keyword)}
                    className={`px-3 py-2 text-sm rounded-full border transition-all duration-300 ${
                      selectedKeywords.includes(keyword)
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
              
              <button
                onClick={onClearAll}
                className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {getTranslation(language, 'pages.project.clearAll')}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 桌面端筛选栏
  return (
    <div className="w-full md:w-1/5 bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {getTranslation(language, 'pages.project.keywordsLabel')}
      </h3>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => onKeywordToggle(keyword)}
              className={`px-3 py-2 text-sm rounded-full border transition-all duration-300 ${
                selectedKeywords.includes(keyword)
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
        
        <button
          onClick={onClearAll}
          className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {getTranslation(language, 'pages.project.clearAll')}
        </button>
      </div>
    </div>
  );
};