import { Field, Form } from 'react-final-form';
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
import { FormApi } from 'final-form';
import Image from 'next/image';

const HEADING_TEXT = 'Fill information';
const SUBMIT_BUTTON_TEXT = 'Check post';

interface Props {
    onSubmitDetails: (values: Details) => Promise<void>;
    valuesRef?: MutableRefObject<Record<string, any> | null>;
    disabled: boolean;
    description: string;
}

const Sustainability = ({
    onSubmitDetails,
    valuesRef,
    disabled,
    description,
}: Props) => {
    const innerRef = useRef<Record<string, any> | null>(null);
    const ref = valuesRef || innerRef;
    const handleSubmit = async (values: Record<string, any>, form: FormApi) => {
        const result = parseDetails(values);
        await onSubmitDetails(result);
        form.reset(result);
    };

    const countChars = (values: any) => {
        let countOfChars = 0;
        const media = parseDetails(values).media;
        if (media) countOfChars = getMediaCharByMedia(media as Medias);
        return countOfChars;
    };

    return (
        <div className={classes.container}>
            <Form
                validate={(values) => {
                    return {
                        media: validateMedia(values.media),
                        region: validateRegion(values.region),
                        description: validateDescription(
                            values.description,
                            countChars(values)
                        ),
                    };
                }}
                onSubmit={(values, form) => handleSubmit(values, form)}
                render={({
                    handleSubmit,
                    dirty,
                    errors,
                    submitting,
                    values,
                }) => {
                    ref.current = parseDetails(values);
                    return (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Paper className={classes.paper}>
                                <div className={classes.fieldsContainer}>
                                    <h2 className={classes.heading}>
                                        {HEADING_TEXT}
                                    </h2>
                                    <div
                                        className={classes.fieldsContainerFirst}
                                    >
                                        <Field
                                            name="media"
                                            defaultValue={
                                                MEDIAS_OPTIONS[2].label
                                            }
                                            render={({ input, meta }) => (
                                                <SelectField
                                                    tabIndex={1}
                                                    hasAsterisk
                                                    label="Select social media platform"
                                                    options={MEDIAS_OPTIONS}
                                                    disabled={disabled}
                                                    isError={
                                                        meta.touched &&
                                                        meta.error
                                                    }
                                                    helperMessage={
                                                        meta.touched &&
                                                        meta.error
                                                    }
                                                    {...input}
                                                />
                                            )}
                                        />
                                        <Field
                                            name="region"
                                            defaultValue={
                                                REGIONS_OPTIONS[0].label
                                            }
                                            render={({ input, meta }) => (
                                                <SelectField
                                                    tabIndex={1}
                                                    hasAsterisk
                                                    label="Select Region"
                                                    options={REGIONS_OPTIONS}
                                                    disabled={disabled}
                                                    isError={
                                                        meta.touched &&
                                                        meta.error
                                                    }
                                                    helperMessage={
                                                        meta.touched &&
                                                        meta.error
                                                    }
                                                    {...input}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div
                                        className={
                                            classes.fieldsContainerSecond
                                        }
                                    >
                                        <Field
                                            className={classes.fieldDescription}
                                            name="description"
                                            render={({ input, meta }) => (
                                                <TextArea
                                                    tabIndex={1}
                                                    label="Insert your post here"
                                                    placeholder="Enter text here"
                                                    disabled={disabled}
                                                    isError={
                                                        meta.touched &&
                                                        meta.error
                                                    }
                                                    helperMessage={
                                                        meta.touched &&
                                                        meta.error
                                                    }
                                                    maxLength={countChars(
                                                        values
                                                    )}
                                                    {...input}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </Paper>
                            {!description?.[0] && (
                                <Button
                                    tabIndex={1}
                                    type="submit"
                                    className={classes.button}
                                    isDisabled={
                                        !dirty ||
                                        !!Object.keys(errors || {}).length
                                    }
                                    isSubmitting={submitting}
                                    funnyLoadingMessage
                                >
                                    <Image
                                        src={'/svg/check.svg'}
                                        alt={'Check'}
                                        width={18}
                                        height={18}
                                    />
                                    <span>{SUBMIT_BUTTON_TEXT}</span>
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
