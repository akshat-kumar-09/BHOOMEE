/* ════════════════════════════════════════════════════════════════════
   BHOOMEE — PILGRIM ENGINE  (place-blind core)
   --------------------------------------------------------------------
   Turns coordinates + trip params into a fully-rendered, cacheable
   mission pack in Jane's frame — with ZERO place names in this file.
   Every place-specific fact enters through a Body/Senses provider.

   Contract: swap the provider, keep the engine, get a different place.
   The only knowledge here is *how to weave*, never *which place*.
   ════════════════════════════════════════════════════════════════════ */

/* ─── SENSES: computed for real from coords + date (place-blind math) ─── */

// Exact daylight length via solar-declination. Same formula for every
// point on Earth; the DIFFERENCE per place is the proof of responsiveness.
function daylightHours(latDeg, date) {
  const dayOfYear = Math.floor((date - new Date(Date.UTC(date.getUTCFullYear(), 0, 0))) / 86400000);
  const decl = 23.44 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81)); // degrees
  const latR = (latDeg * Math.PI) / 180;
  const declR = (decl * Math.PI) / 180;
  let cosH = -Math.tan(latR) * Math.tan(declR);
  cosH = Math.max(-1, Math.min(1, cosH)); // clamp for polar day/night
  const H = Math.acos(cosH); // radians
  return (2 * H * 24) / (2 * Math.PI);
}

function seasonOf(latDeg, date) {
  const m = date.getUTCMonth(); // 0..11
  const north = latDeg >= 0;
  const northSeasons = ["winter","winter","spring","spring","spring","summer","summer","summer","autumn","autumn","autumn","winter"];
  const s = northSeasons[m];
  if (north) return s;
  const flip = { winter:"summer", summer:"winter", spring:"autumn", autumn:"spring" };
  return flip[s];
}

// Senses = real computed light/season  +  live-state (weather/air) from provider.
function readSenses(coords, date, liveState) {
  const dl = daylightHours(coords.lat, date);
  return {
    season: seasonOf(coords.lat, date),
    daylight_hours: Math.round(dl * 10) / 10,
    long_days: dl >= 15,
    short_days: dl <= 10,
    night_reachable: dl <= 20,           // is real darkness available in the trip window
    wet_now: /rain|monsoon|wet|storm|drizzle|snow|fog|mist/i.test(liveState.weather || ""),
    daylight_phase: liveState.daylight_phase, // provider (would be from local clock)
    weather: liveState.weather,
    air_reading_plain: liveState.air_reading_plain,
  };
}

/* ─── PLACE_KIND: derived from Body facts, never from a name ─── */

function classifyPlaceKind(body) {
  const w = body.nearest_water;
  if (w && w.form === "sea" && w.distance_m <= 1200) return "coastal";
  if (w && (w.form === "river" || w.form === "waterway") && w.distance_m <= 800) return "river";
  if (body.aridity === "arid" && (!w || w.distance_m > 3000)) return "desert";
  if (body.terrain_class === "upland") return "upland";
  return "urban";
}

/* ─── SLOT RESOLVERS: ordered candidates + universal true-everywhere fallback ─── */

