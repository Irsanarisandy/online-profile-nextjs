'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTina } from 'tinacms/dist/react';

import { Cards } from '.components/Cards';
import { OpacityPageTransitionMotion } from '.components/CustomMotion';
import type {
  Post,
  PostConnectionQuery,
  PostConnectionQueryVariables
} from '.generatedTina/types';

export default function TagsContent({
  slug,
  tinaProps
}: {
  slug: string;
  tinaProps: {
    data: PostConnectionQuery;
    variables: PostConnectionQueryVariables;
    query: string;
  };
}) {
  const { data } = useTina({
    data: tinaProps.data,
    variables: tinaProps.variables,
    query: tinaProps.query
  });

  if (data?.postConnection?.edges == null) {
    return <div>Tags data does not exist!</div>;
  }

  const postList: ({ location: string } & Post)[] = data.postConnection.edges
    .flatMap((edge) =>
      edge?.node != null
        ? {
            location: edge.node._sys.filename,
            ...(edge.node as Post)
          }
        : []
    )
    .filter((curData) => {
      const tags = curData.tags;
      return tags != null && tags.includes(slug);
    });

  const displayedDateTime = (postDateTime: string) =>
    new Intl.DateTimeFormat(
      typeof navigator !== 'undefined' ? navigator.language : 'en-NZ',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
      }
    ).format(new Date(postDateTime));

  return (
    <OpacityPageTransitionMotion
      keyName={`tag-${slug}`}
      className="flex flex-col min-h-full px-4 pt-4 sm:px-8 sm:pt-8"
    >
      <Cards className="p-4 sm:p-8 mb-4 md:mb-8">
        <h1>Tag: {slug}</h1>
      </Cards>
      <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:auto-rows-[450px]">
        {postList.map((curPost, index) => (
          <Cards className="p-4 sm:p-8 flex flex-col" key={`post${index + 1}`}>
            <div className="mb-4 flex flex-col">
              <Link
                href={`/posts/${curPost.location}`}
                className="hover:text-[#FDB601]"
              >
                <h1>{curPost.title}</h1>
              </Link>
              <span className="mt-2">
                {displayedDateTime(curPost.postDateTime as string)}
              </span>
            </div>
            {curPost.heroImage && (
              <div className="block w-full">
                <div className="max-w-[300px] mx-auto">
                  <Image
                    src={curPost.heroImage}
                    alt="hero image"
                    height={540}
                    width={960}
                  />
                </div>
              </div>
            )}
            <p className="mt-4 overflow-y-auto">{curPost.excerpt}</p>
          </Cards>
        ))}
      </section>
    </OpacityPageTransitionMotion>
  );
}
