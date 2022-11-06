import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import '@styles/globals.scss';

const Layout = dynamic(() => import('@components/layout'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
