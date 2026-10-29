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

export type VisualLayoutType = 'card' | 'split' | 'background' | 'mockup' | 'badges';

export type ElementKey = 
  | 'header'
  | 'badge'
  | 'subtitle'
  | 'title'
  | 'highlight'
  | 'visual'
  | 'points'
  | 'point_0'
  | 'point_1'
  | 'point_2'
  | 'stat'
  | 'comparison'
  | 'footer';

export interface ElementPosition {
  x: number;
  y: number;
  scale?: number;
}

export type ElementPositions = Partial<Record<ElementKey, ElementPosition>>;

export interface SlideItem {
  id: string;
  slideType: 'cover' | 'insight' | 'points' | 'quote' | 'comparison' | 'cta' | 'visual' | 'showcase';
  badge: string;
  title: string;
  description: string;
  highlightBanner?: string;
  points?: FeedPoint[];
  statNumber?: string;
  statLabel?: string;
  customFooter?: string;
  subLink?: string;
  // Visual Element & Photo integration
  imageUrl?: string;
  imageKeyword?: string;
  imageAlt?: string;
  showImage?: boolean;
  imageLayout?: VisualLayoutType;
  visualBadgeLeft?: string;
  visualBadgeRight?: string;
  elementPositions?: ElementPositions;
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
  // Visual Element & Photo integration
  imageUrl?: string;
  imageKeyword?: string;
  imageAlt?: string;
  showImage?: boolean;
  imageLayout?: VisualLayoutType;
  elementPositions?: ElementPositions;
}

