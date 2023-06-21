'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import {
  FaceSmileIcon,
  NewspaperIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

import { OpacityPageTransitionMotion } from '.components/CustomMotion';
import { DisplayTextAnimation } from '.components/DisplayTextAnimation';
import type { HomeQuery, HomeQueryVariables } from '.generatedTina/types';

export default function HomeContent({
  tinaProps
}: {
  tinaProps: {
    data: HomeQuery;
    variables: HomeQueryVariables;
    query: string;
  };
}) {
  const router = useRouter();
  const { data } = useTina({
    data: tinaProps.data,
    variables: tinaProps.variables,
    query: tinaProps.query
  });

  if (data?.home == null) {
    return <div>Home data does not exist!</div>;
  }

  const { intro } = data.home;
  const introExist = intro != null && intro.length > 0;
  const speed = (n: number) => (n / 10) * 2 + 1;

  return (
    <OpacityPageTransitionMotion keyName="home">
      <div
        className="flex flex-col justify-center p-4 sm:p-8"
        style={{ height: 'calc(100vh - 103px)' }}
      >
        {introExist && (
          <DisplayTextAnimation
            paragraph={intro as string[]}
            speed={speed}
            className="text-[1.5rem] font-bold sm:text-[3rem] sm:font-extrabold md:text-[4rem]"
            passedTinaFieldFunc={(i) => tinaField(data.home, 'intro', i)}
          />
        )}
        <div className="mt-4 flex">
          <button
            id="homeButtonAbout"
            data-testid="homeButtonAbout"
            aria-label="navigate to about page button"
            className="mr-8 w-[120px] rounded border border-transparent px-4 py-2 font-bold shadow-lg shadow-gray-50 transition-colors duration-500 hover:bg-gray-50 dark:shadow-gray-900 dark:hover:bg-gray-900"
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
            className="mr-8 w-[120px] rounded border border-transparent px-4 py-2 font-bold shadow-lg shadow-gray-50 transition-colors duration-500 hover:bg-gray-50 dark:shadow-gray-900 dark:hover:bg-gray-900"
            onClick={() => router.push('/posts')}
          >
            <span>
              My Blog <NewspaperIcon className="hidden md:block" />
            </span>
          </button>
          <button
            id="homeButtonGames"
            aria-label="navigate to games page button"
            className="w-[120px] rounded border border-transparent px-4 py-2 font-bold shadow-lg shadow-gray-50 transition-colors duration-500 hover:bg-gray-50 dark:shadow-gray-900 dark:hover:bg-gray-900"
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
