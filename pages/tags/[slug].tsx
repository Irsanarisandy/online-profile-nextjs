import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  NextPage
} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { staticRequest } from 'tinacms';
import { useTina } from 'tinacms/dist/edit-state';
import { Cards } from '@components/cards';
import { OpacityPageTransitionMotion } from '@components/custom-motion';

interface PostsData {
  location: string;
  title: string;
  tags: string[];
  excerpt: string;
  heroImage: string;
}

interface PostsProp {
  slug: string;
  data: any;
}

const query = `{
  postConnection(sort: "postDateTime") {
    edges {
      node {
        _sys {
          filename
        },
        title,
        tags,
        excerpt,
        heroImage
      }
    }
  }
}`;

const Tags: NextPage<PostsProp> = (props) => {
  const { data } = useTina({
    query,
    variables: {},
    data: props.data
  });
  const postList: PostsData[] = data.postConnection.edges
    .map((edge: any) => ({
      location: edge.node._sys.filename,
      ...edge.node
    }))
    .filter((curData: PostsData) => {
      const tags = curData.tags;
      return tags && tags.includes(props.slug);
    });
  return (
    <>
      <NextSeo title="Posts Tags" description={`Tag: ${props.slug}`} />
      <OpacityPageTransitionMotion classes="flex flex-col min-h-full px-4 pt-4 sm:px-8 sm:pt-8">
        <Cards classes="p-4 sm:p-8 mb-4 md:mb-8">
          <h1>Tag: {props.slug}</h1>
        </Cards>
        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:auto-rows-[440px]">
          {postList.map((curPost, index) => (
            <Cards classes="p-4 sm:p-8 flex flex-col" key={`post${index + 1}`}>
              <div className="mb-4 flex">
                <Link href={`/posts/${curPost.location}`} passHref>
                  <a className="hover:text-[#FDB601]">
                    <h1>{curPost.title}</h1>
                  </a>
                </Link>
              </div>
              {curPost.heroImage && (
                <div className="block w-full">
                  <div className="max-w-[300px] mx-auto">
                    <Image
                      src={curPost.heroImage}
                      layout="responsive"
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
};

export async function getStaticProps({
  params
}: any): Promise<GetStaticPropsResult<PostsProp>> {
  // Temporary: needs to be changed when Tina finally supports filtering
  const { slug } = params;
  const data = await staticRequest({ query });

  return {
    props: {
      slug,
      data
    }
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // Temporary: needs to be changed when Tina finally supports filtering
  const pathsQuery = `{
    postConnection {
      edges {
        node {
          tags
        }
      }
    }
  }`;
  const postListData: any = await staticRequest({ query: pathsQuery });
  let tags: string[] = postListData.postConnection.edges
    .map((edge: any) => edge.node.tags)
    .flat();
  tags = Array.from(new Set(tags));

  return {
    paths: tags.map((tag) => ({
      params: { slug: tag }
    })),
    fallback: false
  };
}

export default Tags;
