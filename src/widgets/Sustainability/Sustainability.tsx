import { Form, Field } from 'react-final-form';
import Button from '@/components/Button/Button';
import { Details } from '@/types';
import {
  validateDescription,
  validateMedia,
  validateRegion,
} from '@/utils/validators';
import Paper from '@/components/Paper/Paper';
import { MutableRefObject, useRef } from 'react';
import { getMediaCharByMedia, parseDetails } from '@/utils/helpers';
import classes from './Sustainability.module.scss';
import TextArea from '@/components/TextArea/TextArea';
import SelectField from '@/components/SelectField/SelectField';
import Medias, { MEDIAS_OPTIONS } from '@/consts/medias';
import { REGIONS_OPTIONS } from '@/consts/region';
import {FormApi} from "final-form";

const HEADING_TEXT = 'Sustainability Marketing Assistant';
const SUBMIT_BUTTON_TEXT = 'Analyze post';

interface Props {
  onSubmitDetails: (values: Details) => Promise<void>;
  valuesRef?: MutableRefObject<Record<string, any> | null>;
}

const Sustainability = ({
  onSubmitDetails,
  valuesRef
}: Props) => {
  const innerRef = useRef<Record<string, any> | null>(null);
  const ref = valuesRef || innerRef;
  const handleSubmit = async (values: Record<string, any>, form: FormApi) => {
    const result = parseDetails(values);
    await onSubmitDetails(result);
    form.reset(result)
  };

    return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Form
        onSubmit={(values, form) => handleSubmit(values, form)}
        render={({ handleSubmit, dirty, errors, submitting, values }) => {
          let countOfChars = 0;
          ref.current = parseDetails(values);
          const media = parseDetails(values).media;
          if(media) countOfChars = getMediaCharByMedia(media as Medias);
          return (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Paper className={classes.paper}>
                <div className={classes.fieldsContainer}>
                  <div className={classes.fieldsContainerFirst}>
                    <Field
                      name='media'
                      validate={validateMedia}
                      defaultValue={MEDIAS_OPTIONS[0].label}
                      render={({ input, meta }) => (
                        <SelectField
                          tabIndex={1}
                          hasAsterisk
                          label='Select social media platform'
                          options={MEDIAS_OPTIONS}
                          isError={meta.touched && meta.error}
                          helperMessage={meta.touched && meta.error}
                          {...input}
                        />
                      )}
                    />
                    <Field
                      name='region'
                      validate={validateRegion}
                      defaultValue={REGIONS_OPTIONS[0].label}
                      render={({ input, meta }) => (
                        <SelectField
                          tabIndex={1}
                          hasAsterisk
                          label='Select Region'
                          options={REGIONS_OPTIONS}
                          isError={meta.touched && meta.error}
                          helperMessage={meta.touched && meta.error}
                          {...input}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.fieldsContainerSecond}>
                    <Field
                      className={classes.fieldDescription}
                      name='description'
                      validate={(value) => {
                        return validateDescription(value, countOfChars);
                      }}
                      render={({ input, meta }) => (
                        <TextArea
                          tabIndex={1}
                          label='Insert your post here'
                          placeholder='Enter text here'
                          isError={meta.touched && meta.error}
                          helperMessage={meta.touched && meta.error}
                          maxLength={countOfChars}
                          {...input}
                        />
                      )}
                    />
                  </div>
                </div>
              </Paper>
                <Button
                  tabIndex={1}
                  type='submit'
                  className={classes.button}
                  isDisabled={!dirty || !!Object.keys(errors || {}).length}
                  isSubmitting={submitting}
                  funnyLoadingMessage
                >
                  {SUBMIT_BUTTON_TEXT}
                </Button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default Sustainability;
