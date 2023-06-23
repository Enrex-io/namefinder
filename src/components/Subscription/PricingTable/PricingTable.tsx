import Stack from '@/components/Stack/Stack';
import Script from 'next/script';
import React, { FC } from 'react';
import classes from './PricingTable.module.scss';

interface PricingTableProps {
    headingText: string;
    userId?: string;
    children?: React.ReactNode;
}

const STRIPE_PRICING_TABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;
const STRIPE_PUBLISHABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_ID;

const PricingTable: FC<PricingTableProps> = ({
    headingText,
    userId,
    children,
}) => {
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
                <h2 className={classes.heading}>{headingText}</h2>
                {children}
                <div
                    dangerouslySetInnerHTML={{
                        __html: `<stripe-pricing-table pricing-table-id=${STRIPE_PRICING_TABLE_ID} publishable-key="${STRIPE_PUBLISHABLE_ID}" client-reference-id="${userId}"></stripe-pricing-table>`,
                    }}
                ></div>
            </Stack>
        </>
    );
};

export default PricingTable;
