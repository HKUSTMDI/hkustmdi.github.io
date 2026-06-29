'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface Partner {
  name: string;
  logo: string;
  alt: string;
  caption: string;
}

interface PartnersSectionProps {
  partners: {
    title: string;
    partners: Partner[];
  };
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ partners }) => {
  const { language } = useLanguage();
  
  const title = partners.title;
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16 pt-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        {/* 合作伙伴Logo网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 items-center">
          {partners.partners.map((partner, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative"
            >
              <div className="relative w-full h-28 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  className="object-contain transition-all duration-300"
                  sizes="(max-width: 768px) 180px, (max-width: 1024px) 240px, 300px"
                />
              </div>
              {/* Caption tooltip */}
              {partner.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 text-white text-sm text-center rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.caption}
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PartnersSection;
