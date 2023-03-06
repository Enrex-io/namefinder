import Paper from "@/components/Paper/Paper";
import Stack from "@/components/Stack/Stack";
import Button from "@/components/Button/Button";
import RestartButton from "@/components/RestartButton/RestartButton";
import { MOCK_GOAL_DESCRIPTION } from "@/utils/mocks";
import classes from "./SustainabilityDescriptions.module.scss";

const HEADING_TEXT = "Generated sustainability goals";

interface Props {}

function SustainabilityDescriptions({}: Props) {
  return (
    <Stack spacing={1.25} direction="column">
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Paper hasBorder className={classes.paper} direction="column" spacing={1}>
        <h3 className={classes.goalHeading}>Use only renewable energy</h3>
        <p className={classes.goalDescription}>{MOCK_GOAL_DESCRIPTION}</p>
        <Stack spacing={1}>
          <RestartButton />
          <Button size="small" variant="outlined">
            Copy
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default SustainabilityDescriptions;
