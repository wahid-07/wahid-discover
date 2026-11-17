'use client';

import React, { useState } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Info, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Profile } from '@/lib/types';

interface ProfileCardProps {
  profile: Profile;
  onOpenDetails: (profile: Profile) => void;
  likeOpacity?: MotionValue<number>;
  nopeOpacity?: MotionValue<number>;
  isTopCard?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onOpenDetails,
  likeOpacity,
  nopeOpacity,
  isTopCard = true,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const photos = profile.photos && profile.photos.length > 0 ? profile.photos : [profile.photo];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl select-none flex flex-col justify-between">
      {/* Photo Carousel & Navigation tap areas */}
      <div className="absolute inset-0 z-0">
        <img
          src={photos[activePhotoIdx]}
          alt={profile.name}
          className="w-full h-full object-cover pointer-events-none"
          loading="eager"
        />

        {/* Multi-photo Segment Bars */}
        {photos.length > 1 && (
          <div className="absolute top-3 left-3 right-3 flex gap-1.5 z-20">
            {photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  idx === activePhotoIdx ? 'bg-white shadow' : 'bg-black/35'
                }`}
              />
            ))}
          </div>
        )}

        {/* Tap areas for photo switching (only on top card) */}
        {isTopCard && photos.length > 1 && (
          <>
            <div
              onClick={handlePrevPhoto}
              className="absolute left-0 top-0 bottom-24 w-1/3 z-10 cursor-pointer"
              title="Previous photo"
            />
            <div
              onClick={handleNextPhoto}
              className="absolute right-0 top-0 bottom-24 w-1/3 z-10 cursor-pointer"
              title="Next photo"
            />
          </>
        )}

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* Swipe Feedback Stamp Badges (Driven by Framer Motion Values) */}
      {isTopCard && likeOpacity && (
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-10 left-8 z-30 pointer-events-none rotate-[-15deg] border-4 border-emerald-400 bg-emerald-950/70 backdrop-blur-sm px-4 py-1.5 rounded-xl shadow-lg shadow-emerald-500/30"
        >
          <span className="text-3xl font-black tracking-widest text-emerald-400 uppercase">
            LIKE
          </span>
        </motion.div>
      )}

      {isTopCard && nopeOpacity && (
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-10 right-8 z-30 pointer-events-none rotate-[15deg] border-4 border-rose-500 bg-rose-950/70 backdrop-blur-sm px-4 py-1.5 rounded-xl shadow-lg shadow-rose-500/30"
        >
          <span className="text-3xl font-black tracking-widest text-rose-500 uppercase">
            NOPE
          </span>
        </motion.div>
      )}

      {/* Top Bar on Card: Distance Tag */}
      <div className="relative z-10 p-4 flex items-center justify-between text-xs text-white/90">
        <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 font-medium">
          {profile.distance || 'Near you'}
        </span>
      </div>

      {/* Bottom Profile Info Details */}
      <div className="relative z-10 p-5 space-y-2 text-white">
        {/* Name, Age & Verified Checkmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight drop-shadow-md">
              {profile.name}, {profile.age}
            </h3>
            <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400/20 drop-shadow" />
          </div>

          {/* Info Details Trigger Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(profile);
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            title="View profile details"
          >
            <Info className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Education & Location */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/90">
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
        </div>

        {/* Occupation */}
        {profile.occupation && (
          <div className="flex items-center gap-1 text-xs text-white/80">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>{profile.occupation}</span>
          </div>
        )}

        {/* Bio Snippet */}
        <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed pt-0.5">
          {profile.bio}
        </p>

        {/* Interests Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.interests.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-md border border-white/10 text-white/95"
            >
              #{tag}
            </span>
          ))}
          {profile.interests.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/30 backdrop-blur-md text-white/70">
              +{profile.interests.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
