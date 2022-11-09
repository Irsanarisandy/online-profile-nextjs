import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { OpacityPageTransitionMotion } from '.components/custom-motion';

const ComingSoon: NextPage = () => {
  return (
    <>
      <NextSeo title="Coming Soon" description="Coming Soon" />
      <OpacityPageTransitionMotion classes="h-full flex items-center justify-center">
        <h1>Coming Soon</h1>
      </OpacityPageTransitionMotion>
    </>
  );
};

export default ComingSoon;
