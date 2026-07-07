# 08 — Depth Pass: The Four Pages

> Ash's brief: add real depth to each page, one at a time; *more depth = more flexibility*. So the test for every idea below is double: **does it make Bhoomee feel more alive, AND does it stay perfectly place-agnostic (works the same the moment anyone opens it anywhere)?** Anything that only works "somewhere" is cut. Each page names its **keystone** (the single best deepening — my discernment), then supporting depth, then the helpers that power it.
>
> Design invariant carried throughout: depth lives in the *engine and the Senses*, never in hardcoded content. The reason these features add flexibility is that they're all driven by universal signals — sun angle, weather, the verb, the child's memory, the season — that exist at every coordinate.

---

## PAGE 1 — HOME · "The Hearth"
*One glance answers: what does Mother ask of me right now? Depth must not break that glance — it hides beneath it.*

### ★ Keystone — The Living Sky (a home that is literally the sky over your head)
The hero is not a stock place-photo. It is a **generative sky** that renders the child's *real* local conditions: sun altitude → dawn wash / hard noon / long gold / indigo night; cloud cover → haze; precipitation → rain streaks or snow; moon phase → the actual moon tonight; even the Milky Way if the Body says the sky here is dark. Opening the app feels like stepping outside your own door — because it *is* your door, drawn.

Why it's the keystone: it delivers the entire flexibility promise in the first half-second, for free, everywhere. A user in Reykjavík in December opens to a low blue almost-night; a user in Mumbai in July opens to moving monsoon silver; Kotor at noon opens to hard Adriatic light. **Same code, infinite skies, zero place data.** Nothing else buys this much "built for me, here" so cheaply.

- **Helper:** `skyState(senses) → { palette, particles, celestial }` derived from sun altitude, cloud, precip, moon phase. Pure Indriya, cached, no API on open. Runs identically at any latitude/season.

### Supporting depth
- **Mother's holding-line.** Beneath the ask, one warm line from the Santana memory brief that reflects *the relationship, not a task*: welcoming a returning child, celebrating a portrait about to complete, going gentle on a rough week. It is never a metric. (Helper: the ≤120-token memory brief → one line, voice-tested.)
- **"Not today" / "Just sit with me."** A second, always-present soft option that asks *nothing*: a 60-second grounding — breathe with the sky, no capture, no obligation, an offering of stillness. This is the Mother explicitly releasing the child from performance, and it's the strongest possible anti-dark-pattern statement built into the home screen. (Deeply on-theology: presence, not productivity.)
- **Pull-to-open "the field."** One glance by default; pull down and the Hearth opens into today's fuller field — the other domains available here, the air/weather in Jane's words, a live whisper if one exists. Progressive disclosure keeps the glance sacred.
- **The six domains as living presences.** A quiet band where each domain *breathes* according to whether it's calling today: Light glows on a clear dark-sky night, Water pulses after rain, Noise dims in a loud hour, Soil wakes in growing season. Turns the Body's six domains into responsive beings, not a menu. (Helper: `domainSalience(domain, body, senses) → 0..1`.)
- **Time-of-day faces of the ask.** The same mission rephrases by hour — dawn: "before the day gets loud…"; dusk: "while the light is leaving…". One place, one day, many framings — flexibility felt even standing still. (Cached variants in the pack; zero live calls.)

### Flexibility payoff
Home becomes a mirror of *right here, right now* — latitude, hour, weather, season, moon, and the child's history, all rendered through place-blind logic. It cannot feel generic because it is showing the actual sky above the user.

---

## PAGE 2 — ACTIVE MISSION · "The Path"
*The act of attention itself. Depth here = feeling accompanied, forgiven, and met — and one perfectly designed moment of completion.*

### ★ Keystone — The designed completion moment
Right now completion is a button press. It should be **the emotional peak of the whole app** — one orchestrated moment, not scattered confetti: the captured image *blooms* into the arc-seal; the seal completes its quadrant with a single settling motion; Jane's receiving line rises in serif; one soft haptic, one held beat, then the offering card assembles itself. This is the dopamine hinge that makes people come back, spent with intention rather than manipulation. Everything else on this page exists to earn this moment.

