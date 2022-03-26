import type { GetStaticPropsResult, NextPage } from 'next';
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
              id="homeButtonAbout"
              aria-label="navigate to about page button"
              className="mr-8 w-[120px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 font-bold py-2 px-4 border border-transparent rounded shadow-lg shadow-gray-50 dark:shadow-gray-900"
              onClick={() => router.push('/about')}
            >
              <span>
                About Me <EmojiHappyIcon className="hidden md:block" />
              </span>
            </button>
            <button
              id="homeButtonBlog"
              aria-label="navigate to blog page button"
              className="mr-8 w-[120px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 font-bold py-2 px-4 border border-transparent rounded shadow-lg shadow-gray-50 dark:shadow-gray-900"
              onClick={() => router.push('/posts')}
            >
              <span>
                My Blog <NewspaperIcon className="hidden md:block" />
              </span>
            </button>
            <button
              id="homeButtonGames"
              aria-label="navigate to games page button"
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
