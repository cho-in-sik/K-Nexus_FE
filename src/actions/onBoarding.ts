'use server';

import { createServerSupabaseClient } from '@/app/utils/supabase/server';

function handleError(error: any) {
  throw new Error(error);
}

export async function createOnboradingInfo({ steps, id }: any) {
  const supabase = await createServerSupabaseClient();
  console.log(steps);

  const { data, error } = await supabase
    .from('users')
    .update({ onBoardingInfo: steps, onBoarding: true })
    .eq('id', id);

  if (error) {
    handleError(error);
  }

  return data;
}
