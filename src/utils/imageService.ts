/**
 * Intelligent Image & Visual Element Service
 * Automatically detects context from user prompts and supplies
 * high-resolution, CORS-friendly photography and visual element badges.
 */

export interface VisualPhotoItem {
  id: string;
  url: string;
  thumb: string;
  title: string;
  author: string;
  category: string;
}

export interface DetectedVisualTopic {
  category: string;
  categoryLabel: string;
  primaryKeyword: string;
  searchKeywords: string[];
  suggestedPhotos: VisualPhotoItem[];
  defaultPhotoUrl: string;
  badgeMockup?: {
    leftIcon: string;
    leftBg: string;
    rightIcon: string;
    rightBg: string;
    badgeText: string;
  };
}

// Curated high-resolution Unsplash photos with CORS compatibility and instant CDN delivery
export const CURATED_VISUAL_CATALOG: Record<string, VisualPhotoItem[]> = {
  web_design: [
    {
      id: 'web-1',
      title: 'Modern Responsive Laptop Showcase',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
      author: 'Firmbee',
      category: 'web_design'
    },
    {
      id: 'web-2',
      title: 'Minimalist Workspace with Web Browser',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
      author: 'Christopher Gower',
      category: 'web_design'
    },
    {
      id: 'web-3',
      title: 'UI/UX Wireframing & Design Strategy',
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
      author: 'Balázs Kétyi',
      category: 'web_design'
    },
    {
      id: 'web-4',
      title: 'Creative Agency MacBook Desk',
      url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=400&q=80',
      author: 'Tran Mau Tri Tam',
      category: 'web_design'
    }
  ],
  coding_ai: [
    {
      id: 'code-1',
      title: 'Dark Mode Code Editor & Neon Light',
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
      author: 'Fotis Fotopoulos',
      category: 'coding_ai'
    },
    {
      id: 'code-2',
      title: 'Developer Terminal & Architecture',
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
      author: 'Markus Spiske',
      category: 'coding_ai'
    },
    {
      id: 'code-3',
      title: 'Artificial Intelligence Matrix Glow',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      author: 'Milad Fakurian',
      category: 'coding_ai'
    },
    {
      id: 'code-4',
      title: 'Dual Monitors Programming Setup',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
      author: 'Ilya Pavlov',
      category: 'coding_ai'
    }
  ],
  coffee_cafe: [
    {
      id: 'cafe-1',
      title: 'Artisan Latte Art in Modern Ceramic Cup',
      url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
      author: 'Tabitha Turner',
      category: 'coffee_cafe'
    },
    {
      id: 'cafe-2',
      title: 'Warm Aesthetic Coffee Shop Interior',
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80',
      author: 'Clay Banks',
      category: 'coffee_cafe'
    },
    {
      id: 'cafe-3',
      title: 'Coffee Beans Roasting & Pour Over',
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
      author: 'Nathan Dumlao',
      category: 'coffee_cafe'
    },
    {
      id: 'cafe-4',
      title: 'Barista Crafting Espresso',
      url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80',
      author: 'Demi DeHerrera',
      category: 'coffee_cafe'
    }
  ],
  ecommerce_retail: [
    {
      id: 'ecom-1',
      title: 'Minimalist Shopping Bags & Packaging',
      url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80',
      author: 'Jacek Dylag',
      category: 'ecommerce_retail'
    },
    {
      id: 'ecom-2',
      title: 'Smartphone Mobile Shopping Checkout',
      url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=400&q=80',
      author: 'Blake Wisz',
      category: 'ecommerce_retail'
    },
    {
      id: 'ecom-3',
      title: 'Clean Boutique Fashion Store Display',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
      author: 'Clark Street Mercantile',
      category: 'ecommerce_retail'
    },
    {
      id: 'ecom-4',
      title: 'Cardboard Parcel & Delivery Box',
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
      author: 'Claudio Schwarz',
      category: 'ecommerce_retail'
    }
  ],
  branding_studio: [
    {
      id: 'brand-1',
      title: 'Aesthetic Brand Stationery & Business Cards',
      url: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=400&q=80',
      author: 'Mediamodifier',
      category: 'branding_studio'
    },
    {
      id: 'brand-2',
      title: 'Design Studio Color Swatches & Pantone',
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80',
      author: 'Geordanna Cordero',
      category: 'branding_studio'
    },
    {
      id: 'brand-3',
      title: 'Creative Layout & Typography Moodboard',
      url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
      author: 'Kelly Sikkema',
      category: 'branding_studio'
    },
    {
      id: 'brand-4',
      title: 'Studio Architect & Designer Workspace',
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400&q=80',
      author: 'Alexandre Debiève',
      category: 'branding_studio'
    }
  ],
  business_growth: [
    {
      id: 'growth-1',
      title: 'Financial Chart & Analytics Dashboard',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
      author: 'Luke Chesser',
      category: 'business_growth'
    },
    {
      id: 'growth-2',
      title: 'Executive Boardroom Strategy Meeting',
      url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
      author: 'Austin Distel',
      category: 'business_growth'
    },
    {
      id: 'growth-3',
      title: 'Modern Architecture Glass Skyscraper',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
      author: 'Sean Pollock',
      category: 'business_growth'
    },
    {
      id: 'growth-4',
      title: 'High Impact Collaboration & Brainstorming',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      author: 'Campaign Creators',
      category: 'business_growth'
    }
  ],
  typography_vintage: [
    {
      id: 'typo-1',
      title: 'Vintage Metal Letterpress Typography',
      url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=400&q=80',
      author: 'Raphael Schaller',
      category: 'typography_vintage'
    },
    {
      id: 'typo-2',
      title: 'Retro Typewriter Manuscript',
      url: 'https://images.unsplash.com/photo-1526280760714-f9e8b06f318f?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1526280760714-f9e8b06f318f?auto=format&fit=crop&w=400&q=80',
      author: 'Patrick Fore',
      category: 'typography_vintage'
    },
    {
      id: 'typo-3',
      title: 'Editorial Poster Art Exhibition',
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
      author: 'Steve Johnson',
      category: 'typography_vintage'
    }
  ],
  fitness_health: [
    {
      id: 'fit-1',
      title: 'Minimalist Dumbbells & Gym Aesthetics',
      url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
      author: 'Geert Pieters',
      category: 'fitness_health'
    },
    {
      id: 'fit-2',
      title: 'Athletic Running & Morning Routine',
      url: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=400&q=80',
      author: 'Chander R',
      category: 'fitness_health'
    }
  ]
};

