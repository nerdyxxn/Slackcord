import React, { FC, useEffect } from 'react';
import { IChannel, IUser } from '@typings/db';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface Props {
  channel: IChannel;
}

const EachChannel: FC<Props> = ({ channel }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const date = localStorage.getItem(`${workspace}-${channel.name}`) || 0;

  // :workspace 내부의 :channel의 안 읽은 채팅 유무를 가져옴
  const { data: count, mutate } = useSWR<number>(
    userData ? `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` : null,
    fetcher,
  );

  useEffect(() => {
    if (location.pathname === `/workspace/${workspace}/channels/${channel.name}`) {
      mutate(0);
    }
  }, [mutate, location.pathname, workspace, channel]);

  return (
    <NavLink
      key={channel.name}
      className={({ isActive }) => (isActive ? 'selected' : '')}
      to={`/workspace/${workspace}/channel/${channel.name}`}>
      <span className={count !== undefined && count > 0 ? 'bold' : undefined}>
        # {channel.name}
      </span>
      {count !== undefined && count > 0 && <span className="count">{count}</span>}
    </NavLink>
  );
};

export default EachChannel;
