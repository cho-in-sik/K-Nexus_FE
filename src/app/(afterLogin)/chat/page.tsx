import Image from 'next/image';
import plus from '@/../public/svgs/plus.svg';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="">
      <h1 className="text-center mt-5 mb-10">Chat List</h1>
      <div className="w-full">
        <button className="btn w-full badge-lg mb-3">
          Inbox
          <div className="badge">+99</div>
        </button>
        <button className="btn w-full badge-lg">
          Inbox
          <div className="badge">category</div>
        </button>
      </div>

      <div className="absolute bottom-28 right-10">
        <Link href={'/'}>
          <button className="btn btn-circle bg-[#4376FE] btn-lg">
            <Image src={plus} alt="plus" />
          </button>
        </Link>
      </div>
    </div>
  );
}
