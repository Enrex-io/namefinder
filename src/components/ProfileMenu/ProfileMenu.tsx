import React, { useState } from 'react';
import classes from './ProfileMenu.module.scss';
import {
    IconCreditCard,
    IconHistory,
    IconLogin,
    IconLogout,
} from '@tabler/icons-react';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Chip from '../Chip/Chip';
import UserPhotoPlaceholder from '../UserPhotoPlaceholder/UserPhotoPlaceholder';
import { IGreenWashingUser } from '@/types';

interface ProfileMenuProps {
    userInfo: IGreenWashingUser | null;
    handlePopUp: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userInfo, handlePopUp }) => {
    const { push } = useRouter();
    const handleHandleClickLi = () => setIsSubMenuShown(!isSubmenuShown);
    const { user, logout } = useAuth();
    const [isSubmenuShown, setIsSubMenuShown] = useState(false);

    const handleLogout = () => {
        logout?.();
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

    const isCounterMinus = Number(userInfo?.counter?.toFixed(0)) <= 0;

    return (
        <div className={clsx(classes.container, classes.navbarContainer)}>
            <div className={classes.profileMenu}>
                <li className={classes.logo} onClick={() => push('/')}>
                    <Image
                        priority={true}
                        src={'/images/logo.png'}
                        alt={'Logo'}
                        width={150}
                        height={45}
                    />
                </li>
                <li className={classes.li} onClick={handleHandleClickLi}>
                    <div className={classes.image_wrapper}>
                        <>
                            {user.photo ? (
                                <Image
                                    width={35}
                                    height={35}
                                    src={user.photo}
                                    className={classes.profile}
                                    alt="profile photo"
                                />
                            ) : (
                                <UserPhotoPlaceholder userName={user.name} />
                            )}
                            <Image
                                src={'/svg/settings.svg'}
                                alt={'Settings'}
                                width={25}
                                height={25}
                            />
                        </>
                    </div>
                    <ul
                        className={clsx(classes.submenu, {
                            [classes.submenuShown]: isSubmenuShown,
                        })}
                    >
                        <li
                            className={clsx(
                                classes.subItem,
                                classes.bottomDivider
                            )}
                        >
                            <p className={classes.semibold}>
                                {user.email || user.name}
                            </p>
                        </li>
                        <li
                            className={clsx(
                                classes.subItem,
                                classes.bottomDivider,
                                isCounterMinus && classes.freeChecks
                            )}
                            onClick={() => isCounterMinus && handlePopUp()}
                        >
                            <Chip
                                label={
                                    isCounterMinus
                                        ? '0'
                                        : String(userInfo?.counter?.toFixed(0))
                                }
                                className={classes.checksChip}
                            />
                            <p>Free checks</p>
                        </li>
                        <li
                            className={classes.subItem}
                            onClick={() => isCounterMinus && handlePopUp()}
                        >
                            <IconCreditCard color="#091F3D" size={20} />
                            <p>Subscription</p>
                        </li>
                        <li
                            className={classes.subItem}
                            onClick={() => push('/history')}
                        >
                            <IconHistory color="#091F3D" size={20} />
                            <p>History</p>
                        </li>
                        <li className={classes.subItem} onClick={handleLogout}>
                            <IconLogout color="#091F3D" size={20} />
                            <p>Logout</p>
                        </li>
                    </ul>
                </li>
            </div>
        </div>
    );
};

export default ProfileMenu;
