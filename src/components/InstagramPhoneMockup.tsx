import React from 'react';
import { BrandSettings, FeedContent } from '../types';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  CheckCircle,
  Volume2
} from 'lucide-react';

interface InstagramPhoneMockupProps {
  children: React.ReactNode;
  brand: BrandSettings;
  content: FeedContent;
}

export const InstagramPhoneMockup: React.FC<InstagramPhoneMockupProps> = ({
  children,
  brand,
  content
}) => {
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(true);
  const [likeCount, setLikeCount] = React.useState(482);
  const [showFullCaption, setShowFullCaption] = React.useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  return (
    <div className="w-[430px] max-w-full bg-black text-white rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 flex flex-col font-sans-app overflow-hidden">
      {/* Phone Notch & Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 text-[11px] font-semibold text-slate-300">
        <span>09:41</span>
        <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">5G</span>
          <div className="w-4 h-2 border border-slate-300 rounded-sm p-0.5">
            <div className="w-full h-full bg-white rounded-2xs" />
          </div>
        </div>
      </div>

      {/* Instagram App Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-900">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden">
              <img 
                src={brand.customLogoUrl || '/assets/aistudio/LOGO_TERL_WEB_STUDIO_e8069f23.png'} 
                alt="TERL Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold leading-none tracking-tight">
                {brand.handle?.replace('@', '') || 'terl.studio'}
              </span>
              <CheckCircle className="w-3 h-3 text-sky-500 fill-sky-500" />
            </div>
            <span className="text-[10px] text-slate-400 leading-none">Original audio</span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Post Graphic Media Viewport */}
      <div className="relative w-full flex items-center justify-center bg-slate-950 overflow-hidden my-1">
        <div className="scale-[0.80] sm:scale-[0.86] origin-center -my-6 transition-transform">
          {children}
        </div>
      </div>

      {/* Interaction Icons Bar */}
      <div className="flex items-center justify-between px-4 pt-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className="transition-transform active:scale-125"
          >
            <Heart 
              className={`w-6 h-6 transition-colors ${liked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} 
            />
          </button>
          <button className="text-white hover:text-slate-300">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="text-white hover:text-slate-300">
            <Send className="w-5 h-5 -rotate-12" />
          </button>
        </div>
        <button 
          onClick={() => setBookmarked(!bookmarked)}
          className="transition-transform active:scale-125"
        >
          <Bookmark 
            className={`w-6 h-6 ${bookmarked ? 'text-white fill-white' : 'text-white'}`} 
          />
        </button>
      </div>

      {/* Likes & Caption Feed Section */}
      <div className="px-4 py-2 space-y-1 text-xs">
        <p className="font-bold">{likeCount.toLocaleString()} likes</p>
        
        <div className="text-slate-200 leading-relaxed">
          <span className="font-bold mr-1.5">
            {brand.handle?.replace('@', '') || 'terl.studio'}
          </span>
          {showFullCaption ? (
            <span className="whitespace-pre-line text-slate-300">
              {content.caption}
              <div className="mt-2 text-sky-400 flex flex-wrap gap-1 font-mono text-[11px]">
                {content.hashtags?.map((t, idx) => (
                  <span key={idx}>{t}</span>
                ))}
              </div>
            </span>
          ) : (
            <span>
              {content.caption?.slice(0, 95)}...{' '}
              <button 
                onClick={() => setShowFullCaption(true)}
                className="text-slate-400 font-semibold hover:underline"
              >
                more
              </button>
            </span>
          )}
        </div>

        <p className="text-[10px] text-slate-500 pt-1 uppercase">2 hours ago</p>
      </div>

      {/* Bottom Phone Bar */}
      <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto my-2" />
    </div>
  );
};
