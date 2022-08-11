import React from 'react';
import { useParams } from 'react-router-dom';
import { Workspaces, Channels, WorkspaceTitle, MenuList } from '@components/SideBar/styles';
import ChannelList from '@components/Sidebar/ChannelList';
import DMList from '@components/Sidebar/DMList';
import WorkspaceList from '../SideBar/WorkspaceList/index';

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
