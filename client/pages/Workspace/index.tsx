import React, { VFC, useCallback, useState, useEffect } from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import { IUser, IChannel } from '@typings/db';
import fetcher from '@utils/fetcher';
import loadable from '@loadable/component';
import useSWR from 'swr';
import useSocket from '@hooks/useSocket';
import { Chats, WorkspaceWrapper } from '@pages/Workspace/styles';
import SideBar from '@components/SideBar';

const Channel = loadable(() => import('@components/Channel'));
const DirectMessage = loadable(() => import('@components/DirectMessage'));

const Workspace: VFC = () => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [socket, disconnect] = useSocket(workspace);

  const { data: userData, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  //:workspace 내부의 내가 속해있는 채널 리스트를 가져옴
  const { data: channelData, mutate: mutateChannel } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  // 워크스페이스, 채널이 로딩 완료되었을 때 서버에 로그인했음을 알리는 이벤트
  useEffect(() => {
    if (channelData && userData && socket) {
      console.log(socket);
      socket.emit('login', { id: userData.id, channels: channelData.map((v) => v.id) });
    }
  }, [socket, channelData, userData]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  // 로그아웃 성공
  if (userData === false) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <WorkspaceWrapper>
        <SideBar />
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />} />
            <Route path="/dm/:id" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
