import type { Metadata } from 'next';
import React from 'react';

import PostsContent from './PostsContent';
import { client } from '.generatedTina/client';

export default async function Page() {
  const tinaProps = await client.queries.postConnection({
    sort: 'postDateTime',
    last: 10
  });

  return <PostsContent tinaProps={tinaProps} />;
}

const title = 'My Posts';
const description =
  'Posts page written by Irsan Arisandy, mostly about website technologies.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
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
