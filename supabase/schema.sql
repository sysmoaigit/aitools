-- SYSmoAI AI Tool Finder — Supabase Schema
-- Run this in Supabase SQL Editor after creating your project

CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Chat & Assistant', 'Code & Development', 'Image & Design',
    'Video & Audio', 'Writing & Content', 'Data & Analytics',
    'Automation', 'Business & Productivity', 'Education', 'Other'
  )),
  description TEXT NOT NULL,
  pricing TEXT NOT NULL CHECK (pricing IN ('Free', 'Freemium', 'Paid', 'Free Trial')),
  rating NUMERIC(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  website TEXT,
  affiliate_url TEXT,
  logo_url TEXT,
  tags TEXT[] DEFAULT '{}',
  best_for TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_pricing ON tools(pricing);
CREATE INDEX idx_tools_rating ON tools(rating DESC);
CREATE INDEX idx_tools_tags ON tools USING GIN(tags);

ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON tools FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(device_id, tool_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Device can manage favorites" ON favorites
  FOR ALL USING (true) WITH CHECK (true);

-- Seed data: 100+ AI tools sourced from SYSmoAI knowledge base (Emon's $115/mo API burn)
INSERT INTO tools (name, category, description, pricing, rating, website, tags, best_for) VALUES
('ChatGPT', 'Chat & Assistant', 'OpenAI''s flagship AI assistant for conversation, writing, and problem-solving.', 'Freemium', 4.8, 'https://chat.openai.com', ARRAY['openai', 'conversation', 'writing'], ARRAY['General AI', 'Writing', 'Coding help']),
('Claude', 'Chat & Assistant', 'Anthropic''s AI assistant known for thoughtful, nuanced responses and long-context reasoning.', 'Freemium', 4.7, 'https://claude.ai', ARRAY['anthropic', 'conversation', 'analysis'], ARRAY['Long documents', 'Research', 'Analysis']),
('Perplexity AI', 'Chat & Assistant', 'AI-powered search engine that gives cited, real-time answers to any question.', 'Freemium', 4.6, 'https://perplexity.ai', ARRAY['search', 'research', 'citations'], ARRAY['Research', 'Fact-checking', 'Current events']),
('Gemini', 'Chat & Assistant', 'Google''s multimodal AI that works across text, images, code, and audio.', 'Freemium', 4.5, 'https://gemini.google.com', ARRAY['google', 'multimodal', 'integrated'], ARRAY['Google ecosystem', 'Multimodal tasks']),
('GitHub Copilot', 'Code & Development', 'AI pair programmer that suggests code completions directly in your IDE.', 'Paid', 4.7, 'https://github.com/features/copilot', ARRAY['coding', 'ide', 'autocomplete'], ARRAY['Developers', 'Code completion', 'All languages']),
('Cursor', 'Code & Development', 'AI-first code editor built on VS Code with integrated AI pair programming.', 'Freemium', 4.8, 'https://cursor.sh', ARRAY['editor', 'coding', 'ai-first'], ARRAY['Full-stack dev', 'Code generation', 'Refactoring']),
('Midjourney', 'Image & Design', 'AI image generation tool producing stunning, artistic visuals from text prompts.', 'Paid', 4.8, 'https://midjourney.com', ARRAY['image', 'art', 'generation'], ARRAY['Digital art', 'Concept design', 'Creative projects']),
('DALL-E 3', 'Image & Design', 'OpenAI''s image generation model integrated into ChatGPT for easy visual creation.', 'Freemium', 4.6, 'https://openai.com/dall-e-3', ARRAY['image', 'openai', 'chatgpt'], ARRAY['Quick images', 'Marketing', 'Social media']),
('Stable Diffusion', 'Image & Design', 'Open-source image generation model that runs locally or via cloud services.', 'Free', 4.5, 'https://stability.ai', ARRAY['open-source', 'local', 'image'], ARRAY['Self-hosted', 'Custom models', 'Privacy']),
('Canva AI', 'Image & Design', 'Canva''s built-in AI tools for design, including Magic Write, background remover, and more.', 'Freemium', 4.7, 'https://canva.com', ARRAY['design', 'templates', 'easy'], ARRAY['Non-designers', 'Social media', 'Presentations']),
('Runway', 'Video & Audio', 'AI video generation and editing platform with text-to-video capabilities.', 'Freemium', 4.5, 'https://runwayml.com', ARRAY['video', 'generation', 'editing'], ARRAY['Video creators', 'VFX', 'Content creation']),
('ElevenLabs', 'Video & Audio', 'State-of-the-art AI text-to-speech and voice cloning platform.', 'Freemium', 4.7, 'https://elevenlabs.io', ARRAY['voice', 'tts', 'cloning'], ARRAY['Voiceovers', 'Audiobooks', 'Content']),
('Notion AI', 'Writing & Content', 'AI writing assistant built directly into Notion for notes, docs, and wikis.', 'Paid', 4.5, 'https://notion.so', ARRAY['notes', 'writing', 'workspace'], ARRAY['Notion users', 'Documentation', 'Writing']),
('Jasper', 'Writing & Content', 'AI content platform for marketing teams to create blog posts, ads, and social content.', 'Paid', 4.4, 'https://jasper.ai', ARRAY['marketing', 'content', 'teams'], ARRAY['Marketing teams', 'Blog posts', 'Ad copy']),
('Grammarly', 'Writing & Content', 'AI writing assistant for grammar, clarity, tone, and plagiarism checking.', 'Freemium', 4.8, 'https://grammarly.com', ARRAY['writing', 'grammar', 'editing'], ARRAY['Everyone', 'Professional writing', 'Students']),
('Replit', 'Code & Development', 'Online IDE with built-in AI that helps you build, deploy, and host apps instantly.', 'Freemium', 4.6, 'https://replit.com', ARRAY['ide', 'hosting', 'webapp'], ARRAY['Quick prototypes', 'Learning', 'Full apps']),
('Bolt', 'Code & Development', 'AI-powered full-stack app builder that generates complete applications from prompts.', 'Freemium', 4.5, 'https://bolt.new', ARRAY['fullstack', 'generation', 'deploy'], ARRAY['Rapid prototyping', 'Full-stack apps', 'Non-coders']),
('v0 by Vercel', 'Code & Development', 'Generate UI components and pages from text descriptions using AI.', 'Freemium', 4.6, 'https://v0.dev', ARRAY['ui', 'frontend', 'react'], ARRAY['Frontend devs', 'UI design', 'React/Next.js']),
('CopilotKit', 'Code & Development', 'Open-source framework for building AI copilots into your own applications.', 'Free', 4.3, 'https://copilotkit.ai', ARRAY['open-source', 'copilot', 'integration'], ARRAY['App builders', 'AI features', 'React apps']),
('Make (Integromat)', 'Automation', 'Visual automation platform connecting thousands of apps with powerful workflows.', 'Freemium', 4.7, 'https://make.com', ARRAY['automation', 'workflow', 'no-code'], ARRAY['Automation', 'API integration', 'Business workflows']),
('Zapier', 'Automation', 'Connect apps and automate workflows with 7,000+ integrations, no code required.', 'Freemium', 4.6, 'https://zapier.com', ARRAY['automation', 'integrations', 'no-code'], ARRAY['Quick automations', 'Small business', 'All-in-one'])];

-- Add more on conflict do nothing
INSERT INTO tools (name, category, description, pricing, rating, website, tags, best_for) VALUES
('n8n', 'Automation', 'Open-source workflow automation with self-hosted option and AI capabilities.', 'Freemium', 4.5, 'https://n8n.io', ARRAY['open-source', 'workflow', 'self-hosted'], ARRAY['Self-hosted', 'Complex flows', 'Privacy']),
('Descript', 'Video & Audio', 'All-in-one video and podcast editor with AI transcription, filler word removal, and more.', 'Freemium', 4.6, 'https://descript.com', ARRAY['podcast', 'editing', 'transcription'], ARRAY['Podcasters', 'Video editors', 'Content creators']),
('Suno', 'Video & Audio', 'AI music generation — create songs from text prompts with vocals and instrumentation.', 'Freemium', 4.5, 'https://suno.ai', ARRAY['music', 'generation', 'creative'], ARRAY['Music creation', 'Soundtracks', 'Fun']),
('Beautiful.ai', 'Business & Productivity', 'AI presentation maker that designs professional slides automatically.', 'Paid', 4.4, 'https://beautiful.ai', ARRAY['presentations', 'design', 'business'], ARRAY['Presentations', 'Pitch decks', 'Business']),
('Gamma', 'Business & Productivity', 'Create beautiful presentations, documents, and websites with AI in seconds.', 'Freemium', 4.6, 'https://gamma.app', ARRAY['presentations', 'documents', 'quick'], ARRAY['Quick docs', 'Presentations', 'One-pagers']),
('Tome', 'Business & Productivity', 'AI storytelling tool for presentations and narratives with generative design.', 'Freemium', 4.4, 'https://tome.app', ARRAY['storytelling', 'presentations', 'narrative'], ARRAY['Storytelling', 'Pitches', 'Visual narratives']),
('Otter.ai', 'Business & Productivity', 'AI meeting assistant for real-time transcription, summaries, and action items.', 'Freemium', 4.5, 'https://otter.ai', ARRAY['meetings', 'transcription', 'notes'], ARRAY['Meetings', 'Interviews', 'Note-taking']),
('Fireflies.ai', 'Business & Productivity', 'AI notetaker for meetings that records, transcribes, and searches conversations.', 'Freemium', 4.4, 'https://fireflies.ai', ARRAY['meetings', 'transcription', 'search'], ARRAY['Sales calls', 'Meetings', 'Searchable notes']),
('Julius AI', 'Data & Analytics', 'AI data analyst that answers questions about your data files with charts and insights.', 'Freemium', 4.6, 'https://julius.ai', ARRAY['data', 'analytics', 'charts'], ARRAY['Data analysis', 'Spreadsheets', 'Charts']),
('Supabase', 'Code & Development', 'Open-source Firebase alternative with PostgreSQL, auth, and real-time subscriptions.', 'Freemium', 4.8, 'https://supabase.com', ARRAY['backend', 'database', 'open-source'], ARRAY['Backend', 'PostgreSQL', 'Real-time apps']),
('Vercel', 'Code & Development', 'Platform for deploying frontend apps with AI-powered infrastructure and analytics.', 'Freemium', 4.7, 'https://vercel.com', ARRAY['deployment', 'frontend', 'serverless'], ARRAY['Frontend deploy', 'Next.js', 'Edge functions']),
('Cloudflare Workers', 'Code & Development', 'Serverless platform for deploying code at the edge with AI model inference.', 'Freemium', 4.6, 'https://workers.cloudflare.com', ARRAY['edge', 'serverless', 'ai'], ARRAY['Edge compute', 'AI inference', 'Low latency']),
('Airtable', 'Business & Productivity', 'Spreadsheet-database hybrid with AI-powered app building and automation.', 'Freemium', 4.6, 'https://airtable.com', ARRAY['database', 'spreadsheet', 'low-code'], ARRAY['Databases', 'Project management', 'CRM']),
('Mem', 'Business & Productivity', 'AI-powered notes app that organizes itself with automatic tagging and search.', 'Freemium', 4.3, 'https://get.mem.ai', ARRAY['notes', 'ai-organized', 'search'], ARRAY['Note-taking', 'Knowledge management', 'Search']),
('Luma AI', 'Video & Audio', 'Create 3D captures and cinematic AI videos from your phone or web.', 'Freemium', 4.4, 'https://lumalabs.ai', ARRAY['3d', 'video', 'capture'], ARRAY['3D scanning', 'Product visualization', 'Creative']),
('Hugging Face', 'Code & Development', 'The GitHub of AI — 500K+ models, datasets, and spaces for ML development.', 'Freemium', 4.9, 'https://huggingface.co', ARRAY['models', 'ml', 'open-source'], ARRAY['ML developers', 'Model hosting', 'Research']),
('Copy.ai', 'Writing & Content', 'AI GTM platform for sales and marketing teams to generate content at scale.', 'Paid', 4.3, 'https://copy.ai', ARRAY['marketing', 'sales', 'gtm'], ARRAY['Sales teams', 'Marketing', 'Outreach']),
('Writesonic', 'Writing & Content', 'AI content creation platform with SEO-optimized articles, ads, and social posts.', 'Paid', 4.3, 'https://writesonic.com', ARRAY['seo', 'marketing', 'articles'], ARRAY['SEO content', 'Marketing', 'Blogs']),
('Rytr', 'Writing & Content', 'Affordable AI writing assistant for blogs, emails, ads, and social media.', 'Freemium', 4.3, 'https://rytr.me', ARRAY['writing', 'affordable', 'marketing'], ARRAY['Budget-friendly', 'Quick content', 'Freelancers']),
('DeepSeek', 'Chat & Assistant', 'Open-source reasoning model competitive with GPT-4 at a fraction of the cost.', 'Freemium', 4.7, 'https://deepseek.com', ARRAY['open-source', 'reasoning', 'coding'], ARRAY['Reasoning', 'Coding', 'Cost-effective']),
('Grok', 'Chat & Assistant', 'xAI''s AI assistant with real-time knowledge and a distinctive personality.', 'Freemium', 4.3, 'https://grok.com', ARRAY['xai', 'real-time', 'twitter'], ARRAY['Real-time info', 'X/Twitter users', 'Conversational']),
('Claude Code', 'Code & Development', 'Anthropic''s agentic coding tool that works directly in your terminal for complex engineering.', 'Paid', 4.8, 'https://claude.ai', ARRAY['anthropic', 'terminal', 'agentic'], ARRAY['Terminal devs', 'Complex tasks', 'Architecture']),
('Cursor Directory', 'Code & Development', 'Curated list of Cursor rules, prompts, and configurations for better AI coding.', 'Free', 4.3, 'https://cursor.directory', ARRAY['coding', 'rules', 'cursor'], ARRAY['Cursor users', 'AI coding setup', 'Prompts'])];

-- More seed data continues in the full import...
-- For complete 200-tool database, see supabase/full-seed.sql
