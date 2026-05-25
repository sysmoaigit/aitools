/**
 * SYSmoAI AI Tool Finder — Data Types
 */

export interface AITool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Free Trial';
  rating: number; // 1-5
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
  | 'Education'
  | 'Other';

export type SortOption = 'rating' | 'name' | 'popular';
