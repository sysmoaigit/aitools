// @ts-nocheck
/**
 * Supabase Client — SYSmoAI AI Tool Finder
 *
 * ⚠️ BLOCKED: Supabase credentials are in Bitwarden.
 * This is a temporary stub. Replace when credentials are ready.
 *
 * TO ACTIVATE:
 *   1. Create free Supabase project at app.supabase.com (or use existing AIPS project)
 *   2. Settings → API → copy URL + anon key
 *   3. Replace this entire file with:
 *      import { createClient } from '@supabase/supabase-js';
 *      import AsyncStorage from '@react-native-async-storage/async-storage';
 *      const SUPABASE_URL = 'https://xxxxxxxxxxxx.supabase.co';
 *      const SUPABASE_ANON_KEY = 'eyJ...';
 *      export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false } });
 *   4. Run supabase/schema.sql in Supabase SQL Editor
 */

function chain(): any {
  const c: any = {};
  for (const m of ['select','insert','update','delete','upsert','eq','neq','gt','lt','gte','lte','like','ilike','is','in','or','order','limit','range','single','maybeSingle','match','filter','not','containedBy','textSearch']) {
    c[m] = (..._: any[]) => chain();
  }
  c.then = (resolve: any) => resolve({ data: [], error: null });
  return c;
}

export const supabase: any = {
  from: () => chain(),
  auth: { getSession: () => Promise.resolve({ data: null, error: null }) },
};
