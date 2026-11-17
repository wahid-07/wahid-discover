'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { DiscoverTab } from '@/components/DiscoverTab';
import { HomeTab } from '@/components/HomeTab';
import { MatchesView } from '@/components/MatchesView';
import { MatchModal } from '@/components/MatchModal';
import { ProfileDetailModal } from '@/components/ProfileDetailModal';
import { ChatModal } from '@/components/ChatModal';
import { Profile } from '@/lib/types';
import { MatchWithProfile } from '@/lib/db';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'matches'>('discover');
  const [matches, setMatches] = useState<MatchWithProfile[]>([]);
  const [celebrationMatch, setCelebrationMatch] = useState<Profile | null>(null);
  const [inspectingProfile, setInspectingProfile] = useState<Profile | null>(null);
  const [chattingProfile, setChattingProfile] = useState<Profile | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [feedKey, setFeedKey] = useState(0);

  // Fetch matches from backend
  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch('/api/matches', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setMatches(data);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  // Handle Match Celebration
  const handleMatch = (profile: Profile) => {
    setCelebrationMatch(profile);
    fetchMatches();
  };

  // Handle Reset Demo
  const handleReset = async () => {
    try {
      setIsResetting(true);
      const res = await fetch('/api/reset', { method: 'POST' });
      if (res.ok) {
        await fetchMatches();
        setFeedKey((k) => k + 1);
        setCelebrationMatch(null);
        setInspectingProfile(null);
        setChattingProfile(null);
      }
    } catch (err) {
      console.error('Failed to reset demo:', err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <main className="w-full h-[100dvh] sm:h-[860px] sm:max-h-[92vh] max-w-md bg-slate-950 sm:rounded-[40px] shadow-2xl sm:border border-slate-800/80 flex flex-col overflow-hidden relative">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchesCount={matches.length}
        onReset={handleReset}
        isResetting={isResetting}
      />

      {/* Main Tab Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {activeTab === 'home' && (
          <HomeTab onGoToDiscover={() => setActiveTab('discover')} />
        )}

        {activeTab === 'discover' && (
          <DiscoverTab
            key={feedKey}
            onMatch={handleMatch}
            onOpenDetails={(p) => setInspectingProfile(p)}
            onGoToMatches={() => setActiveTab('matches')}
            matchesCount={matches.length}
            onReset={handleReset}
            isResetting={isResetting}
          />
        )}

        {activeTab === 'matches' && (
          <MatchesView
            matches={matches}
            onOpenDetails={(p) => setInspectingProfile(p)}
            onStartChat={(p) => setChattingProfile(p)}
            onGoToDiscover={() => setActiveTab('discover')}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchesCount={matches.length}
      />

      {/* "It's a Match!" Celebration Screen */}
      <MatchModal
        matchedProfile={celebrationMatch}
        onClose={() => setCelebrationMatch(null)}
        onStartChat={(p) => {
          setCelebrationMatch(null);
          setChattingProfile(p);
        }}
      />

      {/* Detailed Profile Sheet */}
      <ProfileDetailModal
        profile={inspectingProfile}
        onClose={() => setInspectingProfile(null)}
        canSwipe={activeTab === 'discover'}
      />

      {/* Interactive Chat Drawer */}
      <ChatModal
        profile={chattingProfile}
        onClose={() => setChattingProfile(null)}
      />
    </main>
  );
}