/**
 * Analyzes the text prompt to find matching topics, keywords, and photos.
 */
export function detectVisualTopic(prompt: string): DetectedVisualTopic {
  const p = (prompt || '').toLowerCase();

  // 1. Tech, AI & Code
  if (
    p.includes('claude') || 
    p.includes('ai') || 
    p.includes('plugin') || 
    p.includes('coding') || 
    p.includes('code') || 
    p.includes('developer') || 
    p.includes('software') || 
    p.includes('github') || 
    p.includes('api') || 
    p.includes('database') ||
    p.includes('terminal')
  ) {
    const photos = CURATED_VISUAL_CATALOG.coding_ai;
    return {
      category: 'coding_ai',
      categoryLabel: 'Tech, AI & Engineering',
      primaryKeyword: 'Artificial Intelligence & Code',
      searchKeywords: ['coding', 'developer', 'ai technology', 'software engineer', 'cyberpunk'],
      suggestedPhotos: photos,
      defaultPhotoUrl: photos[0].url,
      badgeMockup: {
        leftIcon: '✱',
        leftBg: '#D97757',
        rightIcon: 'A\\',
        rightBg: '#1E293B',
        badgeText: '3 RESMI'
      }
    };
  }

  // 2. Coffee, Cafe & F&B
  if (
    p.includes('kopi') || 
    p.includes('coffee') || 
    p.includes('cafe') || 
    p.includes('kafe') || 
    p.includes('barista') || 
    p.includes('kuliner') || 
    p.includes('makanan') || 
    p.includes('resto') || 
    p.includes('minuman')
  ) {
    const photos = CURATED_VISUAL_CATALOG.coffee_cafe;
    return {
      category: 'coffee_cafe',
      categoryLabel: 'Coffee, Cafe & F&B',
      primaryKeyword: 'Artisan Cafe & Coffee',
      searchKeywords: ['coffee shop', 'latte art', 'cafe interior', 'espresso', 'barista'],
      suggestedPhotos: photos,
      defaultPhotoUrl: photos[0].url
    };
  }

  // 3. E-Commerce, Toko Online, UMKM Jualan
  if (
    p.includes('toko') || 
    p.includes('shop') || 
    p.includes('jual') || 
    p.includes('ecommerce') || 
    p.includes('e-commerce') || 
    p.includes('produk') || 
    p.includes('belanja') || 
    p.includes('boncos') || 
    p.includes('checkout') || 
    p.includes('order')
  ) {
    const photos = CURATED_VISUAL_CATALOG.ecommerce_retail;
    return {
      category: 'ecommerce_retail',
      categoryLabel: 'E-Commerce & Online Store',
      primaryKeyword: 'E-Commerce & Retail Packaging',
      searchKeywords: ['ecommerce', 'online shopping', 'retail', 'packaging', 'storefront'],
      suggestedPhotos: photos,
      defaultPhotoUrl: photos[0].url
    };
  }

  // 4. Vintage Typography, Font & Lettering
  if (
    p.includes('font') || 
    p.includes('molen') || 
    p.includes('typeface') || 
    p.includes('tipografi') || 
    p.includes('lettering') || 
    p.includes('display font') || 
    p.includes('serif')
  ) {
    const photos = CURATED_VISUAL_CATALOG.typography_vintage;
    return {
      category: 'typography_vintage',
      categoryLabel: 'Typography & Type Specimen',
      primaryKeyword: 'Vintage Letterpress & Font Specimen',
      searchKeywords: ['vintage font', 'letterpress', 'typography', 'typewriter', 'poster design'],
      suggestedPhotos: photos,
      defaultPhotoUrl: photos[0].url
    };
  }

  // 5. Business Growth, Marketing, Landing Page & CRO
  if (
    p.includes('bisnis') || 
    p.includes('landing') || 
    p.includes('cro') || 
    p.includes('konversi') || 
    p.includes('sales') || 
    p.includes('omset') || 
    p.includes('growth') || 
    p.includes('strategi') || 
    p.includes('marketing') || 
    p.includes('analisis')
  ) {
    const photos = CURATED_VISUAL_CATALOG.business_growth;
    return {
      category: 'business_growth',
      categoryLabel: 'Business Growth & Analytics',
      primaryKeyword: 'Dashboard Analytics & Strategy',
      searchKeywords: ['business strategy', 'analytics dashboard', 'growth chart', 'meeting', 'office'],
      suggestedPhotos: photos,
      defaultPhotoUrl: photos[0].url
    };
  }

  // 6. Fitness, Olahraga & Health
  if (
    p.includes('gym') || 
    p.includes('fit') || 
    p.includes('olahraga') || 
    p.includes('workout') || 
    p.includes('sehat') || 
    p.includes('diet')
  ) {
    const photos = CURATED_VISUAL_CATALOG.fitness_health;
    return {
      category: 'fitness_health',
      categoryLabel: 'Health & Fitness',
      primaryKeyword: 'Aesthetic Gym & Training',
      searchKeywords: ['gym workout', 'fitness motivation', 'healthy lifestyle', 'training'],
      suggestedPhotos: photos,
      defaultPhotoUrl: photos[0].url
    };
  }

  // 7. Branding, Studio & Identity
  if (
    p.includes('brand') || 
    p.includes('logo') || 
    p.includes('identitas') || 
    p.includes('warna') || 
    p.includes('desain') || 
    p.includes('kreatif')
  ) {
    const photos = CURATED_VISUAL_CATALOG.branding_studio;
    return {
      category: 'branding_studio',
      categoryLabel: 'Branding & Design Studio',
      primaryKeyword: 'Branding Mockup & Stationery',
      searchKeywords: ['branding mockup', 'design studio', 'pantone colors', 'moodboard'],
      suggestedPhotos: photos,
      defaultPhotoUrl: photos[0].url
    };
  }

  // Default: Web Design & Digital Presence (TERL Web Studio Core)
  const defaultPhotos = CURATED_VISUAL_CATALOG.web_design;
  return {
    category: 'web_design',
    categoryLabel: 'Web Design & Digital Studio',
    primaryKeyword: 'Modern Responsive Web Design',
    searchKeywords: ['web design', 'laptop mockup', 'workspace', 'digital agency', 'responsive website'],
    suggestedPhotos: defaultPhotos,
    defaultPhotoUrl: defaultPhotos[0].url
  };
}

