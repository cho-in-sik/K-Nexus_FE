'use server';

import { createServerSupabaseClient } from '@/app/utils/supabase/server';

function handleError(error: any) {
  console.error('Supabase Error:', error.message);
  throw new Error(error);
}

export async function getAllMessages(category: any) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error('세션에러발생');
  }

  const { data, error: messageError } = await supabase
    .from('messages')
    .select('*')
    .eq('sender', session.user.id)
    .eq('category', category)
    .order('created_at', { ascending: true });

  if (messageError) {
    throw new Error('에러발생');
  }

  return data;
}

export async function sendChat({ message, category, ai_answer }: any) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Error('세션에러발생');
  }

  const { data, error } = await supabase.from('messages').insert({
    message,
    category,
    sender: session.user.id,
    ai_answer,
  });

  if (error) {
    handleError(error);
  }

  return data;
}
