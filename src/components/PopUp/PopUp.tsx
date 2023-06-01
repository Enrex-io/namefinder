import React from 'react';
import classes from './PopUp.module.scss';
import Button from '@/components/Button/Button';
import Image from 'next/image';

interface IPopUp {
    handlePopUp: () => void;
}

const PopUp: React.FC<IPopUp> = ({ handlePopUp }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <Image
                    src={'/images/mail.png'}
                    alt={'Mail'}
                    width={130}
                    height={130}
                />
                <h5 className={classes.title}>
                    Thank you for your interest in Greenifs.ai!
                </h5>
                <p>
                    Stay tuned, as our subscription plans will be ready soon.
                    Thank you for your patience!
                </p>
                <Button className={classes.btn} onClick={() => handlePopUp()}>
                    Got it
                </Button>
            </div>
        </div>
    );
};

export default PopUp;
