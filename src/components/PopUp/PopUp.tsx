import React, { ReactNode } from 'react';
import classes from './PopUp.module.scss';
import Image from 'next/image';
import Button from '../Button/Button';
import clsx from 'clsx';

interface IPopUp {
    handlePopUp: () => void;
    title: string;
    mainActionTitle: string;
    content: string;
    image: string;
    children?: ReactNode;
    imageAlt?: string;
    buttonColor?: 'primary' | 'secondary';
}

const PopUp: React.FC<IPopUp> = ({
    handlePopUp,
    title,
    mainActionTitle,
    content,
    image,
    imageAlt,
    buttonColor = 'primary',
    children,
}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <Image
                    src={image}
                    alt={imageAlt || 'popup icon'}
                    width={130}
                    height={130}
                />
                <h5 className={classes.title}>{title}</h5>
                <p>{content}</p>
                {children ? children : null}
                <Button
                    className={clsx(classes.btn, {
                        [classes.btnPrimary]: buttonColor === 'primary',
                        [classes.btnSecondary]: buttonColor === 'secondary',
                    })}
                    onClick={() => handlePopUp()}
                >
                    {mainActionTitle}
                </Button>
            </div>
        </div>
    );
};

export default PopUp;
