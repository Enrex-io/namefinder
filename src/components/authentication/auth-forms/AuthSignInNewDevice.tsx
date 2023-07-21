import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Stack,
    TextField,
} from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface Props {
    setLoading: (v: boolean) => void;
}

const SignInProceedNewDevice: React.FC<Props> = ({ setLoading }) => {
    const { signInWithEmailLink, firebaseIsNewUser } = useAuth();
    const router = useRouter();
    const { showSnackbar } = useContext(SnackbarContext);

    return (
        <Grid item xs={12}>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Email is required'),
                })}
                onSubmit={async (values) => {
                    setLoading(true);
                    try {
                        await signInWithEmailLink(
                            values.email,
                            window.location.href
                        );
                        if (firebaseIsNewUser()) router.push('/');
                    } catch (e) {
                        showSnackbar('Sign in failed', 'error');
                    }

                    setLoading(false);
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
                    return (
                        <form noValidate onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(
                                        touched.email && errors.email
                                    )}
                                >
                                    <TextField
                                        id="outlined-adornment-email-login"
                                        type="email"
                                        size="small"
                                        variant="outlined"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Email Address / Username"
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
                            </Stack>
                            <Box
                                sx={{
                                    mt: 2,
                                }}
                            >
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
                    );
                }}
            </Formik>
        </Grid>
    );
};

export default SignInProceedNewDevice;
