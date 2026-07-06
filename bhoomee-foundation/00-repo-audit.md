# 00 — Repo Audit (honest, one page)

*Read of `akshat-kumar-09/BHOOMEE` @ `main` (4 commits, public, live at bhoomee.vercel.app). Audited from the repo's README, `emergent_prompt_jane.md`, and `src/lib/jane.js`. I could read the repo over the web but not clone/run it this session — so runtime behaviour (actual screens, bundle size) is inferred from source, not observed. Flagged where that matters.*

## What exists

The deployed app is **"Bhumi"** — a *civic-action* app, not the devotional attention app this brief describes. Its thesis is "pipeline invisibility": people care but don't know what to *do*, so it turns each city's problems into calibrated, doable civic tasks. Concretely:

- **Stack:** Vite + React 18 + Tailwind v4, Anthropic SDK (`claude-sonnet-4-5`), Firebase Firestore for live team sync, deployed on Vercel with a `/api/jane` serverless proxy that keeps the API key server-side.
- **Structure:** `src/pages` (Onboarding, Local, Global, Playground, You), `src/components` (ScoreRing, PipelineCard, JaneNote, TabBar, AskJane, StepCoach, TeamBar…), `src/data/cities.js` (**"the 33-city source of truth"**), `src/lib` (`jane.js`, `firebase.js`, `calibration.js`, `score.js`), `src/context/AppContext.jsx`, `src/styles/tokens.css`.
- **Flows:** 5-tap onboarding → a "333 score" per city (Earth/People/Momentum) → calibrated "start here" tasks with a *locked ladder* above them → Playground where Jane co-designs civic "pipelines" and emits structured `[STEP]` blocks → live team/crew coordination.
- **Jane today:** routed through `lib/jane.js` with a clean three-tier fallback (direct SDK in dev → serverless proxy in prod → in-character mocks offline). Her voice is *"witty, specific, warm, anchored to one concrete action, never preachy"* — e.g. *"Scottish Water has 3,617 overflow pipes and monitors 123. You're building the map they won't."*

## What's reusable (keep, adapt)

- **`lib/jane.js` routing layer — the best thing in the repo.** The SDK→proxy→mock three-tier pattern is exactly the cost-conscious shape this brief wants. Keep the architecture; repurpose the call sites for pre-generation instead of live per-turn calls.
- **`/api/jane` serverless proxy.** Keeps the key server-side — directly satisfies the security half of the API constraint. Reuse as-is.
- **`parseSteps()` structured-block parser.** Robust balanced-brace JSON extraction from model output. This is precisely the mechanism the Mission Grammar needs to emit structured missions. Reuse.
- **Tap-only onboarding pattern** (no typing, fast). The *interaction* is reusable; the *questions* get re-authored for the devotional frame.
- **Firebase live-sync** → repurposable for **Companion mode** (the street-level handshake, shared day) rather than "crew sprints."
- **Vite + Tailwind + Vercel + demo-mode-offline** baseline. Solid foundation; no reason to start from scratch. The brief's instruction to work in the repo is right.

## Dead weight (relative to the new vision)

- **`src/data/cities.js` — the 33-city static roster.** This is the disease named in the brief: *place hardcoded into content and logic* (Glasgow default, Mumbai worst, Oslo best, hand-authored scores/headlines/pipelines per city). The Pilgrim Engine must **replace** this with runtime generation from Body + Senses at arbitrary coordinates. This file should not survive into the new architecture as a content source.
- **The 333 score + locked ladder.** A gamified civic-scoring system with "Unlocks after 3 completed tasks" gating. This collides head-on with Task 6's *no-dark-patterns* rule and the *"a Mother is not disappointed"* streak philosophy. Cut or radically re-conceive.
- **The civic-organizing concept itself** (councillor emails, overflow-pipe evidence, crew sprints). It's activism tooling. The new Bhoomee is *devotional attention → offering → Atlas*. These are different products. Most of Playground / StepCoach / crew coordination is orthogonal to the new vision.
- **Live per-turn API calls** on every Ask Jane / coach / playground beat — wrong for the $5 budget and impossible for the offline-on-the-ground Pilgrim requirement.

## The one big honest finding — a concept fork `[ASH TO DECIDE]`

The repo is a **witty civic-action organizer**. The brief describes a **devotional, poetic attention practice** whose Jane is *Bhūmi Devi as Mother* (warm, ancient, zero-lecture, one line at a time). These are not the same app, and the current Jane's register (witty, action-anchored, data-quoting) actively violates the new canon's voice test (no statistics, no lecture, no "the map they won't"). **My recommendation, and what these foundation docs assume:** treat the new vision as authoritative and rebuild the *concept* on the reusable *plumbing* — keep `jane.js` routing, the proxy, `parseSteps`, onboarding mechanics, Firebase, the Vite/Vercel base; retire the 333 score, the city roster, and the civic-pipeline concept. **Flag for you:** confirm you want the civic-action concept *replaced* (not run alongside). Everything downstream assumes yes.

## Reuse map (one line each)

| Old | New role |
|---|---|
| `lib/jane.js` routing | Keep; point at pre-generation + cache, not live turns |
| `/api/jane` proxy | Keep as-is (server-side key) |
| `parseSteps()` | Emit structured **missions**, not civic steps |
| Onboarding taps | Re-author questions for Resident/Pilgrim setup |
| `firebase.js` | Companion handshake + shared day |
| `data/cities.js` | **Delete as content source** → Pilgrim Engine generates places at runtime |
| `score.js` / 333 | Retire → replaced by Atlas (visual progress, no scoring) |
| `tokens.css` | Evolve toward the earth/soil/water/dawn palette in `06-design-system.md` |
