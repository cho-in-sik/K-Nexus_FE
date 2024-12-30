import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import OnBoardingClientComponent from './_components/OnBoardingClientCompoent';
import { redirect } from 'next/navigation';
import { confirmOnborading } from '@/actions/onBoarding';

export default async function Page() {
  return <OnBoardingClientComponent />;
}
