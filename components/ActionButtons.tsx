'use client';

import React from 'react';
import { X, Heart, Star, RotateCcw, Info } from 'lucide-react';
import { SwipeDirection } from '@/lib/types';

interface ActionButtonsProps {
  onSwipe: (direction: SwipeDirection) => void;
  onRewind: () => void;
  onOpenDetails: () => void;
  canRewind: boolean;
  disabled: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSwipe,
  onRewind,
  onOpenDetails,
  canRewind,
  disabled,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 pt-3 pb-2 z-20">
      {/* Action Buttons Row */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* Rewind Button */}
        <button
          onClick={onRewind}
          disabled={!canRewind || disabled}
          title="Rewind last swipe (Z / Backspace)"
          className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all active:scale-90 ${
            canRewind && !disabled
              ? 'border-amber-500/40 bg-slate-900/80 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 shadow-md shadow-amber-500/10'
              : 'border-slate-800 bg-slate-950/40 text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Pass Button (Swipe Left) */}
        <button
          onClick={() => onSwipe('pass')}
          disabled={disabled}
          title="Pass (Left Arrow / A)"
          className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-rose-500/50 bg-gradient-to-b from-slate-900 to-rose-950/40 text-rose-500 hover:border-rose-400 hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/20 transition-all"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Super Like Button */}
        <button
          onClick={() => onSwipe('like')}
          disabled={disabled}
          title="Super Like / Priority Crush (Up Arrow / W)"
          className="w-11 h-11 rounded-full flex items-center justify-center border border-sky-500/40 bg-slate-900/80 text-sky-400 hover:bg-sky-500/10 hover:border-sky-400 active:scale-90 shadow-md shadow-sky-500/10 transition-all"
        >
          <Star className="w-5 h-5 fill-sky-400/20" />
        </button>

        {/* Like Button (Swipe Right) */}
        <button
          onClick={() => onSwipe('like')}
          disabled={disabled}
          title="Like (Right Arrow / D)"
          className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-emerald-500/50 bg-gradient-to-b from-slate-900 to-emerald-950/40 text-emerald-400 hover:border-emerald-400 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Heart className="w-7 h-7 stroke-[2.5] fill-emerald-400/20" />
        </button>

        {/* Info Button */}
        <button
          onClick={onOpenDetails}
          disabled={disabled}
          title="View profile info (Space / I)"
          className="w-11 h-11 rounded-full flex items-center justify-center border border-purple-500/40 bg-slate-900/80 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 active:scale-90 shadow-md shadow-purple-500/10 transition-all"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard Hint Helper for Reviewer / Desktop User */}
      <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500 font-mono select-none">
        <span>← Pass</span>
        <span>•</span>
        <span>Space: Info</span>
        <span>•</span>
        <span>Like →</span>
      </div>
    </div>
  );
};
