import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AVATAR_URLS = {
  male: 'https://models.readyplayer.me/male.glb',
  female: 'https://models.readyplayer.me/female.glb'
};

export type AvatarType = 'male' | 'female';

export async function getUserAvatarPreference(): Promise<AvatarType | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_avatars')
      .select('avatar_type')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data?.avatar_type as AvatarType || null;
  } catch (error) {
    console.error('Error fetching avatar preference:', error);
    return null;
  }
}

export async function setUserAvatarPreference(avatarType: AvatarType): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('user_avatars')
      .upsert({
        user_id: user.id,
        avatar_type: avatarType,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error setting avatar preference:', error);
    return false;
  }
}

export function getSharedAvatarUrl(): string | null {
  return localStorage.getItem('sharedAvatarUrl');
}

export function setSharedAvatarUrl(url: string): void {
  localStorage.setItem('sharedAvatarUrl', url);
}
