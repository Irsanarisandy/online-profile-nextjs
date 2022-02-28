import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import SEO from 'next-seo.config';
import { TinaCloudCloudinaryMediaStore } from 'next-tinacms-cloudinary';
import { TinaEditProvider } from 'tinacms/dist/edit-state';
import Layout from '@components/layout';
import '@styles/globals.scss';

const TinaCMS = dynamic(() => import('tinacms'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 'main';
  const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
  const apiURL =
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:4001/graphql'
      : `https://content.tinajs.io/content/${clientId}/github/${branch}`;
  return typeof window !== 'undefined' ? (
    <>
      <DefaultSeo {...SEO} />
      <TinaEditProvider
        editMode={
          <TinaCMS
            apiURL={apiURL}
            documentCreatorCallback={{
              onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
                const relativeUrl = `/${slug}s/${breadcrumbs.join('/')}`;
                return (window.location.href = relativeUrl);
              },
              filterCollections: (options) => {
                return options.filter(
                  (option) => option.label === 'Blog Posts'
                );
              }
            }}
            mediaStore={TinaCloudCloudinaryMediaStore}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
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
