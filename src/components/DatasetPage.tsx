'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DatasetPageProps, type DatasetItem } from '@/types';
import { getTranslation } from '@/utils/i18n';

const DatasetPage: React.FC<DatasetPageProps> = ({ data, language }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            {getTranslation(language, 'common.datasets')}
          </h1>
        </div>
      </div>

      {/* 数据集列表 */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-0">
          {data.datasets.map((dataset, index) => (
            <DatasetItem key={dataset.id} dataset={dataset} isLast={index === data.datasets.length - 1} language={language} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface DatasetItemProps {
  dataset: DatasetItem;
  isLast: boolean;
  language: 'zh' | 'en';
}

const DatasetItem: React.FC<DatasetItemProps> = ({ dataset, isLast, language }) => {
  return (
    <Link href={`/${language}/dataset/${dataset.slug}`}>
      <div className={`group flex flex-col md:flex-row p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer ${isLast ? '' : 'border-b border-dashed border-gray-200'}`}>
        {/* 数据集图片 */}
        <div className="w-full md:w-48 h-32 md:h-24 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
          <Image
            src={dataset.image}
            alt={dataset.title}
            width={192}
            height={96}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* 数据集信息 */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {dataset.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
            {dataset.intro}
          </p>
          
          {/* Leader 信息 */}
          {dataset.leader && dataset.leader.name && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {dataset.leader.avatar && (
                  <img
                    src={dataset.leader.avatar}
                    alt={dataset.leader.name}
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                )}
                <span className="text-sm text-gray-700 font-medium">
                  {dataset.leader.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DatasetPage;
