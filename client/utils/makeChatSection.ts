import { IChat, IDM } from '@typings/db';
import dayjs from 'dayjs';

export default function makeChatSection(chatList: IDM[]) {
  const sections: { [key: string]: IDM[] } = {};

  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthDate])) {
      // 이미 Array가 있는 경우
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
