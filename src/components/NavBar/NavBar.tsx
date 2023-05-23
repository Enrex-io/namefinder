import React from 'react';
import classes from "./NavBar.module.scss";
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const NavBar = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.ul}>
        {/* <li className={classes.li}>
          <span className={classes.materialIconsOutlined}><IconNotification /></span>
        </li> */}
        <ProfileMenu />
      </ul>
    </nav>
  );
};

export default NavBar;