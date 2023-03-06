import Paper from "@/components/Paper/Paper";
import FeedbackDialog from "@/widgets/FeedbackDialog/FeedbackDialog";
import SustainabilityGoals from "@/widgets/SustainabilityGoals/SustainabilityGoals";
import SustainabilityDescriptions from "@/widgets/SustainabilityDescriptions/SustainabilityDescriptions";
import SustainabilityCompanyDetails from "@/widgets/SustainabilityCompanyDetails/SustainabilityCompanyDetails";
import { MOCK_GOALS } from "@/utils/mocks";
import classes from "./Sustainability.module.scss";
import { useState } from "react";

const Sustainability = () => {
  const [isDialogPassed, setIsDialogPassed] = useState<boolean>(false);
  const [isDetailsFilled, setIsDetailsFilled] = useState<boolean>(false);
  const [isGoalsFilled, setIsGoalsFilled] = useState<boolean>(false);

  const handleSubmitFeedbackDialog = (values: unknown) => {};

  return (
    <>
      {!isDialogPassed && (
        <FeedbackDialog
          onSubmit={handleSubmitFeedbackDialog}
          onClose={() => setIsDialogPassed(true)}
        />
      )}
      <Paper
        spacing={1.25}
        elevation={0.75}
        direction="column"
        className={classes.container}
      >
        <SustainabilityCompanyDetails
          onSubmitCompanyDetails={(details) => setIsDetailsFilled(true)}
          isCompleted={isDetailsFilled}
        />
        {isDetailsFilled && (
          <>
            <SustainabilityGoals
              goals={MOCK_GOALS}
              onSubmitGoals={(goals) => setIsGoalsFilled(true)}
              onRegenerate={() => {}}
              isCompleted={isGoalsFilled}
            />
            {isGoalsFilled && <SustainabilityDescriptions />}
          </>
        )}
      </Paper>
    </>
  );
};

export default Sustainability;
