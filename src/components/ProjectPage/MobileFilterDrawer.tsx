import React from 'react';
import { getTranslation, type Locale } from '@/utils/i18n';
import { KeywordFilter } from './KeywordFilter';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  keywords: string[];
  selectedKeywords: string[];
  onKeywordToggle: (keyword: string) => void;
  onClearAll: () => void;
  language: Locale;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  keywords,
  selectedKeywords,
  onKeywordToggle,
  onClearAll,
  language
}) => {
  return (
    <KeywordFilter
      keywords={keywords}
      selectedKeywords={selectedKeywords}
      onKeywordToggle={onKeywordToggle}
      onClearAll={onClearAll}
      isMobile={true}
      isDrawerOpen={isOpen}
      onCloseDrawer={onClose}
      language={language}
    />
  );
};