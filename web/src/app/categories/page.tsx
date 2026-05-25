import { CATEGORIES } from '@/lib/types';
import { getCategoryCounts } from '@/lib/supabase';
import Link from 'next/link';

export default async function CategoriesPage() {
  const counts = await getCategoryCounts().catch(() => ({} as Record<string, number>));
  const total = Object.values(counts).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="min-h-screen">
      <section className="py-16 border-b border-brand-border">
        <div className="container-page text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-heading mb-4">
            Browse by <span className="gradient-text">Category</span>
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto">
            {total}+ AI tools organized across 9 categories — find exactly what you need
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.value}
                href={`/tools?category=${encodeURIComponent(cat.value)}`}
                className="card group hover:border-brand-accent/40"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-brand-heading group-hover:text-brand-accent transition-colors">
                        {cat.value}
                      </h3>
                    </div>
                    <p className="text-sm text-brand-muted mb-3">{cat.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-accent">
                        {counts[cat.value] || '—'} tools
                      </span>
                      <span className="text-xs text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        Browse →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
