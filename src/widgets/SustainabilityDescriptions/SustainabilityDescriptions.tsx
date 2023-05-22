import Paper from '@/components/Paper/Paper';
import Stack from '@/components/Stack/Stack';
import CopyButton from '@/components/CopyButton/CopyButton';
import RestartButton from '@/components/RestartButton/RestartButton';
import classes from './SustainabilityDescriptions.module.scss';

const HEADING_TEXT = 'You post analysis';

interface Props {
  descriptions: string[] | [];
}

function SustainabilityDescription({
  descriptions,
}: Props) {
  return (
    <Stack spacing={1.25} direction='column'>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Stack direction='column' spacing={1.25}>
        <Paper
          className={classes.paper}
          direction='column'
          spacing={1}
          hasBorder
        >
          {descriptions.map((description, index) => {
            if (description.trim() === '') return;
            return (
              <Paper key={description} className={classes.paperDescription}>
                {/* <h3 className={classes.goalHeading}>{description}</h3> */}
                <p className={classes.goalDescription}>
                  {/* <span className={classes.primaryText}>{description}</span> */}
                  <span>{description}</span>
                </p>
              </Paper>
            );
          })}
        </Paper>
      </Stack>
    </Stack>
  );
}

export default SustainabilityDescription;
