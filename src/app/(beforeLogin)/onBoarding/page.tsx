import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import OnBoardingClientComponent from './_components/OnBoardingClientCompoent';

export default async function Page() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);
  return <OnBoardingClientComponent />;
}
