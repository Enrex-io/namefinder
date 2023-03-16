import { MutableRefObject, ReactHTMLElement, useCallback, useEffect, useRef, useState } from "react";
import Paper from "@/components/Paper/Paper";
import SustainabilityGoals from "@/widgets/SustainabilityGoals/SustainabilityGoals";
import SustainabilityDescriptions from "@/widgets/SustainabilityDescriptions/SustainabilityDescriptions";
import SustainabilityCompanyDetails from "@/widgets/SustainabilityCompanyDetails/SustainabilityCompanyDetails";
import {
  Feedback as FeedbackType,
  GoalDescription,
  ParsedCompanyDetails,
} from "@/types";
import { OpenAIApi } from "@/services/OpenAIService.client";
import classes from "./Sustainability.module.scss";
import { MailchimpService } from "@/services/Mailchimp.client";
import { SustainabilityGoalsReasons } from "@/consts/sustainabilityGoalsReasons";
import Stack from "@/components/Stack/Stack";
import { delay } from "@/utils/helpers";
import Feedback from "@/widgets/Feedback/Feedback";
import WindowScrollControls from "@/components/WindowScrollControls/WindowScrollControls";
import StatusDisplay from "@/components/StatusDisplay/StatusDisplay";
import Sendme from "@/widgets/Sendme/Sendme";

const scrollTo = (ref: MutableRefObject<any>) => {
  if (!ref.current) return;
  ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Sustainability = () => {
  const goalsRef = useRef<HTMLDivElement | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const descriptionsRef = useRef<HTMLDivElement | null>(null);
  const sendmeRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isGeneratingDescriptions, setIsGeneratingDescriptions] =
    useState<boolean>(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<FeedbackType>();
  const [hasSubmittedCompanyDetails, setHasSubmittedCompanyDetails] =
    useState<boolean>(false);

  const [selectedGoals, setSelectedGoals] = useState<Array<string>>();
  const [isGenerateDescriptionsClicked, setIsGenerateDescriptionsClicked] = useState<boolean>(false)
  const [generatedDescriptions, setGeneratedDescriptions] =
    useState<Array<GoalDescription>>();
  const [generatedGoals, setGeneratedGoals] = useState<Array<string>>();
  const companyDetailsRef = useRef<ParsedCompanyDetails | null>(null)
  const hasSubmittedFeedback = Boolean(submittedFeedback);

  const handleSubmitCompanyDetails = async (
    companyDetails: ParsedCompanyDetails
  ) => {
    const response = await OpenAIApi.getGoalsByCompanyDetails(companyDetails);
    if (response.error) return setError(response.error);
    setError(null);
    setGeneratedGoals(response.result);
    setHasSubmittedCompanyDetails(true);
    delay(() => scrollTo(goalsRef), 500);
  };

  const handleSubmitFeedback = async (feedback: FeedbackType) => {
    console.log(feedback);
    if (!companyDetailsRef.current || !selectedGoals?.length) return;
    const responseFeedback = await MailchimpService.addSubscriber(
      feedback.email,
      companyDetailsRef.current.companyName,
      companyDetailsRef.current.industry,
      companyDetailsRef.current.country,
      companyDetailsRef.current.companySize,
    );
  
    const responseUpdateTags = await MailchimpService.updateTags(
      feedback.email, 
      feedback.reason.map(({ value }) => value as keyof typeof SustainabilityGoalsReasons)
    );
    if (responseFeedback?.error) return setError(responseFeedback.error);
    const responseDescriptions = await OpenAIApi.getDescriptionsByGoals(
      selectedGoals,
      companyDetailsRef.current
    );
    if (responseDescriptions.error) return setError(responseDescriptions.error);
    setGeneratedDescriptions(responseDescriptions.result);
    setError(null);
    setSubmittedFeedback(feedback);
    delay(() => scrollTo(descriptionsRef), 500);
  };

  const handleRegenerateSingleGoal = async (
    goalDescription: GoalDescription
  ) => {
    if (!companyDetailsRef.current) return;
    const response = await OpenAIApi.getDescriptionsByGoals(
      [goalDescription.goal],
      companyDetailsRef.current
    );
    if (response.error) return;
    const newDescriptions = generatedDescriptions?.map((description) => {
      if (description.goal === goalDescription.goal && response.result?.[0])
        return response.result[0];
      return description;
    });
    setGeneratedDescriptions(newDescriptions);
    // delay(() => scrollTo(), 500);
  };

  const handleRegenerateAllGoals = async () => {
    if (!companyDetailsRef.current) return;
    const response = await OpenAIApi.getGoalsByCompanyDetails(
      companyDetailsRef?.current
    );
    if (response.error) return setError(response.error);
    setError(null);
    setGeneratedGoals(response.result);
    setSelectedGoals([]);
  };

  const handleGenerateDescriptions = async () => {
    if (!isGenerateDescriptionsClicked) {
      return setIsGenerateDescriptionsClicked(true);
    }

    setIsGeneratingDescriptions(true);
    if (!companyDetailsRef.current || !selectedGoals?.length) return;
    const response = await OpenAIApi.getDescriptionsByGoals(
      selectedGoals,
      companyDetailsRef.current
    );
    if (response.error) {
      setIsGeneratingDescriptions(false);
      return setError(response.error);
    }
    setError(null);
    setGeneratedDescriptions(response.result);
    setIsGeneratingDescriptions(false);
    delay(() => scrollTo(feedbackRef), 500);
  };

  useEffect(() => {
    if (!hasSubmittedFeedback && isGenerateDescriptionsClicked) {
      delay(() => scrollTo(feedbackRef), 500);
    }
  }, [isGenerateDescriptionsClicked, hasSubmittedFeedback])

  return (
    <Paper spacing={1.25} direction="column" className={classes.container}>
      <SustainabilityCompanyDetails
        onSubmitCompanyDetails={handleSubmitCompanyDetails}
        isHiddenButton={hasSubmittedCompanyDetails}
        valuesRef={companyDetailsRef}
      />
      {generatedGoals?.length && (
        <>
          <div ref={goalsRef} id="goalsAnchor"/>
          <SustainabilityGoals
            goals={generatedGoals}
            onSubmitGoals={async (goals) => {
              setSelectedGoals(goals);
            }}
            onRegenerate={handleRegenerateAllGoals}
            isHiddenButton={false}
            onGenerateDescriptions={handleGenerateDescriptions}
            isGeneratingDescriptions={isGeneratingDescriptions}
          />
          <div ref={feedbackRef} id="feedbackAnchor" />
          {!hasSubmittedFeedback && isGenerateDescriptionsClicked && (
            <Feedback onSubmit={handleSubmitFeedback} />
          )}
          <div ref={descriptionsRef} id="descriptionsAnchor"/>
          {generatedDescriptions?.length && (
            <SustainabilityDescriptions
              descriptions={generatedDescriptions}
              regenerateSingleGoal={handleRegenerateSingleGoal}
            />
          )}
          <div ref={sendmeRef} id="sendmeAnchor"/>
          {
            generatedDescriptions?.length && (
              <Sendme
              descriptions={generatedDescriptions}
              feedback={submittedFeedback}
              companyDetailsRef={companyDetailsRef}
              setError={setError}
              />
            )
          }
        </>
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
    </Paper>
  );
};

export default Sustainability;
