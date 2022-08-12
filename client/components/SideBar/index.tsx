import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import {
  Workspaces,
  Channels,
  WorkspaceTitle,
  MenuList,
  AddUser,
  ProfileWrapper,
} from '@components/SideBar/styles';
import WorkspaceList from '@components/SideBar/WorkspaceList/index';
import ChannelList from '@components/SideBar/ChannelList';
import DMList from '@components/SideBar/DMList';
import InviteWorkspaceModal from '@components/Modal/InviteWorkspaceModal';
import gravatar from 'gravatar';

const SideBar = () => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);

  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  // 사용자 초대 Modal
  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  // Modal 메뉴 닫기
  const onCloseModal = useCallback(() => {
    setShowInviteWorkspaceModal(false);
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div>
      <Workspaces>
        <WorkspaceList />
      </Workspaces>
      <Channels>
        <div>
          <WorkspaceTitle>
            <span>{workspace}</span>
            <AddUser onClick={onClickInviteWorkspace} />
          </WorkspaceTitle>
          <MenuList>
            <ChannelList />
            <DMList />
          </MenuList>
        </div>
        <ProfileWrapper>
          <div className="profile-img">
            <img
              src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}
              alt={userData.nickname}
            />
          </div>
          <span>{userData.nickname}</span>
        </ProfileWrapper>
      </Channels>
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
    </div>
  );
};

export default SideBar;
