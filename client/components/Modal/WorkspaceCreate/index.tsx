import React, { VFC, useCallback, useState } from 'react';
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import { Button, Input, Label } from '@components/Modal/WorkspaceCreate/styles';
import axios from 'axios';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import { toast } from 'react-toastify';
import fetcher from '@utils/fetcher';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateWorkspaceModal: (flag: boolean) => void;
}

const CreateWorkspaceModal: VFC<Props> = ({ show, onCloseModal, setShowCreateWorkspaceModal }) => {
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const { data, error, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  // 워크스페이스 생성
  const onCreateWorkspace = useCallback(
    (e) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post(
          '/api/workspaces',
          { workspace: newWorkspace, url: newUrl },
          { withCredentials: true },
        )
        .then(() => {
          mutate();
          setShowCreateWorkspaceModal(false);
          setNewWorkspace('');
          setNewUrl('');
          toast.success('워크스페이스가 생성되었습니다!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    },
    [newWorkspace, newUrl],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateWorkspace}>
        <Label id="workspace-label">
          <span>워크스페이스 이름</span>
          <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
        </Label>
        <Label id="workspace-url-label">
          <span>워크스페이스 url</span>
          <Input id="workspace-url" value={newUrl} onChange={onChangeNewUrl} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;
