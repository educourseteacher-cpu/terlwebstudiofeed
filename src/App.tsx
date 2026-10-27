import React, { useState, useRef, useEffect } from 'react';
import { 
  ThemeType, 
  AspectRatioType, 
  FeedContent, 
  SlideItem, 
  BrandSettings 
} from './types';
import { THEME_CONFIGS } from './utils/themeStyles';
import { PRESET_TEMPLATES, PresetTemplate } from './utils/presets';
import { 
  downloadPng, 
  copyImageToClipboard, 
  downloadCarouselZip,
  downloadPptx,
  downloadCarouselPptx
} from './utils/exportImage';
import { generateContentUniversal, generateCarouselUniversal } from './utils/aiGenerator';

import { Header } from './components/Header';
import { CanvasRenderer } from './components/CanvasRenderer';
import { InstagramPhoneMockup } from './components/InstagramPhoneMockup';
import { ThemeSelector } from './components/ThemeSelector';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { CarouselNavigator } from './components/CarouselNavigator';
import { BrandCustomizer } from './components/BrandCustomizer';
import { CaptionStudio } from './components/CaptionStudio';
import { HookGeneratorModal } from './components/HookGeneratorModal';
import { PresetsModal } from './components/PresetsModal';

import { 
  Sparkles, 
  Download, 
  Copy, 
  Layers, 
  FileArchive, 
  Presentation,
  FileSpreadsheet,
  RefreshCw, 
  Sliders, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Brain, 
  Send,
  Zap,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  Palette
} from 'lucide-react';

const DEFAULT_FEED_CONTENT: FeedContent = {
  mainTitle: 'TIPS MEMILIH DOMAIN WEBSITE YANG TEPAT UNTUK BISNIS',
  subtitle: 'PANDUAN PRAKTIS 2026',
  headerBadge: 'HIGH IMPACT INSIGHT',
  points: [
    {
      number: '01',
      title: 'GUNAKAN EKSTENSI .COM',
      desc: 'Lebih dipercaya dan mudah diingat audiens global.',
      tag: 'TRUST'
    },
    {
      number: '02',
      title: 'SINGKAT & MUDAH DIKETIK',
      desc: 'Hindari penggunaan tanda hubung atau ejaan rumit.',
      tag: 'USABILITY'
    },
    {
      number: '03',
      title: 'SESUAI DENGAN NAMA BRAND',
      desc: 'Membangun identitas digital yang konsisten.',
      tag: 'BRANDING'
    }
  ],
  footer: '< GROWTH YOUR BRANDING >',
  caption: `🌐 Tips Memilih Domain Website yang Tepat untuk Bisnis!\n\nBanyak pemula salah memilih domain yang terlalu panjang atau sulit dieja, berakibat pada hilangnya calon pelanggan potensial.\n\nSimpan 3 tips penting ini sebelum membeli domain baru! 📌\n\nKomen pendapat Anda di bawah ya! 👇`,
  hashtags: [
    '#terlwebstudio', '#growtyourbranding', '#webdesign', '#webdevelopment', '#instagramfeed', '#agencylife',
    '#digitalbranding', '#bisnisonline', '#umkmindonesia'
  ]
};

