import Head from 'next/head';
import { META } from '@/consts/meta';
import Sustainability from '@/containers/SustainabilityForm';
import classes from './index.module.scss';
import { ReactElement } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import AuthGuard from '@/utils/route-guard/AuthGuard';

function Home() {
  return (
    <>
      <Head>
        <title>{META.title}</title>
        <link rel='icon' href={META.favicon} />
        <meta name='description' content={META.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <NavBar />
      <div className={classes.container}>
        <Sustainability />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AuthGuard>{page}</AuthGuard>;
};

export default Home;
