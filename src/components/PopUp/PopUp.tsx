import React, { ReactNode } from 'react';
import classes from './PopUp.module.scss';
import Image from 'next/image';
import Button from '../Button/Button';

interface IPopUp {
    handlePopUp: () => void;
    title: string;
    mainActionTitle: string;
    content: string;
    image: string;
    children?: ReactNode;
    imageAlt?: string;
}

const PopUp: React.FC<IPopUp> = ({
    handlePopUp,
    title,
    mainActionTitle,
    content,
    image,
    imageAlt,
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
                <Button className={classes.btn} onClick={() => handlePopUp()}>
                    {mainActionTitle}
                </Button>
            </div>
        </div>
    );
};

export default PopUp;
