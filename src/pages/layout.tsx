import React, { useEffect, useMemo } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import { fontInter } from '@/styles/fonts';
import clsx from 'clsx';
import classes from './layout.module.scss';
import Head from 'next/head';
import { META } from '@/consts/meta';
import useSWR from 'swr';
import { IGreenWashingUser, PopupVariant, SubscriptionStatus } from '@/types';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';
import { useRouter } from 'next/router';
import PopUpVariant from '@/components/PopUp/PopUpVariant';
import { usePopup } from '@/contexts/PopupContext';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import useAuth from '@/hooks/useAuth';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';
import logger from '@/utils/logger';

interface ILayout {
    children: React.ReactElement;
}

export default function Layout({ children }: ILayout) {
    const router = useRouter();
    const { user } = useAuth();
    const { data, isLoading, mutate } = useSWR<{ result: IGreenWashingUser }>(
        user ? '/api/sustainabilityMarketing/user' : null
    );

    useEffect(() => {
        async function createUser() {
            try {
                const createUserData =
                    await GreenWashingUserService.createUser();
                if (createUserData.result) {
                    mutate({ result: createUserData.result });
                }
            } catch (e) {
                logger.error('Error while fetching user', { error: e });
            }
        }

        if (user && !data?.result) {
            createUser();
        }
    }, [user, data, mutate]);

    const { variant, setPopup, hidePopup } = usePopup();
    const handlePopUp = () => {
        if (variant === PopupVariant.WELCOME) {
            hidePopup();
            router.push('/').then(() => hidePopup());
            return;
        }
        if (router.pathname === '/subscription') {
            hidePopup();
            return;
        }
        router.push('/subscription').then(() => hidePopup());
    };

    const subscriptionIssue: PopupVariant | null = useMemo(() => {
        if (!data?.result) {
            return null;
        }
        if (data.result.subscriptionStatus === SubscriptionStatus.FAILED) {
            return PopupVariant.PAYMENT_FAILED;
        }
        if (data.result.counter < 1) {
            return PopupVariant.ZERO_CREDITS;
        }
        return null;
    }, [data?.result]);

    useEffect(() => {
        if (
            subscriptionIssue &&
            router.pathname !== '/subscription' &&
            router.pathname !== '/history'
        ) {
            setPopup(subscriptionIssue);
            return;
        }
    }, [subscriptionIssue, router, setPopup]);

    if (isLoading) {
        return <FullscreenLoader />;
    }

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
            <AuthGuard>
                <div className={clsx(fontInter.className)}>
                    {variant && (
                        <PopUpVariant
                            variant={variant}
                            handlePopUp={handlePopUp}
                        />
                    )}
                    <NavBar userInfo={!isLoading && (data?.result || null)} />
                    <main className={classes.main}>{children}</main>
                </div>
            </AuthGuard>
        </>
    );
}