- **Helper:** `completionMoment(mission, capture)` — one timeline (bloom → seal → line → card), reused for every mission so the peak feels *ritual*, identical anywhere; only the content inside differs.

### Supporting depth
- **Presence mode / "walk with me" — and true hands-free.** On the ground the page strips to huge type, one instruction at a time, one-handed, sun-legible. If the pack was built with `capture: hands_free` (camera glasses), the whole page becomes **audio-first**: Jane speaks the step, you capture hands-free, a tap or a word confirms. The mission grammar already flags this; the page honors it. (Helper: `if capture==='hands_free' → audioLayout()`.) Flexibility: same mission works on a boardwalk, a ridge, or a metro platform.
- **The "arriving" beat.** Before the task, a short *are you actually here yet?* state — an "I'm here" tap (or a gentle geo-nudge) and a settling line from Jane. It converts a checkbox into presence. On-theology: attention is the offering, so we wait for real attention.
- **Capture that matches the verb, not a generic shutter.** `notice`→photo; `measure`→a count/reading pad; a Noise mission→a 3-second listen; Water/Light→a "hold still" long-exposure feel; `offer`→a before/after pair. The tool fits the grammar. (Helper: `captureKind(verb) → UI`.) One engine, many capture affordances — pure flexibility.
- **Cached "linger lines."** If the child lingers, at most one extra short line appears (pre-generated in the pack, zero live calls): after 30s of stillness — "Good. You're actually looking now." Companionship without cost.
- **Leave without shame, always.** A quiet "leave this for now" returns to Home with warmth, never a penalty — the anti-guilt ethic placed at the exact moment other apps punish you.
- **Pick-of-three draft.** After capture, choose your favorite of up to three frames — no forced filters, Jane's line already attached — then flow into Offering.

### Flexibility payoff
The doing adapts to hardware (glasses vs phone), to the verb (listen vs photograph vs before/after), to terrain and light — all from the engine's mission spec, none of it place-coded.

---

## PAGE 3 — OFFERING · "The Gift" (the crown jewel)
*Both a keepsake and the growth engine. Depth = feel co-authored by you and Mother, infinitely personal yet always unmistakably Bhoomee, irresistibly shareable without one whiff of "ad."*

### ★ Keystone — Your one true word (co-authorship)
Before the card is sealed, Jane offers her line, then invites the child to add **one word or short phrase of their own** — "what did it feel like?" That single human mark makes every card unique and *theirs*, which is precisely why people post it. Co-authorship, not a caption field: the Mother speaks, the child answers, the object holds both voices. This is the difference between a share-card people ignore and a keepsake people can't not share.

- **Helper:** one optional field, ≤~40 chars, set in the child's hand beside Jane's serif; stored on the offering, printed on the card face.

