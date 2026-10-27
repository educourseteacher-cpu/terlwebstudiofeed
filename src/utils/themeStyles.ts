import { ThemeType } from '../types';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  tagline: string;
  fontClass: string;
  primaryColor: string;
  secondaryColor: string;
  bgClass: string;
  cardClass: string;
  badgeClass: string;
  titleClass: string;
  descClass: string;
  footerBgClass: string;
  footerTextClass: string;
  logoBgClass: string;
  logoTextClass: string;
  iconBgClass: string;
  iconTextClass: string;
  containerBorderClass: string;
}

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  brutalism: {
    id: 'brutalism',
    name: 'Neo Brutalism',
    tagline: 'Bold, high-contrast & energetic agency style',
    fontClass: 'font-sans-app',
    primaryColor: '#FFB800',
    secondaryColor: '#000000',
    bgClass: 'bg-white text-slate-950',
    cardClass: 'bg-white border-[3px] border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]',
    badgeClass: 'bg-black text-amber-400 font-mono text-[11px] font-black uppercase px-3 py-1 rounded border-2 border-black',
    titleClass: 'font-extrabold text-black tracking-tight',
    descClass: 'text-slate-700 font-medium',
    footerBgClass: 'bg-[#FFB800] border-t-[3px] border-black',
    footerTextClass: 'text-black font-black uppercase tracking-wider',
    logoBgClass: 'bg-black text-[#FFB800] border-2 border-black font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    logoTextClass: 'text-[#FFB800]',
    iconBgClass: 'bg-[#FFB800] text-black border-2 border-black font-black',
    iconTextClass: 'text-black',
    containerBorderClass: 'border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.9)]'
  },
  arcade: {
    id: 'arcade',
    name: 'Retro Arcade',
    tagline: '8-Bit pixel nostalgia & gaming vibes',
    fontClass: 'font-retro-app',
    primaryColor: '#FFD700',
    secondaryColor: '#0F172A',
    bgClass: 'bg-slate-950 text-amber-400',
    cardClass: 'bg-slate-900 border-2 border-amber-400 rounded-none shadow-[4px_4px_0px_0px_#FFD700]',
    badgeClass: 'bg-amber-400 text-black text-[10px] font-bold px-2.5 py-1 border border-white',
    titleClass: 'font-bold text-amber-300 leading-relaxed',
    descClass: 'text-slate-300 text-[10px] leading-relaxed',
    footerBgClass: 'bg-black border-t-2 border-amber-400',
    footerTextClass: 'text-amber-400 font-bold uppercase tracking-widest text-[11px]',
    logoBgClass: 'bg-amber-400 text-black border-2 border-black shadow-[3px_3px_0px_0px_#fff]',
    logoTextClass: 'text-black',
    iconBgClass: 'bg-amber-400 text-black border border-black font-bold',
    iconTextClass: 'text-black',
    containerBorderClass: 'border-4 border-amber-400 shadow-[0_0_20px_rgba(255,215,0,0.3)]'
  },
  minimalist: {
    id: 'minimalist',
    name: 'Apple Minimal',
    tagline: 'Clean, airy, ultra-refined typography',
    fontClass: 'font-sans-app',
    primaryColor: '#0F172A',
    secondaryColor: '#64748B',
    bgClass: 'bg-stone-50 text-stone-900',
    cardClass: 'bg-white border border-stone-200/90 rounded-2xl shadow-sm hover:shadow-md transition-shadow',
    badgeClass: 'bg-stone-200/80 text-stone-700 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full',
    titleClass: 'font-semibold text-stone-900 tracking-tight',
    descClass: 'text-stone-500 font-normal',
    footerBgClass: 'bg-stone-900 text-white rounded-b-2xl',
    footerTextClass: 'text-stone-100 font-medium tracking-widest uppercase text-[11px]',
    logoBgClass: 'bg-stone-900 text-stone-50 rounded-full px-3.5 py-1',
    logoTextClass: 'text-stone-50',
    iconBgClass: 'bg-stone-900 text-white rounded-full font-semibold',
    iconTextClass: 'text-white',
    containerBorderClass: 'border border-stone-200 rounded-3xl shadow-xl'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    tagline: 'High-tech neon cyan & glowing magenta',
    fontClass: 'font-cyber-app',
    primaryColor: '#00F0FF',
    secondaryColor: '#FF0055',
    bgClass: 'bg-slate-950 text-cyan-300',
    cardClass: 'bg-slate-900/90 border border-cyan-400 rounded-none shadow-[4px_4px_0px_0px_#FF0055] backdrop-blur-sm',
    badgeClass: 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black text-[10px] font-black uppercase px-2.5 py-0.5 tracking-wider',
    titleClass: 'font-black text-white uppercase tracking-wider drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]',
    descClass: 'text-slate-300 text-xs font-normal',
    footerBgClass: 'bg-gradient-to-r from-cyan-500 via-pink-500 to-amber-400 border-t-2 border-white',
    footerTextClass: 'text-black font-black uppercase tracking-widest text-[11px]',
    logoBgClass: 'bg-cyan-400 text-black border-2 border-white shadow-[3px_3px_0px_0px_#FF0055] font-black',
    logoTextClass: 'text-black',
    iconBgClass: 'bg-pink-600 text-white border border-cyan-400 font-bold',
    iconTextClass: 'text-white',
    containerBorderClass: 'border-4 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.4)]'
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial Swiss',
    tagline: 'High-fashion, typographic prestige',
    fontClass: 'font-syne-app',
    primaryColor: '#18181B',
    secondaryColor: '#D97706',
    bgClass: 'bg-[#F9F7F2] text-zinc-900',
    cardClass: 'bg-white border-y border-zinc-900/30 rounded-none p-4 shadow-none',
    badgeClass: 'bg-zinc-900 text-white text-[9px] font-bold tracking-[3px] uppercase px-3 py-1',
    titleClass: 'font-bold text-zinc-950 tracking-tight leading-snug',
    descClass: 'text-zinc-600 font-sans-app text-xs leading-relaxed',
    footerBgClass: 'bg-zinc-950 text-zinc-100 border-t border-zinc-800',
    footerTextClass: 'text-zinc-200 font-semibold tracking-[3px] text-[10px] uppercase',
    logoBgClass: 'bg-zinc-950 text-zinc-100 px-4 py-1.5 font-bold tracking-widest text-sm',
    logoTextClass: 'text-zinc-100',
    iconBgClass: 'bg-amber-600 text-white font-mono font-bold',
    iconTextClass: 'text-white',
    containerBorderClass: 'border-2 border-zinc-900 shadow-2xl'
  },
  darksaas: {
    id: 'darksaas',
    name: 'Dark SaaS',
    tagline: 'Modern midnight dark mode with frosted cards',
    fontClass: 'font-space-app',
    primaryColor: '#6366F1',
    secondaryColor: '#A855F7',
    bgClass: 'bg-slate-950 text-slate-100',
    cardClass: 'bg-slate-900/80 border border-slate-700/60 rounded-xl shadow-lg backdrop-blur-md hover:border-indigo-500/50 transition-colors',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold px-2.5 py-0.5 rounded-full',
    titleClass: 'font-bold text-white tracking-tight',
    descClass: 'text-slate-400 font-normal text-xs',
    footerBgClass: 'bg-slate-900/90 border-t border-slate-800',
    footerTextClass: 'text-indigo-300 font-bold tracking-wider uppercase text-[11px]',
    logoBgClass: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md font-bold',
    logoTextClass: 'text-white',
    iconBgClass: 'bg-indigo-600 text-white rounded-lg font-bold shadow',
    iconTextClass: 'text-white',
    containerBorderClass: 'border border-slate-800 shadow-[0_20px_50px_rgba(79,70,229,0.15)]'
  },
  trivia: {
    id: 'trivia',
    name: 'Quiz & Trivia',
    tagline: 'Interactive, gamified challenge feed',
    fontClass: 'font-space-app',
    primaryColor: '#FBBF24',
    secondaryColor: '#6366F1',
    bgClass: 'bg-indigo-950 text-white',
    cardClass: 'bg-indigo-900/70 border-2 border-indigo-400/80 rounded-2xl shadow-md backdrop-blur-sm',
    badgeClass: 'bg-yellow-400 text-black text-[10px] font-black tracking-wide uppercase px-3 py-1 rounded-full',
    titleClass: 'font-extrabold text-yellow-300 tracking-tight',
    descClass: 'text-indigo-200 text-xs',
    footerBgClass: 'bg-indigo-900 border-t-2 border-indigo-700',
    footerTextClass: 'text-yellow-300 font-black tracking-wider uppercase text-[11px]',
    logoBgClass: 'bg-indigo-600 text-yellow-300 border border-indigo-400 rounded-xl font-bold',
    logoTextClass: 'text-yellow-300',
    iconBgClass: 'bg-yellow-400 text-black rounded-lg font-black',
    iconTextClass: 'text-black',
    containerBorderClass: 'border-4 border-indigo-500 shadow-2xl'
  },
  checklist: {
    id: 'checklist',
    name: 'Step Blueprint',
    tagline: 'Actionable step-by-step checklist & guide',
    fontClass: 'font-sans-app',
    primaryColor: '#10B981',
    secondaryColor: '#064E3B',
    bgClass: 'bg-emerald-950 text-white',
    cardClass: 'bg-emerald-900/70 border-2 border-emerald-500/80 rounded-xl shadow-md backdrop-blur-sm',
    badgeClass: 'bg-emerald-400 text-emerald-950 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase',
    titleClass: 'font-extrabold text-emerald-100 tracking-tight',
    descClass: 'text-emerald-200 text-xs',
    footerBgClass: 'bg-emerald-900 border-t-2 border-emerald-700',
    footerTextClass: 'text-emerald-300 font-bold uppercase tracking-wider text-[11px]',
    logoBgClass: 'bg-emerald-500 text-emerald-950 rounded-xl font-black border border-emerald-300',
    logoTextClass: 'text-emerald-950',
    iconBgClass: 'bg-emerald-400 text-emerald-950 rounded-lg font-black',
    iconTextClass: 'text-emerald-950',
    containerBorderClass: 'border-4 border-emerald-500 shadow-2xl'
  },
  techhook: {
    id: 'techhook',
    name: 'Tech AI Creator',
    tagline: 'Blueprint grid, bold blue highlight & squircle cards',
    fontClass: 'font-sans-app',
    primaryColor: '#2563EB',
    secondaryColor: '#0F172A',
    bgClass: 'bg-[#F8FAFC] text-slate-900',
    cardClass: 'bg-white border border-slate-200/90 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
    badgeClass: 'bg-black text-white text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full',
    titleClass: 'font-black text-slate-950 tracking-tight leading-none',
    descClass: 'text-slate-600 font-medium text-xs leading-relaxed',
    footerBgClass: 'bg-transparent border-t border-slate-100',
    footerTextClass: 'text-slate-400 font-bold uppercase tracking-wider text-[11px]',
    logoBgClass: 'bg-white text-slate-900 border border-slate-200 shadow-sm rounded-lg px-2.5 py-1',
    logoTextClass: 'text-slate-900 font-black',
    iconBgClass: 'bg-blue-600 text-white rounded-xl font-bold shadow-md shadow-blue-500/20',
    iconTextClass: 'text-white',
    containerBorderClass: 'border border-slate-200/80 rounded-3xl shadow-xl'
  },
  foresttype: {
    id: 'foresttype',
    name: 'Forest Chunky Typo',
    tagline: 'Deep textured forest green & chunky display serif',
    fontClass: 'font-serif-app',
    primaryColor: '#134E35',
    secondaryColor: '#FDFBF7',
    bgClass: 'bg-[#124630] text-[#FDFBF7]',
    cardClass: 'bg-[#0E3A28]/80 border border-[#1E6044]/60 rounded-2xl shadow-sm text-[#FDFBF7]',
    badgeClass: 'bg-[#0E3A28] text-[#FDFBF7] font-serif text-[10px] font-semibold tracking-wider uppercase px-3 py-0.5 rounded-full border border-[#21684B]',
    titleClass: 'font-serif font-bold text-[#FDFBF7] tracking-tight leading-tight',
    descClass: 'text-[#E1DDD5] font-serif text-xs leading-relaxed',
    footerBgClass: 'bg-transparent border-t border-[#1C583F]/50',
    footerTextClass: 'text-[#E8DFC9] font-serif italic tracking-wide text-[11px]',
    logoBgClass: 'bg-[#0E3A28] text-[#FDFBF7] rounded-full border border-[#21684B] px-3.5 py-1 font-serif',
    logoTextClass: 'text-[#FDFBF7]',
    iconBgClass: 'bg-[#FDFBF7] text-[#124630] rounded-full font-bold',
    iconTextClass: 'text-[#124630]',
    containerBorderClass: 'border border-[#1E6044]/60 rounded-3xl shadow-2xl'
  }
};

