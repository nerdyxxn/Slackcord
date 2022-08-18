import React, { VFC, useCallback, useState } from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import {
  HeadphoneButton,
  MediaWrapper,
  MicButton,
  ProfileWrapper,
  UserWrapper,
  CameraButton,
} from '@components/SideBar/Profile/styles';
import ProfilePopup from '@components/SideBar/ProfilePopup';
import Avatar from 'boring-avatars';

const Profile: VFC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  //유저 프로필 메뉴 Toggle
  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <ProfileWrapper>
      <UserWrapper onClick={onClickUserProfile}>
        <div className="profile-img">
          <Avatar
            size={28}
            name={userData.email}
            variant="beam"
            colors={['#E2F0D7', '#DFFDA7', '#6ECF42', '#31A252', '#0F7527']}
          />
        </div>
        <span>{userData.nickname}</span>
        {showUserMenu && <ProfilePopup show={showUserMenu} onCloseModal={onClickUserProfile} />}
      </UserWrapper>
      <MediaWrapper>
        <MicButton />
        <HeadphoneButton />
        <CameraButton />
      </MediaWrapper>
    </ProfileWrapper>
  );
};

export default Profile;
