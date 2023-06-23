import React, { useEffect, useMemo } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import { fontInter } from '@/styles/fonts';
import clsx from 'clsx';
import classes from './layout.module.scss';
import Head from 'next/head';
import { META } from '@/consts/meta';
import useSWR from 'swr';
import axios from '@/utils/axios';
import { IGreenWashingUser, PopupVariant, SubscriptionStatus } from '@/types';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';
import { useRouter } from 'next/router';
import PopUpVariant from '@/components/PopUp/PopUpVariant';
import { usePopup } from '@/contexts/PopupContext';
import AuthGuard from '@/utils/route-guard/AuthGuard';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface ILayout {
    children: React.ReactElement;
}

export default function Layout({ children }: ILayout) {
    const router = useRouter();
    const { data, isLoading } = useSWR<{ result: IGreenWashingUser }>(
        '/api/sustainabilityMarketing/user',
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    const { variant, setPopup, hidePopup } = usePopup();
    const handleSubscriptionIssuePopUp = () => {
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
                            handlePopUp={handleSubscriptionIssuePopUp}
                        />
                    )}
                    <NavBar userInfo={!isLoading && (data?.result || null)} />
                    <main className={classes.main}>{children}</main>
                </div>
            </AuthGuard>
        </>
    );
}
