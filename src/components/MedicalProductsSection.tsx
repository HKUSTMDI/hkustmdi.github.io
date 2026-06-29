import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslation } from '@/utils/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMobile } from '@/hooks/useMobile';
import { MedicalProductsSectionProps, MedicalProductsPageData } from '@/types';

interface MedicalProductsSectionPropsWithData extends MedicalProductsSectionProps {
  data?: any;
}

const MedicalProductsSection: React.FC<MedicalProductsSectionPropsWithData> = ({ className = '', data }) => {
  const { language } = useLanguage();
  const isMobile = useMobile();

  // 直接使用传入的数据，如果没有数据则使用默认数据
  const currentData = data || {
    title: getTranslation(language, 'home.medicalProducts.title'),
    subtitle: getTranslation(language, 'home.medicalProducts.subtitle'),
    description: getTranslation(language, 'home.medicalProducts.description'),
    products: []
  };

  // 获取要显示的合作项目索引数组
  const getDisplayCollaborations = () => {
    const collaborations = data?.collaborations || [];
    const displayIndexes = data?.displayCollaborationIndexes || []; // 例如: [0, 2, 5, 7, 9, 10]
    
    if (displayIndexes.length > 0) {
      // 根据索引数组获取指定的合作项目
      return displayIndexes.map((index: number) => collaborations[index]).filter(Boolean);
    }
    
    // 默认显示最后六个
    return collaborations.slice(-6);
  };

  const displayCollaborations = getDisplayCollaborations();

  return (
    <div className={`medical-products-section py-16 px-4 md:py-24 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* 标题部分 */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {currentData.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6 sm:mb-8"></div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
            {currentData.subtitle}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto px-4">
            {currentData.description}
          </p>
        </div>

        {/* 产品列表 */}
        {currentData.products && currentData.products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {currentData.products.map((product: any, index: number) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {product.name}
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 图片展示 */}
        <div className="mt-12 sm:mt-16">
          <div className={`desc-image-container grid gap-4 sm:gap-6 md:gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
            {displayCollaborations.map((collaboration: any, index: number) => (
              <div key={collaboration.id || index} className="flex justify-center">
                <Link href={`/${language}/collaboration/${collaboration.slug}`}>
                  <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <img 
                      src={collaboration.image} 
                      alt={collaboration.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalProductsSection;