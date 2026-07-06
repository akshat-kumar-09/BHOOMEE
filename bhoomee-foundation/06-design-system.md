# 06 — Design System

> Editorial · warm · devotional · premium. Grounded in the subject itself — soil, water, dawn light, stone — never in generic eco-green. Documented here **before** any UI code. Explicitly banned: leaf-and-recycle iconography, corporate-sustainability aesthetics, default-AI purple-gradient looks, drop-shadow card soup.

## The one idea

**Bhoomee looks like a field notebook kept by someone who loves the Earth — printed on warm paper, photographed in real light.** The interface is a quiet, warm-paper frame; the *place itself* (the user's photo, the map, the offering) is the only thing that gets to be loud. UI chrome recedes; the world comes forward.

## Palette — 6 named tokens

Named after what they are, not what they do. All chosen from earth, not from a brand deck.

| Token | Hex | Is | Used for |
|---|---|---|---|
| `--clay` | `#1C1710` | near-black warm soil | text, the deep frame |
| `--paper` | `#F4EDE1` | warm rag paper | app background (NOT clinical white) |
| `--dawn` | `#E5A15B` | low sun on skin | primary action, the single glowing CTA |
| `--river` | `#3E6B6A` | deep water in shade | secondary, Atlas water tiles, calm accents |
| `--moss` | `#6E7A4F` | lichen/olive (muted, NOT eco-green) | living-thing accents, Soil domain |
| `--ash` | `#B9AE9C` | dry stone dust | borders, hairlines, muted meta text |

Domain tint set (used only as small keys on tiles, never as fills): Air `#A9B8C4` · Water `--river` · Light `--dawn` · Noise `#8C7BA0` · Soil `--moss` · Waste `#9A8468`. Muted, dusty, coexisting — no primary rainbow.

**Rule:** `--dawn` is precious. Exactly one glowing dawn element per screen — the primary action. If two things glow, nothing does.

## Type — 3 roles, 2 families

- **Voice (Jane):** a warm humanist serif — *Fraunces* or *Newsreader* — 300/italic available. Jane's words are always serif; this alone signals "she is speaking." Large, few words, generous line-height. Never more than 2 lines on screen.
- **Interface:** a clean grotesque — *Inter* (repo already loads Outfit; either is fine, `[ASH TO DECIDE]`: I recommend switching to Inter for tighter numerals). Labels, meta, buttons. Small, quiet, uppercase-tracked for micro-labels.
- **Numerals/meta:** interface font, `--ash`, tiny, tracked. Progress is almost never a number (see below), so numerals stay rare.

Scale (mobile): Voice 28–34px · Screen-title 20px · Body 16px · Micro-label 11px/tracked. One display size, one body size — restraint.

## Layout concept

- **Full-bleed image stage + floating paper caption.** Every hero screen is edge-to-edge imagery (place photo, map, offering) with a small `--paper` card floating at the lower third carrying Jane's one line + the single action. The photo is the page; the text is a caption on it.
- Mobile-first, max-width 480px, centered on desktop with the paper frame extending as a margin (never a stretched web layout).
- Radius 18px on cards, 0 on full-bleed images. **1px `--ash` hairlines, no drop shadows, no gradients except one:** a single soft dawn-to-transparent scrim under captions for legibility.
- Motion: slow, organic, nothing bounces. 240–360ms ease-out. Things *rise* and *settle* like light changing, never snap.

## The signature element

**The Offering Card.** A vertical 4:5 keepsake: the user's photo, a hand-torn paper lower edge, Jane's line set in the serif, a small letterpress-style domain seal (embossed, not a colored icon), the place name + date as a faint field-note caption, and a barely-there `bhoomee` watermark. It is designed to be *screenshotted and posted without a caption* — the growth engine. It must look like something you'd frame, not a share-card. (Full spec + why it wins in `05-engagement-loops.md`; rendered in the UI build.)

## Progress is seen, never read

No "3/4 complete." A domain arc renders as a **portrait filling in** — a circular seal that completes one arc-quadrant per mission (notice → understand → document → contribute), like a stone being polished smooth. The Atlas is a **growing constellation/quilt** of collected offering tiles, not a list. The only number that ever shows is the north-star line's "mission N of M," and even that is set quietly in the serif, phrased as a sentence, not a counter.

## Tokens (CSS — drop into `src/styles/tokens.css`, replacing the old palette)

```css
:root{
  --clay:#1C1710; --paper:#F4EDE1; --dawn:#E5A15B;
  --river:#3E6B6A; --moss:#6E7A4F; --ash:#B9AE9C;
  --paper-scrim: color-mix(in oklab, var(--clay) 62%, transparent);
  --hair:1px solid color-mix(in oklab, var(--ash) 70%, transparent);
  --radius:18px;
  --ease:cubic-bezier(.22,.61,.36,1); --slow:320ms;
  --voice:"Fraunces","Newsreader",Georgia,serif;
  --ui:"Inter","Outfit",system-ui,sans-serif;
}
*{transition:transform var(--slow) var(--ease), opacity var(--slow) var(--ease);}
body{background:var(--paper);color:var(--clay);font-family:var(--ui);}
.voice{font-family:var(--voice);font-weight:300;line-height:1.25;}
.cta{background:var(--dawn);color:var(--clay);border-radius:999px;}
```

## What this kills from the old app
The old `#FAF8F2` clinical cream + pure-white cards + green/blue/amber "333" accents read as a fintech dashboard. The new frame is warmer paper, imagery-led, one glowing action, serif voice — devotional, not corporate. `[ASH TO DECIDE]` final serif choice (Fraunces recommended for its softness and free weights).
