import { FeedContent, SlideItem } from '../types';
import { detectVisualTopic } from './imageService';

export interface GenerateFeedParams {
  prompt: string;
  theme: string;
  tone?: string;
  language?: string;
}

export interface GenerateCarouselParams {
  prompt: string;
  slideCount?: number;
  theme?: string;
  language?: string;
}

/**
 * Intelligent client-side generator that understands prompt topics
 * and produces tailored, high-converting social media content with
 * automatically matched relevant photos and visual elements.
 */
export function generateClientFeed(prompt: string, theme: string): FeedContent {
  const p = prompt.trim();
  const lower = p.toLowerCase();
  const visualContext = detectVisualTopic(p);

  let mainTitle = p.length > 55 ? p.substring(0, 55).toUpperCase() : p.toUpperCase();
  let highlightBanner = 'BEDA LEVEL';
  let subtitle = 'PANDUAN PRAKTIS 2026';
  let headerBadge = 'HIGH IMPACT INSIGHT';
  let points = [
    {
      number: '01',
      title: 'FOKUS PADA FIRST IMPRESSION',
      desc: 'Pengunjung hanya butuh 3 detik untuk memutuskan. Desain bersih dan headline tegas adalah kunci utama.',
      tag: 'CRITICAL'
    },
    {
      number: '02',
      title: 'OPTIMASI SPEED & MOBILE-FIRST',
      desc: 'Lebih dari 80% traffic dari smartphone. Kecepatan loading tinggi melipatgandakan konversi penjualan.',
      tag: 'PERFORMANCE'
    },
    {
      number: '03',
      title: 'CLEAR CALL TO ACTION (CTA)',
      desc: 'Arahkan pengunjung secara gamblang ke aksi berikutnya tanpa navigasi berbelit.',
      tag: 'CONVERSION'
    }
  ];

  if (lower.includes('domain')) {
    mainTitle = 'TIPS MEMILIH DOMAIN WEBSITE YANG TEPAT UNTUK BISNIS';
    highlightBanner = 'BRAND TRUST';
    subtitle = 'STRATEGI BRAND IDENTITY';
    headerBadge = 'DOMAIN GUIDE';
    points = [
      { number: '01', title: 'GUNAKAN EKSTENSI .COM', desc: 'Lebih dipercaya dan mudah diingat audiens global dibanding ekstensi asing.', tag: 'TRUST' },
      { number: '02', title: 'SINGKAT & MUDAH DIKETIK', desc: 'Hindari tanda hubung (-), angka membingungkan, atau ejaan yang rumit.', tag: 'USABILITY' },
      { number: '03', title: 'SESUAI NAMA BRAND UTAMA', desc: 'Membangun konsistensi identitas digital di semua platform media sosial.', tag: 'CONSISTENCY' }
    ];
  } else if (lower.includes('umkm') || lower.includes('kesalahan') || lower.includes('boncos')) {
    mainTitle = 'KESALAHAN FATAL SAAT MEMBUAT WEBSITE BISNIS';
    highlightBanner = 'STOP RUGI';
    subtitle = 'AUDIT WEBSITE 2026';
    headerBadge = 'CRITICAL WARNING';
    points = [
      { number: '01', title: 'LOADING LEBIH DARI 3 DETIK', desc: '53% calon konsumen menutup web jika lemot. Anggaran iklan langsung terbuang sia-sia.', tag: 'SPEED' },
      { number: '02', title: 'TAMPILAN RUSAK DI HP', desc: 'Mayoritas pembeli browsing lewat smartphone. Desain wajib responsif sempurna.', tag: 'MOBILE' },
      { number: '03', title: 'TIDAK ADA TOMBOL WA JELAS', desc: 'Konsumen Indonesia suka chat kilat. Pastikan tombol kontak melayang di layar.', tag: 'CLOSING' }
    ];
  } else if (lower.includes('kopi') || lower.includes('coffee') || lower.includes('cafe') || lower.includes('kafe')) {
    mainTitle = 'STRATEGI BRANDING & DESAIN WEB COFFEE SHOP KEKINIAN';
    highlightBanner = 'COFFEE VIBES';
    subtitle = 'F&B BRANDING GUIDE';
    headerBadge = 'CAFE INSIGHT';
    points = [
      { number: '01', title: 'FOTO MENU AESTHETIC & TAJAM', desc: 'Visual latte art dan ambience kafe yang menggugah selera menaikkan foot traffic hingga 40%.', tag: 'AESTHETIC' },
      { number: '02', title: 'INTEGRASI GOOGLE MAPS & MENU', desc: 'Mudahkan pelanggan menemukan titik lokasi dan mengecek daftar harga sebelum datang.', tag: 'LOCATION' },
      { number: '03', title: 'ATMOSFER & STORYTELLING BIJI KOPI', desc: 'Ceritakan asal usul biji kopi dan barista pilihan untuk membangun nilai premium.', tag: 'STORY' }
    ];
  } else if (lower.includes('claude') || lower.includes('plugin') || lower.includes('ai') || lower.includes('code')) {
    mainTitle = 'PLUGIN ANDALAN YANG BIKIN WORKFLOW CODING BEDA LEVEL';
    highlightBanner = 'BEDA LEVEL';
    subtitle = 'AI ENGINEERING TOOLS';
    headerBadge = 'CLAUDE CODE';
    points = [
      { number: '01', title: 'GITHUB & REPO INTEGRATION', desc: 'Membaca PR, auto-commit, dan review kode langsung dari terminal editor.', tag: 'WORKFLOW' },
      { number: '02', title: 'DATABASE SCHEMA SYNC', desc: 'Audit skema SQL dan jalankan migrasi dengan verifikasi query otomatis.', tag: 'DATABASE' },
      { number: '03', title: 'FIGMA TO CODE EXTRACTOR', desc: 'Ubah token desain UI menjadi komponen frontend siap pakai dalam sekejap.', tag: 'DEVELOPMENT' }
    ];
  } else if (lower.includes('font') || lower.includes('molen') || lower.includes('tipografi') || lower.includes('desain')) {
    mainTitle = 'TYPE SPECIMEN: VINTAGE DISPLAY FONT INSPIRATION';
    highlightBanner = 'MO\nLEN';
    subtitle = 'Molen Typo';
    headerBadge = 'FONT SPECIMEN';
    points = [
      { number: 'Aa', title: 'ORGANIC BUBBLE CURVES', desc: 'Bentuk huruf membulat tebal memberikan kesan vintage 70s yang hangat & berkarakter.', tag: 'DISPLAY' },
      { number: '01', title: 'HERO HEADLINE DOMINANCE', desc: 'Sangat cocok untuk poster, kemasan produk, streetwear, dan logo display.', tag: 'USE CASE' },
      { number: 'Ot', title: 'LIGATURES & SPECIAL GLYPHS', desc: 'Dilengkapi set alternatif karakter untuk variasi eksplorasi layout kreatif.', tag: 'FEATURES' }
    ];
  } else if (lower.includes('landing') || lower.includes('cro') || lower.includes('konversi')) {
    mainTitle = 'PRINSIP DESAIN LANDING PAGE DENGAN KONVERSI TINGGI';
    highlightBanner = 'HIGH CONVERSION';
    subtitle = 'CRO FRAMEWORK';
    headerBadge = 'LANDING PAGE';
    points = [
      { number: '01', title: 'HEADLINE JELASKAN BENEFIT', desc: 'Jelaskan apa masalah yang Anda selesaikan dalam 5 detik pertama membaca.', tag: 'CLARITY' },
      { number: '02', title: 'RUANG NEGATIF (WHITESPACE)', desc: 'Beri ruang napas pada elemen visual agar mata terarah tepat ke tombol order.', tag: 'FOCUS' },
      { number: '03', title: 'BUKTI SOSIAL OTENTIK', desc: 'Tampilkan testimoni pembeli nyata dengan foto dan angka hasil yang terukur.', tag: 'PROOF' }
    ];
  }

  return {
    mainTitle,
    highlightBanner,
    subtitle,
    headerBadge,
    points,
    footer: '< GROWTH YOUR BRANDING >',
    subLink: theme === 'techhook' ? 'Geser ❯' : theme === 'foresttype' ? 'Download : freefonts.io' : undefined,
    caption: `🔥 ${p} — Simak 3 fondasi penting ini sebelum terlambat!\n\nDi era serba cepat, audiens Anda tidak membaca melainkan memindai (skimming). Jika pesan Anda rumit, mereka akan berpindah ke kompetitor.\n\nSimpan postingan ini agar tidak lupa! 📌\n\nKomen pendapat Anda di bawah ya! 👇`,
    hashtags: [
      '#terlwebstudio', '#growtyourbranding', '#webdesign', '#digitalbranding',
      '#instagramfeed', '#marketingtips', '#bisnisonline', '#uidesign'
    ],
    // Visual auto-detection
    imageUrl: visualContext.defaultPhotoUrl,
    imageKeyword: visualContext.primaryKeyword,
    showImage: false, // Default off in points mode, can be turned on by user
    imageLayout: 'card'
  };
}

