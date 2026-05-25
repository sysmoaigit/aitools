'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES, AITool } from '@/lib/types';
import Link from 'next/link';

function PricingBadge({ pricing }: { pricing: string }) {
  const colors: Record<string, string> = {
    Free: 'bg-brand-green/15 text-brand-green border-brand-green/30',
    Freemium: 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
    Paid: 'bg-brand-red/15 text-brand-red border-brand-red/30',
    'Free Trial': 'bg-brand-accent/15 text-brand-accent border-brand-accent/30',
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colors[pricing] || ''}`}>
      {pricing}
    </span>
  );
}

function ToolsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTools() {
      setLoading(true);
      const SUPABASE_URL = 'https://qipgnmifgfgzxqusoyro.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcGdubWlmZ2ZnenhxdXNveXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjM4NjEsImV4cCI6MjA5NTI5OTg2MX0.hF9KAP0HBGXegrraB_6eexGfF4B13De-kYgk5tuFDFk';
      try {
        let url = `${SUPABASE_URL}/rest/v1/tools?select=*&order=rating.desc&limit=200`;
        if (category) url += `&category=eq.${encodeURIComponent(category)}`;
        if (search) url += `&or=(name.ilike.*${encodeURIComponent(search)}*,description.ilike.*${encodeURIComponent(search)}*)`;
        const res = await fetch(url, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
        });
        const data = await res.json();
        setTools(data as AITool[]);
      } catch(e) {
        console.error('Failed to fetch tools', e);
      }
      setLoading(false);
    }
    fetchTools();
  }, [category, search]);

  const activeCategory = CATEGORIES.find(c => c.value === category);

  return (
    <>
      <section className="py-12 border-b border-brand-border">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-heading">
                {activeCategory ? (
                  <>{activeCategory.icon} {activeCategory.value}</>
                ) : (
                  <>All <span className="gradient-text">AI Tools</span></>
                )}
              </h1>
              <p className="text-brand-muted mt-2">
                {loading ? 'Loading...' : `${tools.length} tools found`}
                {search && <> for &quot;{search}&quot;</>}
              </p>
            </div>
            <form className="flex gap-2" action="/tools" method="get">
              <input
                type="text"
                name="search"
                placeholder="Search tools..."
                defaultValue={search}
                className="px-4 py-2.5 rounded-xl bg-brand-card border border-brand-border text-white text-sm focus:outline-none focus:border-brand-accent w-48 sm:w-64"
              />
              <button type="submit" className="btn-primary text-sm px-4 py-2.5">Search</button>
            </form>
          </div>
        </div>
      </section>

      <div className="border-b border-brand-border py-4 overflow-x-auto">
        <div className="container-page flex gap-2">
          <Link
            href="/tools"
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              !category ? 'bg-brand-accent text-brand-dark' : 'bg-brand-card text-brand-muted hover:text-white border border-brand-border'
            }`}
          >
            All
          </Link>
          {CATEGORIES.map(cat => (
            <Link
              key={cat.value}
              href={`/tools?category=${encodeURIComponent(cat.value)}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                category === cat.value ? 'bg-brand-accent text-brand-dark' : 'bg-brand-card text-brand-muted hover:text-white border border-brand-border'
              }`}
            >
              {cat.icon} {cat.value}
            </Link>
          ))}
        </div>
      </div>

      <section className="py-8">
        <div className="container-page">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-brand-muted">Loading tools...</p>
            </div>
          ) : tools.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">🔍</span>
              <h2 className="text-xl font-bold text-brand-heading mb-2">No tools found</h2>
              <p className="text-brand-muted">Try a different search or category</p>
              <Link href="/tools" className="btn-primary mt-6 inline-flex">Clear Filters</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map(tool => (
                <a key={tool.id} href={tool.affiliate_url || tool.website || '#'} target="_blank" rel="noopener noreferrer" className="card group block">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl w-9 h-9 rounded-lg bg-brand-dark border border-brand-border flex items-center justify-center">🔧</span>
                      <div>
                        <h3 className="font-bold text-brand-heading text-sm group-hover:text-brand-accent transition-colors">{tool.name}</h3>
                        <p className="text-[11px] text-brand-muted">{tool.category}</p>
                      </div>
                    </div>
                    <PricingBadge pricing={tool.pricing} />
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-2 mb-3">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-gold">⭐ {tool.rating}</span>
                    {tool.best_for && tool.best_for.length > 0 && (
                      <span className="text-[10px] text-brand-accent truncate max-w-[60%]">{tool.best_for[0]}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin mx-auto" />
        </div>
      }>
        <ToolsContent />
      </Suspense>
    </div>
  );
}
