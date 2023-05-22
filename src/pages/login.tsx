import firebase from '../firebase';
import 'firebaseui/dist/firebaseui.css'
import Head from 'next/head';
import { META } from '@/consts/meta';
import classes from './index.module.scss';
import { useEffect, useRef } from 'react';

export default function Home() {
  const ui = useRef<firebaseui.auth.AuthUI>();
  
  useEffect(() => {
    if (typeof window !== undefined) {
      import('firebaseui').then((firebaseui) => {
        if (!ui.current) {
          ui.current = new firebaseui.auth.AuthUI(firebase.auth());
          ui.current.start('#firebaseui-auth-container', {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                console.dir(authResult);
                
                return true;
              },
            },
            signInSuccessUrl: '/',
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.TwitterAuthProvider.PROVIDER_ID
            ],
          });
        }
      })
    }
  }, []);

  return (
    <>
      <Head>
        <title>{META.title}</title>
        <link rel='icon' href={META.favicon} />
        <meta name='description' content={META.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className={classes.container}>
        <div id="firebaseui-auth-container" />
      </div>
    </>
  );
}
