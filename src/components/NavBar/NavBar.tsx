import React from 'react';
import classes from './NavBar.module.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { IGreenWashingUser } from '@/types';

interface NavBarProps {
    userInfo: IGreenWashingUser | null;
}

const NavBar: React.FC<NavBarProps> = ({ userInfo }) => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.ul}>
                {/* <li className={classes.li}>
          <span className={classes.materialIconsOutlined}><IconNotification /></span>
        </li> */}
                <ProfileMenu userInfo={userInfo} />
            </ul>
        </nav>
    );
};

export default NavBar;
