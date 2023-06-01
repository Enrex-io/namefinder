import { useRef, useState } from 'react';
import Button from '../Button/Button';
import Image from 'next/image';
import classes from './CopyButton.module.scss';

interface Props {
    copyText: string;
}

const CopyButton = ({ copyText }: Props) => {
    const [isShownLoading, setIsShownLoading] = useState<boolean>(false);
    const currentTimeout = useRef<number>();

    return (
        <Button
            size="small"
            variant="outlined"
            className={classes.btn}
            onClick={() => {
                setIsShownLoading(true);
                navigator.clipboard.writeText(copyText);
                if (currentTimeout.current)
                    window.clearTimeout(currentTimeout.current);
                currentTimeout.current = window.setTimeout(() => {
                    setIsShownLoading(false);
                }, 1000);
            }}
        >
            <Image src={'/svg/copy.svg'} alt={'Copy'} width={18} height={18} />
            <span>{isShownLoading ? 'Copied' : 'Copy'}</span>
        </Button>
    );
};

export default CopyButton;
