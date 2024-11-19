import Image from 'next/image';
import plus from '@/../public/svgs/plus.svg';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import ChatListBox from './_components/chatListBox';

export default async function Page() {
  // const supabase = await createServerSupabaseClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  return (
    <div className="">
      <h1 className="text-center mt-5 mb-10">Chat List</h1>
      <div className="w-full">
        <ChatListBox />
      </div>

      <div className="absolute bottom-28 right-10 dropdown dropdown-top dropdown-end">
        <button
          tabIndex={0}
          role="button"
          className="btn btn-circle bg-[#4376FE] btn-lg"
        >
          <Image src={plus} alt="plus" />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>음성으로 만들기</a>
          </li>
          <li>
            <a>채팅으로 만들기</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
