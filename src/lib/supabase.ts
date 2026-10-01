import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() ?? '';
export const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() ?? '';
export const DEMO_FORCED = (import.meta.env.VITE_DEMO_MODE as string | undefined)?.trim() === 'true';

export const SUPABASE_CONFIGURED = SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!SUPABASE_CONFIGURED) {
    throw new Error('Supabase non configuré : renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.');
  }
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      realtime: { params: { eventsPerSecond: 5 } },
    });
  }
  return client;
}
