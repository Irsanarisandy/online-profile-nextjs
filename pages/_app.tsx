import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import TinaContainer from '.tina/components/TinaContainer';
import '@styles/globals.scss';

const Layout = dynamic(() => import('@components/layout'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <TinaContainer>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TinaContainer>
    </>
  );
}

export default MyApp;
