'use client';

import React from 'react';
import { Home, ArrowRight } from 'lucide-react';

interface HomeTabProps {
  onGoToDiscover: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onGoToDiscover }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeIn max-w-sm mx-auto select-none">
      <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500 shadow-inner">
        <Home className="w-6 h-6" />
      </div>

      <h2 className="text-base font-semibold text-slate-200 mb-1">
        Home
      </h2>

      <p className="text-xs text-slate-500 mb-6">
        Placeholder tab as specified in the assignment.
      </p>

      <button
        onClick={onGoToDiscover}
        className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 flex items-center gap-2 transition-all active:scale-95 shadow-sm"
      >
        <span>Go to Discover</span>
        <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
      </button>
    </div>
  );
};
