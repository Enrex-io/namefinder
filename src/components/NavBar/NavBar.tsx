import React, { useRef, useState } from 'react';
import classes from './NavBar.module.scss';
import Image from 'next/image';
import {
    IconCirclePlus,
    IconCreditCard,
    IconHistory,
    IconLogin,
    IconLogout,
    IconProgressCheck,
    IconToggleRight,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useAuth from '@/hooks/useAuth';
import { IGreenWashingUser, IPrompt } from '@/types';
import Chip from '@/components/Chip/Chip';
import UserPhotoPlaceholder from '@/components/UserPhotoPlaceholder/UserPhotoPlaceholder';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import useWindowSize from '@/hooks/useWindowSize';

interface ProfileMenuProps {
    userInfo: IGreenWashingUser | null;
}

function NavBar({ userInfo }: ProfileMenuProps): React.ReactElement {
    const { user, logout } = useAuth();
    const { push, pathname, query, reload } = useRouter();
    const isCounterMinus = Number(userInfo?.counter?.toFixed(0)) <= 0;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef(null);
    const { height } = useWindowSize();
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

    const arr: IPrompt[] = userInfo?.history?.concat()?.reverse() || [];
    return (
        <nav className={clsx(classes.container, isOpen && classes.open)}>
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
            <div className={classes.logo}>
                <Image
                    priority={true}
                    src={'/svg/logo.svg'}
                    alt={'Logo'}
                    width={105}
                    height={30}
                    onClick={() => push('https://www.greenifs.ai/')}
                />
            </div>
            <div
                ref={ref}
                style={{
                    height: `${(height || 0) - 65.8}px`,
                }}
                className={clsx(classes.containerList, isOpen && classes.open)}
            >
                <ul className={classes.ul}>
                    <li
                        className={clsx(
                            classes.subItemPost,
                            classes.subItem,
                            pathname === '/' && classes.active,
                            classes.subHover
                        )}
                        onClick={() => {
                            setIsOpen(false);
                            const el =
                                (
                                    document.querySelector(
                                        '.analyze'
                                    ) as HTMLElement
                                )?.innerHTML?.includes('Your post') || false;
                            if (el && pathname === '/') {
                                reload();
                                return;
                            }
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
                        {arr[0] ? (
                            arr.map(
                                (
                                    prompt: IPrompt,
                                    index: number
                                ): React.ReactElement => {
                                    const order = arr.length - 1 - index;
                                    const isActiveHistoryItem =
                                        pathname === `/history` &&
                                        Number(query.order) === order;
                                    return (
                                        <li
                                            className={clsx(
                                                classes.subItemPrompt,
                                                isActiveHistoryItem &&
                                                    classes.active,
                                                classes.subHover
                                            )}
                                            key={
                                                prompt.userId +
                                                prompt.unparsedResponse +
                                                prompt.date
                                            }
                                            onClick={() => {
                                                setIsOpen(false);
                                                push(`/history?order=${order}`);
                                            }}
                                        >
                                            {prompt.request}
                                        </li>
                                    );
                                }
                            )
                        ) : (
                            <li className={classes.noPreviousPrompts}>
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
                                          userInfo?.counter?.toFixed(0) || '↺'
                                      )
                            }
                            className={clsx(
                                classes.checksChip,
                                !isCounterMinus &&
                                    !userInfo?.counter?.toFixed(0) &&
                                    classes.spinAnimation
                            )}
                        />
                    </li>
                    <li
                        className={clsx(
                            classes.subItemPost,
                            classes.subItem,
                            classes.subItemProfile,
                            classes.subHover
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
                        className={clsx(
                            classes.subItemPost,
                            classes.subItem,
                            classes.subHover,
                            pathname === '/subscription' && classes.active
                        )}
                        onClick={() => {
                            push('/subscription');
                        }}
                    >
                        <IconCreditCard color="#091F3D" size={20} />
                        <p>Subscription</p>
                    </li>
                    <li
                        className={clsx(
                            classes.subItemPost,
                            classes.subItem,
                            classes.subHover
                        )}
                        onClick={() => {
                            push('https://greenifs.ai');
                        }}
                    >
                        <IconToggleRight color="#091F3D" size={20} />
                        <p>About Greenifs</p>
                    </li>
                    <li
                        className={clsx(
                            classes.subItemPost,
                            classes.subItem,
                            classes.subHover
                        )}
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
