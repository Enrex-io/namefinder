import React, { ReactNode } from 'react';
import classes from './PopUp.module.scss';
import Image from 'next/image';
import Button from '../Button/Button';
import clsx from 'clsx';
import { Property } from 'csstype';
import TextAlign = Property.TextAlign;

interface IPopUp {
    handlePopUp: () => void;
    title: string;
    mainActionTitle: string;
    content: string;
    image: string;
    children?: ReactNode;
    imageAlt?: string;
    buttonColor?: 'primary' | 'secondary';
    width?: number;
    align?: TextAlign;
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
    width,
    align,
}) => {
    console.log(content);
    return (
        <div className={classes.wrapper}>
            <div
                className={classes.container}
                style={{
                    maxWidth: `${width}px`,
                    top: width ? '15%' : 'inherit',
                    textAlign: align || 'center',
                }}
            >
                <Image
                    src={image}
                    alt={imageAlt || 'popup icon'}
                    width={130}
                    height={130}
                />
                <h5
                    className={classes.title}
                    style={{
                        textAlign: align || 'center',
                    }}
                >
                    {title}
                </h5>
                {children ? children : null}
                {content && <p className={classes.content}>{content}</p>}
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
