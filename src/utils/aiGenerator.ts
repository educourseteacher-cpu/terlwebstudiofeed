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
  const p = prompt.trim() || 'Strategi Membangun Website & Branding Bisnis Modern';
  const lower = p.toLowerCase();
  const visualContext = detectVisualTopic(p);

  let mainTitle = p.length > 55 ? p.substring(0, 55).toUpperCase() : p.toUpperCase();
  let highlightBanner = 'BEDA LEVEL';
  let subtitle = 'PANDUAN LENGKAP 2026 // MASTERPLAY';
  let headerBadge = 'HIGH DENSITY INSIGHT';
  let points = [
    {
      number: '01',
      title: 'FIRST IMPRESSION DALAM 3 DETIK',
      desc: 'Pengunjung menilai kredibilitas dalam sekejap. Gunakan headline benefit langsung tanpa intro bertele-tele.',
      tag: 'PSIKOLOGI'
    },
    {
      number: '02',
      title: 'OPTIMASI MOBILE & SPEED < 1.5 DETIK',
      desc: '83% calon pembeli membuka via smartphone. Keterlambatan loading 1 detik memangkas 26% peluang konversi.',
      tag: 'PERFORMA'
    },
    {
      number: '03',
      title: 'SOCIAL PROOF DI ATAS LIPATAN LAYAR',
      desc: 'Tampilkan testimoni, logo partner, dan rating terverifikasi tepat sebelum scroll pertama pengunjung.',
      tag: 'TRUST'
    },
    {
      number: '04',
      title: 'FOCUSED CALL-TO-ACTION TANPA FRIKSI',
      desc: 'Hindari navigasi yang membingungkan. Arahkan mata audiens langsung ke tombol aksi bernilai tertinggi.',
      tag: 'KONVERSI'
    }
  ];

  let takeawayBox = {
    label: 'FORMULA EKSEKUSI',
    formula: 'Clarity Headline + Bukti Sosial Cepat + Loading Gesit = High Conversion Trust',
    metric: 'TARGET: 3.4X CLOSING'
  };

  if (lower.includes('domain') || lower.includes('nama')) {
    mainTitle = 'BLUEPRINT MEMILIH DOMAIN WEBSITE BISNIS TERPERCAYA';
    highlightBanner = 'HIGH TRUST';
    subtitle = 'STRATEGI BRAND ASSET';
    headerBadge = 'ASSET BLUEPRINT';
    points = [
      { number: '01', title: 'PRIORITASKAN EKSTENSI .COM', desc: 'Konsumen secara reflek mengetik .com. Ekstensi asing atau gratisan memicu persepsi tidak profesional.', tag: 'KREDIBILITAS' },
      { number: '02', title: 'LOLOS RADIO TEST (MUDAH DIUCAPKAN)', desc: 'Pastikan nama mudah dieja saat ditelepon tanpa perlu klarifikasi huruf ganda, tanda hubung (-), atau angka berbelit.', tag: 'USABILITY' },
      { number: '03', title: 'SELARASKAN USERNAME MEDIA SOSIAL', desc: 'Sinkronisasi handle Instagram, TikTok, dan domain web agar brand tampil solid dan tidak diragukan calon buyer.', tag: 'OMNICHANNEL' },
      { number: '04', title: 'LINDUNGI VARIAN TYPO UTAMA', desc: 'Amankan variasi ejaan umum sebelum kompetitor membajak traffic organik bisnis Anda.', tag: 'PROTEKSI' }
    ];
    takeawayBox = {
      label: 'RUMUS DOMAIN JUARA',
      formula: 'Singkat (< 12 Huruf) + Ekstensi .com + Sinkron Akun Medsos + Lolos Tes Dengar',
      metric: 'BENCHMARK: 100% RECALL'
    };
  } else if (lower.includes('umkm') || lower.includes('kesalahan') || lower.includes('boncos')) {
    mainTitle = 'AUDIT KESALAHAN FATAL WEBSITE UMKM YANG MEMBUNUH SALES';
    highlightBanner = 'STOP RUGI';
    subtitle = 'DETEKSI KEBOCORAN TRAFFIC';
    headerBadge = 'DIAGNOSIS 2026';
    points = [
      { number: '01', title: 'IKLAN DIIKLANKAN KE WEB LEMOT', desc: 'Membakar budget iklan ke halaman yang loadingnya > 3 detik sama dengan membuang 60% anggaran ke tong sampah.', tag: 'BUDGET LEAK' },
      { number: '02', title: 'TIDAK MENJAWAB "APA UNTUNGNYA BUAT SAYA"', desc: 'Website hanya membanggakan profil perusahaan, bukan mengurai solusi nyata untuk problem spesifik calon pelanggan.', tag: 'COPYWRITING' },
      { number: '03', title: 'TOMBOL ORDER WHATSAPP TERSEMBUNYI', desc: 'Perilaku konsumen lokal menginginkan respon cepat. Tombol WhatsApp melayang meningkatkan respons closing hingga 48%.', tag: 'ACCESSIBILITY' },
      { number: '04', title: 'LAYOUT HANCUR DI SMARTPHONE', desc: 'Teks tumpang tindih dan gambar pecah seketika mematikan keyakinan buyer untuk transfer uang.', tag: 'UI/UX RISK' }
    ];
    takeawayBox = {
      label: 'SOLUSI PERBAIKAN KILAT',
      formula: 'Speed < 1.5s + Copy Solutif + Floating WhatsApp Button + Mobile Flawless',
      metric: 'TARGET: HEMAT BUDGET 50%'
    };
  } else if (lower.includes('kopi') || lower.includes('coffee') || lower.includes('cafe') || lower.includes('kafe')) {
    mainTitle = 'STRATEGI BRANDING & DESAIN WEB COFFEE SHOP KEKINIAN';
    highlightBanner = 'COFFEE VIBES';
    subtitle = 'F&B BRANDING GUIDE';
    headerBadge = 'CAFE INSIGHT';
    points = [
      { number: '01', title: 'FOTO MENU AESTHETIC & TAJAM', desc: 'Visual latte art dan ambience kafe yang menggugah selera menaikkan foot traffic hingga 40%.', tag: 'AESTHETIC' },
      { number: '02', title: 'INTEGRASI GOOGLE MAPS & MENU DIGITAL', desc: 'Mudahkan pelanggan menemukan titik lokasi dan mengecek daftar harga sebelum datang ke outlet.', tag: 'LOCATION' },
      { number: '03', title: 'ATMOSFER & STORYTELLING BIJI KOPI', desc: 'Ceritakan asal usul biji kopi dan barista pilihan untuk membangun nilai premium dan harga tinggi.', tag: 'STORY' },
      { number: '04', title: 'RESERVASI MEJA 1-KLIK DI INSTAGRAM', desc: 'Hilangkan friksi booking untuk acara komunitas, meeting, atau nongkrong kelompok.', tag: 'CONVERSION' }
    ];
    takeawayBox = {
      label: 'FORMULA CAFE VIRAL',
      formula: 'Foto Menggoda + Lokasi 1-Klik + Cerita Otentik + Booking Instan',
      metric: 'FOOT TRAFFIC: +45%'
    };
  } else if (lower.includes('claude') || lower.includes('plugin') || lower.includes('ai') || lower.includes('code')) {
    mainTitle = 'PLUGIN ANDALAN YANG BIKIN WORKFLOW CODING BEDA LEVEL';
    highlightBanner = 'BEDA LEVEL';
    subtitle = 'AI ENGINEERING TOOLS';
    headerBadge = 'CLAUDE CODE';
    points = [
      { number: '01', title: 'GITHUB & REPO INTEGRATION', desc: 'Membaca PR, auto-commit, dan review kode langsung dari terminal editor tanpa alt-tab.', tag: 'WORKFLOW' },
      { number: '02', title: 'DATABASE SCHEMA SYNC', desc: 'Audit skema SQL dan jalankan migrasi dengan verifikasi query otomatis dan aman.', tag: 'DATABASE' },
      { number: '03', title: 'FIGMA TO CODE EXTRACTOR', desc: 'Ubah token desain UI menjadi komponen frontend siap pakai dalam sekejap.', tag: 'DEVELOPMENT' },
      { number: '04', title: 'AUTOMATED TEST SUITE RUNNER', desc: 'Menghasilkan unit test otomatis dan memverifikasi edge cases sebelum rilis ke staging.', tag: 'TESTING' }
    ];
    takeawayBox = {
      label: 'RUMUS PRODUKTIVITAS 10X',
      formula: 'Terminal AI Agent + Context Grounding + Automated Verification Tests',
      metric: 'EFFICIENCY: 4.5X CEPAT'
    };
  }

  return {
    mainTitle,
    highlightBanner,
    subtitle,
    headerBadge,
    points,
    takeawayBox,
    densityMode: 'comprehensive',
    footer: '< GROWTH YOUR BRANDING >',
    subLink: theme === 'techhook' ? 'Geser ❯' : theme === 'foresttype' ? 'Download : freefonts.io' : undefined,
    caption: `🔥 ${p}\n\nBanyak orang memandang remeh hal ini sampai akhirnya menyadari konversi bisnis mereka stuck dan budget marketing terbuang sia-sia.\n\nBerikut ringkasan lengkap framework actionable yang kami terapkan di TERL Web Studio:\n\n1️⃣ ${points[0].title}: ${points[0].desc}\n2️⃣ ${points[1].title}: ${points[1].desc}\n3️⃣ ${points[2].title}: ${points[2].desc}\n${points[3] ? `4️⃣ ${points[3].title}: ${points[3].desc}\n` : ''}\n💡 ${takeawayBox.label}: ${takeawayBox.formula} (${takeawayBox.metric})\n\n📌 Simpan panduan ini agar tidak lupa!\nKomen pendapat Anda di bawah ya! 👇`,
    hashtags: [
      '#terlwebstudio', '#growtyourbranding', '#webdesign', '#digitalbranding',
      '#instagramfeed', '#marketingtips', '#bisnisonline', '#uidesign', '#copywriting'
    ],
    imageUrl: visualContext.defaultPhotoUrl,
    imageKeyword: visualContext.primaryKeyword,
    showImage: false,
    imageLayout: 'card'
  };
}

