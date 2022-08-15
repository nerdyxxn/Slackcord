import React, { FC, useCallback } from 'react';
import gravatar from 'gravatar';
import axios from 'axios';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import {
  CloseModalButton,
  CreateMenu,
  ProfileModal,
  LogOutButton,
  ProfilePopupWrapper,
} from '@components/SideBar/ProfilePopup/styles';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
}

const ProfilePopup: FC<Props> = ({ show, onCloseModal }) => {
  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', { withCredentials: true })
      .then(() => {
        mutate();
      })
      .catch((error) => {
        console.dir(error);
        toast.error(error.response?.data);
      });
  }, [mutate]);

  if (!show || !userData) return null;

  return (
    <CreateMenu onClick={onCloseModal}>
      <ProfilePopupWrapper onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        <ProfileModal>
          <img
            src={gravatar.url(userData.email, { s: '36px', d: 'retro' })}
            alt={userData.nickname}
          />
          <div>
            <span id="profile-name">{userData.nickname}</span>
            <span id="profile-active">Active</span>
          </div>
        </ProfileModal>
        <LogOutButton onClick={onLogout}>Logout</LogOutButton>
      </ProfilePopupWrapper>
    </CreateMenu>
  );
};

export default ProfilePopup;
