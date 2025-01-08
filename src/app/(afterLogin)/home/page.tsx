'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import shopping from '@/../public/svgs/home/shopping.svg';
import travel from '@/../public/svgs/home/travel.svg';
import airport from '@/../public/svgs/home/airport.svg';
import alphabet from '@/../public/svgs/home/alphabet.svg';
import talk from '@/../public/svgs/home/talk.svg';
import random from '@/../public/svgs/home/random.svg';

import { getLocalStorage } from '@/app/utils/handleToken';
import { userInfo } from '@/app/api/user';

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false); // 초기화 여부 상태
  const router = useRouter();

  useEffect(() => {
    const storedToken = getLocalStorage();
    setToken(storedToken);
    setIsTokenChecked(true); // 토큰 확인 완료
  }, []);

  useEffect(() => {
    if (isTokenChecked && !token) {
      setTimeout(() => {
        router.push('/login');
      }, 0);
    }
  }, [isTokenChecked, token, router]);

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: userInfo,
    enabled: !!token,
  });

  if (!isTokenChecked) {
    return null;
  }

  if (!token) {
    // 토큰이 없는 경우 로딩 상태를 보여줌
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="h-screen">
      <div className="w-full h-36 rounded-2xl border-2 border-[#D9D9D9] mt-20 mb-10 text-xl font-medium py-7 pl-6">
        <h1>{`${data?.name || ''} 님`}</h1>
        <h1>안녕하세요.</h1>
        <h1>오늘도 열심히 공부해봐요 💪🏼</h1>
      </div>
      <div className="w-full flex flex-wrap gap-5">
        <Link href={'/category/go-shopping'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={shopping} alt="shopping" className="mt-3" />
              <span className="text-sm font-medium">go shopping</span>
            </div>
          </div>
        </Link>
        <Link href={'/category/talk-with-friends'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={talk} alt="talk" className="mt-4" />
              <span className="text-sm font-medium mt-2">
                talk with friends
              </span>
            </div>
          </div>
        </Link>
        <Link href={'/category/travel'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={travel} alt="travel" className="mt-3" />
              <span className="text-sm font-medium">travel</span>
            </div>
          </div>
        </Link>
        <Link href={'/category/learn-alphabet'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={alphabet} alt="alphabet" className="mt-3" />
              <span className="text-sm font-medium">alphabet</span>
            </div>
          </div>
        </Link>
        <Link href={'/category/airport'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={airport} alt="airport" className="mt-3" />
              <span className="text-sm font-medium">airport</span>
            </div>
          </div>
        </Link>
        <Link href={'/category/random-course'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={random} alt="random" className="mt-3" />
              <span className="text-sm font-medium">random</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
