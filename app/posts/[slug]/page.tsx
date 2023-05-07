import type { Metadata } from 'next';
import React from 'react';

import PostContent from './PostContent';
import { client } from '.generatedTina/client';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tinaProps = await client.queries.post({ relativePath: `${slug}.mdx` });

  return <PostContent slug={slug} tinaProps={tinaProps} />;
}

export async function generateStaticParams() {
  const postListResponse = await client.queries.postConnection();
  if (postListResponse.data.postConnection.edges == null)
    throw new Error('Cannot connect to GraphQL server!');

  return postListResponse.data.postConnection.edges.flatMap((edge) =>
    edge?.node != null
      ? {
          slug: edge.node._sys.filename
        }
      : []
  );
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const tinaProps = await client.queries.post({ relativePath: `${slug}.mdx` });
  const title = slug.replace(/([A-Z])/g, ' $1').trim();
  const description = tinaProps.data.post.excerpt || 'No description';

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
