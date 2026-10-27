import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Loader2, Wand2 } from 'lucide-react';

interface HookGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic: string;
  onSelectHook: (hookText: string) => void;
}

export const HookGeneratorModal: React.FC<HookGeneratorModalProps> = ({
  isOpen,
  onClose,
  currentTopic,
  onSelectHook,
}) => {
  const [topic, setTopic] = useState(currentTopic);
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<{ type: string; text: string }[]>([]);

  if (!isOpen) return null;

  const handleGenerateHooks = async () => {
    const query = topic.trim() || currentTopic.trim() || 'Website Agensi';
    setLoading(true);
    try {
      const res = await fetch('/api/enhance-hook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: query }),
      });
      const data = await res.json();
      if (data.hooks) {
        setHooks(data.hooks);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-extrabold text-base text-white">AI Viral Hook Generator</h3>
              <p className="text-xs text-slate-400">Tingkatkan CTR feed Anda dengan variasi headline teruji algoritma.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ketik topik untuk dioptimasi hook-nya..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="button"
            disabled={loading}
            onClick={handleGenerateHooks}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            <span>Generate Hooks</span>
          </button>
        </div>

        {/* Hooks Results */}
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {hooks.length === 0 && !loading && (
            <div className="text-center py-8 text-slate-500 text-xs">
              Klik "Generate Hooks" untuk meracik variasi judul viral berdaya pikat tinggi.
            </div>
          )}

          {hooks.map((h, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl flex items-center justify-between gap-3 transition-colors group"
            >
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                  {h.type}
                </span>
                <p className="text-xs font-bold text-slate-100 mt-1.5 leading-snug">
                  {h.text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectHook(h.text);
                  onClose();
                }}
                className="shrink-0 bg-slate-800 hover:bg-amber-400 hover:text-black text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
              >
                <span>Pakai</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
