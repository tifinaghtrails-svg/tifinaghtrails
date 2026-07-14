# SEO Audit

## Scope

Project audited: TifinaghTrails React/Vite website for Mount Toubkal and High Atlas trekking tours.

Canonical domain: `https://tifinaghtrails.com`

## Main Findings

1. The app was a client-rendered React SPA, so crawlers could receive a thin `index.html` before JavaScript rendered route content.
2. `sitemap.xml` and `robots.txt` were handwritten, which can become stale when tours or routes change.
3. There was no `vercel.json`, so production routing, security headers, and known-route behavior were not explicit.
4. The base HTML included `meta keywords`, which is obsolete and should not be used.
5. Google verification used a placeholder value.
6. Contact values were repeated across components instead of coming from a single config.
7. Some business claims require proof before being used heavily in SEO snippets, structured data, or authority building.
8. API failures exposed diagnostic details to the browser.

## Implemented Corrections

- Added `src/config/site.js` for canonical site, brand, email, phone, WhatsApp, locale, address, and service area.
- Updated SEO utility to use central config, canonical URLs, robots tags, Open Graph, Twitter cards, and optional Google verification.
- Added build-time route inventory in `scripts/seoRoutes.js`.
- Added build-time sitemap and robots generation.
- Added build-time prerendered HTML for all public routes and tour detail pages.
- Added `vercel.json` with explicit route rewrites, canonical host redirect, and security headers.
- Added `scripts/test-seo.js` for local SEO checks.
- Removed `meta keywords` and placeholder Google verification from `index.html`.
- Added analytics documentation and non-PII custom event tracking.
- Added API hardening for honeypot fields, body-size handling, generic production errors, field limits, and text email fallbacks.

## Remaining External Actions

- Verify the domain and sitemap in Google Search Console.
- Add `VITE_GOOGLE_SITE_VERIFICATION` in Vercel after receiving the Search Console token.
- Add SMTP variables in Vercel production environment.
- Confirm business claims listed in `CONTENT_VERIFICATION_REQUIRED.md`.
- Connect or create Google Business Profile if the company has a public local presence.
