import React, { ReactElement, useEffect, useState } from 'react';
import { IPrompt } from '@/types';
import Stack from '@/components/Stack/Stack';
import classes from './history.module.scss';
import useAuth from '@/hooks/useAuth';
import { OpenAIApi } from '@/services/OpenAIService';
import Paper from '@/components/Paper/Paper';
import clsx from 'clsx';
import Medias from '@/consts/medias';
import Regions from '@/consts/region';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import Layout from '@/pages/layout';
import SustainabilityDescription from '@/widgets/SustainabilityDescriptions/SustainabilityDescriptions';
import MediaPost from '@/widgets/MediaPost/MediaPost';
import { useRouter } from 'next/router';

function History() {
    const { push, query } = useRouter();
    const { user } = useAuth();
    const SUBMIT_BUTTON_TEXT = 'Check post';
    const [history, setHistory] = useState<IPrompt>({
        userId: '',
        media: Medias.TwitterEU,
        region: Regions.EU,
        request: '',
        unparsedResponse: '',
        response: {
            terms: [''],
            correctText: '',
        },
        date: '',
    });
    useEffect(() => {
        const getHistory = async () => {
            if (!user) return;

            const data = await OpenAIApi.getHistory(user.id);
            const historyOrder = data[Number(query?.order) as number];
            setHistory(historyOrder);
            return historyOrder;
        };

        getHistory().then((r) => console.log(r));
    }, [query?.order, user]);

    const date = history && new Date(history!.date as unknown as Date);
    const dateText =
        history && `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;

    return (
        <Stack className={classes.container} direction="column">
            <Stack direction="column" spacing={1.25}>
                {history ? (
                    <>
                        <Paper
                            className={classes.paper}
                            direction="column"
                            hasBorder
                        >
                            <h3 className={classes.goalHeading}>
                                <span>Your post {dateText}</span>
                            </h3>
                            <Paper
                                className={classes.paperPrompt}
                                direction="column"
                                spacing={1}
                                hasBorder
                            >
                                <h3 className={classes.goalDescription}>
                                    <span></span>
                                    {history.request}
                                </h3>
                            </Paper>
                        </Paper>
                        {history.response.terms[0] && (
                            <SustainabilityDescription
                                descriptions={history.response.terms}
                            />
                        )}
                        {history.response.correctText && (
                            <MediaPost
                                media={history.media || ''}
                                post={history.response.correctText}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <Paper
                            className={clsx(classes.paper, classes.paperEmpty)}
                            direction="column"
                            spacing={1.5}
                            hasBorder
                        >
                            <h3 className={classes.historyDescriptionTitle}>
                                <span>No history yet</span>
                            </h3>
                            <p className={classes.historyDescriptionEmpty}>
                                Once you check your first social post, it will
                                promptly show up and be stored in this location.
                            </p>
                        </Paper>
                        <Stack
                            direction="column"
                            spacing={1.25}
                            className={classes.stackEmpty}
                        >
                            <Button
                                tabIndex={1}
                                type="submit"
                                className={classes.button}
                                funnyLoadingMessage
                                onClick={() => push('/')}
                            >
                                <Image
                                    src={'/svg/check.svg'}
                                    alt={'Check'}
                                    width={18}
                                    height={18}
                                />
                                <span>{SUBMIT_BUTTON_TEXT}</span>
                            </Button>
                        </Stack>
                    </>
                )}
            </Stack>
        </Stack>
    );
}

History.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default History;
