import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ProjectPageData } from '@/types';
import { loadProjectPageData, loadProjectDetailData } from '@/utils/markdown';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectDetailPage from '@/components/ProjectDetailPage';
import { getTranslation } from '@/utils/i18n';

interface ProjectDetailPageProps {
  data: ProjectPageData | null;
  slug: string;
  locale: string;
}

const ProjectDetailPageRoute: React.FC<ProjectDetailPageProps> = ({ data, slug, locale }) => {
  const { language } = useLanguage();
  
  const project = data?.projects[0];
  const pageTitle = project 
    ? `${project.title} - ${getTranslation(language, 'details.project.title')} - MDI Lab`
      : `${getTranslation(language, 'details.project.title')} - MDI Lab`;
    
  const pageDescription = project
    ? project.intro
    : getTranslation(language, 'details.project.description');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={project?.keywords.join(',') || getTranslation(language, 'details.project.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <main className="relative">
          {data ? (
            <ProjectDetailPage data={data} language={language} />
          ) : (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-32">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation(language, 'details.project.notFound')}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {getTranslation(language, 'details.project.notFoundDescription')}
          </p>
          <Link 
            href={`/${language}/project`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {getTranslation(language, 'details.project.backToList')}
          </Link>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // 获取所有语言的项目数据
    const zhData = loadProjectPageData('zh');
    const enData = loadProjectPageData('en');
    
    // 合并所有项目的slug
    const allSlugs = [
      ...zhData.projects.map(project => project.slug),
      ...enData.projects.map(project => project.slug)
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
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps<ProjectDetailPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const locale = params?.locale as string;
    const language = locale === 'en' ? 'en' : 'zh';
    
    if (!slug) {
      return {
        notFound: true,
      };
    }
    
    const data = loadProjectDetailData(slug, language);
    
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
    console.error('Error loading project detail data:', error);
    return {
      notFound: true,
    };
  }
};

export default ProjectDetailPageRoute;
