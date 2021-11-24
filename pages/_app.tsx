import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import SEO from 'next-seo.config';
import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
