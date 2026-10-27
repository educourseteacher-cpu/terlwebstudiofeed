import React, { useState } from 'react';
import { FeedContent } from '../types';
import { Copy, Check, Hash, MessageSquare, Sparkles, Plus } from 'lucide-react';

interface CaptionStudioProps {
  content: FeedContent;
  onChangeContent: (content: FeedContent) => void;
  onShowToast: (title: string, msg: string, type?: 'success' | 'warning' | 'error') => void;
}

export const CaptionStudio: React.FC<CaptionStudioProps> = ({
  content,
  onChangeContent,
  onShowToast,
}) => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const handleCopyCaption = async () => {
    const fullText = `${content.caption}\n\n${content.hashtags?.join(' ')}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedCaption(true);
      onShowToast('Caption Disalin!', 'Caption dan kumpulan hashtag berhasil disalin ke clipboard.');
      setTimeout(() => setCopiedCaption(false), 2500);
    } catch {
      onShowToast('Gagal Menyalin', 'Izin clipboard ditolak oleh browser.', 'error');
    }
  };

  const handleCopyHashtagsOnly = async () => {
    const tagsText = content.hashtags?.join(' ') || '';
    try {
      await navigator.clipboard.writeText(tagsText);
      setCopiedHashtags(true);
      onShowToast('Hashtags Disalin!', `${content.hashtags?.length || 0} hashtag berhasil disalin.`);
      setTimeout(() => setCopiedHashtags(false), 2500);
    } catch {
      onShowToast('Gagal Menyalin', 'Izin clipboard ditolak oleh browser.', 'error');
    }
  };

  const handleAddHashtag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const formatted = newTagInput.startsWith('#') ? newTagInput.trim() : `#${newTagInput.trim()}`;
    if (!content.hashtags?.includes(formatted)) {
      onChangeContent({
        ...content,
        hashtags: [...(content.hashtags || []), formatted]
      });
    }
    setNewTagInput('');
  };

  const handleRemoveHashtag = (tagToRemove: string) => {
    onChangeContent({
      ...content,
      hashtags: content.hashtags?.filter(t => t !== tagToRemove) || []
    });
  };

  return (
    <div className="space-y-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-amber-400" />
          <h3 className="font-extrabold text-sm text-white">AI Caption & Hashtag Studio</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 font-mono">
            {content.caption?.length || 0} Karakter
          </span>
          <button
            type="button"
            onClick={handleCopyCaption}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold px-3 py-1.5 rounded-lg text-xs transition-colors shadow"
          >
            {copiedCaption ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCaption ? 'Tersalin!' : 'Copy Caption + Tags'}</span>
          </button>
        </div>
      </div>

      {/* Caption Textarea */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1.5">
          Teks Caption Instagram
        </label>
        <textarea
          rows={6}
          value={content.caption}
          onChange={(e) => onChangeContent({ ...content, caption: e.target.value })}
          placeholder="Tulis atau generate caption yang memikat audiens..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 leading-relaxed font-sans-app focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y"
        />
      </div>

      {/* Hashtag Manager */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Hashtags ({content.hashtags?.length || 0})</span>
          </label>
          <button
            type="button"
            onClick={handleCopyHashtagsOnly}
            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
          >
            {copiedHashtags ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>Copy Hashtags Only</span>
          </button>
        </div>

        {/* Hashtags Cloud */}
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
          {content.hashtags?.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg border border-slate-700/60 font-mono transition-colors group"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveHashtag(tag)}
                className="opacity-40 group-hover:opacity-100 hover:text-rose-400 text-xs ml-0.5"
                title="Hapus hashtag"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Add custom hashtag */}
        <form onSubmit={handleAddHashtag} className="flex gap-2">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            placeholder="Tambah hashtag baru (contoh: #brandingpro)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
          />
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border border-slate-700"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </form>
      </div>

    </div>
  );
};
