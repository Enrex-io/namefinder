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

const scrollDown = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

const Sustainability = () => {
  const [isFeedbackFulfilled, setIsFeedbackFulfilled] =
    useState<boolean>(false);
  const [isDetailsFilled, setIsDetailsFilled] = useState<boolean>(false);
  const [isGoalsFilled, setIsGoalsFilled] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [goals, setGoals] = useState<Array<string>>();
  const [descriptions, setDescriptions] = useState<Array<GoalDescription>>();
  const [companyDetails, setCompanyDetails] = useState<ParsedCompanyDetails>();

  const handleSubmitFeedbackDialog = async (values: FeedbackType) => {
    await MailchimpService.addSubscriber(
      values.email,
      companyDetails?.companyName,
      companyDetails?.industry,
      companyDetails?.country,
      companyDetails?.companySize,
      SustainabilityGoalsReasons[
        values.reason as keyof typeof SustainabilityGoalsReasons
      ]
    );
    setIsFeedbackFulfilled(true);
  };

  const handleSubmitCompanyDetails = async (details: ParsedCompanyDetails) => {
    if (details !== companyDetails) setCompanyDetails(details);
    const payload = await OpenAIApi.getGoalsByCompanyDetails(details);
    if (payload.error) {
      setError(payload.error);
      return;
    }
    setError(null);
    setGoals(payload.result);
    setIsGoalsFilled(false);
    setIsDetailsFilled(true);
    delay(scrollDown, 100);
  };

  const handleSubmitGoals = async (goals: Array<string>) => {
    if (!companyDetails) {
      const error = "Company details are not set";
      console.error(error);
      setError(error);
      return;
    }
    if (!goals.length) {
      const error = "Goals are not set";
      console.error(error);
      setError(error);
      return;
    }
    const payload = await OpenAIApi.getDescriptionsByGoals(
      goals,
      companyDetails
    );
    if (payload.error) {
      setError(payload.error);
      return;
    }
    setError(null);
    setDescriptions(payload.result);
    payload.result?.length && setIsGoalsFilled(true);
    delay(scrollDown, 100);
  };

  const handleRegenerateSingleGoal = async (goal: GoalDescription) => {
    if (!companyDetails) {
      const error = "Company details are not set";
      console.error(error);
      setError(error);
      return;
    }
    const payload = await OpenAIApi.getDescriptionsByGoals(
      [goal.goal],
      companyDetails
    );
    if (payload.error) {
      setError(payload.error);
      return;
    }
    if (payload.result?.length) {
      const newDescription = payload.result[0];
      setDescriptions((prev) =>
        prev?.map((description) =>
          description.goal === goal.goal ? newDescription : description
        )
      );
      setError(null);
      return;
    }
    console.error("Error while generating description");
    setError("Error while generating description");
    return;
  };

  return (
    <Paper spacing={1.25} direction="column" className={classes.container}>
      <SustainabilityCompanyDetails
        onSubmitCompanyDetails={handleSubmitCompanyDetails}
        isCompleted={isDetailsFilled}
      />
      {isDetailsFilled && (
        <>
          <SustainabilityGoals
            goals={goals || []}
            onSubmitGoals={handleSubmitGoals}
            onRegenerate={async () =>
              companyDetails &&
              (await handleSubmitCompanyDetails(companyDetails))
            }
            isCompleted={!isFeedbackFulfilled}
          />
          {!isFeedbackFulfilled && (
            <Feedback onSubmit={handleSubmitFeedbackDialog} />
          )}
          {isGoalsFilled && !!descriptions?.length && (
            <SustainabilityDescriptions
              descriptions={descriptions}
              regenerateSingleGoal={handleRegenerateSingleGoal}
            />
          )}
        </>
      )}
      {!!error && (
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
