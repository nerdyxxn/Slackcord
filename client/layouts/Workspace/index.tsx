import React, { FC, useCallback, useState } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import { IUser } from '@typings/db';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, { withCredentials: true })
      .then((response) => {
        mutate(false, false);
      })
      .catch();
  }, []);

  // 유저 프로필 메뉴 Toggle
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  // 워크스페이스 생성
  const onClickCreateWorkspace = useCallback(() => {}, []);

  // 로그아웃 성공
  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(userData.email, { s: '28px', d: 'retro' })}
              alt={userData.nickname}
            />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} onCloseModal={onClickUserProfile}>
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
                <LogOutButton>LogOut</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>Logout</button>
      <WorkspaceWrapper>
        <Workspaces></Workspaces>
        <Channels>
          <WorkspaceName>워크스페이스 이름</WorkspaceName>
          <MenuScroll>메뉴자리</MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel" element={<Channel />} />
            <Route path="/dm" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
