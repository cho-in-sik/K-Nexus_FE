import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import OnBoardingClientComponent from './_components/OnBoardingClientCompoent';
import { redirect } from 'next/navigation';
import { confirmOnborading } from '@/actions/onBoarding';

export default async function Page() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const uid = user?.id;

  const onboarding = await confirmOnborading({ uid });

  if (onboarding?.onboarding) {
    redirect('/home');
  }

  return <OnBoardingClientComponent id={uid} />;
}
