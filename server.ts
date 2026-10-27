import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distPath = path.resolve(__dirname, 'dist');
const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));
const isProd = process.env.NODE_ENV === 'production' || hasDist;

app.use(express.json({ limit: '10mb' }));

// Enable CORS for all routes
app.use((req, res, next) => {
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

// Fallback generator if API key is not present or API temporary error
function getFallbackFeed(prompt: string, theme: string) {
  const cleanPrompt = prompt.trim() || 'Strategi Membangun Website & Branding Bisnis Modern';
  return {
    mainTitle: cleanPrompt.length > 50 ? cleanPrompt.substring(0, 50).toUpperCase() : cleanPrompt.toUpperCase(),
    highlightBanner: theme === 'foresttype' ? 'MO\nLEN' : theme === 'techhook' ? 'BEDA LEVEL' : 'PRO TIPS',
    subtitle: 'PANDUAN PRAKTIS 2026',
    headerBadge: theme === 'techhook' ? 'CLAUDE CODE' : theme === 'foresttype' ? 'TYPOGRAPHY' : 'HIGH IMPACT INSIGHT',
    points: [
      {
        number: '01',
        title: 'FOKUS PADA FIRST IMPRESSION',
        desc: 'Pengunjung hanya butuh 3 detik untuk memutuskan tinggal atau pergi. Desain visual yang bersih dan headline tegas adalah kunci utama.',
        tag: 'CRITICAL'
      },
      {
        number: '02',
        title: 'OPTIMASI SPEED & MOBILE-FIRST',
        desc: 'Lebih dari 80% traffic berasal dari smartphone. Kecepatan loading di bawah 2 detik melipatgandakan peluang konversi prospek.',
        tag: 'PERFORMANCE'
      },
      {
        number: '03',
        title: 'CLEAR CALL TO ACTION (CTA)',
        desc: 'Arahkan pengunjung secara gamblang ke aksi berikutnya: chat WhatsApp, pesan demo, atau beli langsung tanpa navigasi berbelit.',
        tag: 'CONVERSION'
      }
    ],
    footer: theme === 'techhook' ? '@terl.studio' : theme === 'foresttype' ? 'Penggunaan : Personal Use' : 'KAMI MEMBANGUN DIGITAL IDENTITY YANG MENGHASILKAN PROFIT',
    subLink: theme === 'techhook' ? 'Geser ❯' : theme === 'foresttype' ? 'Download : freefonts.io' : undefined,
    caption: `🔥 ${cleanPrompt} — Simak 3 fondasi penting ini sebelum terlambat!\n\nDi era serba cepat, audiens Anda tidak membaca melainkan memindai (skimming). Jika pesan Anda rumit, mereka akan berpindah ke kompetitor.\n\nSimpan postingan ini agar tidak lupa! 📌\n\nBagikan pendapat Anda di kolom komentar 👇`,
    hashtags: [
      '#webdesign', '#webdevelopment', '#instagramtips', '#agencylife',
      '#digitalbranding', '#bisnisonline', '#umkmindonesia', '#marketingtips',
      '#brandingstrategi', '#contentcreator', '#carouselinstagram', '#terlwebstudio'
    ]
  };
}

function getFallbackCarousel(prompt: string, slideCount: number = 5) {
  const cleanPrompt = prompt.trim() || 'Strategi Desain Web Modern yang Menghasilkan';
  const slides = [];

  // Cover
  slides.push({
    slideType: 'cover',
    badge: 'SLIDE 01 // OVERVIEW',
    title: cleanPrompt.toUpperCase(),
    highlightBanner: 'BEDA LEVEL',
    description: 'Framework teruji untuk menaikkan reputasi brand dan konversi penjualan.',
    statNumber: '10X',
    statLabel: 'Peningkatan Trust'
  });

  // Body slides
  const bodyPoints = [
    { title: 'Masalah: Website Terlalu Ramai & Lambat', desc: 'Banyak bisnis memasukkan semua info sekaligus hingga pengunjung bingung dan bounce rate naik drastis.' },
    { title: 'Solusi 1: Hero Section yang To-The-Point', desc: 'Jelaskan dalam 1 kalimat apa produk Anda, siapa pasarnya, dan apa masalah yang Anda selesaikan.' },
    { title: 'Solusi 2: Social Proof Nyata di Atas Lipatan', desc: 'Tampilkan testimoni, logo klien ternama, atau rating bintang tepat sebelum scroll pertama.' },
    { title: 'Solusi 3: Responsive Micro-Interactions', desc: 'Berikan feedback sentuhan halus dan visual cues yang memandu mata pembaca menuju CTA.' }
  ];

  for (let i = 0; i < Math.min(slideCount - 2, bodyPoints.length); i++) {
    slides.push({
      slideType: 'insight',
      badge: `STEP 0${i + 2} // IMPLEMENTATION`,
      title: bodyPoints[i].title.toUpperCase(),
      description: bodyPoints[i].desc,
      statNumber: `0${i + 1}`,
      statLabel: 'KEY FOCUS'
    });
  }

  // CTA Slide
  slides.push({
    slideType: 'cta',
    badge: 'FINAL STEP // ACTION',
    title: 'SIAP UPGRADE BRAND DIGITAL ANDA?',
    description: 'Jangan biarkan bisnis Anda terlihat amatir di mata calon investor & pelanggan berharga.',
    statNumber: 'TERL',
    statLabel: 'STUDIO'
  });

  return {
    topic: cleanPrompt,
    slides,
    caption: `✨ Geser sampai akhir untuk melihat framework lengkap: "${cleanPrompt}"!\n\nBanyak yang mengabaikan detail kecil ini padahal efeknya sangat signifikan pada performa bisnis.\n\nKetik "MAU" di komentar kalau mau template checklist gratisnya! 💬\n\n📌 Save biar bisa dipraktekkan nanti.`,
    hashtags: ['#carouseltips', '#instagramstrategy', '#webagency', '#bisnisdigital', '#growthhack', '#uidesign', '#contentmarketing']
  };
}

// 1. Single Feed Generator Endpoint
app.post('/api/generate-feed', async (req: Request, res: Response) => {
  const { prompt, theme = 'brutalism', tone = 'professional', language = 'id' } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Provide quality fallback
    return res.json({ success: true, data: getFallbackFeed(prompt, theme), isFallback: true });
  }

  try {
    const langInstruction = language === 'en' ? 'English' : 'Indonesian (Bahasa Indonesia)';
    const promptText = `Anda adalah Lead Creative Director & Social Media Strategist dari agensi branding terkemuka (TERL Web Studio).
Tugas Anda: Buat konten visual Instagram Feed profesional, tajam, bernilai tinggi, dan viral berdasarkan topik pengguna:
Topik: "${prompt}"
Visual Theme Pilihan: ${theme}
Tone of Voice: ${tone}
Bahasa: ${langInstruction}

Kembalikan respon JSON VALID TANPA MARKDOWN format:
{
  "mainTitle": "Judul headline utama yang sangat tajam, eye-catching, berbobot (maksimal 8-10 kata)",
  "highlightBanner": "Frasa sorotan 1-3 kata untuk banner khusus (contoh: BEDA LEVEL / RESMI / PRO TIPS / MO\\nLEN)",
  "subtitle": "Sub-heading atau hook pendek (maksimal 5 kata)",
  "headerBadge": "Teks badge status di atas (contoh: STRATEGI UTAMA / PRO TIPS / CRITICAL / 2026 EDITION)",
  "points": [
    {
      "number": "01",
      "title": "Judul Poin 1 yang padat & impactful",
      "desc": "Penjelasan ringkas 1-2 kalimat padat solusi atau insight nyata",
      "tag": "Kata kunci badge kecil (misal: FOUNDATION / METRIC / ACTION)"
    },
    {
      "number": "02",
      "title": "Judul Poin 2 yang padat & impactful",
      "desc": "Penjelasan ringkas 1-2 kalimat padat solusi atau insight nyata",
      "tag": "Kata kunci badge kecil"
    },
    {
      "number": "03",
      "title": "Judul Poin 3 yang padat & impactful",
      "desc": "Penjelasan ringkas 1-2 kalimat padat solusi atau insight nyata",
      "tag": "Kata kunci badge kecil"
    }
  ],
  "footer": "Tagline footer branding berkesan kuat (maksimal 7 kata)",
  "caption": "Caption Instagram lengkap dengan hook emosional, isi pembahasan, call-to-action (simpan/komen), dan emoji proporsional",
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

// 2. Carousel Generator Endpoint
app.post('/api/generate-carousel', async (req: Request, res: Response) => {
  const { prompt, slideCount = 5, targetAudience = 'Entrepreneurs & Creatives', language = 'id', theme = 'brutalism' } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const numSlides = Math.min(Math.max(Number(slideCount) || 5, 3), 7);
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({ success: true, data: getFallbackCarousel(prompt, numSlides), isFallback: true });
  }

  try {
    const langInstruction = language === 'en' ? 'English' : 'Indonesian (Bahasa Indonesia)';
    const promptText = `Rancang konten Instagram Carousel berjumlah tepat ${numSlides} slide untuk topik:
"${prompt}"
Target Pembaca: ${targetAudience}
Bahasa: ${langInstruction}

Struktur slide yang dibutuhkan:
- Slide 1: Cover / Hook (Headline bombastis berkelas + curiosity hook)
- Slide 2 s/d ${numSlides - 1}: Isi Insight / Actionable steps / Solusi konkret
- Slide ${numSlides}: Slide Penutup / Call to Action (Ajakan follow, save, share, atau komen)

Kembalikan format JSON:
{
  "topic": "${prompt}",
  "slides": [
    {
      "slideType": "cover" atau "insight" atau "cta",
      "badge": "Label atas (misal: SLIDE 01 // FRAMEWORK)",
      "title": "Headline slide",
      "description": "Keterangan inti 1-2 kalimat yang mudah dibaca saat scrolling cepat",
      "statNumber": "Nomor atau angka/simbol highlight (misal: 01, 80%, 3X, TERL)",
      "statLabel": "Label kecil untuk angka"
    }
  ],
  "caption": "Caption Instagram storytelling yang cocok untuk carousel ini",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"]
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
  if (hasDist) {
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
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully running on http://0.0.0.0:${PORT} (hasDist: ${hasDist}, isProd: ${isProd})`);
  });
}

startServer();
