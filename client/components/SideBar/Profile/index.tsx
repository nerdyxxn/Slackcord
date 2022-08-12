import React from 'react';
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
} from './styles';

const Profile = () => {
  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  if (!userData) {
    return null;
  }

  return (
    <ProfileWrapper>
      <UserWrapper>
        <div className="profile-img">
          <img
            src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}
            alt={userData.nickname}
          />
        </div>
        <span>{userData.nickname}</span>
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
