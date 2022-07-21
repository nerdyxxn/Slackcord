import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '@components/Modal';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import { Label, Input, Button } from '@components/Modal/InviteWorkspaceModal/styles';
import { IUser, IChannel } from '@typings/db';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}

const InviteWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [newMember, onChangeNewMember, setNewMember] = useInput('');

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { mutate: mutateMember } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();

      if (!newMember || !newMember.trim()) {
        return;
      }

      axios
        .post(`/api/workspaces/${workspace}/members`, { email: newMember })
        .then((response) => {
          mutateMember(response.data, false);
          setShowInviteWorkspaceModal(false);
          setNewMember('');
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
    [workspace, newMember],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
