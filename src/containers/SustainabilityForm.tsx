import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Paper from '@/components/Paper/Paper';
import { Feedback as FeedbackType, Description } from '@/types';
import { OpenAIApi } from '@/services/OpenAIService';
import Stack from '@/components/Stack/Stack';
import { delay } from '@/utils/helpers';
import WindowScrollControls from '@/components/WindowScrollControls/WindowScrollControls';
import StatusDisplay from '@/components/StatusDisplay/StatusDisplay';
import SustainabilityDescription from '@/widgets/SustainabilityDescriptions/SustainabilityDescriptions';
import Sustainability from '@/widgets/Sustainability/Sustainability';
import classes from './SustainabilityForm.module.scss';
import { useCookies } from 'react-cookie';
import { MailchimpService } from '@/services/Mailchimp.client';
import Feedback from '@/widgets/Feedback/Feedback';
import Reset from '@/widgets/Reset/Reset';

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
  const [generatedDescription, setGeneratedDescription] = useState<string>();
  const [isSendmeClicked, setIsSendmeClicked] = useState<boolean>(false);
  const descriptionRef = useRef<Description | null>(null);
  const hasSubmittedFeedback = Boolean(submittedFeedback);

  const [cookies, setCookie] = useCookies(['submitCount', 'email']);

  const handleSubmitDescription = async (description: Description) => {
    const responseDescriptions =
      await OpenAIApi.getAssistedBySustainabilityMarketing(
        description.description
      );
    if (responseDescriptions.error) return setError(responseDescriptions.error);
    setError(null);
    setGeneratedDescription(responseDescriptions.result);
    setHasSubmitteddescription(true);
    // delay(() => scrollTo(descriptionRef), 500);

    if (Number(cookies.submitCount) >= 2 && cookies.email) {
      const responseFeedback = await MailchimpService.updateMergeField(
        cookies.email,
        Number(cookies.submitCount)
      );
      if (responseFeedback?.error) return setError(responseFeedback.error);
    }

    return responseDescriptions;
  };

  const handleSubmitFeedback = async (feedback: FeedbackType) => {
    let d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 1000);
    setCookie('email', feedback.email, { path: '/', expires: d });
    const responseFeedback = await MailchimpService.addSubscriber(
      feedback.email,
      Number(cookies.submitCount)
    );
    // const responseUpdateTags = await MailchimpService.updateTags(
    //   feedback.email,
    //   cookies.submitCount
    // );
    if (!descriptionRef.current) return;

    const result = await handleSubmitDescription(descriptionRef.current);
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
    setGeneratedDescription(undefined);
    setHasSubmitteddescription(false);
  };

  // useEffect(() => {
  //   if (!hasSubmittedFeedback && isGenerateDescriptionsClicked) {
  //     delay(() => scrollTo(feedbackRef), 500);
  //   }
  // }, [isGenerateDescriptionsClicked, hasSubmittedFeedback]);

  return (
    <Paper spacing={1.25} direction='column' className={classes.container}>
      <Sustainability
        onSubmitDescription={async (description) => {
          if (Number(cookies.submitCount) === 2) {
            setIsGeneratingDescriptions(true);
            return;
          } else {
            await handleSubmitDescription(description);
          }
        }}
        isHiddenButton={hasSubmitteddescription}
        valuesRef={descriptionRef}
        handleAddCookies={handleAddCookies}
      />
      <>
        <div ref={feedbackRef} id='feedbackAnchor' className={classes.anchor} />
        {isGeneratingDescriptions && Number(cookies.submitCount) === 2 && (
          <Feedback onSubmit={handleSubmitFeedback} />
        )}
        <div
          // ref={descriptionRef}
          id='descriptionsAnchor'
          className={classes.anchor}
        />
        {generatedDescription && (
          <SustainabilityDescription
            description={generatedDescription}
            // generateDescription={handleGenerateDescriptions}
            handleAddCookies={handleAddCookies}
          />
        )}
        {/* SEND ME BUTTON
        <div ref={sendmeRef} id='sendmeAnchor' className={classes.anchor} />
        {generatedDescription && (
          <Sendme
            description={generatedDescription}
            feedback={submittedFeedback}
            descriptionRef={descriptionRef}
            setError={setError}
            onClick={handleSendmeClick}
          />
        )}
        <div ref={shareRef} id='shareAnchor' className={classes.anchor} />
        {isSendmeClicked && <Share />} */}
        {generatedDescription && <Reset onClick={handleResetClick} />}
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
