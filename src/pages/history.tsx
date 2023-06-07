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
import PopUp from '@/components/PopUp/PopUp';
import clsx from 'clsx';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function History() {
    const { push } = useRouter();
    const HEADING_TEXT = 'History';
    const [userInfo, setUserInfo] = useState<IGreenWashingUser | null>(null);
    const [history, setHistory] = useState<Array<IPrompt>>([]);
    const { user } = useAuth();
    const [openPopUp, setOpenPopUp] = useState<boolean>(false);
    const SUBMIT_BUTTON_TEXT = 'Check post';

    const handlePopUp = () => {
        setOpenPopUp(!openPopUp);
    };
    useEffect(() => {
        async function fetchUser() {
            const userData = await GreenWashingUserService.getUser();
            if (userData.result) {
                setUserInfo(userData.result);
                return;
            }
        }

        if (user) {
            fetchUser().then((r) => console.log(r));
        }
    }, [user]);
    useEffect(() => {
        const getHistory = async () => {
            if (!user) return;

            const data = await OpenAIApi.getHistory(user.id);
            setHistory(data);
        };

        getHistory().then((r) => console.log(r));
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
            {openPopUp && <PopUp handlePopUp={handlePopUp} />}
            <NavBar userInfo={userInfo} handlePopUp={handlePopUp} />
            <Stack
                className={classes.container}
                spacing={1.25}
                direction="column"
            >
                <h2 className={classes.heading}>{HEADING_TEXT}</h2>
                <Stack direction="column" spacing={1.25}>
                    {history && history?.[0] ? (
                        history.map((prompt: IPrompt) => {
                            const date: Date = new Date(
                                prompt!.date as unknown as Date
                            );
                            const dateText = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} - ${
                                prompt.media
                            }`;

                            return (
                                <>
                                    <Paper
                                        className={classes.paper}
                                        direction="column"
                                        spacing={1.5}
                                        hasBorder
                                    >
                                        <h3 className={classes.goalHeading}>
                                            <span>{dateText}</span>
                                        </h3>
                                        <Paper
                                            className={classes.paperPrompt}
                                            direction="column"
                                            spacing={1}
                                            hasBorder
                                        >
                                            <h3
                                                className={
                                                    classes.goalDescription
                                                }
                                            >
                                                <span></span>
                                                {prompt.request}
                                            </h3>
                                        </Paper>
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
                                        <Paper
                                            className={classes.paperPost}
                                            direction="column"
                                            spacing={1}
                                            hasBorder
                                        >
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
                                                        className={
                                                            classes.nickname
                                                        }
                                                    >
                                                        @nickname
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        classes.description
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            prompt.response
                                                                .correctText
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </Paper>
                                    </Paper>
                                </>
                            );
                        })
                    ) : (
                        <>
                            <Paper
                                className={clsx(
                                    classes.paper,
                                    classes.paperEmpty
                                )}
                                direction="column"
                                spacing={1.5}
                                hasBorder
                            >
                                <h3 className={classes.historyDescriptionTitle}>
                                    <span>No history yet</span>
                                </h3>
                                <p className={classes.historyDescriptionEmpty}>
                                    Once you check your first social post, it
                                    will promptly show up and be stored in this
                                    location.
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
        </>
    );
}
