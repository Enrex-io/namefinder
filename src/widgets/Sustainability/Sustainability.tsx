import { Form, Field } from 'react-final-form';
import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { Description } from '@/types';
import { validateDescription } from '@/utils/validators';
import Paper from '@/components/Paper/Paper';
import { MutableRefObject, useRef } from 'react';
import { parsedescription } from '@/utils/helpers';
import { useCookies } from 'react-cookie';
import classes from './Sustainability.module.scss';
import TextArea from '@/components/TextArea/TextArea';

const HEADING_TEXT = 'Sustainability Marketing Assistant';
const SUBMIT_BUTTON_TEXT = 'Check For GreenWashing';

interface Props {
  onSubmitDescription: (description: Description) => Promise<void>;
  isHiddenButton?: boolean;
  valuesRef?: MutableRefObject<Record<string, any> | null>;
  handleAddCookies: () => void;
}

const Sustainability = ({
  onSubmitDescription,
  isHiddenButton = false,
  valuesRef,
  handleAddCookies,
}: Props) => {
  const innerRef = useRef<Record<string, any> | null>(null);
  const ref = valuesRef || innerRef;

  const handleSubmit = async (values: Record<string, any>) => {
    const result = parsedescription(values);
    await onSubmitDescription(result);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, dirty, errors, submitting, values }) => {
          ref.current = parsedescription(values);
          return (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Paper className={classes.paper}>
                <div className={classes.fieldsContainer}>
                  <div className={classes.fieldsContainerSecond}>
                    <Field
                      className={classes.fieldDescription}
                      name='description'
                      validate={validateDescription}
                      render={({ input, meta }) => (
                        <TextArea
                          tabIndex={1}
                          label='Paste a text to check for green washing flaws.'
                          hasAsterisk
                          placeholder='Paste a text to check for green washing flaws.'
                          isError={meta.touched && meta.error}
                          helperMessage={meta.touched && meta.error}
                          {...input}
                        />
                      )}
                    />
                  </div>
                </div>
              </Paper>
              {!isHiddenButton && (
                <Button
                  tabIndex={1}
                  type='submit'
                  className={classes.button}
                  isDisabled={!dirty || !!Object.keys(errors || {}).length}
                  isSubmitting={submitting}
                  onClick={handleAddCookies}
                  funnyLoadingMessage
                >
                  {SUBMIT_BUTTON_TEXT}
                </Button>
              )}
            </form>
          );
        }}
      />
    </div>
  );
};

export default Sustainability;
