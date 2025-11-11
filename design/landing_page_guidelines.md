
# 26weeks.ai — Landing Page Design Guidelines & Execution Plan (Dark • Minimal)

## Brand Tone & Voice
**Purpose:** Push first‑time marathoners to take a bold, low‑risk step now, with a coach that feels capable, supportive, and a little daring.

### Voice pillars
1) **Coach energy** — high empathy + high standards. Clear, direct, motivating.  
2) **Evidence‑based clarity** — simple claims, no hype we can’t back up.  
3) **Radical support** — “We’ve got you.” Encouraging, non‑judgmental, 24×7.  
4) **Adventure spirit** — make a marathon feel like an epic, reachable challenge.

**Tone sliders**: Friendly ↑, Confident ↑, Technical ↓ (only when necessary), Inclusive ↑, Urgency ↑ but never manipulative.

**Words to use**: run, first marathon, plan, adaptive, coach, today, 26 weeks, recovery, injury prevention, nutrition, progress, check‑ins, integrate, ready, go.  
**Words to avoid**: miracle, guaranteed PR, elite‑only, punish, shame.

### Brand taglines (test these)
- **A)** *Run your first marathon in 26 weeks. With an AI coach that adapts to you.*  
- **B)** *26 weeks to your first marathon — personalized, adaptive, supportive.*  
- **C)** *Your first marathon. One plan. 26 weeks. Let’s go.*
- **D)** *Run farther than you think. Start today.*

### Primary CTA text (test variants)
- **“Start 2‑week free trial”** (primary)  
- Secondary: **“See your starter plan”**, **“How it works”**

---

## Layout & IA (Information Architecture)

**Theme**: Minimal Dark.  
- Background: **#233038 Gunmetal**, text primary **#FDF6E3 Ivory**, text secondary **#D3DBDD**.  
- Primary accents: **Orange #FF5B04** (buttons/links), **Midnight Green #075056** (secondary fills).  
- Section vertical spacing: 64–96 px desktop, 40–64 px mobile.  
- Grid: 12‑col desktop (max‑width 1200px), 6‑col tablet, 4‑col mobile. Gutters 24 px desktop, 16 px mobile.  
- Mobile first. Sticky bottom CTA on mobile.

### Section order (scroll story)
1. **Hero** (hook + CTA above the fold)  
2. **How It Works** (3 steps + “see a sample week” link)  
3. **Personalization & Adaptation** (what makes it AI)  
4. **Feature Grid** (Recovery, Injury Prevention, Nutrition, Check‑ins, Integrations, Progress)  
5. **Integrations bar** (Apple Health, Garmin, Strava, Fitbit, Polar, Coros, Google Fit)  
6. **Social Proof** (testimonials/metrics/press placeholders)  
7. **Pricing** (monthly vs. 6‑month; free trial badge)  
8. **FAQ** (top objections)  
9. **Final CTA** (risk‑reversal, fast start)  
10. **Footer** (links, legal, disclaimer)

### Hero (above the fold)
- **H1**: choose one of the tested headlines above. 36–48 px desktop; 28–32 px mobile.  
- **Subhead**: “Personalized, adaptive coaching that starts from your fitness level and adjusts daily.”  
- **Primary CTAs**: *Start 2‑week free trial* (orange.700 button, near‑black text), secondary link “How it works”.  
- **Proof chips** (one row): “No coach required”, “Works with your watch”, “Cancel anytime”.
- **Art direction**: Dark hero with subtle vignette + light noise texture; show a diverse first‑time runner image/video (never elite only). If video, silent + no autoplay on mobile; fallback image always provided.

### How It Works (3 steps)
- **Step 1**: Tell us about you (age, current fitness, schedule).  
- **Step 2**: Get your 26‑week plan (adapts to your life).  
- **Step 3**: Daily check‑ins + recovery guidance (stay on track, injury‑free).  
- Each step card: surface **#2B3A48**, icon line‑art, caption in Light Silver. Link to “See a sample week”.

### Personalization & Adaptation
- Short explainer + visual showing plan shifting (calendar cells pulsing Orange for workouts, Midnight Green for recovery).  
- Bullets: *Adaptive load*, *AI checks injury risk*, *Adjusts for missed runs*, *Weather-aware (if applicable)*.

### Feature Grid (2×3)
- **Recovery & Injury Prevention** — mobility, load management, alerting.  
- **Nutrition Guidance** — pre/during/post fueling basics, macros guidance.  
- **Progress Tracking** — pace, distance, HR zones, long‑run progression.  
- **Daily Check‑ins** — 30‑second mood/energy inputs; plan adapts.  
- **Integrations** — connect your watch/apps.  
- **24×7 Coaching** — chat anytime.
- Each feature: short header, 1‑sentence body, small icon. Avoid dense paragraphs.

### Integrations
- Logos on muted bar, accessible alt text (“Works with Garmin, Apple Health, Strava…”).

### Social Proof
- If early: use “Beta stories” and “Community” counters.  
- Placeholders: 3 testimonials (name, age range, city), 1 metric (e.g., “87% completed their first 10k within 8 weeks”). Replace with genuine numbers only.

