'use client';

import { createBrowserSupabaseClient } from '@/app/utils/supabase/client';
import Image from 'next/image';

export default function GoogleLogin() {
  const supabase = createBrowserSupabaseClient();
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : 'http://localhost:3000/auth/callback',
      },
    });

    console.log(data);
  };
  return (
    <button
      className="w-full px-4 py-3 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 shadow-md justify-center items-center"
      onClick={() => signInWithGoogle()}
    >
      <Image
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
        width={24}
        height={24}
      />
      <span>Login with Google</span>
    </button>
  );
}
