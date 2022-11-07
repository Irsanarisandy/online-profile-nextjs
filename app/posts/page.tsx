import type { Metadata } from 'next';

import PostsContent from './PostsContent';
import { client } from '.generatedTina/client';

export default async function Page(): Promise<JSX.Element> {
  const tinaProps = await client.queries.postConnection({
    sort: 'postDateTime',
    last: 10
  });

  return <PostsContent tinaProps={tinaProps} />;
}

export const metadata: Metadata = {
  title: 'My Posts',
  description:
    'Posts page written by Irsan Arisandy, mostly about website technologies.',
  openGraph: {
    title: 'My Posts',
    description:
      'Posts page written by Irsan Arisandy, mostly about website technologies.',
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
