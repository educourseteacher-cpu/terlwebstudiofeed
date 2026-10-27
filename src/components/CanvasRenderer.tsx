import React from 'react';
import { AspectRatioType, BrandSettings, FeedContent, SlideItem, ThemeType } from '../types';
import { THEME_CONFIGS } from '../utils/themeStyles';
import { 
  Sparkles, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX, 
  Plus, 
  Heart,
  MessageCircle,
  Repeat
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
  containerRef
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

  return (
    <div
      ref={containerRef}
      id="capture-canvas-element"
      className={`${aspectClass} ${config.bgClass} ${config.fontClass} relative flex flex-col justify-between p-7 select-none overflow-hidden transition-all duration-300 ${config.containerBorderClass}`}
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
      <div className="relative z-10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-9 px-1.5 py-0.5 bg-white rounded-xl shadow-xs border border-slate-200/80 flex items-center justify-center shrink-0">
            <img 
              src={brand.customLogoUrl || '/assets/aistudio/LOGO_TERL_WEB_STUDIO_e8069f23.png'} 
              alt="TERL WEB STUDIO" 
              className="h-7 w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[11px] font-black tracking-wider block uppercase leading-none ${theme === 'foresttype' ? 'text-[#FDFBF7]' : 'opacity-90'}`}>
                {brand.brandName || 'TERL'} {brand.brandSubtitle || 'WEB STUDIO'}
              </span>
            </div>
            <span className="text-[8px] text-amber-500 font-extrabold tracking-wider block mt-0.5 font-mono">
              &lt; {brand.tagline || 'GROWTH YOUR BRANDING'} &gt;
            </span>
          </div>
        </div>

        {/* Right Badge / Counter */}
        <div className="flex items-center gap-2">
          {brand.showBadge && (
            <span className={config.badgeClass}>
              {isCarousel ? currentSlide?.badge : (content.headerBadge || 'PRO INSIGHT')}
            </span>
          )}

          {theme === 'techhook' ? (
            <div className="flex items-center gap-1 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded-full border border-slate-300 text-slate-600 font-bold bg-white/70">
                0{slideIndex + 1}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-700 text-white font-bold">
                {isCarousel ? `${slideIndex + 1}/${totalSlides}` : '1/10'}
              </span>
            </div>
          ) : isCarousel && brand.showSlideCounter && totalSlides > 1 ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 opacity-70">
              {slideIndex + 1}/{totalSlides}
            </span>
          ) : null}
        </div>
      </div>

      {/* ========================================================
          MIDDLE CONTENT CONTAINER
      ======================================================== */}
      <div className="relative z-10 flex-1 my-auto flex flex-col justify-center py-2 overflow-hidden">
        
        {/* ========================================================
            SPECIAL THEME 1: TECH AI CREATOR (ClassAI Blueprint)
        ======================================================== */}
        {theme === 'techhook' ? (
          <div className="flex flex-col justify-between h-full py-1">
            {/* Massive Bold Headline with Electric Blue Banner */}
            <div className="space-y-1.5 my-auto">
              <h1 className="text-2xl sm:text-[32px] font-black tracking-tight leading-[1.05] text-slate-950 uppercase font-sans-app">
                {content.mainTitle || '5 PLUGIN YANG BIKIN CLAUDE CODE KAMU'}
              </h1>
              
              {/* The Signature Electric Blue Pill Box */}
              <div>
                <div className="inline-block bg-[#2563EB] text-white px-5 py-2.5 rounded-2xl shadow-[0_8px_25px_rgba(37,99,235,0.4)] text-2xl sm:text-3xl font-black tracking-tight uppercase transform -rotate-0.5">
                  {content.highlightBanner || currentSlide?.highlightBanner || 'BEDA LEVEL'}
                </div>
              </div>

              {/* Subtitle with colored keyword */}
              <p className="text-xs sm:text-sm font-semibold text-slate-700 pt-1 font-sans-app">
                {content.subtitle ? (
                  <span>
                    {content.subtitle.replace('resmi', '')}
                    <span className="text-[#2563EB] font-black">resmi</span>
                    {content.subtitle.includes('resmi') ? content.subtitle.split('resmi')[1] : ''}
                  </span>
                ) : (
                  <span>3 di antaranya <span className="text-[#2563EB] font-black">resmi</span> dari Anthropic.</span>
                )}
              </p>
            </div>

            {/* Visual Centerpiece: Squircle App Badges with + sign OR 3 Cards in Points Mode */}
            {mode === 'single' ? (
              <div className="flex items-center justify-center gap-3.5 my-auto py-2">
                {/* Squircle 1: Coral Claude Starburst */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#D97757] shadow-xl flex items-center justify-center p-4 transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="text-white text-4xl sm:text-5xl font-black">
                    ✱
                  </div>
                </div>

                {/* Plus connector */}
                <div className="text-[#2563EB] text-2xl font-black shrink-0">
                  <Plus className="w-7 h-7 stroke-[4]" />
                </div>

                {/* Squircle 2: Dark Slate AI Badge */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#1E293B] shadow-xl flex items-center justify-center p-4 transform rotate-1 hover:rotate-0 transition-transform">
                  {/* Top-Right Badge: "3 RESMI" */}
                  <div className="absolute -top-2.5 right-1 bg-[#2563EB] text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md shadow-md uppercase">
                    3 RESMI
                  </div>
                  <div className="text-white font-black text-3xl sm:text-4xl tracking-tighter">
                    A\
                  </div>
                </div>
              </div>
            ) : (
              /* In Carousel mode, show current slide details */
              <div className="my-auto space-y-3">
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
            
            {/* Big Chunky Puffy Centerpiece ("MO LEN") */}
            <div className="my-auto flex flex-col items-center justify-center select-none py-2">
              <div className="font-chunky-app text-7xl sm:text-[96px] font-extrabold text-[#FDFBF7] tracking-tighter leading-[0.80] uppercase drop-shadow-md">
                {content.highlightBanner ? (
                  content.highlightBanner.split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))
                ) : (
                  <>
                    <div>MO</div>
                    <div>LEN</div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Meta & Typography Information */}
            <div className="space-y-1 pt-2">
              <p className="font-serif font-bold text-sm text-[#FDFBF7] tracking-tight">
                {content.footer || 'Penggunaan : Personal Use'}
              </p>
              <p className="font-serif italic text-xs text-[#E8DFC9]">
                {content.subLink || 'Download : freefonts.io'}
              </p>
            </div>

          </div>
        ) : (
          /* ========================================================
              STANDARD THEMES RENDERING (Brutalism, Minimal, Cyber, etc.)
          ======================================================== */
          <>
            {/* 1. SINGLE POST or CAROUSEL POINTS TYPE */}
            {(!isCarousel || slideType === 'points') && (
              <div className="flex flex-col justify-between h-full py-1">
                {/* Title Container */}
                <div className="text-center mb-3">
                  {content.subtitle && (
                    <span className="text-[10px] font-black uppercase tracking-[2px] opacity-70 block mb-1">
                      {content.subtitle}
                    </span>
                  )}
                  <h2 className={`text-xl sm:text-2xl ${config.titleClass} leading-tight line-clamp-3`}>
                    {content.mainTitle || 'JUDUL FEED INSTAGRAM'}
                  </h2>
                </div>

                {/* 3 Points Cards Wrapper */}
                <div className="space-y-2.5 my-auto">
                  {content.points && content.points.slice(0, 3).map((pt, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 flex items-start gap-3 transition-all ${config.cardClass}`}
                    >
                      <div 
                        className={`w-7 h-7 shrink-0 text-xs flex items-center justify-center font-black ${config.iconBgClass}`}
                        style={{
                          backgroundColor: brand.customAccentColor ? brand.customAccentColor : undefined,
                          color: brand.customAccentColor ? '#000000' : undefined
                        }}
                      >
                        {pt.number || `0${idx + 1}`}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-black text-xs uppercase tracking-tight truncate">
                            {pt.title}
                          </h3>
                          {pt.tag && (
                            <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 opacity-80 shrink-0">
                              {pt.tag}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] mt-0.5 leading-snug line-clamp-2 ${config.descClass}`}>
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. CAROUSEL COVER SLIDE */}
            {isCarousel && slideType === 'cover' && (
              <div className="flex flex-col justify-center items-center text-center px-2 py-4">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 text-[10px] font-mono font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
                  <span>{currentSlide.badge || 'EXCLUSIVE FRAMEWORK'}</span>
                </div>

                <h1 className={`text-2xl sm:text-3xl ${config.titleClass} leading-snug mb-4`}>
                  {currentSlide.title || content.mainTitle}
                </h1>

                <p className={`text-xs max-w-sm mx-auto leading-relaxed opacity-85 mb-6 ${config.descClass}`}>
                  {currentSlide.description || 'Framework teruji untuk menaikkan reputasi brand dan konversi penjualan Anda.'}
                </p>

                {currentSlide.statNumber && (
                  <div 
                    className={`px-5 py-3 rounded-2xl flex items-center gap-3 border ${config.cardClass}`}
                  >
                    <span className="text-2xl font-black" style={{ color: accentColor }}>
                      {currentSlide.statNumber}
                    </span>
                    <div className="text-left">
                      <span className="text-[9px] uppercase font-bold tracking-wider opacity-60 block">Metric Impact</span>
                      <span className="text-xs font-extrabold">{currentSlide.statLabel || 'Peningkatan Hasil'}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. CAROUSEL INSIGHT SLIDE */}
            {isCarousel && slideType === 'insight' && (
              <div className="flex flex-col justify-center px-3 py-2 space-y-4">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-black"
                    style={{ backgroundColor: accentColor }}
                  >
                    {currentSlide.statNumber || (slideIndex + 1)}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-70">
                    {currentSlide.badge || `LANGKAH KE-${slideIndex + 1}`}
                  </span>
                </div>

                <h2 className={`text-xl sm:text-2xl ${config.titleClass} leading-tight`}>
                  {currentSlide.title}
                </h2>

                <div className={`p-4 rounded-xl ${config.cardClass}`}>
                  <p className={`text-xs sm:text-sm leading-relaxed ${config.descClass}`}>
                    {currentSlide.description}
                  </p>
                </div>
              </div>
            )}

            {/* 4. CAROUSEL COMPARISON SLIDE */}
            {isCarousel && slideType === 'comparison' && (
              <div className="space-y-3 py-2">
                <h2 className={`text-lg sm:text-xl text-center ${config.titleClass} mb-2`}>
                  {currentSlide.title || 'APA YANG HARUS DIUBAH?'}
                </h2>
                
                <div className="p-3 rounded-xl border border-rose-500/50 bg-rose-500/10 flex items-start gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider">HINDARI INI (DON'T)</span>
                    <p className="text-xs text-rose-200/90 leading-tight mt-0.5">
                      Menumpuk terlalu banyak teks dan paragraf panjang tanpa jeda visual.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-emerald-500/50 bg-emerald-500/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">LAKUKAN INI (DO)</span>
                    <p className="text-xs text-emerald-200/90 leading-tight mt-0.5">
                      Gunakan 1 ide per slide dengan kontras tinggi dan headline tegas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. CAROUSEL CTA SLIDE */}
            {isCarousel && slideType === 'cta' && (
              <div className="flex flex-col justify-center items-center text-center px-3 py-2">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  <Bookmark className="w-6 h-6 text-black" />
                </div>

                <h2 className={`text-xl sm:text-2xl ${config.titleClass} leading-tight mb-2`}>
                  {currentSlide.title || 'SIMPAN UNTUK NANTI!'}
                </h2>

                <p className={`text-xs max-w-xs leading-relaxed opacity-80 mb-5 ${config.descClass}`}>
                  {currentSlide.description || 'Jangan biarkan insight ini hilang di feed Anda.'}
                </p>

                <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                  <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center gap-2 justify-center text-[11px] font-bold">
                    <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                    <span>Simpan Post</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center gap-2 justify-center text-[11px] font-bold">
                    <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Bagikan</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* ========================================================
          BOTTOM FOOTER BAR
      ======================================================== */}
      <div className="relative z-10 shrink-0">
        {theme === 'techhook' ? (
          /* Tech AI Creator Bottom Bar with Handle and Electric Blue Geser Button */
          <div className="flex items-center justify-between pt-2">
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
          </div>
        ) : theme === 'foresttype' ? (
          /* Forest Type: Pure clean minimalism, handled in content area */
          null
        ) : (
          /* Standard Bottom Footer Bar */
          brand.showFooterBar && (
            <div 
              className={`-mx-7 -mb-7 py-3 px-4 text-center transition-all ${config.footerBgClass}`}
              style={{
                backgroundColor: brand.customAccentColor && theme === 'brutalism' ? brand.customAccentColor : undefined
              }}
            >
              <div className="flex items-center justify-between px-2">
                <span className={`text-[10px] line-clamp-1 ${config.footerTextClass}`}>
                  {isCarousel && currentSlide?.customFooter 
                    ? currentSlide.customFooter 
                    : (content.footer || 'WE BUILD WEBSITES THAT REPRESENT WHO YOU ARE')}
                </span>
                {brand.showSwipeIndicator && isCarousel && slideIndex < totalSlides - 1 && (
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider shrink-0 opacity-80">
                    <span>Swipe</span>
                    <ArrowRight className="w-3 h-3 animate-pulse" />
                  </span>
                )}
              </div>
            </div>
          )
        )}
      </div>

    </div>
  );
};
