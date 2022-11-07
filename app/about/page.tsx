import type { Metadata } from 'next';

import AboutContent from './AboutContent';
import { client } from '.generatedTina/client';

export default async function Page(): Promise<JSX.Element> {
  const tinaProps = await client.queries.about({ relativePath: 'About.md' });

  return <AboutContent tinaProps={tinaProps} />;
}

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'An about page containing some information about Irsan Arisandy, as a website developer.',
  openGraph: {
    title: 'About Me',
    description:
      'An about page containing some information about Irsan Arisandy, as a website developer.',
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
