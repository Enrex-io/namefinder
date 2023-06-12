import React from 'react';
import Paper from '@/components/Paper/Paper';
import classes from './MarketingRegulations.module.scss';

function MarketingRegulations() {
    const HEADING_TEXT = 'Stay compliant with green marketing regulations';
    return (
        <Paper spacing={1.25} direction="column" className={classes.container}>
            <Paper className={classes.paper}>
                <div className={classes.fieldsContainer}>
                    <h2 className={classes.heading}>{HEADING_TEXT}</h2>
                    <ul className={classes.list}>
                        <ol type="1">
                            <li className={classes.olHeading}>
                                <span className={classes.numberTitle}>1</span>
                                <span className={classes.olTitle}>
                                    Give context
                                </span>
                            </li>
                            <li className={classes.olDescription}>
                                Select your social media platform and region
                            </li>
                        </ol>
                        <ol>
                            <li className={classes.olHeading}>
                                <span className={classes.numberTitle}>2</span>
                                <span className={classes.olTitle}>
                                    Submit content
                                </span>
                            </li>
                            <li className={classes.olDescription}>
                                Upload your social media caption to Greenifs AI
                            </li>
                        </ol>
                        <ol>
                            <li className={classes.olHeading}>
                                <span className={classes.numberTitle}>3</span>
                                <span className={classes.olTitle}>
                                    Receive feedback
                                </span>
                            </li>
                            <li className={classes.olDescription}>
                                Obtain suggestions to ensure green marketing
                                compliance
                            </li>
                        </ol>
                    </ul>
                </div>
            </Paper>
        </Paper>
    );
}

export default MarketingRegulations;
