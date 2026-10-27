import React from 'react';
import { SlideItem } from '../types';
import { Plus, Trash2, Copy, Layers, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselNavigatorProps {
  slides: SlideItem[];
  activeIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: () => void;
  onRemoveSlide: (index: number) => void;
  onDuplicateSlide: (index: number) => void;
  onChangeSlideType: (index: number, type: SlideItem['slideType']) => void;
}

export const CarouselNavigator: React.FC<CarouselNavigatorProps> = ({
  slides,
  activeIndex,
  onSelectSlide,
  onAddSlide,
  onRemoveSlide,
  onDuplicateSlide,
  onChangeSlideType,
}) => {
  const activeSlide = slides[activeIndex];

  return (
    <div className="space-y-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Slide Carousel Manager ({slides.length} Slide)
          </span>
        </div>
        <button
          type="button"
          onClick={onAddSlide}
          className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Slide</span>
        </button>
      </div>

      {/* Horizontal Slide Thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5">
        {slides.map((s, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={s.id || idx}
              type="button"
              onClick={() => onSelectSlide(idx)}
              className={`shrink-0 w-20 h-24 rounded-lg border text-left p-1.5 flex flex-col justify-between transition-all relative ${
                isSelected
                  ? 'border-amber-400 bg-amber-400/15 ring-2 ring-amber-400/40 text-white'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                  #{idx + 1}
                </span>
                <span className="text-[8px] font-mono uppercase bg-black/40 px-1 py-0.5 rounded text-slate-400">
                  {s.slideType}
                </span>
              </div>

              <p className="text-[10px] font-bold leading-tight line-clamp-2">
                {s.title || `Slide ${idx + 1}`}
              </p>

              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${isSelected ? 'bg-amber-400' : 'bg-slate-700'}`} 
                  style={{ width: `${((idx + 1) / slides.length) * 100}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Slide Type Modifier & Actions for Active Slide */}
      {activeSlide && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Tipe Slide:</span>
            <select
              value={activeSlide.slideType}
              onChange={(e) => onChangeSlideType(activeIndex, e.target.value as SlideItem['slideType'])}
              className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="cover">Cover / Headline Hook</option>
              <option value="insight">Insight / Core Lesson</option>
              <option value="points">3-Points List</option>
              <option value="comparison">Do vs Don't Comparison</option>
              <option value="cta">CTA / Closing Call</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onDuplicateSlide(activeIndex)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs"
              title="Duplikat Slide Ini"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveSlide(activeIndex)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs transition-colors"
                title="Hapus Slide"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
