export interface ProfilePrompt {
  question: string;
  answer: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  photo: string;
  photos: string[];
  bio: string;
  city: string;
  college: string;
  interests: string[];
  prompts?: ProfilePrompt[];
  occupation?: string;
  distance?: string;
}

export type SwipeDirection = 'like' | 'pass';

export interface SwipeRecord {
  profileId: string;
  direction: SwipeDirection;
  timestamp: string;
}

export interface MatchRecord {
  matchId: string;
  profileId: string;
  matchedAt: string;
  lastMessage?: string;
}

export interface DatabaseSchema {
  profiles: Profile[];
  inboundLikes: string[]; // Secret: IDs of seeded profiles who liked the logged-in user
  swipes: SwipeRecord[];
  matches: MatchRecord[];
}

export interface SwipeRequestBody {
  profileId?: string;
  targetId?: string;
  id?: string;
  direction?: SwipeDirection | 'right' | 'left';
  action?: SwipeDirection | 'right' | 'left';
}

export interface SwipeResponse {
  success: boolean;
  match: boolean;
  matchedProfile?: Profile;
  message?: string;
}

