'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { Profile, SwipeDirection } from '@/lib/types';
import { ProfileCard } from './ProfileCard';

interface CardStackProps {
  profiles: Profile[];
  onSwipe: (direction: SwipeDirection) => void;
  onOpenDetails: (profile: Profile) => void;
  onRewind?: () => void;
  canRewind?: boolean;
}

export const CardStack: React.FC<CardStackProps> = ({
  profiles,
  onSwipe,
  onOpenDetails,
}) => {
  const topProfile = profiles[0];
  const nextProfile = profiles[1];

  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotation proportional to x movement
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);

  // Stamp opacities
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-30, -120], [0, 1]);

  // Scale of the card underneath smoothly expands as top card is dragged away
  const nextCardScale = useTransform(x, [-200, 0, 200], [1, 0.94, 1]);
  const nextCardY = useTransform(x, [-200, 0, 200], [0, 12, 0]);
  const nextCardOpacity = useTransform(x, [-200, 0, 200], [1, 0.8, 1]);

  // Reset motion values whenever top profile changes
  useEffect(() => {
    x.set(0);
    y.set(0);
    controls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
  }, [topProfile?.id, controls, x, y]);

  // Handle Drag End with gesture physics
  const handleDragEnd = async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 110;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped Right -> LIKE
      await controls.start({
        x: 600,
        rotate: 25,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      });
      onSwipe('like');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      // Swiped Left -> PASS
      await controls.start({
        x: -600,
        rotate: -25,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      });
      onSwipe('pass');
    } else {
      // Return to center spring
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: 'spring', stiffness: 350, damping: 25 },
      });
    }
  };

  if (!topProfile) {
    return null;
  }

  return (
    <div className="relative w-full h-[520px] max-h-[72vh] flex items-center justify-center">
      {/* Next Card in Stack (Underneath) */}
      {nextProfile && (
        <motion.div
          key={nextProfile.id}
          style={{
            scale: nextCardScale,
            y: nextCardY,
            opacity: nextCardOpacity,
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <ProfileCard
            profile={nextProfile}
            onOpenDetails={() => {}}
            isTopCard={false}
          />
        </motion.div>
      )}

      {/* Top Active Card (Draggable) */}
      <motion.div
        key={topProfile.id}
        style={{ x, y, rotate }}
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.85}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
        className="absolute inset-0 z-10 grab-cursor"
      >
        <ProfileCard
          profile={topProfile}
          onOpenDetails={onOpenDetails}
          likeOpacity={likeOpacity}
          nopeOpacity={nopeOpacity}
          isTopCard={true}
        />
      </motion.div>
    </div>
  );
};
