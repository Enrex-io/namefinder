import Paper from "@/components/Paper/Paper";
import Stack from "@/components/Stack/Stack";
import CopyButton from "@/components/CopyButton/CopyButton";
import RestartButton from "@/components/RestartButton/RestartButton";
import { GoalDescription } from "@/types";
import classes from "./SustainabilityDescriptions.module.scss";

const HEADING_TEXT = "Generated sustainability goals";

interface Props {
  descriptions: Array<GoalDescription>;
  regenerateSingleGoal: (goal: GoalDescription) => Promise<void>;
}

function SustainabilityDescriptions({
  descriptions,
  regenerateSingleGoal,
}: Props) {
  return (
    <Stack spacing={1.25} direction="column">
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Stack direction="column" spacing={1.25}>
        {descriptions.map((description) => (
          <Paper
            key={description.goal}
            hasBorder
            className={classes.paper}
            direction="column"
            spacing={1}
          >
            <h3 className={classes.goalHeading}>{description.goal}</h3>
            <p className={classes.goalDescription}>{description.description}</p>
            <Stack spacing={1}>
              <RestartButton
                onRestart={async () => await regenerateSingleGoal(description)}
              />
              <CopyButton
                copyText={`${description.goal}: ${description.description}`}
              />
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

export default SustainabilityDescriptions;
