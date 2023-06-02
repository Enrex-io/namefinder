import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// material-ui
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from '../../../hooks/useAuth';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from '../../../utils/axios';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';

const Google = '/images/social-google.svg';

export const triggerNewcomerEmailGreeting = async (
    authToken: string,
    isNewUser: boolean
) => {
    try {
        await axios.post(
            '/api/emails/greeting',
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + authToken,
                    'is-new-user': isNewUser,
                },
            }
        );
    } catch (error: unknown) {
        console.error('Trigger newcomer greeting error', error);
    }
};

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const matchDownSM = useMediaQuery('(min-width:900px)');
    const [checked, setChecked] = React.useState(true);
    const router = useRouter();
    const [isVerified, setIsVerified] = useState<boolean>(true);
    const {
        firebaseEmailPasswordSignIn,
        firebaseGoogleSignIn,
        firebaseResendEmailVerification,
        checkFirebaseEmailVerification,
        isEmailVerified,
        user,
    } = useAuth();
    const [notification, setNotification] = React.useState<string>('');

    const googleHandler = async () => {
        try {
            const userCredentials = await firebaseGoogleSignIn();
            const isNewUser = !!userCredentials.additionalUserInfo?.isNewUser;
            const token = await userCredentials.user?.getIdToken();
            if (token && isNewUser)
                triggerNewcomerEmailGreeting(token, isNewUser);
        } catch (err) {
            console.error('Google handler error', err);
        }
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const handleResend = async () => {
        try {
            await firebaseResendEmailVerification();
            setNotification('sent');
        } catch (e: any) {
            setNotification(e.message);
        }
    };

    const createUserThenRedirect = useCallback(
        async function () {
            await GreenWashingUserService.createUser();
            router.push('/');
        },
        [router]
    );

    useEffect(() => {
        if (user) {
            if (user.claims?.firebase?.sign_in_provider === 'google.com') {
                createUserThenRedirect();
            }
        }
    }, [user, isEmailVerified, createUserThenRedirect]);

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                spacing={2}
            >
                <Grid item xs={12}>
                    <Button
                        disableElevation
                        fullWidth
                        onClick={googleHandler}
                        size="large"
                        variant="outlined"
                        color="secondary"
                        sx={{
                            color: 'grey.700',
                            backgroundColor: '#fafafa',
                            borderColor: '#f5f5f5',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                mr: { xs: 1, sm: 2 },
                                width: 20,
                                height: 20,
                                marginRight: matchDownSM ? 8 : 16,
                            }}
                        >
                            <Image
                                src={Google}
                                alt="Greenifs"
                                width={16}
                                height={16}
                            />
                        </Box>
                        Sign in with Google
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Divider
                            sx={{ flexGrow: 1 }}
                            orientation="horizontal"
                        />

                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: '#f5f5f5',
                                color: `${'#212121'}!important`,
                                fontWeight: 500,
                                borderRadius: `${16}px`,
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>

                        <Divider
                            sx={{ flexGrow: 1 }}
                            orientation="horizontal"
                        />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">
                            Sign in with Email address
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Email is required'),
                    password: Yup.string()
                        .max(255)
                        .required('Password is required'),
                })}
                onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                ) => {
                    try {
                        await firebaseEmailPasswordSignIn(
                            values.email,
                            values.password
                        ).then(
                            async () => {
                                const isEmailVerified =
                                    await checkFirebaseEmailVerification();

                                if (isEmailVerified) {
                                    setIsVerified(true);
                                    createUserThenRedirect();
                                } else {
                                    setIsVerified(false);
                                }
                                // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
                                // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                                // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                                // github issue: https://github.com/formium/formik/issues/2430
                            },
                            (err: any) => {
                                // setStatus({ success: false });
                                // setErrors({ submit: err.message });
                                // setSubmitting(false);
                            }
                        );
                    } catch (err: any) {
                        console.error('Firebase signin error', err);
                        // setStatus({ success: false });
                        // setErrors({ submit: err.message });
                        // setSubmitting(false);
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
                }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Stack spacing={2}>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.email && errors.email)}
                            >
                                <InputLabel htmlFor="outlined-adornment-email-login">
                                    Email Address / Username
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email-login"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Email Address / Username"
                                    inputProps={{}}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-email-login"
                                    >
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                fullWidth
                                error={Boolean(
                                    touched.password && errors.password
                                )}
                            >
                                <InputLabel htmlFor="outlined-adornment-password-login">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    inputProps={{}}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-password-login"
                                    >
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) =>
                                            setChecked(event.target.checked)
                                        }
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                href="/forgot"
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>
                                    {errors.submit}
                                </FormHelperText>
                            </Box>
                        )}
                        {!isVerified && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>
                                    Please complete sign-up process. Check your
                                    inbox for validation email. If is does not
                                    appear in inbox, check spam or{' '}
                                    <span
                                        onClick={handleResend}
                                        style={{
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                        }}
                                    >
                                        RESEND
                                    </span>
                                </FormHelperText>
                            </Box>
                        )}
                        {notification && (
                            <Box sx={{ mt: 3 }}>
                                {notification === 'sent' ? (
                                    <Alert severity="success">
                                        Verification email was sent. Please
                                        check your email
                                    </Alert>
                                ) : (
                                    <Alert severity="error">
                                        Verification email was not sent:{' '}
                                        {notification}
                                    </Alert>
                                )}
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Sign in
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;
