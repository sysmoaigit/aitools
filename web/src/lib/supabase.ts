import { AITool } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qipgnmifgfgzxqusoyro.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcGdubWlmZ2ZnenhxdXNveXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjM4NjEsImV4cCI6MjA5NTI5OTg2MX0.hF9KAP0HBGXegrraB_6eexGfF4B13De-kYgk5tuFDFk';

async function supabaseFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
    ...options,
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
  return res.json();
}

export async function getTools(options?: { category?: string; search?: string; limit?: number }): Promise<AITool[]> {
  let query = `tools?select=*&order=rating.desc&limit=${options?.limit || 200}`;
  if (options?.category) query += `&category=eq.${encodeURIComponent(options.category)}`;
  if (options?.search) {
    query += `&or=(name.ilike.*${encodeURIComponent(options.search)}*,description.ilike.*${encodeURIComponent(options.search)}*)`;
  }
  return supabaseFetch(query);
}

export async function getTopRatedTools(limit = 8): Promise<AITool[]> {
  return supabaseFetch(`tools?select=*&order=rating.desc&limit=${limit}`);
}

export async function getToolCount(): Promise<number> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tools?select=count`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'count=exact',
    },
  });
  const text = await res.text();
  const match = text.match(/content-range: .*\/(\d+)/i);
  return match ? parseInt(match[1]) : 44;
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const tools = await supabaseFetch('tools?select=category');
  const counts: Record<string, number> = {};
  (tools as AITool[]).forEach(t => {
    counts[t.category] = (counts[t.category] || 0) + 1;
  });
  return counts;
}
