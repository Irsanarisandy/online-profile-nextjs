import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import SEO from 'next-seo.config';
import Layout from '@components/layout';
import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
