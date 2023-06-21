import Sustainability from '@/containers/SustainabilityForm';
import classes from './index.module.scss';
import React, { ReactElement, useEffect, useState } from 'react';
import { IGreenWashingUser } from '@/types';
import useAuth from '@/hooks/useAuth';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/pages/layout';
import MarketingRegulations from '@/components/MarketingRegulations/MarketingRegulations';
import logger from '@/utils/logger';

const Home: NextPageWithLayout = () => {
    const [userInfo, setUserInfo] = useState<IGreenWashingUser | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await GreenWashingUserService.getUser();
                if (userData.result) {
                    setUserInfo(userData.result);
                    return;
                } else {
                    const createUserData =
                        await GreenWashingUserService.createUser();
                    if (createUserData.result) {
                        setUserInfo(createUserData.result);
                    }
                }
            } catch (e) {
                logger.error('Error while fetching user', { error: e });
            }
        }

        if (user) {
            fetchUser();
        }
    }, [user]);

    return (
        <div className={classes.container}>
            <MarketingRegulations />
            <Sustainability userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;
