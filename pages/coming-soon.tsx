import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@components/layout';

const ComingSoon: NextPage = () => {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Coming Soon" />
      </Head>
      <div className="h-full flex items-center justify-center">
        <h1>Coming Soon</h1>
      </div>
    </Layout>
  );
};

export default ComingSoon;
