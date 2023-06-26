import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';

const AuthGuard = ({ children }: { children: ReactNode | null }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.isEmailVerified) {
            router.push('/login');
        }
    }, [router, user?.isEmailVerified]);

    if (!user?.isEmailVerified) {
        return <FullscreenLoader />;
    }

    return <>{children}</>;
};

export default AuthGuard;
