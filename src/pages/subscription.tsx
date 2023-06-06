import React, { useEffect, useState } from 'react';
import { IGreenWashingUser } from '@/types';
import classes from './subscription.module.scss';
import useAuth from '@/hooks/useAuth';
import NavBar from '@/components/NavBar/NavBar';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';
import Head from 'next/head';
import { META } from '@/consts/meta';
import PopUp from '@/components/PopUp/PopUp';
import Script from 'next/script';
import Stack from '@/components/Stack/Stack';
import AuthGuard from '@/utils/route-guard/AuthGuard';

const HEADING_TEXT = 'Subscription';
const STRIPE_PRICING_TABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;
const STRIPE_PUBLISHABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_ID;

export default function Subscription() {
    const [userInfo, setUserInfo] = useState<IGreenWashingUser | null>(null);
    const { user } = useAuth();
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
            <Script
                strategy="afterInteractive"
                src="https://js.stripe.com/v3/pricing-table.js"
            />
            {openPopUp && <PopUp handlePopUp={handlePopUp} />}
            <NavBar userInfo={userInfo} />
            <Stack
                className={classes.container}
                spacing={1.25}
                direction="column"
            >
                <h2 className={classes.heading}>{HEADING_TEXT}</h2>
                <div
                    dangerouslySetInnerHTML={{
                        __html: `<stripe-pricing-table pricing-table-id=${STRIPE_PRICING_TABLE_ID} publishable-key="${STRIPE_PUBLISHABLE_ID}"></stripe-pricing-table>`,
                    }}
                ></div>
            </Stack>
        </AuthGuard>
    );
}
