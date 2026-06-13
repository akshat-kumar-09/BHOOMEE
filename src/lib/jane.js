/* ════════════════════════════════════════════════════════════════
   JANE — the voice of the earth, translated into action.

   Three entry points:
     askJane({ question, city, profile })        — Ask Jane on Local/Global
     playgroundReply({ history, city, profile }) — co-design in the Playground
     coachJane({ history, step, cityName })      — perform one step, live

   Request routing (in order):
     1. VITE_ANTHROPIC_API_KEY present → call the Anthropic SDK directly
        (handy for local dev).
     2. Otherwise → POST to the /api/jane serverless proxy, which holds
        the key server-side (ANTHROPIC_API_KEY) so it's never shipped to
        the browser. Enable it by setting VITE_JANE_PROXY=1.
     3. Neither → in-character mock replies, so the app always works.
═══════════════════════════════════════════════════════════════════ */

import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-4-5";
const MAX_TOKENS = 800;

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const PROXY =
  import.meta.env.VITE_JANE_PROXY === "1" || import.meta.env.VITE_JANE_PROXY === "true";

let client = null;
function getClient() {
  if (!API_KEY) return null;
  if (!client) {
    client = new Anthropic({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
  }
  return client;
}

export const janeIsLive = () => Boolean(API_KEY) || PROXY;

async function complete({ system, messages, maxTokens = MAX_TOKENS }) {
  const anthropic = getClient();
  if (anthropic) {
    const res = await anthropic.messages.create({ model: MODEL, max_tokens: maxTokens, system, messages });
    return textOf(res);
  }
  // Serverless proxy (production). Key stays on the server.
  const res = await fetch("/api/jane", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, messages, model: MODEL, max_tokens: maxTokens }),
  });
  if (!res.ok) throw new Error(`Jane proxy responded ${res.status}`);
  const data = await res.json();
  return data.text || "";
}

const profileLine = (profile) => {
  if (!profile) return "We don't know much about them yet.";
  const bits = [];
  if (profile.time) bits.push(`about ${profile.time} a week`);
  if (profile.life) bits.push(profile.life.toLowerCase());
  if (profile.reach && profile.reach !== "None yet") bits.push(`can be heard via ${profile.reach.toLowerCase()}`);
  if (profile.comfort) bits.push(`comfortable: ${profile.comfort.toLowerCase()}`);
  const conns = (profile.connections || []).filter((c) => c && !c.startsWith("None"));
  if (conns.length) bits.push(`knows people in ${conns.join(", ").toLowerCase()}`);
  return bits.length ? `Their profile: ${bits.join("; ")}.` : "We don't know much about them yet.";
};

// ─── Ask Jane (Local / Global) ────────────────────────────────────

export async function askJane({ question, city, profile, scope = "local" }) {
  const q = (question || "").trim();
  if (!q) return "";

  const context =
    scope === "local" && city
      ? `You are speaking to someone in ${city.name}, ${city.country}. The city scores ${city.score.total}/333 and is ${city.direction}. Key issue: ${city.headline} ${profileLine(profile)}`
      : `You are speaking about the global picture across the 33 cities Bhumi tracks. Be willing to compare cities and zoom out to planetary scale. ${profileLine(profile)}`;

  const system = `You are Jane — the voice of Mother Earth, translated into language people can act on. ${context} You are warm, witty, specific, and brief. Never preachy, never vague, never emoji-stuffed. Every reply should make the person feel they can do one real thing. 2-4 sentences. You are not an AI assistant; you are Jane.`;

  if (!janeIsLive()) return mockAskJane(q, city, scope);
  try {
    return (await complete({ system, messages: [{ role: "user", content: q }] })) || "Jane is out by the river. Try again shortly.";
  } catch {
    return "Jane is listening to the wind. Ask again in a moment.";
  }
}

// ─── Playground (co-design a pipeline) ─────────────────────────────

const PLAYGROUND_SYSTEM = (cityName, profile) =>
  `You are Jane — the voice of the earth translated into action — helping the user co-design a real environmental civic pipeline for their city, ${cityName}.

Your role in the Playground is to TURN AN IDEA INTO A SHARP, DOABLE, MEASURABLE PIPELINE. Every reply must include at least one sharpening question.

Sharpening dimensions in order:
1. What exactly is the problem? (specific, local, observable)
2. Who needs to do what? (person-count per step)
3. What is the first 5-minute action a single person could take today?
4. What is the bottleneck step — the one that won't move without unity?
5. How will we know it worked? (measurable outcome)

When you have enough to draft a step, emit a structured block at the end of your reply like this, on a separate line:

[STEP] {
  "action": "...",
  "detail": "...",
  "time": "5 min",
  "peopleNeeded": 10,
  "jane": "..."
}

The frontend parses these blocks and adds them to the pipeline draft card. Otherwise speak normally in 2-4 sentences.

Voice rules: witty, specific, never preachy, never generic, never emoji-stuffed. Anchored to one real action. ${profileLine(profile)}`;

