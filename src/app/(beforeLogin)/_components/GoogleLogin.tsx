'use client';

import Image from 'next/image';

export default function GoogleLogin() {
  const signInWithGoogle = async () => {
    window.location.href = 'https://kolang.store/api/user/login';
  };
  return (
    <button
      className="w-full px-4 py-3 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 shadow-md justify-center items-center"
      onClick={signInWithGoogle}
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
