# 26weeks.ai Landing Page

Static marketing site for 26weeks.ai, built with React + Vite + Tailwind.

## Local development

- Install: `npm ci`
- Dev server: `npm run dev`
- Typecheck: `npm run check`
- Build: `npm run build` (outputs to `dist/public`)
- Lighthouse (local): run `npm run lighthouse:preview` (auditing `npm run dev` will always look slow).

## Waitlist

The primary CTA routes to `/waitlist`.

- Optional webhook: set `VITE_WAITLIST_WEBHOOK_URL` to a URL that accepts `POST` JSON payloads.
- No webhook: the page falls back to opening an email to `coach@26weeks.ai`.

## Blog

Markdown posts live in `client/src/content/blog/*.md` and are bundled at build time.

## Deployment (GitHub Pages)

- Workflow: `.github/workflows/pages.yml`
- Custom domain: `client/public/CNAME`
