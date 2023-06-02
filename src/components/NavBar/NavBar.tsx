import React from 'react';
import classes from './NavBar.module.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { IGreenWashingUser } from '@/types';

interface NavBarProps {
    userInfo: IGreenWashingUser | null;
    handlePopUp: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ userInfo, handlePopUp }) => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.ul}>
                <ProfileMenu userInfo={userInfo} handlePopUp={handlePopUp} />
            </ul>
        </nav>
    );
};

export default NavBar;
