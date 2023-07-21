import React, { useContext, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { Button } from '@mui/material';
interface Props {
    email: string;
    setLoading: (v: boolean) => void;
}

const SignInProceedSameDevice: React.FC<Props> = ({ email, setLoading }) => {
    const router = useRouter();
    const signInAttempt = useRef(false);
    const { signInWithEmailLink, firebaseIsNewUser } = useAuth();
    const { showSnackbar } = useContext(SnackbarContext);

    useEffect(() => {
        const signIn = async () => {
            signInAttempt.current = true;
            setLoading(true);
            if (!email) {
                showSnackbar(
                    'Please open the link on the same device',
                    'error'
                );
                return;
            }
            try {
                await signInWithEmailLink(email, window.location.href);
                firebaseIsNewUser()
                    ? await router.push('/welcome')
                    : await router.push('/');
            } catch (e) {
                showSnackbar('Email verification failed', 'error');
            }

            setLoading(false);
        };
        if (!signInAttempt.current) {
            signIn();
        }
    }, [email, router, showSnackbar, signInWithEmailLink]);

    return (
        <Grid item xs={12}>
            <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="outlined"
                color="secondary"
                onClick={() => {
                    router.push('/login');
                }}
            >
                Proceed to Login
            </Button>
        </Grid>
    );
};

export default SignInProceedSameDevice;
