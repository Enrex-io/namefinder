import { useState } from "react";
import Paper from "@/components/Paper/Paper";
import FeedbackDialog from "@/widgets/FeedbackDialog/FeedbackDialog";
import SustainabilityGoals from "@/widgets/SustainabilityGoals/SustainabilityGoals";
import SustainabilityDescriptions from "@/widgets/SustainabilityDescriptions/SustainabilityDescriptions";
import SustainabilityCompanyDetails from "@/widgets/SustainabilityCompanyDetails/SustainabilityCompanyDetails";
import { CompanyDetails, Feedback, GoalDescription } from "@/types";
import { OpenAIApi } from "@/services/OpenAIService.client";
import { FeedbackService } from "@/services/FeedbackService.client";
import classes from "./Sustainability.module.scss";

const Sustainability = () => {
  const [isDialogPassed, setIsDialogPassed] = useState<boolean>(false);
  const [isDetailsFilled, setIsDetailsFilled] = useState<boolean>(false);
  const [isGoalsFilled, setIsGoalsFilled] = useState<boolean>(false);

  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>();
  const [goals, setGoals] = useState<Array<string>>();
  const [descriptions, setDescriptions] = useState<Array<GoalDescription>>();

  const handleSubmitFeedbackDialog = async (values: Feedback) => {
    const isSuccess = await FeedbackService.sendFeedback(values);
    if (!isSuccess) console.error("Error while sending feedback");
    setIsDialogPassed(true);
  };

  const handleSubmitCompanyDetails = async (details: CompanyDetails) => {
    if (details !== companyDetails) setCompanyDetails(details);
    const generatedGoals = await OpenAIApi.getGoalsByCompanyDetails(details);
    if (!generatedGoals.length) {
      console.error("Error while generating goals");
      return;
    }
    setGoals(generatedGoals);
    setIsGoalsFilled(false);
    setIsDetailsFilled(true);
  };

  const handleSubmitGoals = async (goals: Array<string>) => {
    if (!companyDetails) {
      console.error("Company details are not set");
      return;
    }
    if (!goals.length) {
      console.error("Goals are not set");
      return;
    }
    const generatedDescriptions = await OpenAIApi.getDescriptionsByGoals(
      goals,
      companyDetails
    );
    setDescriptions(generatedDescriptions);
    setIsGoalsFilled(true);
  };

  const handleRegenerateSingleGoal = async (goal: GoalDescription) => {
    if (!companyDetails) {
      console.error("Company details are not set");
      return;
    }
    const generatedDescription = await OpenAIApi.getDescriptionsByGoals(
      [goal.goal],
      companyDetails
    );
    if (!generatedDescription.length) {
      console.error("Error while generating description");
      return;
    }
    setDescriptions((prev) =>
      prev?.map((description) =>
        description.goal === goal.goal ? generatedDescription[0] : description
      )
    );
  };

  return (
    <>
      {!isDialogPassed && isGoalsFilled && (
        <FeedbackDialog onSubmit={handleSubmitFeedbackDialog} />
      )}
      <Paper
        spacing={1.25}
        // elevation={0.75}
        direction="column"
        className={classes.container}
      >
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
              // isCompleted={isGoalsFilled}
            />
            {isGoalsFilled && (
              <SustainabilityDescriptions
                descriptions={descriptions || []}
                regenerateSingleGoal={handleRegenerateSingleGoal}
              />
            )}
          </>
        )}
      </Paper>
    </>
  );
};

export default Sustainability;
