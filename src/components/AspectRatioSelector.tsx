import React from 'react';
import { AspectRatioType } from '../types';
import { Smartphone, Square, RectangleVertical } from 'lucide-react';

interface AspectRatioSelectorProps {
  aspectRatio: AspectRatioType;
  onChange: (aspect: AspectRatioType) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
  aspectRatio,
  onChange,
}) => {
  const options: { id: AspectRatioType; label: string; ratio: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'portrait',
      label: 'Feed Portrait',
      ratio: '4:5 (1080x1350)',
      icon: <RectangleVertical className="w-3.5 h-3.5" />,
      desc: 'Rekomendasi Utama'
    },
    {
      id: 'square',
      label: 'Classic Square',
      ratio: '1:1 (1080x1080)',
      icon: <Square className="w-3.5 h-3.5" />,
      desc: 'Grid Standar'
    },
    {
      id: 'story',
      label: 'Story / Reel Cover',
      ratio: '9:16 (1080x1920)',
      icon: <Smartphone className="w-3.5 h-3.5" />,
      desc: 'Vertikal Penuh'
    }
  ];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Format Rasio Ukuran
        </label>
        <span className="text-[10px] text-slate-500 font-mono">
          {options.find(o => o.id === aspectRatio)?.ratio}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSelected = aspectRatio === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                isSelected
                  ? 'border-amber-400 bg-amber-400 text-black font-extrabold shadow-md'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900 hover:text-white font-medium'
              }`}
            >
              <div className="flex items-center gap-1 text-xs">
                {opt.icon}
                <span>{opt.label}</span>
              </div>
              <span className={`text-[9px] ${isSelected ? 'text-black/80 font-bold' : 'text-slate-500'}`}>
                {opt.ratio.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
