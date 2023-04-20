import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Merienda, Quicksand } from 'next/font/google';
import { DefaultSeo } from 'next-seo';

import { NEXT_SEO_DEFAULT } from 'next-seo.config';
import Layout from '.components/Layout';
import '.styles/globals.scss';

const ThemeProvider = dynamic(() => import('.components/ThemeContext'), {
  ssr: false
});

const merienda = Merienda({
  subsets: ['latin']
});

const quicksand = Quicksand({
  subsets: ['latin']
});

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${quicksand.style.fontFamily};
        }
        .nav-logo-desc {
          font-family: ${merienda.style.fontFamily};
        }
      `}</style>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
