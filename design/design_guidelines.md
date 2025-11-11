
# 26weeks.ai — Design Guidelines (v1)
Author: ChatGPT (GPT-5 Pro) for Diwakar

## 1. Brand Story (color)
- **Primary**: Orange `#FF5B04` — momentum, effort, action. Use for CTAs, highlight metrics, and success milestones.
- **Secondary**: Midnight Green `#075056` — focus, recovery, AI insight. Use for secondary CTAs, module labels, analytics accents.
- **Canvas (Dark)**: Gunmetal `#233038` — default app background.
- **Canvas (Light)**: Ivory `#FDF6E3` — default marketing site background.
- **Support**: Sand Yellow `#F4D47C` (achievements), Light Silver `#D3DBDD` (dividers, subtle surfaces).

## 2. Accessibility guardrails
- **Text on dark**: Ivory (primary) and Light Silver (secondary) — AAA against Gunmetal.
- **Text on light**: Gunmetal (primary). Avoid Orange text on light surfaces.
- **On Orange** (buttons, tags): text must be **near-black `#0B0E10`**.
- **Midnight Green text on dark** fails AA; use it as a fill or ensure large text ≥24px/18.66px bold only.
- Never use color alone to convey meaning; accompany with text/icon.
- Focus ring: 2px `#FF5B04` + 2px offset.

## 3. Component color rules
### Buttons
- **Primary** (Dark/Light): `bg orange.700 #BF4600`, `text #0B0E10`, hover `orange.600`, pressed `orange.800`.
- **Secondary**: `bg midnightGreen.600 #075056`, `text Ivory`, hover `midnightGreen.500`, pressed `midnightGreen.700`.
- Disabled: reduce contrast (text `#8C9AA3` on dark, `#A7B1B5` on light).

### Inputs
- **Dark**: bg `#1C262C`, border `#4E595F` → hover `#7B8287` → focus `#FF5B04`.
- **Light**: bg `#FBF2D7`, border `#D3DBDD` → hover `#A7ACAF` → focus `#FF5B04`.
- Placeholder: Light Silver on dark; `#5A6A75` on light.

### Cards
- **Dark**: surface `#2B3A48`, title Ivory, body Light Silver, border `#3A4A58`.
- **Highlight**: surface `sand.100`, text Gunmetal, left accent `orange.400`.

### Badges/Chips
- *Streak*: bg `orange.100`, text `orange.700`.
- *Recovery*: bg `midnightGreen.100`, text `midnightGreen.700`.

### Charts (Dark)
- S1 `#FF5B04`, S2 `#F4D47C`, S3 `#4AB3A6`, S4 `#8EC3E6`, S5 `#D3DBDD`.
- Grid `#3A4A58`, axis `#D3DBDD`, title Ivory.

## 4. Layout primitives
- **Spacing scale** (px): 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64.
- **Radii**: 4 (xs), 6 (sm), 8 (md), 12 (lg), 16 (xl), 24 (2xl), pill (999).
- **Elevation** (shadow presets): see tokens `elevation.light/dark`.

## 5. Typography (baseline)
- Family: `Inter` for product & marketing; fallbacks in tokens.
- Sizes: xs 12, sm 14, md 16, lg 18, xl 20, 2xl 24, 3xl 30, 4xl 36.
- Line heights: tight 1.2, normal 1.5, relaxed 1.65.
- Usage: Body md/normal; Captions xs/tight; H1 36/tight; H2 30/snug; H3 24/normal.

## 6. Themes
- **Dark (App first)**:
  - background `#233038`, surface `#2B3A48`,
  - text.primary Ivory, text.secondary Light Silver,
  - border `#3A4A58`, focus `#FF5B04`.
- **Light (Site/Docs)**:
  - background Ivory, surface Sand 100,
  - text.primary Gunmetal, text.secondary `#38444B`,
  - border Light Silver, focus `#FF5B04`.

## 7. Do / Don’t
- **Do**: Use Orange for *action* only; keep it rare for potency.
- **Do**: Use Midnight Green for *insights & recovery* modules.
- **Don’t**: Place Orange text on light surfaces or small text on dark surfaces.
- **Don’t**: Use Midnight Green text on Gunmetal for small text.

## 8. Token hierarchy
- **Core** → base color scales, spacing, radii.
- **Semantic** → map core to `light` and `dark` roles.
- **Component** → map semantic to buttons, inputs, cards, charts.

## 9. Implementation rules
- All new components must request tokens via **semantic** layer.
- Avoid hard-coded hex values in product code (only tokens).
- Add contrast checks for new pairings; aim for AA/AAA.

## 10. Brand usage in marketing
- Headlines: Orange accents (underline, caret, or pill), text Gunmetal on Ivory.
- Photography/imagery: warm highlights with deep cool shadows (match Orange & Midnight Green).
- Gradients (sparingly): `#FF5B04` → `#F4D47C` (linear 45°) for hero backgrounds; overlay `rgba(35,48,56,0.7)` on images in dark UI.

---

### Changelog
- v1.0 — Initial system (dark-first), accessible pairings, Figma/Flutter tokens.
