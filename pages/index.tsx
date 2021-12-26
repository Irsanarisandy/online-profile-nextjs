import type { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { staticRequest } from 'tinacms';
import { OpacityPageTransitionMotion } from '@components/custom-motion';
import DisplayTextAnimation from '@components/display-text-animation';

interface HomeProp {
  query: string;
  data: any;
}

const Home: NextPage<HomeProp> = ({data}) => {
  const { intro } = data.getHomeDocument.data;
  const speed = (n: number) => n / 10 * 2 + 1;

  return (
    <>
      <Head>
        <meta name="description" content="Home Page" />
      </Head>
      <OpacityPageTransitionMotion classes="sm:m-8">
        {intro && <DisplayTextAnimation
          paragraph={intro}
          speed={speed}
          classes="text-[1.5rem] font-bold sm:text-[3rem] sm:font-extrabold md:text-[4rem]"
        />}
      </OpacityPageTransitionMotion>
    </>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProp>> {
  const query = `
    query {
      getHomeDocument(relativePath: "Home.md") {
        data {
          intro
        }
      }
    }
  `;
  const data = await staticRequest({ query });

  return {
    props: {
      query,
      data
    }
  };
}

export default Home;
