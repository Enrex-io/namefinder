import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from '../../../hooks/useAuth';

const AuthForgotPassword = ({ ...others }) => {
    const { resetPassword } = useAuth();

    return (
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
            })}
            onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
            ) => {
                try {
                    await resetPassword(values.email);
                    // setStatus({ success: true });
                    // setSubmitting(false);
                    // showSnackbar(
                    //     'Check mail for reset password link',
                    //     'success'
                    // );
                    // setTimeout(() => {
                    //     window.location.replace('/login');
                    // }, 1500);
                } catch (err: any) {
                    console.error('Reset password error', err);
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
                    <FormControl
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                    >
                        <InputLabel htmlFor="outlined-adornment-email-forgot">
                            Email Address / Username
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
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
                                id="standard-weight-helper-text-email-forgot"
                            >
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>
                                {errors.submit}
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
                            color="secondary"
                        >
                            Send Mail
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthForgotPassword;
