import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;
const distPath = path.resolve(__dirname, 'dist');
const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));

app.use(express.json({ limit: '10mb' }));

// Enable CORS for all routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint for Cloud Run
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() });
});

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Fallback generator with deep creative reasoning if API key is not present or temporary error
function getFallbackFeed(prompt: string, theme: string) {
  const p = prompt.trim() || 'Strategi Membangun Website & Branding Bisnis Modern';
  const lower = p.toLowerCase();

  let mainTitle = p.length > 55 ? p.substring(0, 55).toUpperCase() : p.toUpperCase();
  let subtitle = 'PANDUAN LENGKAP 2026 // MASTERPLAY';
  let headerBadge = 'HIGH DENSITY INSIGHT';
  let highlightBanner = 'BEDA LEVEL';
  let points = [
    {
      number: '01',
      title: 'FIRST IMPRESSION DALAM 3 DETIK',
      desc: 'Pengunjung memutuskan kredibilitas dalam 50 milidetik. Gunakan visual hierarchy bersih dan benefit headline tegas tanpa jargon berbelit.',
      tag: 'PSIKOLOGI'
    },
    {
      number: '02',
      title: 'OPTIMASI MOBILE-FIRST & SPEED < 1.5S',
      desc: '83% calon pembeli mengakses lewat smartphone. Loading lambat 1 detik saja memangkas peluang closing hingga 26%.',
      tag: 'PERFORMA'
    },
    {
      number: '03',
      title: 'SOCIAL PROOF DI ATAS LIPATAN LAYAR',
      desc: 'Validasi keputusan calon pembeli dengan rating bintang, testimoni terverifikasi, dan logo partner tepat sebelum scroll pertama.',
      tag: 'VALIDASI'
    },
    {
      number: '04',
      title: 'SINGLE FOCUSED CTA (NO FRICTION)',
      desc: 'Jangan buat prospek bingung dengan 5 pilihan berbeda. Arahkan mata audiens langsung ke 1 tindakan konversi bernilai tertinggi.',
      tag: 'KONVERSI'
    }
  ];

  let takeawayBox = {
    label: 'FORMULA EKSEKUSI',
    formula: 'Clarity Headline + Validasi Kredibilitas Cepat + Speed Responsif = High Conversion Trust',
    metric: 'GOAL: 3.4X CLOSING'
  };

  if (lower.includes('domain') || lower.includes('nama')) {
    mainTitle = 'BLUEPRINT MEMILIH DOMAIN WEBSITE BISNIS TERPERCAYA';
    subtitle = 'STRATEGI BRAND ASSET';
    headerBadge = 'ASSET BLUEPRINT';
    highlightBanner = 'HIGH TRUST';
    points = [
      { number: '01', title: 'EKSTENSI .COM SEBAGAI DEFAULT', desc: 'Konsumen secara reflek mengetik .com. Ekstensi asing atau gratisan memicu persepsi scam dan menurunkan closing rate.', tag: 'KREDIBILITAS' },
      { number: '02', title: 'RADIO TEST (MUDAH DIUCAPKAN)', desc: 'Pastikan nama mudah dieja saat ditelepon tanpa perlu klarifikasi huruf ganda, tanda hubung (-), atau angka berbelit.', tag: 'USABILITY' },
      { number: '03', title: 'SELARASKAN USERNAME MEDIA SOSIAL', desc: 'Sinkronisasi handle Instagram, TikTok, dan domain web agar brand tampil solid dan tidak diragukan calon buyer.', tag: 'OMNICHANNEL' },
      { number: '04', title: 'LINDUNGI VARIASI TYPO UTAMA', desc: 'Amankan variasi ejaan umum sebelum kompetitor membajak traffic organik bisnis Anda.', tag: 'PROTEKSI' }
    ];
    takeawayBox = {
      label: 'RUMUS DOMAIN JUARA',
      formula: 'Singkat (< 12 Karakter) + Ekstensi .com + Selaras Akun Medsos + Lolos Tes Dengar',
      metric: 'BENCHMARK: 100% RECALL'
    };
  } else if (lower.includes('umkm') || lower.includes('boncos') || lower.includes('kesalahan')) {
    mainTitle = 'AUDIT KESALAHAN FATAL WEBSITE UMKM YANG MEMBUNUH SALES';
    subtitle = 'DETEKSI KEBOCORAN TRAFFIC';
    headerBadge = 'DIAGNOSIS 2026';
    highlightBanner = 'STOP RUGI';
    points = [
      { number: '01', title: 'TRAFFIC DIIKLANKAN KE WEB LEMOT', desc: 'Membakar budget iklan ke halaman yang loadingnya > 3 detik sama dengan membuang 60% anggaran langsung ke tong sampah.', tag: 'BUDGET LEAK' },
      { number: '02', title: 'TIDAK MENJAWAB "APA UNTUNGNYA BUAT SAYA"', desc: 'Website hanya membanggakan profil perusahaan, bukan mengurai solusi nyata untuk problem spesifik calon pelanggan.', tag: 'COPYWRITING' },
      { number: '03', title: 'TOMBOL ORDER WHATSAPP TERSEMBUNYI', desc: 'Perilaku konsumen lokal menginginkan respon cepat. Tombol WhatsApp melayang meningkatkan respons closing hingga 48%.', tag: 'ACCESSIBILITY' },
      { number: '04', title: 'TAMPILAN AMATIR RUSAK DI SMARTPHONE', desc: 'Desain teks tumpang tindih dan gambar pecah seketika menghancurkan keyakinan buyer untuk transfer uang.', tag: 'UI/UX RISK' }
    ];
    takeawayBox = {
      label: 'SOLUSI PERBAIKAN KILAT',
      formula: 'Loading < 2s + Headline Berorientasi Solusi + Floating WhatsApp CTA + Layout Mobile Flawless',
      metric: 'TARGET: HEMAT BUDGET 50%'
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
    footer: theme === 'techhook' ? '@terl.studio' : theme === 'foresttype' ? 'Penggunaan : Personal Use' : '< GROWTH YOUR BRANDING >',
    subLink: theme === 'techhook' ? 'Geser ❯' : theme === 'foresttype' ? 'Download : freefonts.io' : undefined,
    caption: `🔥 ${p}\n\nBanyak orang memandang remeh hal ini sampai akhirnya menyadari konversi bisnis mereka stuck dan budget marketing terbuang sia-sia.\n\nBerikut ringkasan lengkap framework actionable yang kami terapkan di TERL Web Studio:\n\n1️⃣ ${points[0].title}: ${points[0].desc}\n2️⃣ ${points[1].title}: ${points[1].desc}\n3️⃣ ${points[2].title}: ${points[2].desc}\n${points[3] ? `4️⃣ ${points[3].title}: ${points[3].desc}\n` : ''}\n💡 ${takeawayBox.label}: ${takeawayBox.formula} (${takeawayBox.metric})\n\n📌 Simpan panduan ini agar bisa diaudit kembali bersama tim Anda!\nKetik pendapat Anda di kolom komentar 👇`,
    hashtags: [
      '#terlwebstudio', '#growtyourbranding', '#webagency', '#digitalbranding',
      '#growthmarketing', '#bisnisonline', '#umkmindonesia', '#uidesign', '#copywritingtips', '#conversionrate'
    ]
  };
}

// Fallback carousel with adaptive specialized slides
function getFallbackCarousel(prompt: string, slideCount: number = 6) {
  const cleanPrompt = prompt.trim() || 'Strategi Desain Web Modern yang Menghasilkan';
  const slides = [];

  // Slide 1: Cover (Hook & Curiosity)
  slides.push({
    id: 'slide-1',
    slideType: 'cover',
    badge: 'SLIDE 01 // PRO STRATEGY',
    title: cleanPrompt.toUpperCase(),
    highlightBanner: 'BEDA LEVEL',
    description: 'Framework komprehensif dari TERL Web Studio untuk membangun digital presence berbobot tinggi.',
    statNumber: '10X',
    statLabel: 'Brand Authority',
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  // Slide 2: Problem Diagnosis
  slides.push({
    id: 'slide-2',
    slideType: 'problem',
    badge: 'DIAGNOSA // ROOT CAUSE',
    title: 'KENAPA 87% BISNIS GAGAL DI FASE INI?',
    description: 'Sebagian besar brand fokus pada estetika semata tanpa memikirkan arsitektur pesan dan alur konversi psikologis.',
    problemData: {
      warningTag: 'FATAL TRAP',
      painPoint: 'Tampilan website penuh dekorasi rumit namun tidak jelas apa masalah yang diselesaikan.',
      impactText: 'Akibatnya pengunjung bingung, bounce rate melonjak, dan budget marketing menguap.'
    },
    statNumber: '87%',
    statLabel: 'Traffic Mental',
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  // Slide 3: Framework Core Pillars
  slides.push({
    id: 'slide-3',
    slideType: 'framework',
    badge: 'METODOLOGI // 3 PILAR',
    title: 'FRAMEWORK EKSEKUSI TERUJI',
    description: '3 Fondasi terintegrasi yang wajib disiapkan sebelum meluncurkan kampanye branding digital.',
    frameworkSteps: [
      { stepNumber: '01', stepTitle: 'CLARITY FIRST', stepDetail: 'Jelaskan proposisi nilai dalam kalimat lugas pada 3 detik pertama.' },
      { stepNumber: '02', stepTitle: 'SPEED & ACCESSIBILITY', stepDetail: 'Optimasi mobile ultra-ringan dengan loading di bawah 1.5 detik.' },
      { stepNumber: '03', stepTitle: 'SEAMLESS CONVERSION', stepDetail: 'Hadirkan 1 jalur CTA tanpa friksi menuju WhatsApp atau checkout.' }
    ],
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  // Slide 4: Comparison (Do vs Don't)
  slides.push({
    id: 'slide-4',
    slideType: 'comparison',
    badge: 'KOMPARASI // AUDIT NYATA',
    title: 'POLA PIKIR AMATIR VS POLA PIKIR PRO',
    description: 'Bandingkan pendekatan yang membakar biaya dengan pendekatan yang menghasilkan profit nyata.',
    comparisonData: {
      dontTitle: 'PENDEKATAN LAMA (HINDARI)',
      dontDesc: 'Menjejalkan semua katalog produk di halaman depan dengan copy berbelit dan animasi berat.',
      doTitle: 'PENDEKATAN STRATEGIS (LAKUKAN)',
      doDesc: 'Fokus pada 1 pain point utama pelanggan dengan bukti sosial nyata dan micro-interaction responsif.'
    },
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  // Slide 5: Action Checklist
  slides.push({
    id: 'slide-5',
    slideType: 'checklist',
    badge: 'CHECKLIST // PRAKTIK LANGSUNG',
    title: 'DAFTAR VERIFIKASI SEBELUM LAUNCHING',
    description: 'Pastikan 4 elemen penting ini tercentang sebelum Anda merilis materi promosi ke publik.',
    checklistItems: [
      { text: 'Headline langsung mengutarakan benefit terbesar bagi pembeli', tag: 'COPY', done: true },
      { text: 'Loading halaman lolos skor Google PageSpeed > 90', tag: 'PERFORMA', done: true },
      { text: 'Testimoni pelanggan diletakkan sebelum scroll lipatan pertama', tag: 'TRUST', done: true },
      { text: 'Nomor WhatsApp dan link navigasi teruji aktif tanpa error', tag: 'CLOSING', done: true }
    ],
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  // Slide 6: CTA (Action & Conversion)
  slides.push({
    id: 'slide-6',
    slideType: 'cta',
    badge: 'ACTION STEP // PARTNER',
    title: 'SIAP MEMBAWA BRAND ANDA KE LEVEL BERIKUTNYA?',
    description: 'Kami di TERL Web Studio membantu Anda merancang website & identitas digital yang tidak hanya estetik, tapi juga melipatgandakan profit.',
    statNumber: 'TERL',
    statLabel: 'STUDIO',
    customFooter: '< GROWTH YOUR BRANDING >'
  });

  return {
    topic: cleanPrompt,
    slides: slides.slice(0, Math.max(3, Math.min(slideCount, 7))),
    caption: `✨ Geser sampai tuntas untuk mempelajari framework lengkap: "${cleanPrompt}"!\n\nDi dunia serba cepat, pemenang bukan yang paling berisik, tapi yang pesannya paling jelas dan eksekusinya paling rapi.\n\n📌 Simpan postingan ini untuk dijadikan checklist bersama tim Anda.\n\nKetik "MAU AUDIT" di komentar jika Anda ingin kami bedah performa website bisnis Anda! 💬`,
    hashtags: ['#carouseltips', '#growthbranding', '#terlwebstudio', '#webagency', '#contentstrategy', '#bisnisdigital', '#uidesign', '#marketingframework']
  };
}

// 1. Single Feed Generator Endpoint (Complex Reasoning: High Density 1-Feed Masterclass)
app.post('/api/generate-feed', async (req: Request, res: Response) => {
  const { prompt, theme = 'brutalism', tone = 'professional', language = 'id' } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.json({ success: true, data: getFallbackFeed(prompt, theme), isFallback: true });
  }

  try {
    const langInstruction = language === 'en' ? 'English' : 'Indonesian (Bahasa Indonesia)';
    const promptText = `Anda adalah Lead Creative Director & Master Brand Strategist dari agensi elit TERL Web Studio.
PENGGUNA MEMBERIKAN PROMPT SINGKAT: "${prompt}"

TUGAS KHUSUS ANDA:
Lakukan penalaran yang sangat kompleks, kreatif, dan tajam (deep creative reasoning).
Prompt singkat ini harus diuraikan menjadi SATU (1) POSTINGAN INSTAGRAM FEED UTUH yang MEMUAT SELURUH INFORMASI DAN INTISARI LENGKAP (seperti infografis / cheat-sheet masterclass bernilai tinggi).
Jangan berikan poin-poin dangkal atau klise. Buka wawasan pembaca dengan sudut pandang strategis, benchmark metrik nyata, dan solusi konkret yang bisa langsung dieksekusi.

Visual Theme: ${theme}
Tone of Voice: ${tone}
Bahasa: ${langInstruction}

Kembalikan respon JSON VALID TANPA MARKDOWN format persis seperti ini:
{
  "mainTitle": "Headline utama yang tegas, provokatif, berwibawa (maksimal 7-10 kata, tanpa awalan 'HEADLINE:')",
  "highlightBanner": "Frasa sorotan 1-3 kata untuk banner/aksen (contoh: BEDA LEVEL / HIGH TRUST / STOP RUGI / PRO TIPS)",
  "subtitle": "Konteks atau sub-heading tajam (contoh: BLUEPRINT LENGKAP 2026 // MASTERPLAY)",
  "headerBadge": "Kategori status badge (contoh: MASTERCLASS 2026 / HIGH IMPACT / CHEAT-SHEET)",
  "points": [
    {
      "number": "01",
      "title": "Pilar 1: Judul padat berorientasi aksi nyata",
      "desc": "Penjelasan mendalam 1-2 kalimat sarat insight, psikologi konsumen, atau alasan mendasar.",
      "tag": "KATA KUNCI (misal: PSIKOLOGI / PERFORMA / STRATEGI)"
    },
    {
      "number": "02",
      "title": "Pilar 2: Judul padat berorientasi aksi nyata",
      "desc": "Penjelasan mendalam 1-2 kalimat sarat insight, angka metrik, atau teknis.",
      "tag": "KATA KUNCI"
    },
    {
      "number": "03",
      "title": "Pilar 3: Judul padat berorientasi aksi nyata",
      "desc": "Penjelasan mendalam 1-2 kalimat sarat insight.",
      "tag": "KATA KUNCI"
    },
    {
      "number": "04",
      "title": "Pilar 4: Eksekusi penutup / proteksi risiko",
      "desc": "Penjelasan langkah kunci agar hasil maksimal.",
      "tag": "KATA KUNCI (misal: CLOSING / METRIK / VALIDASI)"
    }
  ],
  "takeawayBox": {
    "label": "RUMUS / FORMULA EKSEKUSI",
    "formula": "Rumusan singkat 1 kalimat yang merangkum seluruh strategi ini dalam formula konkret",
    "metric": "Target metrik hasil (misal: BENCHMARK: < 1.5S / GOAL: 3X CLOSING)"
  },
  "densityMode": "comprehensive",
  "footer": "< GROWTH YOUR BRANDING >",
  "caption": "Caption Instagram mendalam dengan storytelling, membedah keempat pilar secara terurai, CTA simpan dan diskusi, serta emoji proporsional",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9", "#tag10"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);

    return res.json({ success: true, data: parsed, isFallback: false });
  } catch (err: any) {
    console.error('Error generating feed with Gemini:', err);
    return res.json({
      success: true,
      data: getFallbackFeed(prompt, theme),
      isFallback: true,
      errorNotice: err?.message || 'Gemini response parsed with fallback'
    });
  }
});

// 2. Carousel Generator Endpoint (Complex Reasoning: Multi-Slide Adaptive Architecture)
app.post('/api/generate-carousel', async (req: Request, res: Response) => {
  const { prompt, slideCount = 6, targetAudience = 'Entrepreneurs & Creatives', language = 'id', theme = 'brutalism' } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const numSlides = Math.min(Math.max(Number(slideCount) || 6, 4), 7);
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({ success: true, data: getFallbackCarousel(prompt, numSlides), isFallback: true });
  }

  try {
    const langInstruction = language === 'en' ? 'English' : 'Indonesian (Bahasa Indonesia)';
    const promptText = `Anda adalah Creative Storytelling Director & Carousel Architect dari TERL Web Studio.
PENGGUNA MEMBERIKAN PROMPT SINGKAT: "${prompt}"

TUGAS KHUSUS ANDA:
Lakukan penalaran kompleks dan kreatif. Uraikan topik singkat ini ke dalam ${numSlides} slide Instagram Carousel yang SALING TERHUBUNG SECARA STRATEGIS.
PENTING SEKALI: Elemen desain di setiap slide HARUS MENYESUAIKAN JENIS INFORMASI yang disampaikan agar dinamis dan kaya elemen visual:
- Slide 1: tipe 'cover' -> Hook provokatif, headline besar, statNumber & statLabel dampak.
- Slide 2: tipe 'problem' -> Membongkar akar masalah atau jebakan fatal yang dihadapi audiens, sertakan problemData (warningTag, painPoint, impactText).
- Slide 3: tipe 'framework' -> Metodologi 3 langkah / pilar solusi, sertakan frameworkSteps (array 3 step dengan stepNumber, stepTitle, stepDetail).
- Slide 4: tipe 'comparison' -> Komparasi Do vs Don't (apa yang salah vs cara benar), sertakan comparisonData (dontTitle, dontDesc, doTitle, doDesc).
- Slide 5: tipe 'checklist' -> Actionable checklist verifikasi langsung, sertakan checklistItems (array 3-4 item dengan text, tag, done).
- Slide Terakhir (Slide ${numSlides}): tipe 'cta' -> Slide penutup, ajakan simpan, komen, dan penawaran konsultasi TERL Web Studio.

Target Audiens: ${targetAudience}
Bahasa: ${langInstruction}

Kembalikan format JSON VALID TANPA MARKDOWN:
{
  "topic": "${prompt}",
  "slides": [
    {
      "slideType": "cover",
      "badge": "SLIDE 01 // OVERVIEW",
      "title": "Headline Hook",
      "description": "Deskripsi pengantar yang memantik rasa penasaran",
      "statNumber": "10X",
      "statLabel": "Brand Impact",
      "customFooter": "< GROWTH YOUR BRANDING >"
    },
    {
      "slideType": "problem",
      "badge": "DIAGNOSA // ROOT CAUSE",
      "title": "Judul masalah yang sering diabaikan",
      "description": "Keterangan inti mengapa masalah ini fatal",
      "problemData": {
        "warningTag": "RISIKO FATAL",
        "painPoint": "Penyebab utama kegagalan di lapangan",
        "impactText": "Dampak buruk jika dibiarkan tanpa perbaikan"
      },
      "customFooter": "< GROWTH YOUR BRANDING >"
    },
    {
      "slideType": "framework",
      "badge": "METODOLOGI // FONDASI",
      "title": "Judul Framework Solusi",
      "description": "Penjelasan ringkas alur kerja",
      "frameworkSteps": [
        { "stepNumber": "01", "stepTitle": "Langkah 1", "stepDetail": "Detail eksekusi langkah 1" },
        { "stepNumber": "02", "stepTitle": "Langkah 2", "stepDetail": "Detail eksekusi langkah 2" },
        { "stepNumber": "03", "stepTitle": "Langkah 3", "stepDetail": "Detail eksekusi langkah 3" }
      ],
      "customFooter": "< GROWTH YOUR BRANDING >"
    },
    {
      "slideType": "comparison",
      "badge": "KOMPARASI // AUDIT NYATA",
      "title": "Judul komparasi Do vs Don't",
      "description": "Penjelasan mengapa pendekatan pro berbeda",
      "comparisonData": {
        "dontTitle": "POLA SALAH (HINDARI)",
        "dontDesc": "Kebiasaan lama yang merugikan bisnis",
        "doTitle": "POLA BENAR (TERAPKAN)",
        "doDesc": "Standar baru yang terbukti efektif"
      },
      "customFooter": "< GROWTH YOUR BRANDING >"
    },
    {
      "slideType": "checklist",
      "badge": "CHECKLIST // VERIFIKASI",
      "title": "Checklist Kunci Sebelum Eksekusi",
      "description": "Pastikan seluruh kriteria ini terpenuhi",
      "checklistItems": [
        { "text": "Poin checklist 1", "tag": "AUDIT", "done": true },
        { "text": "Poin checklist 2", "tag": "SPEED", "done": true },
        { "text": "Poin checklist 3", "tag": "COPY", "done": true }
      ],
      "customFooter": "< GROWTH YOUR BRANDING >"
    },
    {
      "slideType": "cta",
      "badge": "ACTION STEP // TERL STUDIO",
      "title": "SIAP MELIPATGANDAKAN HASIL BRAND ANDA?",
      "description": "Simpan postingan ini dan hubungi TERL Web Studio untuk membangun identitas digital bisnis Anda.",
      "statNumber": "TERL",
      "statLabel": "STUDIO",
      "customFooter": "< GROWTH YOUR BRANDING >"
    }
  ],
  "caption": "Caption Instagram storytelling lengkap dengan pembahasan per slide, hook pembuka, dan CTA konversi.",
  "hashtags": ["#carouseltips", "#growthbranding", "#terlwebstudio", "#webagency", "#uidesign", "#digitalstrategy", "#marketingframework", "#kontenkreatif"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);

    return res.json({ success: true, data: parsed, isFallback: false });
  } catch (err: any) {
    console.error('Error generating carousel with Gemini:', err);
    return res.json({
      success: true,
      data: getFallbackCarousel(prompt, numSlides),
      isFallback: true,
      errorNotice: err?.message
    });
  }
});

// 3. AI Hook Variants Endpoint
app.post('/api/enhance-hook', async (req: Request, res: Response) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic required' });

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      success: true,
      hooks: [
        { type: 'Curiosity', text: `Cara Tak Terduga Mengubah ${topic} Menjadi Mesin Cuan` },
        { type: 'Mistake / Negative', text: `Stop Lakukan Ini! 3 Kesalahan Fatal Saat ${topic}` },
        { type: 'Direct Value', text: `Framework 3 Langkah Menguasai ${topic} dalam 15 Menit` },
        { type: 'Contrarian', text: `Kenapa Mayoritas Orang Gagal Memahami ${topic}?` },
        { type: 'Case Study', text: `Bagaimana Bisnis Kami Meningkat 200% Berkat ${topic}` }
      ]
    });
  }

  try {
    const promptText = `Buatkan 5 variasi headline/hook viral Instagram feed untuk topik: "${topic}".
Kembalikan format JSON:
{
  "hooks": [
    { "type": "Curiosity", "text": "..." },
    { "type": "Mistake", "text": "..." },
    { "type": "Framework", "text": "..." },
    { "type": "Contrarian", "text": "..." },
    { "type": "Urgency", "text": "..." }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json({ success: true, hooks: parsed.hooks || [] });
  } catch (err: any) {
    return res.json({
      success: true,
      hooks: [
        { type: 'Curiosity', text: `Rahasia Dibalik ${topic} yang Jarang Dibahas Agensi Besar` },
        { type: 'Mistake', text: `3 Kesalahan Fatal Saat ${topic} yang Bikin Boncos` },
        { type: 'Framework', text: `Step by Step Blueprint: ${topic} untuk Pemula` }
      ]
    });
  }
});

// 4. Topic Inspirations Endpoint
app.get('/api/suggest-topics', (req: Request, res: Response) => {
  const niche = (req.query.niche as string) || 'agency';
  const topicMap: Record<string, string[]> = {
    agency: [
      '3 Kesalahan fatal UMKM saat membuat website company profile',
      'Tips memilih domain website yang tepat untuk meningkatkan reputasi bisnis',
      'Kenapa landing page dengan speed lambat bikin konversi iklanmu hangus',
      'Checklist desain UI/UX web modern agar pengunjung langsung order',
      'Perbedaan Web Custom vs Template Murahan untuk skala bisnis enterprise'
    ],
    marketing: [
      'Strategi konten Carousel Instagram yang memicu save & share organik',
      'Cara menentukan USP bisnis agar tidak kalah perang harga di medsos',
      'Framework copy headline yang bikin orang stop scrolling dalam 2 detik',
      'Studi kasus: Meningkatkan sales 3x lipat dengan lead magnet sederhana'
    ],
    tech_ai: [
      '5 AI tools gratis terbaik 2026 yang wajib dicoba setiap pekerja kreatif',
      'Bagaimana AI agent merombak alur kerja developer website modern',
      'Prompt engineering trik untuk menghasilkan copywriting kelas dunia',
      'Masa depan web development: Integrasi Gemini AI pada aplikasi bisnis'
    ],
    business: [
      'Mindset scaling bisnis UMKM dari omset puluhan juta ke miliaran',
      '3 Metrik keuangan yang wajib dipantau pemilik bisnis setiap minggu',
      'Cara hire talent pertama untuk tim kreatif tanpa membebani cashflow',
      'Strategi membangun brand identity yang elegan tanpa budget selangit'
    ]
  };

  const topics = topicMap[niche] || topicMap.agency;
  return res.json({ success: true, topics });
});

// Server Initialization
async function startServer() {
  if (isProd && hasDist) {
    console.log(`Production mode: Serving static files from ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    console.log('Development mode: Mounting Vite middlewares');
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback for SPA routing in development
    app.use('*', async (req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const indexHtmlPath = path.resolve(__dirname, 'index.html');
        if (fs.existsSync(indexHtmlPath)) {
          let template = fs.readFileSync(indexHtmlPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          next();
        }
      } catch (e: any) {
        if (vite && typeof vite.ssrFixStacktrace === 'function') {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully running on http://0.0.0.0:${PORT} (mode: ${isProd ? 'production' : 'development'})`);
  });

  server.on('error', (err: any) => {
    console.error('Server error encountered:', err);
  });
}

startServer();
