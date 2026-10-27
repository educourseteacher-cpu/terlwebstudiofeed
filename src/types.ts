export type ThemeType = 
  | 'brutalism' 
  | 'arcade' 
  | 'minimalist' 
  | 'cyberpunk' 
  | 'editorial' 
  | 'darksaas' 
  | 'trivia' 
  | 'checklist'
  | 'techhook'
  | 'foresttype';

export type AspectRatioType = 'portrait' | 'square' | 'story'; // 4:5, 1:1, 9:16

export interface FeedPoint {
  number: string;
  title: string;
  desc: string;
  tag?: string;
}

export interface SlideItem {
  id: string;
  slideType: 'cover' | 'insight' | 'points' | 'quote' | 'comparison' | 'cta';
  badge: string;
  title: string;
  description: string;
  highlightBanner?: string;
  points?: FeedPoint[];
  statNumber?: string;
  statLabel?: string;
  customFooter?: string;
  subLink?: string;
}

export interface BrandSettings {
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  handle: string;
  website: string;
  customLogoUrl: string | null;
  customAccentColor: string | null;
  showSlideCounter: boolean;
  showSwipeIndicator: boolean;
  showBadge: boolean;
  showFooterBar: boolean;
}

export interface FeedContent {
  mainTitle: string;
  subtitle: string;
  headerBadge: string;
  highlightBanner?: string;
  points: FeedPoint[];
  footer: string;
  caption: string;
  hashtags: string[];
  subLink?: string;
}
