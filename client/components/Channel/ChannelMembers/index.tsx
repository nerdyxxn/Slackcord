import React, { useEffect, useState } from 'react';
import { ChannelMembersWrapper, Members } from './styles';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSocket from '@hooks/useSocket';

const ChannelMembers = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  //:내 로그인 정보를 가져옴, 로그인 되어있지 않으면 false
  const { data: userData } = useSWR<IUser>(`/api/users`, fetcher);

  //:workspace 내부의 :channel의 멤버 목록을 가져옴
  const { data: channelMembersData } = useSWR<IUser[]>(
    userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [socket] = useSocket(channel);

  useEffect(() => {
    console.log('channel 변경 :::::::::', channel);
    setOnlineList([]);
  }, [channel]);

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
      <p>Online</p>
      {channelMembersData?.map((member) => {
        return <Members key={member.id}>{member.nickname}</Members>;
      })}
    </ChannelMembersWrapper>
  );
};

export default ChannelMembers;
