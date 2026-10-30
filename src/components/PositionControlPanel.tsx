import React from 'react';
import { ElementKey, ElementPosition, ElementPositions, ThemeType } from '../types';
import { 
  Move, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Trash2, 
  Maximize2, 
  AlignCenter, 
  AlignLeft, 
  AlignRight,
  Hand,
  Layers,
  Sparkles
} from 'lucide-react';

interface PositionControlPanelProps {
  theme: ThemeType;
  mode: 'single' | 'carousel';
  slideType?: string;
  positions: ElementPositions;
  activeKey: ElementKey;
  onSelectKey: (key: ElementKey) => void;
  onUpdatePosition: (key: ElementKey, pos: ElementPosition) => void;
  onResetKey: (key: ElementKey) => void;
  onResetAll: () => void;
  isDragEnabled: boolean;
  onToggleDrag: (enabled: boolean) => void;
}

interface ElementOption {
  key: ElementKey;
  label: string;
  category: 'header' | 'content' | 'footer';
}

export const PositionControlPanel: React.FC<PositionControlPanelProps> = ({
  theme,
  mode,
  slideType = 'points',
  positions,
  activeKey,
  onSelectKey,
  onUpdatePosition,
  onResetKey,
  onResetAll,
  isDragEnabled,
  onToggleDrag,
}) => {
  const currentPos = positions[activeKey] || { x: 0, y: 0, scale: 1 };
  const [step, setStep] = React.useState<number>(5);

  // Available elements based on current theme and slide mode
  const availableElements: ElementOption[] = [
    { key: 'title', label: 'Judul Utama (Headline)', category: 'content' },
    { key: 'subtitle', label: 'Eyebrow / Subtitle', category: 'content' },
    ...(theme === 'techhook' || theme === 'foresttype'
      ? [{ key: 'highlight' as ElementKey, label: theme === 'foresttype' ? 'Centerpiece Molen (MO LEN)' : 'Kotak Banner Biru', category: 'content' as const }]
      : []),
    ...(mode === 'single' || slideType === 'points'
      ? [
          { key: 'points' as ElementKey, label: 'Semua Pilar Insight (Grup)', category: 'content' as const },
          { key: 'point_0' as ElementKey, label: 'Poin #01 Card', category: 'content' as const },
          { key: 'point_1' as ElementKey, label: 'Poin #02 Card', category: 'content' as const },
          { key: 'point_2' as ElementKey, label: 'Poin #03 Card', category: 'content' as const },
          { key: 'point_3' as ElementKey, label: 'Poin #04 Card', category: 'content' as const },
          { key: 'formula' as ElementKey, label: 'Formula / Blueprint Eksekusi', category: 'content' as const },
        ]
      : []),
    ...(slideType === 'checklist'
      ? [{ key: 'checklist' as ElementKey, label: 'Daftar Checklist Poin', category: 'content' as const }]
      : []),
    ...(slideType === 'comparison'
      ? [{ key: 'comparison' as ElementKey, label: 'Kotak DO vs DONT', category: 'content' as const }]
      : []),
    ...(theme === 'techhook' && mode === 'single'
      ? [{ key: 'visual' as ElementKey, label: 'Visual Squircles (Icon +)', category: 'content' as const }]
      : []),
    ...(slideType === 'cover'
      ? [{ key: 'stat' as ElementKey, label: 'Stat Highlight Card', category: 'content' as const }]
      : []),
    { key: 'header', label: 'Header Brand & Logo TERL', category: 'header' },
    { key: 'badge', label: 'Badge Kategori / Counter', category: 'header' },
    { key: 'footer', label: 'Footer Tagline Bar Bawah', category: 'footer' },
  ];

  const handleNudge = (dx: number, dy: number) => {
    onUpdatePosition(activeKey, {
      x: (currentPos.x || 0) + dx,
      y: (currentPos.y || 0) + dy,
      scale: currentPos.scale || 1,
    });
  };

  const handleSliderX = (newX: number) => {
    onUpdatePosition(activeKey, {
      ...currentPos,
      x: newX,
    });
  };

  const handleSliderY = (newY: number) => {
    onUpdatePosition(activeKey, {
      ...currentPos,
      y: newY,
    });
  };

  const handleScale = (newScale: number) => {
    onUpdatePosition(activeKey, {
      ...currentPos,
      scale: parseFloat(newScale.toFixed(2)),
    });
  };

  const hasAnyCustomOffset = Object.values(positions).some(
    (p) => p && (p.x !== 0 || p.y !== 0 || (p.scale && p.scale !== 1))
  );

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4">
      {/* Top Title & Interactive Canvas Drag Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-white">
            Atur Posisi & Tata Letak Elemen
          </h3>
        </div>

        <button
          type="button"
          onClick={() => onToggleDrag(!isDragEnabled)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
            isDragEnabled
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Klik elemen di canvas untuk langsung geser dengan mouse"
        >
          <Hand className="w-3 h-3" />
          <span>{isDragEnabled ? 'Mode Drag Aktif' : 'Aktifkan Drag Canvas'}</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-400 leading-tight">
        Pilih teks/elemen di bawah atau <strong>klik & geser langsung di canvas</strong> untuk merapikan jarak agar tidak tumpang tindih.
      </p>

      {/* Element Selector Dropdown */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-between">
          <span>Pilih Elemen yang Ingin Digeser</span>
          <span className="text-amber-400 font-mono">
            X: {currentPos.x >= 0 ? `+${currentPos.x}` : currentPos.x}px | Y:{' '}
            {currentPos.y >= 0 ? `+${currentPos.y}` : currentPos.y}px
          </span>
        </label>
        <select
          value={activeKey}
          onChange={(e) => onSelectKey(e.target.value as ElementKey)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {availableElements.map((el) => (
            <option key={el.key} value={el.key}>
              {el.label}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Pills for Most Frequent Elements */}
      <div className="flex flex-wrap gap-1">
        {availableElements.slice(0, 5).map((el) => (
          <button
            key={el.key}
            type="button"
            onClick={() => onSelectKey(el.key)}
            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${
              activeKey === el.key
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {el.label.split(' ')[0]} {el.label.split(' ')[1] || ''}
          </button>
        ))}
      </div>

      {/* D-PAD Precision Nudge Controls */}
      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-4">
        {/* Step selector */}
        <div className="flex flex-col gap-1 text-[10px]">
          <span className="font-bold text-slate-400 uppercase">Jarak Langkah:</span>
          <div className="flex gap-1">
            {[1, 5, 15].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(s)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  step === s
                    ? 'bg-amber-400 text-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s}px
              </button>
            ))}
          </div>
          <span className="text-[9px] text-slate-500 font-mono mt-1">
            Gunakan tombol panah keyboard saat elemen terpilih!
          </span>
        </div>

        {/* Nudge Arrow Buttons */}
        <div className="grid grid-cols-3 gap-1.5 w-28 shrink-0">
          <div />
          <button
            type="button"
            onClick={() => handleNudge(0, -step)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors active:scale-95"
            title="Geser ke Atas"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <div />

          <button
            type="button"
            onClick={() => handleNudge(-step, 0)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors active:scale-95"
            title="Geser ke Kiri"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onResetKey(activeKey)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition-colors text-[9px] font-mono font-bold active:scale-95"
            title="Reset Posisi Elemen Ini ke 0"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={() => handleNudge(step, 0)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors active:scale-95"
            title="Geser ke Kanan"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div />
          <button
            type="button"
            onClick={() => handleNudge(0, step)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors active:scale-95"
            title="Geser ke Bawah"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <div />
        </div>
      </div>

      {/* Horizontal & Vertical Sliders */}
      <div className="space-y-3 pt-1">
        {/* Horizontal (X) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-slate-400">Posisi Horizontal (X-Axis)</span>
            <span className="font-mono text-amber-400">{currentPos.x || 0} px</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={-150}
              max={150}
              value={currentPos.x || 0}
              onChange={(e) => handleSliderX(parseInt(e.target.value, 10))}
              className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <button
              type="button"
              onClick={() => handleSliderX(0)}
              className="text-[9px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
            >
              0
            </button>
          </div>
        </div>

        {/* Vertical (Y) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-slate-400">Posisi Vertikal (Y-Axis)</span>
            <span className="font-mono text-amber-400">{currentPos.y || 0} px</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={-150}
              max={150}
              value={currentPos.y || 0}
              onChange={(e) => handleSliderY(parseInt(e.target.value, 10))}
              className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <button
              type="button"
              onClick={() => handleSliderY(0)}
              className="text-[9px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
            >
              0
            </button>
          </div>
        </div>

        {/* Scale Multiplier */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-slate-400">Ukuran / Skala Teks</span>
            <span className="font-mono text-cyan-400">
              {Math.round((currentPos.scale || 1) * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0.7}
              max={1.4}
              step={0.05}
              value={currentPos.scale || 1}
              onChange={(e) => handleScale(parseFloat(e.target.value))}
              className="flex-1 accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <button
              type="button"
              onClick={() => handleScale(1)}
              className="text-[9px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
            >
              100%
            </button>
          </div>
        </div>
      </div>

      {/* Quick Alignment Presets */}
      <div className="space-y-1 pt-1 border-t border-slate-800">
        <label className="text-[10px] font-bold uppercase text-slate-400">
          Preset Perataan Cepat
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleSliderX(-30)}
            className="flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-800 transition-colors"
          >
            <AlignLeft className="w-3 h-3" />
            <span>Kiri</span>
          </button>
          <button
            type="button"
            onClick={() => handleSliderX(0)}
            className="flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-800 transition-colors"
          >
            <AlignCenter className="w-3 h-3" />
            <span>Tengah (0)</span>
          </button>
          <button
            type="button"
            onClick={() => handleSliderX(30)}
            className="flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-800 transition-colors"
          >
            <AlignRight className="w-3 h-3" />
            <span>Kanan</span>
          </button>
        </div>
      </div>

      {/* Reset Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px]">
        <button
          type="button"
          onClick={() => onResetKey(activeKey)}
          className="text-slate-400 hover:text-amber-400 flex items-center gap-1 font-bold"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Elemen Terpilih</span>
        </button>

        {hasAnyCustomOffset && (
          <button
            type="button"
            onClick={onResetAll}
            className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-bold"
          >
            <Trash2 className="w-3 h-3" />
            <span>Reset Semua ke Default</span>
          </button>
        )}
      </div>
    </div>
  );
};
