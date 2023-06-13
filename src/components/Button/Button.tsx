import { ComponentProps, PropsWithChildren } from 'react';
import clsx from 'clsx';
import classes from './Button.module.scss';
import Loader from '../Loader/Loader';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

interface Props extends Omit<ComponentProps<'button'>, 'disabled'> {
    isDisabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'contained' | 'outlined';
    isSubmitting?: boolean;
    onClick?: () => void;
    funnyLoadingMessage?: boolean;
}

const Button = ({
    children,
    className,
    isDisabled,
    size = 'medium',
    variant = 'contained',
    isSubmitting,
    funnyLoadingMessage,
    onClick,
    ...rest
}: PropsWithChildren<Props>) => {
    const computed = clsx(
        classes.button,
        classes[variant],
        classes[size],
        {
            [classes.disabled]: isDisabled,
            [classes.submitting]: isSubmitting,
        },
        className
    );

    return (
        <>
            <button
                disabled={isDisabled}
                className={computed}
                {...rest}
                onClick={onClick}
                onTouchStart={onClick}
                onTouchStartCapture={onClick}
                onTouchEnd={onClick}
            >
                {isSubmitting ? <Loader height={21} /> : children}
            </button>
            {funnyLoadingMessage && isSubmitting && <LoadingMessage />}
        </>
    );
};

export default Button;
