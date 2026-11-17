'use client';

import React from 'react';
import { Lock, Sparkles, ShieldCheck, HeartHandshake, ArrowRight, UserPlus } from 'lucide-react';

interface HomeTabProps {
  onGoToDiscover: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onGoToDiscover }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeIn max-w-sm mx-auto">
      {/* Visual Badge */}
      <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 shadow-inner">
        <Lock className="w-8 h-8 text-rose-500/80" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Placeholder Home Tab</span>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
        Coy Original Experience
      </h2>

      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        Per the assignment instructions, this Home tab is kept blank as a placeholder for Coy’s original contact-based crush slots.
      </p>

      {/* Mock Crush Slots Card */}
      <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-6 text-left space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span>Private Crush Slots</span>
          <span className="text-rose-400">0 of 3 Used</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((slot) => (
            <div
              key={slot}
              className="h-20 rounded-xl border border-dashed border-slate-700/80 bg-slate-950/40 flex flex-col items-center justify-center gap-1 text-slate-500 hover:border-rose-500/50 transition-colors"
            >
              <UserPlus className="w-5 h-5 text-slate-500" />
              <span className="text-[10px]">Slot {slot}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Double-blind encrypted: Nobody ever knows unless it is mutual.</span>
        </div>
      </div>

      {/* Primary Action to Discover */}
      <button
        onClick={onGoToDiscover}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <span>Open Discover Tab</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

