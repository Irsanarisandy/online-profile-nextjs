import type { Metadata } from 'next';

import { OpacityPageTransitionMotion } from '.components/CustomMotion';

export default function Page(): JSX.Element {
  return (
    <OpacityPageTransitionMotion
      keyName="coming-soon"
      className="h-full flex items-center justify-center"
    >
      <h1>Coming Soon</h1>
    </OpacityPageTransitionMotion>
  );
}

const title = 'Coming Soon';

export const metadata: Metadata = {
  title,
  openGraph: {
    title,
    type: 'website',
    siteName: "Irsan's Online Profile",
    locale: 'en_US',
    images: [
      {
        url: '/api/initialsImage?height=630&width=630&scale=4',
        width: 630,
        height: 630,
        type: 'image/png',
        alt: 'black initials'
      },
      {
        url: '/api/initialsImage?height=630&width=630&scale=4&color=white',
        width: 630,
        height: 630,
        type: 'image/png',
        alt: 'white initials'
      }
    ]
  }
};
