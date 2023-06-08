import React, { useState } from 'react';
import classes from './NavBar.module.scss';
import Image from 'next/image';
import {
    IconCirclePlus,
    IconCreditCard,
    IconHistory,
    IconLogin,
    IconLogout,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useAuth from '@/hooks/useAuth';
import useSWR from 'swr';
import { IGreenWashingUser, IPrompt } from '@/types';
import Chip from '@/components/Chip/Chip';
import UserPhotoPlaceholder from '@/components/UserPhotoPlaceholder/UserPhotoPlaceholder';

interface ProfileMenuProps {
    userInfo: IGreenWashingUser | null;
    handlePopUp: () => void;
}

function NavBar({
    userInfo,
    handlePopUp,
}: ProfileMenuProps): React.ReactElement {
    const { user, logout } = useAuth();
    const { push, pathname } = useRouter();
    const endpoint = `${
        process.env.NEXT_PUBLIC_ENREX_API_URL
    }/api/sustainabilityMarketing/getHistory/${user ? user.id : ''}`;
    const { data, isLoading } = useSWR(endpoint);
    const isCounterMinus = Number(userInfo?.counter?.toFixed(0)) <= 0;
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const handleLogout = async () => {
        await logout?.();
        push('/login');
    };

    if (!user) {
        return (
            <li className={classes.li} onClick={() => push('/login')}>
                <span className={classes.materialIconsOutlined}>
                    <IconLogin />
                </span>
                <p>Sign in</p>
            </li>
        );
    }

    return (
        <nav className={clsx(classes.container)}>
            <div
                className={classes.hamburger}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    priority={true}
                    src={'/svg/hamburger.svg'}
                    alt={'Logo'}
                    width={36}
                    height={36}
                />
            </div>
            <div className={classes.logo}>
                <Image
                    priority={true}
                    src={'/svg/logo.svg'}
                    alt={'Logo'}
                    width={150}
                    height={45}
                />
            </div>
            <div
                className={clsx(classes.containerList, isOpen && classes.open)}
            >
                <ul className={classes.ul}>
                    <li
                        className={clsx(classes.subItemPost, classes.subItem)}
                        onClick={() => push('/')}
                    >
                        <IconCirclePlus color="#091F3D" size={18} />
                        <p>New post</p>
                    </li>
                    <ul className={classes.historyUl}>
                        <li
                            className={clsx(
                                classes.subItemPost,
                                classes.subItem,
                                classes.subHistory
                            )}
                            onClick={() => push('/history')}
                        >
                            <IconHistory color="#091F3D" size={18} />
                            <p>History</p>
                        </li>
                        {!isLoading && data ? (
                            data?.map(
                                (
                                    prompt: IPrompt,
                                    index: number
                                ): React.ReactElement => {
                                    return (
                                        <li
                                            className={classes.subItemPrompt}
                                            key={prompt.request}
                                            onClick={() =>
                                                push(`/history?order=${index}`)
                                            }
                                        >
                                            {prompt.request}
                                        </li>
                                    );
                                }
                            )
                        ) : (
                            <li>No previous prompts</li>
                        )}
                    </ul>
                </ul>
                <ul className={classes.ul}>
                    <li
                        className={clsx(
                            classes.subItem,
                            classes.bottomDivider,
                            classes.subChecks,
                            isCounterMinus && classes.freeChecks
                        )}
                        onClick={() => {
                            if (pathname === '/history') {
                                push('/').then((r) => console.log(r));
                                return;
                            }
                            if (isCounterMinus) handlePopUp();
                        }}
                    >
                        <p>
                            <IconHistory color="#091F3D" size={18} />
                            <span>Checks left</span>
                        </p>
                        <Chip
                            label={
                                isCounterMinus
                                    ? '0'
                                    : String(
                                          userInfo?.counter?.toFixed(0) || '-1'
                                      )
                            }
                            className={classes.checksChip}
                        />
                    </li>
                    <li
                        className={clsx(
                            classes.subItemPost,
                            classes.subItem,
                            classes.subItemProfile
                        )}
                    >
                        {user.photo ? (
                            <Image
                                width={35}
                                height={35}
                                src={user.photo}
                                className={classes.profilePhoto}
                                alt="profile photo"
                            />
                        ) : (
                            <UserPhotoPlaceholder userName={user.name} />
                        )}
                        <div className="">
                            <p>{user.name}</p>
                            <p>{user.email || ''}</p>
                        </div>
                    </li>
                    <li
                        className={clsx(classes.subItemPost, classes.subItem)}
                        onClick={() => push('/subscription')}
                    >
                        <IconCreditCard color="#091F3D" size={20} />
                        <p>Subscription</p>
                    </li>
                    <li
                        className={clsx(classes.subItemPost, classes.subItem)}
                        onClick={handleLogout}
                    >
                        <IconLogout color="#091F3D" size={20} />
                        <p>Logout</p>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