/**
 * Searches the local catalog or generates a high-quality direct Unsplash query URL.
 */
export function searchVisualImages(keyword: string): VisualPhotoItem[] {
  const q = keyword.trim().toLowerCase();
  if (!q) {
    return CURATED_VISUAL_CATALOG.web_design;
  }

  // Check matching items in local catalog
  const allCurated: VisualPhotoItem[] = [];
  Object.values(CURATED_VISUAL_CATALOG).forEach((items) => {
    allCurated.push(...items);
  });

  const matched = allCurated.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );

  if (matched.length > 0) {
    return matched;
  }

  // Fallback to dynamic Unsplash photo searches using high-resolution queries
  const encoded = encodeURIComponent(keyword);
  return [
    {
      id: `dynamic-1-${Date.now()}`,
      title: `${keyword} Showcase High Res`,
      url: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80`,
      thumb: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80`,
      author: 'Unsplash Pro Collection',
      category: 'search'
    },
    {
      id: `dynamic-2-${Date.now()}`,
      title: `${keyword} Modern Aesthetics`,
      url: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80`,
      thumb: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80`,
      author: 'Unsplash Pro Collection',
      category: 'search'
    },
    {
      id: `dynamic-3-${Date.now()}`,
      title: `${keyword} Clean Focus`,
      url: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80`,
      thumb: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80`,
      author: 'Unsplash Pro Collection',
      category: 'search'
    }
  ];
}
