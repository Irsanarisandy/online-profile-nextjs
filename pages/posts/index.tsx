import { GetStaticPropsResult } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useTina } from 'tinacms/dist/react';

import { Cards } from '.components/Cards';
import { Chips } from '.components/Chips';
import { OpacityPageTransitionMotion } from '.components/CustomMotion';
import { client } from '.generatedTina/client';
import type {
  Post,
  PostConnectionQuery,
  PostConnectionQueryVariables
} from '.generatedTina/types';

export default function Posts(props: {
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
  query: string;
}): JSX.Element {
  const { data } = useTina({
    data: props.data,
    variables: props.variables,
    query: props.query
  });

  if (data?.postConnection?.edges == null) {
    return <div>Posts data does not exist!</div>;
  }

  let postsTags: string[] = [];
  const postsData: ({ location: string } & Post)[] =
    data.postConnection.edges.flatMap((edge) => {
      const curNode = edge?.node;
      if (curNode == null) return [];
      if (curNode.tags != null && curNode.tags.length > 0) {
        postsTags.push(
          ...curNode.tags.flatMap((tag) => (tag != null ? tag : []))
        );
      }
      return {
        location: curNode._sys.filename,
        ...(curNode as Post)
      };
    });
  postsTags = Array.from(new Set(postsTags)).sort();

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
    <>
      <NextSeo
        title="My Posts"
        description="Posts page written by Irsan Arisandy, mostly about website technologies."
      />
      {postsData.length === 0 && (
        <OpacityPageTransitionMotion className="h-full flex items-center justify-center">
          <h1>No posts available!</h1>
        </OpacityPageTransitionMotion>
      )}
      {postsData.length > 0 && (
        <OpacityPageTransitionMotion className="flex flex-col md:flex-row min-h-full px-4 pt-4 sm:px-8 sm:pt-8">
          <section className="mb-8 md:mb-0 md:ml-8">
            <Cards className="p-4 sm:p-8 flex flex-col md:w-[320px]">
              <h1 className="mb-4">Tags</h1>
              {postsTags.length > 0 && (
                <Chips labels={postsTags} clickLocation="tags" />
              )}
            </Cards>
          </section>
          <section className="md:grow md:order-first grid gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 md:auto-rows-[450px]">
            {postsData.map((data, index) => (
              <Cards
                className="p-4 sm:p-8 flex flex-col"
                key={`post${index + 1}`}
              >
                <div className="mb-4 flex flex-col">
                  <Link
                    href={`/posts/${data.location}`}
                    className="hover:text-[#FDB601]"
                  >
                    <h1>{data.title}</h1>
                  </Link>
                  <span className="mt-2">
                    {displayedDateTime(data.postDateTime as string)}
                  </span>
                </div>
                {data.heroImage && (
                  <div className="block w-full">
                    <div className="max-w-[300px] mx-auto">
                      <Image
                        src={data.heroImage}
                        alt="hero image"
                        height={540}
                        width={960}
                      />
                    </div>
                  </div>
                )}
                <p className="mt-4 overflow-y-auto">{data.excerpt}</p>
              </Cards>
            ))}
          </section>
        </OpacityPageTransitionMotion>
      )}
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    data: PostConnectionQuery;
    variables: PostConnectionQueryVariables;
    query: string;
  }>
> {
  const tinaProps = await client.queries.postConnection({
    sort: 'postDateTime',
    last: 10
  });

  return {
    props: {
      data: tinaProps.data,
      variables: tinaProps.variables,
      query: tinaProps.query
    }
  };
}
