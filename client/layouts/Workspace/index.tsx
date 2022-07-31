import React, { VFC, useCallback, useState, useEffect } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import gravatar from 'gravatar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import { IUser, IChannel } from '@typings/db';
import CreateChannelModal from '@components/Modal/ChannelCreate';
import CreateWorkspaceModal from '@components/Modal/WorkspaceCreate';
import { Navigate, useParams } from 'react-router';
import InviteWorkspaceModal from '@components/Modal/InviteWorkspaceModal';
import ChannelList from '@components/ChannelList';
import DMList from '@components/DMList';
import useSocket from '@hooks/useSocket';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const { workspace } = useParams<{ workspace: string; channel: string }>();

  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  //:workspace 내부의 내가 속해있는 채널 리스트를 가져옴
  const { data: channelData, mutate: mutateChannel } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  //:workspace 내부의 멤버 목록을 가져옴
  const { data: memberData } = useSWR<IUser[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const [socket, disconnect] = useSocket(workspace);

  useEffect(() => {
    if (channelData && userData && socket) {
      console.log(socket);
      // 워크스페이스, 채널이 로딩 완료되었을 때 서버에 로그인했음을 알리는 이벤트
      socket.emit('login', { id: userData.id, channels: channelData.map((v) => v.id) });
    }
  }, [socket, channelData, userData]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

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

  //유저 프로필 메뉴 Toggle
  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
  }, []);

  // 워크스페이스 추가 Modal
  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  // Modal 메뉴 닫기
  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  // 채널 생성
  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  // 사용자 초대 Modal
  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  // 로그아웃 성공
  if (userData === false) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header>
        {userData && (
          <RightMenu>
            <span onClick={onClickUserProfile}>
              <ProfileImg
                src={gravatar.url(userData.email, { s: '28px', d: 'retro' })}
                alt={userData.nickname}
              />
              {showUserMenu && (
                <Menu
                  show={showUserMenu}
                  style={{ right: 0, top: 38 }}
                  onCloseModal={onClickUserProfile}>
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
                </Menu>
              )}
            </span>
          </RightMenu>
        )}
      </Header>
      <button onClick={onLogout}>Logout</button>
      <WorkspaceWrapper>
        <Workspaces>
          {userData?.Workspaces.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>{workspace}</WorkspaceName>
          <MenuScroll>
            <Menu
              show={showWorkspaceModal}
              onCloseModal={toggleWorkspaceModal}
              style={{ top: 95, left: 80 }}>
              <WorkspaceModal>
                <h2>{workspace}</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>Logout</button>
              </WorkspaceModal>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />} />
            <Route path="/dm/:id" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <CreateWorkspaceModal
        show={showCreateWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
      />
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
        setShowWorkspaceModal={setShowWorkspaceModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <ToastContainer />
    </div>
  );
};

export default Workspace;
