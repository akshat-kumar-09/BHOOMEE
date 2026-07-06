# 02 — The Mission Grammar

> A mission is never written by hand for a place. It is *generated* by composing a location-agnostic template with live Body + Senses data. This file defines the composition rules. **Flexibility invariant:** every template in here must read as alive in a fjord town, a megacity, and a desert with only the runtime slots changed. If a template only works somewhere specific, it is not a template — it is a hardcode, and it does not belong here.

---

## 1. Formal grammar

```
mission        := domain × verb × time_budget × mode × companion
domain         := Air | Water | Light | Noise | Soil | Waste
verb           := notice | trace | measure | gather | offer | tend
time_budget    := 3m | 8m | 15m | 30m | 60m        // minutes the child has
mode           := Resident | Pilgrim
companion      := solo | with_one | group
capture        := handheld | hands_free            // hands_free = camera glasses etc.
```

A **mission instance** is a template chosen for `(domain, verb, arc_position)`, rendered against a **place context** produced by the engine:

```
place_context := {
  coords, place_kind,            // e.g. coastal | river | desert | upland | urban-dense …
  season, daylight_phase,        // Senses
  weather, air_reading,          // Senses
  body_facts[]                   // Body: 1–3 true local features (a named water body,
                                 //   a dark-sky rating, a dominant tree, a wind pattern)
}
```

### The six verbs (precise definitions)

| Verb | Meaning | Produces | Cost |
|---|---|---|---|
| **notice** | Direct the child's attention to one real thing and have them confirm they met it. | A photo/clip + a one-word feeling | free (perception only) |
| **trace** | Follow something across space or time to its source or its next place (where does this water go? where did this wind come from?). | A short path, a photo at the end | low effort |
| **measure** | Put a number or comparison on the world with the body or a reading (count, pace, shade temperature, decibels-by-ear, star-count). | A count/reading + photo | low |
| **gather** | Collect *observations* (never take from nature) — several instances of one kind (three kinds of stone, five sounds, the shapes of shade). | A small set (2–5 captures) | medium |
| **offer** | A small act of care given *to* the Mother, not taken from her (pick up one piece of waste, water a thirsty street tree, leave a place better). | Before/after photo | medium |
| **tend** *(added)* | Return to a place already met and note what changed. Only unlocks once the child has an existing tile there. Powers relational memory + the Resident depth loop. | A "then/now" pair | low, repeatable |

*Two verbs beyond the brief's five (`tend`) — added because the arc's fourth stage ("contribute") and the Resident depth loop both need a verb for **returning and caring over time**, which `offer` (a one-time act) doesn't capture. Held to one addition; `notice/trace/measure/gather/offer` cover the rest. `[ASH TO DECIDE]` whether `tend` earns its place or folds into `offer`.*

---

## 2. Arc structure — the north star is always visible

Every **domain portrait** is a four-stage arc. A child completes a domain by moving through it:

```
notice  →  understand  →  document  →  contribute
(verb: notice)  (verb: trace/measure)  (verb: gather)  (verb: offer/tend)
```

- **notice** — meet the domain here at all (the air, this water, this dark).
- **understand** — trace/measure to grasp how it *works* in this place.
- **document** — gather a small portrait; the Atlas tile starts filling.
- **contribute** — give one act of care; the tile completes and becomes an offering.

Every mission, on screen, states its place in the arc as a single quiet line — the **north star**, never hidden:

> **mission {N} of {M} in your {domain} portrait of {place}**

e.g. *"mission 2 of 4 in your Water portrait of {{place}}"*. `{M}` is usually 4 (one per arc stage) but the engine may compress to 2–3 for a short Pilgrim trip or expand for a deep Resident domain. The line is rendered by the engine, never authored into a template.

---

## 3. Fifteen location-agnostic templates

*Each: **template text** (what the child does, slots in `{{ }}`), **Jane's framing** (her voice, ≤2 lines, passes the Heart voice test), **artifact**, **time budget**, and **solo / shared** variants. All are place-blind — the slots carry every specific.*

### AIR

**A1 · notice · "Where the wind goes"**
- Template: *Step outside. Find one thing the wind is moving right now — {{wind_visible_candidate}} — and watch where it decides to go. Photograph it.*
- Jane: *"The air here is carrying something today, {{wind_direction}} and older than it looks. Go and see where it's headed."*
- Artifact: photo of moving air-made-visible. Budget: 8m.
- Shared: *each of you follow a different moving thing, then compare where the wind took them.*

