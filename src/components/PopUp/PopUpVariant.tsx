import React, { FC } from 'react';
import PopUp from './PopUp';
import { PopupVariant } from '@/types';
import { FREE_CHECKS } from '@/consts/variables';
import { Property } from 'csstype';
import TextAlign = Property.TextAlign;

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
    width?: number;
    align?: TextAlign;
    children?: React.ReactNode;
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
    [PopupVariant.WELCOME]: {
        title: 'Welcome to the Sustainability Marketing Assistant App!🌿',
        image: '/images/worldMail.png',
        mainActionTitle: `Let's start`,
        imageAlt: 'Logo',
        buttonColor: 'secondary',
        content: '',
        width: 650,
        align: 'left',
        children: (
            <>
                <p
                    style={{
                        textAlign: 'left',
                    }}
                >
                    Were thrilled to have you on board as we work together to
                    combat greenwashing and promote genuine eco-friendly
                    practices. As a first-time user, you have {FREE_CHECKS}
                    FREE post checks to help you identify any potential flaws in
                    your social media content related to greenwashing.
                </p>
                <p>
                    Lets make a positive impact on our planet by ensuring our
                    marketing efforts are truly sustainable and transparent.
                    Together, we can create a greener future! 🌱
                </p>
                <p
                    style={{
                        width: '100%',
                    }}
                >
                    Happy analyzing! 🌎💚
                </p>
            </>
        ),
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
            width={popUpVariantSettings[variant].width}
            align={popUpVariantSettings[variant].align}
        >
            {popUpVariantSettings[variant].children}
        </PopUp>
    );
};

export default PopUpVariant;
