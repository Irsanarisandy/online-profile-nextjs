import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  NextPage
} from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useTina } from 'tinacms/dist/react';
import { Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import { Cards } from '@components/cards';
import { Chips } from '@components/chips';
import Codeblock from '@components/codeblock';
import { OpacityPageTransitionMotion } from '@components/custom-motion';
import { TinaProps } from '@entities/tina-props.interface';
import { client } from '@generatedTina/client';
import { PostQuery } from '@generatedTina/types';

const Post: NextPage<TinaProps<PostQuery>> = (props) => {
  const { data } = useTina({
    data: props.data,
    variables: props.variables,
    query: props.query
  });

  if (data == null || data.post == null) {
    return <div>Post data does not exist!</div>;
  }

  const { title, postDateTime, tags, excerpt, heroImage, body } = data.post;

  const tagsExist = tags != null && tags.length > 0;

  const displayedDateTime = new Intl.DateTimeFormat(navigator.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  }).format(new Date(postDateTime as string));

  const components: Components<{}> = {
    code_block: (codeBlockProps) => (
      <Codeblock language={codeBlockProps?.lang}>
        {codeBlockProps?.value}
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
        <Cards classes="m-4 sm:m-8 p-4 sm:p-8">
          <h1>{title}</h1>
          <span className="block my-4">
            <time>{displayedDateTime}</time>
          </span>
          {tagsExist && (
            <Chips
              labels={tags as string[]}
              clickLocation="tags"
              classes="mb-4"
            />
          )}
          {heroImage && (
            <div className="w-full">
              <div className="max-w-md mx-auto">
                <Image
                  src={heroImage}
                  layout="responsive"
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
};

export async function getStaticProps({
  params
}: any): Promise<GetStaticPropsResult<TinaProps<PostQuery>>> {
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
  const postListResponse: any = await client.queries.postConnection();

  return {
    paths: postListResponse.data.postConnection.edges.map((edge: any) => ({
      params: { slug: edge.node._sys.filename }
    })),
    fallback: 'blocking'
  };
}

export default Post;
