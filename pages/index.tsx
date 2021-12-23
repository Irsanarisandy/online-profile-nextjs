import type { NextPage } from 'next';
import Head from 'next/head';
import { OpacityPageTransitionMotion } from '@components/custom-motion';
import DisplayTextAnimation from '@components/display-text-animation';

const Home: NextPage = () => {
  const intro = [
    'Hello there \u270B,',
    'my name is Irsan.',
    "I'm a web developer."
  ];
  return (
    <>
      <Head>
        <meta name="description" content="Home Page" />
      </Head>
      <OpacityPageTransitionMotion classes="sm:m-8">
        <DisplayTextAnimation
          paragraph={intro}
          classes="text-[1.5rem] font-bold sm:text-[3rem] sm:font-extrabold md:text-[4rem]"
        />
      </OpacityPageTransitionMotion>
    </>
  );
};

export default Home;
