import React, { FC, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { CollapseButton } from '@components/DMList/styles';
import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';

interface Props {
  userData?: IUser;
}

const DMList: FC<Props> = ({ userData }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();

  const { data: memberData } = useSWR<IUserWithOnline>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <div>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            typeof="caret-right"
            aria-hidden="true"></i>
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div></div>
    </div>
  );
};

export default DMList;
