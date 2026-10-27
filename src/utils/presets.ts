import { FeedContent, ThemeType } from '../types';

export interface PresetTemplate {
  id: string;
  name: string;
  category: string;
  theme: ThemeType;
  prompt: string;
  content: FeedContent;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'web-domain',
    name: 'Tips Memilih Domain Website',
    category: 'Web Studio',
    theme: 'brutalism',
    prompt: 'Tips memilih domain website yang tepat untuk meningkatkan kepercayaan brand bisnis',
    content: {
      mainTitle: 'TIPS MEMILIH DOMAIN WEBSITE YANG TEPAT UNTUK BISNIS',
      subtitle: 'STRATEGI BRAND IDENTITY 2026',
      headerBadge: 'HIGH IMPACT INSIGHT',
      points: [
        {
          number: '01',
          title: 'GUNAKAN EKSTENSI .COM',
          desc: 'Lebih dipercaya dan mudah diingat audiens global dibanding ekstensi asing.',
          tag: 'TRUST'
        },
        {
          number: '02',
          title: 'SINGKAT & MUDAH DIKETIK',
          desc: 'Hindari penggunaan tanda hubung (-), angka membingungkan, atau ejaan rumit.',
          tag: 'USABILITY'
        },
        {
          number: '03',
          title: 'SESUAI DENGAN NAMA BRAND',
          desc: 'Membangun identitas digital yang konsisten di semua saluran media sosial.',
          tag: 'BRANDING'
        }
      ],
      footer: 'WE BUILD WEBSITES THAT REPRESENT WHO YOU ARE',
      caption: `🌐 Mau bikin website bisnis tapi bingung nentuin domain?\n\nDomain adalah pintu gerbang reputasi digital bisnis Anda. Domain yang salah pilih bisa membuat calon pembeli ragu bertransaksi!\n\nSimak 3 tips krusial di atas sebelum Anda checkout domain.\n\n📌 Save postingan ini agar tidak lupa!\n💬 Mau konsultasi website gratis? Kirim DM ke @terl.studio sekarang juga!`,
      hashtags: ['#webdesign', '#domainname', '#webdevelopment', '#bisnisindonesia', '#agencylife', '#brandingstrategi', '#umkmnaikkelas', '#terlwebstudio']
    }
  },
  {
    id: 'fatal-mistake-umkm',
    name: '3 Kesalahan Fatal Web UMKM',
    category: 'Agency & Tech',
    theme: 'arcade',
    prompt: '3 kesalahan fatal UMKM saat membuat website company profile',
    content: {
      mainTitle: '3 KESALAHAN FATAL SAAT MEMBUAT WEBSITE UMKM',
      subtitle: 'AVOID THESE PITFALLS',
      headerBadge: 'STAGE: GAME OVER RISK',
      points: [
        {
          number: '01',
          title: 'LOADING LEBIH DARI 3 DETIK',
          desc: '53% calon konsumen menutup website jika loading lebih dari 3 detik. Boncos biaya iklan!',
          tag: 'SPEED'
        },
        {
          number: '02',
          title: 'TIDAK MOBILE FRIENDLY',
          desc: 'Mayoritas pengunjung belanja via HP. Jika tampilan berantakan di layar kecil, konversi anjlok.',
          tag: 'MOBILE'
        },
        {
          number: '03',
          title: 'TIDAK ADA TOMBOL WA JELAS',
          desc: 'Calon pembeli Indonesia suka konsultasi kilat. Pastikan tombol kontak selalu melayang di layar.',
          tag: 'CTA'
        }
      ],
      footer: 'LEVEL UP YOUR BUSINESS WITH HIGH PERFORMANCE WEB',
      caption: `⚠️ Banyak pengusaha mengeluh: "Udah pasang iklan ratusan ribu tapi kok gak ada yang order?"\n\nCoba cek website Anda. Seringkali masalahnya bukan di iklan, melainkan website yang lambat dan bikin bingung pengunjung!\n\nCek 3 poin fatal di atas dan perbaiki hari ini juga. 🚀`,
      hashtags: ['#umkmgoonline', '#bisnisonline', '#websitelambat', '#digitalmarketing', '#tipsbisnis', '#webdev', '#terlstudio']
    }
  },
  {
    id: 'minimal-conversion',
    name: 'Landing Page High-Converting',
    category: 'Marketing',
    theme: 'minimalist',
    prompt: 'Prinsip desain landing page minimalis dengan conversion rate tinggi',
    content: {
      mainTitle: 'PRINSIP DESAIN LANDING PAGE DENGAN KONVERSI TINGGI',
      subtitle: 'THE MINIMALIST CONVERSION FRAMEWORK',
      headerBadge: 'CLEAN ARCHITECTURE',
      points: [
        {
          number: '01',
          title: 'Headline yang Menjawab Value',
          desc: 'Katakan dengan gamblang apa benefit spesifik produk Anda dalam 5 detik pertama.',
          tag: 'CLARITY'
        },
        {
          number: '02',
          title: 'Ruang Negatif (Whitespace)',
          desc: 'Beri ruang napas pada elemen agar mata pembaca terarah langsung pada tombol beli.',
          tag: 'FOCUS'
        },
        {
          number: '03',
          title: 'Bukti Sosial yang Kredibel',
          desc: 'Sertakan testimoni otentik dari pengguna nyata dengan foto dan angka hasil terukur.',
          tag: 'PROOF'
        }
      ],
      footer: 'SIMPLICITY IS THE ULTIMATE SOPHISTICATION',
      caption: `Desain yang rumit tidak selalu menjual lebih banyak.\n\nFaktanya, landing page dengan tata letak minimalis dan copy yang to-the-point menghasilkan rata-rata konversi 32% lebih tinggi.\n\nFokuslah pada kejelasan pesan, bukan hiasan yang mengalihkan perhatian audiens.`,
      hashtags: ['#landingpage', '#minimalism', '#uidesign', '#cro', '#conversionrate', '#marketingtips', '#branding']
    }
  },
  {
    id: 'cyberpunk-ai',
    name: 'Top AI Tools 2026',
    category: 'AI & Future',
    theme: 'cyberpunk',
    prompt: 'AI Tools terbaik 2026 untuk melipatgandakan produktivitas agensi kreatif',
    content: {
      mainTitle: 'SENJATA AI 2026 UNTUK AGENSI DIGITAL MASA DEPAN',
      subtitle: 'CYBER ENHANCEMENT SUITE',
      headerBadge: 'SYSTEM: PROTOCOL NEON',
      points: [
        {
          number: '01',
          title: 'GEMINI 3.8 FLASH LITE',
          desc: 'Eksekusi copywriting & data synthesis super kilat dengan konteks cerdas multi-modal.',
          tag: 'CORE AI'
        },
        {
          number: '02',
          title: 'AUTONOMOUS CODE AGENTS',
          desc: 'Membangun prototipe web app interaktif dalam hitungan detik tanpa setup manual.',
          tag: 'DEV'
        },
        {
          number: '03',
          title: 'HIGH-DEF IMAGE GENERATION',
          desc: 'Visual branding resolusi tinggi langsung sinkron dengan style guideline agensi.',
          tag: 'RENDER'
        }
      ],
      footer: 'EMBRACE THE FUTURE OR GET REPLACED BY CODE',
      caption: `⚡ Era baru agensi kreatif telah tiba!\n\nAgensi yang memanfaatkan AI bukan menggantikan desainer, melainkan membuat tim kecil bisa menghasilkan output setara studio raksasa beranggotakan 50 orang.\n\nTools mana yang sudah masuk workflow harian Anda? Tulis di komentar! 👾`,
      hashtags: ['#aitools', '#geminiai', '#cyberpunk', '#agencylife', '#futureofwork', '#techtrends', '#creativecoding']
    }
  },
  {
    id: 'quiz-speed',
    name: 'Kuis Interaktif Website',
    category: 'Interactive',
    theme: 'trivia',
    prompt: 'Kuis interaktif tebak metrik kecepatan website yang ideal untuk SEO Google',
    content: {
      mainTitle: 'TEBAK: BERAPA DETIK BATAS MAKSIMAL LOADING WEB ANDA?',
      subtitle: 'SEO & UX CHALLENGE',
      headerBadge: 'ACTIVE QUIZ // ROUND 01',
      points: [
        {
          number: 'A',
          title: 'PILIHAN A: 5 DETIK',
          desc: 'Toleransi lama era 2010 sebelum smartphone mendominasi traffic web.',
          tag: 'OPSI 1'
        },
        {
          number: 'B',
          title: 'PILIHAN B: 2.5 DETIK (BENAR)',
          desc: 'Standar Google Core Web Vitals (LCP) untuk ranking optimal di halaman 1.',
          tag: 'JAWABAN'
        },
        {
          number: 'C',
          title: 'PILIHAN C: 10 DETIK',
          desc: 'Sudah pasti 90% pengunjung kabur sebelum melihat produk Anda.',
          tag: 'GAGAL'
        }
      ],
      footer: 'OPTIMASI WEBSITE BISNIS ANDA SEKARANG DENGAN TERL STUDIO',
      caption: `🎮 Seberapa peduli Anda dengan kecepatan website toko online Anda?\n\nJawaban yang benar adalah B (di bawah 2.5 detik)! Jika website Anda butuh 4 detik saja, Google akan menurunkan peringkat SEO Anda dan biaya konversi iklan melonjak drastis.\n\nMau tahu skor kecepatan web Anda? Komen URL web Anda, kami audit gratis! 👇`,
      hashtags: ['#kuisinstagram', '#seotips', '#corewebvitals', '#webdevelopment', '#terlstudio', '#digitalstrategi']
    }
  },
  {
    id: 'classai-claude-hook',
    name: '5 Plugin Claude Code (AI Creator)',
    category: 'Tech & AI Creator',
    theme: 'techhook',
    prompt: '5 Plugin yang bikin Claude Code kamu beda level',
    content: {
      mainTitle: '5 PLUGIN YANG BIKIN CLAUDE CODE KAMU',
      highlightBanner: 'BEDA LEVEL',
      subtitle: '3 di antaranya resmi dari Anthropic.',
      headerBadge: 'CLAUDE CODE',
      points: [
        {
          number: '01',
          title: 'GITHUB & GIT INTEGRATION',
          desc: 'Memungkinkan Claude membaca PR, auto-commit, dan merespon review kode langsung.',
          tag: 'OFFICIAL'
        },
        {
          number: '02',
          title: 'POSTGRESQL DB CONNECTOR',
          desc: 'Analisis skema database dan jalankan migrasi instan dengan verifikasi query otomatis.',
          tag: 'DATABASE'
        },
        {
          number: '03',
          title: 'FIGMA TO CODE EXTRACTOR',
          desc: 'Mengubah token desain Figma menjadi komponen Tailwind CSS dalam hitungan detik.',
          tag: 'DESIGN'
        }
      ],
      footer: '@classai_id',
      subLink: 'Geser ❯',
      caption: `⚡ Claude Code sekarang jadi senjata wajib developer modern!\n\nDengan memasang plugin yang tepat, Anda bisa mengubah terminal coding biasa menjadi asisten senior developer yang bisa audit repo, generate test, dan integrasi API tanpa jeda.\n\nSimak 5 rekomendasi plugin terbaik di carousel ini! 📌\n\nKomen "PLUGIN" untuk dapetin link dokumentasi instalasinya! 👇`,
      hashtags: ['#claudecode', '#anthropic', '#aitools', '#codingtips', '#developerlife', '#softwareengineering', '#artificialintelligence', '#terlstudio']
    }
  },
  {
    id: 'molen-forest-font',
    name: 'Molen Chunky Typo (Vintage Showcase)',
    category: 'Typography & Art',
    theme: 'foresttype',
    prompt: 'Showcase typeface display retro Molen dengan warna forest green',
    content: {
      mainTitle: 'MOLEN',
      highlightBanner: 'MO\nLEN',
      subtitle: 'Molen',
      headerBadge: 'TYPE SPECIMEN',
      points: [
        {
          number: 'Aa',
          title: 'ORGANIC BUBBLE CURVES',
          desc: 'Bentuk huruf membulat tebal memberikan kesan vintage 70s yang ramah sekaligus berani.',
          tag: 'DISPLAY'
        },
        {
          number: '01',
          title: 'HERO HEADLINE DOMINANCE',
          desc: 'Sangat cocok untuk judul poster, kemasan makanan, fashion brand, dan merchandise unik.',
          tag: 'USE CASE'
        },
        {
          number: 'Ot',
          title: 'FULL OTF / TTF & LIGATURES',
          desc: 'Dilengkapi karakter alternatif dan angka estetik untuk variasi komposisi layout.',
          tag: 'FEATURES'
        }
      ],
      footer: 'Penggunaan : Personal Use',
      subLink: 'Download : freefonts.io',
      caption: `🌿 Type Specimen: "MOLEN" — The Puffy Vintage Display Typeface.\n\nKarakter tebal dan membulat yang memancarkan aura nostalgia era 70-an, sangat pas dipadukan dengan palet Forest Green dan aksen Ivory lembut.\n\nLisensi: Personal Use Free\nSimpan postingan ini untuk koleksi referensi font desain Anda berikutnya! 📌`,
      hashtags: ['#typography', '#typedesign', '#freefont', '#vintagefont', '#graphicdesign', '#fontinspiration', '#desainlogo', '#terlstudio']
    }
  }
];

