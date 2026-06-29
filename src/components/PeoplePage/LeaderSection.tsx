import React from 'react';
import { TeamLeader } from '@/types';
import { getTranslation } from '@/utils/i18n';

interface LeaderSectionProps {
  leader: TeamLeader;
  language: 'zh' | 'en';
}

export const LeaderSection: React.FC<LeaderSectionProps> = ({ leader, language }) => {
  return (
    <div className="leader-section relative mt-16 mb-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* 头像 */}
        <div className="leader-avatar absolute -top-12 left-1/2 transform -translate-x-[50%] w-32 h-32 z-10 rounded-full overflow-hidden" 
             style={{
               background: 'linear-gradient(to bottom, rgb(105, 206, 255), rgb(203, 230, 246))'
             }}>
          <img
            src={leader.avatar}
            alt={leader.name}
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        
        {/* 内容区域 */}
        <div className="leader-content bg-gray-50 rounded-2xl pt-20 px-10 pb-10 mt-10 shadow-md">
          <h2 className="leader-name text-3xl font-bold text-center mb-2 text-gray-800">
            {leader.name}
          </h2>
          <p className="leader-title text-lg text-center text-gray-600 mb-6">
            {leader.position}
          </p>
          <div className="leader-description text-center text-gray-700 leading-relaxed">
            <p className="mb-4">{leader.introduction}</p>
          </div>
        </div>
      </div>
    </div>
  );
};