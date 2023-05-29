import { PropsWithChildren } from 'react';
import classes from './Dialog.module.scss';

interface Props {}

const Dialog = ({ children }: PropsWithChildren<Props>) => {
    return <div className={classes.backdrop}>{children}</div>;
};

export default Dialog;
