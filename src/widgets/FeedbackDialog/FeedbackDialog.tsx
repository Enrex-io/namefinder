// import ClickAwayListener from "react-click-away-listener";
import { Field, Form } from "react-final-form";
import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import classes from "./FeedbackDialog.module.scss";
import TextField from "@/components/TextField/TextField";
import SelectField from "@/components/SelectField/SelectField";
import { SUSTAINABILITY_GOALS_REASONS_OPTIONS } from "@/consts/sustainabilityGoalsReasons";
import { validateEmail, validateReason } from "@/utils/validators";
import { Feedback } from "@/types";

const FEEDBACK_DIALOG_HEADING =
  "You are one step away. Drop in your email and the reason of wanting to try to generate the sustainability goals";
const BUTTON_TEXT = "Let's go";

interface Props {
  onSubmit?: (values: Feedback) => void;
  onClose?: () => void;
}

const FeedbackDialog = ({ onSubmit, onClose }: Props) => {
  const handleSubmitForm = (values: Feedback) => {
    onSubmit?.(values);
  };

  return (
    <Dialog>
      {/* <ClickAwayListener onClickAway={() => onClose?.()}> */}
      <div className={classes.container}>
        <Form
          onSubmit={handleSubmitForm}
          render={({ handleSubmit, dirty, errors }) => (
            <form onSubmit={handleSubmit} className={classes.wrapper}>
              <h2 className={classes.heading}>{FEEDBACK_DIALOG_HEADING}</h2>
              <Field
                name="email"
                initialValue=""
                validate={validateEmail}
                render={({ input, meta }) => (
                  <TextField
                    label="Email"
                    placeholder="mail@example.com"
                    type="email"
                    isError={meta.touched && meta.error}
                    helperMessage={meta.touched && meta.error}
                    autoComplete="email"
                    {...input}
                  />
                )}
              />
              <Field
                name="reason"
                initialValue=""
                validate={validateReason}
                render={({ input, meta }) => (
                  <SelectField
                    label="Reason you want to try GreenGoalsAI"
                    placeholder="I want to try it out"
                    options={SUSTAINABILITY_GOALS_REASONS_OPTIONS}
                    isError={meta.touched && meta.error}
                    helperMessage={meta.touched && meta.error}
                    {...input}
                  />
                )}
              />
              <Button
                type="submit"
                isDisabled={!dirty || !!Object.keys(errors || {}).length}
              >
                {BUTTON_TEXT}
              </Button>
            </form>
          )}
        />
      </div>
      {/* </ClickAwayListener> */}
    </Dialog>
  );
};

export default FeedbackDialog;
