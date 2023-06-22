import React, { FC } from 'react';
import PopUp from './PopUp';
import { PopupVariant } from '@/types';

interface IPopUpVariant {
    handlePopUp: () => void;
    variant: PopupVariant;
}

interface PopupSettings {
    title: string;
    mainActionTitle: string;
    content: string;
    image: string;
    imageAlt: string;
    buttonColor: 'primary' | 'secondary';
}

type PopupVariants = Record<PopupVariant, PopupSettings>;

const popUpVariantSettings: PopupVariants = {
    [PopupVariant.PAYMENT_FAILED]: {
        title: 'Subscription payment failed or missing',
        image: '/images/subscription-failed.png',
        mainActionTitle: 'Manage Payment',
        imageAlt: 'Subscription failed',
        buttonColor: 'secondary',
        content:
            'Please proceed by following the link if your subscription payment has not been received or was unsuccessful.',
    },
    [PopupVariant.ZERO_CREDITS]: {
        title: 'All subscription credits were used',
        image: '/images/subscription-credits-used.png',
        mainActionTitle: 'Upgrade Subscription',
        imageAlt: 'Subscription failed',
        buttonColor: 'secondary',
        content:
            'The subscriptions you have been enrolled in have come to an end. To upgrade your subscription plan follow the link.',
    },
    [PopupVariant.THANK_YOU]: {
        title: 'Thank you for your interest in Greenifs.ai!',
        image: '/images/mail.png',
        mainActionTitle: 'Got it',
        imageAlt: 'Mail',
        buttonColor: 'secondary',
        content:
            'Stay tuned, as our subscription plans will be ready soon. Thank you for your patience!',
    },
};

const PopUpVariant: FC<IPopUpVariant> = ({ handlePopUp, variant }) => {
    return (
        <PopUp
            handlePopUp={handlePopUp}
            mainActionTitle={popUpVariantSettings[variant].mainActionTitle}
            title={popUpVariantSettings[variant].title}
            image={popUpVariantSettings[variant].image}
            imageAlt={popUpVariantSettings[variant].imageAlt}
            content={popUpVariantSettings[variant].content}
            buttonColor={popUpVariantSettings[variant].buttonColor}
        />
    );
};

export default PopUpVariant;
