'use server';

import { createServerSupabaseClient } from '@/app/utils/supabase/server';

function handleError(error: any) {
  throw new Error(error);
}

export async function createOnboradingInfo(steps: any, id: any) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('users')
    .update({ onBoardingInfo: steps })
    .eq('id', id);

  if (error) {
    handleError(error);
  }
  console.log('data', data);

  return data;
}
