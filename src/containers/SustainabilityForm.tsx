import React, { Dispatch, SetStateAction, useState } from 'react';
import Paper from '@/components/Paper/Paper';
import { Details, IGreenWashingUser, PopupVariant } from '@/types';
import { OpenAIApi } from '@/services/OpenAIService';
import Stack from '@/components/Stack/Stack';
import { getMediaCharByMedia, parseDetails } from '@/utils/helpers';
import WindowScrollControls from '@/components/WindowScrollControls/WindowScrollControls';
import StatusDisplay from '@/components/StatusDisplay/StatusDisplay';
import SustainabilityDescription from '@/widgets/SustainabilityDescriptions/SustainabilityDescriptions';
import classes from './SustainabilityForm.module.scss';
import Reset from '@/widgets/Reset/Reset';
import MediaPost from '@/widgets/MediaPost/MediaPost';
import Medias, { MEDIAS_OPTIONS } from '@/consts/medias';
import Regions, { REGIONS_OPTIONS } from '@/consts/region';
import useAuth from '@/hooks/useAuth';
import { Field, Form } from 'react-final-form';
import SelectField from '@/components/SelectField/SelectField';
import TextArea from '@/components/TextArea/TextArea';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { usePopup } from '@/contexts/PopupContext';
import {
    validateDescription,
    validateMedia,
    validateRegion,
} from '@/utils/validators';
import { FormApi } from 'final-form';

interface SustainabilityFormProps {
    userInfo: IGreenWashingUser | null;
    setUserInfo: Dispatch<SetStateAction<IGreenWashingUser | null>>;
}

const SustainabilityForm: React.FC<SustainabilityFormProps> = ({
    setUserInfo,
    userInfo,
}) => {
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [generatedDescription, setGeneratedDescription] = useState<
        string[] | []
    >([]);
    const [post, setPost] = useState<string>('');
    const [disabled] = useState<boolean>(false);
    const { setPopup } = usePopup();

    const handleSubmitDescription = async (details: Details) => {
        const resp = (await OpenAIApi.checkRelevanceOfText(
            details.description
        )) as { answer: boolean };

        if (!resp.answer) {
            return setError(
                'Please provide more relevant text and please try once again'
            );
        }

        const chars = getMediaCharByMedia(details.media as Medias);
        const res = await OpenAIApi.getAssistedBySustainabilityMarketing(
            details,
            chars
        );
        const data = res.result?.text || '';

        const userData = res.result?.userData;
        if (userData) {
            setUserInfo(userData);
        }

        setError(null);
        if (res.error) return setError(res.error);

        const summaryIndex: number = data?.indexOf('Summary:');
        const colonSummaryIndex: number = data.indexOf('\n', summaryIndex);

        const termsIndex: number = data?.indexOf('Terms:');
        const colonTermsIndex: number = data.indexOf('\n', termsIndex);

        const postIndex: number = data?.indexOf('Correct:');
        const quotePostIndex: number = data.indexOf(`\n`, postIndex);

        const summary: string = data.slice(colonSummaryIndex, termsIndex);
        const terms: string[] = data
            .slice(colonTermsIndex, postIndex)
            .split('\n+++++');

        const post: string = data?.slice(quotePostIndex);

        const descriptions: string[] = [summary, ...terms].filter(
            (description: string) => !!description.trim()
        );

        if (!user) return;

        setGeneratedDescription(descriptions);
        setPost(post);

        await OpenAIApi.savePrompt({
            userId: user.id,
            media: details.media as Medias,
            region: details.region as Regions,
            request: details.description,
            unparsedResponse: data,
            response: {
                terms: descriptions,
                correctText: post,
            },
        });

        return res;
    };
    const handleResetClick = (form: FormApi, values: Details) => {
        setGeneratedDescription([]);
        setPost('');
        form.reset({ ...values, description: '' });
    };

    const HEADING_TEXT: string = 'Fill information';
    const SUBMIT_BUTTON_TEXT: string = 'Check post';

    const countChars = (values: any) => {
        let countOfChars = 0;
        const media = parseDetails(values).media;
        if (media) countOfChars = getMediaCharByMedia(media as Medias);
        return countOfChars;
    };

    const handleSubmit = async (
        values: Record<string, any>,
        form: FormApi
    ): Promise<void> => {
        if ((userInfo?.counter || 0) < 1) {
            setPopup(PopupVariant.ZERO_CREDITS);
            return;
        }
        const result: Details = parseDetails(values);
        await handleSubmitDescription(result);
        form.reset(result);
    };

    const handleDirtyForm = () => {
        setGeneratedDescription([]);
        setPost('');
    };

    return (
        <Paper spacing={1.25} direction="column" className={classes.container}>
            <div className={classes.sustainabilityContainer}>
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
                        form,
                        handleSubmit,
                        dirty,
                        errors,
                        submitting,
                        values,
                    }) => {
                        return (
                            <form
                                onSubmit={handleSubmit}
                                onChange={() => {
                                    if (
                                        dirty &&
                                        generatedDescription[0] &&
                                        post
                                    )
                                        handleDirtyForm();
                                }}
                                className={classes.form}
                            >
                                <Paper className={classes.paper}>
                                    <div className={classes.fieldsContainer}>
                                        <h2 className={classes.heading}>
                                            {HEADING_TEXT}
                                        </h2>
                                        <div
                                            className={
                                                classes.fieldsContainerFirst
                                            }
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
                                                        options={
                                                            REGIONS_OPTIONS
                                                        }
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
                                                className={
                                                    classes.fieldDescription
                                                }
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
                                {!generatedDescription?.[0] && (
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
                                <div
                                    id="descriptionsAnchor"
                                    className={classes.anchor}
                                />
                                {generatedDescription[0] && (
                                    <SustainabilityDescription
                                        descriptions={generatedDescription}
                                    />
                                )}
                                {post && (
                                    <MediaPost
                                        media={values.media}
                                        post={post}
                                    />
                                )}
                                {post && (
                                    <Reset
                                        onClick={() =>
                                            handleResetClick(
                                                form,
                                                values as Details
                                            )
                                        }
                                    />
                                )}
                                {error && (
                                    <Stack
                                        className={classes.errorContainer}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <StatusDisplay
                                            message={error}
                                            severity="warning"
                                            onReset={() => setError(null)}
                                        />
                                    </Stack>
                                )}
                                <WindowScrollControls />
                            </form>
                        );
                    }}
                />
            </div>
        </Paper>
    );
};
export default SustainabilityForm;
