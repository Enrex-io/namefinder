import React, { useEffect, useMemo, useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import { fontInter } from '@/styles/fonts';
import clsx from 'clsx';
import classes from './layout.module.scss';
import Head from 'next/head';
import { META } from '@/consts/meta';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import useSWR from 'swr';
import axios from '@/utils/axios';
import ComingSoonPopUp from '../components/PopUp/ComingSoonPopUp';
import {
    IGreenWashingUser,
    SubscriptionIssue,
    SubscriptionStatus,
} from '@/types';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';
import { useRouter } from 'next/router';
import SubscriptionIssuePopUp from '@/components/PopUp/SubscriptionIssuePopUp';

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
    const [openPopUp, setOpenPopUp] = useState<boolean>(false);
    const handlePopUp = () => {
        setOpenPopUp(!openPopUp);
    };
    const handleSubscriptionIssuePopUp = () => {
        router.push('/subscription');
    };

    const subscriptionIssue: SubscriptionIssue | null = useMemo(() => {
        if (!data?.result) {
            return null;
        }
        if (data.result.subscriptionStatus === SubscriptionStatus.FAILED) {
            return SubscriptionIssue.PAYMENT_FAILED;
        }
        if (data.result.counter < 1) {
            return SubscriptionIssue.ZERO_CREDITS;
        }
        return null;
    }, [data?.result]);

    const showSubscriptionIssue =
        subscriptionIssue && router.pathname !== '/subscription';

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
                    {openPopUp && <ComingSoonPopUp handlePopUp={handlePopUp} />}
                    {showSubscriptionIssue && (
                        <SubscriptionIssuePopUp
                            issue={SubscriptionIssue.ZERO_CREDITS}
                            handlePopUp={handleSubscriptionIssuePopUp}
                        />
                    )}
                    <NavBar
                        handlePopUp={handlePopUp}
                        userInfo={!isLoading && (data?.result || null)}
                    />
                    <main className={classes.main}>{children}</main>
                </div>
            </AuthGuard>
        </>
    );
}
