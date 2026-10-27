import React from 'react';
import { X, Sparkles, Check, ArrowRight, Lightbulb } from 'lucide-react';
import { PRESET_TEMPLATES, PresetTemplate } from '../utils/presets';
import { THEME_CONFIGS } from '../utils/themeStyles';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetTemplate) => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-base text-white">Preset Template Agensi & Bisnis</h3>
              <p className="text-xs text-slate-400">Pilih template viral teruji untuk langsung digunakan atau dimodifikasi.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {PRESET_TEMPLATES.map((preset) => {
            const themeConfig = THEME_CONFIGS[preset.theme];
            return (
              <div
                key={preset.id}
                className="bg-slate-950 border border-slate-800 hover:border-amber-400/60 p-4 rounded-xl flex flex-col justify-between gap-3 transition-all hover:bg-slate-900/60 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {preset.category}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400">
                      Tema: {themeConfig?.name || preset.theme}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-white leading-tight">
                    {preset.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {preset.content.mainTitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-mono">
                    3 Poin • Caption Siap Pakai
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPreset(preset);
                      onClose();
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>Terapkan Preset</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
