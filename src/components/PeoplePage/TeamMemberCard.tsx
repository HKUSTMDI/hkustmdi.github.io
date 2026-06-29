import React from 'react';
import { TeamMember } from '@/types';

interface TeamMemberCardProps {
  member: TeamMember;
  language: 'zh' | 'en';
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, language }) => {
  return (
    <div className="member-card bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      <div className="flex items-start space-x-4">
        {/* 头像 */}
        <div className="member-avatar w-16 h-16 rounded-full flex-shrink-0 border-3 border-white shadow-md">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        
        {/* 文字信息 */}
        <div className="flex-1 min-w-0">
          <h3 className="member-name text-lg font-semibold text-gray-800 mb-1 truncate">
            {member.name}
          </h3>
          <p className="member-title text-sm text-gray-600 mb-2">
            {member.position}
          </p>
          {member.specialty && (
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
              {member.specialty}
            </p>
          )}
          {member.currentPosition && (
            <p className="text-xs text-blue-600 font-medium line-clamp-2">
              {member.currentPosition}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};