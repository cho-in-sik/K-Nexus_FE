'use client';

import home from '@/../public/svgs/home.svg';
import chat from '@/../public/svgs/chat.svg';
import settings from '@/../public/svgs/settings.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const navigate = useRouter();
  return (
    <div className="btm-nav mb-2">
      <button onClick={() => navigate.push('/home')}>
        <div className="flex flex-col justify-center items-center">
          <Image src={home} alt="home" />
          <span className="text-xs text-[#A2A2A2]">home</span>
        </div>
      </button>
      <button onClick={() => navigate.push('/home')} className="">
        <Image src={chat} alt="chat" />
      </button>
      <button onClick={() => navigate.push('/settings')}>
        <div className="flex flex-col justify-center items-center">
          <Image src={settings} alt="settings" />
          <span className="text-xs text-[#A2A2A2]">settings</span>
        </div>
      </button>
    </div>
  );
}
