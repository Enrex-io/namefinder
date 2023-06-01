// import Image from 'next/image';
// import React, { useEffect } from 'react';
// import Link from 'next/link';
// // material-ui
// import { useTheme } from '@mui/material/styles';
// import {
//   Box,
//   Button,
//   Checkbox,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormHelperText,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   TextField,
//   Typography,
//   useMediaQuery,
// } from '@mui/material';

// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// // project imports
// import useAuth from 'hooks/useAuth';
// import useConfig from 'hooks/useConfig';
// import useScriptRef from 'hooks/useScriptRef';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import { strengthColor, strengthIndicator } from 'utils/password-strength';

// // assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { StringColorProps } from 'types';
// import axiosServices from 'utils/axios';
// import logger from '@utils/logger';
// const Google = '/images/icons/social-google.svg';
// // ===========================|| FIREBASE - REGISTER ||=========================== //

// const triggerNewcomerEmailGreeting = async (authToken: string, isNewUser: boolean) => {
//   try {
//     await axiosServices.post(
//       '/api/emails/greeting',
//       {},
//       {
//         headers: {
//           Authorization: 'Bearer ' + authToken,
//           'is-new-user': isNewUser,
//         },
//       }
//     );
//   } catch (error: unknown) {
//     logger.error('Trigger newcomer error', error);
//   }
// };

// const INITIAL_FORM_VALUES = {
//   fname: '',
//   lname: '',
//   email: '',
//   password: '',
//   submit: null,
// };

// const FORM_VALIDATION_SCHEMA = Yup.object().shape({
//   fname: Yup.string(),
//   lname: Yup.string(),
//   email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//   password: Yup.string().max(255).required('Password is required'),
// });

// const FirebaseRegister = ({ ...others }) => {
//   const theme = useTheme();
//   const scriptedRef = useScriptRef();
//   const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
//   const { borderRadius } = useConfig();
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [checked, setChecked] = React.useState(true);
//   const [isValidated, setIsValidated] = React.useState<boolean>(false);

//   const [strength, setStrength] = React.useState(0);
//   const [level, setLevel] = React.useState<StringColorProps>();
//   const { firebaseRegister, firebaseGoogleSignIn } = useAuth();

//   const googleHandler = async () => {
//     try {
//       const userCredentials = await firebaseGoogleSignIn();
//       const isNewUser = !!userCredentials.additionalUserInfo?.isNewUser;
//       const token = await userCredentials.user?.getIdToken();
//       if (token && isNewUser) triggerNewcomerEmailGreeting(token, isNewUser);
//     } catch (err) {
//       logger.error('Google handler error', err);
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event: React.SyntheticEvent) => {
//     event.preventDefault();
//   };

//   const changePassword = (value: string) => {
//     const temp = strengthIndicator(value);
//     setStrength(temp);
//     setLevel(strengthColor(temp));
//   };

//   useEffect(() => {
//     changePassword('123456');
//   }, []);

//   return (
//     <>
//       <Grid container direction="column" justifyContent="center" spacing={2}>
//         <Grid item xs={12}>
//           <AnimateButton>
//             <Button
//               variant="outlined"
//               fullWidth
//               onClick={googleHandler}
//               size="large"
//               sx={{
//                 color: 'grey.700',
//                 backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
//                 borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100],
//               }}
//             >
//               <Box sx={{ display: 'flex', mr: { xs: 1, sm: 2 }, width: 20, height: 20, marginRight: matchDownSM ? 8 : 16 }}>
//                 <Image src={Google} alt="Google" layout="intrinsic" width={16} height={16} />
//               </Box>
//               Sign up with Google
//             </Button>
//           </AnimateButton>
//         </Grid>
//         <Grid item xs={12}>
//           <Box sx={{ alignItems: 'center', display: 'flex' }}>
//             <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
//             <Button
//               variant="outlined"
//               sx={{
//                 cursor: 'unset',
//                 m: 2,
//                 py: 0.5,
//                 px: 7,
//                 borderColor:
//                   theme.palette.mode === 'dark' ? `${theme.palette.dark.light + 20} !important` : `${theme.palette.grey[100]} !important`,
//                 color: `${theme.palette.grey[900]}!important`,
//                 fontWeight: 500,
//                 borderRadius: `${borderRadius}px`,
//               }}
//               disableRipple
//               disabled
//             >
//               OR
//             </Button>
//             <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
//           </Box>
//         </Grid>
//         <Grid item xs={12} container alignItems="center" justifyContent="center">
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">Sign up with Email address</Typography>
//           </Box>
//         </Grid>
//       </Grid>

//       <Formik
//         initialValues={INITIAL_FORM_VALUES}
//         validationSchema={FORM_VALIDATION_SCHEMA}
//         onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//           try {
//             await firebaseRegister(values.email, values.password).then(
//               async (result) => {
//                 // const isNewUser = !!result.additionalUserInfo?.isNewUser;
//                 // const token = await result.user?.getIdToken();
//                 // if (token && isNewUser) triggerNewcomerEmailGreeting(token, isNewUser);
//                 let profile = await result.user?.updateProfile({
//                   displayName: values.fname + ' ' + values.lname,
//                 });
//                 setIsValidated(true);
//                 return profile;
//                 // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
//                 // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
//                 // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
//                 // github issue: https://github.com/formium/formik/issues/2430
//               },
//               (err: any) => {
//                 if (scriptedRef.current) {
//                   setStatus({ success: false });
//                   setErrors({ submit: err.message });
//                   setSubmitting(false);
//                 }
//               }
//             );
//           } catch (err: any) {
//             logger.error('Firebase register error', err);
//             if (scriptedRef.current) {
//               setStatus({ success: false });
//               setErrors({ submit: err.message });
//               setSubmitting(false);
//             }
//           }
//         }}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit} {...others}>
//             <Grid container spacing={matchDownSM ? 0 : 2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   margin="normal"
//                   name="fname"
//                   id="fname"
//                   type="text"
//                   defaultValue=""
//                   onChange={handleChange}
//                   sx={{ ...theme.typography.customInput }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   margin="normal"
//                   name="lname"
//                   id="lname"
//                   type="text"
//                   defaultValue=""
//                   onChange={handleChange}
//                   sx={{ ...theme.typography.customInput }}
//                 />
//               </Grid>
//             </Grid>
//             <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-email-register"
//                 type="email"
//                 value={values.email}
//                 name="email"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 inputProps={{}}
//               />
//               {touched.email && errors.email && (
//                 <FormHelperText error id="standard-weight-helper-text--register">
//                   {errors.email}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password-register"
//                 type={showPassword ? 'text' : 'password'}
//                 value={values.password}
//                 name="password"
//                 label="Password"
//                 onBlur={handleBlur}
//                 onChange={(e) => {
//                   handleChange(e);
//                   changePassword(e.target.value);
//                 }}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                       size="large"
//                     >
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 inputProps={{}}
//               />
//               {touched.password && errors.password && (
//                 <FormHelperText error id="standard-weight-helper-text-password-register">
//                   {errors.password}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             {strength !== 0 && (
//               <FormControl fullWidth>
//                 <Box sx={{ mb: 2 }}>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item>
//                       <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
//                     </Grid>
//                     <Grid item>
//                       <Typography variant="subtitle1" fontSize="0.75rem">
//                         {level?.label}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </FormControl>
//             )}

//             <Grid container alignItems="center" justifyContent="space-between">
//               <Grid item>
//                 <FormControlLabel
//                   control={
//                     <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
//                   }
//                   label={
//                     <Typography variant="subtitle1">
//                       Agree with &nbsp;
//                       <Typography variant="subtitle1" component={Link} href="/">
//                         Terms & Condition.
//                       </Typography>
//                     </Typography>
//                   }
//                 />
//               </Grid>
//             </Grid>
//             {errors.submit && (
//               <Box sx={{ mt: 3 }}>
//                 <FormHelperText error>{errors.submit}</FormHelperText>
//               </Box>
//             )}
//             {isValidated && (
//               <Box sx={{ mt: 3 }}>
//                 <FormHelperText>
//                   To complete sign-up process please check your inbox to validate your email. If it does not appear in inbox, check spam
//                   folder. Validate your email and <Link href="/login">login</Link>
//                 </FormHelperText>
//               </Box>
//             )}
//             <Box sx={{ mt: 2 }}>
//               <AnimateButton>
//                 <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
//                   Sign up
//                 </Button>
//               </AnimateButton>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default FirebaseRegister;
