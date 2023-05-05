import type { Metadata } from 'next';

import AboutContent from './AboutContent';
import { client } from '.generatedTina/client';

export default async function Page(): Promise<JSX.Element> {
  const tinaProps = await client.queries.about({ relativePath: 'About.md' });

  return <AboutContent tinaProps={tinaProps} />;
}

const title = 'About Me';

export const metadata: Metadata = {
  title,
  openGraph: {
    title,
    description:
      'Irsan Arisandy is a professional fullstack web developer who has experienced working with companies in multiple countries. Whether you need an interactive solution, or just mentoring, Irsan Arisandy got you covered.',
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
