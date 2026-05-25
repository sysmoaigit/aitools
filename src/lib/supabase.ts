import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://qipgnmifgfgzxqusoyro.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcGdubWlmZ2ZnenhxdXNveXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjM4NjEsImV4cCI6MjA5NTI5OTg2MX0.hF9KAP0HBGXegrraB_6eexGfF4B13De-kYgk5tuFDFk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
