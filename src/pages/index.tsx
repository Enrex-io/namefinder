import Head from 'next/head';
import { META } from '@/consts/meta';
import Sustainability from '@/containers/SustainabilityForm';
import classes from './index.module.scss';
import NavBar from '@/components/NavBar/NavBar';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import { useState } from 'react';
import { IGreenWashingUser } from '@/types';

function Home() {
  const [userInfo, setUserInfo] = useState<IGreenWashingUser | null>(null);

  return (
    <AuthGuard>
      <>
        <Head>
          <title>{META.title}</title>
          <link rel='icon' href={META.favicon} />
          <meta name='description' content={META.description} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <NavBar userInfo={userInfo}/>
        <div className={classes.container}>
          <Sustainability setUserInfo={setUserInfo} />
        </div>
      </>
    </AuthGuard>
  );
}

export default Home;
