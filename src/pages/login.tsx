import firebase from '../firebase';
import 'firebaseui/dist/firebaseui.css';
import Head from 'next/head';
import { META } from '@/consts/meta';
import classes from './login.module.scss';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';
import firebaseui from 'firebaseui';
import Link from 'next/link';
import Logo from '@/components/Logo/Logo';

export default function Home() {
    const firebaseAuthContainerRef = useRef<HTMLDivElement | null>(null);
    const ui = useRef<firebaseui.auth.AuthUI>();
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        async function createUserThenRedirect() {
            if (user) {
                await GreenWashingUserService.createUser();
                router.push('/');
            }
        }

        createUserThenRedirect();
    }, [user, router]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('firebaseui').then((firebaseui) => {
                if (!ui.current && firebaseAuthContainerRef.current) {
                    ui.current =
                        firebaseui.auth.AuthUI.getInstance() ||
                        new firebaseui.auth.AuthUI(firebase.auth());
                    ui.current.start(firebaseAuthContainerRef.current, {
                        callbacks: {
                            signInSuccessWithAuthResult: function () {
                                //We will manually redirect after ensuring that the user is present in the context to avoid bugs with redirects
                                return false;
                            },
                        },
                        signInOptions: [
                            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                            {
                                provider:
                                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                                signInMethod:
                                    firebase.auth.EmailAuthProvider
                                        .EMAIL_LINK_SIGN_IN_METHOD,
                                forceSameDevice: false,
                                emailLinkSignIn: function () {
                                    return {
                                        url: window.location.href,
                                    };
                                },
                            },
                        ],
                    });
                }
            });
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
                <div className={classes.loginPaper}>
                    <Link href="#">
                        <Logo />
                    </Link>
                    <p className={classes.signInText}>Sign in to continue</p>
                    <div ref={firebaseAuthContainerRef} />
                </div>
            </div>
        </>
    );
}
