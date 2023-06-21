import { useContext, FC } from 'react';
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
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '@/hooks/useAuth';
import {
    strengthColor,
    strengthIndicator,
} from '../../../utils/password-strength';
import logger from '@/utils/logger';

interface ResetPasswordProps {
    oobCode: string | string[] | undefined;
    email: string;
}
const AuthResetPassword: FC<ResetPasswordProps> = ({ oobCode, email }) => {
    const { updateUserPassword } = useAuth();
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
                                                    if (
                                                        !email ||
                                                        typeof oobCode !==
                                                            'string'
                                                    ) {
                                                        showSnackbar(
                                                            'Verification code should be valid',
                                                            'error'
                                                        );
                                                        return;
                                                    }

                                                    await updateUserPassword(
                                                        oobCode,
                                                        values.confirmedPassword
                                                    );

                                                    router.push('/login');
                                                } catch (err: any) {
                                                    logger.error('error', {
                                                        error: err,
                                                    });
                                                    showSnackbar(
                                                        'Error occured',
                                                        'error'
                                                    );
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
                                                    !email ||
                                                    !!Object.keys(errors)
                                                        .length ||
                                                    !values.confirmedPassword;
                                                const strengthNumber =
                                                    strengthIndicator(
                                                        values.password
                                                    );
                                                const strengthValue =
                                                    strengthColor(
                                                        strengthNumber
                                                    );
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
                                                            {strengthNumber !==
                                                                0 && (
                                                                <FormControl
                                                                    fullWidth
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            mb: 2,
                                                                        }}
                                                                    >
                                                                        <Grid
                                                                            container
                                                                            spacing={
                                                                                2
                                                                            }
                                                                            alignItems="center"
                                                                        >
                                                                            <Grid
                                                                                item
                                                                            >
                                                                                <Box
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            strengthValue?.color,
                                                                                    }}
                                                                                    sx={{
                                                                                        width: 85,
                                                                                        height: 8,
                                                                                        borderRadius:
                                                                                            '7px',
                                                                                    }}
                                                                                />
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                            >
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    fontSize="0.75rem"
                                                                                >
                                                                                    {
                                                                                        strengthValue?.label
                                                                                    }
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                </FormControl>
                                                            )}
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
};

export default AuthResetPassword;
