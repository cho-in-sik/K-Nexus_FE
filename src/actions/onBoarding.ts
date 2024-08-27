'use server';

import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';

function handleError(error: any) {
  console.error('Supabase Error:', error.message);
  throw new Error(error);
}

export async function confirmOnborading({ uid }: any) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .select('onboarding')
    .eq('id', uid)
    .single();

  if (error) {
    handleError(error);
  }

  return data;
}

export async function createOnboradingInfo({
  steps,
  id,
}: {
  steps: string[];
  id: string;
}) {
  const supabase = await createServerSupabaseClient();
  console.log(steps);

  const { data, error, status } = await supabase
    .from('users')
    .update({ onboarding_info: steps, onboarding: true })
    .eq('id', id);

  if (error) {
    handleError(error);
  }
  if (status === 204) {
    redirect('/home');
  }

  return data;
}
