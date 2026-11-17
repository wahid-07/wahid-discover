import { NextResponse } from 'next/server';
import { getMatches } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const matches = getMatches();
    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    console.error('Error in GET /matches:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve matches' },
      { status: 500 }
    );
  }
}
