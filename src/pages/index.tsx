import { useEffect } from 'react';
import Head from 'next/head';

const HomePage = () => {
  useEffect(() => {
    // 在静态导出模式下，直接重定向到中文页面
    window.location.replace('/zh/');
  }, []);

  return (
    <>
      <Head>
        <title>MDI实验室 - 正在跳转...</title>
        <meta httpEquiv="refresh" content="0; url=/zh/" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在跳转到中文页面...</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;