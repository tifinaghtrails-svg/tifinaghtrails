# SEO Implementation Report

## Implemented

- Central public site configuration: `src/config/site.js`
- React metadata utility updates: `src/utils/seo.jsx`
- Generated route inventory: `scripts/seoRoutes.js`
- Generated sitemap and robots: `scripts/generate-sitemap.js`
- Prerendered route HTML after build: `scripts/prerender.js`
- SEO smoke tests: `scripts/test-seo.js`
- Vercel routing and security headers: `vercel.json`
- Optional Google Search Console verification: `VITE_GOOGLE_SITE_VERIFICATION`
- Optional Google Tag Manager: `VITE_GTM_ID`
- Vercel Analytics and Speed Insights remain installed for the React/Vite app.

## Build Behavior

`npm run build` now runs:

1. `prebuild`: generate source `public/sitemap.xml` and `public/robots.txt`
2. `build`: Vite production build
3. `postbuild`: prerender route HTML, then write sitemap/robots into `dist`

`npm run test:seo` checks the built `dist` output.

## Important Notes

- This is static prerendering for crawler/indexing quality. The browser still runs the React app normally.
- Unknown direct URLs are not globally rewritten to the SPA. Known pages have explicit rewrites in `vercel.json`; unknown direct URLs can return a real 404.
- Preview deployments can be noindexed through generated robots when `VERCEL_ENV` is not `production`, and by setting `VITE_NOINDEX=true` if needed.
- Search Console verification should be added as an environment variable, not hard-coded.

## Files To Watch When Adding Pages

- `src/routes/AppRoutes.jsx`
- `scripts/seoRoutes.js`
- `vercel.json`
- `docs/SEO_KEYWORD_MAP.md`

Tour detail pages are generated from `src/data/tours.js`.
