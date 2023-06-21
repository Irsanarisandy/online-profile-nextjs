import type { Metadata } from 'next';
import React from 'react';

import { OpacityPageTransitionMotion } from '.components/CustomMotion';

export default function Page() {
  return (
    <OpacityPageTransitionMotion
      keyName="coming-soon"
      className="flex h-full items-center justify-center"
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
