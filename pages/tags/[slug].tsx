import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useTina } from 'tinacms/dist/react';
import { Cards } from '.components/Cards';
import { OpacityPageTransitionMotion } from '.components/CustomMotion';
import { client } from '.generatedTina/client';
import type {
  Post,
  PostConnectionQuery,
  PostConnectionQueryVariables
} from '.generatedTina/types';

export default function Tags(props: {
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
  query: string;
  slug: string;
}): JSX.Element {
  const { data } = useTina({
    data: props.data,
    variables: props.variables,
    query: props.query
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
      return tags != null && tags.includes(props.slug);
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
    <>
      <NextSeo title="Posts Tags" description={`Tag: ${props.slug}`} />
      <OpacityPageTransitionMotion className="flex flex-col min-h-full px-4 pt-4 sm:px-8 sm:pt-8">
        <Cards className="p-4 sm:p-8 mb-4 md:mb-8">
          <h1>Tag: {props.slug}</h1>
        </Cards>
        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:auto-rows-[450px]">
          {postList.map((curPost, index) => (
            <Cards
              className="p-4 sm:p-8 flex flex-col"
              key={`post${index + 1}`}
            >
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
    </>
  );
}

export async function getStaticProps({
  params
}: {
  params: { slug: string };
}): Promise<
  GetStaticPropsResult<{
    data: PostConnectionQuery;
    variables: PostConnectionQueryVariables;
    query: string;
    slug: string;
  }>
> {
  // Temporary: needs to be changed when Tina finally supports filtering on list
  const { slug } = params;
  const tinaProps = await client.queries.postConnection({
    sort: 'postDateTime',
    last: 10
  });

  return {
    props: {
      data: tinaProps.data,
      variables: tinaProps.variables,
      query: tinaProps.query,
      slug
    }
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
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

  return {
    paths: tags.map((tag) => ({
      params: { slug: tag }
    })),
    fallback: false
  };
}
