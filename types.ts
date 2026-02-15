
export interface DIYProject {
  id: string;
  title: string;
  description: string;
  category: 'cardboard' | 'paper' | 'wood';
  difficulty: 'easy' | 'medium' | 'hard';
  steps: string[];
  imageUrl: string;
}

export enum Section {
  HOME = 'home',
  SMART_LAB = 'smart-lab',
  DIY_HUB = 'diy-hub',
  IMPACT = 'impact',
  CONTACT = 'contact',
  FAQ = 'faq',
  PRIVACY = 'privacy',
  ADMIN = 'admin'
}

export type Language = 'ar' | 'en' | 'fr' | 'de';
export type Theme = 'light' | 'dark';

export interface MaterialInfo {
  name: string;
  description: string;
  ecoScore: number;
}
