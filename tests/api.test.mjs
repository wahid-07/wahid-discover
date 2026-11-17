import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getFeedProfiles,
  recordSwipe,
  getMatches,
  resetDatabase,
  readDatabase
} from '../lib/db.ts';

test('Coy Discovery Tab Backend Logic & Privacy Tests', async (t) => {
  // Setup: Reset database before testing
  resetDatabase();

  await t.test('1. Initial feed returns at least 30 profiles with required fields', () => {
    const feed = getFeedProfiles();
    assert.ok(feed.length >= 30, `Expected at least 30 profiles, got ${feed.length}`);

    const first = feed[0];
    assert.ok(first.name, 'Profile must have a name');
    assert.ok(typeof first.age === 'number', 'Profile must have a numeric age');
    assert.ok(first.photo, 'Profile must have a photo URL');
    assert.ok(first.bio, 'Profile must have a short bio');
    assert.ok(first.city || first.college, 'Profile must have a city or college');
    assert.ok(Array.isArray(first.interests) && first.interests.length > 0, 'Profile must have interests');
  });

  await t.test('2. Privacy Promise: Feed NEVER reveals who has liked the user', () => {
    const feed = getFeedProfiles();
    for (const profile of feed) {
      assert.strictEqual(
        // @ts-ignore
        profile.hasLikedUser,
        undefined,
        `Privacy violation: Profile ${profile.id} leaked hasLikedUser flag in feed!`
      );
      assert.strictEqual(
        // @ts-ignore
        profile.inboundLikes,
        undefined,
        `Privacy violation: Profile ${profile.id} leaked inboundLikes!`
      );
    }
  });

  await t.test('3. Swiping right on a non-inbound profile (p1) records like but is NOT a match', () => {
    const result = recordSwipe('p1', 'like');
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.match, false);

    // Profile p1 must no longer be in feed
    const feed = getFeedProfiles();
    assert.ok(!feed.some((p) => p.id === 'p1'), 'p1 must not appear in feed after swiping');
  });

  await t.test('4. Swiping right on an inbound like profile (p2) results in a MUTUAL MATCH', () => {
    const result = recordSwipe('p2', 'like');
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.match, true, 'Mutual match should occur when user likes someone who already liked them');
    assert.ok(result.matchedProfile, 'Matched profile details must be returned');
    assert.strictEqual(result.matchedProfile.id, 'p2');
    assert.strictEqual(result.matchedProfile.name, 'Sarah Chen');

    // Profile p2 must no longer be in feed
    const feed = getFeedProfiles();
    assert.ok(!feed.some((p) => p.id === 'p2'), 'p2 must not appear in feed after swiping');
  });

  await t.test('5. Swiping left (pass) on an inbound like profile (p4) does NOT match and never appears again', () => {
    // p4 is in inbound likes, but user passes!
    const result = recordSwipe('p4', 'pass');
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.match, false, 'Passing on an inbound like must NOT create a match');

    // Profile p4 must no longer be in feed
    const feed = getFeedProfiles();
    assert.ok(!feed.some((p) => p.id === 'p4'), 'p4 must not appear in feed after passing');
  });

  await t.test('6. Matches view only contains mutual matches and persists across reads', () => {
    const matches = getMatches();
    // Only p2 should be a match (p1 was one-sided like, p4 was a pass)
    assert.strictEqual(matches.length, 1);
    assert.strictEqual(matches[0].profileId, 'p2');
    assert.strictEqual(matches[0].profile.name, 'Sarah Chen');
  });

  await t.test('7. Swiped profiles never appear again (persistence check)', () => {
    const rawDb = readDatabase();
    assert.ok(rawDb.swipes.length >= 3, 'Must have recorded swipes');
    const swipedIds = rawDb.swipes.map((s) => s.profileId);
    assert.ok(swipedIds.includes('p1'));
    assert.ok(swipedIds.includes('p2'));
    assert.ok(swipedIds.includes('p4'));

    const feed = getFeedProfiles();
    for (const swipedId of ['p1', 'p2', 'p4']) {
      assert.ok(!feed.some((p) => p.id === swipedId), `Profile ${swipedId} must never appear again`);
    }
  });

  await t.test('8. Reset database restores all profiles and clears swipes and matches', () => {
    resetDatabase();
    const feedAfterReset = getFeedProfiles();
    assert.ok(feedAfterReset.length >= 30, 'Feed should be full after reset');
    assert.ok(feedAfterReset.some((p) => p.id === 'p1'), 'p1 should be back in feed');
    assert.ok(feedAfterReset.some((p) => p.id === 'p2'), 'p2 should be back in feed');

    const matchesAfterReset = getMatches();
    assert.strictEqual(matchesAfterReset.length, 0, 'Matches should be empty after reset');
  });
});
