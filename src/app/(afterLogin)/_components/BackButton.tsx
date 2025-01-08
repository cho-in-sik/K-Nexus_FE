'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import back from '@/../public/svgs/back.svg';

export default function BackButton({ marginTop }: any) {
  const router = useRouter();
  return (
    <div onClick={() => router.back()} className={`absolute mt-${marginTop}`}>
      <Image src={back} alt="backBtn" />
    </div>
  );
}
