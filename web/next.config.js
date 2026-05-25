/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    SUPABASE_URL: 'https://qipgnmifgfgzxqusoyro.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcGdubWlmZ2ZnenhxdXNveXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjM4NjEsImV4cCI6MjA5NTI5OTg2MX0.hF9KAP0HBGXegrraB_6eexGfF4B13De-kYgk5tuFDFk',
  },
};

module.exports = nextConfig;
