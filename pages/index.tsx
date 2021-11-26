import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Home Page" />
      </Head>
    </Layout>
  );
};

export default Home;
