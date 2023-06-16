import Paper from '@/components/Paper/Paper';
import Stack from '@/components/Stack/Stack';
import classes from './SustainabilityDescriptions.module.scss';
import { ReactElement } from 'react';
import clsx from 'clsx';

const HEADING_TEXT = 'Your post analysis';

interface Props {
    descriptions: string[] | [];
}

function SustainabilityDescription({ descriptions }: Props) {
    return (
        <Stack spacing={1.25} direction="column">
            <Stack direction="column" spacing={1.25}>
                <Paper className={classes.paper} direction="column" hasBorder>
                    <h2 className={clsx(classes.heading, 'analyze')}>
                        {HEADING_TEXT}
                    </h2>
                    {descriptions.map((description: string): ReactElement => {
                        if (
                            description
                                .replaceAll(`'`, '')
                                .replaceAll(' ', '')
                                .trim() === ''
                        )
                            return <></>;
                        const firstIndex: number =
                            description.indexOf('±±±±±±') === -1
                                ? 0
                                : description.indexOf('±±±±±±');
                        const heading: string = description.slice(
                            0,
                            firstIndex
                        );
                        const subHeading: string = description.slice(
                            firstIndex ? firstIndex + 6 : 0
                        );
                        return (
                            <Paper
                                key={subHeading}
                                className={classes.paperDescription}
                                direction={'column'}
                            >
                                <p className={classes.goalDescription}>
                                    <span>{heading}</span>
                                    <span>{subHeading}</span>
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
