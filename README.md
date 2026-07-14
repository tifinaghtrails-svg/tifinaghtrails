# TifinaghTrails

TifinaghTrails is a React/Vite website for guided Mount Toubkal and High Atlas trekking tours from Imlil and Marrakech, Morocco. It includes tour pages, destination content, gallery, FAQ, contact and booking forms, SMTP email notifications, Vercel Analytics, Speed Insights, generated SEO files, and build-time prerendered route HTML.

## Main Features

- Public pages for home, about, tours, tour details, destinations, gallery, FAQ, contact, booking, and 404.
- Professional booking and contact email flow using Gmail SMTP through local Express and Vercel serverless API routes.
- Customer confirmation emails and owner notification emails.
- Central site config for brand, canonical URL, email, phone, WhatsApp, locale, address, and service area.
- Generated `sitemap.xml` and `robots.txt`.
- Build-time prerendered HTML for all public routes.
- Vercel Analytics and Speed Insights.
- Optional Google Search Console verification and Google Tag Manager.
- API hardening with method checks, validation, honeypot field, body-size handling, safe errors, and plain-text email fallbacks.

## Development

Install dependencies:

```bash
npm install
```

Start the local mail API:

```bash
npm run server
```

Start the React app:

```bash
npm run dev
```

During development, Vite proxies `/api` requests to `http://localhost:5174`.

## Environment Variables

Copy `.env.example` to `.env` for local development. Keep `.env` private.

Required SMTP values:

```env
OWNER_EMAIL=tifinaghtrails@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tifinaghtrails@gmail.com
SMTP_PASS=your-smtp-password
SMTP_FROM="TifinaghTrails <tifinaghtrails@gmail.com>"
```

Optional public values:

```env
VITE_GOOGLE_SITE_VERIFICATION=
VITE_GTM_ID=
VITE_NOINDEX=false
```

## Build And SEO Checks

```bash
npm run build
npm run test:seo
```

The build generates route-specific HTML, `sitemap.xml`, and `robots.txt` in `dist`.

## Vercel

Add the SMTP variables in Vercel Project Settings, then deploy the `main` branch. The serverless functions in `api/booking.js` and `api/contact.js` handle production form submissions.

See `docs/DEPLOYMENT_CHECKLIST.md` and `docs/GOOGLE_SEARCH_CONSOLE_SETUP.md`.
