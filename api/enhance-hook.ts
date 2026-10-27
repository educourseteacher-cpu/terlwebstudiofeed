import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { topic = 'Website & Branding' } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({
      success: true,
      hooks: [
        { type: 'Curiosity', text: `Cara Tak Terduga Mengubah ${topic} Menjadi Mesin Cuan` },
        { type: 'Mistake', text: `Stop Lakukan Ini! 3 Kesalahan Fatal Saat ${topic}` },
        { type: 'Framework', text: `Framework 3 Langkah Menguasai ${topic} dalam 15 Menit` },
        { type: 'Contrarian', text: `Kenapa Mayoritas Orang Gagal Memahami ${topic}?` },
        { type: 'Urgency', text: `Segera Perbaiki ${topic} Anda Sebelum Kompetitor Mendahului` }
      ]
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

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
        { type: 'Curiosity', text: `Rahasia Dibalik ${topic} yang Jarang Dibahas` },
        { type: 'Mistake', text: `3 Kesalahan Fatal Saat ${topic} yang Bikin Boncos` }
      ]
    });
  }
}