**A2 · measure · "The breath of this place"**
- Template: *Stand still for {{count}} slow breaths. Note whether the air today is {{air_reading_plain}} — and one smell it carries.*
- Jane: *"Breathe with me a moment. This is the exact air {{place}} is making today."*
- Artifact: a breath-count + one-word smell + selfie-or-sky photo. Budget: 3m.
- Shared: *breathe together, then each name a different smell.*

### WATER

**W1 · notice · "Meet the nearest water"**
- Template: *Go to the nearest water you can reach on foot — {{local_water_form}}. Stand with it for a minute. Photograph the way it moves (or holds still).*
- Jane: *"There's water near you that travelled a very long way to arrive as {{local_water_form}}. Go and stand where it is."*
- Artifact: photo of the water. Budget: 15m.
- Shared: *one films the water, one records its sound; combine.*

**W2 · trace · "Where does it go"**
- Template: *Follow {{local_water_form}} in one direction for as long as your time allows. Photograph where you had to stop — that's the next place it's going without you.*
- Jane: *"Water is always on its way somewhere. Walk with it a while and see where it's headed after you turn back."*
- Artifact: photo at the turn-back point. Budget: 30m.
- Shared: *split — one follows it upstream toward where it came from, one downstream; meet and swap photos.*

**W3 · offer · "Leave the water better"**
- Template: *At the water's edge, gather any one piece of waste that doesn't belong and take it to a bin. Photograph the spot before and after.*
- Jane: *"This edge has been carrying something that isn't hers. Lift one thing away — that's all. She'll feel it."*
- Artifact: before/after pair. Budget: 15m.
- Shared: *each take a different stretch of the edge.*

### LIGHT

**L1 · notice · "The quality of today's light"**
- Template: *Find where the {{daylight_phase}} light lands best near you — {{light_landing_candidate}}. Photograph the light itself, not the object.*
- Jane: *"The light is doing something particular right now — {{light_quality}}. Go and catch it before it moves on."*
- Artifact: a photo *of light*. Budget: 8m.
- Shared: *each photograph the same light from opposite sides.*

**L2 · measure · "How dark can it get"** *(dark-sky)*
- Template: *After nightfall, get to the darkest spot you safely can and count how many stars you can hold in one glance. {{darksky_hint}}.*
- Jane: *"When the light goes, the older lights come back. See how many of them {{place}} lets you keep tonight."*
- Artifact: star-count + night photo. Budget: 15m.
- Shared: *count separately, then compare — the sky is the same, your eyes aren't.*

### NOISE

**N1 · notice · "Five sounds"**
- Template: *Close your eyes where you are and separate five distinct sounds. Record {{count}} seconds of the one that's most alive.*
- Jane: *"Every place has a voice made of many voices. Sit still and let {{place}} speak — how many can you tell apart?"*
- Artifact: audio clip + list of five. Budget: 8m.
- Shared: *each list five; find the one only you heard.*

**N2 · trace · "Follow the quiet"**
- Template: *Walk from where you are toward the quietest place you can find in {{time_budget}}. Photograph where the quiet begins.*
- Jane: *"There's a hush somewhere near you, holding still under all the noise. Walk toward it and find its edge."*
- Artifact: photo at the quiet's edge. Budget: 15m.
- Shared: *walk apart, then text each other when you each find quiet — meet in the middle.*

### SOIL

**S1 · notice · "What grows without asking"**
- Template: *Find one living thing growing where no one planted it — {{wild_growth_candidate}}. Get close. Photograph how it made room for itself.*
- Jane: *"Look down. Something is growing here that no one invited, and it came anyway. That's her, being stubborn and alive."*
- Artifact: close-up photo. Budget: 8m.
- Shared: *each find a different volunteer plant; compare their survival tricks.*

**S2 · gather · "The ground's materials"**
- Template: *Without taking anything, photograph {{count}} different materials the ground here is made of — {{soil_material_candidates}}. Line the photos up.*
- Jane: *"The ground under {{place}} is not one thing. Kneel and meet what she's made of here."*
- Artifact: a set of 3–4 photos. Budget: 15m.
- Shared: *each gather a different set; you'll rarely overlap.*

### WASTE

**Wa1 · offer · "One thing lifted"**
- Template: *Pick up the first piece of waste you see that isn't yours and bin or recycle it. Photograph it in your hand before it goes.*
- Jane: *"One thing. Not the whole street — one thing that isn't hers to carry. Lift it, and let that be enough today."*
- Artifact: photo-in-hand. Budget: 3m.
- Shared: *count how many between you in ten minutes — no pressure, just company.*

