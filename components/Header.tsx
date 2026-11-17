'use client';

import React from 'react';
import { Flame, RotateCcw, Heart, Sparkles, MessageCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'discover' | 'matches';
  setActiveTab: (tab: 'home' | 'discover' | 'matches') => void;
  matchesCount: number;
  onReset: () => void;
  isResetting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  matchesCount,
  onReset,
  isResetting,
}) => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('discover')} 
        className="flex items-center gap-2 cursor-pointer select-none group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-[2px] shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Flame className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse-slow" />
          </div>
        </div>
        <div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent">
            coy
          </span>
          <span className="ml-1 text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Discover
          </span>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        {/* Reset / Reseed Demo Feed Button */}
        <button
          onClick={onReset}
          disabled={isResetting}
          title="Reset Demo (Reseeds 32 profiles and clears swipes)"
          className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 active:scale-95 transition-all text-xs flex items-center gap-1.5 border border-slate-800/60"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin text-rose-400' : ''}`} />
          <span className="hidden sm:inline text-xs font-medium">Reset Demo</span>
        </button>

        {/* Matches Quick Pill */}
        <button
          onClick={() => setActiveTab('matches')}
          className={`relative px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeTab === 'matches'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${matchesCount > 0 ? 'fill-rose-400 text-rose-400' : ''}`} />
          <span>Matches</span>
          {matchesCount > 0 && (
            <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-extrabold rounded-full bg-white text-rose-600">
              {matchesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

