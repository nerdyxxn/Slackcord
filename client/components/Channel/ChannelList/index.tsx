import React, { useCallback, useState } from 'react';
import { CollapseButton } from '@components/Channel/ChannelList/styles';
import useSWR from 'swr';
import { useParams } from 'react-router';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import EachChannel from '@components/Channel/EachChannel';

const ChannelList = () => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [channelCollapse, setChannelCollapse] = useState(false);

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: channelData } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <div>
      <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
        <i
          className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
          data-qa="channel-section-collapse"
          aria-hidden="true"
        />
        <span>Channels</span>
      </CollapseButton>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            return <EachChannel key={channel.id} channel={channel} />;
          })}
      </div>
    </div>
  );
};

export default ChannelList;
