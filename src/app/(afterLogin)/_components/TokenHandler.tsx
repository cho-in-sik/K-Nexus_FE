'use client';

import { getLocalStorage } from '@/app/utils/handleToken';
import { useRouter } from 'next/navigation';

export default function TokenHandler() {
  const router = useRouter();

  if (!getLocalStorage()) {
    router.push('/login');
  } else return;

  return null;
}
