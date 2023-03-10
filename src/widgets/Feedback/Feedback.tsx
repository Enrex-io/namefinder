import { Field, Form } from "react-final-form";
import Button from "@/components/Button/Button";
import classes from "./Feedback.module.scss";
import TextField from "@/components/TextField/TextField";
import SelectField from "@/components/SelectField/SelectField";
import { SUSTAINABILITY_GOALS_REASONS_OPTIONS } from "@/consts/sustainabilityGoalsReasons";
import { validateEmail, validateReason } from "@/utils/validators";
import { Feedback } from "@/types";

const FEEDBACK_HEADING =
  "We will also send your goals and their descriptions to your email after each goal description generation";
const BUTTON_TEXT = "Let's go";

interface Props {
  onSubmit?: (values: Feedback) => Promise<void>;
}

const Feedback = ({ onSubmit }: Props) => {
  const handleSubmitForm = async (values: Feedback) => {
    await onSubmit?.(values);
  };

  return (
    <div className={classes.container}>
      <Form
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, dirty, errors, submitting }) => (
          <form onSubmit={handleSubmit} className={classes.wrapper}>
            <h2 className={classes.heading}>{FEEDBACK_HEADING}</h2>
            <div className={classes.fieldsContainer}>
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
                    inputMode="email"
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
                    inputMode="none"
                    {...input}
                  />
                )}
              />
            </div>
            <Button
              type="submit"
              isDisabled={!dirty || !!Object.keys(errors || {}).length}
              isSubmitting={submitting}
            >
              {BUTTON_TEXT}
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default Feedback;
