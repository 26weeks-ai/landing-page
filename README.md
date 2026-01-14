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

## Production Lighthouse (Cloudflare)

The production site is typically proxied through Cloudflare, and a few Lighthouse findings can be caused by Cloudflare-managed features rather than this repo:

- `robots.txt is not valid`: Cloudflare "Managed content" currently injects a `Content-signal:` directive, which Lighthouse flags as an unknown robots directive. Disable that injection (or managed robots feature) so the repo's `client/public/robots.txt` is served as-is.
- `Uses deprecated APIs`: Cloudflare challenge scripts (`/cdn-cgi/challenge-platform/...`) can emit deprecation warnings in Chrome. If you want a clean Lighthouse score, disable bot/challenge JS for this marketing site or add a Cloudflare rule to bypass challenges on `/`.
- `Use efficient cache lifetimes`: GitHub Pages serves hashed assets with `cache-control: max-age=600`. To score 100 here, override caching at the CDN (e.g. Cloudflare cache rules for `/assets/*` with a long browser + edge TTL).
