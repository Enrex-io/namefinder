import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar2/NavBar';
import { fontInter } from '@/styles/fonts';
import clsx from 'clsx';
import classes from './layout.module.scss';
import { IGreenWashingUser } from '@/types';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';
import useAuth from '@/hooks/useAuth';
import PopUp from '@/components/PopUp/PopUp';
import Head from 'next/head';
import { META } from '@/consts/meta';
import AuthGuard from '@/utils/route-guard/AuthGuard';

interface ILayout {
    children: React.ReactElement;
}

export default function Layout({ children }: ILayout) {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState<IGreenWashingUser | null>(null);
    const [openPopUp, setOpenPopUp] = useState<boolean>(false);

    const handlePopUp = () => {
        setOpenPopUp(!openPopUp);
    };
    useEffect(() => {
        async function fetchUser() {
            const userData = await GreenWashingUserService.getUser();
            if (userData.result) {
                setUserInfo(userData.result);
                return;
            }
            return userData;
        }

        if (user) {
            fetchUser().then((r) => console.log(r));
        }
    }, [user]);
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
                    {openPopUp && <PopUp handlePopUp={handlePopUp} />}
                    <NavBar handlePopUp={handlePopUp} userInfo={userInfo} />
                    <main className={classes.main}>{children}</main>
                </div>
            </AuthGuard>
        </>
    );
}
