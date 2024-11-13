'use client';

import shopping from '@/../public/svgs/home/shopping.svg';
import travel from '@/../public/svgs/home/travel.svg';
import airport from '@/../public/svgs/home/airport.svg';
import alphabet from '@/../public/svgs/home/alphabet.svg';
import talk from '@/../public/svgs/home/talk.svg';
import random from '@/../public/svgs/home/random.svg';
import Image from 'next/image';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { userInfo } from '@/app/api/user';

export default function Page() {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: userInfo,
  });

  return (
    <div className="h-screen">
      <div className="w-full h-36 rounded-2xl border-2 border-[#D9D9D9] mt-20 mb-10 text-xl font-medium py-7 pl-6">
        <h1>{`${data.name} 님`}</h1>
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
        <Link href={'/category/talk-friends'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={talk} alt="shopping" className="mt-4" />
              <span className="text-sm font-medium mt-2">
                talk with friends
              </span>
            </div>
          </div>
        </Link>
        <Link href={'/category/travel'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={travel} alt="shopping" className="mt-3" />
              <span className="text-sm font-medium">travel</span>
            </div>
          </div>
        </Link>
        <Link href={'/category/alphabet'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={alphabet} alt="shopping" className="mt-3" />
              <span className="text-sm font-medium">alphabet</span>
            </div>
          </div>
        </Link>
        <Link href={'/category/airport'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={airport} alt="shopping" className="mt-3" />
              <span className="text-sm font-medium">airport</span>
            </div>
          </div>
        </Link>
        <Link href={'/category/random'}>
          <div className="h-32 w-40 bg-[#E7E9EC] rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={random} alt="shopping" className="mt-3" />
              <span className="text-sm font-medium">random</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
