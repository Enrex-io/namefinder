import { CloseIcon } from '@/assets/icons/CloseIcon';
import clsx from 'clsx';
import { ComponentProps } from 'react';
import Stack from '../Stack/Stack';
import classes from './StatusDisplay.module.scss';

interface Props extends Omit<ComponentProps<typeof Stack>, 'onClick'> {
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
    onReset?: () => void;
}

const StatusDisplay = ({ message, severity, onReset, ...props }: Props) => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            className={clsx(classes.display, [classes[severity]])}
            spacing={0.5}
            onClick={onReset}
            {...props}
        >
            {message}
            <CloseIcon />
        </Stack>
    );
};

export default StatusDisplay;
