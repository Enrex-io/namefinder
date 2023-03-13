import { useCallback, useEffect, useRef, useState } from "react";
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

const scrollDown = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

const Sustainability = () => {
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
    delay(scrollDown, 500);
  };

  const handleSummitFeedback = async (feedback: FeedbackType) => {
    if (!companyDetailsRef.current || !selectedGoals?.length) return;
    const responseFeedback = await MailchimpService.addSubscriber(
      feedback.email,
      companyDetailsRef.current.companyName,
      companyDetailsRef.current.industry,
      companyDetailsRef.current.country,
      companyDetailsRef.current.companySize,
      SustainabilityGoalsReasons[feedback.reason]
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
    delay(scrollDown, 500);
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
    delay(scrollDown, 500);
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
    delay(scrollDown, 500);
  };

  useEffect(() => {
    if (!hasSubmittedFeedback && isGenerateDescriptionsClicked) {
      delay(scrollDown, 500);
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
          <SustainabilityGoals
            goals={generatedGoals}
            onSubmitGoals={async (goals) => {
              if (!selectedGoals?.length && !hasSubmittedFeedback)
                delay(scrollDown, 500);
              setSelectedGoals(goals);
            }}
            onRegenerate={handleRegenerateAllGoals}
            isHiddenButton={false}
            onGenerateDescriptions={handleGenerateDescriptions}
            isGeneratingDescriptions={isGeneratingDescriptions}
          />
          {!hasSubmittedFeedback && isGenerateDescriptionsClicked && (
            <Feedback onSubmit={handleSummitFeedback} />
          )}
          {generatedDescriptions?.length && (
            <SustainabilityDescriptions
              descriptions={generatedDescriptions}
              regenerateSingleGoal={handleRegenerateSingleGoal}
            />
          )}
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
