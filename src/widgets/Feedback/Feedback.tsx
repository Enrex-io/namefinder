import { Field, Form } from 'react-final-form';
import Button from '@/components/Button/Button';
import classes from './Feedback.module.scss';
import TextField from '@/components/TextField/TextField';
import { validateEmail } from '@/utils/validators';
import { Feedback } from '@/types';
import CheckboxField from '@/components/CheckboxField/CheckboxField';

const FEEDBACK_HEADING = 'Enter your email for product updates';
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
                  name='email'
                  initialValue=''
                  validate={validateEmail}
                  render={({ input, meta }) => (
                    <TextField
                      label='Email'
                      hasAsterisk
                      placeholder='mail@example.com'
                      type='email'
                      isError={meta.touched && meta.error}
                      helperMessage={meta.touched && meta.error}
                      autoComplete='email'
                      inputMode='email'
                      {...input}
                    />
                  )}
                />
                {/* <div className={classes.tagsContainer}>
                  {SUSTAINABILITY_GOALS_REASONS_OPTIONS.map(
                    ({ label, value, initialChecked }) => {
                      return (
                        <Field
                          key={value}
                          name={value}
                          initialValue={initialChecked}
                          type='checkbox'
                          render={({ input }) => {
                            return (
                              <CheckboxField
                                key={input.name}
                                label={label}
                                name={input.name}
                                onChange={input.onChange}
                                value={input.value}
                                initialChecked={initialChecked}
                              />
                            );
                          }}
                        />
                      );
                    }
                  )}
                </div> */}
              </div>
              <Button
                className={classes.button}
                type='submit'
                isDisabled={!dirty || !!Object.keys(errors || {}).length}
                isSubmitting={submitting}
                funnyLoadingMessage
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
