'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, X } from 'lucide-react';
import { Profile } from '@/lib/types';

interface MatchModalProps {
  matchedProfile: Profile | null;
  onClose: () => void;
  onStartChat: (profile: Profile) => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchedProfile,
  onClose,
  onStartChat,
}) => {
  useEffect(() => {
    if (matchedProfile) {
      // Fire festive confetti bursts
      const count = 200;
      const defaults = {
        origin: { y: 0.65 },
        zIndex: 9999,
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#FF3366', '#FF6699', '#FFAA00'],
      });
      fire(0.2, {
        spread: 60,
        colors: ['#10B981', '#3B82F6', '#EC4899'],
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [matchedProfile]);

  if (!matchedProfile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-rose-500/30 rounded-3xl p-6 text-center shadow-2xl shadow-rose-500/20 overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close X Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Headline Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mutual Match</span>
          </div>

          <h2 className="text-3xl font-black italic tracking-wider bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent drop-shadow-md mb-2">
            It’s a Match!
          </h2>

          <p className="text-xs text-slate-300 max-w-xs mx-auto mb-6">
            You and <span className="font-semibold text-white">{matchedProfile.name}</span> have secretly liked each other.
          </p>

          {/* Overlapping Avatars */}
          <div className="relative flex items-center justify-center h-32 mb-6">
            {/* User Avatar (Left) */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: -16, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="relative w-24 h-24 rounded-full border-4 border-slate-900 overflow-hidden shadow-xl shadow-black/60 z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
                alt="You"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Matched Avatar (Right) */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 16, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="relative w-24 h-24 rounded-full border-4 border-rose-500 overflow-hidden shadow-xl shadow-rose-500/30 z-10"
            >
              <img
                src={matchedProfile.photo}
                alt={matchedProfile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Heart between them */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.3, type: 'tween', duration: 0.45, ease: 'easeOut' }}
              className="absolute z-20 w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/50 border-2 border-slate-900"
            >
              <Heart className="w-6 h-6 text-white fill-white animate-bounce-subtle" />
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={() => onStartChat(matchedProfile)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Say Hello to {matchedProfile.name.split(' ')[0]}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold border border-slate-800 transition-colors"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

