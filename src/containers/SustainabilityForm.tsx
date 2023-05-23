import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Paper from '@/components/Paper/Paper';
import { Feedback as FeedbackType, Details } from '@/types';
import { OpenAIApi } from '@/services/OpenAIService';
import Stack from '@/components/Stack/Stack';
import { delay, getMediaCharByMedia } from '@/utils/helpers';
import WindowScrollControls from '@/components/WindowScrollControls/WindowScrollControls';
import StatusDisplay from '@/components/StatusDisplay/StatusDisplay';
import SustainabilityDescription from '@/widgets/SustainabilityDescriptions/SustainabilityDescriptions';
import Sustainability from '@/widgets/Sustainability/Sustainability';
import classes from './SustainabilityForm.module.scss';
import { useCookies } from 'react-cookie';
import { MailchimpService } from '@/services/Mailchimp.client';
import Feedback from '@/widgets/Feedback/Feedback';
import Reset from '@/widgets/Reset/Reset';
import MediaPost from '@/widgets/MediaPost/MediaPost';
import Medias from '@/consts/medias';

const scrollTo = (ref: MutableRefObject<any>) => {
  if (!ref.current) return;
  ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const SustainabilityForm = () => {
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const sendmeRef = useRef<HTMLDivElement | null>(null);
  const shareRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isGeneratingDescriptions, setIsGeneratingDescriptions] =
    useState<boolean>(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<FeedbackType>();
  const [hasSubmitteddescription, setHasSubmitteddescription] =
    useState<boolean>(false);
  const [isGenerateDescriptionsClicked, setIsGenerateDescriptionsClicked] =
    useState<boolean>(false);
  const [generatedDescription, setGeneratedDescription] = useState<
    string[] | []
  >([]);
  const [isSendmeClicked, setIsSendmeClicked] = useState<boolean>(false);
  const detailsRef = useRef<Details | null>(null);
  const hasSubmittedFeedback = Boolean(submittedFeedback);
  const [post, setPost] = useState<string>('');

  const [cookies, setCookie] = useCookies(['submitCount', 'email']);

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

    if (resDescription) setGeneratedDescription(resDescription);

    if (resPost) setPost(resPost);

    if (Number(cookies.submitCount) >= 2 && cookies.email) {
      const responseFeedback = await MailchimpService.updateMergeField(
        cookies.email,
        Number(cookies.submitCount)
      );
      if (responseFeedback?.error) return setError(responseFeedback.error);
    }

    return res;
  };

  const handleSubmitFeedback = async (feedback: FeedbackType) => {
    let d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 1000);
    setCookie('email', feedback.email, { path: '/', expires: d });
    const responseFeedback = await MailchimpService.addSubscriber(
      feedback.email,
      Number(cookies.submitCount)
    );
    if (!detailsRef.current) return;

    const result = await handleSubmitDescription(detailsRef.current);
    if (responseFeedback?.error) return setError(responseFeedback.error);
    if (result) {
      setIsGeneratingDescriptions(false);
      setSubmittedFeedback(feedback);
    }
  };

  const handleAddCookies = () => {
    let d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 1000);
    if (!cookies.submitCount) {
      setCookie('submitCount', 1, { path: '/', expires: d });
      return;
    }

    setCookie('submitCount', Number(cookies.submitCount) + 1 || 1, {
      path: '/',
      expires: d,
    });
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
          if (Number(cookies.submitCount) === 2) {
            setIsGeneratingDescriptions(true);
            return;
          } else {
            await handleSubmitDescription(details);
          }
        }}
        isHiddenButton={
          (isGeneratingDescriptions &&
            Number(cookies.submitCount) === 2 &&
            !hasSubmitteddescription) ||
          hasSubmitteddescription
        }
        valuesRef={detailsRef}
        handleAddCookies={handleAddCookies}
      />
      <>
        <div ref={feedbackRef} id='feedbackAnchor' className={classes.anchor} />
        {isGeneratingDescriptions && Number(cookies.submitCount) === 2 && (
          <Feedback onSubmit={handleSubmitFeedback} />
        )}
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
