export interface SectionData {
  title: string;
  description: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  layout: 'flex' | 'grid' | 'block';
  direction: 'row' | 'column';
  content: string;
}

// 团队页面相关类型
export interface TeamMember {
  name: string;
  position: string;
  avatar: string;
  specialty?: string;
  currentPosition?: string;
}

export interface TeamLeader {
  name: string;
  position: string;
  avatar: string;
  introduction: string;
  achievements: string[];
}

export interface PeoplePageData {
  leader: TeamLeader;
  currentMembers: TeamMember[];
  pastMembers: TeamMember[];
  partners?: TeamMember[];
}

export interface PeoplePageProps {
  data: PeoplePageData;
  language: 'zh' | 'en';
}

// JSON数据格式类型
export interface PeopleDataJSON {
  zh: PeoplePageData;
  en: PeoplePageData;
}

// 合作页面相关类型
export interface CollaborationItem {
  id: string;
  slug: string;
  title: string;
  partnerLogo: string;
  partnerName: string;
  team: string;
  participants?: string[];
  intro: string;
  description: string;
  image: string;
  startDate: string;
}

export interface CollaborationPageData {
  introduction: string;
  collaborations: CollaborationItem[];
}

export interface CollaborationPageProps {
  data: CollaborationPageData;
  language: string;
}

// 合作页面JSON数据格式
export interface CollaborationDataJSON {
  zh: CollaborationPageData;
  en: CollaborationPageData;
}

// 项目页面相关类型
export interface ProjectLeader {
  name: string;
  avatar: string;
}

export interface Patent {
  name: string;
  number: string;
  applicationDate: string;
  applicants?: string[];
  inventors?: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  intro: string;
  description: string;
  keywords: string[];
  image: string;
  detailImage: string;
  leader: ProjectLeader | ProjectLeader[];
  production?: {
    paper?: {
      pdfUrl: string;
      paperTitle: string;
    };
    patent?: Patent;
    demo?: {
      name: string;
      demoUrl?: string;
      email?: string;
    };
  };
}

export interface ProjectPageData {
  projects: ProjectItem[];
}

export interface ProjectPageProps {
  data: ProjectPageData;
  language: 'zh' | 'en';
}

// 项目页面JSON数据格式
export interface ProjectDataJSON {
  zh: ProjectPageData;
  en: ProjectPageData;
}

// 数据集页面相关类型
export interface DatasetLeader {
  name: string;
  avatar: string;
}

export interface DatasetItem {
  id: string;
  slug: string;
  title: string;
  intro: string;
  description: string;
  image: string;
  leader: DatasetLeader;
  email?: string;
  downloadUrl?: string;
}

export interface DatasetPageData {
  datasets: DatasetItem[];
}

export interface DatasetPageProps {
  data: DatasetPageData;
  language: 'zh' | 'en';
}

// 数据集页面JSON数据格式
export interface DatasetDataJSON {
  zh: DatasetPageData;
  en: DatasetPageData;
}

// What We Do 页面相关类型
export interface WhatWeDoDataItem {
  title: string;
  description: string;
}

export interface WhatWeDoDataIntegration {
  title: string;
  description: string;
  items: WhatWeDoDataItem[];
}

export interface WhatWeDoSectionData {
  title: string;
  description: string;
  coreTitle: string;
  coreDescription: string;
  dataIntegration: WhatWeDoDataIntegration;
  modelBuilding: {
    title: string;
    description: string;
  };
  clinicalValidation: {
    title: string;
    description: string;
  };
}

export interface WhatWeDoPageData {
  zh: WhatWeDoSectionData;
  en: WhatWeDoSectionData;
}

export interface WhatWeDoSectionProps {
  className?: string;
}

// Medical Products 页面相关类型
export interface MedicalProduct {
  name: string;
  description: string;
}

export interface MedicalProductsSectionData {
  title: string;
  subtitle: string;
  description: string;
  products: MedicalProduct[];
}

export interface MedicalProductsPageData {
  zh: MedicalProductsSectionData;
  en: MedicalProductsSectionData;
}

export interface MedicalProductsSectionProps {
  className?: string;
}

// Who We Are 页面相关类型
export interface FocusArea {
  title: string;
  description: string;
}

export interface WhoWeAreSectionData {
  title: string;
  description: string;
  focusAreas: FocusArea[];
  mission: string;
  support: string;
}

export interface WhoWeArePageData {
  zh: WhoWeAreSectionData;
  en: WhoWeAreSectionData;
}

export interface WhoWeAreSectionProps {
  className?: string;
}
