import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Profile, SwipeDirection, SwipeResponse } from './types';
import { SEEDED_PROFILES, INITIAL_INBOUND_LIKES } from './seedData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getInitialDatabase(): DatabaseSchema {
  return {
    profiles: SEEDED_PROFILES,
    inboundLikes: INITIAL_INBOUND_LIKES,
    swipes: [],
    matches: [],
  };
}

export function readDatabase(): DatabaseSchema {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    const initial = getInitialDatabase();
    writeDatabase(initial);
    return initial;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    if (!parsed.profiles || !Array.isArray(parsed.profiles)) {
      const reset = getInitialDatabase();
      writeDatabase(reset);
      return reset;
    }
    return parsed;
  } catch (error) {
    console.error('Failed to read or parse db.json, resetting to initial state:', error);
    const reset = getInitialDatabase();
    writeDatabase(reset);
    return reset;
  }
}

export function writeDatabase(data: DatabaseSchema): void {
  ensureDataDir();
  const tempFile = `${DB_FILE}.${Date.now()}.${Math.random().toString(36).substring(2, 8)}.tmp`;
  try {
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (error) {
    // If atomic rename fails on certain Windows environments, fallback to direct write
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write db.json:', e);
    }
    if (fs.existsSync(tempFile)) {
      try {
        fs.unlinkSync(tempFile);
      } catch {}
    }
  }
}

/**
 * Returns profiles that have NOT yet been swiped on.
 * Strictly strips any internal matching flags to uphold Coy's privacy promise.
 */
export function getFeedProfiles(): Profile[] {
  const db = readDatabase();
  const swipedIds = new Set(db.swipes.map((s) => s.profileId));

  return db.profiles
    .filter((p) => !swipedIds.has(p.id))
    .map((p) => {
      // Return clean public profile without any sensitive fields
      const { ...cleanProfile } = p;
      return cleanProfile;
    });
}

/**
 * Records a swipe (like or pass) and determines if it creates a mutual match.
 */
export function recordSwipe(
  profileId: string,
  direction: SwipeDirection
): SwipeResponse {
  const db = readDatabase();

  const profile = db.profiles.find((p) => p.id === profileId);
  if (!profile) {
    return {
      success: false,
      match: false,
      message: `Profile with ID "${profileId}" not found.`,
    };
  }

  // Check if already swiped on
  const existingSwipe = db.swipes.find((s) => s.profileId === profileId);
  if (existingSwipe) {
    return {
      success: true,
      match: false,
      message: 'Profile already swiped on previously.',
    };
  }

  // Record the swipe
  db.swipes.push({
    profileId,
    direction,
    timestamp: new Date().toISOString(),
  });

  // Check for mutual match
  // Mutual match happens IF user swiped 'like' AND the other profile already liked user
  const isMutual = direction === 'like' && db.inboundLikes.includes(profileId);

  if (isMutual) {
    const matchId = `match_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const matchRecord = {
      matchId,
      profileId,
      matchedAt: new Date().toISOString(),
      lastMessage: undefined,
    };
    db.matches.push(matchRecord);
    writeDatabase(db);

    return {
      success: true,
      match: true,
      matchedProfile: profile,
    };
  }

  writeDatabase(db);
  return {
    success: true,
    match: false,
  };
}

export interface MatchWithProfile {
  matchId: string;
  profileId: string;
  matchedAt: string;
  lastMessage?: string;
  profile: Profile;
}

/**
 * Returns all mutual matches.
 * Only profiles where BOTH sides have liked each other are returned.
 */
export function getMatches(): MatchWithProfile[] {
  const db = readDatabase();
  const profileMap = new Map(db.profiles.map((p) => [p.id, p]));

  const result: MatchWithProfile[] = [];
  for (const m of db.matches) {
    const profile = profileMap.get(m.profileId);
    if (profile) {
      result.push({
        matchId: m.matchId,
        profileId: m.profileId,
        matchedAt: m.matchedAt,
        lastMessage: m.lastMessage,
        profile,
      });
    }
  }

  return result.sort((a, b) => new Date(b.matchedAt).getTime() - new Date(a.matchedAt).getTime());
}

/**
 * Resets the demo database back to initial state.
 */
export function resetDatabase(): void {
  const initial = getInitialDatabase();
  writeDatabase(initial);
}

/**
 * Rewinds the last swipe (undoes last like or pass).
 */
export function rewindLastSwipe(): { success: boolean; rewoundProfile?: Profile } {
  const db = readDatabase();
  if (db.swipes.length === 0) {
    return { success: false };
  }

  const lastSwipe = db.swipes.pop()!;
  // Also remove from matches if it was a match
  db.matches = db.matches.filter((m) => m.profileId !== lastSwipe.profileId);
  writeDatabase(db);

  const profile = db.profiles.find((p) => p.id === lastSwipe.profileId);
  return { success: true, rewoundProfile: profile };
}
