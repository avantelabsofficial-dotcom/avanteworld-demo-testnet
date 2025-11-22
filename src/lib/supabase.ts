import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSharedAvatarUrl(): string | null {
  return localStorage.getItem('sharedAvatarUrl');
}

export function setSharedAvatarUrl(url: string): void {
  localStorage.setItem('sharedAvatarUrl', url);
}
