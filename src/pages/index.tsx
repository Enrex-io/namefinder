import Sustainability from '@/containers/SustainabilityForm';
import classes from './index.module.scss';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/pages/layout';
import MarketingRegulations from '@/components/MarketingRegulations/MarketingRegulations';

const Home: NextPageWithLayout = () => {
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
