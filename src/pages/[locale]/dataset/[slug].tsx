import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { DatasetItem, DatasetDataJSON } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DatasetDetailPage from '@/components/DatasetDetailPage';
import { getTranslation } from '@/utils/i18n';

interface DatasetDetailPageProps {
  dataset: DatasetItem;
  locale: string;
}

const DatasetDetail: React.FC<DatasetDetailPageProps> = ({ dataset, locale }) => {
  const { language } = useLanguage();
  
  const pageTitle = `${dataset.title} - ${getTranslation(language, 'details.dataset.title')} - MDI Lab`;
  const pageDescription = dataset.intro;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={getTranslation(language, 'details.dataset.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20">
          <DatasetDetailPage dataset={dataset} language={language} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // 读取数据集数据
    const fs = require('fs');
    const path = require('path');
    
    const dataPath = path.join(process.cwd(), 'content/pages/datasets/datasets.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const datasetData: DatasetDataJSON = JSON.parse(jsonData);
    
    // 生成所有数据集的路径
    const paths: { params: { locale: string; slug: string } }[] = [];
    
    // 为每个语言生成路径
    const locales = ['zh', 'en'];
    locales.forEach(locale => {
      const datasets = datasetData[locale as keyof DatasetDataJSON]?.datasets || [];
      datasets.forEach((dataset) => {
        paths.push({
          params: { locale, slug: dataset.slug },
        });
      });
    });
    
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

export const getStaticProps: GetStaticProps<DatasetDetailPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const locale = params?.locale as string;
    
    // 读取数据集数据
    const fs = require('fs');
    const path = require('path');
    
    const dataPath = path.join(process.cwd(), 'content/pages/datasets/datasets.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const datasetData: DatasetDataJSON = JSON.parse(jsonData);
    
    // 根据语言查找对应的数据集
    const datasets = datasetData[locale as keyof DatasetDataJSON]?.datasets || [];
    const dataset = datasets.find(d => d.slug === slug);
    
    if (!dataset) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        dataset,
        locale,
      },
    };
  } catch (error) {
    console.error('Error loading dataset detail:', error);
    return {
      notFound: true,
    };
  }
};

export default DatasetDetail;
