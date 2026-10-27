import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, theme = 'brutalism', tone = 'professional', language = 'id' } = req.body || {};

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Provide instant rich fallback
    return res.json({
      success: true,
      data: {
        mainTitle: prompt.toUpperCase(),
        highlightBanner: theme === 'foresttype' ? 'MO\nLEN' : theme === 'techhook' ? 'BEDA LEVEL' : 'PRO TIPS',
        subtitle: 'PANDUAN PRAKTIS 2026',
        headerBadge: theme === 'techhook' ? 'CLAUDE CODE' : theme === 'foresttype' ? 'TYPOGRAPHY' : 'HIGH IMPACT INSIGHT',
        points: [
          { number: '01', title: 'FOKUS PADA FIRST IMPRESSION', desc: 'Pengunjung hanya butuh 3 detik untuk memutuskan. Desain bersih dan headline tegas adalah kunci.', tag: 'CRITICAL' },
          { number: '02', title: 'OPTIMASI SPEED & MOBILE-FIRST', desc: 'Lebih dari 80% traffic dari smartphone. Kecepatan loading tinggi melipatgandakan konversi.', tag: 'PERFORMANCE' },
          { number: '03', title: 'CLEAR CALL TO ACTION (CTA)', desc: 'Arahkan pengunjung secara gamblang ke aksi berikutnya tanpa navigasi berbelit.', tag: 'CONVERSION' }
        ],
        footer: '< GROWTH YOUR BRANDING >',
        caption: `🔥 ${prompt} — Simak 3 fondasi penting ini sebelum terlambat!\n\nDi era serba cepat, audiens Anda tidak membaca melainkan memindai (skimming). Jika pesan Anda rumit, mereka akan berpindah ke kompetitor.\n\nSimpan postingan ini agar tidak lupa! 📌`,
        hashtags: ['#terlwebstudio', '#growtyourbranding', '#webdesign', '#digitalbranding', '#instagramfeed']
      },
      isFallback: true
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' }
      }
    });

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
  "footer": "< GROWTH YOUR BRANDING >",
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
      data: {
        mainTitle: prompt.toUpperCase(),
        highlightBanner: 'BEDA LEVEL',
        subtitle: 'PANDUAN PRAKTIS 2026',
        headerBadge: 'HIGH IMPACT INSIGHT',
        points: [
          { number: '01', title: 'FOKUS PADA FIRST IMPRESSION', desc: 'Pengunjung hanya butuh 3 detik untuk memutuskan. Desain bersih dan headline tegas adalah kunci.', tag: 'CRITICAL' },
          { number: '02', title: 'OPTIMASI SPEED & MOBILE-FIRST', desc: 'Lebih dari 80% traffic dari smartphone. Kecepatan loading tinggi melipatgandakan konversi.', tag: 'PERFORMANCE' },
          { number: '03', title: 'CLEAR CALL TO ACTION (CTA)', desc: 'Arahkan pengunjung secara gamblang ke aksi berikutnya tanpa navigasi berbelit.', tag: 'CONVERSION' }
        ],
        footer: '< GROWTH YOUR BRANDING >',
        caption: `🔥 ${prompt} — Simak 3 fondasi penting ini sebelum terlambat!\n\nDi era serba cepat, audiens Anda tidak membaca melainkan memindai (skimming).\n\nSimpan postingan ini agar tidak lupa! 📌`,
        hashtags: ['#terlwebstudio', '#growtyourbranding', '#webdesign', '#digitalbranding']
      },
      isFallback: true,
      errorNotice: err?.message
    });
  }
}
