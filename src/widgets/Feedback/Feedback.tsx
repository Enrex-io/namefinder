import { Field, Form } from "react-final-form";
import Button from "@/components/Button/Button";
import classes from "./Feedback.module.scss";
import TextField from "@/components/TextField/TextField";
import MultipleSelectField from "@/components/MultipleSelectField/MultipleSelectField";
import { SUSTAINABILITY_GOALS_REASONS_OPTIONS } from "@/consts/sustainabilityGoalsReasons";
import { validateEmail, validateReason } from "@/utils/validators";
import { Feedback } from "@/types";

const FEEDBACK_HEADING =
  "You're almost there. Enter your email address below to receive your personalised sustainability goals and updates on sustainability-related events.";
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
        render={({ handleSubmit, dirty, errors, submitting }) => {
          return (
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
                      hasAsterisk
                      placeholder="mail@example.com"
                      type="email"
                      isError={meta.touched && meta.error}
                      helperMessage={meta.touched && meta.error}
                      autoComplete="email"
                      inputMode="email"
                      {...input} />
                  )} />
                {"Please indicate your level of interest."}
                {SUSTAINABILITY_GOALS_REASONS_OPTIONS.map(({ label, value }) => {
                  return (<Field
                    key={value}
                    name={value}
                    initialValue={true}
                    type="checkbox"
                    // validate={validateReason}
                    render={({ input, meta }) => {
                      return (
                        <label>
                          <input
                            type="checkbox"
                            id={input.name}
                            checked={input.value}
                            onChange={input.onChange}
                            defaultChecked={true}
                            />
                          {label}
                        </label>
                      );
                    } } />);
                })}
              </div>
              <Button
                className={classes.button}
                type="submit"
                isDisabled={!dirty || !!Object.keys(errors || {}).length}
                isSubmitting={submitting}
              >
                {BUTTON_TEXT}
              </Button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default Feedback;
