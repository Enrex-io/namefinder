import { MutableRefObject, useRef, useState } from 'react';
import Paper from '@/components/Paper/Paper';
import { Details } from '@/types';
import { OpenAIApi } from '@/services/OpenAIService';
import Stack from '@/components/Stack/Stack';
import { delay, getMediaCharByMedia } from '@/utils/helpers';
import WindowScrollControls from '@/components/WindowScrollControls/WindowScrollControls';
import StatusDisplay from '@/components/StatusDisplay/StatusDisplay';
import SustainabilityDescription from '@/widgets/SustainabilityDescriptions/SustainabilityDescriptions';
import Sustainability from '@/widgets/Sustainability/Sustainability';
import classes from './SustainabilityForm.module.scss';
import Reset from '@/widgets/Reset/Reset';
import MediaPost from '@/widgets/MediaPost/MediaPost';
import Medias from '@/consts/medias';
import {useAuth} from "@/hooks/useAuth";
import Regions from "@/consts/region";

const scrollTo = (ref: MutableRefObject<any>) => {
  if (!ref.current) return;
  ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const SustainabilityForm = () => {
  const { user } = useAuth();

  const sendmeRef = useRef<HTMLDivElement | null>(null);
  const shareRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isGeneratingDescriptions, setIsGeneratingDescriptions] =
    useState<boolean>(false);
  const [hasSubmitteddescription, setHasSubmitteddescription] =
    useState<boolean>(false);
  const [generatedDescription, setGeneratedDescription] = useState<
    string[] | []
  >([]);
  const [isSendmeClicked, setIsSendmeClicked] = useState<boolean>(false);
  const detailsRef = useRef<Details | null>(null);
  const [post, setPost] = useState<string>('');

  const handleSubmitDescription = async (details: Details) => {
    const chars = getMediaCharByMedia(details.media as Medias);
    const res = await OpenAIApi.getAssistedBySustainabilityMarketing(
      details,
      chars
    );
    const result: string = res.result || '';
    setError(null);
    setHasSubmitteddescription(true);
    if (res.error) return setError(res.error);

    const termsIndex = result?.indexOf('Terms');
    const postIndex = result?.indexOf('Correct');

    const resDescription = result?.slice(termsIndex + 8, postIndex).split('\n');

    const resPost: string = result?.slice(postIndex + 8);
    if (!user) return;
     const savePrompt = await OpenAIApi.savePrompt({
       userId: user.id,
       media: details.media as Medias,
       region: details.region as Regions,
       request: details.description,
       response: {
         terms: resDescription,
         correctText: resPost,
       }
     })

    if (resDescription) setGeneratedDescription(resDescription);

    if (resPost) setPost(resPost);

    return res;
  };

  // const handleGenerateDescriptions = async () => {
  //   if (!isGenerateDescriptionsClicked) {
  //     return setIsGenerateDescriptionsClicked(true);
  //   }
  //   setIsGeneratingDescriptions(true);
  //   if (!descriptionRef.current) return;
  //   const response = await OpenAIApi.getAssistedBySustainabilityMarketing(
  //     descriptionRef.current
  //   );
  //   if (response.error) {
  //     setIsGeneratingDescriptions(false);
  //     return setError(response.error);
  //   }
  //   setError(null);
  //   setGeneratedDescription(response.result);
  //   setIsGeneratingDescriptions(false);
  //   delay(() => scrollTo(feedbackRef), 500);
  // };

  const handleSendmeClick = () => {
    setIsSendmeClicked(true);
    delay(() => scrollTo(shareRef), 500);
  };

  const handleResetClick = () => {
    setGeneratedDescription([]);
    setPost('');
    setHasSubmitteddescription(false);
  };

  return (
    <Paper spacing={1.25} direction='column' className={classes.container}>
      <Sustainability
        onSubmitDetails={async (details) => {
          await handleSubmitDescription(details);
        }}
        isHiddenButton={
          (isGeneratingDescriptions && !hasSubmitteddescription) 
          || hasSubmitteddescription
        }
        valuesRef={detailsRef}
      />
      <>
        <div
          id='descriptionsAnchor'
          className={classes.anchor}
        />
        {generatedDescription[0] && (
          <SustainabilityDescription
            descriptions={generatedDescription}
          />
        )}
        {post && (
          <MediaPost media={detailsRef.current?.media || ''} post={post} />
        )}
        {post && <Reset onClick={handleResetClick} />}
      </>
      {error && (
        <Stack
          className={classes.errorContainer}
          alignItems='center'
          justifyContent='center'
        >
          <StatusDisplay
            message={error}
            severity='warning'
            onReset={() => setError(null)}
          />
        </Stack>
      )}
      <WindowScrollControls />
    </Paper>
  );
};

export default SustainabilityForm;
