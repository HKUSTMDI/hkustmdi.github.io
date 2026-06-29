import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { DatasetPageProps, DatasetDataJSON } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DatasetPage from '@/components/DatasetPage';
import { getTranslation } from '@/utils/i18n';

interface DatasetPagePropsWithLocale {
  data: DatasetPageProps['data'];
  locale: string;
}

const DatasetListPage: React.FC<DatasetPagePropsWithLocale> = ({ data, locale }) => {
  const { language } = useLanguage();
  
  const pageTitle = `${getTranslation(language, 'pages.dataset.title')} - MDI Lab`;
    
  const pageDescription = getTranslation(language, 'pages.dataset.description');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={getTranslation(language, 'pages.dataset.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20 md:pt-0">
          <DatasetPage data={data} language={language} />
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

export const getStaticProps: GetStaticProps<DatasetPagePropsWithLocale> = async ({ params }) => {
  try {
    const language = (params?.locale as string) || 'zh';
    
    // 读取数据集数据
    const fs = require('fs');
    const path = require('path');
    
    const dataPath = path.join(process.cwd(), 'content/pages/datasets/datasets.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const datasetData: DatasetDataJSON = JSON.parse(jsonData);
    
    // 根据语言选择数据
    const data = datasetData[language as keyof DatasetDataJSON] || datasetData.zh;
    
    return {
      props: {
        data,
        locale: language,
      },
    };
  } catch (error) {
    console.error('Error loading dataset data:', error);
    
    // 返回空数据作为回退
    return {
      props: {
        data: { datasets: [] },
        locale: 'zh',
      },
    };
  }
};

export default DatasetListPage;
