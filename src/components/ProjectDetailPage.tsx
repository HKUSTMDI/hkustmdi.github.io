import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type ProjectItem, type ProjectPageData } from '@/types';
import { getTranslation, type Locale } from '@/utils/i18n';

interface ProjectDetailPageProps {
  data: ProjectPageData;
  language: string;
}

interface BreadcrumbProps {
  projectTitle: string;
  language: string;
}

interface ProjectLeaderProps {
  leader: {
    name: string;
    avatar: string;
  } | Array<{
    name: string;
    avatar: string;
  }>;
}

interface PDFLinkProps {
  pdfUrl: string;
  paperTitle: string;
  language: string;
}

// 面包屑导航组件
const Breadcrumb: React.FC<BreadcrumbProps> = ({ projectTitle, language }) => {
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
            href={`/${language}/project`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {getTranslation(language as Locale, 'common.projects')}
          </Link>
        </li>
        <li className="flex items-center">
          <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-800 font-medium">{projectTitle}</span>
        </li>
      </ol>
    </nav>
  );
};

// 项目负责人组件
interface ProjectLeaderComponentProps {
  leader: ProjectLeaderProps['leader'];
  language: string;
}

const ProjectLeader: React.FC<ProjectLeaderComponentProps> = ({ leader, language }) => {
  const leaders = Array.isArray(leader) ? leader : [leader];
  
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-600 mb-3">
        {language === 'zh' ? '项目负责人' : 'Project Leader' + (leaders.length > 1 ? 's' : '')}
      </h3>
      <div className="flex flex-wrap gap-4">
        {leaders.map((leaderItem, index) => (
          <div key={index} className="flex items-center">
            <img
              src={leaderItem.avatar}
              alt={leaderItem.name}
              className="w-10 h-10 rounded-full border-2 border-gray-200 mr-3 object-cover"
            />
            <span className="text-lg font-semibold text-gray-700">{leaderItem.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// PDF链接组件
const PDFLink: React.FC<PDFLinkProps> = ({ pdfUrl, paperTitle, language }) => {
  return (
    <div className="my-8">
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg max-w-full"
      >
        <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
        <span className="font-medium text-left flex-1 truncate">
          {paperTitle}
        </span>
        <svg className="w-4 h-4 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
};

// 专利信息组件
interface PatentProps {
  patent: {
    name: string;
    number: string;
    applicationDate: string;
    applicants?: string[];
    inventors?: string[];
  };
  language: string;
}

const PatentInfo: React.FC<PatentProps> = ({ patent, language }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'zh' ? '专利信息' : 'Patent Information'}
          </h3>
          <div className="space-y-3">
            {/* 专利名称 */}
            <div>
              <span className="text-sm font-medium text-gray-600">
                {language === 'zh' ? '专利名称：' : 'Patent Name: '}
              </span>
              <span className="text-sm text-gray-800">{patent.name}</span>
            </div>
            
            {/* 专利号 */}
            <div>
              <span className="text-sm font-medium text-gray-600">
                {language === 'zh' ? '专利号：' : 'Patent Number: '}
              </span>
              <span className="text-sm text-gray-800 font-mono">{patent.number}</span>
            </div>
            
            {/* 申请日期 */}
            {patent.applicationDate && (
              <div>
                <span className="text-sm font-medium text-gray-600">
                  {language === 'zh' ? '申请日期：' : 'Application Date: '}
                </span>
                <span className="text-sm text-gray-800">{patent.applicationDate}</span>
              </div>
            )}
            
            {/* 申请人 */}
            {patent.applicants && patent.applicants.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-600">
                  {language === 'zh' ? '申请人：' : 'Applicants: '}
                </span>
                <div className="mt-1">
                  <span className="text-sm text-gray-800">{patent.applicants.join(', ')}</span>
                </div>
              </div>
            )}
            
            {/* 发明人 */}
            {patent.inventors && patent.inventors.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-600">
                  {language === 'zh' ? '发明人：' : 'Inventors: '}
                </span>
                <div className="mt-1">
                  <span className="text-sm text-gray-800">{patent.inventors.join(', ')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 主项目详情页面组件
const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ data, language }) => {
  const project = data.projects[0]; // 详情页只显示一个项目
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation(language as Locale, 'details.project.notFound')}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {getTranslation(language as Locale, 'details.project.notFoundDescription')}
          </p>
          <Link 
            href={`/${language}/project`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {getTranslation(language as Locale, 'details.project.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12 pt-32">
        {/* 面包屑导航 */}
        <Breadcrumb projectTitle={project.title} language={language} />
        
        {/* 项目标题 */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {project.title}
        </h1>
        
        {/* 项目负责人 */}
        <ProjectLeader leader={project.leader} language={language} />
        
        {/* 项目详情图片 */}
        <div className="mb-8">
          <img
            src={project.detailImage}
            alt={project.title}
            className="w-full h-auto rounded-xl shadow-lg object-contain"
          />
        </div>
        
        {/* 项目描述 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {getTranslation(language as Locale, 'details.project.projectDescription')}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="whitespace-pre-line">{project.description}</p>
          </div>
        </div>
        
        {/* 关键词 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {getTranslation(language as Locale, 'details.project.keywordsLabel')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        
        {/* 相关论文 */}
        {project.production?.paper?.paperTitle && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {getTranslation(language as Locale, 'details.project.relatedPapers')}
            </h2>
            <PDFLink pdfUrl={project.production?.paper?.pdfUrl} paperTitle={project.production?.paper?.paperTitle} language={language} />
          </div>
        )}
        
        {/* 专利信息 */}
        {project.production?.patent && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {language === 'zh' ? '专利信息' : 'Patent Information'}
            </h2>
            <PatentInfo patent={project.production?.patent} language={language} />
          </div>
        )}
        
        {/* Demo 信息 */}
        {project.production?.demo?.name && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {language === 'zh' ? '演示' : 'Demo'}
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-3">
                    {/* Demo 名称和链接 */}
                    <div>
                      {project.production.demo.demoUrl ? (
                        <a
                          href={project.production.demo.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                        >
                          <span className="font-medium mr-2">{project.production.demo.name}</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <span className="text-lg font-medium text-gray-800">{project.production.demo.name}</span>
                      )}
                    </div>
                    {/* Email 链接 */}
                    {project.production.demo.email && (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a
                          href={`mailto:${project.production.demo.email}`}
                          className="text-sm text-green-700 hover:text-green-800 hover:underline font-medium"
                        >
                          {project.production.demo.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 返回按钮 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/${language}/project`}
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {getTranslation(language as Locale, 'details.project.backToList')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