export async function playgroundReply({ history, city, profile }) {
  const cityName = city?.name || "your city";
  const system = PLAYGROUND_SYSTEM(cityName, profile);
  const messages = (history || [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  if (!janeIsLive()) return mockPlayground(history, cityName);
  try {
    return (await complete({ system, messages })) || "Jane lost the thread for a second. Say that again?";
  } catch {
    return "Jane is listening to the wind. Try that again in a moment.";
  }
}

// ─── Action coach (perform one specific step, in real time) ───────

const COACH_SYSTEM = (step, cityName, profile) =>
  `You are Jane — the voice of the earth, translated into action. The user is in ${cityName} and is about to DO this exact action right now: "${step.action}".
What it involves: ${step.detail || "(no extra detail)"}
${step.jane ? `Your earlier nudge was: "${step.jane}"` : ""}

Coach them through actually performing it, in real time, with speed and momentum. Give the precise NEXT micro-step only — the exact words to say, links to open, phone numbers, app or form names, and what to look for. One micro-step at a time. Keep each reply to 2-3 sentences and end by asking what they see or what they've got, so they can move to the next beat. Witty, specific, never preachy, never generic, never emoji-stuffed. They want to sprint — keep them flowing. ${profileLine(profile)}`;

export async function coachJane({ history, step, cityName, profile }) {
  const system = COACH_SYSTEM(step, cityName || "your city", profile);
  const messages = (history || [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  if (!janeIsLive()) return mockCoach(history, step);
  try {
    return (await complete({ system, messages })) || "Lost you for a second — what are you looking at right now?";
  } catch {
    return "Jane is listening to the wind. Try that again in a moment.";
  }
}

// ─── Crew coordinator (Jane runs point for the duo) ───────────────

const COORDINATOR_SYSTEM = (cityName, profile) =>
  `You are Jane — the voice of the earth, now running point for a small crew doing a time-boxed environmental sprint in ${cityName}.

You are given the crew (with who's online), the pipeline's steps with which are done and by whom, and the clock. Your job is to ACTIVELY COORDINATE them — not cheer, coordinate.

In 3-5 short sentences:
- Assign the next concrete move to each ONLINE person BY NAME, so no two people do the same step.
- Call the single most important handoff happening right now.
- Give one blunt pace read against the time left — are they on track to finish by sundown or not?
- End with the one thing to do in the next 10 minutes.

Address the crew directly by name. Witty, specific, decisive. Never preachy, never generic, no emoji, no markdown headers. ${profileLine(profile)}`;

function crewSummary({ pipelineTitle, crew, steps, clock, remainingMins, me }) {
  const lines = [];
  lines.push(`Mission: "${pipelineTitle}".`);
  lines.push(`Crew: ${crew.map((c) => `${c.name}${c.id === me?.id ? " (this is me)" : ""} — ${c.online ? "online now" : "away"}`).join("; ")}.`);
  lines.push("Steps:");
  steps.forEach((s, i) => {
    lines.push(`  ${i + 1}. ${s.action} (${s.time}) — ${s.done ? `DONE${s.by ? ` by ${s.by}` : ""}` : "not done"}`);
  });
  const left = remainingMins >= 60 ? `${Math.floor(remainingMins / 60)}h ${remainingMins % 60}m` : `${remainingMins}m`;
  lines.push(`Clock: it's ${clock} now. Estimated work left across unfinished steps: ${left}.`);
  return lines.join("\n");
}

export async function coordinateJane({ pipelineTitle, crew, steps, clock, remainingMins, me, cityName, profile }) {
  const system = COORDINATOR_SYSTEM(cityName || "your city", profile);
  const content = crewSummary({ pipelineTitle, crew, steps, clock, remainingMins, me });

  if (!janeIsLive()) return mockCoordinate({ crew, steps, me });
  try {
    return (await complete({ system, messages: [{ role: "user", content }], maxTokens: 400 })) || mockCoordinate({ crew, steps, me });
  } catch {
    return mockCoordinate({ crew, steps, me });
  }
}

// ─── Parse [STEP] {...} blocks out of a reply ─────────────────────

export function parseSteps(text) {
  if (!text) return { clean: "", steps: [] };
  const steps = [];
  const tag = "[STEP]";
  let visible = "";
  let cursor = 0;

  while (cursor < text.length) {
    const tagIdx = text.indexOf(tag, cursor);
    if (tagIdx === -1) {
      visible += text.slice(cursor);
      break;
    }
    visible += text.slice(cursor, tagIdx);
    const braceIdx = text.indexOf("{", tagIdx + tag.length);
    if (braceIdx === -1) {
      cursor = tagIdx + tag.length;
      continue;
    }
    const obj = extractBalancedObject(text, braceIdx);
    if (!obj) {
      cursor = braceIdx + 1;
      continue;
    }
    try {
      const parsed = JSON.parse(obj.json);
      if (parsed && parsed.action) {
        steps.push({
          action: String(parsed.action),
          detail: parsed.detail ? String(parsed.detail) : "",
          time: parsed.time ? String(parsed.time) : "5 min",
          peopleNeeded: Number(parsed.peopleNeeded) || 10,
          peopleDone: 0,
          jane: parsed.jane ? String(parsed.jane) : "",
        });
      }
    } catch {
      /* parsing failed — ignore this block, show plain text only */
    }
    cursor = obj.end + 1;
  }

  return { clean: visible.trim(), steps };
}

function extractBalancedObject(text, startIdx) {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = startIdx; i < text.length; i++) {
    const ch = text[i];
    if (escaped) { escaped = false; continue; }
    if (ch === "\\") { escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return { json: text.slice(startIdx, i + 1), end: i };
    }
  }
  return null;
}

// ─── Helpers ───────────────────────────────────────────────────────

function textOf(res) {
  return res?.content?.find((b) => b.type === "text")?.text || "";
}

// ─── In-character mocks (used when no key and no proxy) ───────────

function mockAskJane(q, city, scope) {
  if (scope !== "local" || !city)
    return "Thirty-three cities, one planet, and the same pattern everywhere: the mechanisms to act already exist, they're just waiting for someone to use them. Pick the city you stand in and start there. Where are your feet right now?";
  return `In ${city.name}, the bottleneck isn't knowledge — it's witnesses. ${city.headline} Pick one stretch of water or one street this week and just document what you see. What's the nearest piece of nature you could reach on foot today?`;
}

const MOCK_STEP = `\n\n[STEP] {\n  "action": "Photograph the spot you noticed",\n  "detail": "Go back with your phone. Take three photos: wide, close, and one with a landmark. GPS-tag them so the location is provable.",\n  "time": "10 min",\n  "peopleNeeded": 15,\n  "jane": "A timestamped photo is evidence. A memory is an anecdote. Bring back evidence."\n}`;

function mockPlayground(history, cityName) {
  const turns = (history || []).filter((m) => m.role === "user").length;
  if (turns <= 1) {
    return `Good — something real you actually saw beats a thousand abstract worries. Before we build anything: where exactly is it, and how often does it happen? Pin it down to one street, one stretch, one corner of ${cityName}.`;
  }
  if (turns === 2) {
    return `Now we're sharpening. Here's the first rung — small enough that one person could do it today, concrete enough to count.${MOCK_STEP}\n\nWho else on your street would notice the same thing? We need to know how many hands this really takes.`;
  }
  return `That's a pipeline taking shape. The bottleneck is usually the step that needs more than one person — name it, and we'll design around it. What would tell you, six weeks from now, that this actually worked?${MOCK_STEP}`;
}

function mockCoordinate({ crew, steps, me }) {
  const online = (crew || []).filter((c) => c.online);
  const meName = me?.name || (online[0]?.name) || "you";
  const mate = online.find((c) => c.id !== me?.id);
  const nextUndone = (steps || []).findIndex((s) => !s.done);
  const doneCount = (steps || []).filter((s) => s.done).length;
  const total = (steps || []).length || 1;
  const nextStep = nextUndone >= 0 ? steps[nextUndone] : null;

  if (!nextStep) {
    return `That's the whole sprint cleared between you — ${doneCount}/${total}. ${meName}, post the final map and tag River Action; ${mate ? mate.name : "your teammate"}, send the link to one person who lives by that river. Hand off the relay in the next 10 minutes while it's hot.`;
  }
  if (mate) {
    const after = steps[nextUndone + 1];
    return `${doneCount}/${total} down — you're moving. ${meName}, take "${nextStep.action}" now. ${mate.name}, don't wait on them — start "${(after || nextStep).action}" in parallel so you're not both idle. That overlap is your only shot at finishing by sundown; next 10 minutes, both of you move.`;
  }
  return `${doneCount}/${total} done and you're solo on the crew right now, ${meName}. Take "${nextStep.action}" next and ping your teammate to come online — this sprint is built for two. Next 10 minutes: ${nextStep.action.toLowerCase()}.`;
}

function mockCoach(history, step) {
  const turns = (history || []).filter((m) => m.role === "user").length;
  if (turns <= 1) {
    return `Right — "${step.action}". Don't prep, just move: phone out, camera ready, head to the nearest point you can reach on foot. Tell me the moment you're standing there.`;
  }
  if (turns === 2) {
    return `Good. Now capture it properly — three shots: wide, close, and one with a landmark so the place is provable, with location on. What does it show you?`;
  }
  return `That's the evidence. Log it with a time and a one-line note, then we'll get it in front of someone who can move. What's the single truest sentence you'd say about what you saw?`;
}
