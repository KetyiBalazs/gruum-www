# Gruum prompt — acme/acme-web

Paste this into your coding agent. Do not invent new tokens. Open a PR with one commit per layer (styles, components, copy, motion).

You are cleaning up design drift found by Gruum. Merge hardcoded and near-duplicate values back into the existing system — or, where no token exists yet, create one and map the strays onto it.

---

## Styles

Merge these near-identical blues into `--blue-primary: #2563EB` (`src/styles/tokens.css:18`):

- `--brand-blue` `#2B5CFF` (97%) in `src/styles/tokens.css:24` → merge into `--blue-primary` and delete
- `--color-primary` `#2563EB` (100%) in `app/globals.css:12` → alias or delete; duplicate of source
- `--btn-bg` `#1D4ED8` (94%) in `src/components/Button.tsx:44` → replace with `--blue-primary`
- `--link` `#3B82F6` (91%) in `src/styles/tokens.css:41` → merge into `--blue-primary`
- `--accent-500` `#2080FF` (89%) in `src/styles/accents.css:7` → review before merge; slightly cooler

Also flagged: 4 near-duplicate neutrals (`--gray-100` / `--bg-subtle` / `--surface-2` / `--canvas`) and 2 unused one-off shadows that do not match `--shadow-sm`. Delete the unused shadows.

---

## Components

Button exists in 7 variants. Keep `primary`, `secondary`, and `ghost`. Fold the rest in:

- `solid` → `primary`
- `outline` → `secondary`
- `link-button` → `ghost`
- `marketing-cta` → `primary` with size `lg`

Found in `src/components/Button.tsx`, `src/ui/PrimaryButton.tsx`, `app/marketing/Cta.tsx`. The marketing CTA uses 14px / 600 weight; the system button is 15px / 500. Align to the system button.

`src/components/Card.tsx` and `src/patterns/Panel.tsx` are forks. Treat `Card` as canonical; migrate `Panel` callers.

---

## Copy & tone

Signup CTAs mix three labels for the same action. Standardize to **Create account** (sentence case):

- “Sign up” — `app/header.tsx:32`
- “Get started” — `app/pricing/page.tsx:88`
- “Create account” — `src/components/AuthForm.tsx:19`

Title case appears on 11 buttons; sentence case on 19. Follow sentence case.

---

## Animation

Modal enter is `200ms ease` in `src/components/Modal.tsx` and `450ms linear` in `src/overlays/Dialog.tsx`. Use `200ms cubic-bezier(0.2, 0.8, 0.2, 1)` for enter and `160ms ease` for exit. Primary button hover is instant on marketing pages and `120ms` in app chrome — use `160ms ease` everywhere.
