import type { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { staticRequest } from 'tinacms';
import { useTina } from 'tinacms/dist/edit-state';
import {
  EmojiHappyIcon,
  NewspaperIcon,
  PlayIcon
} from '@heroicons/react/outline';
import { OpacityPageTransitionMotion } from '@components/custom-motion';
import { DisplayTextAnimation } from '@components/display-text-animation';

interface HomeProp {
  data: any;
}

const query = `{
  getHomeDocument(relativePath: "Home.md") {
    data {
      intro
    }
  }
}`;

const Home: NextPage<HomeProp> = (props) => {
  const { data } = useTina({
    query,
    variables: {},
    data: props.data
  });
  const { intro } = data.getHomeDocument.data;
  const speed = (n: number) => (n / 10) * 2 + 1;
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="description" content="Home Page" />
      </Head>
      <OpacityPageTransitionMotion>
        <div
          className="p-4 sm:p-8 flex flex-col justify-center"
          style={{ height: 'calc(100vh - 103px)' }}
        >
          {intro && (
            <DisplayTextAnimation
              paragraph={intro}
              speed={speed}
              classes="text-[1.5rem] font-bold sm:text-[3rem] sm:font-extrabold md:text-[4rem]"
            />
          )}
          <div className="mt-4 flex">
            <button
              aria-label="navigate to about page button"
              className="mr-8 w-[120px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 font-bold py-2 px-4 border border-transparent rounded shadow-lg shadow-gray-50 dark:shadow-gray-900"
              onClick={() => router.push('/about')}
            >
              <span>
                About Me <EmojiHappyIcon className="hidden md:block" />
              </span>
            </button>
            <button
              aria-label="navigate to about page button"
              className="mr-8 w-[120px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 font-bold py-2 px-4 border border-transparent rounded shadow-lg shadow-gray-50 dark:shadow-gray-900"
              onClick={() => router.push('/posts')}
            >
              <span>
                My Blog <NewspaperIcon className="hidden md:block" />
              </span>
            </button>
            <button
              aria-label="navigate to about page button"
              className="w-[120px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 font-bold py-2 px-4 border border-transparent rounded shadow-lg shadow-gray-50 dark:shadow-gray-900"
              onClick={() => router.push('/coming-soon')}
            >
              <span>
                Games <PlayIcon className="hidden md:block" />
              </span>
            </button>
          </div>
        </div>
      </OpacityPageTransitionMotion>
    </>
  );
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeProp>
> {
  const data = await staticRequest({ query });

  return {
    props: {
      data
    }
  };
}

export default Home;
