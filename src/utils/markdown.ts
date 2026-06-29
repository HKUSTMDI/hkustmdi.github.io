import fs from 'fs';
import path from 'path';
import { PeoplePageData, PeopleDataJSON, CollaborationPageData, CollaborationDataJSON, ProjectPageData, ProjectDataJSON } from '@/types';
import { getTranslation } from './i18n';

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

interface PartnersData {
  title: string;
  partners: Partner[];
}

interface PartnersDataJSON {
  zh: PartnersData;
  en: PartnersData;
}

// 加载团队页面数据 - JSON格式
export function loadPeoplePageData(language: string = 'zh'): PeoplePageData {
  try {
    const fullPath = path.join(process.cwd(), 'content/pages/people/people-data.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data: PeopleDataJSON = JSON.parse(fileContents);
    
    return data[language as keyof PeopleDataJSON] || data.zh;
  } catch (error) {
    console.error('Error loading people page data:', error);
    return {
      leader: {
        name: '',
        position: '',
        avatar: '',
        introduction: '',
        achievements: [],
      },
      currentMembers: [],
      pastMembers: [],
    };
  }
}

// 加载合作页面数据 - JSON格式
export function loadCollaborationPageData(language: string = 'zh'): CollaborationPageData {
  try {
    const fullPath = path.join(process.cwd(), 'content/pages/collaborations/collaborations.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data: CollaborationDataJSON = JSON.parse(fileContents);
    
    return data[language as keyof CollaborationDataJSON] || data.zh;
  } catch (error) {
    console.error('Error loading collaboration page data:', error);
    return {
      introduction: '',
      collaborations: [],
    };
  }
}

// 加载合作详情页数据
export function loadCollaborationDetailData(slug: string, language: string = 'zh'): CollaborationPageData | null {
  try {
    const data = loadCollaborationPageData(language);
    const collaboration = data.collaborations.find(item => item.slug === slug);
    
    if (!collaboration) {
      return null;
    }
    
    return {
      introduction: '',
      collaborations: [collaboration],
    };
  } catch (error) {
    console.error('Error loading collaboration detail data:', error);
    return null;
  }
}

// 加载项目页面数据 - JSON格式
export function loadProjectPageData(language: string = 'zh'): ProjectPageData {
  try {
    const fullPath = path.join(process.cwd(), 'content/pages/projects/projects.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data: ProjectDataJSON = JSON.parse(fileContents);
    
    return data[language as keyof ProjectDataJSON] || data.zh;
  } catch (error) {
    console.error('Error loading project page data:', error);
    return {
      projects: [],
    };
  }
}

// 加载项目详情页数据
export function loadProjectDetailData(slug: string, language: string = 'zh'): ProjectPageData | null {
  try {
    const data = loadProjectPageData(language);
    const project = data.projects.find(item => item.slug === slug);
    
    if (!project) {
      return null;
    }
    
    return {
      projects: [project],
    };
  } catch (error) {
    console.error('Error loading project detail data:', error);
    return null;
  }
}

// 加载合作伙伴数据
export function loadPartnersData(language: string = 'zh'): PartnersData {
  try {
    const fullPath = path.join(process.cwd(), 'content/pages/home/partners-data.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data: PartnersDataJSON = JSON.parse(fileContents);
    
    return data[language as keyof PartnersDataJSON] || data.zh;
  } catch (error) {
    console.error('Error loading partners data:', error);
    return {
      title: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.partners.title'),
      partners: [],
    };
  }
}

// 加载首页数据
export function loadWhatWeDoData(language: string = 'zh'): any {
  try {
    const fullPath = path.join(process.cwd(), 'content/pages/home/what-we-do-data.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return data[language] || data.zh;
  } catch (error) {
    console.error('Error loading What We Do data:', error);
    // 返回默认数据而不是null
    return {
      title: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.title'),
      description: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.description'),
      coreTitle: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.coreTitle'),
      coreDescription: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.coreDescription'),
      dataIntegration: {
        title: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.dataIntegration.title'),
        description: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.dataIntegration.description'),
        items: []
      },
      modelBuilding: {
        title: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.modelTraining.title'),
        description: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.modelTraining.description')
      },
      clinicalValidation: {
        title: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.clinicalValidation.title'),
        description: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whatWeDo.clinicalValidation.description')
      }
    };
  }
}

export function loadMedicalProductsData(language: string = 'zh'): any {
  try {
    // 加载医疗产品数据
    const productsPath = path.join(process.cwd(), 'content/pages/home/medical-products-data.json');
    const productsContents = fs.readFileSync(productsPath, 'utf8');
    const productsData = JSON.parse(productsContents);
    
    const result = productsData[language] || productsData.zh;
    
    // 加载合作项目数据
    try {
      const collaborationsPath = path.join(process.cwd(), 'content/pages/collaborations/collaborations.json');
      const collaborationsContents = fs.readFileSync(collaborationsPath, 'utf8');
      const collaborationsData = JSON.parse(collaborationsContents);
      const collaborations = collaborationsData[language] || collaborationsData.zh;
      
      // 将合作项目数据添加到结果中
      // displayCollaborationIndexes 用于指定要显示的索引，例如: [0, 2, 5, 7, 9, 10]
      return {
        ...result,
        collaborations: collaborations.collaborations,
        // 可以在这里设置要显示的合作项目索引，例如:
        // displayCollaborationIndexes: [0, 2, 5, 7, 9, 10]  // 显示第1, 3, 6, 8, 10, 11个合作项目
        displayCollaborationIndexes: [1,2,3,8,9,10] // 空数组表示显示最后六个
      };
    } catch (error) {
      console.error('Error loading collaborations data:', error);
      return {
        ...result,
        collaborations: [],
        displayCollaborationIndexes: []
      };
    }
  } catch (error) {
    console.error('Error loading Medical Products data:', error);
    // 返回默认数据而不是null
    return {
      title: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.medicalProducts.title'),
      subtitle: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.medicalProducts.subtitle'),
      description: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.medicalProducts.description'),
      products: [],
      collaborations: [],
      displayCollaborationIndexes: []
    };
  }
}

export function loadWhoWeAreData(language: string = 'zh'): any {
  try {
    const fullPath = path.join(process.cwd(), 'content/pages/home/who-we-are-data.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return data[language] || data.zh;
  } catch (error) {
    console.error('Error loading Who We Are data:', error);
    // 返回默认数据而不是null
    return {
      title: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whoWeAre.title'),
      description: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whoWeAre.description'),
      focusAreas: [],
      mission: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whoWeAre.mission'),
      support: getTranslation(language === 'zh' ? 'zh' : 'en', 'home.whoWeAre.support')
    };
  }
}