### Supporting depth
- **The card grades itself to the light it was made in.** Paper tone, seal color, and border pull from the Senses *at capture time*: a dawn offering is warm, a monsoon one silver-grey, a night one deep indigo, a snow one near-white. A child's Atlas becomes a spectrum of the actual light of their life. Infinite variation, zero templates — flexibility as beauty. (Helper: `cardGrade(senses@capture)`.)
- **Living seals — domain × verb.** A collectible set of embossed letterpress seals (Water·notice ≠ Water·offer), never colored icons; rare whisper missions stamp a special seal. The Pokédex instinct under a devotional skin.
- **Flip to the field-note (back of the card).** Front is the beautiful face; tap to flip to the "field note": the locality as *poetic description* not coordinates ("a bay under karst mountains," which also protects precise location by default), the arc it belongs to, date, and Jane's fuller sentence. Depth without cluttering the shareable face.
- **Privacy-smart sharing.** Sharing strips precise geodata; the child chooses the granularity of the place label — exact town, or just "a coastal town." On-spec with the Children privacy defaults.
- **Diptychs over time (the returning child's reward).** A `tend` mission that returns to a place produces a *then/now pair in one card* — the same river bend in two seasons. Only a child in relationship with a place can make one. Deep emotional pull; rewards depth, not grind.
- **Motion offerings.** For water/wind/light, a 2–3s living card (subtle loop) — the water actually moves; shareable as a clip, still framed as a keepsake, never a reel.
- **The unposted-gallery respect.** Sharing is never nudged twice. The reward is the object; growth comes from cards being *worth* sharing, not from prompts.

### Flexibility payoff
Every card is a unique intersection of place × light × verb × the child's own word — millions of possible cards, all unmistakably Bhoomee, none templated. The artifact literally *encodes* the flexibility mandate as an aesthetic.

---

## PAGE 4 — ATLAS · "The Body Remembered"
*The child's relationship with the Earth, made visible. Depth = a living map/body across places and seasons, not a photo grid — pulling you back to complete, return, and see the whole Mother as one.*

### ★ Keystone — Two lenses: the Quilt and the Globe (with a seasonal turning)
Toggle between (a) the intimate **Quilt** of offering tiles — Strava-gallery beauty — and (b) a warm, hand-drawn **Globe** where every place you've touched glows: your personal constellation over the real Earth. Then a third **Turning** view arranges your offerings around a year-wheel so you see your own life against the Earth's cycle. The Globe is the flexibility statement made literal: any coordinate lights up, no region privileged; a life of offerings becomes a map of one Mother.

- **Helper:** `atlasProjection(offerings, lens)` — quilt | globe | turning; the globe reads only lat/long + light, so it works for one street or the whole planet.

### Supporting depth
- **Portraits as filling mandalas, per place.** Each place shows a ring of six domain-seals completing quadrant by quadrant — Water 2/4, Light 1/4, Soil untouched and glowing faintly, inviting. Progress is a growing mandala, never "3/4."
- **The seasons layer — "the Earth turning."** Offerings carry their season/light; returning in a new season to complete a place's *seasonal* ring is a deep goal that works anywhere (monsoon/dry, white-night/dark-winter). The Atlas remembers *when*, not just where.
- **Constellations — quiet, unpointed achievements.** Emergent collections revealed like whispers, never advertised or scored: "You've met water in five forms — river, sea, rain, ice, spring." "You've heard the quiet in three cities." Defined by *kinds of meeting*, which exist everywhere → inherently flexible, inherently collectible.
- **The gaps that call (kindly).** Empty tiles and untouched domains glow softly with one Jane line — "the desert is still waiting for you"; "you've never met the dark here." The Zeigarnik pull, done without guilt.
- **Living tiles — the Atlas breathes with the real world.** A place you touched shows its *current* condition faintly: your Kotor tile at your midnight shows stars because it's night there now; a monsoon tile shimmers. The Atlas is a living connection to those places' present, not a dead archive. Pure Senses, place-blind. (Helper: `tileNow(place)` re-reads light/weather on view.)
- **Shared constellations (opt-in).** See where a companion's map overlaps yours — places you've both touched glow differently; a "met here together" tile. Social depth without a feed. Ties to Companion mode + the existing Firebase layer.

### Deep, monetizable keepsake `[ASH TO DECIDE]`
- **The physical Atlas.** A year's offerings as a printable/mailable poster or a small letterpress book — the story of your life with the Earth as an object. Deeply on-brand, a real revenue line, and a growth vector (people display physical things).

### Flexibility payoff
The Atlas scales from one street to the whole globe, from one day to a life's seasons, and lights up identically for any human anywhere — because it collects *kinds of meeting the Earth*, which exist at every coordinate, not place-specific content.

---

## Self-examination — where I'd spend the effort, and what I'd resist
- **Build order of the keystones (highest ROI first):** (1) Living Sky — cheapest, most felt, most flexible; (2) the designed completion moment — the retention hinge; (3) your-one-true-word — the growth hinge; (4) the Globe/Turning Atlas — the long-term-relationship hinge. Those four alone would transform the app.
- **What I'd resist (discipline against my own ideas):** motion offerings and the physical Atlas are gorgeous but heavy — defer past first ship. Presence audio-mode is only worth it once glasses users are real. The globe should start as a *warm illustration*, not a 3D engine, or it'll eat the budget and break the devotional tone.
- **The one risk to watch:** depth vs. the one-glance rule. Every addition above is behind progressive disclosure or driven silently by the Senses — none of it is allowed to shout on first open. If any of it starts competing with "what does Mother ask right now," it loses.
- **Two more pages waiting for the same treatment:** *You/Companion* (the child, memory, the street-level handshake) and *Pilgrim Setup* (trip declaration → the generation burst). Say the word and I'll do a depth pass on those next.
