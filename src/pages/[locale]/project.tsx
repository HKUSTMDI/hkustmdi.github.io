import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ProjectPageData } from '@/types';
import { loadProjectPageData } from '@/utils/markdown';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectPage from '@/components/ProjectPage';
import { getTranslation } from '@/utils/i18n';

interface ProjectPageProps {
  data: ProjectPageData;
  locale: string;
}

const ProjectPageRoute: React.FC<ProjectPageProps> = ({ data, locale }) => {
  const { language } = useLanguage();
  
  const pageTitle = `${getTranslation(language, 'pages.project.title')} - MDI Lab`;
    
  const pageDescription = getTranslation(language, 'pages.project.description');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={getTranslation(language, 'pages.project.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <main className="relative pt-20 md:pt-0">
          <ProjectPage data={data} language={language} />
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

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  try {
    const language = (params?.locale as string) || 'zh';
    const data = loadProjectPageData(language);
    
    return {
      props: {
        data,
        locale: language,
      },
    };
  } catch (error) {
    console.error('Error loading project page data:', error);
    
    // 返回空数据作为回退
    return {
      props: {
        data: {
          projects: [],
        },
        locale: 'zh',
      },
    };
  }
};

export default ProjectPageRoute;
