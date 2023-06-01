import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';

const AuthGuard = ({ children }: { children: ReactElement | null }) => {
    const { user } = useAuth();
    const isLoggedIn = user ? Boolean(user.id) : false;
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
        // eslint-disable-next-line
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <FullscreenLoader />;
    }

    return children;
};

export default AuthGuard;
