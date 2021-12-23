import type { NextPage } from 'next';
import Head from 'next/head';
import { OpacityPageTransitionMotion } from '@components/custom-motion';

const ComingSoon: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Coming Soon" />
      </Head>
      <OpacityPageTransitionMotion classes="h-full flex items-center justify-center">
        <h1>Coming Soon</h1>
      </OpacityPageTransitionMotion>
    </>
  );
};

export default ComingSoon;
