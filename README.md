# Wahid (Coy SDE Intern Assignment) — Discover Application

A modern, mobile-first implementation of the **Discover** tab branded as **Wahid** for the **Coy SDE Intern Assignment**, alongside a comprehensive product critique and feature proposal for Coy's core consumer experience.

---

## Table of Contents
1. [Part A: Product Analysis & Feature Proposals](#part-a-product-analysis--feature-proposals)
   - [Overview of Current Coy Flow](#overview-of-current-coy-flow)
   - [Feature 1: Privacy-Preserving "Blind Clues" (Zero-Knowledge Contextual Hints)](#feature-1-privacy-preserving-blind-clues-zero-knowledge-contextual-hints)
   - [Feature 2: Dynamic Slot Recycling & Inactive Recipient Unlocking (Anti-Stalemate Engine)](#feature-2-dynamic-slot-recycling--inactive-recipient-unlocking-anti-stalemate-engine)
2. [Part B: Discover Tab Implementation](#part-b-discover-tab-implementation)
   - [Tech Stack](#tech-stack)
   - [Core Architecture & Privacy Guarantees](#core-architecture--privacy-guarantees)
   - [32 Mock Profiles & Seeded Matches](#32-mock-profiles--seeded-matches)
   - [Swipe Experience & Gesture Physics](#swipe-experience--gesture-physics)
   - [Mutual Matching & Celebration Experience](#mutual-matching--celebration-experience)
   - [Matches View & Simulated Chat](#matches-view--simulated-chat)
   - [Backend API Specification](#backend-api-specification)
3. [Getting Started & Running Locally](#getting-started--running-locally)
4. [Automated Testing](#automated-testing)

---

## Part A: Product Analysis & Feature Proposals

### Overview of Current Coy Flow
Coy operates on a double-blind, anonymous crush-matching model:
1. **Phone OTP Login**: Frictionless authentication with minimal upfront profiling.
2. **Adding a Crush**: Users assign someone they know to a limited set of crush slots using a phone number or email.
3. **Email Verification**: Validates the user's institution/identity.
4. **Invite Link**: Generates a shareable viral link so crushes and friends sign up.
5. **Extra-Slots Screen**: Monetization wall when free slots (typically 3) are exhausted.

While this zero-knowledge approach is brilliant at eliminating the fear of rejection, analyzing the live consumer experience reveals two major psychological and structural bottlenecks:

---

### Feature 1: Privacy-Preserving "Blind Clues" (Zero-Knowledge Contextual Hints)

#### The Problem: The Recipient Paralysis / Deadlock Dilemma
When Alice adds Bob as an anonymous crush, Bob receives an SMS or WhatsApp notification:
> *"Someone who knows you has a secret crush on you! Find out who on Coy: app.getcoy.com"*

Bob signs up and sees he has **only 3 free slots**. Bob likely knows dozens of people from college, work, high school, or social circles. Bob faces acute **cognitive paralysis**:
- *"If I guess person X, Y, and Z, and none of them were the person who added me, I've burned all my slots."*
- *"What if none of my guesses match? I will feel disappointed and I still won't know who likes me."*

Because the search space is unbounded ($N$ acquaintances) and slots are scarce ($K = 3$), the probability of guessing the correct person by chance is low. Most recipients freeze and drop off without using a single slot.

#### The Proposed Solution: "Blind Clues" (Contextual Anonymity Anchors)
When adding a crush, the sender can optionally select **one structured, non-identifying clue category** from a predefined set:
- **Shared Social Context**: *"We met on Campus / College"*, *"We worked together"*, *"High school classmate"*, or *"Met through mutual friends"*.
- **Temporal Anchor**: *"Met within the last 6 months"* or *"Known each other for 1+ years"*.
- **Broad First-Name Initial Bucket**: *"Name begins with A–M"* or *"Name begins with N–Z"*.

When Bob registers, he sees:
> *"1 person has a crush on you! Clue: 'We met on Campus (Stanford)' & 'First name initial: A–M'"*

#### Why This Feature Is Required:
1. **Dramatically Narrows the Search Space**: Converts an impossible needle-in-a-haystack problem into a tangible subset of acquaintances. Bob now thinks of 3–4 specific people he actually knows in that cohort.
2. **Skyrockets Reciprocal Conversion**: Recipients who receive a contextual hint are estimated to have a **3x–5x higher likelihood** of using their slots, converting passive SMS recipients into active matched pairs.
3. **Preserves Complete Plausible Deniability**: By enforcing $k$-anonymity (minimum cohort size of at least 5+ people) and preventing free-form text input, the sender remains completely anonymous. Alice cannot be singled out, but Bob is given the confidence to take a leap of faith.

#### Privacy Threat Modeling & Edge Cases:
- **Binary Search Elimination Attack**: A malicious user must not be able to cross-reference multiple clues to isolate a single individual.
  - *Mitigation*: Strictly **one clue per crush**, chosen from broad server-enforced categorical buckets. No arbitrary free text.
- **Micro-Networks**: If Bob only knows 1 person in a specific bucket, the clue is withheld or forced into a higher-level general bucket (e.g., fallback to "University" rather than "Lab Group").

---

### Feature 2: Dynamic Slot Recycling & Inactive Recipient Unlocking (Anti-Stalemate Engine)

#### The Problem: Permanent Slot Deadlock & Contact Drift
Under a static slot model, assigning a crush permanently ties up a slot. However, in the real world:
- The target phone number may be inactive, outdated, or belong to someone in a committed relationship who will never sign up.
- The recipient may ignore the SMS or delete the link.
- The sender's feelings may change over several weeks or months.

When all 3 slots are locked on inactive numbers, the user's Coy experience reaches a permanent dead end. Users hesitate to use their last slot because of "buyer's remorse" or slot-hoarding anxiety.

#### The Proposed Solution: Activity-Based Slot Recycling & Safety Valves
1. **14-Day Inactive Recipient Unlock**: If a target has not registered or interacted with Coy within 14 days of receiving the ping, the sender is granted the option to **recycle the slot** and assign it to someone else.
2. **5-Minute Undo Grace Window**: If a user enters a typo in a phone number or immediately regrets an impulse crush, an "Undo" button allows immediate slot reclamation before delivery.
3. **Cooldown Reassignment Period**: If the target *has* registered on Coy but did not add the sender back, a 30-day graceful decay period ensures the slot can eventually be freed up without turning the platform into an rapid guessing oracle.

#### Why This Feature Is Required:
1. **Removes the Fear of "Wasted Slots"**: Users are far more likely to take a chance on a crush if they know their slot isn't dead forever if that person doesn't use the app.
2. **Long-Term Retention & Re-engagement**: Automated push notifications ("Your slot has unlocked! You have 1 free slot available to add someone new") bring dormant users back into the app loop every month.
3. **Data Freshness**: Prunes stale, dead-end phone numbers from the notification queue, optimizing SMS/WhatsApp delivery costs for Coy.

---

## Part B: Discover Tab Implementation

A full-fledged, mobile-first swipe discovery experience designed to complement Coy's double-blind matching.

### Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) with React 19 & TypeScript.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Coy brand palette (`#FF3366`, `#E11D48`).
- **Animation & Gestures**: [Framer Motion](https://www.framer.com/motion/) (`useMotionValue`, `useTransform`, spring rotation physics, gesture threshold detection).
- **Celebration**: `canvas-confetti` particle explosions.
- **Persistence**: File-backed atomic JSON store (`data/db.json`), persisting swipes and matches across restarts and page reloads.
- **Testing**: Built-in Node test runner with `tsx` (`npm test`).

---

### Core Architecture & Privacy Guarantees

#### The Core Coy Promise: Zero Information Leakage
> *"Never reveal who has liked the user unless it is mutual; this is the core promise of Coy."*

1. **Server-Side Sanitization**:
   - The backend stores secret inbound likes internally in `db.inboundLikes`.
   - When `GET /feed` is called, the profiles returned to the browser **never contain** `hasLikedUser`, `isMatch`, or any inbound like indicators.
   - Even if a user inspects browser DevTools Network tab, they **cannot** see who has liked them.
2. **Server-Side Match Computation**:
   - Matches are computed strictly inside `POST /swipe`.
   - A match occurs if and only if `direction === 'like'` **and** `profileId` exists in `db.inboundLikes`.
3. **Strict One-Time Presentation**:
   - Every swipe (like or pass) is recorded with a timestamp.
   - `GET /feed` filters out all previously swiped profiles: a profile that has been swiped on **never appears again**.

---

### 32 Mock Profiles & Seeded Matches

32 diverse, realistic profiles are seeded across top universities (Stanford, UC Berkeley, Columbia, NYU, IIT Delhi, BITS Pilani, UCLA, UT Austin, etc.) featuring:
- Name, age, verified badge
- High-resolution curated portrait photography
- Multi-photo galleries with tap navigation
- University / City and occupation
- Authentic bios & Hinge-style prompt Q&As (e.g. *"Typical Sunday morning"*, *"A non-negotiable for me"*)
- Filterable interest tags (`#FilmPhotography`, `#UI/UXDesign`, `#IndieRock`, `#Boba`, etc.)

#### Seeded Inbound Likes for Live Demo
The following 10 profiles have secretly liked the user in the initial database:
- **`p2` (Sarah Chen, 22, UC Berkeley)**: Positioned as the **2nd card** in the stack so reviewers can immediately experience a match celebration on their second swipe!
- **`p4` (Ananya Sharma, 21, IIT Delhi)**
- **`p7` (Maya Patel, 23, BITS Pilani)**
- **`p10` (Lucas Silva, 24, UW)**
- **`p13` (Priya Nair, 21, RISD)**
- **`p16` (Rohan Joshi, 23, COEP)**
- **`p20` (Samira Khan, 22, Georgetown)**
- **`p24` (Tara Mehta, 22, Harvard)**
- **`p28` (Meera Chawla, 22, LCF)**
- **`p31` (Carlos Mendez, 24, Miami)**

---

### Swipe Experience & Gesture Physics
- **Mobile Gesture Engine**:
  - Touch & mouse dragging with elastic resistance (`dragElastic={0.85}`).
  - Dynamic card rotation derived from horizontal offset ($x / 14^\circ$).
  - Dynamic stamps: **LIKE** (emerald border with glowing backdrop) and **NOPE** (ruby-red border with glowing backdrop) that fade in smoothly based on drag distance.
  - Card release physics: throws card off-screen if drag distance exceeds $110\text{px}$ or velocity exceeds $400\text{px/s}$; otherwise smoothly springs back to center.
- **Card Depth Stack**:
  - The card directly underneath is rendered with subtle scale (`0.94`) and offset (`12px`), expanding smoothly as the top card departs.
- **Desktop Keyboard Controls**:
  - `←` or `A`: Pass (Swipe Left)
  - `→` or `D`: Like (Swipe Right)
  - `Space` or `I`: Open Profile Details
  - `Backspace` or `Z`: Rewind / Undo Last Swipe
- **Action Buttons**: Floating bottom controls with Pass (❌), Super Like (⭐), Like (💚), Undo (↩️), and Info (ℹ️).

---

### Mutual Matching & Celebration Experience
When both users like each other:
1. An **"It’s a Match!" celebration modal** animates onto the screen.
2. Multi-color particle confetti fires across the viewport (`canvas-confetti`).
3. Displays overlapping glowing avatars of the user and their match with an animated heart.
4. Provides two actions:
   - **"Say Hello"**: Directly launches an interactive chat drawer with pre-made icebreakers and simulated instant replies.
   - **"Keep Swiping"**: Dismisses the celebration and continues discovering.

---

### Matches View & Simulated Chat
- Accessible via the top header pill or bottom navigation tab.
- Displays all mutual matches with timestamps (*"Just now"*, *"5m ago"*), university tags, and online indicators.
- Includes a live search filter.
- **Interactive Chat Drawer**:
  - Send custom messages or one-tap icebreakers (*"Hey! So glad we matched 🎉"*, *"Coffee this week?"*).
  - Simulates a witty typing response after 1.2s to demonstrate a full consumer messaging flow.

---

### Backend API Specification

All endpoints are available at both root paths (`/feed`, `/swipe`, `/matches`, `/reset`) and standard Next.js API paths (`/api/feed`, `/api/swipe`, `/api/matches`, `/api/reset`):

#### 1. `GET /feed`
Returns all profiles the logged-in user has not yet swiped on.
- **Response**: `200 OK`
```json
[
  {
    "id": "p1",
    "name": "Aria Vance",
    "age": 21,
    "photo": "https://images.unsplash.com/...",
    "photos": ["https://images.unsplash.com/..."],
    "bio": "Arch major who spends 80% of her time in studio...",
    "city": "San Francisco, CA",
    "college": "Stanford University",
    "interests": ["Architecture", "Matcha", "Indie Pop"],
    "occupation": "Architecture Student",
    "distance": "3 miles away"
  }
]
```

#### 2. `POST /swipe`
Records a swipe and returns whether it created a mutual match.
- **Request Body**:
```json
{
  "profileId": "p2",
  "direction": "like"
}
```
*(Accepts flexible parameters: `profileId` or `targetId`, `direction` or `action`, `'like' | 'pass' | 'right' | 'left'`)*
- **Response (Mutual Match)**: `200 OK`
```json
{
  "success": true,
  "match": true,
  "matchedProfile": {
    "id": "p2",
    "name": "Sarah Chen",
    "age": 22,
    "photo": "...",
    "bio": "..."
  }
}
```
- **Response (Pass or Unilateral Like)**: `200 OK`
```json
{
  "success": true,
  "match": false
}
```

#### 3. `GET /matches`
Returns all mutual matches with timestamps.
- **Response**: `200 OK`
```json
[
  {
    "matchId": "match_1700000000_abc12",
    "profileId": "p2",
    "matchedAt": "2026-11-17T11:45:00.000Z",
    "profile": { ... }
  }
]
```

#### 4. `POST /reset`
Resets the demo database back to its initial state (reseeds 32 profiles, restores inbound likes, clears swipes and matches).

#### 5. `POST /api/rewind`
Reverts the user's most recent swipe, returning the profile to the top of the stack.

---

## Getting Started & Running Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd coy

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm start
```

---

## Automated Testing

The project includes unit and integration tests covering the backend logic, privacy guarantees, swipe handling, and data persistence:

```bash
npm test
```

### Test Suite Summary:
```
▶ Coy Discovery Tab Backend Logic & Privacy Tests
  ✔ 1. Initial feed returns at least 30 profiles with required fields
  ✔ 2. Privacy Promise: Feed NEVER reveals who has liked the user
  ✔ 3. Swiping right on a non-inbound profile (p1) records like but is NOT a match
  ✔ 4. Swiping right on an inbound like profile (p2) results in a MUTUAL MATCH
  ✔ 5. Swiping left (pass) on an inbound like profile (p4) does NOT match and never appears again
  ✔ 6. Matches view only contains mutual matches and persists across reads
  ✔ 7. Swiped profiles never appear again (persistence check)
  ✔ 8. Reset database restores all profiles and clears swipes and matches
✔ Coy Discovery Tab Backend Logic & Privacy Tests (9 passed)
```

