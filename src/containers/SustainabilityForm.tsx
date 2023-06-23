import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import Paper from '@/components/Paper/Paper';
import { Details, IGreenWashingUser } from '@/types';
import { OpenAIApi } from '@/services/OpenAIService';
import Stack from '@/components/Stack/Stack';
import { getMediaCharByMedia } from '@/utils/helpers';
import WindowScrollControls from '@/components/WindowScrollControls/WindowScrollControls';
import StatusDisplay from '@/components/StatusDisplay/StatusDisplay';
import SustainabilityDescription from '@/widgets/SustainabilityDescriptions/SustainabilityDescriptions';
import Sustainability from '@/widgets/Sustainability/Sustainability';
import classes from './SustainabilityForm.module.scss';
import Reset from '@/widgets/Reset/Reset';
import MediaPost from '@/widgets/MediaPost/MediaPost';
import Medias from '@/consts/medias';
import Regions from '@/consts/region';
import useAuth from '@/hooks/useAuth';

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
    const detailsRef = useRef<Details | null>(null);
    const [post, setPost] = useState<string>('');
    const [disabled] = useState<boolean>(false);

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
    const handleResetClick = () => {
        setGeneratedDescription([]);
        setPost('');
    };

    return (
        <Paper spacing={1.25} direction="column" className={classes.container}>
            <Sustainability
                onSubmitDetails={async (details) => {
                    handleResetClick();
                    await handleSubmitDescription(details);
                }}
                valuesRef={detailsRef}
                disabled={disabled}
                description={generatedDescription[0]}
                isCounterZero={(userInfo?.counter || 0) < 1}
            />
            <>
                <div id="descriptionsAnchor" className={classes.anchor} />
                {generatedDescription[0] && (
                    <SustainabilityDescription
                        descriptions={generatedDescription}
                    />
                )}
                {post && (
                    <MediaPost
                        media={detailsRef.current?.media || ''}
                        post={post}
                    />
                )}
                {post && <Reset onClick={handleResetClick} />}
            </>
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
        </Paper>
    );
};
export default SustainabilityForm;
