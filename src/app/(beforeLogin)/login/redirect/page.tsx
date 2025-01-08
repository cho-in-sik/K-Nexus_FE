'use client';

import customAxios from '@/app/utils/customAxios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('user_id');

    if (token) {
      // 토큰이 있는 경우: localStorage에 저장 후 리다이렉트
      localStorage.setItem('token', token);
      router.push('/onBoarding');
    } else {
      // 토큰이 없는 경우: 사용자에게 알림 후 리다이렉트
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      router.push('/login'); // 로그인 페이지로 이동
    }

    setToken(token);
    setUserId(userId);
  }, []);

  console.log('token', token);
  console.log('userId', userId);

  return <div>loading...</div>;
}
