import Head from 'next/head';
import { META } from '@/consts/meta';
import Link from 'next/link';
import Logo from '@/components/Logo/Logo';
import AuthWrapper1 from '@/components/authentication/AuthWrapper1';
import Grid from '@mui/material/Grid';
import AuthCardWrapper from '@/components/authentication/AuthCardWrapper';
import { Typography } from '@mui/material';
import AuthRegister from '@/components/authentication/auth-forms/AuthRegister';
import LoginRegisterSwitcher from '@/components/authentication/LoginRegisterSwitcher';

export default function Register() {
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
                                        <Grid item>
                                            <Link href="#">
                                                <Logo />
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LoginRegisterSwitcher />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="caption"
                                                fontSize="16px"
                                                textAlign="center"
                                                component="p"
                                            >
                                                Enter your credentials to
                                                continue
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthRegister />
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </>
    );
}
