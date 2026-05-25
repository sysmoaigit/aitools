export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-dark">
      <div className="container-page py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧰</span>
              <span className="text-lg font-bold">
                <span className="gradient-text">AI Premium</span>
                <span className="text-brand-heading"> Tools</span>
              </span>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">
              The #1 curated directory of AI tools. Discover, compare, and find the perfect AI tool for every task.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-heading mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-sm text-brand-muted hover:text-white transition-colors">Home</a>
              <a href="/tools" className="text-sm text-brand-muted hover:text-white transition-colors">All Tools</a>
              <a href="/categories" className="text-sm text-brand-muted hover:text-white transition-colors">Categories</a>
              <a href="/about" className="text-sm text-brand-muted hover:text-white transition-colors">About</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-brand-heading mb-4">Top Categories</h4>
            <div className="flex flex-col gap-2">
              <a href="/tools?category=Chat%20%26%20Assistant" className="text-sm text-brand-muted hover:text-white transition-colors">Chat & Assistant</a>
              <a href="/tools?category=Code%20%26%20Development" className="text-sm text-brand-muted hover:text-white transition-colors">Code & Development</a>
              <a href="/tools?category=Image%20%26%20Design" className="text-sm text-brand-muted hover:text-white transition-colors">Image & Design</a>
              <a href="/tools?category=Writing%20%26%20Content" className="text-sm text-brand-muted hover:text-white transition-colors">Writing & Content</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-brand-heading mb-4">Ecosystem</h4>
            <div className="flex flex-col gap-2">
              <a href="https://aipremiumshop.com" target="_blank" rel="noopener" className="text-sm text-brand-muted hover:text-white transition-colors">AI Premium Shop</a>
              <a href="https://sysmoai.com" target="_blank" rel="noopener" className="text-sm text-brand-muted hover:text-white transition-colors">SYSmoAI</a>
              <p className="text-sm text-brand-muted mt-2">© {new Date().getFullYear()} SYSmoAI. All tools are independently rated.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
