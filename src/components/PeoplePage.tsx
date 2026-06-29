import React from 'react';
import { PeoplePageData } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { LeaderSection } from './PeoplePage/LeaderSection';
import { TeamMembersSection } from './PeoplePage/TeamMembersSection';

interface PeoplePageProps {
  data: PeoplePageData;
  language: 'zh' | 'en';
}

const PeoplePage: React.FC<PeoplePageProps> = ({ data, language }) => {
  return (
    <div className="people-page min-h-screen">
      {/* 页面标题 */}
      <div className="page-header pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {getTranslation(language, 'people.title')}
          </h1>
        </div>
      </div>

      {/* 负责人区域 */}
      <LeaderSection leader={data.leader} language={language} />

      {/* 现有成员区域 */}
      <TeamMembersSection 
        members={data.currentMembers} 
        title={getTranslation(language, 'people.currentMembers.title')}
        language={language}
      />

      {/* 历届成员区域 */}
      <TeamMembersSection 
        members={data.pastMembers} 
        title={getTranslation(language, 'people.pastMembers.title')}
        language={language}
      />

      {/* 合作伙伴区域 */}
      {data.partners && data.partners.length > 0 && (
        <TeamMembersSection 
          members={data.partners} 
          title={getTranslation(language, 'people.partners.title')}
          language={language}
        />
      )}
    </div>
  );
};

export default PeoplePage;
