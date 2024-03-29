import React, { useCallback, useEffect, useRef, useState, VFC } from 'react';
import { Container, ChannelContent, ChannelChat, DragOver } from './styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Navigate, useParams } from 'react-router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IChannel, IChat, IDM, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import ChannelHeader from '@components/Channel/ChannelHeader';
import ChannelMembers from '@components/Channel/ChannelMembers';
import ChatBox from '@components/Chat/ChatBox';
import ChatList from '@components/Chat/ChatList';
import useInput from '@hooks/useInput';
import makeChatSection from '@utils/makeChatSection';
import { Scrollbars } from 'react-custom-scrollbars';
import useSocket from '@hooks/useSocket';

const PAGE_SIZE = 20;

const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  //:내 로그인 정보를 가져옴, 로그인 되어있지 않으면 false
  const { data: userData } = useSWR<IUser>(`/api/users`, fetcher);

  //:workspace 내부의 :channel 정보를 가져옴
  const { data: channelsData } = useSWR<IChannel[]>(
    `/api/workspaces/${workspace}/channels`,
    fetcher,
  );
  const channelData = channelsData?.find((v) => v.name === channel);

  //:workspace 내부의 :channel의 채팅을 가져옴
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IChat[]>(
    (index) =>
      `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PAGE_SIZE}&page=${
        index + 1
      }`,
    fetcher,
    {
      onSuccess(data) {
        if (data?.length === 1) {
          setTimeout(() => {
            scrollbarRef.current?.scrollToBottom();
          }, 100);
        }
      },
    },
  );

  const [chat, onChangeChat, setChat] = useInput('');
  const [socket] = useSocket(workspace);
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;
  const scrollbarRef = useRef<Scrollbars>(null);
  const [dragOver, setDragOver] = useState(false);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData && channelData && userData) {
        const savedChat = chat;
        // Optimistic UI 적용
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            UserId: userData.id,
            User: userData,
            createdAt: new Date(),
            ChannelId: channelData.id,
            Channel: channelData,
          });
          return prevChatData;
        }, false).then(() => {
          localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
          setChat('');
          if (scrollbarRef.current) {
            console.log('scrollToBottom!', scrollbarRef.current?.getValues());
            scrollbarRef.current?.scrollToBottom();
          }
        });

        //:workspace 내부의 :channel의 채팅을 저장(채팅 입력)
        axios
          .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, { content: savedChat })
          .then(() => {
            mutateChat();
          })
          .catch((error) => {
            console.dir(error);
            toast.error(error.response?.data);
          });
      }
    },
    [chat, workspace, channel, channelData, userData, chatData, mutateChat, setChat],
  );

  // 채널 chat 데이터 처리
  const onMessage = useCallback(
    (data: IChat) => {
      if (
        data.Channel.name === channel &&
        (data.content.startsWith('uploads\\') ||
          data.content.startsWith('uploads/') ||
          data.UserId !== userData?.id)
      ) {
        mutateChat((chatData) => {
          chatData?.[0].unshift(data);
          return chatData;
        }, false).then(() => {
          if (scrollbarRef.current) {
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
            ) {
              console.log('scrollToBottom!', scrollbarRef.current?.getValues());
              setTimeout(() => {
                scrollbarRef.current?.scrollToBottom();
              }, 100);
            } else {
              toast.success('새 메시지가 도착했습니다.', {
                onClick() {
                  scrollbarRef.current?.scrollToBottom();
                },
                closeOnClick: true,
              });
            }
          }
        });
      }
    },
    [channel, userData, mutateChat],
  );

  useEffect(() => {
    socket?.on('message', onMessage);

    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      console.log('toBottomWhenLoaded', scrollbarRef.current);
      setTimeout(() => {
        console.log('scrollbar', scrollbarRef.current);
        scrollbarRef.current?.scrollToBottom();
      }, 500);
    }
  }, [chatData]);

  // 페이지 진입 시 시점 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
  }, [workspace, channel]);

  // 이미지 업로드
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      console.log(e);
      const formData = new FormData();
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          console.log(e.dataTransfer.items[i]);
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            console.log(e, '.... file[' + i + '].name = ' + file.name);
            formData.append('image', file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          console.log(e, '... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          formData.append('image', e.dataTransfer.files[i]);
        }
      }
      axios.post(`/api/workspaces/${workspace}/channels/${channel}/images`, formData).then(() => {
        setDragOver(false);
        localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
      });
    },
    [workspace, channel],
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    console.log(e);
    setDragOver(true);
  }, []);

  if (!channelsData && !channelData) {
    return <Navigate to={`/workspace/${workspace}/channel/일반`} />;
  }

  const chatSections = makeChatSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container onDrop={onDrop} onDragOver={onDragOver}>
      <ChannelContent>
        <ChannelHeader />
        <ChannelChat>
          <ChatList
            chatSections={chatSections}
            scrollbarRef={scrollbarRef}
            setSize={setSize}
            isEmpty={isEmpty}
            isReachingEnd={isReachingEnd}
          />
          <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
          {dragOver && <DragOver>Upload!</DragOver>}
        </ChannelChat>
      </ChannelContent>
      <ChannelMembers />
      <ToastContainer />
    </Container>
  );
};

export default Channel;
