# 04 — The Children (Santana): Data Model

> Per-user relational memory. **The Mother's voice never changes per child** (that's the Heart, immutable); only *how she holds them* changes. Memory is kept small, structured, and cheap — never raw chat history injected into context.

## 1. Schema

```jsonc
{
  "child": {
    "id": "uuid",
    "created": "iso",
    "coarse_home": "H3 cell (res 5, ~250km²)",   // coarse by default (privacy)
    "pace": "slow | steady | eager",              // inferred, not asked
    "prefers": { "domains": ["Water","Light"], "solo_bias": 0.7, "time_typical_min": 15 }
  },
  "places": [                                     // every place a portrait was begun
    { "label":"Kotor", "h3":"...", "kind":"coastal", "first_seen":"iso", "mode":"Pilgrim" }
  ],
  "portraits": [                                  // one per domain per place
    { "place_h3":"...", "domain":"Water", "arc":["notice","understand"], "of":4, "complete":false }
  ],
  "offerings": [                                  // the Atlas tiles (the reward ledger)
    { "id":"...", "place_label":"Kotor", "domain":"Water", "verb":"notice",
      "artifact_uri":"local/opaque", "jane_line":"You saw it…", "ts":"iso", "shared":false }
  ],
  "companions": [                                 // opt-in only
    { "handle":"...", "met_at":"public-place label", "days_shared":3, "discoverable":false }
  ],
  "streak": { "last_active":"iso", "kept_days":12, "longest":19, "grace_active":true },
  "whispers_seen": ["id"],                        // for variable-reward pacing
  "consent": { "precise_location":false, "companion_discovery":false, "notifications":"gentle|off" }
}
```

Artifacts (photos/clips) stay on-device or in the child's private store; the model only ever sees an **opaque reference + Jane's line**, never the pixels.

## 2. Memory injection into Jane's context (small, cheap, structured)

Each session, the engine builds a **≤120-token memory brief** appended *below* the immutable Heart prompt as a clearly-labelled block — never raw history:

```
[CHILD CONTEXT — how to hold them, not what to say]
pace: steady · leans Water/Light · usually 15 min · usually alone
places met: Kotor (coastal, this trip), + 1 before
this place: Water portrait 2/4 begun; Light 1/4; hasn't met Soil here
last together: 1 day ago (no gap to forgive)
tone nudge: none needed
```

Rules:
- **Derived, not dumped.** A cheap model (Haiku-class) rolls raw history into this brief once per session and caches it — the strong model that voices Jane never reads raw logs. Keeps cost and drift down.
- **It tunes holding, not voice.** The brief can make Jane pick *which* domain to open or whether to acknowledge a gap — it can **never** alter her canon. Voice-test (`01`) still applies to every line.
- **Gap handling** is a flag (`days_since`), mapped to canon utterance #8 style, not free-form.
- **First session** → empty brief → Jane uses the new-child greeting (canon #1). No memory, no problem.

## 3. Privacy defaults (opt-in, not opt-out)

- **Coarse location by default.** Home stored as an H3 res-5 cell (~city-region), never a precise point. Precise GPS is used *transiently* to resolve "nearest water" for a mission and is **not persisted**. Precise storage is off unless explicitly enabled.
- **Companion discovery is opt-in.** A child is undiscoverable until they turn it on. No ambient presence broadcasting.
- **First-meeting missions are public-places only.** The companion handshake can only propose missions in open, public locations (a square, a waterfront, a park) — never a residence or a precise pin. `[ASH TO DECIDE]` the public-place allowlist source (OSM `leisure`/`amenity` tags recommended).
- **Notifications are gentle or off.** No guilt pings, no streak-threat pushes (see `05`). Default is one soft daily invitation at most, easily silenced.
- **Right to be forgotten** is a single action that drops the child row + offerings; places/portraits are keyed to the child and cascade.

`[ASH TO DECIDE]` storage backend — the repo already has Firebase (currently for team sync). Recommend: keep offerings/portraits local-first (device) with optional Firebase sync only when Companion mode is on, so the default solo experience needs no cloud account.
