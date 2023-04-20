import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useTina } from 'tinacms/dist/react';
import { Components, TinaMarkdown } from 'tinacms/dist/rich-text';

import { Cards } from '.components/Cards';
import { Chips } from '.components/Chips';
import { Codeblock } from '.components/Codeblock';
import { OpacityPageTransitionMotion } from '.components/CustomMotion';
import { client } from '.generatedTina/client';
import type { PostQuery, PostQueryVariables } from '.generatedTina/types';

export default function Post(props: {
  data: PostQuery;
  variables: PostQueryVariables;
  query: string;
}): JSX.Element {
  const { data } = useTina({
    data: props.data,
    variables: props.variables,
    query: props.query
  });

  if (data?.post == null) {
    return <div>Post data does not exist!</div>;
  }

  const { title, postDateTime, tags, excerpt, heroImage, body } = data.post;

  const tagsExist = tags != null && tags.length > 0;

  const displayedDateTime = new Intl.DateTimeFormat(
    typeof navigator !== 'undefined' ? navigator.language : 'en-NZ',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    }
  ).format(new Date(postDateTime as string));

  const components: Components<{}> = {
    code_block: (codeBlockProps) => (
      <Codeblock language={codeBlockProps?.lang}>
        {codeBlockProps?.value as string}
      </Codeblock>
    )
  };

  return (
    <>
      <NextSeo
        title={props.variables.relativePath
          .replace('.mdx', '')
          .replace(/([A-Z])/g, ' $1')
          .trim()}
        description={excerpt || 'No description'}
      />
      <OpacityPageTransitionMotion>
        <Cards className="m-4 sm:m-8 p-4 sm:p-8">
          <h1>{title}</h1>
          <span className="block my-4">
            <time>{displayedDateTime}</time>
          </span>
          {tagsExist && (
            <Chips
              labels={tags as string[]}
              clickLocation="tags"
              className="mb-4"
            />
          )}
          {heroImage && (
            <div className="w-full">
              <div className="max-w-md mx-auto">
                <Image
                  src={heroImage}
                  alt="hero image"
                  height={540}
                  width={960}
                />
              </div>
            </div>
          )}
          <article className="mt-4 markdown">
            <TinaMarkdown content={body} components={components} />
          </article>
        </Cards>
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
    data: PostQuery;
    variables: PostQueryVariables;
    query: string;
  }>
> {
  const { slug } = params;
  const tinaProps = await client.queries.post({ relativePath: `${slug}.mdx` });

  return {
    props: {
      data: tinaProps.data,
      variables: tinaProps.variables,
      query: tinaProps.query
    }
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const postListResponse = await client.queries.postConnection();
  if (postListResponse.data.postConnection.edges == null)
    throw new Error('Cannot connect to GraphQL server!');

  return {
    paths: postListResponse.data.postConnection.edges.flatMap((edge) =>
      edge?.node != null
        ? {
            params: { slug: edge.node._sys.filename as string }
          }
        : []
    ),
    fallback: 'blocking'
  };
}
