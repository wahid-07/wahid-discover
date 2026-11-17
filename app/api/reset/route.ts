import { NextResponse } from 'next/server';
import { resetDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    resetDatabase();
    return NextResponse.json({
      success: true,
      message: 'Database has been reset to initial seeded state.',
    });
  } catch (error) {
    console.error('Error in POST /reset:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset database' },
      { status: 500 }
    );
  }
}
