import React from 'react';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';

function DirectMessage() {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  //:workspace의 멤버인 특정 :id 사용자 정보를 가져옴
  const { data: userData } = useSWR(`/api//workspaces/${workspace}/users/${id}`, fetcher);

  //:내 로그인 정보를 가져옴, 로그인 되어있지 않으면 false
  const { data: myData } = useSWR('/api/users', fetcher);

  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt="" />
      </Header>
      {/* <ChatList/>
      <ChatBox/> */}
    </Container>
  );
}

export default DirectMessage;