export function generateClientCarousel(prompt: string, slideCount: number = 5): SlideItem[] {
  const p = prompt.trim() || 'Strategi Desain Web & Branding Modern';
  const visualContext = detectVisualTopic(p);
  const slides: SlideItem[] = [];

  // Slide 1: Cover
  slides.push({
    id: `slide-1`,
    slideType: 'cover',
    badge: 'SLIDE 01 // OVERVIEW',
    title: p.toUpperCase(),
    highlightBanner: 'BEDA LEVEL',
    description: 'Framework teruji untuk menaikkan reputasi brand dan konversi penjualan Anda.',
    statNumber: '10X',
    statLabel: 'Brand Impact',
    customFooter: '< GROWTH YOUR BRANDING >',
    imageUrl: visualContext.defaultPhotoUrl,
    imageKeyword: visualContext.primaryKeyword,
    showImage: false,
    imageLayout: 'card'
  });

  const insights = [
    { title: 'IDENTIFIKASI MASALAH UTAMA', desc: 'Banyak bisnis menumpuk informasi berlebihan hingga pengunjung bingung dan bounce rate naik.' },
    { title: 'STRUKTUR PESAN TO-THE-POINT', desc: 'Sampaikan value proposition produk Anda dalam 1 kalimat yang lugas dan mudah dipahami.' },
    { title: 'BANGUN KREDIBILITAS CEPAT', desc: 'Tampilkan bukti sosial seperti testimoni, review bintang, dan logo klien di atas lipatan layar.' },
    { title: 'PANDU KE LANGKAH BERIKUTNYA', desc: 'Tombol Call-to-Action (CTA) harus kontras, jelas, dan memandu prospek tanpa friksi.' }
  ];

  // Distribute intermediate slides, making sure one dedicated slide is a VISUAL SHOWCASE
  const count = Math.max(3, slideCount);
  const visualSlideIdx = Math.min(2, count - 2); // Put visual showcase on slide 2 or 3

  for (let i = 1; i < count - 1; i++) {
    const isVisualSlot = i === visualSlideIdx;
    const photoItem = visualContext.suggestedPhotos[(i - 1) % visualContext.suggestedPhotos.length] || visualContext.suggestedPhotos[0];

    if (isVisualSlot) {
      slides.push({
        id: `slide-${i + 1}`,
        slideType: 'visual',
        badge: `VISUAL // ${visualContext.categoryLabel.toUpperCase()}`,
        title: `VISUALISASI: ${visualContext.primaryKeyword.toUpperCase()}`,
        description: `Implementasi visual yang relevan dengan topik "${p}". Memberikan konteks nyata yang mudah dipahami audiens dalam sekali lihat.`,
        statNumber: '02',
        statLabel: 'VISUAL CONTEXT',
        customFooter: '< GROWTH YOUR BRANDING >',
        imageUrl: photoItem.url,
        imageKeyword: visualContext.primaryKeyword,
        showImage: true,
        imageLayout: 'card'
      });
    } else if (i % 2 === 0) {
      slides.push({
        id: `slide-${i + 1}`,
        slideType: 'comparison',
        badge: `LANGKAH 0${i + 1} // DO VS DONT`,
        title: insights[(i - 1) % insights.length].title,
        description: insights[(i - 1) % insights.length].desc,
        statNumber: `0${i + 1}`,
        statLabel: 'KEY FOCUS',
        customFooter: '< GROWTH YOUR BRANDING >',
        imageUrl: photoItem.url,
        imageKeyword: visualContext.primaryKeyword,
        showImage: false
      });
    } else {
      slides.push({
        id: `slide-${i + 1}`,
        slideType: 'insight',
        badge: `LANGKAH 0${i + 1} // PRAKTIK`,
        title: insights[(i - 1) % insights.length].title,
        description: insights[(i - 1) % insights.length].desc,
        statNumber: `0${i + 1}`,
        statLabel: 'KEY FOCUS',
        customFooter: '< GROWTH YOUR BRANDING >',
        imageUrl: photoItem.url,
        imageKeyword: visualContext.primaryKeyword,
        showImage: false
      });
    }
  }

  // Final CTA Slide
  slides.push({
    id: `slide-${count}`,
    slideType: 'cta',
    badge: 'FINAL STEP // ACTION',
    title: 'SIAP SCALE UP BRAND DIGITAL ANDA?',
    description: 'Jangan biarkan bisnis Anda terlihat amatir di mata calon pelanggan berharga.',
    statNumber: 'TERL',
    statLabel: 'STUDIO',
    customFooter: '< GROWTH YOUR BRANDING >',
    imageUrl: visualContext.suggestedPhotos[visualContext.suggestedPhotos.length - 1]?.url,
    imageKeyword: visualContext.primaryKeyword,
    showImage: false
  });

  return slides;
}

