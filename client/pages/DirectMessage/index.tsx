import React, { useCallback, useEffect, useRef } from 'react';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IDM } from '@typings/db';
import fetcher from '@utils/fetcher';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import makeChatSection from '@utils/makeChatSection';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  //:workspace의 멤버인 특정 :id 사용자 정보를 가져옴
  const { data: userData } = useSWR(`/api//workspaces/${workspace}/users/${id}`, fetcher);

  //:내 로그인 정보를 가져옴, 로그인 되어있지 않으면 false
  const { data: myData } = useSWR('/api/users', fetcher);

  //:workspace 내부의 :id와 나눈 dm을 가져옴
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const [chat, onChangeChat, setChat] = useInput('');
  const scrollbarRef = useRef(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim()) {
        //:workspace 내부의 :id와 나눈 dm을 저장
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, { content: chat })
          .then(() => {
            mutateChat();
            setChat('');
          })
          .catch((error) => {
            console.dir(error);
            toast.error(error.response?.data);
          });
      }
    },
    [chat],
  );

  const chatSections = makeChatSection(chatData ? chatData.flat().reverse() : []);

  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}
          alt={userData.nickname}
        />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList
        chatSections={chatSections}
        scrollbarRef={scrollbarRef}
        setSize={setSize}
        isEmpty={isEmpty}
        isReachingEnd={isReachingEnd}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
      <ToastContainer />
    </Container>
  );
};

export default DirectMessage;
