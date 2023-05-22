import { Form, Field } from 'react-final-form';
import Button from '@/components/Button/Button';
import { Details } from '@/types';
import {
  validateDescription,
  validateMedia,
  validateRegion,
} from '@/utils/validators';
import Paper from '@/components/Paper/Paper';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { getMediaCharByMedia, parseDetails } from '@/utils/helpers';
import classes from './Sustainability.module.scss';
import TextArea from '@/components/TextArea/TextArea';
import SelectField from '@/components/SelectField/SelectField';
import Medias, { MEDIAS_OPTIONS } from '@/consts/medias';
import Regions, { REGIONS_OPTIONS } from '@/consts/region';

const HEADING_TEXT = 'Sustainability Marketing Assistant';
const SUBMIT_BUTTON_TEXT = 'Analyze post';

interface Props {
  onSubmitDetails: (values: Details) => Promise<void>;
  isHiddenButton?: boolean;
  valuesRef?: MutableRefObject<Record<string, any> | null>;
  handleAddCookies: () => void;
}

const Sustainability = ({
  onSubmitDetails,
  isHiddenButton = false,
  valuesRef,
  handleAddCookies,
}: Props) => {
  const innerRef = useRef<Record<string, any> | null>(null);
  const ref = valuesRef || innerRef;

  const handleSubmit = async (values: Record<string, any>) => {
    const result = parseDetails(values);
    await onSubmitDetails(result);
  };

  const [countOfChars, setCountOfChars] = useState<number>(280);

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, dirty, errors, submitting, values }) => {
          ref.current = parseDetails(values);
          const media = parseDetails(values).media;
          setCountOfChars(getMediaCharByMedia(media as Medias) | 280);
          return (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Paper className={classes.paper}>
                <div className={classes.fieldsContainer}>
                  <div className={classes.fieldsContainerFirst}>
                    <Field
                      name='media'
                      validate={validateMedia}
                      render={({ input, meta }) => (
                        <SelectField
                          tabIndex={1}
                          hasAsterisk
                          label='Select social media platform'
                          options={MEDIAS_OPTIONS}
                          placeholder={Medias.Facebook}
                          isError={meta.touched && meta.error}
                          helperMessage={meta.touched && meta.error}
                          {...input}
                        />
                      )}
                    />
                    <Field
                      name='region'
                      validate={validateRegion}
                      render={({ input, meta }) => (
                        <SelectField
                          tabIndex={1}
                          hasAsterisk
                          label='Select Region'
                          options={REGIONS_OPTIONS}
                          placeholder={Regions.EU}
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