export function generateClientCarousel(prompt: string, slideCount: number = 6): SlideItem[] {
  const p = prompt.trim() || 'Strategi Desain Web & Branding Modern';
  const visualContext = detectVisualTopic(p);
  const slides: SlideItem[] = [];
  const targetCount = Math.max(4, Math.min(slideCount, 7));

  // Slide 1: Cover (Hook & Curiosity)
  slides.push({
    id: `slide-1`,
    slideType: 'cover',
    badge: 'SLIDE 01 // PRO STRATEGY',
    title: p.toUpperCase(),
    highlightBanner: 'BEDA LEVEL',
    description: 'Framework teruji dari TERL Web Studio untuk membangun digital authority berbobot tinggi.',
    statNumber: '10X',
    statLabel: 'Brand Impact',
    customFooter: '< GROWTH YOUR BRANDING >',
    imageUrl: visualContext.defaultPhotoUrl,
    imageKeyword: visualContext.primaryKeyword,
    showImage: false,
    imageLayout: 'card'
  });

  // Slide 2: Problem Diagnosis
  slides.push({
    id: `slide-2`,
    slideType: 'problem',
    badge: 'DIAGNOSA // ROOT CAUSE',
    title: 'KENAPA 87% BISNIS STUCK DI FASE INI?',
    description: 'Banyak brand menghabiskan modal besar untuk dekorasi visual rumit tanpa menyadari akar masalah sesungguhnya.',
    problemData: {
      warningTag: 'FATAL TRAP',
      painPoint: 'Tampilan website penuh jargon abstrak sehingga pengunjung gagal memahami produk dalam 3 detik.',
      impactText: 'Akibatnya calon prospek langsung klik tombol keluar (bounce) dan berpaling ke kompetitor.'
    },
    statNumber: '87%',
    statLabel: 'Traffic Mental',
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  // Slide 3: Framework Core Pillars
  slides.push({
    id: `slide-3`,
    slideType: 'framework',
    badge: 'METODOLOGI // 3 PILAR',
    title: 'FRAMEWORK EKSEKUSI TERUJI',
    description: '3 Fondasi terintegrasi yang wajib disiapkan sebelum meluncurkan kampanye branding digital.',
    frameworkSteps: [
      { stepNumber: '01', stepTitle: 'CLARITY HEADLINE', stepDetail: 'Jelaskan masalah dan solusi Anda dalam 1 kalimat tegas.' },
      { stepNumber: '02', stepTitle: 'SPEED & MOBILE-FIRST', stepDetail: 'Optimasi loading di bawah 1.5 detik pada semua tipe smartphone.' },
      { stepNumber: '03', stepTitle: 'SEAMLESS CONVERSION', stepDetail: 'Hadirkan 1 jalur CTA tanpa friksi menuju WhatsApp atau checkout.' }
    ],
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  // Slide 4: Comparison (Do vs Don't)
  slides.push({
    id: `slide-4`,
    slideType: 'comparison',
    badge: 'KOMPARASI // AUDIT NYATA',
    title: 'POLA PIKIR AMATIR VS POLA PIKIR PRO',
    description: 'Bandingkan pendekatan yang membakar biaya dengan pendekatan yang menghasilkan profit nyata.',
    comparisonData: {
      dontTitle: 'PENDEKATAN LAMA (HINDARI)',
      dontDesc: 'Menjejalkan semua katalog produk di depan dengan copy berbelit dan animasi berat.',
      doTitle: 'PENDEKATAN STRATEGIS (LAKUKAN)',
      doDesc: 'Fokus pada 1 pain point utama pelanggan dengan bukti sosial nyata dan navigasi responsif.'
    },
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  // Slide 5: Action Checklist
  if (targetCount >= 5) {
    slides.push({
      id: `slide-5`,
      slideType: 'checklist',
      badge: 'CHECKLIST // PRAKTIK LANGSUNG',
      title: 'DAFTAR VERIFIKASI SEBELUM LAUNCHING',
      description: 'Pastikan 4 elemen penting ini tercentang sebelum Anda merilis materi promosi ke publik.',
      checklistItems: [
        { text: 'Headline langsung mengutarakan benefit terbesar pembeli', tag: 'COPY', done: true },
        { text: 'Loading halaman lolos skor Google PageSpeed > 90', tag: 'PERFORMA', done: true },
        { text: 'Testimoni pelanggan diletakkan sebelum scroll pertama', tag: 'TRUST', done: true },
        { text: 'Nomor WhatsApp dan link navigasi teruji aktif tanpa error', tag: 'CLOSING', done: true }
      ],
      customFooter: '< GROWTH YOUR BRANDING >'
    });
  }

  // Slide 6: Visual Showcase (if 6 or 7 slides)
  if (targetCount >= 6) {
    const photoItem = visualContext.suggestedPhotos[0];
    slides.push({
      id: `slide-${targetCount - 1}`,
      slideType: 'visual',
      badge: `VISUAL // ${visualContext.categoryLabel.toUpperCase()}`,
      title: `VISUALISASI: ${visualContext.primaryKeyword.toUpperCase()}`,
      description: `Implementasi visual nyata yang selaras dengan topik "${p}". Memberikan konteks visual instan bagi audiens.`,
      statNumber: '01',
      statLabel: 'REAL CONTEXT',
      customFooter: '< GROWTH YOUR BRANDING >',
      imageUrl: photoItem.url,
      imageKeyword: visualContext.primaryKeyword,
      showImage: true,
      imageLayout: 'card'
    });
  }

  // Final CTA Slide
  slides.push({
    id: `slide-${targetCount}`,
    slideType: 'cta',
    badge: 'ACTION STEP // TERL STUDIO',
    title: 'SIAP SCALE UP BRAND DIGITAL ANDA?',
    description: 'Jangan biarkan bisnis Anda terlihat amatir di mata calon pelanggan berharga. Konsultasikan bersama tim kami.',
    statNumber: 'TERL',
    statLabel: 'STUDIO',
    customFooter: '< GROWTH YOUR BRANDING >',
    imageUrl: visualContext.suggestedPhotos[visualContext.suggestedPhotos.length - 1]?.url,
    imageKeyword: visualContext.primaryKeyword,
    showImage: false
  });

  return slides.slice(0, targetCount);
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
