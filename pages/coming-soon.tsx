import { NextSeo } from 'next-seo';

import { OpacityPageTransitionMotion } from '.components/CustomMotion';

export default function ComingSoon(): JSX.Element {
  return (
    <>
      <NextSeo title="Coming Soon" description="Coming Soon" />
      <OpacityPageTransitionMotion className="h-full flex items-center justify-center">
        <h1>Coming Soon</h1>
      </OpacityPageTransitionMotion>
    </>
  );
}
