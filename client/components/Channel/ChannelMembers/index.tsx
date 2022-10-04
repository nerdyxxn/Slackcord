import React, { useEffect, useState } from 'react';
import { ChannelMembersWrapper, Members, Online, Offline } from './styles';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import Avatar from 'boring-avatars';
import useSocket from '@hooks/useSocket';

const ChannelMembers = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [socket] = useSocket(workspace);

  //:내 로그인 정보를 가져옴, 로그인 되어있지 않으면 false
  const { data: userData } = useSWR<IUser>(`/api/users`, fetcher);

  //:workspace 내부의 :channel의 멤버 목록을 가져와서 온라인 상태 확인
  const { data: channelMembersData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  // useEffect(() => {
  //   console.log('채널 변경 ::::::::::::', channel);
  //   setOnlineList([]);
  // }, [channel]);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
    return () => {
      socket?.off('onlineList');
    };
  }, [socket]);

  return (
    <ChannelMembersWrapper>
      <p>CHANNEL MEMBERS</p>
      {channelMembersData?.map((member) => {
        const isOnline = onlineList.includes(member.id);
        return (
          <div key={member.id}>
            <Members>
              <Avatar
                size={28}
                name={member.email}
                variant="beam"
                colors={['#E2F0D7', '#DFFDA7', '#6ECF42', '#31A252', '#0F7527']}
              />
              {isOnline ? <Online /> : <Offline />}
              <span>{member.nickname}</span>
            </Members>
          </div>
        );
      })}
    </ChannelMembersWrapper>
  );
};

export default ChannelMembers;
