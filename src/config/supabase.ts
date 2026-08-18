import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';

let supabaseInstance: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    env.SUPABASE_URL &&
    env.SUPABASE_URL.startsWith('https://') &&
    env.SUPABASE_ANON_KEY &&
    env.SUPABASE_ANON_KEY.length > 10
  );
};

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      supabaseInstance = null;
    }
  }
  return supabaseInstance;
};
