import React, { ReactElement } from 'react';
import classes from './subscription.module.scss';
import useAuth from '@/hooks/useAuth';
import Script from 'next/script';
import Stack from '@/components/Stack/Stack';
import Layout from '@/pages/layout';
import useSWR from 'swr';
import axios from '@/utils/axios';
import { IGreenWashingUser } from '@/types';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';
import ActiveSubscription from '@/components/Subscription/ActiveSubscription/ActiveSubscription';

const HEADING_TEXT = 'Subscription';
const STRIPE_PRICING_TABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;
const STRIPE_PUBLISHABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_ID;
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Subscription = () => {
    const { user } = useAuth();
    const { data, isLoading } = useSWR<{ result: IGreenWashingUser }>(
        '/api/sustainabilityMarketing/user',
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    if (isLoading) {
        return <FullscreenLoader />;
    }

    const userInfo = data?.result;
    const isActiveSubscription =
        userInfo?.plan !== 'freemium' &&
        typeof userInfo?.counter === 'number' &&
        userInfo?.counter > 0 &&
        userInfo.subscriptionId;

    if (isActiveSubscription) {
        return <ActiveSubscription headingText={HEADING_TEXT} />;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src="https://js.stripe.com/v3/pricing-table.js"
            />
            <Stack
                className={classes.container}
                spacing={1.25}
                direction="column"
            >
                <h2 className={classes.heading}>{HEADING_TEXT}</h2>
                <div
                    dangerouslySetInnerHTML={{
                        __html: `<stripe-pricing-table pricing-table-id=${STRIPE_PRICING_TABLE_ID} publishable-key="${STRIPE_PUBLISHABLE_ID}" client-reference-id="${user?.id}"></stripe-pricing-table>`,
                    }}
                ></div>
            </Stack>
        </>
    );
};

Subscription.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Subscription;
