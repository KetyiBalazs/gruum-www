# Gruum report — acme/acme-web

Scanned 2026-08-19 · 4 layers · 31 findings

Use this file as a punch list. Each finding includes a file/line, a recommended action, and enough context for a developer or coding agent to apply the change.

---

## Styles

### Color tokens — merge 6 near-identical blues into `--blue-primary`

Canonical token: `--blue-primary: #2563EB` (`src/styles/tokens.css:18`)

| Token | Hex | Similarity | File | Action |
| --- | --- | --- | --- | --- |
| `--blue-primary` | `#2563EB` | source | `src/styles/tokens.css:18` | Keep |
| `--brand-blue` | `#2B5CFF` | 97% | `src/styles/tokens.css:24` | Merge into `--blue-primary` and delete |
| `--color-primary` | `#2563EB` | 100% | `app/globals.css:12` | Alias or delete; duplicate of source |
| `--btn-bg` | `#1D4ED8` | 94% | `src/components/Button.tsx:44` | Replace with `--blue-primary` |
| `--link` | `#3B82F6` | 91% | `src/styles/tokens.css:41` | Merge into `--blue-primary` |
| `--accent-500` | `#2080FF` | 89% | `src/styles/accents.css:7` | Review: slightly cooler; confirm before merge |

Also flagged: 4 near-duplicate neutrals (`--gray-100` / `--bg-subtle` / `--surface-2` / `--canvas`) and 2 one-off shadows that do not match `--shadow-sm`.

---

## Components

### Button — 7 variants, recommend 3

Found implementations in `src/components/Button.tsx`, `src/ui/PrimaryButton.tsx`, `app/marketing/Cta.tsx`.

Keep:
- `primary`
- `secondary`
- `ghost`

Delete or fold in:
- `solid` → `primary`
- `outline` → `secondary`
- `link-button` → `ghost`
- `marketing-cta` → `primary` with size `lg`

The marketing CTA uses 14px / 600 weight; the system button is 15px / 500. Align to the system button.

### Card — two forks

`src/components/Card.tsx` and `src/patterns/Panel.tsx` share layout, padding, and radius but diverge on border (`1px #E5E2D8` vs `1px #DEDACE`) and shadow. Treat `Card` as canonical; migrate `Panel` callers.

---

## Copy & tone

Inconsistent CTA labels for the same action (sign-up):
- “Sign up” — `app/header.tsx:32`
- “Get started” — `app/pricing/page.tsx:88`
- “Create account” — `src/components/AuthForm.tsx:19`

Recommend one label: **Create account** (sentence case, verb-first). Apply the same pattern to empty states (“No projects yet” vs “You don’t have any projects”).

Title case appears on 11 buttons; sentence case on 19. Follow sentence case to match the product UI.

---

## Animation

Modal enter:
- `src/components/Modal.tsx` — `200ms ease`
- `src/overlays/Dialog.tsx` — `450ms linear`

Recommend: `200ms cubic-bezier(0.2, 0.8, 0.2, 1)` for enter, `160ms ease` for exit. Replace the linear 450ms dialog motion; it reads as a different product.

Hover on primary buttons is instant in marketing pages and `120ms` in app chrome. Use `160ms ease` everywhere.

---

## Suggested agent prompt

> Apply the Gruum findings in this file. Merge the listed color tokens into `--blue-primary`, consolidate Button to primary/secondary/ghost, migrate Panel to Card, standardize signup CTAs to “Create account”, and align modal/button motion to the recommended timing. Do not invent new tokens. Open a PR with one commit per layer (styles, components, copy, motion).
