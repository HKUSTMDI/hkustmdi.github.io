import React from 'react';
import Link from 'next/link';
import { CollaborationPageData, CollaborationItem } from '@/types';
import { getTranslation } from '@/utils/i18n';

interface CollaborationPageProps {
  data: CollaborationPageData;
  language: 'zh' | 'en';
}

// 面包屑导航组件
const Breadcrumb: React.FC<{ 
  currentTitle: string; 
  language: 'zh' | 'en';
}> = ({ currentTitle, language }) => {
  return (
    <nav className="breadcrumb text-sm text-gray-600 mb-6">
      <Link 
        href={`/${language}`}
        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
      >
        {getTranslation(language, 'collaboration.projects.breadcrumb.home')}
      </Link>
      <span className="breadcrumb-separator mx-2 text-gray-400">&gt;</span>
      <Link 
        href={`/${language}/collaboration`}
        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
      >
        {getTranslation(language, 'collaboration.projects.breadcrumb.collaboration')}
      </Link>
      <span className="breadcrumb-separator mx-2 text-gray-400">&gt;</span>
      <span className="breadcrumb-current text-gray-800 font-medium">
        {currentTitle}
      </span>
    </nav>
  );
};

// 合作项目卡片组件
const CollaborationCard: React.FC<{ 
  collaboration: CollaborationItem; 
  language: 'zh' | 'en';
}> = ({ collaboration, language }) => {
  return (
    <Link href={`/${language}/collaboration/${collaboration.slug}`}>
      <div className="collaboration-card bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer h-96 flex flex-col">
        {/* 项目图片 */}
        <div className="collaboration-card-image-container overflow-hidden h-32 flex-shrink-0">
          <img
            src={collaboration.image}
            alt={collaboration.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* 卡片内容 */}
        <div className="collaboration-card-content p-5 flex-1 flex flex-col">
          {/* 项目标题 - 固定2行高度 */}
          <div className="collaboration-title mb-3 h-12 flex items-start">
            <h3 className="collaboration-name text-base font-semibold text-gray-800 line-clamp-2 leading-6">
              {collaboration.title}
            </h3>
          </div>
          
          {/* 合作简介 */}
          <p className="collaboration-intro text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 flex-1">
            {collaboration.intro}
          </p>
          
          {/* 了解更多链接 */}
          <div className="collaboration-link text-blue-600 text-sm font-medium mb-4 group-hover:underline">
            {getTranslation(language, 'collaboration.projects.learnMore')}
          </div>
          
          {/* 底部信息：合作单位和开始时间 */}
          <div className="collaboration-bottom flex items-start justify-between mt-auto mb-2">
            {/* 合作开始时间 */}
            <div className="collaboration-date text-xs text-gray-500 flex-shrink-0">
              {collaboration.startDate}
            </div>
            
            {/* 合作单位 */}
            <div className="collaboration-partner flex items-center ml-3">
              <img
                src={collaboration.partnerLogo}
                alt={collaboration.partnerName}
                className="collaboration-logo w-6 h-6 rounded mr-2 flex-shrink-0"
              />
              <span className="collaboration-partner-name text-xs text-gray-500 leading-4 break-words">
                {collaboration.partnerName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// 合作项目网格组件
const CollaborationGrid: React.FC<{ 
  collaborations: CollaborationItem[]; 
  language: 'zh' | 'en';
}> = ({ collaborations, language }) => {
  // 按开始时间倒序排列（最新的在前）
  const sortedCollaborations = [...collaborations].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className="collaboration-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {sortedCollaborations.map((collaboration) => (
        <CollaborationCard
          key={collaboration.id}
          collaboration={collaboration}
          language={language}
        />
      ))}
    </div>
  );
};

// 参与人员组件
const ParticipantsSection: React.FC<{ 
  participants: string[]; 
  language: 'zh' | 'en';
}> = ({ participants, language }) => {
  if (!participants || participants.length === 0) {
    return null;
  }

  return (
    <div className="collaboration-participants mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {getTranslation(language, 'collaboration.participants.title')}
      </h3>
      <div className="participants-list flex flex-wrap gap-2">
        {participants.map((participant, index) => (
          <span 
            key={index} 
            className="participant-tag bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {participant}
          </span>
        ))}
      </div>
    </div>
  );
};

// 合作详情页组件
const CollaborationDetail: React.FC<{ 
  collaboration: CollaborationItem; 
  language: 'zh' | 'en';
}> = ({ collaboration, language }) => {
  return (
    <div className="collaboration-detail max-w-4xl mx-auto px-6 pt-24 pb-8 min-h-[60vh]">
      {/* 面包屑导航 */}
      <Breadcrumb currentTitle={collaboration.title} language={language} />
      
      {/* 项目标题 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {collaboration.title}
      </h1>
      
      {/* 合作单位 Logo 和名称 */}
      <div className="collaboration-detail-logo-name flex items-center mb-8">
        <img
          src={collaboration.partnerLogo}
          alt={collaboration.partnerName}
          className="collaboration-detail-logo w-12 h-12 rounded mr-4 flex-shrink-0"
        />
        <h2 className="collaboration-detail-name text-2xl font-semibold text-gray-800">
          {collaboration.partnerName}
        </h2>
      </div>
      
      {/* 合作方和团队信息 */}
      {collaboration.team && (
        <div className="collaboration-detail-team mb-6">
          <p className="text-lg text-gray-700">
            <span className="font-medium">{getTranslation(language, 'collaboration.partner')}：</span>
            <span className="text-black font-semibold ml-2">{collaboration.team}</span>
          </p>
        </div>
      )}
      
      {/* 参与人员信息 */}
      {collaboration.participants && (
        <ParticipantsSection 
          participants={collaboration.participants} 
          language={language} 
        />
      )}
      
      {/* 项目图片 */}  
      <div className="collaboration-detail-image mb-8">
        <img
          src={collaboration.image}
          alt={collaboration.title}
          className="w-full h-auto object-contain rounded-xl shadow-md"
        />
      </div>
      
      {/* 详细信息 */}
      <div className="collaboration-detail-content">
        <div 
          className="text-gray-700 leading-relaxed prose prose-lg max-w-none whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: collaboration.description }}
        />
      </div>
    </div>
  );
};

// 主合作页面组件
const CollaborationPage: React.FC<CollaborationPageProps> = ({ data, language }) => {
  // 如果是详情页（只有一个合作项目），显示详情页
  if (data.collaborations.length === 1) {
    return <CollaborationDetail collaboration={data.collaborations[0]} language={language} />;
  }
  
  // 否则显示列表页
  return (
    <div className="collaboration-page min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="page-header pt-24 pb-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {getTranslation(language, 'collaboration.title')}
          </h1>
        </div>
      </div>

      {/* 合作项目总览区域 */}
      <div className="collaboration-projects-section py-16">
        <div className="max-w-6xl mx-auto px-6">
          
          <CollaborationGrid 
            collaborations={data.collaborations} 
            language={language} 
          />
        </div>
      </div>
    </div>
  );
};

export default CollaborationPage;