### Pricing
- Two cards:  
  - **Wannabe Athlete** — **$15/month**, cancel anytime.  
  - **LockedIn plan** — **$75 / 6 months** (save 16% vs monthly).  
- **Badge:** “2‑week free trial”.  
- “What’s included” list (same features).  
- Microcopy: “No equipment? Start with walk‑run.”, “Switch plans anytime”.

### FAQ (top objections)
- “Am I too old / too unfit to start?”  
- “What if I miss runs?”  
- “Do I need a watch?” (No, but it helps)  
- “Is this safe?” (Consult a doctor; we adapt to you; stop if pain)  
- “Can I cancel?” (Anytime during trial; afterward prorated monthly or 6‑month term as chosen)

### Final CTA
- Headline: “You’re 60 seconds away from your first plan.”  
- CTA button + reassurance: “2‑week free trial • Cancel anytime”.

---

## Visual & Motion Guidelines
- **Buttons**: Primary orange.700 (#BF4600) with near‑black text (#0B0E10). Secondary Midnight Green.  
- **Links**: Orange, always underlined.  
- **Icons**: 1.5px strokes, rounded joins, Light Silver on dark.  
- **Elevation**: Cards use level1/2 shadows; keep subtle.  
- **Motion**: 160–220ms ease‑out on hover/focus; 300ms for section transitions; reduce motion if `prefers-reduced-motion`.
- **Imagery**: Real, diverse, all ages; emphasize “firsts” and effort, not podiums.

---

## Accessibility (AA/AAA)
- Text on dark: Ivory → AAA vs Gunmetal.  
- Text on light: Gunmetal.  
- On Orange: near‑black text only.  
- Focus states: 2px Orange outline + 2px offset.  
- Keyboard nav order mirrors visual order; visible focus at every actionable element.  
- Provide alt text and labels; avoid color‑only distinctions.

---

## Performance
- Target **LCP < 2.5s**, **CLS < 0.1**, **TTI < 3.5s**.  
- Use system font stack or self‑host Inter with `display=swap`.  
- Compress hero images (AVIF/WEBP + 2x), lazy‑load below‑the‑fold, preconnect analytics only after consent.  
- Inline critical CSS (~10–15 KB), defer the rest.

---

## SEO & Sharing
**Meta title**: 26weeks.ai — Run your first marathon in 26 weeks with an AI coach  
**Meta description**: Personalized, adaptive marathon coaching that starts from your fitness level. Recovery, injury prevention, nutrition, progress tracking, and 24×7 support. 2‑week free trial.  
**Keywords**: first marathon, marathon training plan, AI running coach, 26 weeks, beginner marathon.  
**OpenGraph/Twitter**: dark hero image with headline text.  
**Schema**: `SoftwareApplication` + `Organization` JSON‑LD.

---

## Analytics & Experimentation
- **Events**: `cta_click`, `hero_scroll_25`, `start_trial`, `connect_tracker`, `pricing_view`, `faq_expand`, `plan_preview_open`.  
- **Conversion goal**: `start_trial`.  
- **A/B tests**: Headline (A/B/C), Hero media (image vs. muted video), CTA text (Start Trial vs See Plan), Pricing order (monthly first vs 6‑month first), Final CTA copy.
- **Cohorts**: age group, current weekly activity, device type, traffic source.

---

## Execution Plan (hand‑off to engineering)
**Deliverables**
- `landing_page.html` (semantic HTML + data‑analytics attributes)
- `landing_page.css` (tokens mapped to CSS variables)
- `seo.jsonld` (schema snippet)
- Tokens already provided: `design_tokens.json` (app) + `figma_tokens.json` (Figma)

**Acceptance criteria**
- Passes Lighthouse (Performance > 90, Accessibility > 95).  
- All text meets contrast AA (AAA for body).  
- Mobile sticky CTA is visible and non‑obstructive.  
- Analytics events fire on interactions (dataLayer).  
- Hero CTA visible above the fold on 390×844 viewport.

**Tasks**
1. Implement HTML skeleton & tokens.  
2. Hook analytics events.  
3. Replace placeholder logos/images and testimonials with real assets.  
4. Wire pricing buttons to checkout flow.  
5. QA accessibility (keyboard, SR labels).  
6. Deploy & run initial A/B test.

---

## Copy Deck (starter text)

**Hero H1**: Run your first marathon in 26 weeks.  
**Subhead**: Your AI coach builds a plan from your fitness level and adapts every day.  
**CTA**: Start 2‑week free trial →  
**Secondary**: How it works

**Proof chips**: Works with your watch • Cancel anytime • No coach required

**How it works — 3 steps**  
1. Tell us about you.  
2. Get your adaptive 26‑week plan.  
3. Daily check‑ins keep you moving.

**Personalization**: Real‑time adjustments if you miss a run, feel sore, or nail a PR. Always moving you forward—safely.

**Features**: Recovery & injury prevention • Nutrition guidance • Progress tracking • Daily check‑ins • 24×7 coach • Integrations

**Pricing**  
- Wannabe Athlete — $15/month  
- LockedIn plan — $75 / 6 months  
*2‑week free trial. Cancel anytime.*

**FAQ** — see above list.

**Footer disclaimer**: Not medical advice. Consult a physician before starting any training program.
