import type { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { useTina } from 'tinacms/dist/react';
import {
  FaceSmileIcon,
  NewspaperIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

import { OpacityPageTransitionMotion } from '.components/custom-motion';
import { DisplayTextAnimation } from '.components/display-text-animation';
import { TinaProps } from '.entities/tina-props.interface';
import { client } from '.generatedTina/client';
import { HomeQuery } from '.generatedTina/types';

export default function Home(props: TinaProps<HomeQuery>): JSX.Element {
  const router = useRouter();
  const { data } = useTina({
    data: props.data,
    variables: props.variables,
    query: props.query
  });

  if (data == null || data.home == null) {
    return <div>Home data does not exist!</div>;
  }

  const { intro } = data.home;
  const introExist = intro != null && intro.length > 0;
  const speed = (n: number) => (n / 10) * 2 + 1;

  return (
    <OpacityPageTransitionMotion>
      <div
        className="p-4 sm:p-8 flex flex-col justify-center"
        style={{ height: 'calc(100vh - 103px)' }}
      >
        {introExist && (
          <DisplayTextAnimation
            paragraph={intro as string[]}
            speed={speed}
            classes="text-[1.5rem] font-bold sm:text-[3rem] sm:font-extrabold md:text-[4rem]"
          />
        )}
        <div className="mt-4 flex">
          <button
            id="homeButtonAbout"
            data-testid="homeButtonAbout"
            aria-label="navigate to about page button"
            className="mr-8 w-[120px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 font-bold py-2 px-4 border border-transparent rounded shadow-lg shadow-gray-50 dark:shadow-gray-900"
            onClick={() => router.push('/about')}
          >
            <span>
              About Me <FaceSmileIcon className="hidden md:block" />
            </span>
          </button>
          <button
            id="homeButtonBlog"
            data-testid="homeButtonBlog"
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
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<TinaProps<HomeQuery>>
> {
  const tinaProps = await client.queries.home({ relativePath: 'Home.md' });

  return {
    props: {
      data: tinaProps.data,
      variables: tinaProps.variables,
      query: tinaProps.query
    }
  };
}
