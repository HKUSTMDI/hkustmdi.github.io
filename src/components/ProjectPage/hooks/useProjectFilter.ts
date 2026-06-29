import { useState, useEffect } from 'react';
import { ProjectItem } from '@/types';

export interface UseProjectFilterProps {
  projects: ProjectItem[];
}

export function useProjectFilter({ projects }: UseProjectFilterProps) {
  const [filteredProjects, setFilteredProjects] = useState<ProjectItem[]>(projects);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // 获取所有关键词
  const allKeywords = Array.from(new Set(projects.flatMap(project => project.keywords))).sort();
  
  // 筛选项目
  useEffect(() => {
    if (selectedKeywords.length === 0) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project =>
        selectedKeywords.some(keyword => project.keywords.includes(keyword))
      );
      setFilteredProjects(filtered);
    }
  }, [selectedKeywords, projects]);
  
  // 关键词切换
  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };
  
  // 清除所有筛选
  const handleClearAll = () => {
    setSelectedKeywords([]);
  };
  
  // 打开抽屉
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };
  
  // 关闭抽屉
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  
  return {
    filteredProjects,
    selectedKeywords,
    allKeywords,
    isDrawerOpen,
    handleKeywordToggle,
    handleClearAll,
    handleOpenDrawer,
    handleCloseDrawer,
  };
}