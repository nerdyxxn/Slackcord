import React, { FC, useCallback } from 'react';
import { Button, Form, Input, Label } from './styles';
import { useParams } from 'react-router';
import useSWR from 'swr';
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: FC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const [newMember, onChangeNewMember, setNewmember] = useInput('');

  const { data: userData } = useSWR<IUser>('/api/users', fetcher);

  //:workspace 내부의 :channel 멤버 목록을 가져옴
  const { mutate: mutateMembers } = useSWR<IUser[]>(
    userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  //:workspace 내부의 :channel로 멤버 초대
  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/${workspace}/channels/${channel}/members`, { email: newMember })
        .then(() => {
          mutateMembers();
          setShowInviteChannelModal(false);
          setNewmember('');
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
    [workspace, channel, newMember, mutateMembers, setNewmember, setShowInviteChannelModal],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Form onSubmit={onInviteMember}>
        <Label>
          <span>채널 멤버 초대</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} placeholder="email" />
        </Label>
        <Button type="submit">초대하기</Button>
      </Form>
    </Modal>
  );
};

export default InviteChannelModal;
