import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import Loader from '@/components/Loader/Loader';

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
        return (
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Loader height={21} />
            </div>
        );
    }

    return children;
};

export default AuthGuard;
