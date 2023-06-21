import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';

const AuthGuard = ({ children }: { children: ReactNode | null }) => {
    const { isLoggedIn } = useAuth();
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

    return <>{children}</>;
};

export default AuthGuard;
