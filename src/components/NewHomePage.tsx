'use client';

import React from 'react';
import WhatWeDoSection from './WhatWeDoSection';
import MedicalProductsSection from './MedicalProductsSection';
import WhoWeAreSection from './WhoWeAreSection';
import PartnersSection from './PartnersSection';
import Footer from './Footer';

interface NewHomePageProps {
  partners?: {
    title: string;
    partners: Array<{
      name: string;
      logo: string;
      alt: string;
      caption: string;
    }>;
  };
  whatWeDoData?: any;
  medicalProductsData?: any;
  whoWeAreData?: any;
}

const NewHomePage: React.FC<NewHomePageProps> = ({ partners, whatWeDoData, medicalProductsData, whoWeAreData }) => {
  
  return (
    <div className="min-h-screen">
      {/* 我们是谁部分 */}
      <section className="bg-white">
        <WhoWeAreSection data={whoWeAreData} />
      </section>

      {/* 我们在做什么部分 */}
      <section className="bg-white">
        <WhatWeDoSection data={whatWeDoData} />
      </section>
      
      {/* 医疗数据产品研发部分 */}
      <section className="bg-gray-50">
        <MedicalProductsSection data={medicalProductsData} />
      </section>
      
      {/* 合作伙伴部分 */}
      {partners && (
        <section className="bg-gradient-to-br from-gray-50 to-white">
          <PartnersSection partners={partners} />
        </section>
      )}
      
      {/* Footer部分 */}
      <footer className="bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default NewHomePage;
