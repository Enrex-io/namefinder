import { Field, Form } from "react-final-form";
import Button from "@/components/Button/Button";
import classes from "./Feedback.module.scss";
import TextField from "@/components/TextField/TextField";
import SelectField from "@/components/SelectField/SelectField";
import { SUSTAINABILITY_GOALS_REASONS_OPTIONS } from "@/consts/sustainabilityGoalsReasons";
import { validateEmail, validateReason } from "@/utils/validators";
import { Feedback } from "@/types";

const FEEDBACK_HEADING =
  "You are one step away. Drop in your email and the reason of wanting to try to generate the sustainability goals";
const BUTTON_TEXT = "Let's go";

interface Props {
  onSubmit?: (values: Feedback) => void;
}

const Feedback = ({ onSubmit }: Props) => {
  const handleSubmitForm = (values: Feedback) => {
    onSubmit?.(values);
  };

  return (
    <div className={classes.container}>
      <Form
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, dirty, errors }) => (
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
            </div>
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
  );
};

export default Feedback;
