import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { CollaborationPageData } from '@/types';
import { loadCollaborationDetailData, loadCollaborationPageData } from '@/utils/markdown';
import { getTranslation } from '@/utils/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CollaborationPage from '@/components/CollaborationPage';

interface CollaborationDetailPageProps {
  data: CollaborationPageData;
  slug: string;
  locale: string;
}

const CollaborationDetailPage: React.FC<CollaborationDetailPageProps> = ({ data, slug, locale }) => {
  const { language } = useLanguage();
  
  const collaboration = data.collaborations[0];
  const pageTitle = collaboration 
    ? `${collaboration.title} - ${getTranslation(language, 'details.collaboration.title')} - MDI Lab`
    : `${getTranslation(language, 'details.collaboration.title')} - MDI Lab`;
    
  const pageDescription = collaboration
    ? collaboration.intro
    : getTranslation(language, 'details.collaboration.description');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={getTranslation(language, 'details.collaboration.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="relative flex-1">
          <CollaborationPage data={data} language={language} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // 获取所有合作项目的slug
    const zhData = loadCollaborationPageData('zh');
    const enData = loadCollaborationPageData('en');
    
    const allSlugs = [
      ...zhData.collaborations.map(item => item.slug),
      ...enData.collaborations.map(item => item.slug)
    ];
    
    // 去重
    const uniqueSlugs = Array.from(new Set(allSlugs));
    
    const paths = uniqueSlugs.flatMap((slug) => [
      { params: { locale: 'zh', slug } },
      { params: { locale: 'en', slug } },
    ]);
    
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error generating static paths for collaboration details:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps<CollaborationDetailPageProps> = async ({ 
  params
}) => {
  try {
    const slug = params?.slug as string;
    const locale = params?.locale as string;
    const language = locale === 'en' ? 'en' : 'zh';
    
    if (!slug) {
      return {
        notFound: true,
      };
    }
    
    const data = loadCollaborationDetailData(slug, language);
    
    if (!data) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        data,
        slug,
        locale,
      },
    };
  } catch (error) {
    console.error('Error loading collaboration detail data:', error);
    
    return {
      notFound: true,
    };
  }
};

export default CollaborationDetailPage;
