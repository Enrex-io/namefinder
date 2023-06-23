import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
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
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import useAuth from '../../../hooks/useAuth';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { StringColorProps } from '@/types';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useRouter } from 'next/router';
import logger from '@/utils/logger';

const Google = '/images/social-google.svg';

const INITIAL_FORM_VALUES = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    submit: null,
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
    fname: Yup.string(),
    lname: Yup.string(),
    email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    password: Yup.string().max(255).required('Password is required'),
});

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const router = useRouter();
    const { showSnackbar } = useContext(SnackbarContext);
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [isValidated, setIsValidated] = React.useState<boolean>(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();
    const { firebaseRegister, firebaseGoogleSignIn, user } = useAuth();

    const googleHandler = async () => {
        try {
            const userCredentials = await firebaseGoogleSignIn();
            const isNewUser = !!userCredentials.additionalUserInfo?.isNewUser;
            const token = await userCredentials.user?.getIdToken();
        } catch (err) {
            showSnackbar('Failed to sign up', 'error');
            logger.error('Google handler error', { error: err });
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        if (user) {
            if (user.claims?.firebase?.sign_in_provider === 'google.com') {
                router.push('/');
            }
        }
    }, [user, router]);

    useEffect(() => {
        changePassword('123456');
    }, []);

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
                        variant="outlined"
                        fullWidth
                        onClick={googleHandler}
                        size="large"
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
                                marginRight: matchDownMD ? 8 : 16,
                            }}
                        >
                            <Image
                                src={Google}
                                alt="Google"
                                layout="intrinsic"
                                width={16}
                                height={16}
                            />
                        </Box>
                        Sign up with Google
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
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
                                borderColor: `#f5f5f5 !important`,
                                color: `#212121 !important`,
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
                            Sign up with Email address
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={INITIAL_FORM_VALUES}
                validationSchema={FORM_VALIDATION_SCHEMA}
                onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                ) => {
                    if (!checked) {
                        setErrors({
                            submit: 'To proceed further please agree with Terms & Condition',
                        });
                        return;
                    }

                    try {
                        const result = await firebaseRegister(
                            values.email,
                            values.password
                        );

                        // const isNewUser = !!result.additionalUserInfo?.isNewUser;
                        // const token = await result.user?.getIdToken();
                        // if (token && isNewUser) triggerNewcomerEmailGreeting(token, isNewUser);
                        let profile = await result.user?.updateProfile({
                            displayName: values.fname + ' ' + values.lname,
                        });
                        setIsValidated(true);
                        return profile;
                    } catch (err: any) {
                        logger.error('Firebase register error', { error: err });
                        let message = 'Failed to sign up';
                        if (err.code === 'auth/email-already-in-use') {
                            message =
                                'The email address is already in use by another account.';
                        }
                        showSnackbar(message, 'error');
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
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="fname"
                                    id="fname"
                                    type="text"
                                    defaultValue=""
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lname"
                                    id="lname"
                                    type="text"
                                    defaultValue=""
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Stack spacing={2} marginTop={theme.spacing(2)}>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.email && errors.email)}
                            >
                                <InputLabel htmlFor="outlined-adornment-email-register">
                                    Email Address / Username
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email-register"
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
                                        id="standard-weight-helper-text--register"
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
                                <InputLabel htmlFor="outlined-adornment-password-register">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-register"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
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
                                    inputProps={{}}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-password-register"
                                    >
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {strength !== 0 && (
                                <FormControl fullWidth>
                                    <Box sx={{ mb: 2 }}>
                                        <Grid
                                            container
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <Box
                                                    style={{
                                                        backgroundColor:
                                                            level?.color,
                                                    }}
                                                    sx={{
                                                        width: 85,
                                                        height: 8,
                                                        borderRadius: '7px',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontSize="0.75rem"
                                                >
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl>
                            )}
                        </Stack>

                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item>
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
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography
                                                variant="subtitle1"
                                                component={Link}
                                                href="https://www.greenifs.ai/terms-cookies-privacy"
                                            >
                                                Terms & Conditions.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>
                                    {errors.submit}
                                </FormHelperText>
                            </Box>
                        )}
                        {isValidated && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText>
                                    To complete sign-up process please check
                                    your inbox to validate your email. If it
                                    does not appear in inbox, check spam folder.
                                    Validate your email and{' '}
                                    <Link href="/login">login</Link>
                                </FormHelperText>
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
                                color="primary"
                            >
                                Sign up
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
