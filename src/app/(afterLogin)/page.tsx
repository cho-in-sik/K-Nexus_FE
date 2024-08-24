import { redirect } from 'next/navigation';
import LogoutButton from '../_components/LogoutButton';
import { createServerSupabaseClient } from '../utils/supabase/server';

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (session === null) {
  //   redirect('/login');
  // }
  console.log('session', session);
  return (
    <main>
      main page
      <h1>{session?.user.email}</h1>
      {session?.user && <LogoutButton>로그아웃</LogoutButton>}
    </main>
  );
}
