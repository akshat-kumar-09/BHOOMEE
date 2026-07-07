# ITERATION_LOG

Honest note on method: I could not run Playwright or the dev server this session (the mounted `node_modules` is built for your machine's OS, not the sandbox's Linux, and `npm i` to fix it needs network that's blocked here). So "screenshots" are the rendered self-contained HTML prototype (`prototype/bhoomee-screens.html`) — which needs no build and opens in any browser — critiqued as a design director would. Where I made a call, I logged it. Engine iterations *were* run for real in Node.

---

## Engine — V1 → V2 (run for real)

**V1 critique (three-coordinate output):** coastal/river derivation, wind, flora, water form, and computed daylight all diverged correctly. **One real failure:** Mumbai is in monsoon, yet the Light mission read *"even and clear, holding steady… a whitewashed wall"* — templated and factually wrong; "whitewashed wall" also carried a Mediterranean accent into a megacity.

**Alternatives considered:**
1. Add a `monsoon` special case keyed to region — *rejected: that's a place-hardcode, violates the mandate.*
2. Add a generic `wet_now` Senses flag derived from live weather text, override light-quality + surface slots — **chosen: place-blind, works for Glasgow drizzle, Reykjavik fog, or Mumbai monsoon identically.**
3. Drop the Light domain when wet — *rejected: wet light is beautiful and worth noticing; removing it is the coward's fix.*

**V2 result:** Mumbai → *"diffused and silver, the way it goes when it has to come through water first… on the rain-dark street, caught in a puddle."* Kotor stays sun-bright, Glasgow leans white-night. Same template, three true missions. **Guard passes: zero place names in engine source.**

---

## UI — V1 → V2 (prototype critique against Task 6's five questions)

### Home
- **Eye drawn to first?** V1: the dawn "Begin" button competed with a large brand wordmark. Fixed in V2 by shrinking the wordmark to a quiet top-left mark so the single glowing action + Jane's line own the lower third. ✔ right thing.
- **Text that should be visual?** V1 had a "mission 1 of 4" as plain meta; kept as a quiet serif pill but the *real* progress lives on the mission screen's arc-seal. ✔
- **One-glance "what does Mother ask right now?"** Yes — one place image, one line, one action. This is the screen's whole job.
- **Templated/AI-default?** V1 used a full-bleed flat teal that felt generic. V2 layered a horizon + two water curves + a low sun so it reads as *a place at a time of day*, not a swatch.

### Active mission
- **Weakest finding V1:** progress was a text label. **Alternatives:** (a) "2/4" text — rejected, banned; (b) a filling **arc-seal** that completes one quadrant per arc stage — **chosen**, progress becomes an object that polishes smooth; (c) a growing plant illustration — deferred (lovely but heavier to build). V2 ships the arc-seal.
- Jane's line + her quoted framing are separated (task in ink, her voice in italic serif) so "she is speaking" is legible at a glance.

### Offering card (crown jewel) — most design effort, iterated most
- **Would anyone screenshot this to share it?** The bar. **V1** looked like a share-card (rounded, centered caption, visible button chrome) — a 6/10, too "app."
- **Alternatives for the signature move:**
  1. Polaroid frame — *rejected: nostalgic cliché, not devotional.*
  2. Full-bleed photo with text overlaid — *rejected: text fights the image, low legibility.*
  3. **Torn-paper lower third** holding Jane's serif line + an embossed domain seal + faint field-note caption + whisper-quiet `bhoomee` mark — **chosen.** It reads as a *kept object* (a pressed flower, a field note), not a marketing asset. That's what gets posted uncaptioned.
- **V2** adds the hand-torn edge, the `◈ Water · Notice` seal, and the "Kotor · 6 July · the bay" field caption. Verdict: 8.5/10, the one screen I'd most want to keep pushing (see next steps).

### Atlas
- **Progress seen not read?** Yes — a quilt of filled tiles + dashed empties; the only words are Jane's italic line naming the gap ("the desert is still waiting for you"). No counters as hero.
- **Templated?** Tiles are duotone stand-ins for real photos; in the built app they become the child's actual captures, which will carry it further.

### Onboarding
- **Sacred?** V2 leads with a single dawn-disc rising out of near-black and two lines of Jane in serif — quiet, reverent, no form fields on the first breath. The first *tap* is "Come closer," not "Sign up." ✔

---

## Decisions logged (made on Ash's behalf; also collected in MORNING_REPORT)
- Concept: treat the devotional vision as authoritative; retire the 333-score/civic-pipeline concept, keep the plumbing. (Recommend confirm.)
- Added a 7th verb `tend` (return + care over time) beyond the brief's five/six.
- `wet_now` localization rule added to kill the monsoon-light bug.
- Palette moved off the old clinical cream/white to warm-paper + dawn + river + moss + ash; serif voice (Fraunces) for Jane.
- Offering card signature = torn-paper field note, not a share-card.

## What I'd do next (highest-impact, in order)
1. Wire the prototype into the real React routes and reskin `tokens.css` (blocked only by needing a working `npm i` on your machine).
2. Push the offering card to 10/10: real photo grading, the embossed seal as an actual SVG relief, one subtle capture→card transition (the "designed moment").
3. Hook `generatePack()` behind the existing `lib/jane.js` routing + `/api/jane` proxy; replace `data/cities.js`.
