import React, { useState } from 'react';
import classes from './ProfileMenu.module.scss';
import {
    IconLogout,
    IconLogin,
    IconCreditCard,
    IconHistory,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Chip from '../Chip/Chip';
import UserPhotoPlaceholder from '../UserPhotoPlaceholder/UserPhotoPlaceholder';
import { IGreenWashingUser } from '@/types';

interface ProfileMenuProps {
    userInfo: IGreenWashingUser | null;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userInfo }) => {
    const { push } = useRouter();
    const { user, signout } = useAuth();
    const [isSubmenuShown, setIsSumbenuShown] = useState(false);

    const handleMouseEnterLi = () => setIsSumbenuShown(true);
    const handleMouseLeaveUl = () =>
        setTimeout(() => setIsSumbenuShown(false), 350);

    const handleLogout = () => {
        signout?.();
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
        <li className={classes.li} onMouseEnter={handleMouseEnterLi}>
            {user.photo ? (
                <Image
                    width={40}
                    height={40}
                    src={user.photo}
                    className={classes.profile}
                    alt="profile photo"
                />
            ) : (
                <UserPhotoPlaceholder userName={user.name} />
            )}
            <ul
                className={clsx(classes.submenu, {
                    [classes.submenuShown]: isSubmenuShown,
                })}
                onMouseLeave={handleMouseLeaveUl}
            >
                <li className={clsx(classes.subItem, classes.bottomDivider)}>
                    <p className={classes.semibold}>
                        {user.email || user.name}
                    </p>
                </li>
                <li className={clsx(classes.subItem, classes.bottomDivider)}>
                    <Chip
                        label={userInfo?.counter?.toFixed(0) || '0'}
                        className={classes.checksChip}
                    />
                    <p>Free checks</p>
                </li>
                <li className={classes.subItem}>
                    <IconCreditCard color="#091F3D" />
                    <p>Subscription</p>
                </li>
                <li className={classes.subItem}>
                    <IconHistory color="#091F3D" />
                    <p>History</p>
                </li>
                <li className={classes.subItem} onClick={handleLogout}>
                    <IconLogout color="#091F3D" />
                    <p>Logout</p>
                </li>
            </ul>
        </li>
    );
};

export default ProfileMenu;
