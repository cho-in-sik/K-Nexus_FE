import { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen py-11">
      <div className="flex flex-col justify-around items-center">
        <h3 className="text-[#EF4444] ">존재하지 않는 페이지입니다.</h3>
        <h3 className="text-[#9CA3AF] ">홈으로 돌아가세요.</h3>
      </div>

      <Link href="/" className="fixed bottom-10">
        <button className="bg-main text-white rounded-sm py-2.5 px-28">
          홈으로 돌아가기
        </button>
      </Link>
      <div className="h-10"></div>
    </div>
  );
};

export default NotFound;
