import React, { useEffect, useRef, useState } from 'react';
import classes from './NavBar.module.scss';
import Image from 'next/image';
import {
    IconCirclePlus,
    IconCreditCard,
    IconHistory,
    IconLogin,
    IconLogout,
    IconProgressCheck,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useAuth from '@/hooks/useAuth';
import { IGreenWashingUser, IPrompt } from '@/types';
import Chip from '@/components/Chip/Chip';
import UserPhotoPlaceholder from '@/components/UserPhotoPlaceholder/UserPhotoPlaceholder';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface ProfileMenuProps {
    userInfo: IGreenWashingUser | null;
    handlePopUp: () => void;
}

function NavBar({
    userInfo,
    handlePopUp,
}: ProfileMenuProps): React.ReactElement {
    const { user, logout } = useAuth();
    const { push, pathname, query, events } = useRouter();
    const isCounterMinus = Number(userInfo?.counter?.toFixed(0)) <= 0;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activePage, setActivePage] = useState<string>('/');
    const ref = useRef(null);
    useOnClickOutside(ref, (event: MouseEvent | TouchEvent) => {
        const target = event.target as Element;
        if (
            target &&
            Array.from(target.classList).some((el) => {
                const element = el as string;
                return element.includes('hamburger');
            })
        ) {
            return;
        }
        setIsOpen(false);
    });

    const handleLogout = async () => {
        await logout?.();
        push('/login');
    };

    const getActiveList = () => {
        if (pathname === '/') {
            setActivePage('/');
        } else if (pathname === '/history') {
            setActivePage(`/history&order=${query.order}`);
        }
        return;
    };

    useEffect(() => {
        events.on('routeChangeComplete', () => {
            getActiveList();
        });
    }, [events, getActiveList]);

    if (!user) {
        return (
            <li
                className={classes.li}
                onClick={() => {
                    setIsOpen(!isOpen);
                    push('/login');
                }}
            >
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
                className={clsx(classes.hamburger, 'hamburgerWrapper')}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <Image
                    priority={true}
                    className="hamburger"
                    src={'/svg/hamburger.svg'}
                    alt={'Logo'}
                    width={36}
                    height={36}
                />
            </div>
            <div
                className={classes.logo}
                onClick={() => push('https://www.greenifs.ai/')}
            >
                <Image
                    priority={true}
                    src={'/svg/logo.svg'}
                    alt={'Logo'}
                    width={105}
                    height={30}
                />
            </div>
            <div
                ref={ref}
                className={clsx(classes.containerList, isOpen && classes.open)}
            >
                <ul className={classes.ul}>
                    <li
                        className={clsx(
                            classes.subItemPost,
                            classes.subItem,
                            activePage === '/' && classes.active
                        )}
                        onClick={() => {
                            setIsOpen(false);
                            push('/');
                        }}
                    >
                        <IconCirclePlus color="#091F3D" size={18} />
                        <p>New post</p>
                    </li>
                    <li
                        className={clsx(
                            classes.subItemPost,
                            classes.subItem,
                            classes.subHistory
                        )}
                    >
                        <IconHistory
                            color="#091F3D"
                            size={18}
                            strokeWidth={2}
                        />
                        <p>History</p>
                    </li>
                    <ul className={classes.historyUl}>
                        {userInfo?.history ? (
                            userInfo?.history?.map(
                                (
                                    prompt: IPrompt,
                                    index: number
                                ): React.ReactElement => {
                                    return (
                                        <li
                                            className={clsx(
                                                classes.subItemPrompt,
                                                activePage ===
                                                    `/history&order=${index}` &&
                                                    classes.active
                                            )}
                                            key={
                                                prompt.userId +
                                                prompt.unparsedResponse +
                                                prompt.date
                                            }
                                            onClick={() => {
                                                setIsOpen(false);
                                                push(`/history?order=${index}`);
                                            }}
                                        >
                                            {prompt.request}
                                        </li>
                                    );
                                }
                            )
                        ) : (
                            <li className={classes.previousPrompts}>
                                No previous prompts
                            </li>
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
                            setIsOpen(false);
                            if (pathname === '/history') {
                                push('/');
                                return;
                            }
                            if (isCounterMinus) handlePopUp();
                        }}
                    >
                        <p>
                            <IconProgressCheck color="#091F3D" size={18} />
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
                        <div className={classes.subItemProfileInfo}>
                            <p className={classes.subItemProfileInfoName}>
                                {user.name}
                            </p>
                            <p className={classes.subItemProfileInfoEmail}>
                                {user.email || ''}
                            </p>
                        </div>
                    </li>
                    <li
                        className={clsx(classes.subItemPost, classes.subItem)}
                        onClick={() => {
                            setIsOpen(false);
                            handlePopUp();
                        }}
                    >
                        <IconCreditCard color="#091F3D" size={20} />
                        <p>Subscription</p>
                    </li>
                    <li
                        className={clsx(classes.subItemPost, classes.subItem)}
                        onClick={() => {
                            setIsOpen(false);
                            handleLogout();
                        }}
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
