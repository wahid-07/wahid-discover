import { NextResponse } from 'next/server';
import { getFeedProfiles } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profiles = getFeedProfiles();
    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    console.error('Error in GET /feed:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve feed profiles' },
      { status: 500 }
    );
  }
}
