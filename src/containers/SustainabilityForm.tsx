import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Paper from '@/components/Paper/Paper';
import { Feedback as FeedbackType, Description } from '@/types';
import { OpenAIApi } from '@/services/OpenAIService';
import Stack from '@/components/Stack/Stack';
import { delay } from '@/utils/helpers';
import WindowScrollControls from '@/components/WindowScrollControls/WindowScrollControls';
import StatusDisplay from '@/components/StatusDisplay/StatusDisplay';
import Sendme from '@/widgets/Sendme/Sendme';
import Share from '@/widgets/Share/Share';
import SustainabilityDescription from '@/widgets/SustainabilityDescriptions/SustainabilityDescriptions';
import Sustainability from '@/widgets/Sustainability/Sustainability';
import classes from './SustainabilityForm.module.scss';
import { useCookies } from 'react-cookie';

const scrollTo = (ref: MutableRefObject<any>) => {
  if (!ref.current) return;
  ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const SustainabilityForm = () => {
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const descriptionsRef = useRef<HTMLDivElement | null>(null);
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

  const handleSubmitDescription = async (description: Description) => {
    const responseDescriptions =
      await OpenAIApi.getAssistedBySustainabilityMarketing(description);
    if (responseDescriptions.error) return setError(responseDescriptions.error);
    setError(null);
    setGeneratedDescription(responseDescriptions.result);
    setHasSubmitteddescription(true);
    delay(() => scrollTo(descriptionsRef), 500);
  };

  // const handleSubmitFeedback = async (feedback: FeedbackType) => {
  //   console.log(feedback);
  //   if (!descriptionRef.current) return;
  //   const responseFeedback = await MailchimpService.addSubscriber(
  //     feedback.email,
  //     descriptionRef.current.description
  //   );

  //   if (!generatedDescription) return;

  //   const descriptionToSend = {
  //     name: generatedDescription
  //       ? FeedbackTagsEnum.NEWSLETTER
  //       : FeedbackTagsEnum.NEWSLETTER,
  //     status: generatedDescription ? TagStatus.active : TagStatus.inactive,
  //   };

  //   const responseUpdateTags = await MailchimpService.updateTags(
  //     feedback.email,
  //     descriptionToSend
  //   );

  //   if (responseFeedback?.error) return setError(responseFeedback.error);
  //   setSubmittedFeedback(feedback);
  // };

  const [cookies, setCookie] = useCookies(['submitCount']);

  const handleAddCookies = () => {
    if (!cookies.submitCount) {
      setCookie('submitCount', 0, { path: '/' });
      return;
    }
    let d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 1000);
    setCookie('submitCount', Number(cookies.submitCount) + 1 || 0, {
      path: '/',
      expires: d,
    });
    console.log(cookies, cookies.submitCount++);
  };

  const handleGenerateDescriptions = async () => {
    if (!isGenerateDescriptionsClicked) {
      return setIsGenerateDescriptionsClicked(true);
    }
    setIsGeneratingDescriptions(true);
    if (!descriptionRef.current) return;
    const response = await OpenAIApi.getAssistedBySustainabilityMarketing(
      descriptionRef.current
    );
    if (response.error) {
      setIsGeneratingDescriptions(false);
      return setError(response.error);
    }
    setError(null);
    setGeneratedDescription(response.result);
    setIsGeneratingDescriptions(false);
    delay(() => scrollTo(feedbackRef), 500);
  };

  const handleSendmeClick = () => {
    setIsSendmeClicked(true);
    delay(() => scrollTo(shareRef), 500);
  };

  useEffect(() => {
    if (!hasSubmittedFeedback && isGenerateDescriptionsClicked) {
      delay(() => scrollTo(feedbackRef), 500);
    }
  }, [isGenerateDescriptionsClicked, hasSubmittedFeedback]);

  return (
    <Paper spacing={1.25} direction='column' className={classes.container}>
      <Sustainability
        onSubmitDescription={handleSubmitDescription}
        isHiddenButton={hasSubmitteddescription}
        valuesRef={descriptionRef}
        handleAddCookies={handleAddCookies}
      />
      <>
        <div ref={feedbackRef} id='feedbackAnchor' className={classes.anchor} />
        {/* {!hasSubmittedFeedback && isGenerateDescriptionsClicked && (
          <Feedback onSubmit={handleSubmitFeedback} />
        )} */}
        <div
          ref={descriptionsRef}
          id='descriptionsAnchor'
          className={classes.anchor}
        />
        {generatedDescription && (
          <SustainabilityDescription
            description={generatedDescription}
            generateDescription={handleGenerateDescriptions}
            handleAddCookies={handleAddCookies}
          />
        )}
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
        {isSendmeClicked && <Share />}
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
