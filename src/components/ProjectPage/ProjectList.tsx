import React from 'react';
import { type ProjectItem as ProjectItemType } from '@/types';
import { getTranslation, type Locale } from '@/utils/i18n';
import { ProjectItem } from './ProjectItem';

interface ProjectListProps {
  projects: ProjectItemType[];
  language: Locale;
  onProjectClick: (project: ProjectItemType) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  language, 
  onProjectClick 
}) => {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <ProjectItem
            project={project}
            language={language}
            onClick={() => onProjectClick(project)}
          />
        </div>
      ))}
      
      {/* 无项目提示 */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {getTranslation(language as Locale, 'pages.project.noMatchingProjects')}
          </p>
        </div>
      )}
    </div>
  );
};