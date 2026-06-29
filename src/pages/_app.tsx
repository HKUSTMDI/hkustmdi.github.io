import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/styles/globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { pageview, GA_TRACKING_ID } from '@/utils/gtag';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 页面路由变化时跟踪页面浏览
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <LanguageProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <Component {...pageProps} />
      {/* Google Analytics */}
      {GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
    </LanguageProvider>
  );
}
