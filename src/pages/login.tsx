import firebase from '../firebase';
import 'firebaseui/dist/firebaseui.css';
import Head from 'next/head';
import { META } from '@/consts/meta';
import classes from './index.module.scss';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';
import firebaseui from 'firebaseui';

export default function Home() {
    const ui = useRef<firebaseui.auth.AuthUI>();
    const router = useRouter();

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            GreenWashingUserService.createUser();
            router.push('/');
        }
    }, [user, router]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('firebaseui').then((firebaseui) => {
                if (!ui.current) {
                    ui.current =
                        firebaseui.auth.AuthUI.getInstance() ||
                        new firebaseui.auth.AuthUI(firebase.auth());
                    ui.current.start('#firebaseui-auth-container', {
                        callbacks: {
                            signInSuccessWithAuthResult: function (
                                _authResult,
                                _redirectUrl
                            ) {
                                //We will manually redirect after ensuring that the user is present in the context to avoid bugs with redirects
                                return false;
                            },
                        },
                        signInOptions: [
                            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                        ],
                    });
                }
            });

            return () => {
                if (ui.current) {
                    ui.current.delete();
                }
            };
        }
    }, []);

    return (
        <>
            <Head>
                <title>{META.title}</title>
                <link rel="icon" href={META.favicon} />
                <meta name="description" content={META.description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <div className={classes.container}>
                <div id="firebaseui-auth-container" />
            </div>
        </>
    );
}
