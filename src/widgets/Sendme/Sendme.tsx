import Button from "@/components/Button/Button";
import Stack from "@/components/Stack/Stack";
import sendGoals from "@/pages/api/sendGoals";
import { MailchimpService } from "@/services/Mailchimp.client";
import { Feedback, GoalDescription, ParsedCompanyDetails } from "@/types";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import classes from "./Sendme.module.scss";

const SENDME_BUTTON_TEXT = "Send me";

interface Props {
  descriptions: Array<GoalDescription>;
  setError: Dispatch<SetStateAction<string | null>>;
  companyDetailsRef: MutableRefObject<ParsedCompanyDetails | null>;
  feedback?: Feedback;
}

function Sendme({
  descriptions,
  setError,
  feedback,
  companyDetailsRef,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSendmeClick = async () => {
    if (!feedback?.email) {
      return setError("Email is not provided");
    }
    setIsSubmitting(true);
    await MailchimpService.sendGoals(feedback?.email);
    setIsSubmitting(false);
  }
  return (
      <Stack style={{ justifyContent: 'center'}}>
        <Button
          tabIndex={1}
          type="submit"
          className={classes.button}
          onClick={handleSendmeClick}
          // isDisabled={!dirty || !!Object.keys(errors || {}).length}
          isSubmitting={isSubmitting}
        >
          {SENDME_BUTTON_TEXT}
        </Button>
      </Stack>
    )
}

export default Sendme;
