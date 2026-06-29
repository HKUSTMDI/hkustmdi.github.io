import { useCallback } from 'react';
import { event } from '@/utils/gtag';

// 自定义Hook用于Google Analytics事件跟踪
export const useAnalytics = () => {
  // 跟踪页面浏览
  const trackPageView = useCallback((pageName: string, pagePath: string) => {
    event({
      action: 'page_view',
      category: 'Navigation',
      label: pageName,
    });
  }, []);

  // 跟踪按钮点击
  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    event({
      action: 'click',
      category: 'Button',
      label: `${buttonName} - ${location}`,
    });
  }, []);

  // 跟踪链接点击
  const trackLinkClick = useCallback((linkText: string, destination: string) => {
    event({
      action: 'click',
      category: 'Link',
      label: `${linkText} - ${destination}`,
    });
  }, []);

  // 跟踪搜索
  const trackSearch = useCallback((searchTerm: string, resultsCount: number) => {
    event({
      action: 'search',
      category: 'Search',
      label: searchTerm,
      value: resultsCount,
    });
  }, []);

  // 跟踪下载
  const trackDownload = useCallback((fileName: string, fileType: string) => {
    event({
      action: 'download',
      category: 'File',
      label: `${fileName} - ${fileType}`,
    });
  }, []);

  // 跟踪表单提交
  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    event({
      action: 'submit',
      category: 'Form',
      label: `${formName} - ${success ? 'success' : 'error'}`,
    });
  }, []);

  // 跟踪自定义事件
  const trackCustomEvent = useCallback((
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    event({
      action,
      category,
      label,
      value,
    });
  }, []);

  return {
    trackPageView,
    trackButtonClick,
    trackLinkClick,
    trackSearch,
    trackDownload,
    trackFormSubmit,
    trackCustomEvent,
  };
};
