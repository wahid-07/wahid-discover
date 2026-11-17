'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { Profile, SwipeDirection } from '@/lib/types';
import { ProfileCard } from './ProfileCard';

export interface CardStackHandle {
  swipe: (direction: SwipeDirection) => Promise<void>;
}

interface CardStackProps {
  profiles: Profile[];
  onSwipe: (direction: SwipeDirection) => void;
  onOpenDetails: (profile: Profile) => void;
  isSwipingBlocked?: boolean;
}

export const CardStack = forwardRef<CardStackHandle, CardStackProps>(({
  profiles,
  onSwipe,
  onOpenDetails,
  isSwipingBlocked = false,
}, ref) => {
  const topProfile = profiles[0];
  const nextProfile = profiles[1];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isAnimatingRef = useRef(false);

  // Rotation proportional to x movement: -18deg to +18deg
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);

  // Stamp opacities: fade in between 25px and 110px
  const likeOpacity = useTransform(x, [25, 110], [0, 1]);
  const nopeOpacity = useTransform(x, [-25, -110], [0, 1]);

  // Top card opacity on exit: fades out as it travels beyond 250px
  const cardOpacity = useTransform(x, [-450, -180, 0, 180, 450], [0, 1, 1, 1, 0]);

  // Next card in stack smoothly expands as top card is dragged away
  const nextCardScale = useTransform(x, [-220, 0, 220], [1, 0.94, 1]);
  const nextCardY = useTransform(x, [-220, 0, 220], [0, 12, 0]);
  const nextCardOpacity = useTransform(x, [-220, 0, 220], [1, 0.8, 1]);

  // Reset motion values whenever top profile changes
  useEffect(() => {
    x.set(0);
    y.set(0);
    isAnimatingRef.current = false;
  }, [topProfile?.id, x, y]);

  // Trigger smooth card exit animation
  const triggerExit = async (direction: SwipeDirection) => {
    if (isAnimatingRef.current || isSwipingBlocked || !topProfile) return;
    isAnimatingRef.current = true;

    const targetX = direction === 'like' ? 650 : -650;
    await animate(x, targetX, {
      duration: 0.32,
      ease: 'easeOut',
    });

    onSwipe(direction);
  };

  // Expose swipe method for desktop buttons and keyboard shortcuts
  useImperativeHandle(ref, () => ({
    swipe: (direction: SwipeDirection) => triggerExit(direction),
  }));

  // Handle Drag End with gesture physics
  const handleDragEnd = async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isAnimatingRef.current || isSwipingBlocked || !topProfile) return;

    const threshold = 100;
    const velocityThreshold = 380;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped Right -> LIKE
      isAnimatingRef.current = true;
      await animate(x, 650, {
        duration: 0.3,
        ease: 'easeOut',
      });
      onSwipe('like');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      // Swiped Left -> PASS
      isAnimatingRef.current = true;
      await animate(x, -650, {
        duration: 0.3,
        ease: 'easeOut',
      });
      onSwipe('pass');
    } else {
      // Return to center with natural spring physics
      animate(x, 0, {
        type: 'spring',
        stiffness: 400,
        damping: 28,
      });
      animate(y, 0, {
        type: 'spring',
        stiffness: 400,
        damping: 28,
      });
    }
  };

  if (!topProfile) {
    return null;
  }

  return (
    <div className="relative flex-1 min-h-[440px] max-h-[620px] w-full flex items-center justify-center my-1 select-none">
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
        style={{ x, y, rotate, opacity: cardOpacity }}
        drag={isSwipingBlocked ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.85}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
        className="absolute inset-0 z-10 grab-cursor will-change-transform"
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
});

CardStack.displayName = 'CardStack';
