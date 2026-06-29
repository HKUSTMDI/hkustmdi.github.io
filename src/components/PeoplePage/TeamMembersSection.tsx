import React from 'react';
import { TeamMember } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { TeamMemberCard } from './TeamMemberCard';

interface TeamMembersSectionProps {
  members: TeamMember[]; 
  title: string; 
  language: 'zh' | 'en';
  showDividers?: boolean;
}

export const TeamMembersSection: React.FC<TeamMembersSectionProps> = ({ 
  members, 
  title, 
  language, 
  showDividers = false 
}) => {
  return (
    <div className="members-section bg-gray-50 py-16 my-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          {title}
        </h2>
        
        <div className="members-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div key={index} className={`${showDividers && index < members.length - 1 && (index + 1) % 3 === 0 ? 'border-b border-gray-200 pb-8 mb-8' : ''}`}>
              <TeamMemberCard 
                member={member} 
                language={language} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};