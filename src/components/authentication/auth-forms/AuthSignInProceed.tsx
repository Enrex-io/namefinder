import { FC, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo/Logo';
import AuthWrapper1 from '@/components/authentication/AuthWrapper1';
import Grid from '@mui/material/Grid';
import AuthCardWrapper from '@/components/authentication/AuthCardWrapper';
import {
    Button,
    Divider,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import Loader from '@/components/Loader/Loader';

interface SingInProceedProps {
    email: string | null;
}

const SignInProceed: FC<SingInProceedProps> = ({ email }) => {
    const signInAttempt = useRef(false);
    const [signInLoading, setSignInLoading] = useState(false);
    const { signInWithEmailLink, firebaseIsNewUser } = useAuth();
    const router = useRouter();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { showSnackbar } = useContext(SnackbarContext);

    useEffect(() => {
        const signIn = async () => {
            signInAttempt.current = true;
            setSignInLoading(true);
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

            setSignInLoading(false);
        };
        if (!signInAttempt.current) {
            signIn();
        }
    }, [email, router, showSnackbar, signInWithEmailLink]);

    return (
        <AuthWrapper1>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{ minHeight: '100vh' }}
            >
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: 'calc(100vh - 68px)' }}
                    >
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {signInLoading && (
                                        <Grid item xs={12}>
                                            <Loader height={44} />
                                        </Grid>
                                    )}
                                    {!signInLoading && (
                                        <>
                                            <Grid item sx={{ mb: 3 }}>
                                                <Link href="/">
                                                    <Logo />
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid
                                                    container
                                                    direction={
                                                        matchDownSM
                                                            ? 'column-reverse'
                                                            : 'row'
                                                    }
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Grid item>
                                                        <Stack
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            spacing={1}
                                                        >
                                                            <Typography
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .secondary
                                                                        .main
                                                                }
                                                                gutterBottom
                                                                variant={
                                                                    matchDownSM
                                                                        ? 'h3'
                                                                        : 'h2'
                                                                }
                                                            >
                                                                Signing in
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                fontSize="0.875rem"
                                                                textAlign={
                                                                    matchDownSM
                                                                        ? 'center'
                                                                        : 'inherit'
                                                                }
                                                            >
                                                                {email
                                                                    ? `This page was opened from your email ${email} inbox.`
                                                                    : `This page was opened from your email inbox.`}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid
                                                    item
                                                    container
                                                    direction="column"
                                                    alignItems="center"
                                                    xs={12}
                                                >
                                                    <Typography
                                                        component={Link}
                                                        href="#"
                                                        variant="subtitle1"
                                                        sx={{
                                                            textDecoration:
                                                                'none',
                                                        }}
                                                        textAlign={
                                                            matchDownSM
                                                                ? 'center'
                                                                : 'inherit'
                                                        }
                                                    >
                                                        If you appeared in this
                                                        page accidentally please
                                                        ignore it.
                                                    </Typography>
                                                </Grid>
                                            </Grid>
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
                                                    Sustainability marketing
                                                    assistant login page
                                                </Button>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default SignInProceed;
