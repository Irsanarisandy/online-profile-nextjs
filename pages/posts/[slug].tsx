import fs from 'fs';
import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  NextPage
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { staticRequest } from 'tinacms';
import { useTina } from 'tinacms/dist/edit-state';
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent
} from 'tinacms/dist/rich-text';
import { Cards } from '@components/cards';
import { Chips } from '@components/chips';
import Codeblock from '@components/codeblock';
import { OpacityPageTransitionMotion } from '@components/custom-motion';

interface PostData {
  title: string;
  postDateTime: string;
  tags: string[];
  heroImage: string;
  body: TinaMarkdownContent | TinaMarkdownContent[];
}

interface PostProp {
  variables: { relativePath: string };
  slug: string;
  data: any;
}

const query = `query BlogPostQuery($relativePath: String!) {
  getPostDocument(relativePath: $relativePath) {
    data {
      title,
      postDateTime,
      tags,
      heroImage,
      body
    }
  }
}`;

const Post: NextPage<PostProp> = (props) => {
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data
  });

  if (!(data && data.getPostDocument)) {
    return <div>No Data</div>;
  }

  const { title, postDateTime, tags, heroImage, body } = data.getPostDocument
    .data as PostData;

  const tagsExist = tags && tags.length > 0;

  const displayedDateTime = new Intl.DateTimeFormat(navigator.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  }).format(new Date(postDateTime));

  const components: Components<{}> = {
    code_block: (codeBlockProps) => (
      // eslint-disable-next-line react/no-children-prop
      <Codeblock
        children={codeBlockProps?.children}
        language={codeBlockProps?.lang}
      />
    )
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content={props.slug.replace(/([A-Z])/g, ' $1').trim()}
        />
      </Head>
      <OpacityPageTransitionMotion>
        <Cards classes="m-4 sm:m-8 p-4 sm:p-8">
          <h1>{title}</h1>
          <span className="my-4">
            <time>{displayedDateTime}</time>
          </span>
          {tagsExist && (
            <Chips labels={tags} clickLocation="tags" classes="mb-4" />
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
}: any): Promise<GetStaticPropsResult<PostProp>> {
  const { slug } = params;
  const variables = { relativePath: `${slug}.mdx` };
  const data: any = await staticRequest({ query, variables });
  if (!data.getPostDocument.data.postDateTime) {
    const file = `./content/posts/${slug}.mdx`;
    const creationDateTime = fs.statSync(file).mtime.toISOString();
    fs.writeFileSync(
      file,
      `---\ntitle: ${slug}\npostDateTime: '${creationDateTime}'\n---`
    );
    data.getPostDocument.data.postDateTime = creationDateTime;
  }

  return {
    props: {
      variables,
      slug,
      data
    }
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const pathsQuery = `{
    getPostList {
      edges {
        node {
          sys {
            filename
          }
        }
      }
    }
  }`;
  const postListData: any = await staticRequest({ query: pathsQuery });

  return {
    paths: postListData.getPostList.edges.map((edge: any) => ({
      params: { slug: edge.node.sys.filename }
    })),
    fallback: 'blocking'
  };
}

export default Post;
