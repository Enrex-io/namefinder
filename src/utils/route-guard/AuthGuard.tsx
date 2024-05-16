import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';
import firebase from 'firebase/compat/app';
import { StringParam, useQueryParam } from 'use-query-params';

const AuthGuard = ({ children }: { children: ReactNode | null }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [token] = useQueryParam('token', StringParam);

    useEffect(() => {
        const loginWithTokenOrRedirect = async () => {
            if (token) {
                try {
                    await firebase.auth().signInWithCustomToken(token);
                    return;
                } catch (e) {
                    console.log('Token is invalid');
                }
            }

            if (!user?.isEmailVerified) {
                router.push('/login');
            }
        };

        loginWithTokenOrRedirect();
    }, [router, user?.isEmailVerified, token]);

    if (!user?.isEmailVerified) {
        return <FullscreenLoader />;
    }

    return <>{children}</>;
};

export default AuthGuard;
