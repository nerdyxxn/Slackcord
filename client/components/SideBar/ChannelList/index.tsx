import React, { useCallback, useState } from 'react';
import { AddIcon, CollapseButton, CollapseWrapper } from '@components/SideBar/ChannelList/styles';
import useSWR from 'swr';
import { useParams } from 'react-router';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import EachChannel from '@components/Channel/EachChannel';
import CreateChannelModal from '@components/Modal/ChannelCreate';

const ChannelList = () => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: channelData } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  // 채널 생성
  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  // Modal 메뉴 닫기
  const onCloseModal = useCallback(() => {
    setShowCreateChannelModal(false);
  }, []);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <div>
      <CollapseWrapper>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
          <span>CHATTING CHANNELS</span>
        </CollapseButton>
        <AddIcon onClick={onClickAddChannel} />
      </CollapseWrapper>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            return <EachChannel key={channel.id} channel={channel} />;
          })}
      </div>
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
    </div>
  );
};

export default ChannelList;