**Wa2 · trace · "Where does it go from here"**
- Template: *Find the nearest bin, recycling point, or collection spot and photograph it. That's the door your waste leaves the world through — meet it.*
- Jane: *"Everything you set down goes somewhere. Go and see the door it leaves through — most people never look."*
- Artifact: photo of the disposal point. Budget: 8m.
- Shared: *find two different doors and compare.*

### CROSS-DOMAIN (arc-closers, work in any domain)

**X1 · tend · "Return and see what changed"**
- Template: *Go back to a place you've already met here — {{prior_tile_place}} — and photograph what's different now: the light, the water level, what's grown or gone.*
- Jane: *"You've stood here before. Come back and see — nothing she makes ever holds perfectly still. What's changed since you last looked?"*
- Artifact: then/now pair (pulls the old photo from the Atlas). Budget: 8m.
- Shared: *both return; each notice a different change.*

**X2 · offer · "A small tending"**
- Template: *Do one small kind thing for a living thing near you that's struggling — {{tending_candidate}}. Photograph the care, not yourself.*
- Jane: *"Something near you is thirsty, or crowded, or forgotten. Give it one small kindness — she notices every one."*
- Artifact: photo of the act. Budget: 15m.
- Shared: *tend the same thing together.*

---

## 4. Localization rules — how a template becomes *of a place*

The template is a skeleton. The engine fills every `{{slot}}` from two layers, in this order:

1. **Body (Sharira)** supplies the *nouns of the place* — the actual water body, the dominant tree, the dark-sky rating, the terrain kind. Sourced from OpenStreetMap (nearest water/park/coast), EU/global open environmental data, dark-sky datasets. These are **facts**, fetched cheaply, cached.
2. **Senses (Indriya)** supplies the *state of the place right now* — season, daylight phase, weather, air reading. These tune wording (a template says "after nightfall" only if it's not already night; "on foot" becomes "just outside your door" in bad weather).

**Slot resolution rules:**
- Every slot has an **ordered candidate list + a universal fallback**, so a mission is *never* empty or false. If Body has no named river, `{{local_water_form}}` walks down: named river → any waterway → coast → lake → *"the nearest water — even the rain in the gutter is her, passing through."* The fallback is still true everywhere, because water is everywhere.
- **Never assert a fact the Body didn't return.** No slot invents a landmark. If unknown, generalize up the candidate list until something true remains.
- **Senses gate templates.** L2 (dark-sky) is only offered when night is reachable in the trip window; W-templates prefer real water when Body finds it within the child's time budget, else fall back to rain/humidity framing.
- **`place` is a *label*, not logic.** The place name appears only in the rendered north-star line and Jane's framing — pure runtime output. No template branches on *which* place it is; only on `place_kind` (coastal/river/desert/urban/upland), which is a Body-derived category, not a name.

### Worked example — the SAME Water template (W1 "Meet the nearest water") rendered three ways

*Template text is identical. Only the slots and one Senses-tuned clause differ.*

**River city** (Body: major named river within 400m; Senses: autumn, overcast, midday)
> **mission 1 of 4 in your Water portrait of {{place}}**
> Jane: *"There's water near you that travelled a very long way to arrive as this river through the middle of everything. Go and stand where it is."*
> Task: *Go to the river — it's close. Stand with it for a minute. Photograph the way it moves under this grey autumn light.*

**Coastal town** (Body: open sea + harbour within 300m, no river; Senses: summer, bright, morning)
> **mission 1 of 4 in your Water portrait of {{place}}**
> Jane: *"There's water near you that travelled a very long way to arrive as the whole open sea at your doorstep. Go and stand where it is."*
> Task: *Walk down to where the sea meets the harbour wall. Stand with it for a minute. Photograph the way the morning light breaks on the moving water.*

**Desert city** (Body: no surface water within range; nearest is a seasonal wash / irrigation channel; Senses: dry, hot, late afternoon)
> **mission 1 of 4 in your Water portrait of {{place}}**
> Jane: *"Water is the rare guest here — which is exactly why she matters most. Go and find where she's kept."*
> Task: *Find where water is held or moves here — a channel, a fountain, a green line of trees that only exist because water runs underneath. Stand with it a minute. Photograph how this place keeps its water in the late heat.*

Same skeleton, three living missions, zero hardcoded branches on the city name — the divergence is entirely carried by `place_kind`, Body nouns, and Senses state. That is the flexibility contract, proven on one template. The Pilgrim Engine (`03`) runs this for all six domains at arbitrary coordinates.
