import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import OnBoardingClientComponent from './_components/OnBoardingClientCompoent';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const uid = user?.id;

  const { data: onboarding } = await supabase
    .from('users')
    .select('onboarding')
    .eq('id', uid)
    .single();

  if (onboarding?.onboarding) {
    redirect('/home');
  }

  return <OnBoardingClientComponent id={uid} />;
}
