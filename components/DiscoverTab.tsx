'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Profile, SwipeDirection, SwipeResponse } from '@/lib/types';
import { CardStack, CardStackHandle } from './CardStack';
import { ActionButtons } from './ActionButtons';
import { EmptyState } from './EmptyState';
import { Loader2 } from 'lucide-react';

interface DiscoverTabProps {
  onMatch: (profile: Profile) => void;
  onOpenDetails: (profile: Profile) => void;
  onGoToMatches: () => void;
  matchesCount: number;
  onReset: () => void;
  isResetting: boolean;
}

export const DiscoverTab: React.FC<DiscoverTabProps> = ({
  onMatch,
  onOpenDetails,
  onGoToMatches,
  matchesCount,
  onReset,
  isResetting,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const [canRewind, setCanRewind] = useState(false);
  const cardStackRef = useRef<CardStackHandle>(null);

  // Fetch Feed Profiles from backend
  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/feed', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setProfiles(data);
      }
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  // Commits the swipe to state and backend
  const handleSwipeCommit = async (direction: SwipeDirection) => {
    if (profiles.length === 0) return;

    const currentProfile = profiles[0];
    setIsSwiping(true);

    // Optimistically advance the stack
    setProfiles((prev) => prev.slice(1));
    setCanRewind(true);

    try {
      const res = await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: currentProfile.id,
          direction,
        }),
      });

      if (res.ok) {
        const data: SwipeResponse = await res.json();
        if (data.match && data.matchedProfile) {
          onMatch(data.matchedProfile);
        }
      }
    } catch (err) {
      console.error('Error posting swipe:', err);
    } finally {
      setTimeout(() => {
        setIsSwiping(false);
      }, 150);
    }
  };

  // Triggered by desktop action buttons or keyboard shortcuts
  const triggerSwipeAction = (direction: SwipeDirection) => {
    if (isSwiping || profiles.length === 0) return;
    if (cardStackRef.current) {
      cardStackRef.current.swipe(direction);
    } else {
      handleSwipeCommit(direction);
    }
  };

  // Handle Rewind Action
  const handleRewind = async () => {
    if (!canRewind || isSwiping) return;
    try {
      const res = await fetch('/api/rewind', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.rewoundProfile) {
          setProfiles((prev) => [data.rewoundProfile, ...prev]);
        }
      }
    } catch (err) {
      console.error('Failed to rewind:', err);
    }
  };

  // Keyboard Navigation on Desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (profiles.length === 0 || isSwiping) return;

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        triggerSwipeAction('like');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        triggerSwipeAction('pass');
      } else if (e.key === 'Backspace' || e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        handleRewind();
      } else if (e.key === ' ' || e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        if (profiles[0]) {
          onOpenDetails(profiles[0]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [profiles, isSwiping, canRewind]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
        <span className="text-xs text-slate-400">Finding people near you...</span>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <EmptyState
        onReset={onReset}
        onGoToMatches={onGoToMatches}
        matchesCount={matchesCount}
        isResetting={isResetting}
      />
    );
  }

  return (
    <div className="flex-1 w-full max-w-md mx-auto flex flex-col justify-between px-3 pt-1 pb-1 select-none overflow-hidden animate-fadeIn">
      {/* Interactive Card Stack */}
      <CardStack
        ref={cardStackRef}
        profiles={profiles}
        onSwipe={handleSwipeCommit}
        onOpenDetails={onOpenDetails}
        isSwipingBlocked={isSwiping}
      />

      {/* Action Buttons Bar */}
      <ActionButtons
        onSwipe={triggerSwipeAction}
        onRewind={handleRewind}
        onOpenDetails={() => profiles[0] && onOpenDetails(profiles[0])}
        canRewind={canRewind}
        disabled={isSwiping}
      />
    </div>
  );
};
