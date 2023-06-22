import React, { useContext } from 'react';
import Stack from '@/components/Stack/Stack';
import classes from './ActiveSubscription.module.scss';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import useSWR from 'swr';
import { SubscriptionData } from '@/types';
import axios from '@/utils/axios';
import Loader from '@/components/Loader/Loader';

interface ActiveSubscriptionProps {
    headingText: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ActiveSubscription: React.FC<ActiveSubscriptionProps> = ({
    headingText,
}) => {
    const router = useRouter();
    const { showSnackbar } = useContext(SnackbarContext);
    const { data, isLoading } = useSWR<SubscriptionData>(
        '/api/payments/subscription',
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    console.log(data);
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
    return (
        <Stack className={classes.container} spacing={1.25} direction="column">
            <h2 className={classes.heading}>{headingText}</h2>
            <div style={{ maxWidth: '280px' }}>
                <Button onClick={handlePortalLinkClick}>
                    Manage your subscription
                </Button>
            </div>
            {isLoading && <Loader height={40} />}
            {data && (
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.tr}>
                            <th>Price Name</th>
                            <th>Price</th>
                            <th>Interval</th>
                            <th>Subscription Start Date</th>
                            <th>Next Payment Date</th>
                            <th>Counter</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={classes.tr}>
                            <td>{data.priceName}</td>
                            <td>
                                {data.price
                                    ? (data.price / 100).toFixed(2)
                                    : '-'}
                            </td>
                            <td>{data?.interval}</td>
                            <td>
                                {new Date(
                                    data.subscriptionStartDate
                                ).toLocaleDateString()}
                            </td>
                            <td>
                                {new Date(
                                    data.nextPaymentDate
                                ).toLocaleDateString()}
                            </td>
                            <td>{data.counter}</td>
                            <td>{data.status}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </Stack>
    );
};

export default ActiveSubscription;
