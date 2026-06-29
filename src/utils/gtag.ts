// Google Analytics 配置和工具函数

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// 检查是否在浏览器环境中
export const isBrowser = typeof window !== 'undefined';

// 页面浏览跟踪
export const pageview = (url: string) => {
  if (!isBrowser || !GA_TRACKING_ID) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// 事件跟踪
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!isBrowser || !GA_TRACKING_ID) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// 声明全局 gtag 函数
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}
