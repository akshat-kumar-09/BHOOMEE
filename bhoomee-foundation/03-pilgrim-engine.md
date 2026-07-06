# 03 — The Pilgrim Engine

> The flexibility mandate made executable. The engine turns *coordinates + trip params* into a *fully-rendered, offline-cached mission pack in Jane's frame* — with **zero place names in its logic**. Reference implementation: `pilgrim_engine.mjs` (this folder), proven against three coordinates below.

## 1. Flow

```
[declare trip at home]  OR  [cold-open on landing]
        │
        ▼
 collect trip params ── days · minutes/day · companion-per-day · capture hardware
        │                (hands_free flag ⇒ prefer photo/audio steps, no typing on the ground)
        ▼
 resolve LOCATION ───── declared place  |  device GPS on first wifi (coarse by default)
        │
        ▼
 pull BODY (Sharira) ── OSM: nearest water/coast/park, terrain, landcover/flora;
        │               EU/global open env data; dark-sky rating.   [cheap model parses, cached]
        ▼
 read SENSES (Indriya) ─ season + exact daylight computed from coords+date (no API);
        │                weather + air from Open-Meteo.             [one fetch, cached]
        ▼
 classify place_kind ── coastal | river | desert | upland | urban   (from Body, never a name)
        ▼
 instantiate missions ─ pick templates per domain × arc-stage from 02-mission-grammar
        ▼
 render pack ────────── fill slots (Body nouns + Senses state) → Jane's framing lines
        │               [STRONG model polishes framing ONCE here — the only pricey step]
        ▼
 CACHE whole pack offline ── one generation burst on wifi · ZERO live calls on the ground
```

## 2. Two entry cases (both handled)

- **Pre-trip at home:** user declares an upcoming place + dates. Engine runs the full burst on home wifi, stores the pack. On the ground the app reads from cache only.
- **Cold-open on landing:** app detects a new location, and on the *first* wifi/data it runs the same burst once, caches, then goes silent. Jane's greeting for this case is utterance #3 in the Heart canon ("New ground under your feet…").

Both paths call the identical `generatePack()` — the only difference is *when* the burst fires. This is why nothing is hardcoded per place: the same function serves home-planning for a fjord and a cold landing in a megacity.

## 3. Cost model (against the $5 credit)

- **Season + daylight**: pure math in-engine, **$0**, no API. (Solar-declination formula — genuinely place-responsive; see the 15h/17.1h/13.1h split below.)
- **Body parse + Senses fetch**: cheap model (Haiku-class) for grounding/parsing OSM+weather into `body_facts`. Fractions of a cent per place.
- **Jane's framing polish**: strong model (Sonnet/Opus-class), **once per pack**, batched across all missions in a single call — not per step, not per open. A whole trip pack ≈ one strong-model call.
- **On the ground**: **0 calls.** Everything is served from the cached pack. A live "Do it with Jane" coach chat is opt-in and gated, not the default.

## 4. Acceptance test — three wildly different coordinates

Run: `node run_acceptance.mjs` · date 2026-07-06 · trip = 3 days, 30 min/day, solo. Fixtures stand in for OSM/Open-Meteo responses (the *only* place-specific input); the engine source is scanned for place names on every run and **passes clean**.

| Coordinate | Derived `place_kind` | Season · Daylight (computed) | Nearest water (from Body) |
|---|---|---|---|
| 42.42, 18.77 (Adriatic coast) | **coastal** | summer · **15.0h** | the bay (sea, 150m) |
| 55.86, −4.25 (Glasgow) | **river** | summer · **17.1h** (white-night) | the Clyde (river, 300m) |
| 19.08, 72.88 (Mumbai) | **coastal** | summer · **13.1h** | the Arabian Sea (sea, 400m) |

### The same Water "notice" template (W1), three places
- **Adriatic:** *"There's water near you that travelled a very long way to arrive as the bay. Go and stand where it is."* → *…Photograph the way it moves under this hard midday light.*
- **Glasgow:** *"…to arrive as the Clyde. Go and stand where it is."* → *…under this long low evening light.*
- **Mumbai:** *"…to arrive as the Arabian Sea. Go and stand where it is."* → *…under this bright wet morning light.*

### The same Light "notice" template (L1) — the iterate-loop fix in action
First pass gave Mumbai *"even and clear, holding steady… a whitewashed wall"* — **templated and wrong** (Mumbai is in monsoon). Localization rule added: `wet_now` (derived from live weather) overrides both the light-quality and the surface-candidate slots. Result:
- **Adriatic:** *"…even and clear, holding steady through the day… on the water, on a sun-bright wall."*
- **Glasgow:** *"…thin and long-lasting, the way it is when the days refuse to end… on the water, on wet stone."*
- **Mumbai:** *"…diffused and silver, the way it goes when it has to come through water first… on wet stone, on the rain-dark street, caught in a puddle."*

Three genuinely different missions from one skeleton — the divergence carried entirely by `place_kind`, Body nouns, and Senses state. **This is the whole-night test, and it passes.**

### Full packs
Six-mission packs (one per domain, arc-position 1) generated for all three coordinates; see console output archived in `07-morning-report.md`. Air picks up the local wind pattern ("falling down off the mountains" vs "up the river from the west" vs "driving in hard off the sea with the monsoon"); Soil picks up local volunteer flora ("caper and fig in old stone walls" vs "buddleia and willowherb in pavement cracks" vs "a peepal seedling in a wall, grass exploding in the rain").

## 5. Engine design notes (for implementers)

- **Slot resolvers** (`SLOTS`) each have ordered candidates + a *universal true-everywhere fallback*, so a mission is never empty or false even when Body returns little. Water's fallback — *"even the rain in the gutter is her, passing through"* — is true on every coordinate.
- **`place_kind` is the only branching key.** No logic ever reads the place *name*; the name is pure output (`place_label`), surfaced only in the north-star line and Jane's framing.
- **Night-gated templates** (dark-sky L2) only appear when `night_reachable` in the trip window — automatically skipped near the poles in summer.
- **Pack sizing** scales with `days × minutesPerDay`; domains are ranked by relevance to `place_kind` (coastal leads with Water/Air; long-day latitudes promote Light).
- **Reuse from existing repo:** wrap `generatePack()` behind the current `lib/jane.js` routing; emit missions as structured blocks parsed by the existing `parseSteps()` (rename → `parseMissions()`); serve the strong-model framing polish through the existing `/api/jane` proxy so the key stays server-side. The engine replaces `data/cities.js` entirely.

## 6. Open decisions
- `[ASH TO DECIDE]` **Body data source priority** — OSM Overpass (rich, rate-limited) vs a pre-baked global tile of coarse features (cheaper, faster cold-open). Recommend: Overpass at generation time, cached per H3 cell, with a coarse fallback tile for offline cold-open.
- `[ASH TO DECIDE]` **How much strong-model polish** — templates already read well unpolished (see above). Recommend: polish only the *greeting* + the *domain-opening* framing lines per pack (highest-emotion moments), leave mid-arc task text as deterministic fill to save credit.
