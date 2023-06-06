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
                <ProfileMenu userInfo={userInfo} />
            </ul>
        </nav>
    );
};

export default NavBar;
