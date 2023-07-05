import Sustainability from '@/containers/SustainabilityForm';
import classes from './index.module.scss';
import React, { ReactElement, useEffect } from 'react';
import { PopupVariant } from '@/types';
import useAuth from '@/hooks/useAuth';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/pages/layout';
import MarketingRegulations from '@/components/MarketingRegulations/MarketingRegulations';
import { usePopup } from '@/contexts/PopupContext';
import { useRouter } from 'next/router';

const Home: NextPageWithLayout = () => {
    const { firebaseIsNewUser } = useAuth();
    const { setPopup } = usePopup();
    const { push } = useRouter();

    useEffect(() => {
        if (firebaseIsNewUser()) {
            setPopup(PopupVariant.WELCOME);
        } else {
            push('/');
        }
    }, []);

    return (
        <div className={classes.container}>
            <MarketingRegulations />
            <Sustainability />
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;
