import { NextResponse } from 'next/server';
import { rewindLastSwipe } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const result = rewindLastSwipe();
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'No swipes to rewind' },
        { status: 400 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Rewound last swipe',
      rewoundProfile: result.rewoundProfile,
    });
  } catch (error) {
    console.error('Error in POST /rewind:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to rewind last swipe' },
      { status: 500 }
    );
  }
}

