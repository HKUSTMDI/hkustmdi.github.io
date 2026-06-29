import React from 'react';
import { ProjectPageData, ProjectItem } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { useMobile } from '@/hooks/useMobile';
import { useProjectFilter } from './ProjectPage/hooks/useProjectFilter';
import { ProjectList } from './ProjectPage/ProjectList';
import { KeywordFilter } from './ProjectPage/KeywordFilter';
import { MobileFilterDrawer } from './ProjectPage/MobileFilterDrawer';

interface ProjectPageProps {
  data: ProjectPageData;
  language: 'zh' | 'en';
}

const ProjectPage: React.FC<ProjectPageProps> = ({ data, language }) => {
  const isMobile = useMobile();
  
  const {
    filteredProjects,
    selectedKeywords,
    allKeywords,
    isDrawerOpen,
    handleKeywordToggle,
    handleClearAll,
    handleOpenDrawer,
    handleCloseDrawer,
  } = useProjectFilter({ projects: data.projects });
  
  // 项目点击处理
  const handleProjectClick = (project: ProjectItem) => {
    window.location.href = `/${language}/project/${project.slug}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            {getTranslation(language, 'pages.project.title')}
          </h1>
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 项目列表 */}
          <div className="flex-1">
            {/* 移动端筛选按钮 */}
            {isMobile && (
              <div className="mb-6">
                <button
                  onClick={handleOpenDrawer}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  {getTranslation(language, 'pages.project.filterProjects')}
                </button>
              </div>
            )}
            
            {/* 项目列表 */}
            <ProjectList
              projects={filteredProjects}
              language={language}
              onProjectClick={handleProjectClick}
            />
          </div>
          
          {/* 关键词筛选栏 */}
          {!isMobile && (
            <KeywordFilter
              keywords={allKeywords}
              selectedKeywords={selectedKeywords}
              onKeywordToggle={handleKeywordToggle}
              onClearAll={handleClearAll}
              isMobile={false}
              isDrawerOpen={false}
              onCloseDrawer={handleCloseDrawer}
              language={language}
            />
          )}
          
          {/* 移动端筛选抽屉 */}
          {isMobile && (
            <MobileFilterDrawer
              isOpen={isDrawerOpen}
              onClose={handleCloseDrawer}
              keywords={allKeywords}
              selectedKeywords={selectedKeywords}
              onKeywordToggle={handleKeywordToggle}
              onClearAll={handleClearAll}
              language={language}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
