import CopyButton from '@/components/CopyButton/CopyButton';
import Paper from '@/components/Paper/Paper';
import Stack from '@/components/Stack/Stack';
import React from 'react';
import classes from './MediaPost.module.scss';

interface IMedia {
    media: string;
    post: string;
}

export default function MediaPost({ media, post }: IMedia) {
    const HEADING_TEXT = `Revised ${media} post example`;
    return (
        <Stack spacing={1.25} direction="column">
            <Stack direction="column" spacing={1.25}>
                <Paper className={classes.paper} direction="column" hasBorder>
                    <h2 className={classes.heading}>{HEADING_TEXT}</h2>
                    <Paper
                        className={classes.paperPost}
                        direction="column"
                        spacing={1}
                        hasBorder
                    >
                        <div className={classes.post}>
                            <div className={classes.avatar_wrapper}>
                                <div className={classes.logo}></div>
                                <div className={classes.nickname}>
                                    @nickname
                                </div>
                            </div>
                            <div className={classes.description}>
                                {post.split('\n').map((postText) => {
                                    return <p key={postText}>{postText}</p>;
                                })}
                            </div>
                        </div>
                    </Paper>
                    <div className={classes.copy_wrapper}>
                        <CopyButton copyText={post} />
                    </div>
                </Paper>
            </Stack>
        </Stack>
    );
}
