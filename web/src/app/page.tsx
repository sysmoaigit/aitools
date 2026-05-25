import { getTopRatedTools, getToolCount, getCategoryCounts } from '@/lib/supabase';
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
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colors[pricing] || ''}`}>
      {pricing}
    </span>
  );
}

function ToolCard({ tool }: { tool: AITool }) {
  return (
    <a href={tool.affiliate_url || tool.website || '#'} target="_blank" rel="noopener noreferrer"
       className="card group block relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-brand-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl w-10 h-10 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center group-hover:scale-110 transition-transform">
              {tool.logo_url ? <img src={tool.logo_url} alt="" className="w-6 h-6 rounded" /> : '🔧'}
            </span>
            <div>
              <h3 className="font-bold text-brand-heading group-hover:text-brand-accent transition-colors">{tool.name}</h3>
              <p className="text-xs text-brand-muted">{tool.category}</p>
            </div>
          </div>
          <PricingBadge pricing={tool.pricing} />
        </div>
        <p className="text-sm text-brand-muted leading-relaxed line-clamp-2 mb-3">{tool.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-gold">⭐ {tool.rating}</span>
          <span className="text-xs text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more →
          </span>
        </div>
        {tool.best_for && tool.best_for.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-brand-border/50">
            {tool.best_for.slice(0, 3).map((bf, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-brand-dark text-brand-muted">{bf}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

export default async function HomePage() {
  const tools = await getTopRatedTools(12).catch(() => []);
  const toolCount = await getToolCount().catch(() => 44);
  const categoryCounts = await getCategoryCounts().catch(() => ({}));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-accent/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-brand-accent2/10 blur-[100px] rounded-full" />
        
        <div className="container-page relative py-24 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-sm text-brand-accent font-medium">{toolCount}+ AI Tools Curated</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Discover the <span className="gradient-text">Best AI Tools</span><br />
              <span className="text-brand-heading">for Every Task</span>
            </h1>
            <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Browse {toolCount}+ hand-picked AI tools across 9 categories. Compare ratings, 
              pricing, and features. Find the perfect tool for coding, design, writing, and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tools" className="btn-primary text-lg px-8 py-4">
                🔍 Browse All Tools
              </Link>
              <Link href="/categories" className="btn-secondary text-lg px-8 py-4">
                🗂 Explore Categories
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
              {[
                { value: `${toolCount}+`, label: 'AI Tools' },
                { value: '9', label: 'Categories' },
                { value: 'Free', label: 'To Use' },
                { value: 'Daily', label: 'Updates' },
              ].map((stat, i) => (
                <div key={i} className="card text-center py-5">
                  <div className="text-2xl font-extrabold gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-brand-muted uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mb-4">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-brand-muted max-w-xl mx-auto">
              Find tools organized by what you need — from AI assistants to code generators
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(cat => (
              <Link key={cat.value} href={`/tools?category=${encodeURIComponent(cat.value)}`}
                    className="card group hover:border-brand-accent/40 cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-bold text-brand-heading group-hover:text-brand-accent transition-colors">
                      {cat.value}
                    </h3>
                    <p className="text-sm text-brand-muted">{cat.description}</p>
                  </div>
                  <span className="ml-auto text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-brand-surface/50">
        <div className="container-page">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mb-2">
                Top <span className="gradient-text">Rated</span> Tools
              </h2>
              <p className="text-brand-muted">Highest community ratings</p>
            </div>
            <Link href="/tools" className="text-brand-accent hover:underline text-sm font-semibold hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-accent/20 via-brand-card to-brand-accent2/20 border border-brand-border p-12 sm:p-16 text-center glow">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mb-4">
              Ready to <span className="gradient-text">Supercharge</span> Your Workflow?
            </h2>
            <p className="text-brand-muted max-w-xl mx-auto mb-8">
              Join thousands discovering the best AI tools daily. 100% free directory — no account needed.
            </p>
            <Link href="/tools" className="btn-primary text-lg px-10 py-5">
              🚀 Start Exploring AI Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
