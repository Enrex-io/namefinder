import React, { FC } from 'react';
import PopUp from './PopUp';

interface IPopUp {
    handlePopUp: () => void;
}

const ComingSoonPopUp: FC<IPopUp> = ({ handlePopUp }) => {
    return (
        <PopUp
            handlePopUp={handlePopUp}
            okText="Got it"
            title="Thank you for your interest in Greenifs.ai!"
            image="/images/mail.png"
            imageAlt="Mail"
            content="Stay tuned, as our subscription plans will be ready soon. Thank you for your patience!"
        />
    );
};

export default ComingSoonPopUp;
