import React from 'react';
import { useParams } from 'react-router-dom';
import { Workspaces, Channels, WorkspaceTitle, MenuList } from '@components/SideBar/styles';

import WorkspaceList from '@components/SideBar/WorkspaceList/index';
import ChannelList from '@components/SideBar/ChannelList';
import DMList from '@components/SideBar/DMList';

const SideBar = () => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();

  return (
    <div>
      <Workspaces>
        <WorkspaceList />
      </Workspaces>
      <Channels>
        <WorkspaceTitle>{workspace}</WorkspaceTitle>
        <MenuList>
          <ChannelList />
          <DMList />
        </MenuList>
      </Channels>
    </div>
  );
};

export default SideBar;
