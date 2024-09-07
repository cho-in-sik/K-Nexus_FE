'use client';

import { getAllChatLists } from '@/actions/chat';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function ChatListBox({ session }: any) {
  console.log(session);
  const { data } = useQuery({
    queryKey: ['chatLists', session.user.user_metadata.name],
    queryFn: () => getAllChatLists(),
  });
  console.log(data);
  return (
    <div>
      <Link href={'/chat/1'}>
        <button className="btn w-full badge-lg mb-3">
          Inbox
          <div className="badge">+99</div>
        </button>
      </Link>
      <Link href={'/chat/2'}>
        <button className="btn w-full badge-lg">
          Inbox
          <div className="badge">category</div>
        </button>
      </Link>
    </div>
  );
}
