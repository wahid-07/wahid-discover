'use client';

import React, { useState } from 'react';
import { MatchWithProfile } from '@/lib/db';
import { Profile } from '@/lib/types';
import { Heart, MessageCircle, Sparkles, MapPin, GraduationCap, Search, ShieldCheck } from 'lucide-react';

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
    <div className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col h-full animate-fadeIn">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
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
        <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Mutual Only</span>
        </div>
      </div>

      {/* Search Input (if multiple matches) */}
      {matches.length > 2 && (
        <div className="relative mb-4">
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
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
            <Heart className="w-8 h-8 text-slate-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-1">No Matches Yet</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              In Coy, matches only happen when someone you like also likes you back. Keep swiping on the Discover tab to find your match!
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
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredMatches.map(({ matchId, profile, matchedAt }) => {
            const timeAgo = formatTimeAgo(matchedAt);
            return (
              <div
                key={matchId}
                className="group w-full bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-rose-500/40 rounded-2xl p-3 flex items-center justify-between transition-all duration-200 cursor-pointer shadow-sm"
                onClick={() => onOpenDetails(profile)}
              >
                {/* Match Info */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-13 h-13 rounded-full object-cover border-2 border-rose-500/60"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                  </div>

                  <div className="text-left space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">
                        {profile.name}, {profile.age}
                      </span>
                      <span className="text-[10px] text-slate-500">• {timeAgo}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      {profile.college ? (
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-rose-400" />
                          <span className="truncate max-w-[150px]">{profile.college}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-pink-400" />
                          <span>{profile.city}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-1 pt-0.5">
                      {profile.interests.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartChat(profile);
                  }}
                  className="p-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-all active:scale-95 border border-rose-500/20"
                  title={`Chat with ${profile.name}`}
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
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
