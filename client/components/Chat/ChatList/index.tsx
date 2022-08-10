import React, { RefObject, useCallback, useEffect, useRef, VFC } from 'react';
import { ChatZone, Section, StickyHeader } from '@components/Chat/ChatList/styles';
import { IChat, IDM } from '@typings/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  scrollbarRef: RefObject<Scrollbars>;
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isEmpty: boolean;
  isReachingEnd: boolean;
}

const ChatList: VFC<Props> = ({ scrollbarRef, chatSections, setSize, isEmpty, isReachingEnd }) => {
  // 스크롤 최상단에 도달했을 때, 데이터 추가 로딩
  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        console.log('스크롤 top');
        setSize((prevSize) => prevSize + 1).then(() => {
          // 스크롤 위치 유지
          if (scrollbarRef?.current) {
            scrollbarRef.current?.scrollTop(
              scrollbarRef.current.getScrollHeight() - values.scrollHeight,
            );
          }
        });
      }
    },
    [setSize, scrollbarRef, isReachingEnd, isEmpty],
  );

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
