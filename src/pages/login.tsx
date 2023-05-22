import firebase from 'firebase/compat/app'
import 'firebaseui/dist/firebaseui.css'
import Head from 'next/head';
import { META } from '@/consts/meta';
import classes from './index.module.scss';
import { useEffect } from 'react';
import { firebaseConfig } from '@/config/firebaseApp.config';

export default function Home() {
  useEffect(() => {
    if (typeof window !== undefined) {
      import('firebaseui').then((firebaseui) => {
        let app;
        if (!firebase.apps.length) {
          app = firebase.initializeApp(firebaseConfig);
        }
        if (app) {
          const ui = new firebaseui.auth.AuthUI(firebase.auth(app));
          ui.start('#firebaseui-auth-container', {
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
