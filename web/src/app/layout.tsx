export const metadata = {
  title: 'AI Premium Tools — Discover the Best AI Tools in 2026',
  description: 'Curated directory of 200+ AI tools across 9 categories. Compare ratings, pricing, and features. Find the perfect AI tool for every task.',
  metadataBase: new URL('https://aipremium.tools'),
  openGraph: {
    title: 'AI Premium Tools — Discover the Best AI Tools',
    description: '200+ curated AI tools. Compare, search, and save your favorites.',
    url: 'https://aipremium.tools',
    siteName: 'AI Premium Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Premium Tools — Discover the Best AI Tools',
    description: '200+ curated AI tools. Compare, search, and save your favorites.',
  },
  alternates: {
    canonical: 'https://aipremium.tools',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-brand-dark">
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function NavBar() {
  return (
    <nav className="glass sticky top-0 z-50 border-b">
      <div className="container-page flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl group-hover:scale-110 transition-transform">🧰</span>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">AI Premium</span>
            <span className="text-brand-heading"> Tools</span>
          </span>
        </a>
        <div className="flex items-center gap-1">
          <a href="/" className="px-4 py-2 text-sm text-brand-muted hover:text-white transition-colors">Home</a>
          <a href="/tools" className="px-4 py-2 text-sm text-brand-muted hover:text-white transition-colors">All Tools</a>
          <a href="/categories" className="px-4 py-2 text-sm text-brand-muted hover:text-white transition-colors">Categories</a>
          <a href="/about" className="px-4 py-2 text-sm text-brand-muted hover:text-white transition-colors">About</a>
        </div>
      </div>
    </nav>
  );
}
