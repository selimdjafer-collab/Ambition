import { DEMO_FORCED, SUPABASE_CONFIGURED } from '../supabase';
import type { Backend } from './types';
import { DemoBackend } from './demo';
import { SupabaseBackend } from './supabase';

export type BackendMode = 'supabase' | 'demo';

export function resolveMode(): BackendMode {
  if (DEMO_FORCED) return 'demo';
  if (SUPABASE_CONFIGURED) return 'supabase';
  return 'demo';
}

let instance: Backend | null = null;

export function getBackend(): Backend {
  if (!instance) {
    instance = resolveMode() === 'supabase' ? new SupabaseBackend() : new DemoBackend();
  }
  return instance;
}

export { DemoBackend, SupabaseBackend };
export type { Backend } from './types';
export { SUPABASE_CONFIGURED, DEMO_FORCED };
