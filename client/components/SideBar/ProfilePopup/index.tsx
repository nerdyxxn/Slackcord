import React, { FC, useCallback } from 'react';
import Avatar from 'boring-avatars';
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
        document.location.href = '/login';
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
          <Avatar
            size={79}
            name={userData.email}
            variant="beam"
            colors={['#E2F0D7', '#DFFDA7', '#6ECF42', '#31A252', '#0F7527']}
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
