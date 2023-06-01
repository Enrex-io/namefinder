import Head from 'next/head';
import { META } from '@/consts/meta';
import Link from 'next/link';
import Logo from '@/components/Logo/Logo';
import AuthLogin from '@/components/authentication/auth-forms/AuthLogin';
import AuthWrapper1 from '@/components/authentication/AuthWrapper1';
import Grid from '@mui/material/Grid';
import AuthCardWrapper from '@/components/authentication/AuthCardWrapper';
import { Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import AuthFooter from '@/components/authentication/AuthFooter';

export default function Login() {
    const matchDownSM = useMediaQuery('(min-width:900px)');

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
                                            <Link href="#">
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
                                                            color="#009688;"
                                                            gutterBottom
                                                            variant={
                                                                matchDownSM
                                                                    ? 'h3'
                                                                    : 'h2'
                                                            }
                                                        >
                                                            Hi, Welcome Back
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            fontSize="16px"
                                                            textAlign={
                                                                matchDownSM
                                                                    ? 'center'
                                                                    : 'inherit'
                                                            }
                                                        >
                                                            Enter your
                                                            credentials to
                                                            continue
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthLogin />
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
                                                    href="/register"
                                                    variant="subtitle1"
                                                    sx={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    Don&apos;t have an account?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </>
    );
}
