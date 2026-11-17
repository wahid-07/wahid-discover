'use client';

import React from 'react';
import { Home, Compass, MessageCircleHeart } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'discover' | 'matches';
  setActiveTab: (tab: 'home' | 'discover' | 'matches') => void;
  matchesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  matchesCount,
}) => {
  return (
    <nav className="w-full flex items-center justify-around py-2.5 px-4 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800/80 sticky bottom-0 z-30">
      {/* Home Tab (Placeholder per spec) */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center gap-1 transition-all py-1 px-4 rounded-xl ${
          activeTab === 'home'
            ? 'text-rose-500 font-semibold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} />
        <span className="text-[11px]">Home</span>
      </button>

      {/* Discover Tab (Core swipe experience) */}
      <button
        onClick={() => setActiveTab('discover')}
        className={`flex flex-col items-center justify-center gap-1 transition-all py-1 px-4 rounded-xl ${
          activeTab === 'discover'
            ? 'text-rose-500 font-semibold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className="relative">
          <Compass className={`w-5 h-5 transition-transform ${activeTab === 'discover' ? 'scale-110 text-rose-500' : ''}`} />
          {activeTab === 'discover' && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </div>
        <span className="text-[11px]">Discover</span>
      </button>

      {/* Matches Tab */}
      <button
        onClick={() => setActiveTab('matches')}
        className={`relative flex flex-col items-center justify-center gap-1 transition-all py-1 px-4 rounded-xl ${
          activeTab === 'matches'
            ? 'text-rose-500 font-semibold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className="relative">
          <MessageCircleHeart className={`w-5 h-5 transition-transform ${activeTab === 'matches' ? 'scale-110' : ''}`} />
          {matchesCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              {matchesCount}
            </span>
          )}
        </div>
        <span className="text-[11px]">Matches</span>
      </button>
    </nav>
  );
};

