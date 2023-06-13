import React, { useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import { fontInter } from '@/styles/fonts';
import clsx from 'clsx';
import classes from './layout.module.scss';
import Head from 'next/head';
import { META } from '@/consts/meta';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import useSWR from 'swr';
import axios from '@/utils/axios';
import ComingSoonPopUp from '@/components/PopUp/ComingSoonPopup';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface ILayout {
    children: React.ReactElement;
}

export default function Layout({ children }: ILayout) {
    const { data, isLoading } = useSWR(
        '/api/sustainabilityMarketing/user',
        fetcher,
        {
            refreshInterval: 5000,
        }
    );
    const [openPopUp, setOpenPopUp] = useState<boolean>(false);
    const handlePopUp = () => {
        setOpenPopUp(!openPopUp);
    };
    return (
        <>
            <Head>
                <title>{META.title}</title>
                <link rel="icon" href={META.favicon} />
                <meta name="description" content={META.description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <AuthGuard>
                <div className={clsx(fontInter.className)}>
                    {openPopUp && <ComingSoonPopUp handlePopUp={handlePopUp} />}
                    <NavBar
                        handlePopUp={handlePopUp}
                        userInfo={!isLoading && data?.result}
                    />
                    <main className={classes.main}>{children}</main>
                </div>
            </AuthGuard>
        </>
    );
}
