import React, { ReactElement } from 'react';
import useAuth from '@/hooks/useAuth';
import Layout from '@/pages/layout';
import useSWR from 'swr';
import axios from '@/utils/axios';
import { IGreenWashingUser } from '@/types';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';
import ActiveSubscription from '@/components/Subscription/ActiveSubscription/ActiveSubscription';
import PricingTable from '@/components/Subscription/PricingTable/PricingTable';

const HEADING_TEXT = 'Subscription';
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
        userInfo?.subscriptionStatus !== 'failed';

    const isCounterPositive =
        typeof userInfo?.counter === 'number' && userInfo?.counter > 0;

    if (isActiveSubscription && isCounterPositive) {
        return (
            <ActiveSubscription
                headingText={HEADING_TEXT}
                showManageButton={true}
            />
        );
    }

    return (
        <PricingTable headingText={HEADING_TEXT} userId={user?.id}>
            {!isCounterPositive && (
                <ActiveSubscription
                    headingText={'Current subscription'}
                    showManageButton={false}
                    zeroVerticalMargin
                />
            )}
        </PricingTable>
    );
};

Subscription.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Subscription;
