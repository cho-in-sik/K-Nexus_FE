'use client';

import { ReactNode } from 'react';
import { createBrowserSupabaseClient } from '../utils/supabase/client';

type Props = {
  children: ReactNode;
};

export default function LogoutButton({ children }: Props) {
  const supabase = createBrowserSupabaseClient();
  return (
    <button onClick={async () => supabase.auth.signOut()}>{children}</button>
  );
}