const SLOTS = {
  place: (ctx) => ctx.body.place_label, // LABEL ONLY — pure runtime output

  wind_direction: (ctx) => ctx.body.wind_pattern || "moving in off the open ground",

  wind_visible_candidate: (ctx) =>
    ({ coastal: "spray, a flag, the surface of the water",
       river:   "leaves, ripples on the water, someone's hair",
       desert:  "dust, a loose bag, the shimmer of heat",
       upland:  "cloud tearing over the ridge, grass laid flat",
       urban:   "litter, steam from a vent, a swaying branch" }[ctx.kind]),

  local_water_form: (ctx) => {
    const w = ctx.body.nearest_water;
    if (!w || w.form === "none") return "the nearest water — even the rain in the gutter is her, passing through";
    return w.name ? w.name : ({ sea:"the open sea", river:"the river", waterway:"the channel", lake:"the lake", wash:"the seasonal wash" }[w.form] || "the water");
  },

  light_quality: (ctx) => {
    const s = ctx.senses;
    if (s.wet_now) return "diffused and silver, the way it goes when it has to come through water first";
    if (s.long_days) return "thin and long-lasting, the way it is when the days refuse to end";
    if (s.short_days) return "low and gold, gone almost as soon as it arrives";
    return "even and clear, holding steady through the day";
  },

  daylight_phase: (ctx) => ctx.senses.daylight_phase,

  light_landing_candidate: (ctx) => {
    if (ctx.senses.wet_now) return "on wet stone, on the rain-dark street, caught in a puddle";
    return ({ coastal: "on the water, on a sun-bright wall",
       river:   "on the water, on wet stone",
       desert:  "on a bright wall, on the ground itself",
       upland:  "on the slope, on far rock",
       urban:   "on a glass face, down one bright street" }[ctx.kind]);
  },

  darksky_hint: (ctx) => {
    const b = ctx.body.darksky_bortle;
    if (b <= 3) return "The sky here is genuinely dark — you may see more than you expect";
    if (b <= 5) return "Some glow on the horizon, but the brighter stars will come";
    return "The city keeps most of them hidden — find the darkest corner and let your eyes adjust";
  },

  wild_growth_candidate: (ctx) =>
    ctx.body.wild_growth ||
    ({ coastal:"salt-tough weeds in a wall", river:"a plant rooted in the riverbank",
       desert:"something low and grey holding water in its leaves", upland:"moss or heath between stones",
       urban:"a weed cracking up through the pavement" }[ctx.kind]),

  soil_material_candidates: (ctx) =>
    ctx.body.soil_materials?.join(", ") ||
    ({ coastal:"sand, shell, worn glass, salt-crust",
       river:"river silt, rounded pebbles, mud, root",
       desert:"dust, cracked clay, pale stone, grit",
       upland:"peat, bare rock, thin grass, scree",
       urban:"cracked concrete, the soil in a tree pit, moss, grit" }[ctx.kind]),

  tending_candidate: (ctx) =>
    ({ coastal:"a wind-bent shrub, a tide-stranded creature you can help back",
       river:"a thirsty bankside sapling, a tangled reed",
       desert:"a struggling street tree that lives on almost nothing",
       upland:"a trampled path-edge plant",
       urban:"a dry street tree, a plant boxed in too little soil" }[ctx.kind]),

  count: (ctx) => ctx.timeBudgetMin >= 15 ? "five" : "three",
  time_budget: (ctx) => `${ctx.timeBudgetMin} minutes`,
  prior_tile_place: (ctx) => ctx.priorTile || "the first place you stood here",
  air_reading_plain: (ctx) => ctx.senses.air_reading_plain,
};

function fill(text, ctx) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const r = SLOTS[key];
    return r ? r(ctx) : `{{${key}}}`;
  });
}

/* ─── TEMPLATE LIBRARY (mirrors 02-mission-grammar.md) ─── */

