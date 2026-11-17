import { NextRequest, NextResponse } from 'next/server';
import { recordSwipe } from '@/lib/db';
import { SwipeDirection } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // Accept flexible key naming: profileId, targetId, id
    const profileId = body.profileId || body.targetId || body.id;

    if (!profileId || typeof profileId !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid "profileId". Please provide a valid string profileId.',
        },
        { status: 400 }
      );
    }

    // Accept flexible direction naming: direction, action, swipe ('like', 'pass', 'right', 'left')
    const rawDirection = String(body.direction || body.action || body.swipe || '').toLowerCase().trim();
    let direction: SwipeDirection | null = null;

    if (rawDirection === 'like' || rawDirection === 'right') {
      direction = 'like';
    } else if (rawDirection === 'pass' || rawDirection === 'left' || rawDirection === 'nope') {
      direction = 'pass';
    }

    if (!direction) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid swipe direction. Expected "like" (or "right") or "pass" (or "left").',
        },
        { status: 400 }
      );
    }

    const result = recordSwipe(profileId, direction);

    if (!result.success && result.message?.includes('not found')) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in POST /swipe:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing swipe' },
      { status: 500 }
    );
  }
}

