'use client';

import { chatList } from '@/app/api/chat';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function ChatListBox() {
  const { data } = useQuery({
    queryKey: ['chatLists'],
    queryFn: chatList,
  });
  console.log(data);
  return (
    <div>
      {!data && <div>채팅 리스트가 없습니다.</div>}
      {data?.data.map((item: any) => (
        <Link href={`chat/${item.chat_id}`} key={item.chat_id}>
          <div className="flex justify-center items-center">
            <button className="btn w-full badge-lg mb-3">{item.summary}</button>
          </div>
        </Link>
      ))}

      {/* <Link href={'/chat/2'}>
        <button className="btn w-full badge-lg">
          Inbox
          <div className="badge">category</div>
        </button>
      </Link> */}
    </div>
  );
}
