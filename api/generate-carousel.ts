import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, slideCount = 5, targetAudience = 'Entrepreneurs & Creatives', language = 'id' } = req.body || {};

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const numSlides = Math.min(Math.max(Number(slideCount) || 5, 3), 7);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const slides = [
      {
        slideType: 'cover',
        badge: 'SLIDE 01 // OVERVIEW',
        title: prompt.toUpperCase(),
        description: 'Framework teruji untuk menaikkan reputasi brand dan konversi penjualan Anda.',
        statNumber: '10X',
        statLabel: 'Brand Impact',
        customFooter: '< GROWTH YOUR BRANDING >'
      },
      {
        slideType: 'insight',
        badge: 'LANGKAH 01 // PONDASI',
        title: 'IDENTIFIKASI VALUE UTAMA',
        description: 'Sampaikan manfaat produk Anda dalam 1 kalimat lugas yang langsung dimengerti pengunjung.',
        statNumber: '01',
        statLabel: 'CLARITY',
        customFooter: '< GROWTH YOUR BRANDING >'
      },
      {
        slideType: 'comparison',
        badge: 'DO VS DONT // STRATEGI',
        title: 'HINDARI OVERLOAD INFORMASI',
        description: 'Fokus pada 1 pesan penting per slide agar audiens tidak lelah saat scrolling.',
        statNumber: '02',
        statLabel: 'FOCUS',
        customFooter: '< GROWTH YOUR BRANDING >'
      },
      {
        slideType: 'cta',
        badge: 'FINAL STEP // ACTION',
        title: 'SIAP SCALE UP BRAND ANDA?',
        description: 'Simpan postingan ini dan hubungi TERL Studio untuk konsultasi branding.',
        statNumber: 'TERL',
        statLabel: 'STUDIO',
        customFooter: '< GROWTH YOUR BRANDING >'
      }
    ];

    return res.json({
      success: true,
      data: {
        topic: prompt,
        slides,
        caption: `✨ Geser sampai akhir untuk melihat framework lengkap: "${prompt}"!\n\n📌 Save biar bisa dipraktekkan nanti.\n< GROWTH YOUR BRANDING >`,
        hashtags: ['#terlwebstudio', '#growtyourbranding', '#carouseltips', '#branding']
      },
      isFallback: true
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

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
      "statLabel": "Label kecil untuk angka",
      "customFooter": "< GROWTH YOUR BRANDING >"
    }
  ],
  "caption": "Caption Instagram storytelling yang cocok untuk carousel ini",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: { responseMimeType: 'application/json' },
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);

    return res.json({ success: true, data: parsed, isFallback: false });
  } catch (err: any) {
    console.error('Error generating carousel with Gemini:', err);
    return res.status(500).json({ error: err?.message });
  }
}
