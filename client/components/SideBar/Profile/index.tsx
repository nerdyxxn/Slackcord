import React, { VFC, useCallback, useState } from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  HeadphoneButton,
  MediaWrapper,
  MicButton,
  ProfileWrapper,
  UserWrapper,
  CameraButton,
} from '@components/SideBar/Profile/styles';
import ProfilePopup from '@components/SideBar/ProfilePopup';

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
          <img
            src={gravatar.url(userData.email, { s: '28px', d: 'retro' })}
            alt={userData.nickname}
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
