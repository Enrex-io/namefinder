import React, { ReactElement, useContext } from 'react';
import classes from './subscription.module.scss';
import useAuth from '@/hooks/useAuth';
import Script from 'next/script';
import Stack from '@/components/Stack/Stack';
import Layout from '@/pages/layout';
import useSWR from 'swr';
import axios from '@/utils/axios';
import { IGreenWashingUser } from '@/types';
import Button from '@/components/Button/Button';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useRouter } from 'next/router';

const HEADING_TEXT = 'Subscription';
const STRIPE_PRICING_TABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;
const STRIPE_PUBLISHABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_ID;
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Subscription = () => {
    const router = useRouter();
    const { showSnackbar } = useContext(SnackbarContext);
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

    const handlePortalLinkClick = async () => {
        try {
            const link = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_LINK;
            if (!link) {
                throw new Error();
            }
            router.push(link);
        } catch (e) {
            showSnackbar('Subscription cancellation failed');
        }
    };

    if (isActiveSubscription) {
        return (
            <Stack
                className={classes.container}
                spacing={1.25}
                direction="column"
            >
                <h2 className={classes.heading}>{HEADING_TEXT}</h2>
                <div style={{ maxWidth: '280px' }}>
                    <Button onClick={handlePortalLinkClick}>
                        Manage your subscription
                    </Button>
                </div>
            </Stack>
        );
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