/**
 * Universal safe fetcher: tries API endpoint first, and if unavailable/HTML (Vercel without backend),
 * immediately falls back to high quality client generation!
 */
export async function generateContentUniversal(params: GenerateFeedParams): Promise<{ data: FeedContent; source: 'api' | 'local' }> {
  try {
    const res = await fetch('/api/generate-feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      if (json.success && json.data) {
        // Enrich with visual context if not present
        const visualContext = detectVisualTopic(params.prompt);
        return {
          data: {
            ...json.data,
            imageUrl: json.data.imageUrl || visualContext.defaultPhotoUrl,
            imageKeyword: json.data.imageKeyword || visualContext.primaryKeyword,
            showImage: json.data.showImage ?? false,
            imageLayout: json.data.imageLayout || 'card'
          },
          source: 'api'
        };
      }
    }
  } catch (err) {
    console.warn('API route unreachable, switching to local AI generator:', err);
  }

  // Fallback to rich client generator
  return {
    data: generateClientFeed(params.prompt, params.theme),
    source: 'local'
  };
}

export async function generateCarouselUniversal(params: GenerateCarouselParams): Promise<{ slides: SlideItem[]; caption?: string; source: 'api' | 'local' }> {
  try {
    const res = await fetch('/api/generate-carousel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      if (json.success && json.data && json.data.slides) {
        const visualContext = detectVisualTopic(params.prompt);
        const enrichedSlides = json.data.slides.map((s: SlideItem, idx: number) => ({
          ...s,
          imageUrl: s.imageUrl || visualContext.suggestedPhotos[idx % visualContext.suggestedPhotos.length]?.url || visualContext.defaultPhotoUrl,
          imageKeyword: s.imageKeyword || visualContext.primaryKeyword,
          showImage: s.slideType === 'visual' || s.slideType === 'showcase' || (idx === 1 && s.showImage !== false),
          imageLayout: s.imageLayout || 'card'
        }));

        return {
          slides: enrichedSlides,
          caption: json.data.caption,
          source: 'api'
        };
      }
    }
  } catch (err) {
    console.warn('API route unreachable, switching to local carousel generator:', err);
  }

  return {
    slides: generateClientCarousel(params.prompt, params.slideCount || 5),
    source: 'local'
  };
}
