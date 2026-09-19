# Bhumi

**The Earth has work for you.**

Bhumi (Sanskrit for *the ground beneath your foot*) is a premium environmental civic-action app. It turns "pipeline invisibility" — the gap between caring about the planet and knowing what to actually do — into a sequence of small, doable, coordinated steps, calibrated to each person.

The body is **Bhumi**. The voice is **Jane** — the voice of the earth, translated into action.

## What's inside

- **Home** — map-based ground under your feet: live Europe missions framed as domain pipelines, with Jane coaching each step.
- **Global** — 33 cities on six continents as movement infrastructure (not a climate-tech demo): 11 hand-picked European levers, 9 in Asia, and at least one city on every inhabited continent. Ordered by need. Council-election calendars beat population.
- **Playground** — co-design a real pipeline with Jane. She sharpens your idea with questions and emits structured `[STEP]` blocks that fill a live draft card. Save it privately, share it with your city, or propose it to Bhoomee.
- **Do it with Jane** — every action step has a coach button that opens a focused, real-time conversation to walk you through actually doing it.
- **Team mode** — two (or more) phones on the same team share progress live: completed steps, who did them, community pipelines, and presence all sync in real time via Firebase.
- **You** — your team (name, members online, invite link), your calibration, completed-step count, and the pipelines you've built.

## Stack

- Vite + React 18 + Tailwind v4
- Anthropic SDK (`claude-sonnet-4-5`) for Jane — via a serverless proxy in production so the key stays server-side
- Firebase Firestore for live team sync (optional, env-gated)

## Setup

```bash
npm install
cp .env.example .env   # add your VITE_ANTHROPIC_API_KEY
npm run dev
```

Without an API key the app runs in **demo mode** with in-character mock replies, so it stays fully usable offline. Without Firebase it runs **solo** (each device independent).

### Environment

| Variable                          | Where        | Description                                                            |
| --------------------------------- | ------------ | ---------------------------------------------------------------------- |
| `VITE_ANTHROPIC_API_KEY`          | local only   | Anthropic key for live Jane. Bundled into the browser — **dev only**.  |
| `ANTHROPIC_API_KEY`               | Vercel only  | Anthropic key for the `/api/jane` proxy. Stays server-side.            |
| `VITE_JANE_PROXY`                 | Vercel       | Set to `1` so the frontend routes Jane through `/api/jane`.            |
| `VITE_FIREBASE_API_KEY` …         | local+Vercel | Firebase web-app config (6 values) — enables team sync.                |
| `VITE_TEAM_ID`                    | optional     | Private team id (default `bhumi-duo`). Same value = same team.         |

## Two phones, one team (multiplayer)

This is how you and a teammate work together on the deployed app:

1. **Create a Firebase project** at <https://console.firebase.google.com> → *Add project*.
2. **Add a Web App** (the `</>` icon) and copy the `firebaseConfig` values.
3. **Enable Firestore** → *Build → Firestore Database → Create database* → *Start in test mode* (fine for a private trial; tighten rules later).
4. Put the 6 `VITE_FIREBASE_*` values into Vercel's env vars (and `.env` for local). Optionally set a private `VITE_TEAM_ID`.
5. Deploy. **Both phones open the same URL** — they auto-join the same team. Set your name on the **You** tab; you'll see each other online, and completed steps sync live with a "✓ done by …" label.
   - To use a one-off private room, share a link with `?team=your-secret-code` — both phones open that exact link.

> Private pipelines stay on each device. Completed steps, community pipelines, proposals, and presence are shared across the team.

## Build & deploy

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

### Ship it: GitHub → Vercel

```bash
# 1. Local repo (already initialized by the project)
git add -A
git commit -m "Bhumi MVP"

# 2. Create a GitHub repo and push (use the URL GitHub gives you)
git remote add origin https://github.com/<you>/bhumi.git
git branch -M main
git push -u origin main
```

Then on **Vercel** (<https://vercel.com/new>): *Import* the GitHub repo → it auto-detects Vite (`vercel.json` is included). Add the environment variables above (`ANTHROPIC_API_KEY`, `VITE_JANE_PROXY=1`, the `VITE_FIREBASE_*` set), then **Deploy**. The `/api/jane` serverless function keeps the Anthropic key off the client.

## Design

Cream `#FAF8F2` · white cards · `#ECEAE1` borders · ink `#1A1A14`. The 333 score is Earth `#2D6B22` + People `#1E5F8C` + Momentum `#9A6A1A`. Outfit type, 1px borders, no shadows, no gradients. Motion is slow and subtle — nothing snaps, nothing bounces.

## Project structure

```
api/
  jane.js       serverless proxy — calls Anthropic with the server-side key
src/
  pages/        Onboarding · Home · Global · Library · Playground · You
  components/   ScoreRing · PipelineCard · JaneNote · TabBar · AskJane · StepCoach · TeamBar · ...
  data/         cities.js — 33-city working map (6 continents, ordered by need)
  lib/          jane.js (Jane routing) · firebase.js (team sync) · calibration.js · score.js
  context/      AppContext.jsx — profile + live team state
  styles/       tokens.css — design tokens + motion
```
