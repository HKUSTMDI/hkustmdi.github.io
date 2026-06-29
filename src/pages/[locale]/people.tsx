import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { PeoplePageData } from '@/types';
import { loadPeoplePageData } from '@/utils/markdown';
import { getTranslation } from '@/utils/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PeoplePage from '@/components/PeoplePage';

interface PeoplePageProps {
  data: PeoplePageData;
  locale: string;
}

const PeoplePageRoute: React.FC<PeoplePageProps> = ({ data, locale }) => {
  const { language } = useLanguage();
  
  const pageTitle = `${getTranslation(language, 'pages.people.title')} - MDI Lab`;
    
  const pageDescription = getTranslation(language, 'people.description');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={getTranslation(language, 'pages.people.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <main className="relative pt-20 md:pt-0">
          <PeoplePage data={data} language={language} />
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

export const getStaticProps: GetStaticProps<PeoplePageProps> = async ({ params }) => {
  try {
    const language = (params?.locale as string) || 'zh';
    const data = loadPeoplePageData(language);
    
    return {
      props: {
        data,
        locale: language,
      },
    };
  } catch (error) {
    console.error('Error loading people page data:', error);
    
    // 返回空数据作为回退
    return {
      props: {
        data: {
          leader: {
            name: '',
            position: '',
            avatar: '',
            introduction: '',
            achievements: [],
          },
          currentMembers: [],
          pastMembers: [],
        },
        locale: 'zh',
      },
    };
  }
};

export default PeoplePageRoute;
