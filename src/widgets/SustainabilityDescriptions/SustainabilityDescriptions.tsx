import Paper from '@/components/Paper/Paper';
import Stack from '@/components/Stack/Stack';
import CopyButton from '@/components/CopyButton/CopyButton';
import RestartButton from '@/components/RestartButton/RestartButton';
import classes from './SustainabilityDescriptions.module.scss';

const HEADING_TEXT = 'Recommended text to use';

interface Props {
  description: string;
  generateDescription: (description: string) => Promise<void>;
  handleAddCookies: () => void;
}

function SustainabilityDescription({
  description,
  generateDescription,
  handleAddCookies,
}: Props) {
  return (
    <Stack spacing={1.25} direction='column'>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Stack direction='column' spacing={1.25}>
        <Paper
          key={description}
          hasBorder
          className={classes.paper}
          direction='column'
          spacing={1}
        >
          {/* <h3 className={classes.goalHeading}>{description}</h3> */}
          <p className={classes.goalDescription}>{description}</p>
          <Stack spacing={1}>
            <RestartButton
              onRestart={async () => {
                await generateDescription(description);
                handleAddCookies();
              }}
            />
            <CopyButton
              copyText={`
              ${description}
              `}
            />
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default SustainabilityDescription;
