export interface AITool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Free Trial';
  rating: number;
  website: string;
  affiliate_url?: string;
  logo_url?: string;
  tags: string[];
  best_for: string[];
}

export type ToolCategory =
  | 'Chat & Assistant'
  | 'Code & Development'
  | 'Image & Design'
  | 'Video & Audio'
  | 'Writing & Content'
  | 'Data & Analytics'
  | 'Automation'
  | 'Business & Productivity'
  | 'Education';

export const CATEGORIES: { value: ToolCategory; icon: string; description: string }[] = [
  { value: 'Chat & Assistant', icon: '💬', description: 'AI chatbots and assistants' },
  { value: 'Code & Development', icon: '💻', description: 'AI coding and dev tools' },
  { value: 'Image & Design', icon: '🎨', description: 'AI image and design tools' },
  { value: 'Video & Audio', icon: '🎬', description: 'AI video and audio generation' },
  { value: 'Writing & Content', icon: '✍️', description: 'AI writing and content tools' },
  { value: 'Data & Analytics', icon: '📊', description: 'AI data analysis tools' },
  { value: 'Automation', icon: '⚡', description: 'AI workflow automation' },
  { value: 'Business & Productivity', icon: '💼', description: 'AI business productivity' },
  { value: 'Education', icon: '📚', description: 'AI learning and education' },
];
