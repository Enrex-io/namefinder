import Head from 'next/head';
import { META } from '@/consts/meta';
import Sustainability from '@/containers/SustainabilityForm';
import classes from './index.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  useEffect(() => {
    console.dir(user);
  }, [user]);
  return (
    <>
      <Head>
        <title>{META.title}</title>
        <link rel='icon' href={META.favicon} />
        <meta name='description' content={META.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className={classes.container}>
        <Sustainability />
      </div>
    </>
  );
}
