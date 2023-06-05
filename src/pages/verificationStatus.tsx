import Head from 'next/head';
import { META } from '@/consts/meta';
import AuthVerifyEmail from '@/components/authentication/auth-forms/AuthVerifyEmail';
import { useRouter } from 'next/router';
import AuthResetPassword from '@/components/authentication/auth-forms/AuthResetPassword';

export default function Verification() {
    const router = useRouter();
    const { mode } = router.query;

    const isPasswordResetMode = mode === 'resetPassword';
    const isEmailVerificationMode = mode === 'verifyEmail';
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
            {isEmailVerificationMode && <AuthVerifyEmail />}
            {isPasswordResetMode && <AuthResetPassword />}
        </>
    );
}
