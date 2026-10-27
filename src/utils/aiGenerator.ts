import { FeedContent, SlideItem } from '../types';

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
 * and produces tailored, high-converting social media content.
 */
export function generateClientFeed(prompt: string, theme: string): FeedContent {
  const p = prompt.trim();
  const lower = p.toLowerCase();

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
    ]
  };
}

export function generateClientCarousel(prompt: string, slideCount: number = 5): SlideItem[] {
  const p = prompt.trim() || 'Strategi Desain Web & Branding Modern';
  const slides: SlideItem[] = [];

  // Cover
  slides.push({
    id: `slide-1`,
    slideType: 'cover',
    badge: 'SLIDE 01 // OVERVIEW',
    title: p.toUpperCase(),
    highlightBanner: 'BEDA LEVEL',
    description: 'Framework teruji untuk menaikkan reputasi brand dan konversi penjualan Anda.',
    statNumber: '10X',
    statLabel: 'Brand Impact',
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  const insights = [
    { title: 'IDENTIFIKASI MASALAH UTAMA', desc: 'Banyak bisnis menumpuk informasi berlebihan hingga pengunjung bingung dan bounce rate naik.' },
    { title: 'STRUKTUR PESAN TO-THE-POINT', desc: 'Sampaikan value proposition produk Anda dalam 1 kalimat yang lugas dan mudah dipahami.' },
    { title: 'BANGUN KREDIBILITAS CEPAT', desc: 'Tampilkan bukti sosial seperti testimoni, review bintang, dan logo klien di atas lipatan layar.' },
    { title: 'PANDU KE LANGKAH BERIKUTNYA', desc: 'Tombol Call-to-Action (CTA) harus kontras, jelas, dan memandu prospek tanpa friksi.' }
  ];

  for (let i = 0; i < Math.min(slideCount - 2, insights.length); i++) {
    slides.push({
      id: `slide-${i + 2}`,
      slideType: i % 2 === 1 ? 'comparison' : 'insight',
      badge: `LANGKAH 0${i + 1} // PRAKTIK`,
      title: insights[i].title,
      description: insights[i].desc,
      statNumber: `0${i + 1}`,
      statLabel: 'KEY FOCUS',
      customFooter: '< GROWTH YOUR BRANDING >'
    });
  }

  // Final CTA Slide
  slides.push({
    id: `slide-${slideCount}`,
    slideType: 'cta',
    badge: 'FINAL STEP // ACTION',
    title: 'SIAP SCALE UP BRAND DIGITAL ANDA?',
    description: 'Jangan biarkan bisnis Anda terlihat amatir di mata calon pelanggan berharga.',
    statNumber: 'TERL',
    statLabel: 'STUDIO',
    customFooter: '< GROWTH YOUR BRANDING >'
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
        return { data: json.data, source: 'api' };
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
        return {
          slides: json.data.slides,
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
