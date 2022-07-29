import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { Container, Header } from '@pages/Channel/styles';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';

const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const [chat, onChangeChat, setChat] = useInput('');
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log('Submit');
    setChat('');
  }, []);

  return (
    <Container>
      <Header>채널!</Header>
      <ChatList />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
        placeholder={`Message #${channel}`}
      />
    </Container>
  );
};

export default Channel;
