# Landing Page Design System

*A working style reference — base structure & type from **rerun.io**, signature "rainbow gradient" treatment from the **TwelveLabs** screenshots. Built to be handed to a designer/AI as a single source of truth for a simple product landing page.*

> **Note on sourcing:** The TwelveLabs values below (colors, spacing, component shapes) were sampled directly from the screenshots you provided, so those are close to exact. The rerun.io values are reconstructed from its published structure and visual style (I couldn't pull live computed CSS in this session — no browser/DOM access to the site). Treat the rerun.io hex codes as a very close approximation of "warm paper background + near-black ink + rust accent," not a pixel-perfect extraction. Worth a quick eyeball-check against the live site before you ship.

***

## 1. Design Philosophy

Two references, two jobs:

* **rerun.io → the bones.** Calm, editorial, confident whitespace. Hairline dividers instead of boxes/shadows. Small-caps or mono labels over each section. One accent color used sparingly. This is what makes the page feel like a serious technical product, not a marketing template.
* **TwelveLabs → the signature moment.** The soft multi-color "rainbow" gradient wash and 3D rounded gradient shapes are the one place the page gets playful and memorable. Used everywhere it would compete with the rerun-style calm.

The combined system: **mostly quiet, neutral, editorial layout — with one bold rainbow-gradient hero moment and small rainbow accents (colored stat numbers, a gradient icon glow) sprinkled through an otherwise restrained page.**

***

## 2. Color System

### 2.1 Foundation (rerun.io–inspired) — the 90%

| Token               | Hex (approx.) | Usage                                                                                |
| ------------------- | ------------- | ------------------------------------------------------------------------------------ |
| `--bg-paper`        | `#F6F3EC`     | Primary page background — warm off-white, not pure white                             |
| `--bg-canvas`       | `#FFFFFF`     | Cards / elevated surfaces on top of paper                                            |
| `--bg-ink`          | `#141311`     | Near-black section background (used sparingly, e.g. footer or one dark feature band) |
| `--text-primary`    | `#161512`     | Body copy, headlines — near-black, not pure black                                    |
| `--text-secondary`  | `#6B675E`     | Supporting copy, captions                                                            |
| `--text-on-ink`     | `#F6F3EC`     | Text on dark sections                                                                |
| `--border-hairline` | `#DEDACE`     | 1px dividers between sections/columns — the main structural device                   |
| `--accent-rust`     | `#C9542C`     | Single accent color — links, small highlights, active states                         |

Usage rule: **90–95% of the page is `--bg-paper` + `--text-primary` + hairline dividers.** Color is rationed, which is exactly why the rainbow moment (below) lands.

### 2.2 Signature Rainbow (TwelveLabs–inspired) — the 10%

Sampled from the hero gradients and gradient-blob shapes in your reference screenshots — a soft, pastel, slightly desaturated rainbow, never fully saturated/neon:

| Token                               | Hex (approx.) | Role                                          |
| ----------------------------------- | ------------- | --------------------------------------------- |
| `--rainbow-mint`                    | `#CFE7B8`     | Gradient stop 1 (start)                       |
| `--rainbow-cream`                   | `#EDE3AE`     | Gradient stop 2                               |
| `--rainbow-peach`                   | `#F0C79A`     | Gradient stop 3                               |
| `--rainbow-pink`                    | `#F3C7D6`     | Gradient stop 4                               |
| `--rainbow-lavender`                | `#D9C7EE`     | Gradient stop 5 (end)                         |
| `--rainbow-sky` (optional 6th stop) | `#BFD8E8`     | For a cooler variant / dark-blob photo frames |

**Gradient recipe** (diagonal hero wash, as in the reference):

```css
--gradient-rainbow-hero: linear-gradient(
  115deg,
  var(--rainbow-mint) 0%,
  var(--rainbow-cream) 28%,
  var(--rainbow-peach) 52%,
  var(--rainbow-pink) 75%,
  var(--rainbow-lavender) 100%
);
```

A tighter 3-stop version for smaller elements (buttons, icon glows, blob shapes):

```css
--gradient-rainbow-accent: linear-gradient(
  135deg,
  var(--rainbow-peach) 0%,
  var(--rainbow-pink) 50%,
  var(--rainbow-lavender) 100%
);
```

**Stat-number color trick** (seen in the "+13.1% / 10x / 4 hrs" row): give large stat numerals two colors — the integer in near-black `--text-primary`, one character (a decimal, a letter like "x", or a leading symbol) in a single rainbow accent color per stat, cycling through mint → pink → lavender across the row. It's a small, cheap way to sneak the rainbow into an otherwise monochrome section.

***

## 3. Typography

### 3.1 Families

| Role                              | Reference feel                                   | Suggested web-safe stack                             |
| --------------------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| Headline                          | rerun.io's clean, slightly rounded grotesk sans  | `"Inter", "General Sans", -apple-system, sans-serif` |
| Body                              | Same family, lighter weight                      | `"Inter", -apple-system, sans-serif`                 |
| Labels / eyebrows / stats context | Monospace, used sparingly for a technical accent | `"IBM Plex Mono", "JetBrains Mono", monospace`       |

TwelveLabs reference uses one clean geometric/rounded sans throughout (headline and body share a family, differentiated by size/weight only) — if you want to simplify further, drop the mono family and use the sans stack everywhere with a wide-tracked, uppercase treatment for labels instead.

### 3.2 Type scale

| Style           | Size    | Weight  | Line-height | Tracking          | Example use                                            |
| --------------- | ------- | ------- | ----------- | ----------------- | ------------------------------------------------------ |
| Display / H1    | 56–72px | 400–500 | 1.05        | -0.01em           | Hero headline ("Built for the most demanding...")      |
| H2              | 36–40px | 400–500 | 1.1         | -0.01em           | Section titles ("Secure by design")                    |
| H3              | 22–26px | 500     | 1.2         | 0                 | Card/feature titles ("Search & Discover")              |
| Body large      | 18–20px | 400     | 1.5         | 0                 | Hero subhead / intro paragraph                         |
| Body            | 16px    | 400     | 1.6         | 0                 | Standard paragraph copy                                |
| Label / eyebrow | 12–13px | 500     | 1.2         | 0.08em, uppercase | Small category tag above a headline (e.g. "◇ Analyze") |
| Stat number     | 40–56px | 400–500 | 1.0         | -0.02em           | Big proof-point numerals                               |

Headlines stay left-aligned and fairly restrained in weight (never ultra-bold) — that's part of what keeps rerun's tone calm rather than "SaaS hype."

***

## 4. Spacing & Layout

### 4.1 Spacing scale (8px base)

```
--space-1: 4px
--space-2: 8px
--space-3: 16px
--space-4: 24px
--space-5: 32px
--space-6: 48px
--space-7: 64px
--space-8: 96px
--space-9: 128px
```

### 4.2 Layout rules

* **Container max-width:** \~1200–1280px, centered, with generous side gutters (48–96px on desktop).
* **Section vertical rhythm:** large sections get 96–128px of top/bottom padding (`--space-8` / `--space-9`) — this generous air is what makes both reference sites feel premium rather than cramped.
* **Grid dividers, not cards:** the rerun/TwelveLabs structural device is a thin 1px vertical/horizontal hairline (`--border-hairline`) separating columns (e.g. the three-stat row), rather than boxed cards with shadows. Reserve actual shadowed cards for one or two moments max.
* **Two-column hero split:** big headline on the left (\~55–60% width), a shorter supporting paragraph on the right (\~35–40%), separated by a single vertical hairline — this is a direct, reusable pattern from both references.
* **Corner radius:** generous, consistent rounding.
  * `--radius-sm: 8px` (buttons, tags, pills' inner elements)
  * `--radius-md: 16px` (cards, images)
  * `--radius-lg: 32px` (large section-corner "scoop" shapes, big image frames)
  * `--radius-full: 999px` (pill buttons, search-bar mockups, nav pills)
  * Gradient "blob" shapes use a very large asymmetric radius (near-capsule/superellipse) — see §6.

***

## 5. Page Structure Pattern

Reusable section order, generalized from both references:

1. **Announcement bar** *(optional)* — thin full-width strip above the nav, gradient or solid background, one-line text + link ("🎉 X raises $Y ... Read more.")
2. **Nav** — logo left, inline text links center/left-of-actions, 1–2 buttons right (one ghost/outline, one solid dark). Flat background, no shadow.
3. **Hero** — full-bleed soft rainbow gradient background (or gradient confined to the top band only, fading to `--bg-paper` below). Big left-aligned headline + right-aligned short supporting paragraph, split by a vertical hairline. A floating UI mockup (search bar, card, or screenshot) anchored bottom-right, often overlapping the gradient-to-paper seam with a large rounded "scoop" shape.
4. **Feature row(s)** — alternating text-left/image-right and image-left/text-right blocks. Small uppercase eyebrow label, H3 title, 1–2 sentence description, plain-language (no jargon-stuffed bullet lists).
5. **Proof / stats strip** — 3–4 columns separated by hairlines, big numeral + one-line caption each. This is where the rainbow stat-number trick (§2.2) lives.
6. **Trust / security or social-proof band** — can sit on a dark `--bg-ink` section for contrast, or reuse rainbow blob shapes as decoration next to a short trust statement + "Learn more" button.
7. **Secondary feature spotlight** — one big centered headline + subhead + two buttons (solid dark "primary" + outline "secondary"), with oversized gradient blob shapes bleeding off-canvas behind the text for visual interest without adding clutter.
8. **Footer** — dark or paper background, multi-column link groups (Product / Resources / Company / Legal), logo + tagline, minimal.

***

## 6. The Rainbow Treatment — where and how

This is the one part of the system that should feel distinct and ownable. Rules of thumb, taken from the TwelveLabs reference:

* **Confine full-saturation gradient washes to 1–2 moments per page** — typically the hero background and one mid-page "spotlight" section. Everywhere else stays neutral paper/ink.
* **3D gradient "blob" shapes**: large, soft-edged, rounded-rectangle/capsule shapes (superellipse, not a plain rounded rect) filled with the rainbow gradient, often overlapping/fanned out like cards in a hand, sometimes with a photo masked inside at reduced size. Use 2–4 per moment, layered with slight rotation and overlap.
* **The gradient always transitions cool → warm → cool** (green → yellow → orange → pink → lavender) — never stop on a single hue; the multi-stop rainbow is the recognizable signature, not any single color in it.
* **Keep gradient backgrounds soft/pastel, never neon** — this is what makes it feel premium instead of like a 2015 gradient trend. Desaturate before use if pulling from a saturated source.
* **Pair rainbow elements with plenty of flat neutral space around them** — a full-bleed rainbow page would read cheap; a paper-white page with one confident rainbow moment reads intentional.

***

## 7. Ready-to-use CSS tokens

```css
:root {
  /* Foundation */
  --bg-paper: #F6F3EC;
  --bg-canvas: #FFFFFF;
  --bg-ink: #141311;
  --text-primary: #161512;
  --text-secondary: #6B675E;
  --text-on-ink: #F6F3EC;
  --border-hairline: #DEDACE;
  --accent-rust: #C9542C;

  /* Rainbow */
  --rainbow-mint: #CFE7B8;
  --rainbow-cream: #EDE3AE;
  --rainbow-peach: #F0C79A;
  --rainbow-pink: #F3C7D6;
  --rainbow-lavender: #D9C7EE;
  --rainbow-sky: #BFD8E8;

  --gradient-rainbow-hero: linear-gradient(115deg,
    var(--rainbow-mint) 0%, var(--rainbow-cream) 28%,
    var(--rainbow-peach) 52%, var(--rainbow-pink) 75%,
    var(--rainbow-lavender) 100%);

  --gradient-rainbow-accent: linear-gradient(135deg,
    var(--rainbow-peach) 0%, var(--rainbow-pink) 50%, var(--rainbow-lavender) 100%);

  /* Type */
  --font-headline: "Inter", -apple-system, sans-serif;
  --font-body: "Inter", -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", monospace;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;  --space-3: 16px; --space-4: 24px;
  --space-5: 32px; --space-6: 48px; --space-7: 64px; --space-8: 96px; --space-9: 128px;

  /* Radius */
  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 32px; --radius-full: 999px;

  /* Container */
  --container-max: 1280px;
  --container-gutter: 64px;
}
```

***

## 8. Suggested outline for your landing page

Since the goal is a *simple* landing page, trim the 8-part structure in §5 down to the essentials:

1. Nav (logo + 2–3 links + 1 CTA button)
2. Hero — rainbow gradient wash, headline + subhead + one CTA, optional product screenshot floating on top
3. 3-up feature row (plain hairline-divided columns, no icons needed)
4. Stats strip (2–3 numbers, rainbow stat-number treatment)
5. Closing CTA band — centered headline + button, rainbow blob shapes as background decoration
6. Simple footer (logo + 3–4 links + copyright line)

That's small enough to build as a single HTML file while still carrying both references' DNA.