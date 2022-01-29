import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { staticRequest } from 'tinacms';
import { useTina } from 'tinacms/dist/edit-state';
import Cards from '@components/cards';
import Chips from '@components/chips';
import { OpacityPageTransitionMotion } from '@components/custom-motion';

interface PostsData {
  location: string;
  title: string;
  tags: string[];
  excerpt: string;
  heroImage: string;
}

interface PostsProp {
  data: any;
}

const query = `{
  getPostList {
    edges {
      node {
        sys {
          filename
        },
        data {
          title,
          tags,
          excerpt,
          heroImage
        }
      }
    }
  }
}`;

const Posts: NextPage<PostsProp> = (props) => {
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });
  let postsTags: string[] = [];
  const postsData: PostsData[] = data.getPostList.edges.map((edge: any) => {
    const curNode = edge.node;
    if (curNode.data.tags != null && curNode.data.tags.length > 0) {
      postsTags.push(...curNode.data.tags);
    }

    return {
      location: curNode.sys.filename,
      ...curNode.data
    };
  });
  postsTags = Array.from(new Set(postsTags)).sort();

  return (
    <>
      <Head>
        <meta name="description" content="Posts Page" />
      </Head>
      {postsData.length === 0 && <OpacityPageTransitionMotion classes="h-full flex items-center justify-center">
        <h1>No Posts Available</h1>
      </OpacityPageTransitionMotion>}
      {postsData.length > 0 &&
        <OpacityPageTransitionMotion classes="flex flex-col md:flex-row min-h-full px-4 pt-4 sm:px-8 sm:pt-8">
          <section className="mb-8 md:mb-0 md:ml-8">
            <Cards classes="p-4 sm:p-8 flex flex-col md:w-[320px]">
              <h1 className="mb-4">Tags</h1>
              {postsTags.length > 0 && <Chips labels={postsTags} clickLocation="tags" />}
            </Cards>
          </section>
          <section className="md:grow md:order-first grid gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 md:auto-rows-[440px]">
            {postsData.map((data, index) => (
              <Cards
                classes="p-4 sm:p-8 flex flex-col"
                key={`post${index+1}`}
              >
                <div className="mb-4 flex">
                  <Link href={`/posts/${data.location}`} passHref>
                    <a className="hover:text-[#FDB601]">
                      <h1>{data.title}</h1>
                    </a>
                  </Link>
                </div>
                {data.heroImage && <div className="block w-full">
                  <div className="max-w-md mx-auto">
                    <Image
                      src={data.heroImage}
                      layout="responsive"
                      alt="hero image"
                      height={540}
                      width={960}
                    />
                  </div>
                </div>}
                {data.excerpt && <p className="mt-4">{data.excerpt}</p>}
              </Cards>
            ))}
          </section>
        </OpacityPageTransitionMotion>
      }
    </>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<PostsProp>> {
  const data = await staticRequest({ query });

  return {
    props: {
      data
    }
  };
}

export default Posts;
