import type { Metadata } from 'next';
import React from 'react';

import TagsContent from './TagsContent';
import { client } from '.generatedTina/client';

export default async function Page({ params }: { params: { slug: string } }) {
  // Temporary: needs to be changed when Tina finally supports filtering on list
  const { slug } = params;
  const tinaProps = await client.queries.postConnection({
    sort: 'postDateTime',
    last: 10
  });

  return <TagsContent slug={decodeURI(slug)} tinaProps={tinaProps} />;
}

export async function generateStaticParams() {
  // Temporary: needs to be changed when Tina finally supports filtering on list
  const postListResponse = await client.queries.postConnection();
  if (postListResponse.data.postConnection.edges == null)
    throw new Error('Cannot connect to GraphQL server!');

  let tags = postListResponse.data.postConnection.edges.flatMap((edge) =>
    edge?.node?.tags != null
      ? edge.node.tags.flatMap((tag) => (tag != null ? tag : []))
      : []
  );
  tags = Array.from(new Set(tags));

  return tags.map((tag) => ({
    slug: tag
  }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const decodedSlug = decodeURI(slug);
  const title = 'Posts Tags';
  const description = `Tag: ${decodedSlug}`;

  return {
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
}