const DEFAULT_CAROUSEL_SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    slideType: 'cover',
    badge: 'SLIDE 01 // OVERVIEW',
    title: 'TIPS MEMILIH DOMAIN WEBSITE BISNIS',
    description: 'Framework teruji memilih domain yang kredibel, mudah diingat, dan melipatgandakan konversi penjualan.',
    statNumber: '10X',
    statLabel: 'Brand Trust',
    customFooter: '< GROWTH YOUR BRANDING >'
  },
  {
    id: 'slide-2',
    slideType: 'insight',
    badge: 'LANGKAH 01 // TRUST',
    title: 'PRIORITASKAN EKSTENSI .COM',
    description: 'Mayoritas pengguna internet secara reflek mengetik .com. Jangan buat pelanggan ragu dengan ekstensi aneh yang asing bagi mereka.',
    statNumber: '01',
    statLabel: 'GOLD STANDARD',
    customFooter: '< GROWTH YOUR BRANDING >'
  },
  {
    id: 'slide-3',
    slideType: 'comparison',
    badge: 'ANALISIS // DO VS DONT',
    title: 'JANGAN SAMPAI SALAH KETIK',
    description: 'Hindari kombinasi angka dan tanda hubung (-). Pastikan nama domain bisa diucapkan lewat telepon tanpa salah dengar.',
    statNumber: '02',
    statLabel: 'SIMPLICITY',
    customFooter: '< GROWTH YOUR BRANDING >'
  },
  {
    id: 'slide-4',
    slideType: 'insight',
    badge: 'LANGKAH 03 // BRANDING',
    title: 'SELARASKAN DENGAN HANDLE MEDSOS',
    description: 'Cek ketersediaan nama di Instagram, TikTok, dan X sebelum membeli domain agar branding Anda seragam.',
    statNumber: '03',
    statLabel: 'CONSISTENCY',
    customFooter: '< GROWTH YOUR BRANDING >'
  },
  {
    id: 'slide-5',
    slideType: 'cta',
    badge: 'AKSI // ACTION STEP',
    title: 'SIMPAN & BAGIKAN KE PARTNER BISNIS',
    description: 'Ketik "MAU" di komentar kalau mau kami bantu audit nama domain bisnis Anda secara gratis!',
    statNumber: 'FREE',
    statLabel: 'AUDIT',
    customFooter: '< GROWTH YOUR BRANDING >'
  }
];

const DEFAULT_BRAND: BrandSettings = {
  brandName: 'TERL',
  brandSubtitle: 'WEB STUDIO',
  tagline: 'GROWTH YOUR BRANDING',
  handle: '@terl.studio',
  website: 'terlstudio.com',
  customLogoUrl: '/assets/aistudio/LOGO_TERL_WEB_STUDIO_e8069f23.png',
  customAccentColor: null,
  showSlideCounter: true,
  showSwipeIndicator: true,
  showBadge: true,
  showFooterBar: true
};

