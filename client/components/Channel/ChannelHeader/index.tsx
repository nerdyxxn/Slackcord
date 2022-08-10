import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import InviteChannelModal from '@components/Modal/InviteChannelModal';
import { Header } from '@components/Channel/ChannelHeader/styles';

const ChannelHeader = () => {
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  //:내 로그인 정보를 가져옴, 로그인 되어있지 않으면 false
  const { data: userData } = useSWR<IUser>(`/api/users`, fetcher);

  //:workspace 내부의 :channel의 멤버 목록을 가져옴
  const { data: channelMembersData } = useSWR<IUser[]>(
    userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  // 클릭 시 유저 초대 Modal 오픈
  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);

  // Modal 닫기
  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);

  return (
    <Header>
      <span># {channel}</span>
      <div className="header-right">
        <span>{channelMembersData?.length}</span>
        <button
          onClick={onClickInviteChannel}
          className="c-button-unstyled p-ia__view_header__button"
          aria-label="Add people to #react-native"
          data-sk="tooltip_parent"
          type="button">
          <i
            className="c-icon p-ia__view_header__button_icon c-icon--add-user"
            aria-hidden="true"
          />
        </button>
      </div>
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </Header>
  );
};

export default ChannelHeader;
