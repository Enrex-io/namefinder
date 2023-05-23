import React from 'react';
import classes from "./ProfileMenu.module.scss";
import { IconLogout, IconSettings, IconLogin } from '@tabler/icons-react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const ProfileMenu = () => {
  const { push } = useRouter();
  const { user, signout } = useAuth();

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
    <li className={classes.li}>
      <Image width={40} height={40} src={user.photo || '/images/profile.png'} className={classes.profile} alt="profile photo" />
      <ul className={classes.submenu}>
        <li className={clsx(classes.subItem, classes.bottomDivider)}>
          <IconSettings color='#091F3D' />
          <p>Profile settings</p>
        </li>
        <li className={classes.subItem} onClick={() => signout?.()}>
          <IconLogout color='#091F3D'/>
          <p>Logout</p>
        </li>
      </ul>
    </li>
  );
};

export default ProfileMenu;