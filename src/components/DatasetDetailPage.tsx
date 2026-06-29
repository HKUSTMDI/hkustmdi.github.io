'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type DatasetItem } from '@/types';
import { getTranslation, type Locale } from '@/utils/i18n';

interface DatasetDetailPageProps {
  dataset: DatasetItem;
  language: string;
}

interface BreadcrumbProps {
  datasetTitle: string;
  language: string;
}

interface DatasetLeaderProps {
  leader: {
    name: string;
    avatar: string;
  };
}

// 面包屑导航组件
const Breadcrumb: React.FC<BreadcrumbProps> = ({ datasetTitle, language }) => {
  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link 
            href={`/${language}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {getTranslation(language as Locale, 'common.home')}
          </Link>
        </li>
        <li className="flex items-center">
          <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link 
            href={`/${language}/dataset`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {getTranslation(language as Locale, 'common.datasets')}
          </Link>
        </li>
        <li className="flex items-center">
          <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-800 font-medium">{datasetTitle}</span>
        </li>
      </ol>
    </nav>
  );
};

// 数据集负责人组件
const DatasetLeader: React.FC<DatasetLeaderProps> = ({ leader }) => {
  return (
    <div className="flex items-center mb-8">
      <img
        src={leader.avatar}
        alt={leader.name}
        className="w-10 h-10 rounded-full border-2 border-gray-200 mr-3 object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-700">{leader.name}</h3>
    </div>
  );
};

// 主数据集详情页面组件
const DatasetDetailPage: React.FC<DatasetDetailPageProps> = ({ dataset, language }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12 pt-32">
        {/* 面包屑导航 */}
        <Breadcrumb datasetTitle={dataset.title} language={language} />
        
        {/* 数据集标题 */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {dataset.title}
        </h1>
        
        {/* 数据集负责人 */}
        <DatasetLeader leader={dataset.leader} />
        
        {/* 联系信息和下载链接 */}
        {(dataset.email || dataset.downloadUrl) && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {getTranslation(language as Locale, 'common.contactAndDownload')}
            </h3>
            <div className="space-y-3">
              {dataset.email && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 mr-2">邮箱:</span>
                  <a 
                    href={`mailto:${dataset.email}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {dataset.email}
                  </a>
                </div>
              )}
              {dataset.downloadUrl && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-600 mr-2">下载:</span>
                  <a 
                    href={dataset.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {getTranslation(language as Locale, 'common.downloadDataset')}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* 数据集详情图片 */}
        <div className="mb-8">
          <img
            src={dataset.image}
            alt={dataset.title}
            className="w-full h-auto rounded-xl shadow-lg object-contain"
          />
        </div>
        
        {/* 数据集描述 */}
        <div className="mb-8">
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {getTranslation(language as Locale, 'common.datasetDescription')}
          </h2> */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="whitespace-pre-line">{dataset.description}</p>
          </div>
        </div>
        
        {/* 数据集简介 */}
        {/* <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {getTranslation(language as Locale, 'common.datasetOverview')}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>{dataset.intro}</p>
          </div>
        </div> */}
        
        {/* 返回按钮 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/${language}/dataset`}
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {getTranslation(language as Locale, 'common.backToDatasets')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetailPage;
