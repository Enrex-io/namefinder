import React, { useContext, useMemo } from 'react';
import Stack from '@/components/Stack/Stack';
import classes from './ActiveSubscription.module.scss';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import useSWR from 'swr';
import { SubscriptionData } from '@/types';
import Loader from '@/components/Loader/Loader';
import Paper from '@/components/Paper/Paper';
import clsx from 'clsx';

interface ActiveSubscriptionProps {
    headingText: string;
    showManageButton: boolean;
    zeroVerticalMargin?: boolean;
}

const ActiveSubscription: React.FC<ActiveSubscriptionProps> = ({
    headingText,
    showManageButton,
    zeroVerticalMargin = false,
}) => {
    const router = useRouter();
    const { showSnackbar } = useContext(SnackbarContext);
    const { data, isLoading } = useSWR<SubscriptionData>(
        '/api/payments/subscription',
        {
            refreshInterval: 5000,
        }
    );

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

    const priceString = useMemo(() => {
        if (!data || !data.price) return '-';
        const currencyString =
            data.currency === 'eur' ? '€' : `${data.currency} `;
        return `${currencyString}${(data.price / 100).toFixed(2)}/${
            data.interval
        }`;
    }, [data]);

    return (
        <Stack
            className={clsx(classes.container, {
                [classes.containerZeroMargin]: zeroVerticalMargin,
            })}
            spacing={1.25}
            direction="column"
        >
            <Paper className={classes.paper} direction="column" hasBorder>
                <h2 className={classes.heading}>{headingText}</h2>
                {isLoading && <Loader height={40} />}
                {data && (
                    <table className={classes.table}>
                        <thead>
                            <tr className={classes.tr}>
                                <th>{data.productName}</th>
                                <th
                                    className={clsx(classes.statusCell, {
                                        [classes.statusActive]:
                                            data.status === 'active',
                                        [classes.statusFailed]:
                                            data.status !== 'active',
                                    })}
                                >
                                    {data.status}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={classes.tr}>
                                <td colSpan={2}>{priceString}</td>
                            </tr>
                            <tr className={classes.tr}>
                                <td
                                    colSpan={2}
                                >{`${data.counter} monthly checks`}</td>
                            </tr>
                            <tr className={classes.tr}>
                                <td colSpan={2}>
                                    {`Upcoming payment: ${new Date(
                                        data.nextPaymentDate
                                    ).toLocaleDateString()}`}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </Paper>
            {showManageButton && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={handlePortalLinkClick}
                        className={classes.button}
                    >
                        Manage subscription
                    </Button>
                </div>
            )}
        </Stack>
    );
};

export default ActiveSubscription;
