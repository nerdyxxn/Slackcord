import React, { useEffect, VFC } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Offline, Online } from './styles';

interface Props {
  member: IUser;
  isOnline: boolean;
}

const EachDM: VFC<Props> = ({ member, isOnline }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const date = localStorage.getItem(`${workspace}-${member.id}`) || 0;

  // :workspace 내부의 :id가 보낸 안 읽은 채팅 수를 가져옴
  const { data: count, mutate } = useSWR<number>(
    userData ? `/api/workspaces/${workspace}/dms/${member.id}/unreads?after=${date}` : null,
    fetcher,
  );

  useEffect(() => {
    if (location.pathname === `/workspace/${workspace}/dm/${member.id}`) {
      mutate(0);
    }
  }, [mutate, location.pathname, workspace, member]);

  return (
    <NavLink
      key={member.id}
      className={({ isActive }) => (isActive ? 'selected' : '')}
      to={`/workspace/${workspace}/dm/${member.id}`}>
      {isOnline ? <Online /> : <Offline />}
      <span className={count && count > 0 ? 'bold' : undefined}>{member.nickname}</span>
      {member.id === userData?.id && <span> (나)</span>}
      {(count && count > 0 && <span className="count">{count}</span>) || null}
    </NavLink>
  );
};

export default EachDM;
