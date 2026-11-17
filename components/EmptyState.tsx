'use client';

import React from 'react';
import { Sparkles, RotateCcw, Heart, Users, CheckCircle2 } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  onGoToMatches: () => void;
  matchesCount: number;
  isResetting: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onReset,
  onGoToMatches,
  matchesCount,
  isResetting,
}) => {
  return (
    <div className="flex-1 w-full max-w-sm mx-auto flex flex-col items-center justify-center p-6 text-center animate-fadeIn space-y-6">
      {/* Animated Radar Radar Illustration */}
      <div className="relative flex items-center justify-center w-24 h-24">
        <span className="absolute w-24 h-24 rounded-full bg-rose-500/20 animate-ping" />
        <span className="absolute w-18 h-18 rounded-full bg-rose-500/30 animate-pulse" />
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
          You’re All Caught Up!
        </h3>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
          You have reviewed all available profiles in your discovery feed. There are no new profiles left to swipe right now.
        </p>
      </div>

      {/* Stats Summary Card */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 grid grid-cols-2 gap-3 text-left">
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Feed Swiped</span>
          </div>
          <span className="text-lg font-bold text-white">32 / 32</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Matches Made</span>
          </div>
          <span className="text-lg font-bold text-rose-400">{matchesCount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5">
        <button
          onClick={onReset}
          disabled={isResetting}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <RotateCcw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
          <span>Reset Demo (Reseed 32 Profiles)</span>
        </button>

        {matchesCount > 0 && (
          <button
            onClick={onGoToMatches}
            className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold border border-slate-800 flex items-center justify-center gap-2 transition-colors text-xs"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>View Your {matchesCount} Mutual Matches</span>
          </button>
        )}
      </div>
    </div>
  );
};
