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
  | 'point_3'
  | 'formula'
  | 'checklist'
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
  slideType: 'cover' | 'insight' | 'problem' | 'framework' | 'comparison' | 'metric' | 'checklist' | 'cta' | 'visual' | 'showcase' | 'points' | 'quote';
  badge: string;
  title: string;
  description: string;
  highlightBanner?: string;
  points?: FeedPoint[];
  statNumber?: string;
  statLabel?: string;
  customFooter?: string;
  subLink?: string;
  // Adaptive slide components
  problemData?: {
    warningTag?: string;
    painPoint: string;
    impactText: string;
  };
  comparisonData?: {
    dontTitle?: string;
    dontDesc: string;
    doTitle?: string;
    doDesc: string;
  };
  checklistItems?: Array<{
    text: string;
    tag?: string;
    done?: boolean;
  }>;
  frameworkSteps?: Array<{
    stepNumber: string;
    stepTitle: string;
    stepDetail: string;
  }>;
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

export interface TakeawayBox {
  label: string;
  formula: string;
  metric?: string;
}

export interface FeedContent {
  mainTitle: string;
  subtitle: string;
  headerBadge: string;
  highlightBanner?: string;
  points: FeedPoint[];
  takeawayBox?: TakeawayBox;
  densityMode?: 'comprehensive' | 'standard';
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

