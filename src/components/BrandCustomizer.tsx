import React from 'react';
import { BrandSettings } from '../types';
import { X, Upload, RotateCcw, Palette, Check } from 'lucide-react';

interface BrandCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  brand: BrandSettings;
  onChangeBrand: (brand: BrandSettings) => void;
  onResetBrand: () => void;
}

export const BrandCustomizer: React.FC<BrandCustomizerProps> = ({
  isOpen,
  onClose,
  brand,
  onChangeBrand,
  onResetBrand,
}) => {
  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChangeBrand({
          ...brand,
          customLogoUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const presetColors = [
    '#FFB800', // Signature TERL Yellow
    '#00F0FF', // Cyber Cyan
    '#FF0055', // Neon Pink
    '#10B981', // Emerald
    '#6366F1', // Indigo
    '#EC4899', // Pink
    '#F97316', // Orange
    '#18181B', // Dark Zinc
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            <h3 className="font-extrabold text-base text-white">Brand & Visual Customizer</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Information Form */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Nama Brand / Agency</label>
              <input
                type="text"
                value={brand.brandName}
                onChange={(e) => onChangeBrand({ ...brand, brandName: e.target.value })}
                placeholder="Contoh: TERL"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Tagline Sub-brand</label>
              <input
                type="text"
                value={brand.brandSubtitle}
                onChange={(e) => onChangeBrand({ ...brand, brandSubtitle: e.target.value })}
                placeholder="Contoh: WEB STUDIO"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Instagram Handle</label>
              <input
                type="text"
                value={brand.handle}
                onChange={(e) => onChangeBrand({ ...brand, handle: e.target.value })}
                placeholder="@username"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Website URL</label>
              <input
                type="text"
                value={brand.website}
                onChange={(e) => onChangeBrand({ ...brand, website: e.target.value })}
                placeholder="websiteanda.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-amber-400 mb-1">Brand Tagline Utama</label>
            <input
              type="text"
              value={brand.tagline || ''}
              onChange={(e) => onChangeBrand({ ...brand, tagline: e.target.value })}
              placeholder="GROWTH YOUR BRANDING"
              className="w-full bg-slate-950 border border-amber-400/50 rounded-xl px-3 py-2 text-amber-300 font-bold focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Custom Logo Upload */}
          <div className="border border-slate-800 bg-slate-950 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              {brand.customLogoUrl ? (
                <img 
                  src={brand.customLogoUrl} 
                  alt="Custom Logo" 
                  className="w-10 h-10 object-contain rounded-lg border border-slate-700 bg-black/40"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                  <Upload className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="font-bold text-slate-200 block">Custom Logo PNG</span>
                <span className="text-[10px] text-slate-500">Gunakan logo transparan resolusi tinggi</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border border-slate-700">
                Upload Logo
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleLogoUpload}
                />
              </label>
              {brand.customLogoUrl && (
                <button
                  type="button"
                  onClick={() => onChangeBrand({ ...brand, customLogoUrl: null })}
                  className="text-rose-400 hover:text-rose-300 text-xs px-2 py-1"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>

          {/* Accent Color Palette Override */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-300">
              Warna Aksen Kustom (Opsional)
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 flex-1">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => onChangeBrand({ ...brand, customAccentColor: color })}
                    className="w-7 h-7 rounded-lg border border-black/30 flex items-center justify-center transition-transform active:scale-95"
                    style={{ backgroundColor: color }}
                  >
                    {brand.customAccentColor === color && (
                      <Check className="w-4 h-4 text-black stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
              {brand.customAccentColor && (
                <button
                  type="button"
                  onClick={() => onChangeBrand({ ...brand, customAccentColor: null })}
                  className="text-[11px] text-slate-400 hover:text-white underline shrink-0"
                >
                  Reset Warna Tema
                </button>
              )}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span>Tampilkan Counter Slide (#1/5)</span>
              <input
                type="checkbox"
                checked={brand.showSlideCounter}
                onChange={(e) => onChangeBrand({ ...brand, showSlideCounter: e.target.checked })}
                className="w-4 h-4 rounded accent-amber-400"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span>Tampilkan Indikator "Swipe &gt;"</span>
              <input
                type="checkbox"
                checked={brand.showSwipeIndicator}
                onChange={(e) => onChangeBrand({ ...brand, showSwipeIndicator: e.target.checked })}
                className="w-4 h-4 rounded accent-amber-400"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span>Tampilkan Badge Status Atas</span>
              <input
                type="checkbox"
                checked={brand.showBadge}
                onChange={(e) => onChangeBrand({ ...brand, showBadge: e.target.checked })}
                className="w-4 h-4 rounded accent-amber-400"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span>Tampilkan Footer Bar Bawah</span>
              <input
                type="checkbox"
                checked={brand.showFooterBar}
                onChange={(e) => onChangeBrand({ ...brand, showFooterBar: e.target.checked })}
                className="w-4 h-4 rounded accent-amber-400"
              />
            </label>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onResetBrand}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Default TERL</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-colors"
          >
            Selesai Simpan
          </button>
        </div>

      </div>
    </div>
  );
};
