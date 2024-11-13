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
      localStorage.setItem('token', token);
      router.push('/onBoarding');
    }
    setToken(token);
    setUserId(userId);
  }, []);

  console.log('token', token);
  console.log('userId', userId);
  return <div>redirect...</div>;
}
