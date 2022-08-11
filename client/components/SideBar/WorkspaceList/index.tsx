import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { AddButton, WorkspaceButton } from '@components/SideBar/WorkspaceList/styles';
import CreateWorkspaceModal from '@components/Modal/WorkspaceCreate';

const WorkspaceList = () => {
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  // 워크스페이스 추가 Modal
  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  // Modal 메뉴 닫기
  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
  }, []);

  return (
    <div>
      {userData?.Workspaces.map((ws) => {
        return (
          <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
            <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
          </Link>
        );
      })}
      <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
      <CreateWorkspaceModal
        show={showCreateWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
      />
    </div>
  );
};

export default WorkspaceList;
