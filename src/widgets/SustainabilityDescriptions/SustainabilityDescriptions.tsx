import Paper from '@/components/Paper/Paper';
import Stack from '@/components/Stack/Stack';
import classes from './SustainabilityDescriptions.module.scss';

const HEADING_TEXT = 'Your post analysis';

interface Props {
    descriptions: string[] | [];
}

function SustainabilityDescription({ descriptions }: Props) {
    return (
        <Stack spacing={1.25} direction="column">
            <Stack direction="column" spacing={1.25}>
                <Paper className={classes.paper} direction="column" hasBorder>
                    <h2 className={classes.heading}>{HEADING_TEXT}</h2>
                    {descriptions.map((description) => {
                        if (description.trim() === '') return;
                        return (
                            <Paper
                                key={description}
                                className={classes.paperDescription}
                            >
                                <p className={classes.goalDescription}>
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
