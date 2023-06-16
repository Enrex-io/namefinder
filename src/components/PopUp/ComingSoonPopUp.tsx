import React, { FC } from 'react';
import PopUp from './PopUp';
import { usePopup } from '@/contexts/PopupContext';
import { PopupVariant } from '@/types';

interface IPopUp {}

const ComingSoonPopUp: FC<IPopUp> = () => {
    const { variant, setPopup, hidePopup } = usePopup();
    const handlePopUp = () => {
        if (variant) {
            console.log('hidePopup');
            hidePopup();
            return;
        }
        setPopup(PopupVariant.THANK_YOU);
    };

    return (
        <PopUp
            handlePopUp={handlePopUp}
            mainActionTitle="Got it"
            title="Thank you for your interest in Greenifs.ai!"
            image="/images/mail.png"
            imageAlt="Mail"
            content="Stay tuned, as our subscription plans will be ready soon. Thank you for your patience!"
        />
    );
};

export default ComingSoonPopUp;
