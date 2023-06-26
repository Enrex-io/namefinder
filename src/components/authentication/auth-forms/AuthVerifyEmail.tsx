import { FC, useContext } from 'react';
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

interface VerificationProps {
    oobCode: string | string[] | undefined;
    email: string;
}

const Verification: FC<VerificationProps> = ({ oobCode, email }) => {
    const { verifyEmail } = useAuth();
    const router = useRouter();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { showSnackbar } = useContext(SnackbarContext);
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
                                                            theme.palette
                                                                .secondary.main
                                                        }
                                                        gutterBottom
                                                        variant={
                                                            matchDownSM
                                                                ? 'h3'
                                                                : 'h2'
                                                        }
                                                    >
                                                        Email Verification
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
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontSize="1rem"
                                                    >
                                                        Please click a button
                                                        below
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                            onClick={async () => {
                                                try {
                                                    const result =
                                                        await verifyEmail(
                                                            oobCode as string
                                                        );
                                                    if (
                                                        result.isVerifiedEmail
                                                    ) {
                                                        const token =
                                                            await result.firebase
                                                                .auth()
                                                                .currentUser?.getIdToken();
                                                        router.push('/welcome');
                                                    }
                                                } catch (e) {
                                                    showSnackbar(
                                                        'Email verification failed',
                                                        'error'
                                                    );
                                                }
                                            }}
                                        >
                                            Verify Your Email
                                        </Button>
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
                                                    textDecoration: 'none',
                                                }}
                                                textAlign={
                                                    matchDownSM
                                                        ? 'center'
                                                        : 'inherit'
                                                }
                                            >
                                                If you appeared in this page
                                                accidentally please ignore it.
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
                                            Sustainability marketing assistant
                                            login page
                                        </Button>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Verification;
