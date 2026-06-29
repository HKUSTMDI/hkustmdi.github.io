import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { loadPartnersData, loadWhatWeDoData, loadMedicalProductsData, loadWhoWeAreData } from '@/utils/markdown';
import { useLanguage } from '@/contexts/LanguageContext';
import NewHomePage from '@/components/NewHomePage';
import Navigation from '@/components/Navigation';

interface HomePageProps {
  locale: string;
  partners: any;
  whatWeDoData: any;
  medicalProductsData: any;
  whoWeAreData: any;
}

const HomePage: React.FC<HomePageProps> = ({ locale, partners, whatWeDoData, medicalProductsData, whoWeAreData }) => {
  const { language } = useLanguage();
  
  const pageTitle = locale === 'zh' 
    ? 'MDI实验室 - 医疗数据智能与病理学人工智能研究'
    : 'MDI Lab - Medical Data Intelligence and Pathology AI Research';
    
  const pageDescription = locale === 'zh'
    ? 'MDI实验室专注于医疗数据智能、病理学人工智能和多模态大模型研究，与多家知名医院合作，致力于通过AI技术提升病理诊断准确性和医疗服务质量。'
    : 'MDI Lab focuses on medical data intelligence, pathology AI, and multimodal large model research, collaborating with renowned hospitals to enhance pathological diagnosis accuracy and medical service quality through AI technology.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="HKUST(GZ),港科大,科技,Technology,Science,大学,University,MDI Lab,MDI实验室" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <main className="relative">
          <NewHomePage 
            partners={partners} 
            whatWeDoData={whatWeDoData}
            medicalProductsData={medicalProductsData}
            whoWeAreData={whoWeAreData}
          />
        </main>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { locale: 'zh' } },
      { params: { locale: 'en' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ params }) => {
  try {
    const language = (params?.locale as string) || 'zh';
    const partners = loadPartnersData(language);
    const whatWeDoData = loadWhatWeDoData(language);
    const medicalProductsData = loadMedicalProductsData(language);
    const whoWeAreData = loadWhoWeAreData(language);
    
    return {
      props: {
        locale: language,
        partners,
        whatWeDoData,
        medicalProductsData,
        whoWeAreData,
      },
    };
  } catch (error) {
    console.error('Error loading home data:', error);
    
    // 返回空数据作为回退
    return {
      props: {
        locale: 'zh',
        partners: { title: '我们的合作伙伴', partners: [] },
        whatWeDoData: null,
        medicalProductsData: null,
        whoWeAreData: null,
      },
    };
  }
};

export default HomePage;
