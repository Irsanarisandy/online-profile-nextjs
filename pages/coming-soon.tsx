import type { NextPage } from 'next';
import Head from 'next/head';

const ComingSoon: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Coming Soon" />
      </Head>
      <div className="h-full flex items-center justify-center">
        <h1>Coming Soon</h1>
      </div>
    </>
  );
};

export default ComingSoon;
