import React from 'react';
import { ThemeType } from '../types';
import { THEME_CONFIGS } from '../utils/themeStyles';
import { Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onSelectTheme: (theme: ThemeType) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const themes = Object.values(THEME_CONFIGS);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Visual Theme Style
        </label>
        <span className="text-[10px] text-amber-400 font-mono">
          {THEME_CONFIGS[currentTheme].name}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {themes.map((t) => {
          const isSelected = currentTheme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTheme(t.id)}
              className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-[68px] ${
                isSelected
                  ? 'border-amber-400 bg-amber-400/10 shadow-md ring-1 ring-amber-400/50'
                  : 'border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                {/* Theme Color Dots */}
                <div className="flex items-center gap-1.5">
                  <span 
                    className="w-3 h-3 rounded-full border border-black/30 shadow-xs" 
                    style={{ backgroundColor: t.primaryColor }}
                  />
                  <span 
                    className="w-2.5 h-2.5 rounded-full border border-black/30 opacity-70" 
                    style={{ backgroundColor: t.secondaryColor }}
                  />
                </div>

                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              <div>
                <span className={`text-xs font-bold block leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {t.name}
                </span>
                <span className="text-[9px] text-slate-500 line-clamp-1">
                  {t.tagline}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
