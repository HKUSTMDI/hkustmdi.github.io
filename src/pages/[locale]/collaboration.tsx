import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { CollaborationPageData } from '@/types';
import { loadCollaborationPageData } from '@/utils/markdown';
import { getTranslation } from '@/utils/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CollaborationPage from '@/components/CollaborationPage';

interface CollaborationPageProps {
  data: CollaborationPageData;
  locale: string;
}

const CollaborationPageRoute: React.FC<CollaborationPageProps> = ({ data, locale }) => {
  const { language } = useLanguage();
  
  const pageTitle = `${getTranslation(language, 'pages.collaboration.title')} - MDI Lab`;
    
  const pageDescription = getTranslation(language, 'pages.collaboration.description');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={getTranslation(language, 'pages.collaboration.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <main className="relative pt-20 md:pt-0">
          <CollaborationPage data={data} language={language} />
        </main>
        <Footer />
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

export const getStaticProps: GetStaticProps<CollaborationPageProps> = async ({ params }) => {
  try {
    const language = (params?.locale as string) || 'zh';
    const data = loadCollaborationPageData(language);
    
    return {
      props: {
        data,
        locale: language,
      },
    };
  } catch (error) {
    console.error('Error loading collaboration page data:', error);
    
    // 返回空数据作为回退
    return {
      props: {
        data: {
          introduction: '',
          collaborations: [],
        },
        locale: 'zh',
      },
    };
  }
};

export default CollaborationPageRoute;
