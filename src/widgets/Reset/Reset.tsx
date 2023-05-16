import Button from '@/components/Button/Button';
import Stack from '@/components/Stack/Stack';
import { MailchimpService } from '@/services/Mailchimp.client';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import classes from './Reset.module.scss';

const RESET_BUTTON_TEXT = 'Reset';

interface Props {
  // setError: Dispatch<SetStateAction<string | null>>;
  // descriptionRef: MutableRefObject<Description | null>;
  onClick: () => void;
  // feedback?: Feedback;
}

function Sendme({
  // setError,
  // feedback,
  onClick,
}: // descriptionRef,
Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSendmeClick = async () => {
    onClick();
  };
  return (
    <Stack style={{ justifyContent: 'center' }}>
      <Button
        tabIndex={1}
        type='submit'
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
