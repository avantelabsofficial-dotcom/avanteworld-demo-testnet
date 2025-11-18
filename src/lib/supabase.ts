import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Avatar {
  id: string;
  user_id: string;
  avatar_url: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function saveAvatar(avatarUrl: string, name: string = 'My Avatar'): Promise<Avatar | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated');
    return null;
  }

  const { data, error } = await supabase
    .from('avatars')
    .insert({
      user_id: user.id,
      avatar_url: avatarUrl,
      name,
      is_active: true
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error saving avatar:', error);
    return null;
  }

  localStorage.setItem('avatarUrl', avatarUrl);
  return data;
}

export async function getActiveAvatar(): Promise<Avatar | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('avatars')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .maybeSingle();

  if (error) {
    console.error('Error fetching active avatar:', error);
    return null;
  }

  if (data && data.avatar_url) {
    localStorage.setItem('avatarUrl', data.avatar_url);
  }

  return data;
}

export async function getUserAvatars(): Promise<Avatar[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('avatars')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching avatars:', error);
    return [];
  }

  return data || [];
}

export async function setActiveAvatar(avatarId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { error: deactivateError } = await supabase
    .from('avatars')
    .update({ is_active: false })
    .eq('user_id', user.id);

  if (deactivateError) {
    console.error('Error deactivating avatars:', deactivateError);
    return false;
  }

  const { data, error } = await supabase
    .from('avatars')
    .update({ is_active: true })
    .eq('id', avatarId)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error setting active avatar:', error);
    return false;
  }

  if (data) {
    localStorage.setItem('avatarUrl', data.avatar_url);
  }

  return true;
}
