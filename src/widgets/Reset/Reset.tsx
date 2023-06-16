import Button from '@/components/Button/Button';
import Stack from '@/components/Stack/Stack';
import { useState } from 'react';
import classes from './Reset.module.scss';

const RESET_BUTTON_TEXT = 'Start over';

interface Props {
    onClick: () => void;
}

function Sendme({ onClick }: Props) {
    const [isSubmitting] = useState<boolean>(false);
    const handleSendmeClick = async () => {
        onClick();
    };
    return (
        <Stack style={{ justifyContent: 'center' }}>
            <Button
                tabIndex={1}
                type="submit"
                className={classes.button}
                onClick={handleSendmeClick}
                isSubmitting={isSubmitting}
            >
                {RESET_BUTTON_TEXT}
            </Button>
        </Stack>
    );
}

export default Sendme;
