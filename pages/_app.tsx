import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import SEO from 'next-seo.config';
import { TinaEditProvider } from 'tinacms/dist/edit-state';
import Layout from '@components/layout';
import '@styles/globals.scss';

const TinaCMS = dynamic(() => import('tinacms'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return typeof window !== 'undefined' ? (
    <>
      <DefaultSeo {...SEO} />
      <TinaEditProvider
        editMode={
          <TinaCMS
            clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
            branch={process.env.NEXT_PUBLIC_EDIT_BRANCH}
            isLocalClient={Boolean(
              Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT ?? true)
            )}
            {...pageProps}
          >
            {
              (livePageProps: any) =>
                <Layout>
                  <Component {...livePageProps} />
                </Layout>
            }
          </TinaCMS>
        }
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TinaEditProvider>
    </>
  ) : null;
}

export default MyApp;
