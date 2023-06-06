import Head from 'next/head';
import { META } from '@/consts/meta';
import Sustainability from '@/containers/SustainabilityForm';
import classes from './index.module.scss';
import NavBar from '@/components/NavBar/NavBar';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import React, { useEffect, useState } from 'react';
import { IGreenWashingUser } from '@/types';
import useAuth from '@/hooks/useAuth';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';
import PopUp from '@/components/PopUp/PopUp';

function Home() {
    const [userInfo, setUserInfo] = useState<IGreenWashingUser | null>(null);
    const { user } = useAuth();
    const [openPopUp, setOpenPopUp] = useState<boolean>(false);

    const handlePopUp = () => {
        setOpenPopUp(!openPopUp);
    };

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
                console.log('Error while fetching user');
            }
        }

        if (user) {
            fetchUser();
        }
    }, [user]);

    return (
        <AuthGuard>
            <Head>
                <title>{META.title}</title>
                <link rel="icon" href={META.favicon} />
                <meta name="description" content={META.description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            {openPopUp && <PopUp handlePopUp={handlePopUp} />}
            <NavBar userInfo={userInfo} />
            <div className={classes.container}>
                <Sustainability
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    handlePopUp={handlePopUp}
                />
            </div>
        </AuthGuard>
    );
}

export default Home;
