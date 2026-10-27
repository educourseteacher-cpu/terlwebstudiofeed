import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Palette, 
  HelpCircle, 
  Smartphone, 
  Eye, 
  FileDown, 
  Lightbulb, 
  Check, 
  Cpu 
} from 'lucide-react';

interface HeaderProps {
  mode: 'single' | 'carousel';
  setMode: (m: 'single' | 'carousel') => void;
  previewMode: 'canvas' | 'phone';
  setPreviewMode: (p: 'canvas' | 'phone') => void;
  onOpenPresets: () => void;
  onOpenHooks: () => void;
  onOpenBrand: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  previewMode,
  setPreviewMode,
  onOpenPresets,
  onOpenHooks,
  onOpenBrand
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="bg-black text-amber-400 font-black px-3.5 py-2 rounded-xl tracking-wider text-xl flex items-center gap-1.5 shadow-md border border-amber-400/40">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <span>TERL</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg leading-none tracking-tight text-white font-syne-app">
                STUDIO PRO
              </span>
              <span className="text-[10px] bg-amber-400 text-black font-extrabold px-1.5 py-0.5 rounded uppercase">
                AI Feed Engine
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
              Gemini 3.8 Flash • Instagram 1080x1350 High-Res
            </span>
          </div>
        </div>

        {/* Center Mode Switcher: Single Post vs Carousel */}
        <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode('single')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'single'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Single Post (1 Feed)</span>
          </button>
          <button
            onClick={() => setMode('carousel')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'carousel'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Slide Carousel</span>
          </button>
        </div>

        {/* Right Tools & Preview Toggle */}
        <div className="flex items-center gap-2">
          {/* Presets Button */}
          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            title="Pilih Template Desain Teruji"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          {/* Viral Hooks Button */}
          <button
            onClick={onOpenHooks}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            title="AI Viral Hook Generator"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Viral Hooks</span>
          </button>

          {/* Brand Customizer Button */}
          <button
            onClick={onOpenBrand}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            title="Kustomisasi Brand & Logo"
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Brand</span>
          </button>

          {/* Preview Mode Switcher (Canvas vs Phone) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setPreviewMode('canvas')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                previewMode === 'canvas'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Graphic Canvas Mode"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('phone')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                previewMode === 'phone'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Instagram App Phone Mockup"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
