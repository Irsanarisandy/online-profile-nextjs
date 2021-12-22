import type { NextPage } from 'next';
import Head from 'next/head';
import DisplayTextAnimation from '@components/display-text-animation';
import styles from '@styles/Home.module.scss';

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
      <div className={styles.container}>
        <DisplayTextAnimation paragraph={intro} classes={styles.intro} />
      </div>
    </>
  );
};

export default Home;
