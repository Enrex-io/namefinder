import React, { useEffect, useState } from 'react';
import { IGreenWashingUser, IPrompt } from '@/types';
import Stack from '@/components/Stack/Stack';
import classes from './history.module.scss';
import useAuth from '@/hooks/useAuth';
import { OpenAIApi } from '@/services/OpenAIService';
import Paper from '@/components/Paper/Paper';
import NavBar from '@/components/NavBar/NavBar';
import { GreenWashingUserService } from '@/services/GreenWashingUserService';
import Head from 'next/head';
import { META } from '@/consts/meta';

export default function History() {
    const HEADING_TEXT = 'History';
    const [userInfo, setUserInfo] = useState<IGreenWashingUser | null>(null);
    const [history, setHistory] = useState<Array<IPrompt>>([]);
    const { user } = useAuth();
    useEffect(() => {
        async function fetchUser() {
            const userData = await GreenWashingUserService.getUser();
            if (userData.result) {
                setUserInfo(userData.result);
                return;
            }
        }

        if (user) {
            fetchUser();
        }
    }, [user]);
    useEffect(() => {
        const getHistory = async () => {
            if (!user) return;

            const data = await OpenAIApi.getHistory(user.id);
            setHistory(data);
        };

        getHistory();
    }, [user]);
    return (
        <>
            <Head>
                <title>{META.title}</title>
                <link rel="icon" href={META.favicon} />
                <meta name="description" content={META.description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <NavBar userInfo={userInfo} />
            <Stack
                className={classes.container}
                spacing={1.25}
                direction="column"
            >
                <h2 className={classes.heading}>{HEADING_TEXT}</h2>
                <Stack direction="column" spacing={1.25}>
                    <Paper
                        className={classes.paper}
                        direction="column"
                        spacing={1}
                        hasBorder
                    >
                        {history.map((prompt: IPrompt, index: number) => {
                            const date: Date = new Date(
                                prompt!.date as unknown as Date
                            );

                            return (
                                <>
                                    <Paper
                                        className={classes.paper}
                                        direction="column"
                                        spacing={1.5}
                                        hasBorder
                                    >
                                        <h3 className={classes.goalHeading}>
                                            <span>
                                                {'Prompt № '}
                                                {index + 1}
                                                {'. '}
                                            </span>
                                        </h3>
                                        <h3 className={classes.goalDescription}>
                                            <span></span>
                                            {prompt.request}
                                        </h3>
                                        {prompt.response.terms.map(
                                            (term: string) => {
                                                return (
                                                    <Paper
                                                        key={term}
                                                        className={
                                                            classes.paperDescription
                                                        }
                                                        direction="row"
                                                    >
                                                        <p
                                                            className={
                                                                classes.goalDescription
                                                            }
                                                        >
                                                            <span>{term}</span>
                                                        </p>
                                                    </Paper>
                                                );
                                            }
                                        )}

                                        <div className={classes.post}>
                                            <div
                                                className={
                                                    classes.avatar_wrapper
                                                }
                                            >
                                                <div
                                                    className={classes.logo}
                                                ></div>
                                                <div
                                                    className={classes.nickname}
                                                >
                                                    @nickname
                                                </div>
                                            </div>
                                            <div
                                                className={classes.description}
                                            >
                                                <p>
                                                    {
                                                        prompt.response
                                                            .correctText
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <span className={classes.dateHeading}>
                                            {date.toLocaleDateString()}{' '}
                                            {/*{date.getHours()}*/}
                                            {/*{':'}*/}
                                            {/*{date.getMinutes()}*/}
                                            {/*{':'}*/}
                                            {/*{date.getSeconds()}*/}
                                        </span>
                                    </Paper>
                                </>
                            );
                        })}
                    </Paper>
                </Stack>
            </Stack>
        </>
    );
}
