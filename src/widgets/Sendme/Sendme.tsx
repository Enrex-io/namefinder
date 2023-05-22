import Button from '@/components/Button/Button';
import Stack from '@/components/Stack/Stack';
import { MailchimpService } from '@/services/Mailchimp.client';
import { Feedback, Details } from '@/types';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import classes from './Sendme.module.scss';

const SENDME_BUTTON_TEXT = 'Send me';

interface Props {
  description: string;
  setError: Dispatch<SetStateAction<string | null>>;
  detailsRef: MutableRefObject<Details | null>;
  onClick: () => void;
  feedback?: Feedback;
}

function Sendme({
  description,
  setError,
  feedback,
  onClick,
  detailsRef,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const handleSendmeClick = async () => {
  //   if (!feedback?.email) {
  //     return setError('Email is not provided');
  //   }
  //   onClick();
  //   setIsSubmitting(true);
  //   await MailchimpService.sendDescription(feedback?.email, description);
  //   setIsSubmitting(false);
  // };
  return (
    <Stack style={{ justifyContent: 'center' }}>
      <Button
        tabIndex={1}
        type='submit'
        className={classes.button}
        // onClick={handleSendmeClick}
        isSubmitting={isSubmitting}
      >
        {SENDME_BUTTON_TEXT}
      </Button>
    </Stack>
  );
}

export default Sendme;