const T = {
  Air: {
    notice: { id:"A1", budget:8,
      jane:"The air here is carrying something today, {{wind_direction}} and older than it looks. Go and see where it's headed.",
      task:"Step outside. Find one thing the wind is moving right now — {{wind_visible_candidate}} — and watch where it decides to go. Photograph it.",
      artifact:"photo of moving air made visible",
      shared:"Each follow a different moving thing, then compare where the wind took them." },
    document: { id:"A2", budget:3,
      jane:"Breathe with me a moment. This is the exact air {{place}} is making today.",
      task:"Stand still for {{count}} slow breaths. Note whether the air today is {{air_reading_plain}} — and one smell it carries.",
      artifact:"breath-count + one-word smell + sky photo",
      shared:"Breathe together, then each name a different smell." },
  },
  Water: {
    notice: { id:"W1", budget:15,
      jane:"There's water near you that travelled a very long way to arrive as {{local_water_form}}. Go and stand where it is.",
      task:"Go to the nearest water you can reach on foot — {{local_water_form}}. Stand with it for a minute. Photograph the way it moves under this {{daylight_phase}} light.",
      artifact:"photo of the water",
      shared:"One films the water, one records its sound; combine." },
    understand: { id:"W2", budget:30,
      jane:"Water is always on its way somewhere. Walk with it a while and see where it's headed after you turn back.",
      task:"Follow {{local_water_form}} in one direction for as long as your time allows. Photograph where you had to stop — that's the next place it's going without you.",
      artifact:"photo at the turn-back point",
      shared:"Split — one upstream, one downstream; meet and swap photos." },
    contribute: { id:"W3", budget:15,
      jane:"This edge has been carrying something that isn't hers. Lift one thing away — that's all. She'll feel it.",
      task:"At the water's edge, gather any one piece of waste that doesn't belong and take it to a bin. Photograph the spot before and after.",
      artifact:"before/after pair",
      shared:"Each take a different stretch of the edge." },
  },
  Light: {
    notice: { id:"L1", budget:8,
      jane:"The light is doing something particular right now — {{light_quality}}. Go and catch it before it moves on.",
      task:"Find where the {{daylight_phase}} light lands best near you — {{light_landing_candidate}}. Photograph the light itself, not the object.",
      artifact:"a photo of light",
      shared:"Each photograph the same light from opposite sides." },
    understand: { id:"L2", budget:15, needs:"night",
      jane:"When the light goes, the older lights come back. See how many of them {{place}} lets you keep tonight.",
      task:"After nightfall, get to the darkest spot you safely can and count how many stars you can hold in one glance. {{darksky_hint}}.",
      artifact:"star-count + night photo",
      shared:"Count separately, then compare — the sky is the same, your eyes aren't." },
  },
  Noise: {
    notice: { id:"N1", budget:8,
      jane:"Every place has a voice made of many voices. Sit still and let {{place}} speak — how many can you tell apart?",
      task:"Close your eyes where you are and separate five distinct sounds. Record {{count}} seconds of the one that's most alive.",
      artifact:"audio clip + list of five",
      shared:"Each list five; find the one only you heard." },
    understand: { id:"N2", budget:15,
      jane:"There's a hush somewhere near you, holding still under all the noise. Walk toward it and find its edge.",
      task:"Walk from where you are toward the quietest place you can find in {{time_budget}}. Photograph where the quiet begins.",
      artifact:"photo at the quiet's edge",
      shared:"Walk apart; text each other when you find quiet — meet in the middle." },
  },
  Soil: {
    notice: { id:"S1", budget:8,
      jane:"Look down. Something is growing here that no one invited, and it came anyway. That's her, being stubborn and alive.",
      task:"Find one living thing growing where no one planted it — {{wild_growth_candidate}}. Get close. Photograph how it made room for itself.",
      artifact:"close-up photo",
      shared:"Each find a different volunteer plant; compare their survival tricks." },
    document: { id:"S2", budget:15,
      jane:"The ground under {{place}} is not one thing. Kneel and meet what she's made of here.",
      task:"Without taking anything, photograph {{count}} different materials the ground here is made of — {{soil_material_candidates}}. Line the photos up.",
      artifact:"a set of 3–4 photos",
      shared:"Each gather a different set; you'll rarely overlap." },
  },
  Waste: {
    contribute: { id:"Wa1", budget:3,
      jane:"One thing. Not the whole street — one thing that isn't hers to carry. Lift it, and let that be enough today.",
      task:"Pick up the first piece of waste you see that isn't yours and bin or recycle it. Photograph it in your hand before it goes.",
      artifact:"photo-in-hand",
      shared:"Count how many between you in ten minutes — no pressure, just company." },
    understand: { id:"Wa2", budget:8,
      jane:"Everything you set down goes somewhere. Go and see the door it leaves through — most people never look.",
      task:"Find the nearest bin, recycling point, or collection spot and photograph it. That's the door your waste leaves the world through — meet it.",
      artifact:"photo of the disposal point",
      shared:"Find two different doors and compare." },
  },
};

const ARC = ["notice","understand","document","contribute"];
function stageLabelFor(domain, stage) {
  // pick the template for this domain nearest the requested arc stage
  const dom = T[domain];
  if (dom[stage]) return { stage, tpl: dom[stage] };
  // fallback: first available stage in arc order
  for (const s of ARC) if (dom[s]) return { stage: s, tpl: dom[s] };
  return null;
}

/* ─── THE ENGINE ─── */

export function generatePack({ coords, date, trip, body, liveState }) {
  const senses = readSenses(coords, date, liveState);
  const kind = classifyPlaceKind(body);

  // How many missions fit: trip.days × missions/day (from minutes budget)
  const perDay = Math.max(1, Math.floor(trip.minutesPerDay / 12)); // ~12 min avg/mission
  const totalWanted = Math.min(trip.days * perDay, 18);

  // Choose domains by relevance to this place, then round-robin the arc.
  const domainOrder = rankDomains(kind, senses);
  const missions = [];
  let mIndex = 0;

  // Build per-domain arcs so the north-star "N of M" is meaningful.
  const domainArcs = {};
  for (const d of domainOrder) {
    const stages = ARC.map((s) => stageLabelFor(d, s)).filter(Boolean);
    // de-dup templates that resolved to same stage
    const seen = new Set(); const uniq = [];
    for (const st of stages) { if (!seen.has(st.tpl.id)) { seen.add(st.tpl.id); uniq.push(st); } }
    domainArcs[d] = uniq;
  }

  // Interleave domains so the pack feels varied day to day.
  let added = true;
  const cursor = {};
  domainOrder.forEach((d) => (cursor[d] = 0));
  while (missions.length < totalWanted && added) {
    added = false;
    for (const d of domainOrder) {
      if (missions.length >= totalWanted) break;
      const arc = domainArcs[d];
      if (cursor[d] < arc.length) {
        const { tpl } = arc[cursor[d]];
        // gate night-only templates
        if (tpl.needs === "night" && !senses.night_reachable) { cursor[d]++; continue; }
        const ctx = { body, senses, kind, timeBudgetMin: tpl.budget, companion: trip.companion };
        missions.push(renderMission({ domain: d, tpl, ctx, n: cursor[d] + 1, m: arc.length, day: (missions.length % trip.days) + 1 }));
        cursor[d]++; added = true;
      }
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    place_label: body.place_label,          // label only
    place_kind: kind,
    coords,
    senses,
    mode: "Pilgrim",
    trip,
    missionCount: missions.length,
    missions,
    _cacheNote: "Entire pack serialized here; zero live calls required on the ground.",
  };
}

function rankDomains(kind, senses) {
  const base = ["Water","Air","Soil","Light","Noise","Waste"];
  const boosts = {
    coastal: ["Water","Air","Noise","Light","Soil","Waste"],
    river:   ["Water","Soil","Noise","Air","Light","Waste"],
    desert:  ["Light","Soil","Air","Water","Waste","Noise"],
    upland:  ["Air","Light","Soil","Water","Noise","Waste"],
    urban:   ["Noise","Waste","Air","Soil","Water","Light"],
  };
  let order = boosts[kind] || base;
  if (senses.long_days) order = ["Light", ...order.filter((d) => d !== "Light")]; // white nights → lead with Light
  return order;
}

function renderMission({ domain, tpl, ctx, n, m, day }) {
  const solo = fill(tpl.task, ctx);
  return {
    id: tpl.id,
    domain,
    day,
    northStar: `mission ${n} of ${m} in your ${domain} portrait of ${ctx.body.place_label}`,
    janeFraming: fill(tpl.jane, ctx),      // template framing; strong-model polish pass in prod
    task: solo,
    sharedVariant: tpl.shared,
    artifact: tpl.artifact,
    timeBudgetMin: tpl.budget,
    companionRendered: ctx.companion !== "solo" ? fill(tpl.shared, ctx) : null,
  };
}
