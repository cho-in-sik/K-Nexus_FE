import robot from '@/../public/images/robot.png';
import online from '@/../public/svgs/chat/online.svg';
import BackButton from '../../_components/BackButton';
import Image from 'next/image';
import smallRobot from '@/../public/svgs/chat/robot.svg';
import sound from '@/../public/svgs/chat/sound.svg';

export default function Page() {
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
        <div className="chat chat-start mb-3">
          <div className="chat-image avatar">
            <div className="w-8 rounded-full shadow-xl">
              <Image alt="robot" src={smallRobot} />
            </div>
          </div>
          <div className="chat-bubble bg-[#EEE] text-black flex">
            <span>
              It was said that you would, destroy the Sith, not join them.
            </span>

            <Image src={sound} alt="sound" />
          </div>
        </div>

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
            Not leave it in Darkness
          </div>
        </div>
      </div>
    </div>
  );
}
