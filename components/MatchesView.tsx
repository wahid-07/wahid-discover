'use client';

import React, { useState } from 'react';
import { MatchWithProfile } from '@/lib/db';
import { Profile } from '@/lib/types';
import { Heart, MessageCircle, MapPin, GraduationCap, Search, ShieldCheck } from 'lucide-react';

interface MatchesViewProps {
  matches: MatchWithProfile[];
  onOpenDetails: (profile: Profile) => void;
  onStartChat: (profile: Profile) => void;
  onGoToDiscover: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  onOpenDetails,
  onStartChat,
  onGoToDiscover,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatches = matches.filter((m) =>
    m.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.profile.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.profile.college?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col h-full overflow-hidden animate-fadeIn select-none">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Matches</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold">
              {matches.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            People who secretly crushed on you back!
          </p>
        </div>

        {/* Privacy Pill */}
        <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Mutual Only</span>
        </div>
      </div>

      {/* Search Input (if multiple matches) */}
      {matches.length > 2 && (
        <div className="relative mb-3 shrink-0">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your matches..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/60"
          />
        </div>
      )}

      {/* Matches List or Empty State */}
      {matches.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
            <Heart className="w-8 h-8 text-slate-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-1">No Matches Yet</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              In Wahid, matches only happen when someone you like also likes you back. Keep swiping on the Discover tab to find your match!
            </p>
          </div>

          <button
            onClick={onGoToDiscover}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-all"
          >
            Start Discovering
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-2">
          {filteredMatches.map(({ matchId, profile, matchedAt }) => {
            const timeAgo = formatTimeAgo(matchedAt);
            return (
              <div
                key={matchId}
                className="group w-full bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-rose-500/40 rounded-2xl p-2.5 flex items-stretch gap-3 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-rose-500/5"
                onClick={() => onOpenDetails(profile)}
              >
                {/* Left: Profile Image (40–45% of card width) */}
                <div className="relative w-[42%] max-w-[150px] min-w-[105px] aspect-[4/5] sm:aspect-square shrink-0 rounded-xl overflow-hidden border border-rose-500/40 bg-slate-950">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-medium text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Match</span>
                  </span>
                </div>

                {/* Right: Profile Information (55–60% of card width) */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 pr-0.5">
                  {/* Top Details & Chat Action */}
                  <div>
                    <div className="flex items-start justify-between gap-1.5 mb-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-rose-400 transition-colors truncate">
                          {profile.name}, {profile.age}
                        </h3>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Matched {timeAgo}
                        </span>
                      </div>

                      {/* Chat Trigger Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartChat(profile);
                        }}
                        className="shrink-0 p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-all active:scale-95 border border-rose-500/20 shadow-sm"
                        title={`Chat with ${profile.name}`}
                        aria-label={`Chat with ${profile.name}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>

                    {/* University / City */}
                    <div className="space-y-1 mb-2">
                      {profile.college && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 min-w-0">
                          <GraduationCap className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="truncate">{profile.college}</span>
                        </div>
                      )}
                      {profile.city && !profile.college && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 min-w-0">
                          <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                          <span className="truncate">{profile.city}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Interests Tags */}
                  <div className="flex flex-wrap gap-1 pt-1 mt-auto overflow-hidden">
                    {profile.interests.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-slate-300 bg-slate-800/90 border border-slate-700/60 px-2 py-0.5 rounded-md truncate max-w-[110px]"
                      >
                        #{tag}
                      </span>
                    ))}
                    {profile.interests.length > 2 && (
                      <span className="text-[10px] text-slate-500 px-1 py-0.5 font-medium">
                        +{profile.interests.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

function formatTimeAgo(isoString: string): string {
  try {
    const diff = (Date.now() - new Date(isoString).getTime()) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch {
    return 'Recently';
  }
}
