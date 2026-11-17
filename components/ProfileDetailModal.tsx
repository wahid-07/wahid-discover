'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, GraduationCap, Briefcase, CheckCircle2, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { Profile, SwipeDirection } from '@/lib/types';

interface ProfileDetailModalProps {
  profile: Profile | null;
  onClose: () => void;
  onSwipe?: (direction: SwipeDirection) => void;
  canSwipe?: boolean;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  onClose,
  onSwipe,
  canSwipe = true,
}) => {
  if (!profile) return null;

  const photos = profile.photos && profile.photos.length > 0 ? profile.photos : [profile.photo];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
        {/* Backdrop dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-md max-h-[90vh] bg-slate-950 border border-slate-800 rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col z-10 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Primary Photo Banner */}
            <div className="relative w-full h-80">
              <img
                src={photos[0]}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-5 -mt-6 relative z-10">
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {profile.name}, {profile.age}
                  </h2>
                  <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 mt-1">
                  {profile.college && (
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
                      <span>{profile.college}</span>
                    </div>
                  )}
                  {profile.city && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      <span>{profile.city}</span>
                    </div>
                  )}
                  {profile.distance && (
                    <span className="text-slate-500">• {profile.distance}</span>
                  )}
                </div>

                {profile.occupation && (
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                    <span>{profile.occupation}</span>
                  </div>
                )}
              </div>

              {/* Bio Section */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-2xl">
                  {profile.bio}
                </p>
              </div>

              {/* Prompts Cards */}
              {profile.prompts && profile.prompts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prompts</h4>
                  {profile.prompts.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/90 space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{p.question}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-200 leading-relaxed">
                        {p.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Secondary Photo */}
              {photos.length > 1 && (
                <div className="rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={photos[1]}
                    alt={`${profile.name} secondary`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Interests Tags */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer (If swiping is allowed) */}
          {canSwipe && onSwipe && (
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md flex items-center justify-center gap-6">
              <button
                onClick={() => {
                  onSwipe('pass');
                  onClose();
                }}
                className="w-12 h-12 rounded-full border-2 border-rose-500/50 bg-slate-900 text-rose-500 hover:border-rose-400 flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>

              <button
                onClick={() => {
                  onSwipe('like');
                  onClose();
                }}
                className="w-12 h-12 rounded-full border-2 border-emerald-500/50 bg-slate-900 text-emerald-400 hover:border-emerald-400 flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                <Heart className="w-6 h-6 stroke-[2.5] fill-emerald-400/20" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