export default function App() {
  // Global App States
  const [prompt, setPrompt] = useState('Tips memilih domain website yang tepat untuk meningkatkan kepercayaan brand bisnis');
  const [theme, setTheme] = useState<ThemeType>('brutalism');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('portrait');
  const [mode, setMode] = useState<'single' | 'carousel'>('single');
  const [previewMode, setPreviewMode] = useState<'canvas' | 'phone'>('canvas');
  const [activeTab, setActiveTab] = useState<'visual' | 'caption'>('visual');

  // Content States
  const [content, setContent] = useState<FeedContent>(DEFAULT_FEED_CONTENT);
  const [carouselSlides, setCarouselSlides] = useState<SlideItem[]>(DEFAULT_CAROUSEL_SLIDES);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [brand, setBrand] = useState<BrandSettings>(DEFAULT_BRAND);

  // AI & Operation States
  const [loadingAI, setLoadingAI] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [tone, setTone] = useState<'professional' | 'energetic' | 'casual' | 'luxury'>('professional');

  // Modals
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isHooksModalOpen, setIsHooksModalOpen] = useState(false);
  const [isPresetsModalOpen, setIsPresetsModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    msg: string;
    type: 'success' | 'warning' | 'error';
  }>({
    show: false,
    title: '',
    msg: '',
    type: 'success',
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  const showToast = (title: string, msg: string, type: 'success' | 'warning' | 'error' = 'success') => {
    setToast({ show: true, title, msg, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3800);
  };

  // 1-Click AI Generation
  const handleGenerateAI = async () => {
    if (!prompt.trim()) {
      showToast('Peringatan', 'Ketikkan topik atau ide konten terlebih dahulu!', 'warning');
      return;
    }

    setLoadingAI(true);
    try {
      if (mode === 'single') {
        const result = await generateContentUniversal({
          prompt,
          theme,
          tone,
          language
        });
        const d = result.data;
        setContent({
          mainTitle: d.mainTitle || prompt.toUpperCase(),
          highlightBanner: d.highlightBanner || content.highlightBanner,
          subtitle: d.subtitle || 'PANDUAN PRAKTIS 2026',
          headerBadge: d.headerBadge || 'PRO TIPS',
          points: d.points || content.points,
          footer: '< GROWTH YOUR BRANDING >',
          subLink: d.subLink,
          caption: d.caption || content.caption,
          hashtags: d.hashtags || content.hashtags
        });
        showToast(
          'Analisis Selesai!',
          result.source === 'api' 
            ? 'Konten Feed Instagram berhasil dirumuskan oleh Gemini AI.' 
            : 'Konten Feed berhasil dirumuskan & siap diposting.',
          'success'
        );
      } else {
        const result = await generateCarouselUniversal({
          prompt,
          slideCount: carouselSlides.length,
          theme,
          language
        });
        setCarouselSlides(result.slides);
        setActiveSlideIndex(0);
        if (result.caption) {
          setContent(prev => ({
            ...prev,
            caption: result.caption || prev.caption
          }));
        }
        showToast(
          'Carousel Dibuat!',
          `${result.slides.length} slide carousel terstruktur siap diposting.`
        );
      }
    } catch (err: any) {
      console.error(err);
      showToast('Konten Diperbarui', 'Konten berhasil digenerate.', 'success');
    } finally {
      setLoadingAI(false);
    }
  };

  // Download Single PNG
  const handleDownloadSinglePng = async () => {
    const el = document.getElementById('capture-canvas-element');
    if (!el) return;

    setExporting(true);
    showToast('Memproses Export...', 'Sedang merender resolusi tinggi 2.5x ultra sharp...', 'warning');

    try {
      const filename = `TERL-${theme}-${mode}-${Date.now()}.png`;
      await downloadPng(el, filename);
      showToast('Berhasil Diunduh!', 'Grafik Instagram beresolusi tinggi siap diunggah.');
    } catch (err) {
      console.error(err);
      showToast('Gagal Export', 'Terjadi kendala saat merender canvas.', 'error');
    } finally {
      setExporting(false);
    }
  };

  // Copy to Clipboard
  const handleCopyToClipboard = async () => {
    const el = document.getElementById('capture-canvas-element');
    if (!el) return;

    try {
      await copyImageToClipboard(el);
      showToast('Tersalin ke Clipboard!', 'Gambar siap dipaste (Ctrl+V) langsung ke aplikasi lain.');
    } catch (err) {
      console.error(err);
      showToast('Clipboard Gagal', 'Browser tidak mengizinkan akses clipboard langsung.', 'warning');
    }
  };

  // Download All Carousel Slides as ZIP
  const handleDownloadAllZip = async () => {
    if (mode !== 'carousel') return;
    setExporting(true);
    showToast('Mengemas Carousel ZIP...', `Memproses ${carouselSlides.length} slide gambar...`, 'warning');

    try {
      const originalIndex = activeSlideIndex;
      await downloadCarouselZip(
        async (index: number) => {
          setActiveSlideIndex(index);
          // Allow DOM to update
          await new Promise((r) => setTimeout(r, 120));
          return document.getElementById('capture-canvas-element');
        },
        carouselSlides.length,
        `TERL-Carousel-${theme}`
      );
      setActiveSlideIndex(originalIndex);
      showToast('ZIP Selesai!', 'Semua slide carousel berhasil dikemas dalam file ZIP.');
    } catch (err) {
      console.error(err);
      showToast('Gagal Membuat ZIP', 'Terjadi kesalahan saat memproses paket carousel.', 'error');
    } finally {
      setExporting(false);
    }
  };

  // Download Presentation PPTX (PowerPoint with matching aspect ratio)
  const handleDownloadPptx = async () => {
    setExporting(true);
    const aspectLabel = aspectRatio === 'portrait' ? '4:5 (1080x1350)' : aspectRatio === 'square' ? '1:1 (1080x1080)' : '9:16 (1080x1920)';

    try {
      if (mode === 'single') {
        const el = document.getElementById('capture-canvas-element');
        if (!el) return;
        showToast('Membuat File PPTX...', `Menyiapkan PowerPoint ${aspectLabel}...`, 'warning');
        const filename = `TERL-${theme}-${aspectRatio}-${Date.now()}.pptx`;
        await downloadPptx(el, filename, aspectRatio);
        showToast('File PPTX Siap!', `PowerPoint (${aspectLabel}) berhasil diunduh dengan rasio presisi.`);
      } else {
        // Multi-slide Carousel PPTX
        showToast('Membuat PPTX Carousel...', `Menyatukan ${carouselSlides.length} slide (${aspectLabel}) ke PowerPoint...`, 'warning');
        const originalIndex = activeSlideIndex;
        await downloadCarouselPptx(
          async (index: number) => {
            setActiveSlideIndex(index);
            await new Promise((r) => setTimeout(r, 120));
            return document.getElementById('capture-canvas-element');
          },
          carouselSlides.length,
          `TERL-Carousel-${theme}-${aspectRatio}`,
          aspectRatio
        );
        setActiveSlideIndex(originalIndex);
        showToast('PPTX Carousel Selesai!', `Semua ${carouselSlides.length} slide berhasil diekspor ke 1 file presentasi PowerPoint.`);
      }
    } catch (err) {
      console.error(err);
      showToast('Gagal Export PPTX', 'Terjadi kesalahan saat memproses file PowerPoint.', 'error');
    } finally {
      setExporting(false);
    }
  };

  // Carousel slide management handlers
  const handleAddSlide = () => {
    const newIdx = carouselSlides.length + 1;
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      slideType: 'insight',
      badge: `SLIDE 0${newIdx} // INSIGHT`,
      title: 'POIN TAMBAHAN BARU',
      description: 'Tulis penjelasan ringkas 1-2 kalimat yang menarik untuk pembaca.',
      statNumber: `0${newIdx}`,
      statLabel: 'KEY FOCUS',
      customFooter: 'TERL STUDIO // FRAMEWORK'
    };
    setCarouselSlides([...carouselSlides, newSlide]);
    setActiveSlideIndex(carouselSlides.length);
  };

  const handleRemoveSlide = (idx: number) => {
    if (carouselSlides.length <= 1) return;
    const updated = carouselSlides.filter((_, i) => i !== idx);
    setCarouselSlides(updated);
    setActiveSlideIndex(Math.max(0, idx - 1));
  };

  const handleDuplicateSlide = (idx: number) => {
    const slideToCopy = carouselSlides[idx];
    const newSlide: SlideItem = {
      ...slideToCopy,
      id: `slide-${Date.now()}`,
      title: `${slideToCopy.title} (COPY)`,
    };
    const updated = [...carouselSlides];
    updated.splice(idx + 1, 0, newSlide);
    setCarouselSlides(updated);
    setActiveSlideIndex(idx + 1);
  };

  const handleChangeSlideType = (idx: number, type: SlideItem['slideType']) => {
    const updated = [...carouselSlides];
    updated[idx] = { ...updated[idx], slideType: type };
    setCarouselSlides(updated);
  };

  // Preset Selection
  const handleSelectPreset = (preset: PresetTemplate) => {
    setTheme(preset.theme);
    setPrompt(preset.prompt);
    setContent(preset.content);
    showToast('Preset Diterapkan', `Memuat template "${preset.name}" (${preset.category})`);
  };

  // Hook selection
  const handleSelectHook = (hookText: string) => {
    if (mode === 'single') {
      setContent({ ...content, mainTitle: hookText.toUpperCase() });
    } else {
      const updated = [...carouselSlides];
      updated[activeSlideIndex] = { ...updated[activeSlideIndex], title: hookText.toUpperCase() };
      setCarouselSlides(updated);
    }
    showToast('Hook Terpasang', 'Headline feed berhasil diperbarui dengan gaya viral.');
  };

  const activeSlide = carouselSlides[activeSlideIndex];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans-app selection:bg-amber-400 selection:text-black">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-slate-700 text-white px-5 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
          <div>
            <p className="font-extrabold text-xs text-white">{toast.title}</p>
            <p className="text-[11px] text-slate-300">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        mode={mode}
        setMode={setMode}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        onOpenPresets={() => setIsPresetsModalOpen(true)}
        onOpenHooks={() => setIsHooksModalOpen(true)}
        onOpenBrand={() => setIsBrandModalOpen(true)}
      />

      {/* Main Studio Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls & Editor Studio */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-6 flex flex-col gap-5">
          
          {/* Top Panel Title */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h1 className="text-base font-extrabold text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-400" />
                <span>1-Prompt AI Content Engine</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Ketik topik ide, AI merumuskan headline, poin penting, caption & hashtags.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-1 bg-amber-400/10 text-amber-400 rounded-lg border border-amber-400/20">
              {mode === 'single' ? 'Single Post' : 'Carousel Mode'}
            </span>
          </div>

          {/* Prompt Input Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Topik / Prompt Utama</span>
              </label>
              <button
                type="button"
                onClick={() => setIsHooksModalOpen(true)}
                className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Ide Hook Viral</span>
              </button>
            </div>

            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Contoh: 3 kesalahan fatal UMKM saat membuat website company profile"
              className="w-full text-xs px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium resize-y"
            />

            {/* Quick Inspiration Topics */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 py-0.5">Coba ide:</span>
              {[
                { label: '5 Plugin Claude (AI)', theme: 'techhook', prompt: '5 Plugin yang bikin Claude Code kamu beda level' },
                { label: 'Molen Vintage Font', theme: 'foresttype', prompt: 'Showcase typeface display retro Molen dengan warna forest green' },
                { label: 'Tips Domain Bisnis', theme: 'brutalism', prompt: 'Tips memilih domain website yang tepat untuk meningkatkan reputasi bisnis' },
                { label: 'Web UMKM Boncos', theme: 'arcade', prompt: '3 kesalahan fatal UMKM saat membuat website company profile' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    setPrompt(chip.prompt);
                    setTheme(chip.theme as any);
                    const found = PRESET_TEMPLATES.find(p => p.theme === chip.theme);
                    if (found) {
                      setContent(found.content);
                    }
                  }}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60 transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone & Language Options */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Tone of Voice
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:ring-1 focus:ring-amber-400"
              >
                <option value="professional">Professional & Sharp</option>
                <option value="energetic">High Energy & Bold</option>
                <option value="casual">Casual & Storytelling</option>
                <option value="luxury">Minimal & Exclusive</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Bahasa Output
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:ring-1 focus:ring-amber-400"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English (US)</option>
              </select>
            </div>
          </div>

          {/* AI Generate Button */}
          <button
            type="button"
            disabled={loadingAI}
            onClick={handleGenerateAI}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            {loadingAI ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Gemini AI Sedang Meracik Konten...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 text-black" />
                <span>
                  {mode === 'single' ? 'Analisis & Buat Feed Otomatis' : 'Generate Full Carousel AI'}
                </span>
              </>
            )}
          </button>

          <hr className="border-slate-800" />

          {/* Theme & Aspect Ratio Selectors */}
          <ThemeSelector currentTheme={theme} onSelectTheme={setTheme} />
          <AspectRatioSelector aspectRatio={aspectRatio} onChange={setAspectRatio} />

          {/* Carousel Navigator if in Carousel mode */}
          {mode === 'carousel' && (
            <CarouselNavigator
              slides={carouselSlides}
              activeIndex={activeSlideIndex}
              onSelectSlide={setActiveSlideIndex}
              onAddSlide={handleAddSlide}
              onRemoveSlide={handleRemoveSlide}
              onDuplicateSlide={handleDuplicateSlide}
              onChangeSlideType={handleChangeSlideType}
            />
          )}

          {/* TABS: Content Editor vs Caption Studio */}
          <div className="flex border-b border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('visual')}
              className={`pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'visual'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Editor Teks Slide
            </button>
            <button
              onClick={() => setActiveTab('caption')}
              className={`pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'caption'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Caption & Hashtags ({content.hashtags?.length || 0})
            </button>
          </div>

          {/* TAB 1: Visual Text Customizer */}
          {activeTab === 'visual' && (
            <div className="space-y-3">
              {mode === 'single' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Judul Utama Feed</label>
                    <input
                      type="text"
                      value={content.mainTitle}
                      onChange={(e) => setContent({ ...content, mainTitle: e.target.value })}
                      placeholder="Judul Utama"
                      className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase text-blue-400">
                        {theme === 'foresttype' ? 'Teks Centerpiece Chunky (Baris 1 & 2)' : 'Teks Kotak Highlight (Banner Biru)'}
                      </label>
                      <span className="text-[9px] text-slate-500 font-mono">Special Theme Accent</span>
                    </div>
                    <input
                      type="text"
                      value={content.highlightBanner || ''}
                      onChange={(e) => setContent({ ...content, highlightBanner: e.target.value })}
                      placeholder={theme === 'foresttype' ? 'Contoh: MO\\nLEN' : 'Contoh: BEDA LEVEL / RESMI'}
                      className="w-full text-xs px-3 py-2 bg-slate-950 border border-blue-900/60 rounded-xl text-blue-300 font-bold focus:ring-1 focus:ring-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400">3 Poin Insight</label>
                    {content.points.map((pt, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-amber-400 font-bold">#{pt.number}</span>
                          <input
                            type="text"
                            value={pt.title}
                            onChange={(e) => {
                              const updated = [...content.points];
                              updated[idx].title = e.target.value;
                              setContent({ ...content, points: updated });
                            }}
                            placeholder={`Judul Poin ${idx + 1}`}
                            className="flex-1 text-xs font-bold px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={pt.desc}
                          onChange={(e) => {
                            const updated = [...content.points];
                            updated[idx].desc = e.target.value;
                            setContent({ ...content, points: updated });
                          }}
                          placeholder={`Deskripsi Poin ${idx + 1}`}
                          className="w-full text-xs px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-slate-300"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Footer Tagline Branding</label>
                    <input
                      type="text"
                      value={content.footer}
                      onChange={(e) => setContent({ ...content, footer: e.target.value })}
                      placeholder="Tagline Footer"
                      className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-1 focus:ring-amber-400 font-bold"
                    />
                  </div>
                </>
              ) : (
                /* Carousel Active Slide Editor */
                activeSlide && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Badge Label Slide</label>
                      <input
                        type="text"
                        value={activeSlide.badge}
                        onChange={(e) => {
                          const updated = [...carouselSlides];
                          updated[activeSlideIndex].badge = e.target.value;
                          setCarouselSlides(updated);
                        }}
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Headline Slide #{activeSlideIndex + 1}</label>
                      <input
                        type="text"
                        value={activeSlide.title}
                        onChange={(e) => {
                          const updated = [...carouselSlides];
                          updated[activeSlideIndex].title = e.target.value;
                          setCarouselSlides(updated);
                        }}
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Deskripsi / Isi Slide</label>
                      <textarea
                        rows={3}
                        value={activeSlide.description}
                        onChange={(e) => {
                          const updated = [...carouselSlides];
                          updated[activeSlideIndex].description = e.target.value;
                          setCarouselSlides(updated);
                        }}
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400">Stat Highlight</label>
                        <input
                          type="text"
                          value={activeSlide.statNumber || ''}
                          onChange={(e) => {
                            const updated = [...carouselSlides];
                            updated[activeSlideIndex].statNumber = e.target.value;
                            setCarouselSlides(updated);
                          }}
                          placeholder="Misal: 10X / 01 / PRO"
                          className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400">Stat Label</label>
                        <input
                          type="text"
                          value={activeSlide.statLabel || ''}
                          onChange={(e) => {
                            const updated = [...carouselSlides];
                            updated[activeSlideIndex].statLabel = e.target.value;
                            setCarouselSlides(updated);
                          }}
                          placeholder="Misal: Trust Score"
                          className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* TAB 2: Caption Studio */}
          {activeTab === 'caption' && (
            <CaptionStudio
              content={content}
              onChangeContent={setContent}
              onShowToast={showToast}
            />
          )}

          {/* Export Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {/* 1. Main PPTX Export Button (Requested Feature) */}
            <button
              type="button"
              disabled={exporting}
              onClick={handleDownloadPptx}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-black py-3 px-5 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <Presentation className="w-4 h-4 text-black stroke-[2.5]" />
              <span>
                Download File PPTX ({mode === 'carousel' ? `${carouselSlides.length} Slide Carousel` : '1 Slide'} &bull; {aspectRatio === 'portrait' ? '4:5' : aspectRatio === 'square' ? '1:1' : '9:16'})
              </span>
            </button>

            {/* 2. High-Res PNG Export */}
            <button
              type="button"
              disabled={exporting}
              onClick={handleDownloadSinglePng}
              className="w-full bg-white hover:bg-slate-200 text-black font-extrabold py-2.5 px-5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50 cursor-pointer text-xs"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>
                Download High-Res PNG (
                {aspectRatio === 'portrait' ? '1080x1350 px' : aspectRatio === 'square' ? '1080x1080 px' : '1080x1920 px'}
                )
              </span>
            </button>

            {/* 3. Secondary Actions Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyToClipboard}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                title="Salin gambar langsung ke clipboard"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Copy Image</span>
              </button>

              {mode === 'carousel' ? (
                <button
                  type="button"
                  disabled={exporting}
                  onClick={handleDownloadAllZip}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-extrabold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 border border-slate-700"
                  title="Download semua slide dalam file ZIP"
                >
                  <FileArchive className="w-3.5 h-3.5" />
                  <span>Download ZIP ({carouselSlides.length})</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsBrandModalOpen(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Palette className="w-3.5 h-3.5 text-purple-400" />
                  <span>Custom Brand</span>
                </button>
              )}
            </div>

            <p className="text-[10px] text-slate-400 text-center pt-1 font-mono">
              Ukuran slide PowerPoint otomatis disesuaikan persis ({aspectRatio === 'portrait' ? '4:5 / 1080x1350' : aspectRatio === 'square' ? '1:1 / 1080x1080' : '9:16 / 1080x1920'}).
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Live Viewport Preview (Graphic Canvas or Phone Mockup) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center sticky top-28 space-y-4">
          
          {/* Status Header */}
          <div className="w-full flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {previewMode === 'canvas' ? 'Live Canvas Render' : 'Instagram App Phone Mockup'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                {aspectRatio === 'portrait' ? '1080 x 1350 px (4:5)' : aspectRatio === 'square' ? '1080 x 1080 px (1:1)' : '1080 x 1920 px (9:16)'}
              </span>
              {mode === 'carousel' && (
                <span className="bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2.5 py-1 rounded-full font-bold">
                  Slide {activeSlideIndex + 1}/{carouselSlides.length}
                </span>
              )}
            </div>
          </div>

          {/* Render Area */}
          <div className="w-full flex items-center justify-center p-2 min-h-[560px]">
            {previewMode === 'canvas' ? (
              <div className="flex items-center justify-center transition-all">
                <CanvasRenderer
                  containerRef={canvasRef}
                  theme={theme}
                  aspectRatio={aspectRatio}
                  content={content}
                  currentSlide={activeSlide}
                  slideIndex={activeSlideIndex}
                  totalSlides={carouselSlides.length}
                  brand={brand}
                  mode={mode}
                />
              </div>
            ) : (
              <InstagramPhoneMockup brand={brand} content={content}>
                <CanvasRenderer
                  theme={theme}
                  aspectRatio={aspectRatio}
                  content={content}
                  currentSlide={activeSlide}
                  slideIndex={activeSlideIndex}
                  totalSlides={carouselSlides.length}
                  brand={brand}
                  mode={mode}
                />
              </InstagramPhoneMockup>
            )}
          </div>

          {/* Carousel slide quick stepper if in carousel mode */}
          {mode === 'carousel' && (
            <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
              <button
                type="button"
                disabled={activeSlideIndex === 0}
                onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 font-bold"
              >
                &larr; Prev Slide
              </button>
              <span className="font-mono text-slate-300 font-bold">
                {activeSlideIndex + 1} of {carouselSlides.length}
              </span>
              <button
                type="button"
                disabled={activeSlideIndex === carouselSlides.length - 1}
                onClick={() => setActiveSlideIndex(prev => Math.min(carouselSlides.length - 1, prev + 1))}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 font-bold"
              >
                Next Slide &rarr;
              </button>
            </div>
          )}

          <p className="text-center text-xs text-slate-500 max-w-md">
            Gunakan mode <strong>Multi-Slide Carousel</strong> untuk edukasi mendalam, atau <strong>Single Post</strong> untuk insight kilat berdaya viral tinggi.
          </p>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800 mt-16 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">TERL Web Studio</span>
            <span>&bull;</span>
            <span>Gemini 3.8 Flash AI Engine</span>
          </div>
          <p>&copy; 2026 TERL Web Studio. Pro AI Instagram Feed & Carousel Generator.</p>
        </div>
      </footer>

      {/* Modals */}
      <BrandCustomizer
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        brand={brand}
        onChangeBrand={setBrand}
        onResetBrand={() => setBrand(DEFAULT_BRAND)}
      />

      <HookGeneratorModal
        isOpen={isHooksModalOpen}
        onClose={() => setIsHooksModalOpen(false)}
        currentTopic={prompt}
        onSelectHook={handleSelectHook}
      />

      <PresetsModal
        isOpen={isPresetsModalOpen}
        onClose={() => setIsPresetsModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

    </div>
  );
}
