import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 border-b border-brand-border">
        <div className="container-page text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-heading mb-4">
            About <span className="gradient-text">AI Premium Tools</span>
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto text-lg">
            Your trusted guide through the AI tool landscape
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page max-w-3xl">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-heading mb-3">What We Do</h2>
              <p className="text-brand-muted leading-relaxed">
                AI Premium Tools is a carefully curated directory of the best AI tools available today. 
                We test, rate, and organize 200+ AI tools across 9 categories — making it easy to find 
                the right tool for any task, whether you&apos;re a developer, designer, marketer, or student.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-heading mb-3">Why We Built This</h2>
              <p className="text-brand-muted leading-relaxed">
                New AI tools launch every day. It&apos;s overwhelming. We built AI Premium Tools to cut 
                through the noise — no marketing fluff, just honest ratings, clear pricing, and real 
                descriptions. Find the tool, compare your options, and get back to work.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              {[
                { icon: '🎯', title: 'Curated', text: 'Every tool is hand-reviewed before listing. No auto-generated spam.' },
                { icon: '💯', title: 'Honest Ratings', text: 'Community-driven ratings. We don\'t sell rankings or placements.' },
                { icon: '🔄', title: 'Updated Daily', text: 'New tools added as they launch. Stale tools removed.' },
              ].map(item => (
                <div key={item.title} className="card text-center">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-bold text-brand-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-muted">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-brand-heading mb-3">Affiliate Disclosure</h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Some links on AI Premium Tools are affiliate links. If you sign up for a paid tool through 
                our link, we may earn a small commission — at no extra cost to you. This helps keep the 
                directory free. We never let commissions influence our ratings or recommendations. 
                Tools are independently rated by the community.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link href="/tools" className="btn-primary text-lg px-8 py-4">
                🔍 Browse All Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
