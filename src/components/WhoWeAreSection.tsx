import React from 'react';
import Image from 'next/image';
import { getTranslation } from '@/utils/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMobile } from '@/hooks/useMobile';
import { WhoWeAreSectionProps, WhoWeArePageData } from '@/types';

interface WhoWeAreSectionPropsWithData extends WhoWeAreSectionProps {
  data?: any;
}

const WhoWeAreSection: React.FC<WhoWeAreSectionPropsWithData> = ({ className = '', data }) => {
  const { language } = useLanguage();
  const isMobile = useMobile();

  // 直接使用传入的数据，如果没有数据则使用默认数据
  const currentData = data || {
    title: getTranslation(language, 'home.whoWeAre.title'),
    description: getTranslation(language, 'home.whoWeAre.description'),
    missions: [],
    mission: getTranslation(language, 'home.whoWeAre.mission'),
    support: getTranslation(language, 'home.whoWeAre.support')
  };

  return (
    <div className={`who-we-are-section pt-24 pb-16 px-4 md:pt-32 md:pb-24 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* 标题部分 */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {currentData.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto px-4">
            {currentData.description}
          </p>
        </div>

        {/* 使命与支持 */}
        <div className="space-y-8 sm:space-y-12">
          {/* 使命 */}
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              {getTranslation(language, 'common.ourMission')}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
              {currentData.mission}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAreSection;