import Head from 'next/head';
import { META } from '@/consts/meta';
import AuthVerifyEmail from '@/components/authentication/auth-forms/AuthVerifyEmail';
import { useRouter } from 'next/router';
import AuthResetPassword from '@/components/authentication/auth-forms/AuthResetPassword';
import useAuth from '@/hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import AuthSignInProceed from '@/components/authentication/auth-forms/AuthSignInProceed';

export default function Verification() {
    const router = useRouter();
    const { showSnackbar } = useContext(SnackbarContext);
    const { checkActionCode } = useAuth();
    const { mode, oobCode } = router.query;
    const [email, setEmail] = useState<string>('');
    const [actionCodeError, setActionCodeError] = useState<string | null>(null);

    const isPasswordResetMode = mode === 'resetPassword';
    const isEmailVerificationMode = mode === 'verifyEmail';
    const isSignInMode = mode === 'signIn';

    useEffect(() => {
        (async () => {
            if (isSignInMode) return;
            try {
                if (typeof oobCode !== 'string') {
                    return;
                    // throw new Error('Action code error');
                }
                const res = await checkActionCode(oobCode);
                if (res.data.email) {
                    setEmail(res.data.email);
                }
            } catch (e) {
                console.log('Action code error');
                // setActionCodeError('Action code error');
            }
        })();
    }, [oobCode, checkActionCode, isSignInMode]);

    useEffect(() => {
        if (actionCodeError) {
            showSnackbar(actionCodeError, 'error');
        }
    }, [actionCodeError]);

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
            {isEmailVerificationMode && (
                <AuthVerifyEmail oobCode={oobCode} email={email} />
            )}
            {isPasswordResetMode && (
                <AuthResetPassword oobCode={oobCode} email={email} />
            )}
            {isSignInMode && (
                <AuthSignInProceed
                    email={localStorage.getItem('emailForSignIn')}
                />
            )}
        </>
    );
}
