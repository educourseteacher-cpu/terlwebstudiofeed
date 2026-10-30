import React from 'react';
import { 
  AspectRatioType, 
  BrandSettings, 
  ElementKey, 
  ElementPosition, 
  ElementPositions, 
  FeedContent, 
  SlideItem, 
  ThemeType 
} from '../types';
import { THEME_CONFIGS } from '../utils/themeStyles';
import { DraggableElement } from './DraggableElement';
import { 
  ArrowRight, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  XCircle, 
  VolumeX, 
  Plus,
  AlertTriangle,
  CheckSquare,
  ListChecks,
  TrendingUp,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface CanvasRendererProps {
  theme: ThemeType;
  aspectRatio: AspectRatioType;
  content: FeedContent;
  currentSlide?: SlideItem;
  slideIndex?: number;
  totalSlides?: number;
  brand: BrandSettings;
  mode: 'single' | 'carousel';
  containerRef?: React.RefObject<HTMLDivElement | null>;
  elementPositions?: ElementPositions;
  activeElementKey?: ElementKey | null;
  isInteractive?: boolean;
  onSelectElement?: (key: ElementKey) => void;
  onUpdatePosition?: (key: ElementKey, pos: ElementPosition) => void;
}

/**
 * Strips unwanted raw prompt prefixes like "HEADLINE:", "JUDUL:", or trailing "TAMPILKAN"
 */
function cleanHeadline(rawTitle?: string): string {
  if (!rawTitle) return 'TIPS MEMILIH DOMAIN WEBSITE BISNIS';
  let cleaned = rawTitle.replace(/^(headline|judul|topik|topic)\s*[:\-]\s*/i, '');
  cleaned = cleaned.replace(/\s+(tampilkan|buatkan|generate)\s*$/i, '');
  cleaned = cleaned.replace(/^["'“]+(.*?)["'”]+$/, '$1');
  return cleaned.trim();
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  theme,
  aspectRatio,
  content,
  currentSlide,
  slideIndex = 0,
  totalSlides = 1,
  brand,
  mode,
  containerRef,
  elementPositions = {},
  activeElementKey = null,
  isInteractive = false,
  onSelectElement,
  onUpdatePosition
}) => {
  const config = THEME_CONFIGS[theme] || THEME_CONFIGS.brutalism;

  // Aspect ratio classes for display
  const aspectClass = 
    aspectRatio === 'portrait' ? 'w-[480px] aspect-[4/5]' :
    aspectRatio === 'square' ? 'w-[480px] aspect-square' :
    'w-[420px] aspect-[9/16]';

  // Override accent color if user specified one
  const accentColor = brand.customAccentColor || config.primaryColor;

  const isCarousel = mode === 'carousel' && currentSlide;
  const slideType = isCarousel ? currentSlide.slideType : 'points';

  // Dynamic headline sizing based on length to prevent collision with cards
  const titleText = isCarousel ? cleanHeadline(currentSlide.title || content.mainTitle) : cleanHeadline(content.mainTitle);
  const titleLength = titleText.length;
  const titleSizeClass = 
    titleLength > 65 ? 'text-base sm:text-lg' :
    titleLength > 40 ? 'text-lg sm:text-xl' :
    'text-xl sm:text-2xl';

  const getPos = (key: ElementKey): ElementPosition => {
    return elementPositions[key] || { x: 0, y: 0, scale: 1 };
  };

  return (
    <div
      ref={containerRef}
      id="capture-canvas-element"
      className={`${aspectClass} ${config.bgClass} ${config.fontClass} relative flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300 ${config.containerBorderClass}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Cyberpunk Neon Grid */}
      {theme === 'cyberpunk' && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      )}

      {/* 2. Retro Arcade Scanlines */}
      {theme === 'arcade' && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)`
          }}
        />
      )}

      {/* 3. Tech AI Creator Blueprint Grid (ClassAI Style) */}
      {theme === 'techhook' && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(#2563EB 0.75px, transparent 0.75px), linear-gradient(90deg, #2563EB 0.75px, transparent 0.75px)`,
            backgroundSize: '34px 34px'
          }}
        />
      )}

      {/* 4. Forest Chunky Typo Fine Texture (Molen Style) */}
      {theme === 'foresttype' && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)`
          }}
        />
      )}

      {/* ========================================================
          TOP HEADER / BRAND BAR (OFFICIAL TERL WEB STUDIO)
      ======================================================== */}
      <div className="relative z-20 flex items-center justify-between gap-3 shrink-0 mb-2">
        <DraggableElement
          elementKey="header"
          label="Header Brand"
          position={getPos('header')}
          selectedKey={activeElementKey}
          isInteractive={isInteractive}
          onSelect={onSelectElement}
          onChangePosition={onUpdatePosition}
          className="flex items-center gap-2.5 min-w-0"
        >
          {/* Official TERL Logo Container with clean white backdrop */}
          <div className="h-9 px-2 py-1 bg-white rounded-xl shadow-xs border border-black/10 flex items-center justify-center shrink-0">
            <img 
              src={brand.customLogoUrl || '/assets/aistudio/LOGO_TERL_WEB_STUDIO_e8069f23.png'} 
              alt="TERL WEB STUDIO" 
              className="h-7 w-auto object-contain block"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className={`text-[12px] font-black tracking-tight uppercase leading-snug whitespace-nowrap ${theme === 'foresttype' ? 'text-[#FDFBF7]' : 'opacity-95'}`}>
              {brand.brandName || 'TERL'} {brand.brandSubtitle || 'STUDIO'}
            </span>
            <span className="text-[9px] text-amber-500 font-extrabold tracking-wide font-mono leading-none whitespace-nowrap mt-0.5">
              &lt; {brand.tagline || 'GROWTH YOUR BRANDING'} &gt;
            </span>
          </div>
        </DraggableElement>

        {/* Right Badge / Counter */}
        <DraggableElement
          elementKey="badge"
          label="Badge Kategori"
          position={getPos('badge')}
          selectedKey={activeElementKey}
          isInteractive={isInteractive}
          onSelect={onSelectElement}
          onChangePosition={onUpdatePosition}
          className="flex items-center gap-2 shrink-0 ml-auto"
        >
          {brand.showBadge && (
            <span className={`${config.badgeClass} whitespace-nowrap shadow-xs`}>
              {isCarousel ? currentSlide?.badge : (content.headerBadge || 'PRO INSIGHT')}
            </span>
          )}

          {theme === 'techhook' ? (
            <div className="flex items-center gap-1 text-[10px] font-mono shrink-0">
              <span className="px-2 py-0.5 rounded-full border border-slate-300 text-slate-600 font-bold bg-white/70">
                0{slideIndex + 1}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-700 text-white font-bold">
                {isCarousel ? `${slideIndex + 1}/${totalSlides}` : '1/10'}
              </span>
            </div>
          ) : isCarousel && brand.showSlideCounter && totalSlides > 1 ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 opacity-70 shrink-0">
              {slideIndex + 1}/{totalSlides}
            </span>
          ) : null}
        </DraggableElement>
      </div>

      {/* ========================================================
          MIDDLE CONTENT CONTAINER (Balanced & Non-Overlapping)
      ======================================================== */}
      <div className="relative z-10 flex-1 my-auto flex flex-col justify-center min-h-0 py-1 overflow-hidden">
        
        {/* ========================================================
            SPECIAL THEME 1: TECH AI CREATOR (ClassAI Blueprint)
        ======================================================== */}
        {theme === 'techhook' ? (
          <div className="flex flex-col justify-between h-full py-1">
            {/* Massive Bold Headline with Electric Blue Banner */}
            <div className="space-y-1.5 my-auto">
              <DraggableElement
                elementKey="title"
                label="Judul Headline"
                position={getPos('title')}
                selectedKey={activeElementKey}
                isInteractive={isInteractive}
                onSelect={onSelectElement}
                onChangePosition={onUpdatePosition}
              >
                <h1 className="text-xl sm:text-[28px] font-black tracking-tight leading-[1.08] text-slate-950 uppercase font-sans-app">
                  {content.mainTitle || '5 PLUGIN YANG BIKIN CLAUDE CODE KAMU'}
                </h1>
              </DraggableElement>
              
              {/* The Signature Electric Blue Pill Box */}
              <DraggableElement
                elementKey="highlight"
                label="Kotak Banner Biru"
                position={getPos('highlight')}
                selectedKey={activeElementKey}
                isInteractive={isInteractive}
                onSelect={onSelectElement}
                onChangePosition={onUpdatePosition}
              >
                <div className="inline-block bg-[#2563EB] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-[0_8px_25px_rgba(37,99,235,0.35)] text-xl sm:text-2xl font-black tracking-tight uppercase transform -rotate-0.5">
                  {content.highlightBanner || currentSlide?.highlightBanner || 'BEDA LEVEL'}
                </div>
              </DraggableElement>

              {/* Subtitle with colored keyword */}
              <DraggableElement
                elementKey="subtitle"
                label="Subtitle"
                position={getPos('subtitle')}
                selectedKey={activeElementKey}
                isInteractive={isInteractive}
                onSelect={onSelectElement}
                onChangePosition={onUpdatePosition}
              >
                <p className="text-xs sm:text-sm font-semibold text-slate-700 pt-1 font-sans-app">
                  {content.subtitle ? (
                    <span>
                      {content.subtitle.replace(/resmi/i, '')}
                      <span className="text-[#2563EB] font-black"> resmi </span>
                      {content.subtitle.toLowerCase().includes('resmi') ? content.subtitle.split(/resmi/i)[1] : ''}
                    </span>
                  ) : (
                    <span>3 di antaranya <span className="text-[#2563EB] font-black">resmi</span> dari Anthropic.</span>
                  )}
                </p>
              </DraggableElement>
            </div>

            {/* Visual Centerpiece: Squircle App Badges with + sign OR 3 Cards in Points Mode */}
            {mode === 'single' ? (
              <DraggableElement
                elementKey="visual"
                label="Visual Centerpiece"
                position={getPos('visual')}
                selectedKey={activeElementKey}
                isInteractive={isInteractive}
                onSelect={onSelectElement}
                onChangePosition={onUpdatePosition}
                className="flex items-center justify-center gap-3.5 my-auto py-2"
              >
                {/* Squircle 1: Coral Claude Starburst */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#D97757] shadow-xl flex items-center justify-center p-3 transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="text-white text-3xl sm:text-4xl font-black">
                    ✱
                  </div>
                </div>

                {/* Plus connector */}
                <div className="text-[#2563EB] text-2xl font-black shrink-0">
                  <Plus className="w-6 h-6 stroke-[3.5]" />
                </div>

                {/* Squircle 2: Dark Slate AI Badge */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#1E293B] shadow-xl flex items-center justify-center p-3 transform rotate-1 hover:rotate-0 transition-transform">
                  {/* Top-Right Badge: "3 RESMI" */}
                  <div className="absolute -top-2.5 right-1 bg-[#2563EB] text-white text-[8px] font-mono font-bold px-2 py-0.5 rounded-md shadow-md uppercase">
                    3 RESMI
                  </div>
                  <div className="text-white font-black text-2xl sm:text-3xl tracking-tighter">
                    A\
                  </div>
                </div>
              </DraggableElement>
            ) : (
              /* In Carousel mode, show current slide details */
              <div className="my-auto space-y-2.5">
                <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-2">
                  <h3 className="font-black text-sm uppercase text-slate-900">
                    {currentSlide?.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentSlide?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : theme === 'foresttype' ? (
          /* ========================================================
              SPECIAL THEME 2: FOREST CHUNKY TYPO (Molen Vintage)
          ======================================================== */
          <div className="flex flex-col justify-between h-full py-1 text-center font-serif-app">
            
            {/* Top Subtitle */}
            <DraggableElement
              elementKey="subtitle"
              label="Subtitle Molen"
              position={getPos('subtitle')}
              selectedKey={activeElementKey}
              isInteractive={isInteractive}
              onSelect={onSelectElement}
              onChangePosition={onUpdatePosition}
              className="pt-1"
            >
              <h2 className="text-lg font-serif italic text-[#FDFBF7]/90 tracking-wide">
                {content.subtitle || 'Molen'}
              </h2>
            </DraggableElement>

            {/* Big Chunky Puffy Centerpiece ("MO LEN") */}
            <DraggableElement
              elementKey="highlight"
              label="Chunky Centerpiece (MO LEN)"
              position={getPos('highlight')}
              selectedKey={activeElementKey}
              isInteractive={isInteractive}
              onSelect={onSelectElement}
              onChangePosition={onUpdatePosition}
              className="my-auto flex flex-col items-center justify-center select-none py-2"
            >
              <div className="font-chunky-app text-6xl sm:text-8xl font-extrabold text-[#FDFBF7] tracking-tighter leading-[0.82] uppercase drop-shadow-md">
                {content.highlightBanner ? (
                  content.highlightBanner.split(/[\n\\]/).map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))
                ) : (
                  <>
                    <div>MO</div>
                    <div>LEN</div>
                  </>
                )}
              </div>
            </DraggableElement>

            {/* Bottom Meta & Typography Information */}
            <DraggableElement
              elementKey="footer"
              label="Footer Typography"
              position={getPos('footer')}
              selectedKey={activeElementKey}
              isInteractive={isInteractive}
              onSelect={onSelectElement}
              onChangePosition={onUpdatePosition}
              className="space-y-1 pt-2"
            >
              <p className="font-serif font-bold text-xs sm:text-sm text-[#FDFBF7] tracking-tight">
                {content.footer || 'Penggunaan : Personal Use'}
              </p>
              <p className="font-serif italic text-[11px] text-[#E8DFC9]">
                {content.subLink || 'Download : freefonts.io'}
              </p>
            </DraggableElement>

          </div>
        ) : (
          /* ========================================================
              STANDARD THEMES RENDERING (Brutalism, Minimal, Cyber, etc.)
          ======================================================== */
          <>
            {/* 1. SINGLE POST or CAROUSEL POINTS TYPE: COMPREHENSIVE 1-FEED MASTERCLASS */}
            {(!isCarousel || slideType === 'points') && (
              <div className="flex flex-col justify-between h-full py-0.5 min-h-0">
                {/* Title & Eyebrow Container */}
                <div className="text-center mb-1.5 px-1 shrink-0">
                  {content.subtitle && (
                    <DraggableElement
                      elementKey="subtitle"
                      label="Eyebrow Subtitle"
                      position={getPos('subtitle')}
                      selectedKey={activeElementKey}
                      isInteractive={isInteractive}
                      onSelect={onSelectElement}
                      onChangePosition={onUpdatePosition}
                    >
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-70 block mb-0.5">
                        {content.subtitle}
                      </span>
                    </DraggableElement>
                  )}

                  <DraggableElement
                    elementKey="title"
                    label="Judul Utama"
                    position={getPos('title')}
                    selectedKey={activeElementKey}
                    isInteractive={isInteractive}
                    onSelect={onSelectElement}
                    onChangePosition={onUpdatePosition}
                  >
                    <h2 className={`${titleSizeClass} ${config.titleClass} leading-tight break-words font-black tracking-tight`}>
                      {cleanHeadline(content.mainTitle)}
                    </h2>
                  </DraggableElement>
                </div>

                {/* Points Cards Wrapper (Supports 3-4 High-Density Insight Pillars) */}
                <DraggableElement
                  elementKey="points"
                  label="Pilar Insight Terpadu"
                  position={getPos('points')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="flex flex-col gap-1.5 sm:gap-2 my-auto justify-center min-h-0 flex-1 py-1"
                >
                  {content.points && content.points.slice(0, 4).map((pt, idx) => {
                    const pointKey = `point_${idx}` as ElementKey;
                    return (
                      <DraggableElement
                        key={idx}
                        elementKey={pointKey}
                        label={`Poin Card #${idx + 1}`}
                        position={getPos(pointKey)}
                        selectedKey={activeElementKey}
                        isInteractive={isInteractive}
                        onSelect={onSelectElement}
                        onChangePosition={onUpdatePosition}
                      >
                        <div 
                          className={`p-2 sm:p-2.5 flex items-start gap-2 transition-all ${config.cardClass}`}
                        >
                          <div 
                            className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-[10px] sm:text-[11px] flex items-center justify-center font-black ${config.iconBgClass}`}
                            style={{
                              backgroundColor: brand.customAccentColor ? brand.customAccentColor : undefined,
                              color: brand.customAccentColor ? '#000000' : undefined
                            }}
                          >
                            {pt.number || `0${idx + 1}`}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <h3 className="font-black text-[11px] sm:text-xs uppercase tracking-tight leading-snug break-words">
                                {pt.title}
                              </h3>
                              {pt.tag && (
                                <span className="text-[7.5px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 opacity-80 shrink-0 font-bold ml-auto">
                                  {pt.tag}
                                </span>
                              )}
                            </div>
                            <p className={`text-[10px] sm:text-[11px] mt-0.5 leading-snug line-clamp-2 ${config.descClass}`}>
                              {pt.desc}
                            </p>
                          </div>
                        </div>
                      </DraggableElement>
                    );
                  })}
                </DraggableElement>

                {/* Single Post Takeaway / Blueprint Formula Box */}
                {content.takeawayBox && (
                  <DraggableElement
                    elementKey="formula"
                    label="Formula / Blueprint Eksekusi"
                    position={getPos('formula')}
                    selectedKey={activeElementKey}
                    isInteractive={isInteractive}
                    onSelect={onSelectElement}
                    onChangePosition={onUpdatePosition}
                    className="shrink-0 mt-1"
                  >
                    <div className="p-2 sm:p-2.5 rounded-xl border border-amber-400/50 bg-amber-400/10 dark:bg-amber-400/15 flex items-center justify-between gap-2 shadow-xs">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-black uppercase text-amber-500 tracking-wider">
                          <Sparkles className="w-2.5 h-2.5 shrink-0" />
                          <span>{content.takeawayBox.label || 'FORMULA EKSEKUSI'}</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] font-bold leading-tight truncate text-slate-800 dark:text-slate-100 mt-0.5">
                          {content.takeawayBox.formula}
                        </p>
                      </div>
                      {content.takeawayBox.metric && (
                        <span className="text-[8px] sm:text-[9px] font-mono font-black px-2 py-0.5 rounded-md bg-amber-400 text-black shrink-0 tracking-tight">
                          {content.takeawayBox.metric}
                        </span>
                      )}
                    </div>
                  </DraggableElement>
                )}
              </div>
            )}

            {/* 2. CAROUSEL COVER SLIDE */}
            {isCarousel && slideType === 'cover' && (
              <div className="flex flex-col justify-center items-center text-center px-2 py-2 my-auto">
                <DraggableElement
                  elementKey="badge"
                  label="Badge Cover"
                  position={getPos('badge')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 text-[10px] font-mono font-bold tracking-wider uppercase"
                >
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
                  <span>{currentSlide.badge || 'PRO STRATEGY'}</span>
                </DraggableElement>

                <DraggableElement
                  elementKey="title"
                  label="Judul Cover"
                  position={getPos('title')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <h1 className={`text-xl sm:text-3xl ${config.titleClass} leading-tight mb-3`}>
                    {cleanHeadline(currentSlide.title || content.mainTitle)}
                  </h1>
                </DraggableElement>

                <DraggableElement
                  elementKey="subtitle"
                  label="Deskripsi Cover"
                  position={getPos('subtitle')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <p className={`text-xs max-w-sm mx-auto leading-relaxed opacity-85 mb-4 ${config.descClass}`}>
                    {currentSlide.description || 'Framework teruji untuk menaikkan reputasi brand dan konversi penjualan Anda.'}
                  </p>
                </DraggableElement>

                {currentSlide.statNumber && (
                  <DraggableElement
                    elementKey="stat"
                    label="Metric Card"
                    position={getPos('stat')}
                    selectedKey={activeElementKey}
                    isInteractive={isInteractive}
                    onSelect={onSelectElement}
                    onChangePosition={onUpdatePosition}
                  >
                    <div 
                      className={`px-4 py-2.5 rounded-2xl flex items-center gap-3 border ${config.cardClass}`}
                    >
                      <span className="text-2xl font-black" style={{ color: accentColor }}>
                        {currentSlide.statNumber}
                      </span>
                      <div className="text-left">
                        <span className="text-[9px] uppercase font-bold tracking-wider opacity-60 block">Metric Impact</span>
                        <span className="text-xs font-extrabold">{currentSlide.statLabel || 'Peningkatan Hasil'}</span>
                      </div>
                    </div>
                  </DraggableElement>
                )}
              </div>
            )}

            {/* 3. CAROUSEL PROBLEM DIAGNOSIS SLIDE */}
            {isCarousel && slideType === 'problem' && (
              <div className="flex flex-col justify-center px-1 py-1 space-y-3 my-auto">
                <DraggableElement
                  elementKey="badge"
                  label="Warning Badge"
                  position={getPos('badge')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="flex items-center gap-2"
                >
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-500 font-mono font-bold text-[10px] tracking-wider uppercase border border-rose-500/30 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{currentSlide.problemData?.warningTag || 'DIAGNOSA AKAR MASALAH'}</span>
                  </span>
                </DraggableElement>

                <DraggableElement
                  elementKey="title"
                  label="Judul Masalah"
                  position={getPos('title')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <h2 className={`text-lg sm:text-2xl ${config.titleClass} leading-tight`}>
                    {cleanHeadline(currentSlide.title || 'KENAPA BANYAK BISNIS GAGAL?')}
                  </h2>
                </DraggableElement>

                <DraggableElement
                  elementKey="highlight"
                  label="Kartu Analisis Masalah"
                  position={getPos('highlight')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="space-y-2.5"
                >
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider">
                          FATAL PITFALL:
                        </span>
                        <p className="text-xs leading-snug mt-0.5 font-medium text-slate-800 dark:text-slate-100">
                          {currentSlide.problemData?.painPoint || currentSlide.description}
                        </p>
                      </div>
                    </div>

                    {currentSlide.problemData?.impactText && (
                      <div className="pt-2 border-t border-rose-500/20 text-[11px] text-rose-600 dark:text-rose-400 font-semibold italic">
                        ⚠️ {currentSlide.problemData.impactText}
                      </div>
                    )}
                  </div>
                </DraggableElement>
              </div>
            )}

            {/* 4. CAROUSEL FRAMEWORK CORE PILLARS SLIDE */}
            {isCarousel && slideType === 'framework' && (
              <div className="flex flex-col justify-center px-1 py-1 space-y-2.5 my-auto">
                <DraggableElement
                  elementKey="title"
                  label="Judul Framework"
                  position={getPos('title')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <div className="text-center mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-500 block">
                      {currentSlide.badge || 'FRAMEWORK // 3 PILAR UTAMA'}
                    </span>
                    <h2 className={`text-base sm:text-xl ${config.titleClass} leading-tight`}>
                      {cleanHeadline(currentSlide.title || 'FRAMEWORK EKSEKUSI TERUJI')}
                    </h2>
                  </div>
                </DraggableElement>

                <DraggableElement
                  elementKey="points"
                  label="Langkah Framework"
                  position={getPos('points')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="space-y-2"
                >
                  {(currentSlide.frameworkSteps || [
                    { stepNumber: '01', stepTitle: 'CLARITY FIRST', stepDetail: 'Jelaskan masalah dan solusi Anda dalam 1 kalimat tegas.' },
                    { stepNumber: '02', stepTitle: 'SPEED & ACCESSIBILITY', stepDetail: 'Optimasi loading di bawah 1.5 detik pada semua tipe smartphone.' },
                    { stepNumber: '03', stepTitle: 'SEAMLESS CONVERSION', stepDetail: 'Hadirkan 1 jalur CTA tanpa friksi menuju WhatsApp atau checkout.' }
                  ]).map((step, idx) => (
                    <div 
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 ${config.cardClass}`}
                    >
                      <div 
                        className="w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 text-black"
                        style={{ backgroundColor: accentColor }}
                      >
                        {step.stepNumber}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-black uppercase tracking-tight leading-snug">
                          {step.stepTitle}
                        </h4>
                        <p className={`text-[10px] sm:text-[11px] leading-tight mt-0.5 ${config.descClass}`}>
                          {step.stepDetail}
                        </p>
                      </div>
                    </div>
                  ))}
                </DraggableElement>
              </div>
            )}

            {/* 5. CAROUSEL COMPARISON SLIDE */}
            {isCarousel && slideType === 'comparison' && (
              <div className="space-y-2 py-1 my-auto">
                <DraggableElement
                  elementKey="title"
                  label="Judul Komparasi"
                  position={getPos('title')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <h2 className={`text-base sm:text-xl text-center ${config.titleClass} mb-2`}>
                    {cleanHeadline(currentSlide.title || 'APA YANG HARUS DIUBAH?')}
                  </h2>
                </DraggableElement>
                
                <DraggableElement
                  elementKey="comparison"
                  label="DO vs DONT Cards"
                  position={getPos('comparison')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="space-y-2"
                >
                  <div className="p-3 rounded-xl border border-rose-500/50 bg-rose-500/10 flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider">
                        {currentSlide.comparisonData?.dontTitle || "HINDARI INI (DON'T)"}
                      </span>
                      <p className="text-xs text-rose-900 dark:text-rose-200/90 leading-snug mt-0.5">
                        {currentSlide.comparisonData?.dontDesc || 'Menumpuk terlalu banyak teks dan paragraf panjang tanpa jeda visual.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-emerald-500/50 bg-emerald-500/10 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-500 tracking-wider">
                        {currentSlide.comparisonData?.doTitle || "LAKUKAN INI (DO)"}
                      </span>
                      <p className="text-xs text-emerald-900 dark:text-emerald-200/90 leading-snug mt-0.5">
                        {currentSlide.comparisonData?.doDesc || 'Gunakan 1 ide per slide dengan kontras tinggi dan headline tegas.'}
                      </p>
                    </div>
                  </div>
                </DraggableElement>
              </div>
            )}

            {/* 6. CAROUSEL CHECKLIST SLIDE */}
            {isCarousel && slideType === 'checklist' && (
              <div className="space-y-2.5 py-1 my-auto">
                <DraggableElement
                  elementKey="title"
                  label="Judul Checklist"
                  position={getPos('title')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <div className="text-center mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-500 block">
                      {currentSlide.badge || 'CHECKLIST // PRAKTIK LANGSUNG'}
                    </span>
                    <h2 className={`text-base sm:text-xl ${config.titleClass} leading-tight`}>
                      {cleanHeadline(currentSlide.title || 'CHECKLIST KUNCI SEBELUM EKSEKUSI')}
                    </h2>
                  </div>
                </DraggableElement>

                <DraggableElement
                  elementKey="checklist"
                  label="Daftar Checklist"
                  position={getPos('checklist')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="space-y-1.5"
                >
                  {(currentSlide.checklistItems || [
                    { text: 'Headline langsung mengutarakan benefit terbesar pembeli', tag: 'COPY', done: true },
                    { text: 'Loading halaman lolos skor Google PageSpeed > 90', tag: 'PERFORMA', done: true },
                    { text: 'Testimoni pelanggan diletakkan sebelum scroll pertama', tag: 'TRUST', done: true },
                    { text: 'Nomor WhatsApp dan link navigasi teruji aktif tanpa error', tag: 'CLOSING', done: true }
                  ]).map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between gap-2 ${config.cardClass}`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-xs font-semibold leading-snug truncate">
                          {item.text}
                        </span>
                      </div>
                      {item.tag && (
                        <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 shrink-0">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </DraggableElement>
              </div>
            )}

            {/* 7. CAROUSEL INSIGHT SLIDE */}
            {isCarousel && slideType === 'insight' && (
              <div className="flex flex-col justify-center px-2 py-2 space-y-3 my-auto">
                <DraggableElement
                  elementKey="subtitle"
                  label="Step Counter"
                  position={getPos('subtitle')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="flex items-center gap-2"
                >
                  <span 
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-black"
                    style={{ backgroundColor: accentColor }}
                  >
                    {currentSlide.statNumber || (slideIndex + 1)}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-70">
                    {currentSlide.badge || `LANGKAH KE-${slideIndex + 1}`}
                  </span>
                </DraggableElement>

                <DraggableElement
                  elementKey="title"
                  label="Judul Insight"
                  position={getPos('title')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <h2 className={`text-lg sm:text-2xl ${config.titleClass} leading-tight`}>
                    {cleanHeadline(currentSlide.title)}
                  </h2>
                </DraggableElement>

                <DraggableElement
                  elementKey="highlight"
                  label="Isi Card Insight"
                  position={getPos('highlight')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <div className={`p-3.5 rounded-xl ${config.cardClass}`}>
                    <p className={`text-xs sm:text-sm leading-relaxed ${config.descClass}`}>
                      {currentSlide.description}
                    </p>
                  </div>
                </DraggableElement>
              </div>
            )}

            {/* 8. CAROUSEL CTA SLIDE */}
            {isCarousel && slideType === 'cta' && (
              <div className="flex flex-col justify-center items-center text-center px-2 py-1 my-auto">
                <DraggableElement
                  elementKey="visual"
                  label="Logo Tengah CTA"
                  position={getPos('visual')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-200/90 flex items-center justify-center mb-2">
                    <img 
                      src={brand.customLogoUrl || '/assets/aistudio/LOGO_TERL_WEB_STUDIO_e8069f23.png'} 
                      alt="TERL WEB STUDIO" 
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                </DraggableElement>

                <DraggableElement
                  elementKey="title"
                  label="Judul CTA"
                  position={getPos('title')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <h2 className={`text-lg sm:text-2xl ${config.titleClass} leading-tight mb-1.5`}>
                    {cleanHeadline(currentSlide.title || 'SIAP SCALE UP BRAND DIGITAL ANDA?')}
                  </h2>
                </DraggableElement>

                <DraggableElement
                  elementKey="subtitle"
                  label="Deskripsi CTA"
                  position={getPos('subtitle')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                >
                  <p className={`text-xs max-w-xs leading-relaxed opacity-80 mb-3 ${config.descClass}`}>
                    {currentSlide.description || 'Jangan biarkan bisnis Anda terlihat amatir di mata calon pelanggan berharga.'}
                  </p>
                </DraggableElement>

                <DraggableElement
                  elementKey="highlight"
                  label="Tombol Aksi CTA"
                  position={getPos('highlight')}
                  selectedKey={activeElementKey}
                  isInteractive={isInteractive}
                  onSelect={onSelectElement}
                  onChangePosition={onUpdatePosition}
                  className="grid grid-cols-2 gap-2 w-full max-w-xs mb-2.5"
                >
                  <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center gap-2 justify-center text-[11px] font-bold">
                    <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                    <span>Simpan Post</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center gap-2 justify-center text-[11px] font-bold">
                    <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Bagikan</span>
                  </div>
                </DraggableElement>

                <div className="text-[10px] font-mono font-bold text-amber-500">
                  &lt; {brand.tagline || 'GROWTH YOUR BRANDING'} &gt;
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* ========================================================
          BOTTOM FOOTER BAR
      ======================================================== */}
      <div className="relative z-20 shrink-0 mt-1">
        {theme === 'techhook' ? (
          /* Tech AI Creator Bottom Bar with Handle and Electric Blue Geser Button */
          <DraggableElement
            elementKey="footer"
            label="Footer Geser"
            position={getPos('footer')}
            selectedKey={activeElementKey}
            isInteractive={isInteractive}
            onSelect={onSelectElement}
            onChangePosition={onUpdatePosition}
            className="flex items-center justify-between pt-2 border-t border-slate-100"
          >
            <span className="text-xs font-medium text-slate-500 font-mono">
              {brand.handle || '@classai_id'}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-1.5 cursor-pointer">
                <span>{content.subLink || 'Geser'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs">
                <VolumeX className="w-3.5 h-3.5" />
              </div>
            </div>
          </DraggableElement>
        ) : theme === 'foresttype' ? (
          /* Forest Type: Pure clean minimalism, handled in content area */
          null
        ) : (
          /* Standard Bottom Footer Bar */
          brand.showFooterBar && (
            <DraggableElement
              elementKey="footer"
              label="Footer Bar Bawah"
              position={getPos('footer')}
              selectedKey={activeElementKey}
              isInteractive={isInteractive}
              onSelect={onSelectElement}
              onChangePosition={onUpdatePosition}
            >
              <div 
                className={`-mx-6 -mb-6 sm:-mx-7 sm:-mb-7 py-2.5 px-5 text-center transition-all ${config.footerBgClass}`}
                style={{
                  backgroundColor: brand.customAccentColor && theme === 'brutalism' ? brand.customAccentColor : undefined
                }}
              >
                <div className="flex items-center justify-between gap-3 px-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${config.footerTextClass} truncate`}>
                    {isCarousel && currentSlide?.customFooter 
                      ? currentSlide.customFooter 
                      : (content.footer || '< GROWTH YOUR BRANDING >')}
                  </span>
                  {brand.showSwipeIndicator && isCarousel && slideIndex < totalSlides - 1 && (
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider shrink-0 opacity-80">
                      <span>Swipe</span>
                      <ArrowRight className="w-3 h-3 animate-pulse" />
                    </span>
                  )}
                </div>
              </div>
            </DraggableElement>
          )
        )}
      </div>

    </div>
  );
};
