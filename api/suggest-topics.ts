export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const niche = (req.query?.niche as string) || 'agency';
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
}
