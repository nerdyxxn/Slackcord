import React, { FC, useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { CollapseButton } from '@components/DMList/styles';
import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import EachDM from '@components/EachDM';
import useSocket from '@hooks/useSocket';

const DMList = () => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: memberData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [socket, disconnect] = useSocket(workspace);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  useEffect(() => {
    console.log('DMList : Workspace 변경!', workspace);
    setOnlineList([]);
  }, [workspace]);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
    //console.log('socket on dm', socket?.hasListeners('dm'), socket);
    return () => {
      //console.log('socket off dm', socket?.hasListeners('dm'));
      socket?.off('onlineList');
    };
  }, [socket]);

  return (
    <div>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!channelCollapse &&
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.id);
            return <EachDM key={member.id} member={member} isOnline={isOnline} />;
          })}
      </div>
    </div>
  );
};

export default DMList;
