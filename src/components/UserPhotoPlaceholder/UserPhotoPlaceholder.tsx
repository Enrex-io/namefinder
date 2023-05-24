import React from 'react';
import Image from 'next/image';
import classes from './UserPhotoPlaceholder.module.scss'
import clsx from 'clsx';

interface UserPhotoPlaceholderProps {
  userName: string | null;
}

const UserPhotoPlaceholder: React.FC<UserPhotoPlaceholderProps> = ({ userName }) => {
  if (!userName) {
    return (
      <div>
        <Image width={40} height={40} src={'/images/profile.png'} className={classes.profile} alt="profile photo" />
      </div>
    );
  }

  return <div className={clsx(classes.profile, classes.profilePlaceholder)}>{userName.slice(0, 1)}</div>
};

export default UserPhotoPlaceholder;