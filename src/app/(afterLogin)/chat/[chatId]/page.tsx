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

export default function Page() {
  const { chatId } = useParams();

  const [text, setText] = useState('');

  const handleButton = () => {
    console.log(1);
    getSpeech('티티에스');
  };

  const getAllMessagesQuery = useQuery({
    queryKey: ['chatMessages', chatId],
    queryFn: () => getAllMessages(chatId),
  });
  console.log(getAllMessagesQuery.data);

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      sendChat({
        message: text,
        chatId,
        ai_answer: false,
      });
    },
    onSuccess: () => {
      setText('');
      console.log('success');
      getAllMessagesQuery.refetch();
    },
  });
  return (
    <div>
      <BackButton />

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
      <div className="font-mono">
        {/* 여기에서 채팅 뿌려주기 */}
        {getAllMessagesQuery.data?.map((chat) => (
          <div key={chat.id}>
            {chat.ai_answer ? (
              <div className="chat chat-start mb-3">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full shadow-xl">
                    <Image alt="robot" src={smallRobot} />
                  </div>
                </div>
                <div className="chat-bubble bg-[#EEE] text-black flex">
                  <span>{chat.message}</span>

                  <Image src={sound} alt="sound" onClick={handleButton} />
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

      <div className="fixed bottom-28 w-11/12 h-14 rounded-3xl shadow-xl flex justify-center items-center gap-2">
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
          <Image src={send} alt="send" />
        </div>
      </div>
    </div>
  );
}
