# 26weeks.ai — Landing Page Design & Art Guidelines (noir editorial)

This landing page follows the same **dark-noir, editorial magazine** system as the mobile app, adapted for web layout, performance, and accessibility.

## 1) Art direction (what “good” looks like)
- **Noir editorial**: ink canvas, warm ivory “paper” text, copper used rarely for decisive action.
- **Magazine hierarchy**: kicker rails, serif headlines, hairline rules, whitespace.
- **Restraint over decoration**: no glassmorphism, no neon gradients, no heavy shadows.
- **One signature detail per section**: a stamp, rule, or numbered rail—not multiple competing effects.

## 2) Color system (dark-only)
Source of truth tokens live in `design/tokens/figma_tokens.json`.

### Core roles
- **Ink canvas**: `#0E1316` (background)
- **Surface**: `#12161B` (cards/sections)
- **Elevated**: `#161B21` (inputs, menus, modals)
- **Hairline**: `#262D36` (dividers/borders)
- **Primary text (ivory)**: `#FDF6E3`
- **Secondary text (warm silver)**: `#C9C2B8`
- **Muted text**: `#8E8A82`

### Brand accents
- **Copper (brand primary)**: `#C07543` (links, focus, tiny highlights)
- **Primary CTA fill**: Copper 700 `#8D502A` (hover `#A86336`, pressed `#713F20`)
- **Midnight Green (brand secondary)**: `#075056` (secondary CTAs, “insight/recovery” accents)
- **Sand Yellow**: `#F4D47C` (achievements / sparing highlights only)

### Usage rules
- Copper is **for action**: primary buttons, active state, and 1 highlight per section.
- Avoid copper as small body text on ink; prefer ivory/silver and reserve copper for labels/links.
- Midnight Green text on ink can fail contrast at small sizes: use as fills/accents or larger/bolder text only.

## 3) Typography
### Fonts
- **Body/UI**: Inter (400/500/600/700)
- **Editorial display**: Spectral (600/700)

### Hierarchy patterns
- **Kicker**: 11–12px, 600, uppercase, tracking ~0.22em
- **H1 (serif)**: 32–56px responsive, 600–700, tight line-height (~1.05), slight negative tracking
- **Body**: 15–16px, Inter, line-height ~1.55
- **Numbers/metrics**: tabular numerals when available

## 4) Layout primitives
- **Spacing scale (px)**: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64
- **Radii**: 4, 6, 8, 12, 16, 24, pill (999)
- **Shadows**: minimal; prefer hairlines + spacing. If used, keep extremely subtle.

## 5) Components (web rules)
### Buttons
- **Primary**: copper 700 fill + ink text; hover/pressed per token spec; focus ring 2px copper + 2px offset.
- **Secondary**: midnight green fill + ivory text; hover/pressed per token spec.
- **Outline**: hairline border; on hover, border becomes copper.

### Inputs
- Background = elevated surface; border = hairline; focus = copper ring. Placeholder uses warm silver.

### Cards/sections
- Surface background + hairline border. Titles in ivory; supporting copy in warm silver.
- Use copper as a small accent (kicker rule, underline, or icon) not as large fills.

### Links
- Default link = copper 500; hover = copper 300/400; underline on hover (editorial).

## 6) Motion
- Keep motion sparse and deliberate:
  - 180ms micro transitions (hover/focus)
  - 280ms section entrances (optional)
  - 420ms signature transitions (rare)
- Respect `prefers-reduced-motion`.

## 7) Iconography & art
- Icons: single-weight line icons, preferably 1.5–1.75 stroke; avoid filled icon sets.
- Avoid illustrative gradients; prefer flat marks, hairlines, and typographic stamps.
- Use copper for icon accents only when communicating “action/active”.

## 8) Implementation mapping in this repo
- Tokens live as CSS variables in `client/src/index.css`.
- Tailwind reads semantic variables via `tailwind.config.ts`.
- Global typography defaults: Inter body + Spectral headlines (use `font-serif` for editorial headings).
- Avoid hard-coded hex values in components; use Tailwind semantic/color utilities backed by variables.

