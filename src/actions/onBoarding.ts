import { createServerSupabaseClient } from '@/app/utils/supabase/server';

function handleError(error: any) {
  throw new Error(error);
}

export async function createOnboradingInfo(info: any, userId: any) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .update({ onBoardingInfo: info })
    .eq('id', userId);

  if (error) {
    handleError(error);
  }

  return data;
}
