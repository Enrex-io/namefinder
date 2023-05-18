import { useRef, useState } from 'react';
import Button from '../Button/Button';

interface Props {
  copyText: string;
}

const CopyButton = ({ copyText }: Props) => {
  const [isShownLoading, setIsShownLoading] = useState<boolean>(false);
  const currentTimeout = useRef<number>();

  return (
    <Button
      size='small'
      variant='outlined'
      onClick={() => {
        setIsShownLoading(true);
        navigator.clipboard.writeText(copyText);
        if (currentTimeout.current) window.clearTimeout(currentTimeout.current);
        currentTimeout.current = window.setTimeout(() => {
          setIsShownLoading(false);
        }, 1000);
      }}
    >
      {isShownLoading ? 'Copied' : 'Copy'}
    </Button>
  );
};

export default CopyButton;
