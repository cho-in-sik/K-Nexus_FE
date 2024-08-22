import LogoutButton from './_components/LogoutButton';
import { createServerSupabaseClient } from './utils/supabase/server';

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <main>
      main page
      <h1>{session?.user.email}</h1>
      <LogoutButton>로그아웃</LogoutButton>
    </main>
  );
}
