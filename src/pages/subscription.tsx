import React, { ReactElement } from 'react';
import classes from './subscription.module.scss';
import useAuth from '@/hooks/useAuth';
import Script from 'next/script';
import Stack from '@/components/Stack/Stack';
import Layout from '@/pages/layout';

const HEADING_TEXT = 'Subscription';
const STRIPE_PRICING_TABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;
const STRIPE_PUBLISHABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_ID;

const Subscription = () => {
    const { user } = useAuth();

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
