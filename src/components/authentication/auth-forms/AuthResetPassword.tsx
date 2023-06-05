import { useEffect, useContext } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo/Logo';
import AuthWrapper1 from '@/components/authentication/AuthWrapper1';
import Grid from '@mui/material/Grid';
import AuthCardWrapper from '@/components/authentication/AuthCardWrapper';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function Verification() {
    const { checkActionCode } = useAuth();
    const router = useRouter();
    const { oobCode } = router.query;
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        (async () => {
            if (typeof oobCode === 'string') {
                const res = await checkActionCode(oobCode);
                if (res.data.email) {
                    setEmail(res.data.email);
                }
            }
        })();
    }, [oobCode, checkActionCode]);

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
                                                        Reset password
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Formik
                                            initialValues={{
                                                password: '',
                                                confirmedPassword: '',
                                            }}
                                            validationSchema={Yup.object().shape(
                                                {
                                                    password: Yup.string()
                                                        .max(255)
                                                        .required(
                                                            'Password is required'
                                                        ),
                                                    confirmedPassword:
                                                        Yup.string()
                                                            .max(255)
                                                            .oneOf(
                                                                [
                                                                    Yup.ref(
                                                                        'password'
                                                                    ),
                                                                ],
                                                                'Passwords must match'
                                                            )
                                                            .required(
                                                                'Please confirm your password'
                                                            ),
                                                }
                                            )}
                                            onSubmit={async (
                                                values,
                                                {
                                                    setErrors,
                                                    setStatus,
                                                    setSubmitting,
                                                }
                                            ) => {
                                                try {
                                                    // await firebaseEmailPasswordSignIn(
                                                    //     values.email,
                                                    //     values.password
                                                    // );
                                                    // const isEmailVerified =
                                                    //     await checkFirebaseEmailVerification();
                                                    // if (isEmailVerified) {
                                                    //     setIsVerified(true);
                                                    // } else {
                                                    //     setIsVerified(false);
                                                    // }
                                                    // router.reload();
                                                } catch (err: any) {
                                                    // let message =
                                                    //     'Firebase signin error';
                                                    // if (
                                                    //     err.code ===
                                                    //     'auth/user-not-found'
                                                    // ) {
                                                    //     message =
                                                    //         'User not found';
                                                    // }
                                                    // showSnackbar(
                                                    //     message,
                                                    //     'error'
                                                    // );
                                                    // console.error(message, err);
                                                }
                                            }}
                                        >
                                            {({
                                                errors,
                                                handleBlur,
                                                handleChange,
                                                handleSubmit,
                                                isSubmitting,
                                                touched,
                                                values,
                                            }) => {
                                                const isSubmitDisabled =
                                                    isSubmitting ||
                                                    !!Object.keys(errors)
                                                        .length;
                                                return (
                                                    <form
                                                        noValidate
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <Stack spacing={2}>
                                                            <FormControl
                                                                fullWidth
                                                                error={Boolean(
                                                                    touched.password &&
                                                                        errors.password
                                                                )}
                                                            >
                                                                <InputLabel htmlFor="outlined-adornment-new-password">
                                                                    New password
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-new-password"
                                                                    type="password"
                                                                    value={
                                                                        values.password
                                                                    }
                                                                    name="password"
                                                                    onBlur={
                                                                        handleBlur
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    label="New password"
                                                                    inputProps={{}}
                                                                />
                                                                {touched.password &&
                                                                    errors.password && (
                                                                        <FormHelperText
                                                                            error
                                                                            id="standard-weight-helper-text-password"
                                                                        >
                                                                            {
                                                                                errors.password
                                                                            }
                                                                        </FormHelperText>
                                                                    )}
                                                            </FormControl>
                                                            <FormControl
                                                                fullWidth
                                                                error={Boolean(
                                                                    touched.confirmedPassword &&
                                                                        errors.confirmedPassword
                                                                )}
                                                            >
                                                                <InputLabel htmlFor="outlined-adornment-confirmed-password">
                                                                    Confirm your
                                                                    password
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-confirmed-password"
                                                                    type="password"
                                                                    value={
                                                                        values.confirmedPassword
                                                                    }
                                                                    name="confirmedPassword"
                                                                    onBlur={
                                                                        handleBlur
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    label="Confirm your password"
                                                                    inputProps={{}}
                                                                />
                                                                {touched.confirmedPassword &&
                                                                    errors.confirmedPassword && (
                                                                        <FormHelperText
                                                                            error
                                                                            id="standard-weight-helper-text-password"
                                                                        >
                                                                            {
                                                                                errors.confirmedPassword
                                                                            }
                                                                        </FormHelperText>
                                                                    )}
                                                            </FormControl>
                                                        </Stack>
                                                        <Box sx={{ mt: 2 }}>
                                                            <Button
                                                                disableElevation
                                                                disabled={
                                                                    isSubmitDisabled
                                                                }
                                                                fullWidth
                                                                size="large"
                                                                type="submit"
                                                                variant="contained"
                                                            >
                                                                Reset password
                                                            </Button>
                                                        </Box>
                                                    </form>
                                                );
                                            }}
                                        </Formik>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
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
}
