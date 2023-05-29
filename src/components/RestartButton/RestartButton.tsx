import React, { ComponentProps, useState } from 'react';
import clsx from 'clsx';
import { RestartIcon } from '@/assets/icons/RestartIcon';
import classes from './RestartButton.module.scss';

interface Props extends Omit<ComponentProps<'button'>, 'onClick'> {
    isDisabled?: boolean;
    onRestart?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void>;
}

const RestartButton = ({
    onRestart,
    className,
    isDisabled,
    ...props
}: Props) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const handleClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!onRestart || isProcessing) return;
        setIsProcessing(true);
        await onRestart(event);
        setIsProcessing(false);
    };

    return (
        <button
            onClick={handleClick}
            className={clsx(classes.restartButton, className, {
                [classes.disabled]: isDisabled,
                [classes.processing]: isProcessing,
            })}
            disabled={isDisabled}
            {...props}
        >
            <RestartIcon />
        </button>
    );
};

export default RestartButton;
