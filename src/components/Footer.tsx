import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // 国际化文本
  const texts = {
    zh: {
      labName: '医疗数据智能实验室',
      description: '专注于医疗数据智能与病理学人工智能研究，致力于通过AI技术提升病理诊断准确性和医疗服务质量',
      address: '地址：广州市南沙区笃学路1号',
      email: '邮箱：cao@ust.hk',
      quickLinks: '快速链接',
      teamMembers: '团队成员',
      researchProjects: '研究项目',
      datasets: '数据集',
      collaboration: '合作交流',
      contactUs: '联系我们',
      copyright: '版权属香港科技大学（广州）所有'
    },
    en: {
      labName: 'MEDICAL DATA INTELLIGENCE LAB',
      description: 'Focusing on medical data intelligence and pathology AI research, committed to improving pathological diagnosis accuracy and medical service quality through AI technology',
      address: 'Address: No.1 Du Xue Rd, Nansha District, Guangzhou',
      email: 'Email: cao@ust.hk',
      quickLinks: 'Quick Links',
      teamMembers: 'Team Members',
      researchProjects: 'Research Projects',
      datasets: 'Datasets',
      collaboration: 'Collaboration',
      contactUs: 'Contact Us',
      copyright: 'The Hong Kong University of Science and Technology (Guangzhou). All rights reserved'
    }
  };

  const t = texts[language as keyof typeof texts] || texts.zh;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 实验室信息 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{t.labName}</h3>
            <p className="text-gray-300 mb-4">
              {t.description}
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{t.address}</p>
              <p>{t.email}</p>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.quickLinks}</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link href={`/${language}/people`} className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.teamMembers}
              </Link>
              <Link href={`/${language}/project`} className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.researchProjects}
              </Link>
              <Link href={`/${language}/dataset`} className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.datasets}
              </Link>
              <Link href={`/${language}/collaboration`} className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.collaboration}
              </Link>
            </div>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {t.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://github.com/HKUSTMDI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:cao@ust.hk"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t.contactUs}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
