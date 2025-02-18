'use client';

import robot from '@/../public/images/robot.png';
import online from '@/../public/svgs/chat/online.svg';
import BackButton from '../../_components/BackButton';
import Image from 'next/image';
import smallRobot from '@/../public/svgs/chat/robot.svg';
import sound from '@/../public/svgs/chat/sound.svg';
import mic from '@/../public/svgs/chat/mic.svg';
import send from '@/../public/svgs/chat/send.svg';
import { getSpeech } from '@/app/utils/getSpeech';
import { useState } from 'react';
import { getAllMessages, sendChat } from '@/actions/chat';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useParams } from 'next/navigation';
import { chatDetails, postChat } from '@/app/api/chat';

type TChat = {
  chat_id: string;
  created_at: string;
  is_answer: boolean;
  message: string;
  message_id: number;
};

export default function Page() {
  const { chatId } = useParams();

  const [text, setText] = useState('');

  const getAllMessagesQuery = useQuery({
    queryKey: ['chatMessages', chatId],
    queryFn: () => chatDetails(chatId as string),
  });
  console.log('fetching..', getAllMessagesQuery.isFetching);

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      const res = await postChat({
        message: text,
        chatId,
        situation: getAllMessagesQuery.data?.data?.situation,
      });

      return res;
    },
    onSuccess: () => {
      setText('');

      getAllMessagesQuery.refetch();
    },
  });

  console.log('mutation보낸 상태', sendMessageMutation.data);
  console.log('리스크 쿼리 불러오는 데이터', getAllMessagesQuery.data);
  return (
    <div>
      <BackButton marginTop="2" />

      <div className="mt-10 w-full border-b-2  mb-4">
        <div className="flex justify-start items-center pb-1">
          <div className="ml-10 mb-5 mr-5">
            <Image src={robot} alt="robot" width={25} height={35} />
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold font-mono text-[#3369FF]">
              Talk with friends
            </h3>
            <div className="flex">
              <Image src={online} alt="online" className="mr-1" />
              <h3 className="text-[#3ABF38] text-lg font-medium">Online</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="font-mono h-full">
        {/* 여기에서 채팅 뿌려주기 */}
        {getAllMessagesQuery?.data?.data?.messages.map((chat: TChat) => (
          <div key={chat.message_id}>
            {chat.is_answer ? (
              <div className="chat chat-start mb-3">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full shadow-xl">
                    <Image alt="robot" src={smallRobot} />
                  </div>
                </div>
                <div className="chat-bubble bg-[#EEE] text-black flex">
                  <span>{chat.message}</span>

                  <Image
                    src={sound}
                    alt="sound"
                    onClick={() => getSpeech(chat.message)}
                  />
                </div>
              </div>
            ) : (
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-bubble bg-[#3369FF] text-white">
                  {chat.message}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="h-36 w-full mb-6"></div>

      <div className="fixed bottom-24 w-11/12 h-14 rounded-3xl shadow-xl flex justify-center items-center gap-2 bg-white">
        <input
          type="text"
          className="w-full rounded-3xl pl-5 placeholder:text-xs outline-none"
          placeholder="Write your message or talk"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <Image src={mic} alt="mic" />
        </div>
        <div className="mr-3" onClick={() => sendMessageMutation.mutate()}>
          {sendMessageMutation.isPending ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <Image src={send} alt="send" />
          )}
        </div>
      </div>
    </div>
  );
}
