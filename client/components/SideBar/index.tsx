import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Workspaces,
  Channels,
  WorkspaceTitle,
  MenuList,
  AddUser,
} from '@components/SideBar/styles';

import WorkspaceList from '@components/SideBar/WorkspaceList/index';
import ChannelList from '@components/SideBar/ChannelList';
import DMList from '@components/SideBar/DMList';
import InviteWorkspaceModal from '@components/Modal/InviteWorkspaceModal';

const SideBar = () => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);

  // 사용자 초대 Modal
  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  // Modal 메뉴 닫기
  const onCloseModal = useCallback(() => {
    setShowInviteWorkspaceModal(false);
  }, []);

  return (
    <div>
      <Workspaces>
        <WorkspaceList />
      </Workspaces>
      <Channels>
        <WorkspaceTitle>
          <span>{workspace}</span>
          <AddUser onClick={onClickInviteWorkspace} />
        </WorkspaceTitle>
        <MenuList>
          <ChannelList />
          <DMList />
        </MenuList>
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
