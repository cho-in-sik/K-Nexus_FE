'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const { categoryId } = useParams();
  console.log(categoryId);
  return (
    <div className="h-screen">
      <div className="text-lg font-medium text-center mt-12 mb-24">
        {categoryId}
      </div>
      <div className="w-full flex justify-center items-center mb-8">
        <div className="h-48 w-48 bg-[#D9D9D9] rounded-full"></div>
      </div>
      <div className="text-center text-sm font-normal">
        <h6>안녕하세요</h6>
        <h6>무엇을 도와드릴까요?</h6>
      </div>
    </div>
  );
}
