import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type ProjectItem as ProjectItemType } from '@/types';
import { type Locale } from '@/utils/i18n';

interface ProjectItemProps {
  project: ProjectItemType;
  language: Locale;
  onClick?: () => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project, language, onClick }) => {
  return (
    <div 
      className="flex flex-col md:flex-row p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* 项目图片 */}
      <div className="w-full md:w-48 h-32 md:h-24 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* 项目信息 */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
          {project.intro}
        </p>
        
        {/* Leader 信息 */}
        {project.leader && (
          <div className="flex items-center flex-wrap gap-2 mb-3">
            {Array.isArray(project.leader) ? (
              project.leader.map((leaderItem, index) => {
                const leadersArray = project.leader as Array<{ name: string; avatar: string }>;
                return (
                  <React.Fragment key={index}>
                    <div className="flex items-center">
                      {leaderItem.avatar && (
                        <img
                          src={leaderItem.avatar}
                          alt={leaderItem.name}
                          className="w-6 h-6 rounded-full mr-2 object-cover"
                        />
                      )}
                      <span className="text-sm text-gray-700 font-medium">
                        {leaderItem.name}
                      </span>
                    </div>
                    {index < leadersArray.length - 1 && (
                      <span className="text-gray-400">•</span>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <div className="flex items-center">
                {project.leader.avatar && (
                  <img
                    src={project.leader.avatar}
                    alt={project.leader.name}
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                )}
                <span className="text-sm text-gray-700 font-medium">
                  {project.leader.name}
                </span>
              </div>
            )}
          </div>
        )}
        
        {/* 专利信息 */}
        {project.production?.patent && (
          <div className="mb-3">
            <div className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {language === 'zh' ? '专利' : 'Patent'}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {project.keywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 text-xs bg-gray-100 border border-gray-200 rounded-full text-gray-600"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};