import React from 'react';
import { WhatWeDoSectionProps, WhatWeDoPageData } from '@/types';

interface WhatWeDoSectionPropsWithData extends WhatWeDoSectionProps {
  data?: any;
}

const WhatWeDoSection: React.FC<WhatWeDoSectionPropsWithData> = ({ className = '', data }) => {
  // 直接使用传入的数据
  const currentData = data || {};

  return (
    <div className={`what-we-do-section py-16 px-4 md:py-24 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* 主标题 */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {currentData?.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto px-4">
            {currentData?.description}
          </p>
        </div>

        {/* 核心工作标题 */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {currentData?.coreTitle}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            {currentData?.coreDescription}
          </p>
        </div>

        {/* 三个核心工作流程 */}
        <div className="space-y-8 sm:space-y-12">
          {/* 数据融合与治理 */}
          <div className="mb-12 sm:mb-16">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {currentData?.dataIntegration?.title}
            </h4>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed px-2 mb-4">
              {currentData?.dataIntegration?.description}
            </p>
            
            {/* 数据项列表 */}
            {currentData?.dataIntegration?.items && currentData.dataIntegration.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 w-full">
                {currentData.dataIntegration.items.map((item: any, index: number) => (
                  <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    <h5 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {item.title}
                    </h5>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 模型构建与训练 */}
          <div className="mb-12 sm:mb-16">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {currentData?.modelBuilding?.title}
            </h4>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed px-2">
              {currentData?.modelBuilding?.description}
            </p>
          </div>

          {/* 临床验证与应用 */}
          <div className="mb-12 sm:mb-16">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {currentData?.clinicalValidation?.title}
            </h4>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed px-2">
              {currentData?.clinicalValidation?.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatWeDoSection;