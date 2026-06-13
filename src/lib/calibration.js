/* ════════════════════════════════════════════════════════════════
   THE CALIBRATION LAYER — this is the product.

   Every pipeline step is tagged (derived from its own content, never
   invented) along four dimensions:
     • time             — minutes the step takes
     • comfort          — 1 observe · 2 post · 3 write · 4 show up
     • reach_required   — does it need an audience to be heard?
     • connection_required — null | "local_gov" | "media" | "business"

   The "Start here" three starter tasks must all be:
     • ≤ the user's weekly time budget
     • at or below the user's comfort level
     • free of reach they don't have
     • free of connections they don't have
     • observable, doable, measurable

   Higher-friction tasks are LOCKED, not hidden — shown with a reason
   so people see the whole ladder, not just the bottom rung.
═══════════════════════════════════════════════════════════════════ */

// ─── Profile answer → numeric budgets ─────────────────────────────

const TIME_BUDGET = {
  "15 min": 15,
  "1 hour": 60,
  "A few hours": 180,
  "I'm all in": 100000,
};

const COMFORT_LEVEL = {
  "Just observing": 1,
  "Posting online": 2,
  "Writing": 3,
  "Showing up in person": 4,
  "All of it": 5,
};

const CONNECTION_KEY = {
  "Local government": "local_gov",
  "Media": "media",
  "Business": "business",
};

export const timeBudgetFor = (profile) =>
  TIME_BUDGET[profile?.time] ?? 60;

export const comfortLevelFor = (profile) =>
  COMFORT_LEVEL[profile?.comfort] ?? 2;

export const userConnections = (profile) =>
  new Set(
    (profile?.connections || [])
      .map((c) => CONNECTION_KEY[c])
      .filter(Boolean)
  );

export const hasReach = (profile) =>
  Boolean(profile?.reach) && profile.reach !== "None yet";

// ─── Tag inference from a step's own content ──────────────────────

export function stepMinutes(time) {
  if (!time) return 9999;
  const t = String(time).toLowerCase().trim();
  if (t.includes("varies")) return 9999;
  const num = parseFloat(t);
  if (Number.isNaN(num)) return 9999;
  if (t.includes("hr") || t.includes("hour")) return num * 60;
  return num; // minutes
}

export function inferComfort(step) {
  const text = `${step.action} ${step.detail}`.toLowerCase();
  // 4 — show up in person, physical, attend
  if (/\b(join|cleanup|clean-up|planting|bash|attend|show up|committee|volunteer|census|survey|monitor|hack|trip|walk the|dive)\b/.test(text)
      && /\b(join|cleanup|planting|bash|attend|committee|volunteer|census|hack|trip|hrs|hours)\b/.test(text)
      && stepMinutes(step.time) >= 60) return 4;
  // 3 — write / formal submission
  if (/\b(foi|email|petition|submit|write|complaint|file a|nominate|propose|report to|support a|advocate|back the|add your voice)\b/.test(text)) return 3;
  // 2 — post online / share / tag
  if (/\b(post|share|reel|tag @|tag the|social|screenshot.*post)\b/.test(text)) return 2;
  // 1 — observe, photograph, log, map, walk, call
  return 1;
}

export function inferReachRequired(step) {
  const text = `${step.action} ${step.detail}`.toLowerCase();
  return /\b(post|reel|share the|tag @|social|campaign|be loud)\b/.test(text);
}

export function inferConnectionRequired(step) {
  const text = `${step.action} ${step.detail}`.toLowerCase();
  if (/\b(councillor|council|committee|assembly|mp\b|ayuntamiento|bma|sacmex|icnf|authority|ministry|sepa|epa|carabinieri|straż|straz)\b/.test(text)) {
    // Most civic-body reporting is open to the public — only flag the
    // ones that genuinely need a standing relationship.
    if (/\b(councillor|email your councillor|committee hearing)\b/.test(text)) return "local_gov";
  }
  if (/\b(media|press|journalist|newsroom)\b/.test(text)) return "media";
  if (/\b(business owner|company partnership|sponsor)\b/.test(text)) return "business";
  return null;
}

export function tagStep(step) {
  return {
    minutes: stepMinutes(step.time),
    comfort: inferComfort(step),
    reachRequired: inferReachRequired(step),
    connectionRequired: inferConnectionRequired(step),
  };
}

// ─── Flatten a city's pipelines into a calibratable task list ─────

export function cityTasks(city) {
  const out = [];
  city.pipelines.forEach((pipe) => {
    pipe.steps.forEach((step, i) => {
      out.push({
        key: `${city.id}-${pipe.id}-${i}`,
        cityId: city.id,
        pipeId: pipe.id,
        pipeTitle: pipe.title,
        index: i,
        color: pipe.color,
        icon: pipe.icon,
        step,
        tags: tagStep(step),
      });
    });
  });
  return out;
}

const CONNECTION_LABEL = {
  local_gov: "a local-government contact",
  media: "a media contact",
  business: "a business contact",
};

function lockReason(task, profile) {
  const budget = timeBudgetFor(profile);
  const comfort = comfortLevelFor(profile);
  const conns = userConnections(profile);
  const { tags } = task;

  if (tags.reachRequired && !hasReach(profile))
    return "Needs a way to be heard — connect your social to unlock";
  if (tags.connectionRequired && !conns.has(tags.connectionRequired))
    return `Needs ${CONNECTION_LABEL[tags.connectionRequired]} to unlock`;
  if (tags.comfort > comfort)
    return "Unlocks after 3 completed tasks";
  if (tags.minutes > budget)
    return "Needs more time than you have this week — unlocks as you grow";
  return null;
}

export function fits(task, profile) {
  return lockReason(task, profile) === null;
}

/* Returns { starters: [≤3 tasks], locked: [{ task, reason }] }
   for the user's own city, calibrated to their profile. */
export function calibrate(city, profile) {
  const tasks = cityTasks(city);
  const starters = [];
  const locked = [];

  for (const task of tasks) {
    const reason = lockReason(task, profile);
    if (reason === null && starters.length < 3) {
      starters.push(task);
    } else if (reason !== null) {
      locked.push({ task, reason });
    } else {
      // fits but we already have 3 starters — show as available, no lock
      locked.push({ task, reason: null });
    }
  }

  return { starters, locked };
}
