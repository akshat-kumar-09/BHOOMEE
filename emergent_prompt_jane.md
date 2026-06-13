# Build Jane — premium environmental action app

Most people care about the planet but freeze because they can't see how individual action connects to outcomes. Jane solves this "pipeline invisibility": every city's problems shown as a sequence of small, doable, coordinated steps — calibrated to the individual.

**Tagline: "The Earth has work for you."**

**Reference file: `jane_mvp.jsx`** (uploaded). Single source of truth for the 33 cities, scores, pipelines, design tokens, Jane's voice. Mirror it precisely — don't invent data.

---

## Stack
- React + Vite + Tailwind
- Anthropic Claude API for "Ask Jane" — model `claude-sonnet-4-5`
- React state only (no backend, no localStorage)

---

## Three flows

### 1. Onboarding (first visit)

Jane introduces herself in one line, then asks 5 questions across 5 quick screens. Cards with tappable answers — no typing. Smooth, fast, friendly.

- **Time** — *"How much do you actually have each week?"* → 15 min · 1 hour · A few hours · I'm all in
- **Life** — *"What's your day-to-day right now?"* → Student · Working · Parent · Retired · Mixed
- **Reach** — *"Anywhere you can be heard?"* → Social media · Community group · Blog/newsletter · None yet
- **Comfort** — *"What feels doable today?"* → Just observing · Posting online · Writing · Showing up in person · All of it
- **Connections** — *"Know anyone in...?"* (multi-select) → Local government · Media · Business · None — that's fine

Store answers in state as a `profile` object.

After Q5, Jane writes a single-line acknowledgment in her voice (e.g. *"Got it — an hour a week, online, ready to post. I'll start you small."*) then routes to Local with **3 personalized starter tasks** at the top of the page.

### 2. Local
Personalized to the profile. Layout: brand, tab switcher, city header with 333 score ring and Earth/People/Momentum breakdown, Jane's briefing card, **"Start here" — your 3 starter tasks**, then all active pipelines (expandable), Ask Jane input.

### 3. Global
33 cities ranked **lowest score first** (most urgent at top). Each row: rank, mini score ring, city + country + "YOU" tag if user's city, headline, direction arrow, expand chevron. Click expands inline to briefing + pipelines.

---

## The calibration layer (this is the product)

Every step in the data has tags:
- `time` — already in data (e.g. "3 min", "30 min", "3 hrs")
- `comfort` — 1 (observe) · 2 (post) · 3 (write) · 4 (show up)
- `reach_required` — boolean
- `connection_required` — null | "local_gov" | "media" | "business"

**Rules for the "Start here" 3 starter tasks:**
- All ≤ user's time budget
- All at or below user's comfort level
- None require reach the user doesn't have
- None require connections the user doesn't have
- Each must be **observable, doable, and measurable** (a photo, a call, a count, a post, a screenshot)

**Higher-friction tasks are locked, not hidden.** Show them with a small lock icon and tooltip: *"Unlocks after 3 completed tasks"* or *"Needs a way to be heard — connect your social to unlock"*. People should see the ladder, not just the bottom rung.

**Example calibrations** (build the logic to produce these patterns):

> Profile: 15 min/week, working, social media, "just observing", no connections
> Starter list:
> 1. *Walk past your nearest river. Photograph it. Upload.* (5 min)
> 2. *Screenshot the air quality at the school nearest you at 8:30am.* (5 min)
> 3. *Spot one street tree that looks dead or dying. GPS-tag it.* (10 min)

> Profile: A few hours, parent, blog/newsletter, "writing", local-gov connection
> Starter list:
> 1. *Email your councillor with one question about the Clyde overflow data.* (15 min)
> 2. *Write 200 words on your blog about one local issue you noticed this week.* (45 min)
> 3. *Document the councillor's response or silence after 7 days.* (10 min)

Jane writes the actual phrasing per task using her voice rules — these are illustrations of fit.

---

## 333 score (terse)
Total = Earth (111) + People (111) + Momentum (111). Tiers: Critical <110 red · Struggling 110-149 amber · Working 150-194 green · Rising 195+ blue. Direction: rising ↑ / stalling → / declining ↓. All values per city in the JSX.

---

## Design — premium, NOT AI-generated

- Background `#FAF8F2` (cream) · cards `#FFFFFF` · borders `#ECEAE1` · text `#1A1A14`
- Accents: Earth `#2D6B22` · People `#1E5F8C` · Momentum `#9A6A1A`
- Font: Outfit (Google Fonts) weights 300–700
- Max-width 680px · mobile-first · rounded 10–14px · 1px borders · **no shadows, no gradients, no glow**
- Generous whitespace. Restraint over decoration.

---

## Jane's voice — critical

2–4 sentences. Witty, specific, warm. Anchored to one concrete action. **Never preachy. Never generic. Never emoji-stuffed.**

✅ *"Scottish Water has 3,617 overflow pipes and monitors 123. You're building the map they won't."*
❌ *"Let's work together to protect our beautiful planet! 🌱"*

Dozens of examples in the JSX. Match the register exactly.

---

## Ask Jane

Bottom of every page. POST to `https://api.anthropic.com/v1/messages`:

```
model: claude-sonnet-4-5
max_tokens: 600
system: "You are Jane — voice of Mother Earth translated into action. User is in [CITY] (score [TOTAL]/333, [DIRECTION]). Their profile: [PROFILE]. Reply in 2-4 sentences, specific and witty, anchored to one real action they could take given their time and comfort level. Never preachy."
messages: [{ role: "user", content: [QUESTION] }]
```

Render reply in cream card styled like the briefing.

---

## Acceptance
1. Onboarding completes in 5 taps; profile stored; starter list generated
2. Local page shows Glasgow with 3 personalized "Start here" tasks above the pipelines
3. Locked tasks show with reason
4. Global ranks all 33 cities, Mumbai (78) first, Oslo (231) last, "YOU" tag on Glasgow
5. Steps check/uncheck, progress updates live
6. Ask Jane returns in-character replies from Claude API
7. Design looks restrained and intentional — not template-generated

---

## Build order
1. Onboarding + profile state
2. Calibration logic + starter list
3. Local page
4. Global hierarchy
5. Ask Jane
6. Polish — voice consistency, spacing, type
